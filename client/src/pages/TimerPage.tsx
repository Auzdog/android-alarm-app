import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';
import TimeDisplay from '@/components/TimeDisplay';
import { useTimer } from '@/hooks/useTimer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area";

const TimerPage = () => {
  const { time, isRunning, start, stop } = useTimer();
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  const hoursArray = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  const minutesArray = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  const secondsArray = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, '0')
  );

  const handleStart = () => {
    const duration =
      parseInt(hours) * 3600 +
      parseInt(minutes) * 60 +
      parseInt(seconds);
    start(duration);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      {!isRunning ? (
        <div className="flex flex-col items-center w-full">
          <div className="flex h-[300px] w-full border rounded-lg mb-8">
            <ScrollArea className="flex-1 border-r">
              <div className="py-2">
                {hoursArray.map((hour) => (
                  <Button
                    key={hour}
                    variant="ghost"
                    className={`w-full justify-center rounded-none h-12 ${
                      hours === hour ? 'text-orange-500 bg-orange-50' : ''
                    }`}
                    onClick={() => setHours(hour)}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            <ScrollArea className="flex-1 border-r">
              <div className="py-2">
                {minutesArray.map((minute) => (
                  <Button
                    key={minute}
                    variant="ghost"
                    className={`w-full justify-center rounded-none h-12 ${
                      minutes === minute ? 'text-orange-500 bg-orange-50' : ''
                    }`}
                    onClick={() => setMinutes(minute)}
                  >
                    {minute}
                  </Button>
                ))}
              </div>
            </ScrollArea>

            <ScrollArea className="flex-1">
              <div className="py-2">
                {secondsArray.map((second) => (
                  <Button
                    key={second}
                    variant="ghost"
                    className={`w-full justify-center rounded-none h-12 ${
                      seconds === second ? 'text-orange-500 bg-orange-50' : ''
                    }`}
                    onClick={() => setSeconds(second)}
                  >
                    {second}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex gap-2 text-sm text-muted-foreground mb-2">
            <span className="w-[33%] text-center">Hours</span>
            <span className="w-[33%] text-center">Minutes</span>
            <span className="w-[33%] text-center">Seconds</span>
          </div>
        </div>
      ) : (
        <TimeDisplay time={time} size="large" />
      )}

      <Button
        size="icon"
        className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600 mt-8"
        onClick={isRunning ? stop : handleStart}
      >
        {isRunning ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default TimerPage;