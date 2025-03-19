import React from 'react';

interface TimeDisplayProps {
  time: string;
  size?: 'large' | 'medium';
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, size = 'large' }) => {
  return (
    <div className="flex items-center justify-center">
      <span 
        className={`
          font-light text-foreground
          ${size === 'large' ? 'text-7xl' : 'text-5xl'}
        `}
      >
        {time}
      </span>
    </div>
  );
};

export default TimeDisplay;