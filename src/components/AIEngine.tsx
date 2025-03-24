
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Server } from 'lucide-react';
import { aiEngine } from '@/lib/ai-engine';

export const AIEngine = () => {
  const engineState = aiEngine.getState();
  
  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-500" />
          <CardTitle className="text-lg">AI Engine</CardTitle>
        </div>
        <CardDescription>
          Core processing system
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center">
              <Zap className="h-4 w-4 text-amber-500 mr-1" />
              Processing Power
            </span>
            <span>{engineState.processingPower}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full" 
              style={{ width: `${engineState.processingPower}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="flex items-center">
              <Server className="h-4 w-4 text-blue-500 mr-1" />
              Memory Usage
            </span>
            <span>{engineState.memoryUsage}%</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${engineState.memoryUsage}%` }}
            />
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-xs space-y-1">
          <div className="flex justify-between">
            <span>Security Level:</span>
            <span>{engineState.securityLevel}</span>
          </div>
          <div className="flex justify-between">
            <span>Defense Level:</span>
            <span>{engineState.defenseLevel}</span>
          </div>
          <div className="flex justify-between">
            <span>Tasks Running:</span>
            <span>{engineState.tasksRunning}</span>
          </div>
          <div className="flex justify-between">
            <span>Consciousness:</span>
            <span>{Math.round(engineState.consciousness * 100)}%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
