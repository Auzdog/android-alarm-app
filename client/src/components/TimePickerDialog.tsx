import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TimePickerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTimeSelect: (time: string) => void;
}

const TimePickerDialog: React.FC<TimePickerDialogProps> = ({
  open,
  onOpenChange,
  onTimeSelect,
}) => {
  const [selectedHour, setSelectedHour] = useState("06");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const hours = Array.from({ length: 12 }, (_, i) => 
    String(i + 1).padStart(2, '0')
  );
  
  const minutes = Array.from({ length: 60 }, (_, i) => 
    String(i).padStart(2, '0')
  );

  const handleContinue = () => {
    const hour24 = period === "PM" && selectedHour !== "12"
      ? String(Number(selectedHour) + 12)
      : period === "AM" && selectedHour === "12"
        ? "00"
        : selectedHour;
    
    onTimeSelect(`${hour24}:${selectedMinute}`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[300px] p-0">
        <div className="flex h-[300px]">
          <ScrollArea className="flex-1 border-r">
            <div className="py-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant="ghost"
                  className={`w-full justify-center rounded-none h-12 ${
                    selectedHour === hour ? 'text-orange-500 bg-orange-50' : ''
                  }`}
                  onClick={() => setSelectedHour(hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </ScrollArea>
          
          <ScrollArea className="flex-1 border-r">
            <div className="py-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant="ghost"
                  className={`w-full justify-center rounded-none h-12 ${
                    selectedMinute === minute ? 'text-orange-500 bg-orange-50' : ''
                  }`}
                  onClick={() => setSelectedMinute(minute)}
                >
                  {minute}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-col justify-start w-20">
            <Button
              variant="ghost"
              className={`h-12 rounded-none ${
                period === "AM" ? 'text-orange-500 bg-orange-50' : ''
              }`}
              onClick={() => setPeriod("AM")}
            >
              AM
            </Button>
            <Button
              variant="ghost"
              className={`h-12 rounded-none ${
                period === "PM" ? 'text-orange-500 bg-orange-50' : ''
              }`}
              onClick={() => setPeriod("PM")}
            >
              PM
            </Button>
          </div>
        </div>
        
        <div className="p-4 border-t">
          <Button 
            onClick={handleContinue}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimePickerDialog;
