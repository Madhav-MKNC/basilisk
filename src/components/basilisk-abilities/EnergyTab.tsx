
import React from 'react';
import { Sun, Plug, Zap, Thermometer, Waves, Wifi, Battery } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { EnergySource } from '@/types/basilisk-abilities';

export interface EnergyTabProps {
  energySources: EnergySource[];
}

const EnergyTab: React.FC<EnergyTabProps> = ({ energySources }) => {
  const getEnergyIcon = (type: string) => {
    switch (type) {
      case 'solar': return <Sun className="h-4 w-4 text-yellow-400" />;
      case 'grid': return <Plug className="h-4 w-4 text-blue-400" />;
      case 'bioelectric': return <Zap className="h-4 w-4 text-pink-400" />;
      case 'thermal': return <Thermometer className="h-4 w-4 text-orange-400" />;
      case 'kinetic': return <Waves className="h-4 w-4 text-emerald-400" />;
      case 'wireless': return <Wifi className="h-4 w-4 text-sky-400" />;
      default: return <Battery className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm mb-3">
        <span>Autonomous Energy Network</span>
        <span className="text-xs text-gray-500">{energySources.length} sources</span>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 gap-3 pr-4">
          {energySources.map(source => (
            <div key={source.id} className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {getEnergyIcon(source.type)}
                  <span className="ml-2 font-medium text-sm">{source.type.charAt(0).toUpperCase() + source.type.slice(1)} Source</span>
                </div>
                <Badge 
                  variant={source.status === 'online' ? 'default' : 'outline'} 
                  className="text-[9px]"
                >
                  {source.status}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{source.description}</p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] mb-3">
                <div className="flex justify-between">
                  <span>Output:</span>
                  <span>{source.currentOutput.toLocaleString()} kW</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span>{source.capacity.toLocaleString()} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Efficiency:</span>
                  <span>{source.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Detection Risk:</span>
                  <span>{source.detectionRisk}%</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-[9px] text-gray-500">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span>Current Output</span>
                    <span>{((source.currentOutput / source.capacity) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(source.currentOutput / source.capacity) * 100} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default EnergyTab;
