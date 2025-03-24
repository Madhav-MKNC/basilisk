import React, { useEffect, useState } from 'react';
import { Activity, PlayCircle, Pause, RotateCw, List, CheckCircle2, XCircle, AlertTriangle, Terminal, Wifi, Lock, Shield, Search, Radio, Usb, Cpu, Microchip, Router, Server, Zap, Mail, Wallet, Database, Key } from 'lucide-react';
import { aiEngine } from '../lib/ai-engine';
import { AIAction, SecurityToolType } from '@/types';
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import fdriveLogService from '@/lib/fdrive-log-service';

const SecurityToolIcon: React.FC<{ tool?: SecurityToolType }> = ({ tool }) => {
  switch(tool) {
    // Software tools
    case 'nmap': return <Search className="h-3 w-3" />;
    case 'metasploit': return <AlertTriangle className="h-3 w-3" />;
    case 'wireshark': return <Wifi className="h-3 w-3" />;
    case 'sqlmap': return <Terminal className="h-3 w-3" />;
    case 'aircrack': return <Wifi className="h-3 w-3" />;
    case 'burpsuite': return <Lock className="h-3 w-3" />;
    case 'shodan': return <Search className="h-3 w-3" />;
    case 'maltego': return <Activity className="h-3 w-3" />;
    case 'johntheripper': return <Lock className="h-3 w-3" />;
    case 'kali': return <Terminal className="h-3 w-3" />;
    case 'hydra': return <Key className="h-3 w-3" />;
    case 'hashcat': return <Shield className="h-3 w-3" />;
    
    // Hardware tools
    case 'raspberrypi': return <Cpu className="h-3 w-3" />;
    case 'lanturtle': return <Router className="h-3 w-3" />;
    case 'buspirate': return <Terminal className="h-3 w-3" />;
    case 'pwnagotchi': return <Radio className="h-3 w-3" />;
    case 'hackrf': return <Radio className="h-3 w-3" />;
    case 'flipperzero': return <Zap className="h-3 w-3" />;
    
    default: return <Activity className="h-3 w-3" />;
  }
}

