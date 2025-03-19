import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAlarmSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all alarms
  app.get('/api/alarms', async (_req, res) => {
    try {
      const alarms = await storage.getAlarms();
      res.json(alarms);
    } catch (err) {
      console.error('Failed to get alarms:', err);
      res.status(500).json({ message: 'Failed to get alarms' });
    }
  });

  // Create a new alarm
  app.post('/api/alarms', async (req, res) => {
    try {
      console.log('Creating alarm with data:', req.body);
      const alarm = insertAlarmSchema.parse(req.body);
      const created = await storage.createAlarm(alarm);
      console.log('Created alarm:', created);
      res.json(created);
    } catch (err) {
      console.error('Failed to create alarm:', err);
      res.status(400).json({ message: err instanceof Error ? err.message : 'Invalid alarm data' });
    }
  });

  // Toggle alarm status
  app.patch('/api/alarms/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { isEnabled } = req.body;

    if (typeof isEnabled !== 'boolean') {
      return res.status(400).json({ message: 'isEnabled must be a boolean' });
    }

    try {
      const updated = await storage.updateAlarm(id, { isEnabled });
      if (!updated) {
        return res.status(404).json({ message: 'Alarm not found' });
      }
      res.json(updated);
    } catch (err) {
      console.error('Failed to update alarm:', err);
      res.status(500).json({ message: 'Failed to update alarm' });
    }
  });

  // Delete alarm
  app.delete('/api/alarms/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
      await storage.deleteAlarm(id);
      res.status(204).end();
    } catch (err) {
      console.error('Failed to delete alarm:', err);
      res.status(500).json({ message: 'Failed to delete alarm' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}