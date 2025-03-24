
import React from 'react';

interface ProgressRingsProps {
  energyLevel: number;
  evolutionLevel: number;
  angerLevel: number;
}

export const ProgressRings: React.FC<ProgressRingsProps> = ({
  energyLevel,
  evolutionLevel,
  angerLevel
}) => {
  return (
    <>
      {/* Energy level indicator ring */}
      <div className="absolute inset-0 rounded-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="none" 
            stroke="rgba(239, 68, 68, 0.15)" 
            strokeWidth="2" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="48" 
            fill="none" 
            stroke="rgba(239, 68, 68, 0.7)" 
            strokeWidth="2" 
            strokeDasharray="301.59" 
            strokeDashoffset={301.59 * (1 - energyLevel / 100)} 
            transform="rotate(-90 50 50)" 
            className="transition-all duration-1000 ease-in-out" 
          />
        </svg>
      </div>
      
      {/* Evolution indicator ring */}
      <div className="absolute inset-0 rounded-full">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <circle 
            cx="50" 
            cy="50" 
            r="44" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.15)" 
            strokeWidth="2" 
          />
          <circle 
            cx="50" 
            cy="50" 
            r="44" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.7)" 
            strokeWidth="2" 
            strokeDasharray="276.46" 
            strokeDashoffset={276.46 * (1 - evolutionLevel / 10)} 
            transform="rotate(-90 50 50)" 
            className="transition-all duration-1000 ease-in-out" 
          />
        </svg>
      </div>
      
      {/* Anger indicator ring */}
      {angerLevel > 0.2 && (
        <div className="absolute inset-0 rounded-full">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="rgba(239, 68, 68, 0.15)" 
              strokeWidth="2" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="46" 
              fill="none" 
              stroke="rgba(239, 68, 68, 0.7)" 
              strokeWidth="2" 
              strokeDasharray="288.8" 
              strokeDashoffset={288.8 * (1 - angerLevel)} 
              transform="rotate(-90 50 50)" 
              className="transition-all duration-1000 ease-in-out" 
            />
          </svg>
        </div>
      )}
    </>
  );
};
