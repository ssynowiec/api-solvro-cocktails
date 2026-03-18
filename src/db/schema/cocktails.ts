import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const cocktails = pgTable("cocktails", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
});
