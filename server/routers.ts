import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { insertLead } from "./db";
import { storagePut } from "./storage";

// -----------------------------------------------------------------------------
// Lead scoring (server-side source of truth, mirrors the frontend heuristic)
// -----------------------------------------------------------------------------

type LeadCategory = "hot" | "warm" | "cold";

/**
 * Calculate a lead score and category from the submitted request details.
 * - Hot: start date within 7 days OR long-term rental (> 1 month)
 * - Warm: start date between 7 and 21 days
 * - Cold: everything else / far in the future
 */
export function scoreLead(input: {
  starttermin?: string | null;
  mietdauer?: string | null;
}): { score: number; category: LeadCategory } {
  const isLongTerm = input.mietdauer === "30plus" || input.mietdauer === "90plus";

  let diffDays = Number.POSITIVE_INFINITY;
  if (input.starttermin) {
    const start = new Date(input.starttermin);
    if (!Number.isNaN(start.getTime())) {
      const diffTime = start.getTime() - Date.now();
      diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }

  if (diffDays < 7 || isLongTerm) {
    return { score: 100, category: "hot" };
  }
  if (diffDays >= 7 && diffDays <= 21) {
    return { score: 50, category: "warm" };
  }
  return { score: 10, category: "cold" };
}

// -----------------------------------------------------------------------------
// Input schemas
// -----------------------------------------------------------------------------

const uploadDocumentInput = z.object({
  fileName: z.string().min(1).max(256),
  mimeType: z.string().min(1).max(128),
  // base64-encoded file content (without the data URL prefix)
  dataBase64: z.string().min(1),
});

const createLeadInput = z.object({
  // Step 1 - vehicle request details
  fahrzeugtyp: z.string().optional(),
  tonnage: z.string().max(32).optional(),
  mietdauer: z.string().max(32).optional(),
  starttermin: z.string().optional(),
  plz: z.string().max(16).optional(),
  bereitstellung: z.string().max(32).optional(),
  versicherung: z.boolean().optional(),
  nachricht: z.string().max(5000).optional(),
  // Step 2 - contact details
  vorname: z.string().max(128).optional(),
  nachname: z.string().max(128).optional(),
  unternehmen: z.string().max(256).optional(),
  email: z.string().email().max(320),
  telefon: z.string().max(64).optional(),
  // Optional uploaded document (S3 reference only)
  fileKey: z.string().max(512).optional(),
  fileUrl: z.string().max(1024).optional(),
  fileName: z.string().max(256).optional(),
  // Tracking
  offerType: z.string().max(64).optional(),
  pageVariant: z.string().max(64).optional(),
});

// Reasonable ceiling for base64 payloads routed through tRPC (~8MB decoded).
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    /**
     * Upload an optional supporting document (e.g. Gewerbeanmeldung or
     * Führerschein). The client sends the file base64-encoded; we decode it,
     * push the bytes to S3 via storagePut and return the storage reference.
     */
    uploadDocument: publicProcedure
      .input(uploadDocumentInput)
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.dataBase64, "base64");

        if (buffer.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Die hochgeladene Datei ist leer.",
          });
        }

        if (buffer.length > MAX_UPLOAD_BYTES) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Die Datei ist zu groß (maximal 8 MB).",
          });
        }

        const safeName = input.fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
        const key = `leads/${Date.now()}-${safeName}`;

        const { key: storedKey, url } = await storagePut(
          key,
          buffer,
          input.mimeType,
        );

        return { key: storedKey, url, fileName: input.fileName };
      }),

    /**
     * Persist a new lead, compute its score/category and notify the owner.
     */
    create: publicProcedure
      .input(createLeadInput)
      .mutation(async ({ input }) => {
        const { score, category } = scoreLead({
          starttermin: input.starttermin,
          mietdauer: input.mietdauer,
        });

        const id = await insertLead({
          tonnage: input.tonnage ?? null,
          mietdauer: input.mietdauer ?? null,
          plz: input.plz ?? null,
          bereitstellung: input.bereitstellung ?? null,
          versicherung: input.versicherung ? 1 : 0,
          nachricht: input.nachricht ?? null,
          vorname: input.vorname ?? null,
          nachname: input.nachname ?? null,
          unternehmen: input.unternehmen ?? null,
          email: input.email,
          telefon: input.telefon ?? null,
          fileKey: input.fileKey ?? null,
          fileUrl: input.fileUrl ?? null,
          fileName: input.fileName ?? null,
          offerType: input.offerType ?? null,
          pageVariant: input.pageVariant ?? null,
          leadScore: score,
          leadCategory: category,
        });

        // Notify the project owner. Failures here must not break the submission.
        const categoryLabel =
          category === "hot" ? "HOT" : category === "warm" ? "WARM" : "COLD";
        const name = [input.vorname, input.nachname].filter(Boolean).join(" ").trim();
        const content = [
          `Neue Anfrage (${categoryLabel}, Score ${score})`,
          name ? `Name: ${name}` : null,
          input.unternehmen ? `Unternehmen: ${input.unternehmen}` : null,
          `E-Mail: ${input.email}`,
          input.telefon ? `Telefon: ${input.telefon}` : null,
          input.fahrzeugtyp ? `Fahrzeugtyp: ${input.fahrzeugtyp}` : null,
          input.tonnage ? `Tonnage: ${input.tonnage}` : null,
          input.mietdauer ? `Mietdauer: ${input.mietdauer}` : null,
          input.starttermin ? `Starttermin: ${input.starttermin}` : null,
          input.plz ? `Region/PLZ: ${input.plz}` : null,
          input.bereitstellung ? `Bereitstellung: ${input.bereitstellung}` : null,
          input.versicherung ? "Versicherungspaket: ja" : null,
          input.fileName ? `Dokument: ${input.fileName}` : null,
          input.nachricht ? `Nachricht: ${input.nachricht}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        try {
          await notifyOwner({
            title: `Neuer Lead ${categoryLabel}: ${input.unternehmen || input.email}`,
            content,
          });
        } catch (error) {
          console.warn("[Leads] notifyOwner failed:", error);
        }

        return { id, leadScore: score, leadCategory: category };
      }),
  }),
});

export type AppRouter = typeof appRouter;
