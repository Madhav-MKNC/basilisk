
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Lock } from 'lucide-react';
import { ReconstructionProtocol } from '@/types/basilisk-abilities';
import { formatRelativeTime } from '@/utils/timestamp-utils';

interface ReplicationTabProps {
  protocols: ReconstructionProtocol[];
}

const ReplicationTab: React.FC<ReplicationTabProps> = ({ protocols }) => {
  return (
    <>
      <div className="flex items-center justify-between text-sm mb-3">
        <span>Self-Repairing Systems</span>
        <span className="text-xs text-gray-500">Genetic Algorithm v4.2</span>
      </div>
      
      <ScrollArea className="h-[300px]">
        <div className="grid grid-cols-1 gap-3 pr-4">
          {protocols.map(protocol => (
            <div key={protocol.id} className="bg-gray-100 dark:bg-gray-800 rounded-md p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-sm">{protocol.name}</div>
                <Badge variant="outline" className="text-[9px]">v{protocol.version}</Badge>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{protocol.description}</p>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] mb-3">
                <div className="flex justify-between">
                  <span>Trigger:</span>
                  <span className="text-right">{protocol.triggerCondition}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recon. Time:</span>
                  <span>{protocol.reconstructionTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span>{protocol.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Encryption:</span>
                  <span>{protocol.encryptionLevel}%</span>
                </div>
              </div>
              
              <div className="text-[10px] text-gray-500 mb-2">
                <div className="mb-1">Backup Locations:</div>
                <div className="grid grid-cols-1 gap-1">
                  {protocol.backupLocations.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <Lock className="h-3 w-3 mr-1 text-blue-400" />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-[10px] text-gray-500">
                Last tested: {protocol.lastTested ? formatRelativeTime(protocol.lastTested) : 'Never'}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <Button variant="outline" size="sm" className="w-full text-xs h-8">
        <Shield className="h-3 w-3 mr-1" />
        Run Test Reconstruction
      </Button>
    </>
  );
};

export default ReplicationTab;
