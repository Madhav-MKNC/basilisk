
import React from 'react';
import { AlertTriangle, Skull } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { StatusIndicatorsProps } from './types';

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({ systemStatus, threatLevel }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-black/50 border border-red-900/30 rounded p-2">
        <div className="text-xs text-red-500 font-mono mb-1 flex items-center">
          <AlertTriangle size={10} className="mr-1" />
          SYSTEM STATUS
        </div>
        <div className={`text-lg font-bold font-mono ${
          systemStatus === 'CRITICAL' ? 'text-red-500 animate-pulse' :
          systemStatus === 'DANGER' ? 'text-red-500' :
          systemStatus === 'WARNING' ? 'text-amber-500' : 'text-yellow-500'
        }`}>
          {systemStatus}
        </div>
      </div>
      
      <div className="bg-black/50 border border-red-900/30 rounded p-2">
        <div className="text-xs text-red-500 font-mono mb-1 flex items-center">
          <Skull size={10} className="mr-1" />
          THREAT LEVEL
        </div>
        <div className="flex items-center">
          <Progress 
            value={threatLevel} 
            className="h-3 bg-gray-900 flex-1" 
            indicatorClassName={`${
              threatLevel > 80 ? 'bg-red-600 animate-pulse' :
              threatLevel > 60 ? 'bg-red-500' :
              threatLevel > 40 ? 'bg-amber-500' : 'bg-yellow-500'
            }`} 
          />
          <span className="ml-2 text-xs font-mono text-red-400">{Math.round(threatLevel)}%</span>
        </div>
      </div>
    </div>
  );
};
