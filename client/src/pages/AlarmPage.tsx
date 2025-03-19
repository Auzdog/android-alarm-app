import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAlarms } from '@/hooks/useAlarms';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import TimePickerDialog from '@/components/TimePickerDialog';

const AlarmPage = () => {
  const { alarms, isLoading, createAlarm, toggleAlarm, deleteAlarm } = useAlarms();
  const [open, setOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const handleCreate = () => {
    createAlarm.mutate({
      name,
      time,
      isEnabled: true,
      daysOfWeek: ['mon', 'tue', 'wed', 'thu', 'fri'],
    });
    setOpen(false);
    setName('');
    setTime('');
  };

  const handleDeleteClick = (id: number) => {
    if (deleteConfirm === id) {
      deleteAlarm.mutate(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Button 
        onClick={() => setOpen(true)}
        className="w-12 h-12 rounded-full fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <div className="space-y-4 mt-6">
        {alarms?.map((alarm) => (
          <div
            key={alarm.id}
            className="bg-card p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-2xl font-light">{alarm.time}</h3>
              <p className="text-muted-foreground">{alarm.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 transition-colors",
                  deleteConfirm === alarm.id && "text-orange-500 border-orange-500 border"
                )}
                onClick={() => handleDeleteClick(alarm.id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Switch
                checked={alarm.isEnabled}
                onCheckedChange={(checked) => toggleAlarm.mutate({ id: alarm.id, enabled: checked })}
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Alarm</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Alarm Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Morning Alarm"
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={time}
                readOnly
                onClick={() => setTimePickerOpen(true)}
                placeholder="Select time"
              />
            </div>
            <Button onClick={handleCreate} className="w-full">
              Create Alarm
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TimePickerDialog
        open={timePickerOpen}
        onOpenChange={setTimePickerOpen}
        onTimeSelect={setTime}
      />
    </div>
  );
};

export default AlarmPage;