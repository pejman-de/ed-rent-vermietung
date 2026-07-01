import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

// --- Mocks -------------------------------------------------------------------
// Mock the DB helper so tests never touch a real database.
const insertLeadMock = vi.fn(async () => 42);
vi.mock("./db", () => ({
  insertLead: (...args: unknown[]) => insertLeadMock(...args),
}));

// Mock the storage helper so uploads never hit S3/Forge.
const storagePutMock = vi.fn(async (key: string) => ({
  key: `${key}_abcd1234`,
  url: `/manus-storage/${key}_abcd1234`,
}));
vi.mock("./storage", () => ({
  storagePut: (...args: unknown[]) => storagePutMock(...(args as [string])),
}));

// Mock the owner notification so tests never call the notification service.
const notifyOwnerMock = vi.fn(async () => true);
vi.mock("./_core/notification", () => ({
  notifyOwner: (...args: unknown[]) => notifyOwnerMock(...args),
}));

// Import AFTER mocks are registered.
import { appRouter, scoreLead } from "./routers";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

beforeEach(() => {
  insertLeadMock.mockClear();
  storagePutMock.mockClear();
  notifyOwnerMock.mockClear();
});

// --- scoreLead ---------------------------------------------------------------
describe("scoreLead", () => {
  it("returns hot for a start date within 7 days", () => {
    const soon = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    expect(scoreLead({ starttermin: soon, mietdauer: "1-7" })).toEqual({
      score: 100,
      category: "hot",
    });
  });

  it("returns hot for long-term rentals regardless of start date", () => {
    const far = new Date(Date.now() + 200 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    expect(scoreLead({ starttermin: far, mietdauer: "90plus" }).category).toBe(
      "hot",
    );
  });

  it("returns warm for a start date 7 to 21 days out", () => {
    const mid = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    expect(scoreLead({ starttermin: mid, mietdauer: "1-7" })).toEqual({
      score: 50,
      category: "warm",
    });
  });

  it("returns cold for a far-future short rental", () => {
    const far = new Date(Date.now() + 120 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    expect(scoreLead({ starttermin: far, mietdauer: "8-30" })).toEqual({
      score: 10,
      category: "cold",
    });
  });

  it("returns cold when no start date is provided", () => {
    expect(scoreLead({}).category).toBe("cold");
  });
});

// --- leads.uploadDocument ----------------------------------------------------
describe("leads.uploadDocument", () => {
  it("decodes base64, stores the file and returns the reference", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const dataBase64 = Buffer.from("hello world").toString("base64");

    const result = await caller.leads.uploadDocument({
      fileName: "gewerbeanmeldung.pdf",
      mimeType: "application/pdf",
      dataBase64,
    });

    expect(storagePutMock).toHaveBeenCalledTimes(1);
    const [key, buffer, mimeType] = storagePutMock.mock.calls[0];
    expect(String(key)).toContain("leads/");
    expect((buffer as Buffer).toString()).toBe("hello world");
    expect(mimeType).toBe("application/pdf");
    expect(result.url).toContain("/manus-storage/");
    expect(result.fileName).toBe("gewerbeanmeldung.pdf");
  });

  it("rejects an empty file", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.uploadDocument({
        fileName: "empty.pdf",
        mimeType: "application/pdf",
        dataBase64: Buffer.from("").toString("base64") || " ",
      }),
    ).rejects.toThrow();
  });
});

// --- leads.create ------------------------------------------------------------
describe("leads.create", () => {
  it("persists a lead, scores it and notifies the owner", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const soon = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const result = await caller.leads.create({
      fahrzeugtyp: "sprinter",
      tonnage: "3_5t",
      mietdauer: "1-7",
      starttermin: soon,
      plz: "42799",
      bereitstellung: "abholung",
      versicherung: true,
      nachricht: "Bitte mit Ladebordwand.",
      vorname: "Max",
      nachname: "Mustermann",
      unternehmen: "Logistik GmbH",
      email: "max@logistik.de",
      telefon: "+49 170 1234567",
      fileKey: "leads/doc_abcd1234",
      fileUrl: "/manus-storage/leads/doc_abcd1234",
      fileName: "gewerbeanmeldung.pdf",
      offerType: "vermietung",
      pageVariant: "lp-vermietung",
    });

    expect(result).toMatchObject({ id: 42, leadScore: 100, leadCategory: "hot" });

    expect(insertLeadMock).toHaveBeenCalledTimes(1);
    const inserted = insertLeadMock.mock.calls[0][0] as Record<string, unknown>;
    expect(inserted.email).toBe("max@logistik.de");
    expect(inserted.versicherung).toBe(1);
    expect(inserted.leadScore).toBe(100);
    expect(inserted.leadCategory).toBe("hot");
    expect(inserted.fileKey).toBe("leads/doc_abcd1234");

    expect(notifyOwnerMock).toHaveBeenCalledTimes(1);
    const payload = notifyOwnerMock.mock.calls[0][0] as { title: string; content: string };
    expect(payload.title).toContain("Logistik GmbH");
    expect(payload.content).toContain("max@logistik.de");
  });

  it("still succeeds when notifyOwner fails", async () => {
    notifyOwnerMock.mockRejectedValueOnce(new Error("service down"));
    const caller = appRouter.createCaller(createPublicContext());

    const result = await caller.leads.create({
      email: "minimal@example.com",
    });

    expect(result.id).toBe(42);
    expect(insertLeadMock).toHaveBeenCalledTimes(1);
  });

  it("rejects an invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.leads.create({ email: "not-an-email" }),
    ).rejects.toThrow();
    expect(insertLeadMock).not.toHaveBeenCalled();
  });
});
