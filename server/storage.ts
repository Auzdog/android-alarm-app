import { alarms, type Alarm, type InsertAlarm } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAlarms(): Promise<Alarm[]>;
  createAlarm(alarm: InsertAlarm): Promise<Alarm>;
  updateAlarm(id: number, update: Partial<Alarm>): Promise<Alarm | undefined>;
  deleteAlarm(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getAlarms(): Promise<Alarm[]> {
    return await db.select().from(alarms);
  }

  async createAlarm(insertAlarm: InsertAlarm): Promise<Alarm> {
    const [alarm] = await db
      .insert(alarms)
      .values(insertAlarm)
      .returning();
    return alarm;
  }

  async updateAlarm(id: number, update: Partial<Alarm>): Promise<Alarm | undefined> {
    const [updated] = await db
      .update(alarms)
      .set(update)
      .where(eq(alarms.id, id))
      .returning();
    return updated;
  }

  async deleteAlarm(id: number): Promise<void> {
    await db
      .delete(alarms)
      .where(eq(alarms.id, id));
  }
}

export const storage = new DatabaseStorage();