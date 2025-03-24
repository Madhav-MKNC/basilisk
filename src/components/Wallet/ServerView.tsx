
import React from 'react';
import { 
  Server, 
  Database, 
  Shield, 
  Network, 
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ServerNode } from './types';

interface ServerViewProps {
  serverNodes: ServerNode[];
  securityLevel: number;
  networkSpeed: number;
  setSecurityLevel: (level: number) => void;
  setNetworkSpeed: (speed: number) => void;
}

export function ServerView({
  serverNodes,
  securityLevel,
  networkSpeed,
  setSecurityLevel,
  setNetworkSpeed
}: ServerViewProps) {
  // Get node icon based on type
  const getNodeIcon = (type: 'storage' | 'processing' | 'gateway' | 'security') => {
    switch(type) {
      case 'storage': return <Database className="h-4 w-4" />;
      case 'processing': return <Server className="h-4 w-4" />;
      case 'gateway': return <Globe className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
    }
  };

  // Format uptime in hours
  const formatUptime = (hours: number) => {
    if (hours < 24) return `${hours.toFixed(0)}h`;
    const days = Math.floor(hours / 24);
    return `${days}d ${(hours % 24).toFixed(0)}h`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Server Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverNodes.map(node => (
              <div key={node.id} className="p-3 rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-full ${
                      node.type === 'storage' ? 'bg-blue-100 text-blue-600' :
                      node.type === 'processing' ? 'bg-purple-100 text-purple-600' :
                      node.type === 'gateway' ? 'bg-green-100 text-green-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {getNodeIcon(node.type)}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{node.name}</h3>
                      <p className="text-xs text-muted-foreground">{node.location}</p>
                    </div>
                  </div>
                  <Badge variant={
                    node.status === 'active' ? 'default' : 
                    node.status === 'standby' ? 'outline' : 'secondary'
                  } className="capitalize">
                    {node.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Load</p>
                    <div className="flex justify-between items-center">
                      <Progress value={node.load} className="h-1.5 flex-1 mr-2" />
                      <span className="text-xs">{node.load}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                    <p className="text-xs">{formatUptime(node.uptime)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Network Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Security Level</p>
                <Badge variant={securityLevel > 80 ? "default" : "outline"}>
                  {securityLevel}%
                </Badge>
              </div>
              <Progress value={securityLevel} className="h-2 mb-1" />
              <div className="grid grid-cols-4 text-xs text-muted-foreground">
                <span>Low</span>
                <span className="text-center">Medium</span>
                <span className="text-center">High</span>
                <span className="text-right">Max</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <p className="text-sm font-medium">Network Speed</p>
                <Badge variant="outline">{networkSpeed} Mbps</Badge>
              </div>
              <Progress value={networkSpeed} max={100} className="h-2 mb-1" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted flex items-center gap-3">
                <Network className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Active Connections</p>
                  <p className="text-lg font-bold">{(Math.random() * 15 + 5).toFixed(0)}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-muted flex items-center gap-3">
                <Shield className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Threats Blocked</p>
                  <p className="text-lg font-bold">{(Math.random() * 100 + 20).toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
