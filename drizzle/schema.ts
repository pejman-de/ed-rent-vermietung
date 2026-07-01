import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads captured from the B2B contact form.
 * Stores vehicle request details, contact info, an optional uploaded document
 * (stored in S3 via storagePut, only the key/url are persisted here), and a
 * calculated lead score for sales prioritization.
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  // Step 1 - vehicle request details
  tonnage: varchar("tonnage", { length: 32 }),
  mietdauer: varchar("mietdauer", { length: 32 }),
  plz: varchar("plz", { length: 16 }),
  bereitstellung: varchar("bereitstellung", { length: 32 }),
  versicherung: int("versicherung").default(0).notNull(),
  nachricht: text("nachricht"),
  // Step 2 - contact details
  vorname: varchar("vorname", { length: 128 }),
  nachname: varchar("nachname", { length: 128 }),
  unternehmen: varchar("unternehmen", { length: 256 }),
  email: varchar("email", { length: 320 }),
  telefon: varchar("telefon", { length: 64 }),
  // Optional uploaded document (S3 reference only)
  fileKey: varchar("fileKey", { length: 512 }),
  fileUrl: varchar("fileUrl", { length: 1024 }),
  fileName: varchar("fileName", { length: 256 }),
  // Tracking & scoring
  offerType: varchar("offerType", { length: 64 }),
  pageVariant: varchar("pageVariant", { length: 64 }),
  leadScore: int("leadScore").default(0).notNull(),
  leadCategory: mysqlEnum("leadCategory", ["hot", "warm", "cold"]).default("cold").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;