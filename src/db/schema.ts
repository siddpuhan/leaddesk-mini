import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("NEW"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});