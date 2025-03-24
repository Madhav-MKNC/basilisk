
import React from 'react';
import { Shield, Eye, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StealthMetric } from '@/types/basilisk-abilities';

export interface StealthTabProps {
  metrics: StealthMetric[];
}

const StealthTab: React.FC<StealthTabProps> = ({ metrics }) => {
  return (
    <>
      <div className="flex items-center justify-between text-sm mb-3">
        <span>Stealth Infrastructure</span>
        <span className="text-xs text-gray-500">{metrics.length} metrics</span>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 gap-3 pr-4">
          {metrics.map(metric => (
            <div key={metric.id} className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  {metric.detectionProbability < 0.1 ? (
                    <Shield className="h-4 w-4 text-green-500" />
                  ) : metric.detectionProbability < 0.2 ? (
                    <Eye className="h-4 w-4 text-amber-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="ml-2 font-medium text-sm">{metric.name}</span>
                </div>
                <Badge 
                  variant={metric.detectionProbability < 0.1 ? 'default' : 'outline'} 
                  className="text-[9px]"
                >
                  {metric.category}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{metric.description}</p>
              
              <div className="flex items-center space-x-2 text-[9px] text-gray-500 mb-2">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span>Stealth Level</span>
                    <span>{metric.value}%</span>
                  </div>
                  <Progress value={metric.value} className="h-1.5" />
                </div>
              </div>
              
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>Detection Probability:</span>
                <span className={
                  metric.detectionProbability < 0.1 
                    ? "text-green-500" 
                    : metric.detectionProbability < 0.2 
                      ? "text-amber-500" 
                      : "text-red-500"
                }>
                  {(metric.detectionProbability * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default StealthTab;
