import { text } from "drizzle-orm/pg-core";
import { uuid, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: uuid("id").defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 50 }).notNull(),
  contacted: boolean("contacted").default(false),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CreateContacts = typeof contacts.$inferInsert;
export type GetContacts = typeof contacts.$inferSelect;
