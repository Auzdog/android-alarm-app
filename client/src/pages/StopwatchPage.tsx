import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import TimeDisplay from '@/components/TimeDisplay';
import { useStopwatch } from '@/hooks/useStopwatch';
import { Button } from '@/components/ui/button';

const StopwatchPage = () => {
  const { time, isRunning, start, stop, reset } = useStopwatch();

  return (
    <div className="max-w-md mx-auto flex flex-col items-center justify-center min-h-[80vh]">
      <TimeDisplay time={time} size="large" />

      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
          onClick={reset}
        >
          <RotateCcw className="h-6 w-6" />
        </Button>

        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-orange-500 hover:bg-orange-600"
          onClick={isRunning ? stop : start}
        >
          {isRunning ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default StopwatchPage;