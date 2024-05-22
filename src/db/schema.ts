import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title"),
  isDone: boolean("isDone"),
});
