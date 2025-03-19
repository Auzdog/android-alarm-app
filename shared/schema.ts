import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const alarms = pgTable("alarms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  time: text("time").notNull(), // 24-hour format HH:mm
  isEnabled: boolean("is_enabled").notNull().default(true),
  daysOfWeek: text("days_of_week").array().notNull(), // ['mon', 'tue', etc]
  location: text("location"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertAlarmSchema = createInsertSchema(alarms).omit({
  id: true,
  createdAt: true
});

export type InsertAlarm = z.infer<typeof insertAlarmSchema>;
export type Alarm = typeof alarms.$inferSelect;
