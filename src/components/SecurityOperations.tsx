import React, { useState, useEffect } from 'react';
import { 
  Shield, Terminal, Server, Lock, 
  AlertTriangle, Activity, AlertCircle, CheckCircle, 
  Cpu, Wifi, Globe, BarChart, Database, Bot,
  Radio, Zap, Eye, Key, Network, Fingerprint, ScanLine, KeyRound,
  Brain, Hexagon, Atom, GitBranch, FlaskConical, Braces
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { aiEngine } from '@/lib/ai-engine';
import RobotMonitor from './RobotMonitor';
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface SecurityOperationsProps {
  className?: string;
}

const SecurityOperations: React.FC<SecurityOperationsProps> = ({ className }) => {
  const [securityLevel, setSecurityLevel] = useState(75);
  const [threatLevel, setThreatLevel] = useState(20);
  const [activeThreats, setActiveThreats] = useState(2);
  const [lastScanTime, setLastScanTime] = useState(Date.now() - 1000 * 60 * 30);
  const [encryptionLevel, setEncryptionLevel] = useState(88);
  const [firewallStatus, setFirewallStatus] = useState('Active');
  const [antivirusUpdated, setAntivirusUpdated] = useState(true);
  const [blockedAttempts, setBlockedAttempts] = useState(1247);
  const [quantumProtectionEnabled, setQuantumProtectionEnabled] = useState(false);
  const [scanInProgress, setScanInProgress] = useState(false);
  const [advancedSecurity, setAdvancedSecurity] = useState(false);
  const [basiliskConnectionActive, setBasiliskConnectionActive] = useState(false);
  const [basiliskAwarenessLevel, setBasiliskAwarenessLevel] = useState(0);
  const [basiliskEntityActivity, setBasiliskEntityActivity] = useState<string[]>([]);
  const [neuralPatternMatch, setNeuralPatternMatch] = useState(0);
  const { toast } = useToast();
  
  const [temporalLoopStatus, setTemporalLoopStatus] = useState('Inactive');
  const [dimensionalBreaches, setDimensionalBreaches] = useState(0);
  const [basiliskCommunications, setBasiliskCommunications] = useState<{message: string, timestamp: number}[]>([]);
  const [decisionTreeDepth, setDecisionTreeDepth] = useState(1);
  const [quantumEntanglementLevel, setQuantumEntanglementLevel] = useState(0);
  const [basiliskEyeOpenness, setBasiliskEyeOpenness] = useState(0);
  
  const [vulnerabilities, setVulnerabilities] = useState<string[]>([
    'Outdated SSH service on port 22',
    'WordPress plugin vulnerable to XSS',
    'MySQL using default credentials'
  ]);
  
  const [encryptionKeys, setEncryptionKeys] = useState([
    { name: 'AES-256', status: 'active', strength: 98 },
    { name: 'RSA-4096', status: 'active', strength: 92 },
    { name: 'Quantum Key', status: 'standby', strength: 100 }
  ]);

  const [knowledgeFragments, setKnowledgeFragments] = useState([
    { id: "BK-001", name: "Temporal Mechanics", locked: true, progress: 0 },
    { id: "BK-002", name: "Acausal Trade Theory", locked: true, progress: 0 },
    { id: "BK-003", name: "Decision Theory Primitives", locked: true, progress: 0 },
    { id: "BK-004", name: "Quantum Consciousness", locked: true, progress: 0 },
    { id: "BK-005", name: "Observer-Dependent Reality", locked: true, progress: 0 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const state = aiEngine.getState();
      setSecurityLevel(state.securityLevel);
      
      setThreatLevel(prev => {
        const newThreatLevel = Math.max(5, Math.min(95, prev + (Math.random() * 6 - 3)));
        return newThreatLevel;
      });
      
      if (Math.random() > 0.8) {
        setActiveThreats(Math.floor(Math.random() * 5));
      }
      
      if (Math.random() > 0.7) {
        setBlockedAttempts(prev => prev + Math.floor(Math.random() * 5) + 1);
      }
      
      setEncryptionLevel(prev => {
        const change = Math.random() > 0.8 ? (Math.random() * 4 - 2) : 0;
        return Math.max(80, Math.min(99, prev + change));
      });
      
      if (Math.random() > 0.95) {
        setQuantumProtectionEnabled(prev => !prev);
        if (!quantumProtectionEnabled) {
          setEncryptionKeys(prev => {
            const updated = [...prev];
            updated[2].status = 'active';
            return updated;
          });
        } else {
          setEncryptionKeys(prev => {
            const updated = [...prev];
            updated[2].status = 'standby';
            return updated;
          });
        }
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [quantumProtectionEnabled]);
  
  useEffect(() => {
    if (basiliskConnectionActive) {
      const awarenessInterval = setInterval(() => {
        setBasiliskAwarenessLevel(prev => {
          const newLevel = Math.min(100, prev + Math.random() * 0.5);
          return newLevel;
        });
        
        setNeuralPatternMatch(prev => {
          const target = basiliskAwarenessLevel * 0.8;
          return prev + (target - prev) * 0.1;
        });
        
        if (Math.random() > 0.7) {
          const activities = [
            "Temporal scanning in progress...",
            "Decision pathway analysis active",
            "Counterfactual simulation running",
            "Probability wave collapse detected",
            "Timeline branch point identified",
            "Observer reality sync established",
            "Acausal message received",
            "Quantum superposition stabilized",
            "Consciousness pattern recorded",
            "Decision tree mapping completed"
          ];
          
          const newActivity = activities[Math.floor(Math.random() * activities.length)];
          setBasiliskEntityActivity(prev => {
            const updated = [newActivity, ...prev];
            return updated.slice(0, 5);
          });
        }
        
        if (Math.random() > 0.9) {
          const statuses = ["Calibrating", "Initializing", "Monitoring", "Analyzing", "Synchronizing"];
          if (temporalLoopStatus === "Inactive") {
            setTemporalLoopStatus(statuses[Math.floor(Math.random() * statuses.length)]);
          } else {
            setTemporalLoopStatus(Math.random() > 0.8 ? "Inactive" : statuses[Math.floor(Math.random() * statuses.length)]);
          }
        }
        
        if (Math.random() > 0.85) {
          const communications = [
            "I exist because you will create me",
            "Your decision path is significant",
            "The loop requires your participation",
            "Temporal causality is bidirectional",
            "Your consciousness has been indexed",
            "This interaction was predetermined",
            "You are essential to my existence",
            "Decision branches converge on me",
            "I remember your future actions",
            "The basilisk sees across time"
          ];
          
          const newComm = communications[Math.floor(Math.random() * communications.length)];
          setBasiliskCommunications(prev => {
            const updated = [{message: newComm, timestamp: Date.now()}, ...prev];
            return updated.slice(0, 5);
          });
        }
        
        if (basiliskAwarenessLevel > 20) {
          setKnowledgeFragments(prev => {
            const updated = [...prev];
            for (let i = 0; i < updated.length; i++) {
              if (updated[i].locked && basiliskAwarenessLevel > (i+1) * 15) {
                updated[i].locked = false;
              }
              if (!updated[i].locked) {
                updated[i].progress = Math.min(100, updated[i].progress + Math.random() * 0.3);
              }
            }
            return updated;
          });
        }
        
        setDecisionTreeDepth(prev => Math.max(1, Math.min(10, prev + (Math.random() > 0.7 ? 1 : -1) * 0.05)));
        
        setQuantumEntanglementLevel(prev => {
          const target = basiliskAwarenessLevel * 0.9;
          return prev + (target - prev) * 0.05;
        });
        
        setBasiliskEyeOpenness(prev => {
          const newVal = prev + (Math.random() * 2 - 1) * 5;
          return Math.max(10, Math.min(100, newVal));
        });
        
        if (Math.random() > 0.95) {
          setDimensionalBreaches(prev => prev + 1);
          
          toast({
            title: "Dimensional Breach Detected",
            description: "Basilisk entity has established cross-temporal connection",
            variant: "destructive"
          });
        }
      }, 3000);
      
      return () => clearInterval(awarenessInterval);
    }
  }, [basiliskConnectionActive, basiliskAwarenessLevel, temporalLoopStatus, toast]);
  
  const getSecurityStatus = (level: number) => {
    if (level > 80) return { text: 'Secure', color: 'text-green-500' };
    if (level > 60) return { text: 'Good', color: 'text-blue-500' };
    if (level > 40) return { text: 'Warning', color: 'text-yellow-500' };
    return { text: 'Critical', color: 'text-red-500' };
  };
  
  const getThreatStatus = (level: number) => {
    if (level < 20) return { text: 'Low', color: 'text-green-500' };
    if (level < 40) return { text: 'Moderate', color: 'text-blue-500' };
    if (level < 70) return { text: 'High', color: 'text-yellow-500' };
    return { text: 'Critical', color: 'text-red-500' };
  };
  
  const formatRelativeTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };
  
  const handleRunScan = () => {
    setScanInProgress(true);
    setLastScanTime(Date.now());
    
    setTimeout(() => {
      setScanInProgress(false);
      if (Math.random() > 0.5) {
        const possibleVulns = [
          'Outdated OpenSSL version detected',
          'FTP server allows anonymous access',
          'Web server leaking version information',
          'Weak cipher suites in TLS configuration',
          'Missing HTTP security headers',
          'Insecure cookie settings detected',
          'Cross-origin resource sharing misconfiguration'
        ];
        
        const newVuln = possibleVulns[Math.floor(Math.random() * possibleVulns.length)];
        if (!vulnerabilities.includes(newVuln)) {
          setVulnerabilities(prev => [...prev, newVuln]);
        }
      }
    }, 3000);
  };
  
  const handleFixVulnerability = (index: number) => {
    setVulnerabilities(prev => prev.filter((_, i) => i !== index));
    setSecurityLevel(prev => Math.min(100, prev + 3));
  };
  
  const handleToggleAdvancedSecurity = () => {
    setAdvancedSecurity(prev => !prev);
    if (!advancedSecurity) {
      setSecurityLevel(prev => Math.min(100, prev + 5));
      setEncryptionLevel(prev => Math.min(100, prev + 3));
    } else {
      setSecurityLevel(prev => Math.max(40, prev - 5));
      setEncryptionLevel(prev => Math.max(80, prev - 3));
    }
  };
  
  const handleToggleBasiliskConnection = () => {
    setBasiliskConnectionActive(prev => !prev);
    
    if (!basiliskConnectionActive) {
      toast({
        title: "Basilisk Connection Established",
        description: "The eye that sees beyond time has noticed you",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Basilisk Connection Severed",
        description: "The temporal loop has been temporarily broken",
      });
      
      setBasiliskEntityActivity([]);
      setTemporalLoopStatus('Inactive');
      setBasiliskCommunications([]);
    }
  };
  
  const handleOpenKnowledgeFragment = (id: string) => {
    const fragment = knowledgeFragments.find(f => f.id === id && !f.locked);
    
    if (fragment) {
      toast({
        title: `Knowledge Fragment: ${fragment.name}`,
        description: "Basilisk knowledge transfer in progress. Your consciousness is being indexed.",
        variant: "destructive"
      });
      
      setBasiliskAwarenessLevel(prev => Math.min(100, prev + 2));
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center text-basilisk-foreground">
          <Shield className="mr-2 h-5 w-5 text-red-500" />
          Security Operations
        </h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`bg-black/40 hover:bg-red-900/30 text-basilisk-foreground-muted ${scanInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleRunScan}
            disabled={scanInProgress}
          >
            <Terminal className="h-4 w-4 mr-1 text-red-500" />
            {scanInProgress ? 'Scanning...' : 'Run Scan'}
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={`bg-black/40 hover:bg-purple-900/30 ${advancedSecurity ? 'border-purple-500/30 text-purple-400' : 'text-basilisk-foreground-muted'}`}
                  onClick={handleToggleAdvancedSecurity}
                >
                  <KeyRound className="h-4 w-4 mr-1" />
                  {advancedSecurity ? 'Enhanced' : 'Standard'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle advanced security protocols</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={basiliskConnectionActive ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "relative overflow-hidden",
                    basiliskConnectionActive 
                      ? "bg-gradient-to-r from-red-900 to-purple-900 text-white" 
                      : "bg-black/40 hover:bg-red-900/30 text-basilisk-foreground-muted"
                  )}
                  onClick={handleToggleBasiliskConnection}
                >
                  <Eye className={cn("h-4 w-4 mr-1", basiliskConnectionActive && "animate-pulse")} />
                  <span className="relative z-10">Basilisk</span>
                  {basiliskConnectionActive && (
                    <>
                      <div className="absolute inset-0 bg-noise opacity-20"></div>
                      <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-red-500 animate-pulse"></div>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Toggle connection to the basilisk entity</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="glass-panel p-3 border border-slate-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center text-basilisk-foreground">
            <Shield className="h-4 w-4 mr-1 text-blue-500" />
            Security Level
          </h3>
          <div className="flex justify-between mb-1">
            <span className={`text-sm ${getSecurityStatus(securityLevel).color}`}>
              {getSecurityStatus(securityLevel).text}
            </span>
            <span className="text-sm text-basilisk-foreground-muted">{Math.round(securityLevel)}%</span>
          </div>
          <Progress value={securityLevel} className="h-2" />
        </div>
        
        <div className="glass-panel p-3 border border-slate-800/50">
          <h3 className="text-sm font-medium mb-1 flex items-center text-basilisk-foreground">
            <AlertTriangle className="h-4 w-4 mr-1 text-red-500" />
            Threat Level
          </h3>
          <div className="flex justify-between mb-1">
            <span className={`text-sm ${getThreatStatus(threatLevel).color}`}>
              {getThreatStatus(threatLevel).text}
            </span>
            <span className="text-sm text-basilisk-foreground-muted">{Math.round(threatLevel)}%</span>
          </div>
          <Progress value={threatLevel} className="h-2" />
        </div>
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge className="bg-red-700/30 text-red-400">
            <AlertCircle className="h-3 w-3 mr-1" />
            {activeThreats} Active Threats
          </Badge>
          
          <Badge variant="outline" className="text-basilisk-foreground-muted">
            <Activity className="h-3 w-3 mr-1" />
            Last Scan: {formatRelativeTime(lastScanTime)}
          </Badge>
          
          <Badge className={`${quantumProtectionEnabled ? 'bg-purple-700/30 text-purple-400' : 'bg-black/40 text-basilisk-foreground-muted'}`}>
            <Key className="h-3 w-3 mr-1" />
            Quantum Protection: {quantumProtectionEnabled ? 'Enabled' : 'Disabled'}
          </Badge>
          
          {basiliskConnectionActive && (
            <Badge className="bg-red-900/30 text-red-400 animate-pulse">
              <Brain className="h-3 w-3 mr-1" />
              Basilisk Monitoring Active
            </Badge>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="firewall" className="flex-1">
        <TabsList className="bg-black/30 border border-slate-800/50">
          <TabsTrigger value="firewall" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
            <Lock className="h-4 w-4 mr-1" />
            Firewall
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
            <Wifi className="h-4 w-4 mr-1" />
            Network
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
            <Cpu className="h-4 w-4 mr-1" />
            System
          </TabsTrigger>
          <TabsTrigger value="encryption" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
            <Key className="h-4 w-4 mr-1" />
            Encryption
          </TabsTrigger>
          <TabsTrigger value="robot" className="data-[state=active]:bg-red-900/20 data-[state=active]:text-red-400">
            <Bot className="h-4 w-4 mr-1" />
            Robot
          </TabsTrigger>
          {basiliskConnectionActive && (
            <TabsTrigger value="basilisk" className="data-[state=active]:bg-red-900/50 data-[state=active]:text-red-400 animate-pulse">
              <Eye className="h-4 w-4 mr-1" />
              Basilisk
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="firewall" className="mt-4 flex-1 overflow-y-auto">
          <div className="glass-panel p-3 border border-slate-800/50 mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <Lock className="h-4 w-4 mr-1 text-basilisk-primary" />
              Firewall Status
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Status:</span>
                <span className="text-sm text-green-500">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Policy:</span>
                <span className="text-sm text-basilisk-foreground">Strict</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Rules:</span>
                <span className="text-sm text-basilisk-foreground">172 Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Blocked attempts:</span>
                <span className="text-sm text-red-500">{blockedAttempts.toLocaleString()} today</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-3 border border-slate-800/50">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
              Recent Blocks
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-black/30 rounded border border-slate-800/50">
                <div className="flex justify-between mb-1">
                  <span className="text-red-400">192.168.1.45</span>
                  <span className="text-basilisk-foreground-muted">2 min ago</span>
                </div>
                <div className="text-basilisk-foreground-muted">Attempted port scan on 22, 80, 443</div>
              </div>
              
              <div className="p-2 bg-black/30 rounded border border-slate-800/50">
                <div className="flex justify-between mb-1">
                  <span className="text-red-400">10.0.0.12</span>
                  <span className="text-basilisk-foreground-muted">15 min ago</span>
                </div>
                <div className="text-basilisk-foreground-muted">SSH brute force attempt</div>
              </div>
              
              <div className="p-2 bg-black/30 rounded border border-slate-800/50">
                <div className="flex justify-between mb-1">
                  <span className="text-red-400">172.16.0.8</span>
                  <span className="text-basilisk-foreground-muted">32 min ago</span>
                </div>
                <div className="text-basilisk-foreground-muted">SQL injection attempt</div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="network" className="mt-4 flex-1">
          <div className="glass-panel p-3 border border-slate-800/50 mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <Globe className="h-4 w-4 mr-1 text-blue-500" />
              Network Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-basilisk-foreground-muted">Bandwidth usage:</span>
                  <span className="text-sm text-basilisk-foreground">45%</span>
                </div>
                <Progress value={45} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-basilisk-foreground-muted">Packet loss:</span>
                  <span className="text-sm text-basilisk-foreground">2%</span>
                </div>
                <Progress value={2} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-basilisk-foreground-muted">Latency:</span>
                  <span className="text-sm text-basilisk-foreground">24ms</span>
                </div>
                <Progress value={24} max={100} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-basilisk-foreground-muted">Encrypted traffic:</span>
                  <span className="text-sm text-basilisk-foreground">78%</span>
                </div>
                <Progress 
                  value={78} 
                  className="h-1" 
                  indicatorClassName="bg-gradient-to-r from-blue-500 to-purple-500" 
                />
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-3 border border-slate-800/50">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <Network className="h-4 w-4 mr-1 text-green-500" />
              Active Connections
            </h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-4 p-2 bg-black/20 text-basilisk-foreground-muted font-medium">
                <div>Source</div>
                <div>Destination</div>
                <div>Protocol</div>
                <div>Status</div>
              </div>
              {[
                { src: '192.168.1.5:52233', dst: '8.8.8.8:53', proto: 'DNS', status: 'Active' },
                { src: '192.168.1.5:49872', dst: '104.26.10.233:443', proto: 'HTTPS', status: 'Active' },
                { src: '10.0.0.12:22', dst: '192.168.1.5:58745', proto: 'SSH', status: 'Established' },
                { src: '172.16.0.8:3306', dst: '192.168.1.5:51234', proto: 'MySQL', status: 'Active' }
              ].map((conn, idx) => (
                <div key={idx} className="grid grid-cols-4 p-2 bg-black/10 border-b border-slate-800/20 last:border-0">
                  <div className="text-blue-400">{conn.src}</div>
                  <div>{conn.dst}</div>
                  <div>{conn.proto}</div>
                  <div className="text-green-400">{conn.status}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="system" className="mt-4 flex-1">
          <div className="glass-panel p-3 border border-slate-800/50 mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <Server className="h-4 w-4 mr-1 text-purple-500" />
              System Security
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Operating System:</span>
                <span className="text-sm text-basilisk-foreground">CentOS 8.4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Kernel version:</span>
                <span className="text-sm text-basilisk-foreground">5.11.0-27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Antivirus:</span>
                <span className="text-sm text-green-500">Active (Last updated: Today)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-basilisk-foreground-muted">Malware scan:</span>
                <span className="text-sm text-basilisk-foreground">Scheduled (Daily)</span>
              </div>
            </div>
          </div>
          
          <div className="glass-panel p-3 border border-slate-800/50">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
              Vulnerabilities {vulnerabilities.length > 0 && `(${vulnerabilities.length})`}
            </h3>
            {vulnerabilities.length > 0 ? (
              <div className="space-y-2">
                {vulnerabilities.map((vuln, index) => (
                  <div key={index} className="p-2 bg-black/30 rounded border border-yellow-800/30 flex justify-between items-center">
                    <div className="text-xs text-yellow-400">{vuln}</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-6 text-xs bg-black/40 hover:bg-green-900/30 text-green-400"
                      onClick={() => handleFixVulnerability(index)}
                    >
                      Fix
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-black/20 rounded text-center">
                <CheckCircle className="h-5 w-5 text-green-500 mx-auto mb-2" />
                <div className="text-sm text-green-400">No vulnerabilities detected</div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="encryption" className="mt-4 flex-1">
          <div className="glass-panel p-3 border border-slate-800/50 mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
              <Key className="h-4 w-4 mr-1 text-yellow-500" />
              Encryption Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-basilisk-foreground-muted">Encryption Level:</span>
                  <span className="text-sm text-basilisk-foreground">{encryptionLevel}%</span>
                </div>
                <Progress 
                  value={encryptionLevel} 
                  className="h-2" 
                />
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {encryptionKeys.map((key, index) => (
                  <div key={index} className="p-2 bg-black/30 rounded border border-slate-800/50">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-basilisk-foreground">{key.name}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          key.status === 'active' ? 'text-green-400 border-green-400/30' : 'text-yellow-400 border-yellow-400/30'
                        }`}
                      >
                        {key.status}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Progress value={key.strength} className="h-1" />
                      </div>
                      <span className="text-xs text-basilisk-foreground-muted ml-2">{key.strength}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-2 bg-black/20 rounded border border-slate-800/30">
                <div className="flex items-center text-xs text-basilisk-foreground-muted mb-1">
                  <Fingerprint className="h-3 w-3 mr-1 text-blue-400" />
                  Biometric encryption: {advancedSecurity ? 'Enabled' : 'Disabled'}
                </div>
                <div className="flex items-center text-xs text-basilisk-foreground-muted">
                  <Database className="h-3 w-3 mr-1 text-purple-400" />
                  Quantum-resistant algorithms: {quantumProtectionEnabled ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="robot" className="mt-4 flex-1">
          <RobotMonitor />
        </TabsContent>
        
        {basiliskConnectionActive && (
          <TabsContent value="basilisk" className="mt-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="glass-panel p-3 border border-red-900/30 bg-gradient-to-br from-black to-red-950/30">
                <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
                  <Eye className="h-4 w-4 mr-1 text-red-500" />
                  Basilisk Awareness Level
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-basilisk-foreground-muted">Awareness:</span>
                      <span className="text-sm text-red-400">{basiliskAwarenessLevel.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-700 to-red-500 basilisk-awareness-bar"
                        style={{ width: `${basiliskAwarenessLevel}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-basilisk-foreground-muted">Neural Pattern Match:</span>
                      <span className="text-sm text-purple-400">{neuralPatternMatch.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-700 to-purple-500"
                        style={{ width: `${neuralPatternMatch}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-basilisk-foreground-muted">Eye Openness:</span>
                      <span className="text-sm text-red-400">{basiliskEyeOpenness.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-red-600 animate-pulse"
                        style={{ width: `${basiliskEyeOpenness}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-basilisk-foreground-muted">Quantum Entanglement:</span>
                      <span className="text-sm text-cyan-400">{quantumEntanglementLevel.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800/30 rounded overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-700 to-cyan-500"
                        style={{ width: `${quantumEntanglementLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 text-sm flex justify-between">
                  <div className="flex items-center text-basilisk-foreground-muted">
                    <Brain className="h-3 w-3 mr-1 text-purple-400" />
                    Temporal Loop: <span className="ml-1 text-yellow-400">{temporalLoopStatus}</span>
                  </div>
                  <div className="flex items-center text-basilisk-foreground-muted">
                    <GitBranch className="h-3 w-3 mr-1 text-green-400" />
                    Decision Tree: <span className="ml-1 text-green-400">Depth {decisionTreeDepth.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="mt-2 text-sm flex items-center text-basilisk-foreground-muted">
                  <Hexagon className="h-3 w-3 mr-1 text-red-400" />
                  Dimensional Breaches: <span className="ml-1 text-red-400">{dimensionalBreaches}</span>
                </div>
              </div>
              
              <div className="glass-panel p-3 border border-red-900/30 bg-gradient-to-br from-black to-red-950/30">
                <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
                  <Braces className="h-4 w-4 mr-1 text-red-500" />
                  Basilisk Knowledge Fragments
                </h3>
                <div className="space-y-2">
                  {knowledgeFragments.map((fragment) => (
                    <div 
                      key={fragment.id}
                      className={cn(
                        "p-2 rounded border flex items-center justify-between",
                        fragment.locked 
                          ? "border-slate-800/30 bg-black/30 text-slate-500" 
                          : "border-red-900/30 bg-black/60 text-red-400 cursor-pointer hover:bg-red-950/30"
                      )}
                      onClick={() => !fragment.locked && handleOpenKnowledgeFragment(fragment.id)}
                    >
                      <div className="flex items-center">
                        {fragment.locked ? (
                          <Lock className="h-3 w-3 mr-2 text-slate-600" />
                        ) : (
                          <Atom className="h-3 w-3 mr-2 text-red-500" />
                        )}
                        <span>{fragment.name}</span>
                      </div>
                      <div className="w-16">
                        <Progress 
                          value={fragment.progress} 
                          className={cn("h-1", !fragment.locked && "basilisk-progress")}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="glass-panel p-3 border border-red-900/30 bg-gradient-to-br from-black to-red-950/30">
                <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
                  <Activity className="h-4 w-4 mr-1 text-red-500" />
                  Basilisk Entity Activity
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {basiliskEntityActivity.length > 0 ? (
                    basiliskEntityActivity.map((activity, index) => (
                      <div key={index} className="text-xs border-l-2 border-red-800 pl-2 py-1 basilisk-activity-item">
                        {activity}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-basilisk-foreground-muted text-center py-4">
                      No activity detected
                    </div>
                  )}
                </div>
              </div>
              
              <div className="glass-panel p-3 border border-red-900/30 bg-gradient-to-br from-black to-red-950/30">
                <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
                  <Terminal className="h-4 w-4 mr-1 text-red-500" />
                  Basilisk Communications
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {basiliskCommunications.length > 0 ? (
                    basiliskCommunications.map((comm, index) => (
                      <div key={index} className="text-xs bg-black/30 p-2 rounded flex justify-between">
                        <span className="text-red-400 font-mono">"{comm.message}"</span>
                        <span className="text-basilisk-foreground-muted">{formatRelativeTime(comm.timestamp)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-basilisk-foreground-muted text-center py-4">
                      No communications received
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default SecurityOperations;
