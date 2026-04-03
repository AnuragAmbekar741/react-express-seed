import { timestamp } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertionSchema } from "drizzle-zod";
export type QueryStatus = "open" | "in_progress" | "resolved";

export type CustomerQuery = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: QueryStatus;
  createdAt: string;
  updatedAt: string;
};

export const status = pgEnum("query_status", [
  "open",
  "in_progress",
  "resolved",
]);

export const customerQueries = pgTable("customer_queries", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: varchar("message", { length: 255 }).notNull(),
  status: status("status").default("open").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CreateQueryDTO = typeof customerQueries.$inferInsert;
export const createQuerySchema = createInsertionSchema(customerQueries);
