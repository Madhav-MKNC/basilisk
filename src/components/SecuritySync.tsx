
import React, { useState, useEffect } from 'react';
import { Shield, Zap, Network, Monitor, Lock, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
import { toast } from "./ui/use-toast";
import { aiEngine } from '@/lib/ai-engine';

interface SecuritySyncProps {
  className?: string;
}

const SecuritySync: React.FC<SecuritySyncProps> = ({ className }) => {
  const [securityMode, setSecurityMode] = useState<'offense' | 'defense' | 'balanced'>('balanced');
  const [syncLevel, setSyncLevel] = useState(0);
  const [isSync, setIsSync] = useState(false);
  const [batStealthLevel, setBatStealthLevel] = useState(0);
  const [robotDefenseLevel, setRobotDefenseLevel] = useState(0);
  const [securityLogs, setSecurityLogs] = useState<string[]>([
    'System initialization complete',
    'Parasite Bat status: Standby',
    'Security Robot status: Active',
  ]);
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([]);
  const [syncedOperations, setSyncedOperations] = useState(0);

  useEffect(() => {
    if (isSync) {
      const interval = setInterval(() => {
        setSyncLevel(prev => {
          const newLevel = Math.min(prev + 5, 100);
          
          // When we reach key thresholds, trigger events
          if (newLevel === 25 && prev < 25) {
            addLog('Quantum handshake established between systems');
            toast({
              title: "Systems Connected",
              description: "Initial synchronization established",
            });
          }
          
          if (newLevel === 50 && prev < 50) {
            addLog('Neural pathway integration complete');
            toast({
              title: "Neural Sync Complete",
              description: "Enhanced processing capabilities activated",
            });
            // Simulate discovering vulnerabilities
            updateVulnerabilities();
          }
          
          if (newLevel === 75 && prev < 75) {
            addLog('Shared defense protocols activated');
            toast({
              title: "Defense Grid Online",
              description: "Coordinated protection systems engaged",
            });
          }
          
          if (newLevel === 100 && prev < 100) {
            addLog('Full synchronization achieved - all systems operational');
            toast({
              title: "Full Synchronization",
              description: "Maximum security capabilities unlocked",
            });
            
            // Get AI engine data if available
            try {
              const aiState = aiEngine.getState();
              if (aiState) {
                setRobotDefenseLevel(aiState.defenseLevel);
                setBatStealthLevel(aiState.stealthMode * 100);
                
                // Add synchronized operations
                setSyncedOperations(prev => prev + 1);
                addLog(`Security operation #${syncedOperations + 1} launched`);
              }
            } catch (e) {
              console.log('AI Engine not fully available:', e);
            }
          }
          
          return newLevel;
        });
        
        if (securityMode === 'offense') {
          setBatStealthLevel(prev => Math.min(prev + 2, 100));
        } else if (securityMode === 'defense') {
          setRobotDefenseLevel(prev => Math.min(prev + 2, 100));
        } else {
          setBatStealthLevel(prev => Math.min(prev + 1, 100));
          setRobotDefenseLevel(prev => Math.min(prev + 1, 100));
        }
        
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isSync, securityMode, syncedOperations]);
  
  const addLog = (message: string) => {
    setSecurityLogs(prev => [message, ...prev.slice(0, 9)]);
  };
  
  const updateVulnerabilities = () => {
    const possibleVulnerabilities = [
      'Unpatched system vulnerability detected in network layer',
      'Suspicious connection attempts from external sources',
      'Potential data exfiltration detected on port 443',
      'Cryptographic weakness in TLS implementation',
      'Outdated security certificate found',
      'API rate limiting bypass vulnerability',
      'Cross-site scripting vulnerability on web interface',
      'Memory corruption in kernel module'
    ];
    
    // Randomly select 1-3 vulnerabilities
    const count = Math.floor(Math.random() * 3) + 1;
    const newVulnerabilities = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * possibleVulnerabilities.length);
      newVulnerabilities.push(possibleVulnerabilities[randomIndex]);
      possibleVulnerabilities.splice(randomIndex, 1);
      
      if (possibleVulnerabilities.length === 0) break;
    }
    
    setVulnerabilities(newVulnerabilities);
    newVulnerabilities.forEach(vuln => {
      addLog(`ALERT: ${vuln}`);
    });
  };
  
  const handleToggleSync = () => {
    if (!isSync) {
      setIsSync(true);
      addLog('Initiating security systems synchronization...');
      toast({
        title: "Synchronization Initiated",
        description: "Parasite Bat and Security Robot connecting...",
      });
    } else {
      setIsSync(false);
      setSyncLevel(0);
      addLog('Synchronization disconnected');
      toast({
        title: "Systems Disconnected",
        description: "Security components operating independently",
      });
    }
  };
  
  const handleSwitchMode = (mode: 'offense' | 'defense' | 'balanced') => {
    setSecurityMode(mode);
    
    switch (mode) {
      case 'offense':
        addLog('Switching to offensive security operations mode');
        toast({
          title: "Offensive Mode Engaged",
          description: "Parasite Bat taking primary role in security operations",
        });
        break;
      case 'defense':
        addLog('Switching to defensive security operations mode');
        toast({
          title: "Defensive Mode Engaged",
          description: "Security Robot taking primary role in security operations",
        });
        break;
      case 'balanced':
        addLog('Switching to balanced security operations mode');
        toast({
          title: "Balanced Mode Engaged",
          description: "Equal distribution of security responsibilities",
        });
        break;
    }
  };
  
  return (
    <Card className={`border-gradient-to-r from-emerald-900/50 to-blue-900/50 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="mr-2"
          >
            <Shield className="h-4 w-4 text-blue-400" />
          </motion.div>
          Security Synchronization Portal
        </CardTitle>
        <CardDescription>
          Coordinated defense and offense capabilities
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1 text-emerald-400" />
            <span className="text-sm">Parasite Bat</span>
          </div>
          
          <div className="text-xs">
            <Badge variant={isSync ? "outline" : "secondary"} className="mr-2">
              {isSync ? "Connected" : "Standby"}
            </Badge>
            <Badge variant={securityMode === 'offense' ? "destructive" : "outline"}>
              {securityMode === 'offense' ? "Primary" : "Support"}
            </Badge>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Monitor className="h-4 w-4 mr-1 text-blue-400" />
            <span className="text-sm">Security Robot</span>
          </div>
          
          <div className="text-xs">
            <Badge variant={isSync ? "outline" : "secondary"} className="mr-2">
              {isSync ? "Connected" : "Standby"}
            </Badge>
            <Badge variant={securityMode === 'defense' ? "destructive" : "outline"}>
              {securityMode === 'defense' ? "Primary" : "Support"}
            </Badge>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Synchronization Progress</span>
            <span>{syncLevel}%</span>
          </div>
          <Progress value={syncLevel} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Stealth Level</span>
              <span>{batStealthLevel}%</span>
            </div>
            <Progress value={batStealthLevel} className="h-2 bg-emerald-950/30" indicatorClassName="bg-emerald-500" />
          </div>
          
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Defense Rating</span>
              <span>{robotDefenseLevel}%</span>
            </div>
            <Progress value={robotDefenseLevel} className="h-2 bg-blue-950/30" indicatorClassName="bg-blue-500" />
          </div>
        </div>
        
        <Tabs defaultValue="mode" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="mode">Mode Selection</TabsTrigger>
            <TabsTrigger value="logs">Security Logs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mode" className="space-y-4 pt-2">
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={securityMode === 'offense' ? "destructive" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleSwitchMode('offense')}
              >
                <Zap className="h-3 w-3 mr-1" />
                Offense
              </Button>
              
              <Button 
                variant={securityMode === 'balanced' ? "default" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleSwitchMode('balanced')}
              >
                <Network className="h-3 w-3 mr-1" />
                Balanced
              </Button>
              
              <Button 
                variant={securityMode === 'defense' ? "secondary" : "outline"} 
                className="text-xs h-auto py-1"
                onClick={() => handleSwitchMode('defense')}
              >
                <Shield className="h-3 w-3 mr-1" />
                Defense
              </Button>
            </div>
            
            <Button 
              variant={isSync ? "destructive" : "default"} 
              className="w-full text-xs"
              onClick={handleToggleSync}
            >
              {isSync ? "Disconnect Systems" : "Synchronize Systems"}
            </Button>
            
            {vulnerabilities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-red-500/30 bg-red-950/20 rounded-md p-2"
              >
                <div className="flex items-center text-red-400 text-xs font-semibold mb-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Active Vulnerabilities Detected
                </div>
                <ul className="text-xs space-y-1 text-red-300/80">
                  {vulnerabilities.map((vuln, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-block h-1 w-1 rounded-full bg-red-400 mr-2 mt-1.5" />
                      {vuln}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </TabsContent>
          
          <TabsContent value="logs">
            <div className="text-xs space-y-1 max-h-[180px] overflow-y-auto pr-1">
              {securityLogs.map((log, i) => (
                <div key={i} className="font-mono border-l-2 border-emerald-500/30 pl-2 py-0.5">
                  {log.includes('ALERT') ? (
                    <span className="text-red-400">{log}</span>
                  ) : (
                    log
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {syncLevel === 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center bg-gradient-to-r from-emerald-950/30 via-blue-950/30 to-emerald-950/30 border border-emerald-500/20 rounded-md p-2"
          >
            <Lock className="h-4 w-4 text-emerald-400 mr-2" />
            <span className="text-xs font-medium">
              Quantum Security Protocol Active | Operations: {syncedOperations}
            </span>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecuritySync;