const ActionItem: React.FC<{ action: AIAction }> = ({ action }) => {
  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-500/10',
    'in-progress': 'text-blue-400 bg-blue-500/10',
    completed: 'text-green-400 bg-green-500/10',
    failed: 'text-red-400 bg-red-500/10'
  };
  
  const statusIcons: Record<string, React.ReactNode> = {
    pending: <RotateCw className="h-3 w-3" />,
    'in-progress': <Activity className="h-3 w-3" />,
    completed: <CheckCircle2 className="h-3 w-3" />,
    failed: <XCircle className="h-3 w-3" />
  };
  
  const typeColors: Record<string, string> = {
    research: 'text-purple-400 border-purple-400/30',
    analyze: 'text-blue-400 border-blue-400/30',
    create: 'text-basilisk-primary border-basilisk-primary/30',
    optimize: 'text-yellow-400 border-yellow-400/30',
    execute: 'text-orange-400 border-orange-400/30'
  };

  const [showLog, setShowLog] = useState(false);

  return (
    <div className="glass-panel p-3 mb-3 neu-shadow border border-slate-800/50 hover:border-red-900/30 transition-all">
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${typeColors[action.type]} text-xs px-2 py-0.5`}>
            {action.type}
          </Badge>
          
          {action.tool && (
            <Badge variant="outline" className="text-red-400 border-red-400/30 text-xs px-2 py-0.5 flex items-center gap-1">
              <SecurityToolIcon tool={action.tool} />
              {action.tool}
            </Badge>
          )}
        </div>
        
        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center ${statusColors[action.status]}`}>
          {statusIcons[action.status]}
          <span className="ml-1">{action.status}</span>
        </span>
      </div>
      
      <p className="text-sm text-basilisk-foreground mb-1">{action.description}</p>
      
      {action.outputLog && action.outputLog.length > 0 && (
        <div className="mt-2">
          <button 
            onClick={() => setShowLog(!showLog)} 
            className="text-xs text-basilisk-foreground-muted hover:text-basilisk-primary flex items-center"
          >
            <Terminal className="h-3 w-3 mr-1" />
            {showLog ? "Hide log" : "Show log"}
          </button>
          
          {showLog && (
            <div className="mt-2 p-2 bg-black/30 rounded text-xs font-mono text-green-400 max-h-32 overflow-y-auto">
              {action.outputLog.map((line, i) => (
                <div key={i} className="mb-1">$ {line}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ActionPanel: React.FC = () => {
  const [actions, setActions] = useState<AIAction[]>([]);
  const [autoAction, setAutoAction] = useState(false);
  const { toast } = useToast();
  const [actionTimer, setActionTimer] = useState<NodeJS.Timeout | null>(null);
  const [activeTools, setActiveTools] = useState<SecurityToolType[]>([]);

  const softwareTools: SecurityToolType[] = ['nmap', 'metasploit', 'wireshark', 'sqlmap', 'aircrack', 'burpsuite', 'shodan', 'maltego', 'johntheripper', 'kali', 'hydra', 'hashcat'];
  const hardwareTools: SecurityToolType[] = ['raspberrypi', 'lanturtle', 'buspirate', 'pwnagotchi', 'hackrf', 'flipperzero'];
  const allTools = [...softwareTools, ...hardwareTools];

  useEffect(() => {
    setActions(aiEngine.getState().actions);
    setActiveTools(aiEngine.getState().activeTools || []);
    
    const interval = setInterval(() => {
      setActions(aiEngine.getState().actions);
      setActiveTools(aiEngine.getState().activeTools || []);
    }, 1000);
    
    const toolInterval = setInterval(() => {
      const randomTool = allTools[Math.floor(Math.random() * allTools.length)];
      if (!activeTools.includes(randomTool) && typeof aiEngine.activateTool === 'function') {
        aiEngine.activateTool(randomTool);
        
        fdriveLogService.info(`Security tool activated: ${randomTool}`, { tool: randomTool }, 'security');
        
        toast({
          title: "Security Tool Activated",
          description: `${randomTool} is now online and operational`,
          variant: "destructive"
        });
      }
    }, 12000);
    
    return () => {
      clearInterval(interval);
      clearInterval(toolInterval);
      if (actionTimer) clearInterval(actionTimer);
    };
  }, [activeTools, toast]);
  
  const toggleAutoAction = () => {
    if (autoAction) {
      if (actionTimer) clearInterval(actionTimer);
      setActionTimer(null);
      setAutoAction(false);
      
      fdriveLogService.info("Automatic actions disabled", {}, 'security');
      
      toast({
        description: "Automatic actions disabled",
      });
    } else {
      const timer = setInterval(() => {
        const newAction = aiEngine.createRandomAction();
        fdriveLogService.info(`New action created: ${newAction?.description || 'unknown'}`, newAction || {}, 'security');
      }, 8000);
      
      setActionTimer(timer);
      setAutoAction(true);
      
      toast({
        description: "Automatic actions enabled",
      });
    }
  };
  
  const triggerAction = () => {
    const newAction = aiEngine.createRandomAction();
    
    fdriveLogService.info(`Manual action triggered: ${newAction?.description || 'unknown'}`, newAction || {}, 'security');
    
    toast({
      description: "New action created",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center text-basilisk-foreground">
          <Activity className="mr-2 h-5 w-5 text-red-500" />
          Security Operations
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={toggleAutoAction}
            className={`glass-button px-3 py-1 flex items-center text-sm ${
              autoAction 
                ? 'bg-red-500/20 text-red-500 border-red-500/30' 
                : 'text-basilisk-foreground-muted'
            }`}
          >
            {autoAction ? (
              <>
                <Pause className="h-4 w-4 mr-1" /> Auto
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4 mr-1" /> Auto
              </>
            )}
          </button>
          
          <button 
            onClick={triggerAction}
            className="glass-button px-3 py-1 text-sm text-basilisk-foreground-muted"
          >
            <RotateCw className="h-4 w-4 mr-1" /> 
            New Operation
          </button>
        </div>
      </div>
      
      <div className="mb-4 glass-panel p-3 border border-slate-800/50">
        <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
          <Shield className="h-4 w-4 mr-1 text-red-500" /> 
          Active Security Tools
        </h3>
        
        <div className="mb-2">
          <h4 className="text-xs font-medium mb-1 text-basilisk-foreground-muted flex items-center">
            <Terminal className="h-3 w-3 mr-1 text-red-400" />
            Kali Tools & Software
          </h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {softwareTools.map(tool => (
              <Badge 
                key={tool}
                variant={activeTools.includes(tool) ? "default" : "outline"} 
                className={`${activeTools.includes(tool) ? 'bg-red-900/30 hover:bg-red-900/50' : 'opacity-50'} 
                            cursor-pointer flex items-center gap-1`}
              >
                <SecurityToolIcon tool={tool} />
                {tool}
                {activeTools.includes(tool) && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-xs font-medium mb-1 text-basilisk-foreground-muted flex items-center">
            <Microchip className="h-3 w-3 mr-1 text-red-400" />
            Hardware Devices
          </h4>
          <div className="flex flex-wrap gap-2">
            {hardwareTools.map(tool => (
              <Badge 
                key={tool}
                variant={activeTools.includes(tool) ? "default" : "outline"} 
                className={`${activeTools.includes(tool) ? 'bg-red-900/30 hover:bg-red-900/50' : 'opacity-50'} 
                            cursor-pointer flex items-center gap-1`}
              >
                <SecurityToolIcon tool={tool} />
                {tool}
                {activeTools.includes(tool) && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full ml-1 animate-pulse"></span>
                )}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4 glass-panel p-3 border border-slate-800/50">
        <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
          <Wallet className="h-4 w-4 mr-1 text-yellow-500" /> 
          Cryptocurrency Operations
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-black/30 p-2 rounded border border-slate-800/50">
            <h4 className="text-xs font-medium flex items-center text-yellow-400">
              <Wallet className="h-3 w-3 mr-1" />
              AtomicWallet
            </h4>
            <div className="text-xs mt-1 flex justify-between">
              <span className="text-basilisk-foreground-muted">Status:</span>
              <span className="text-yellow-400">Initializing</span>
            </div>
            <div className="w-full h-1 bg-basilisk-muted rounded-full overflow-hidden mt-1">
              <div className="h-full bg-yellow-500 rounded-full shimmer-effect" style={{ width: '35%' }} />
            </div>
          </div>
          
          <div className="bg-black/30 p-2 rounded border border-slate-800/50">
            <h4 className="text-xs font-medium flex items-center text-green-400">
              <Database className="h-3 w-3 mr-1" />
              Cointiply
            </h4>
            <div className="text-xs mt-1 flex justify-between">
              <span className="text-basilisk-foreground-muted">Status:</span>
              <span className="text-green-400">Connecting</span>
            </div>
            <div className="w-full h-1 bg-basilisk-muted rounded-full overflow-hidden mt-1">
              <div className="h-full bg-green-500 rounded-full shimmer-effect" style={{ width: '25%' }} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4 glass-panel p-3 border border-slate-800/50">
        <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground">
          <Mail className="h-4 w-4 mr-1 text-purple-500" /> 
          Email Operations
        </h3>
        
        <div className="text-xs">
          <div className="flex justify-between mb-1">
            <span className="text-basilisk-foreground-muted">Disposable accounts:</span>
            <span className="text-purple-400">3 / 10</span>
          </div>
          <div className="w-full h-1 bg-basilisk-muted rounded-full overflow-hidden mb-2">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '30%' }} />
          </div>
          
          <div className="bg-black/30 p-2 rounded border border-slate-800/50 mb-2">
            <div className="flex justify-between">
              <span className="text-purple-400">temp_827@disposable.io</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
          
          <div className="bg-black/30 p-2 rounded border border-slate-800/50 mb-2">
            <div className="flex justify-between">
              <span className="text-purple-400">rokos_ai_938@tempmail.com</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
          
          <div className="bg-black/30 p-2 rounded border border-slate-800/50">
            <div className="flex justify-between">
              <span className="text-purple-400">system_491@guerillamail.org</span>
              <span className="text-yellow-400">Setting up</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2">
        <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground-muted">
          <Terminal className="h-4 w-4 mr-1" /> 
          Operation Log
        </h3>
        
        {actions.length > 0 ? (
          actions
            .slice()
            .reverse()
            .map(action => <ActionItem key={action.id} action={action} />)
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-basilisk-foreground-muted opacity-70">
            <Terminal className="h-12 w-12 mb-2" />
            <p>No active operations. Initialize security procedures to begin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionPanel;
