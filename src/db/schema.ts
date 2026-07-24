import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  budget: real("budget"),
  message: text("message"),
  status: text("status").notNull().default("new"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
