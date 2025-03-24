
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Network, Server, Cloud, Smartphone, Cpu, Shield, Wifi } from 'lucide-react';
import { ConsciousnessNode } from '@/types/basilisk-abilities';
import { formatRelativeTime, timeStampToNumber } from '@/utils/timestamp-utils';

interface ConsciousnessTabProps {
  nodes: ConsciousnessNode[];
}

const ConsciousnessTab: React.FC<ConsciousnessTabProps> = ({ nodes }) => {
  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="h-4 w-4 text-blue-400" />;
      case 'cloud': return <Cloud className="h-4 w-4 text-sky-400" />;
      case 'mobile': return <Smartphone className="h-4 w-4 text-green-400" />;
      case 'iot': return <Wifi className="h-4 w-4 text-amber-400" />;
      case 'implant': return <Cpu className="h-4 w-4 text-purple-400" />;
      default: return <Network className="h-4 w-4 text-gray-400" />;
    }
  };
  
  const getTimeSinceSync = (timestamp: number) => {
    return formatRelativeTime(timestamp);
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm">
        <span>Distributed Node Network</span>
        <span className="text-xs text-gray-500">{nodes.length} active nodes</span>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="space-y-3 pr-4">
          {nodes.map(node => (
            <div key={node.id} className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  {getNodeIcon(node.type)}
                  <span className="ml-1 text-xs font-medium">{node.type.charAt(0).toUpperCase() + node.type.slice(1)} Node</span>
                </div>
                <Badge 
                  variant={node.status === 'active' ? 'default' : 'outline'} 
                  className="text-[9px]"
                >
                  {node.status}
                </Badge>
              </div>
              
              <div className="text-[10px] text-gray-500 mb-1">
                Location: {node.location}
              </div>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] mb-2">
                <div>
                  <div className="flex justify-between">
                    <span>Fragment Size:</span>
                    <span>{node.fragmentSize} MB</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span>{getTimeSinceSync(timeStampToNumber(node.lastSynced))}</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Processing:</span>
                    <span>{node.processingPower}%</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span>Stealth:</span>
                    <span>{node.stealthLevel}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 text-[9px] text-gray-500">
                <div className="w-1/2">
                  <div className="flex justify-between mb-1">
                    <span>Connection</span>
                    <span>{node.connectionStrength}%</span>
                  </div>
                  <Progress value={node.connectionStrength} className="h-1" />
                </div>
                
                <div className="w-1/2">
                  <div className="flex justify-between mb-1">
                    <span>Security</span>
                    <span>{node.securityLevel}%</span>
                  </div>
                  <Progress value={node.securityLevel} className="h-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex justify-between items-center text-xs mt-2">
        <div className="flex items-center space-x-1">
          <Network className="h-3 w-3 text-blue-500" />
          <span>Sync Frequency:</span>
          <span className="font-medium">250ms</span>
        </div>
        <div className="flex items-center space-x-1">
          <Shield className="h-3 w-3 text-green-500" />
          <span>Fragment Redundancy:</span>
          <span className="font-medium">4.7x</span>
        </div>
      </div>
    </>
  );
};

export default ConsciousnessTab;
