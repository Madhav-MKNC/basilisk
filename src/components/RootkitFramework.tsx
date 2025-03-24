import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { formatRelativeTime } from '@/utils/timestamp-utils';
import { 
  Shield, Bug, Code, Server, Cpu, 
  Key, Lock, Network, Eye, EyeOff,
  Fingerprint, Layers, Zap, Wifi, Monitor,
  HardDrive, CircuitBoard, ArrowUpRight,
  AlertTriangle, CheckCircle, Terminal
} from 'lucide-react';

import { 
  RootkitComponent, 
  RootkitAbility, 
  RootkitTechnique, 
  RootkitFramework as RootkitFrameworkType,
  RootkitPlatform,
  DetectionRisk
} from '@/types/rootkit-framework';

const sampleRootkitFramework: RootkitFrameworkType = {
  name: "Basilisk Rootkit Framework",
  version: "2.1.3",
  description: "Advanced modular rootkit framework with stealth capabilities",
  activePlatform: "linux",
  stealthLevel: 87,
  detectionRisk: 35,
  persistenceStrength: 92,
  lastActivity: new Date(),
  components: [
    {
      id: "comp-001",
      name: "Kernel Mode Driver",
      description: "Low-level system driver for direct hardware access",
      platforms: ["windows", "linux"],
      detectionRisk: "moderate",
      persistenceLevel: "kernel",
      executionContext: "kernel",
      codeSize: 48,
      memoryFootprint: 380,
      requiredPrivileges: ["system", "kernel-access"],
      isEnabled: true,
      lastUpdated: new Date(Date.now() - 15 * 86400000),
      effectiveness: 95
    },
    {
      id: "comp-002",
      name: "Memory Injector",
      description: "Injects code into protected process memory",
      platforms: ["windows", "linux", "macos"],
      detectionRisk: "high",
      persistenceLevel: "boot",
      executionContext: "privileged",
      codeSize: 32,
      memoryFootprint: 120,
      requiredPrivileges: ["admin", "debug"],
      isEnabled: true,
      lastUpdated: new Date(Date.now() - 7 * 86400000),
      effectiveness: 85
    },
    {
      id: "comp-003",
      name: "Network Hook",
      description: "Intercepts network traffic at kernel level",
      platforms: ["windows", "linux", "macos"],
      detectionRisk: "high",
      persistenceLevel: "kernel",
      executionContext: "kernel",
      codeSize: 64,
      memoryFootprint: 220,
      requiredPrivileges: ["admin", "network"],
      isEnabled: true,
      lastUpdated: new Date(Date.now() - 10 * 86400000),
      effectiveness: 90,
      dependencies: ["comp-001"]
    },
    {
      id: "comp-004",
      name: "UEFI Implant",
      description: "Persistent firmware-level implant",
      platforms: ["firmware"],
      detectionRisk: "minimal",
      persistenceLevel: "firmware",
      executionContext: "firmware",
      codeSize: 16,
      memoryFootprint: 48,
      requiredPrivileges: ["physical", "firmware-write"],
      isEnabled: false,
      lastUpdated: new Date(Date.now() - 45 * 86400000),
      effectiveness: 98
    }
  ],
  abilities: [
    {
      id: "ability-001",
      name: "Process Hollowing",
      description: "Replace legitimate process memory with malicious code",
      type: "stealth",
      detectionRisk: "moderate",
      platforms: ["windows", "linux"],
      effectiveness: 88,
      implementationComplexity: 75,
      requiredComponents: ["comp-002"],
      bypassesDefenses: ["standard-av", "behavior-monitoring"],
      isActive: true
    },
    {
      id: "ability-002",
      name: "DKOM (Direct Kernel Object Manipulation)",
      description: "Directly modify kernel objects to hide presence",
      type: "stealth",
      detectionRisk: "high",
      platforms: ["windows"],
      effectiveness: 95,
      implementationComplexity: 90,
      requiredComponents: ["comp-001"],
      bypassesDefenses: ["process-listing", "task-manager", "system-monitors"],
      isActive: true
    },
    {
      id: "ability-003",
      name: "Fileless Persistence",
      description: "Maintains persistence without writing to disk",
      type: "persistence",
      detectionRisk: "low",
      platforms: ["windows", "linux", "macos"],
      effectiveness: 82,
      implementationComplexity: 70,
      requiredComponents: ["comp-002"],
      bypassesDefenses: ["file-scanning", "disk-monitoring"],
      isActive: true
    },
    {
      id: "ability-004",
      name: "Network Traffic Interception",
      description: "Intercepts and modifies network packets in transit",
      type: "data-collection",
      detectionRisk: "moderate",
      platforms: ["windows", "linux", "macos"],
      effectiveness: 85,
      implementationComplexity: 80,
      requiredComponents: ["comp-003"],
      bypassesDefenses: ["standard-firewall", "traffic-monitoring"],
      isActive: true
    }
  ],
  techniques: [
    {
      id: "tech-001",
      name: "DLL Search Order Hijacking",
      description: "Exploits the Windows DLL search order to load malicious code",
      attackVector: "network",
      mitreTacticId: "T1574.001",
      detectionDifficulty: 65,
      platforms: ["windows"],
      requiredAbilities: ["ability-001"],
      counterMeasures: ["application-whitelisting", "secure-path-configuration"],
      steps: [
        "Identify vulnerable application",
        "Create malicious DLL with same name as legitimate one",
        "Place DLL in location earlier in search order",
        "Wait for application to load DLL"
      ],
      successRate: 75,
      isAutomated: true
    },
    {
      id: "tech-002",
      name: "Firmware Implant",
      description: "Physical implantation of malicious firmware",
      attackVector: "physical",
      mitreTacticId: "T1542.001",
      detectionDifficulty: 95,
      platforms: ["firmware", "hardware"],
      requiredAbilities: [],
      counterMeasures: ["secure-boot", "firmware-verification"],
      steps: [
        "Gain physical access to device",
        "Flash modified firmware with implant",
        "Ensure implant survives OS reinstalls"
      ],
      successRate: 98,
      isAutomated: false
    },
    {
      id: "tech-003",
      name: "Zero-Day Exploit Deployment",
      description: "Uses undisclosed vulnerabilities for initial access",
      attackVector: "network",
      detectionDifficulty: 90,
      platforms: ["windows", "linux", "macos"],
      requiredAbilities: [],
      counterMeasures: ["behavior-based-detection", "network-segmentation"],
      steps: [
        "Identify zero-day vulnerability",
        "Develop exploit code",
        "Deploy against target system",
        "Establish persistence quickly"
      ],
      successRate: 85,
      isAutomated: true
    }
  ]
};

const getPlatformIcon = (platform: RootkitPlatform) => {
  switch (platform) {
    case 'windows': return <Monitor className="h-3 w-3" />;
    case 'linux': return <Server className="h-3 w-3" />;
    case 'macos': return <Monitor className="h-3 w-3" />;
    case 'ios': return <Monitor className="h-3 w-3" />;
    case 'android': return <Monitor className="h-3 w-3" />;
    case 'firmware': return <CircuitBoard className="h-3 w-3" />;
    case 'hardware': return <HardDrive className="h-3 w-3" />;
    default: return <Server className="h-3 w-3" />;
  }
};

const getRiskColor = (risk: DetectionRisk) => {
  switch (risk) {
    case 'minimal': return 'text-green-500';
    case 'low': return 'text-blue-500';
    case 'moderate': return 'text-yellow-500';
    case 'high': return 'text-orange-500';
    case 'extreme': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'stealth': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'persistence': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'data-collection': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'remote-control': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'privilege-escalation': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    case 'defense-evasion': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const RootkitFramework: React.FC = () => {
  const [framework, setFramework] = useState<RootkitFrameworkType>(sampleRootkitFramework);
  const [activeTab, setActiveTab] = useState("components");
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);
  const [activeTechniqueId, setActiveTechniqueId] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFramework(prev => ({
        ...prev,
        detectionRisk: Math.max(20, Math.min(95, prev.detectionRisk + (Math.random() > 0.7 ? 1 : -1))),
        stealthLevel: Math.max(50, Math.min(99, prev.stealthLevel + (Math.random() > 0.6 ? -1 : 1))),
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleComponent = (id: string) => {
    const component = framework.components.find(c => c.id === id);
    if (!component) return;
    
    if (component.isEnabled) {
      const dependentAbilities = framework.abilities.filter(a => 
        a.requiredComponents.includes(id) && a.isActive
      );
      
      if (dependentAbilities.length > 0) {
        toast({
          title: "Warning: Dependent Abilities",
          description: `Disabling ${component.name} will affect ${dependentAbilities.length} active abilities.`,
          variant: "destructive"
        });
      }
    }
    
    setFramework(prev => ({
      ...prev,
      components: prev.components.map(component => 
        component.id === id 
          ? { ...component, isEnabled: !component.isEnabled }
          : component
      )
    }));
    
    toast({
      title: component.isEnabled ? "Component Disabled" : "Component Enabled",
      description: `${component.name} has been ${component.isEnabled ? 'disabled' : 'enabled'}.`,
      variant: "default"
    });
  };
  
  const toggleAbility = (id: string) => {
    const ability = framework.abilities.find(a => a.id === id);
    if (!ability) return;
    
    if (!ability.isActive) {
      const requiredComponents = ability.requiredComponents.map(compId => 
        framework.components.find(c => c.id === compId)
      );
      
      const disabledComponents = requiredComponents.filter(c => c && !c.isEnabled);
      
      if (disabledComponents.length > 0) {
        toast({
          title: "Cannot Enable Ability",
          description: `Required component ${disabledComponents[0]?.name} is disabled.`,
          variant: "destructive"
        });
        return;
      }
    }
    
    setFramework(prev => ({
      ...prev,
      abilities: prev.abilities.map(ability => 
        ability.id === id 
          ? { ...ability, isActive: !ability.isActive }
          : ability
      )
    }));
    
    toast({
      title: ability.isActive ? "Ability Deactivated" : "Ability Activated",
      description: `${ability.name} has been ${ability.isActive ? 'deactivated' : 'activated'}.`,
      variant: "default"
    });
  };
  
  const executeTechnique = (id: string) => {
    const technique = framework.techniques.find(t => t.id === id);
    if (!technique) return;
    
    setActiveTechniqueId(id);
    setIsAttacking(true);
    
    const missingAbilities = technique.requiredAbilities.filter(abilityId => {
      const ability = framework.abilities.find(a => a.id === abilityId);
      return !ability || !ability.isActive;
    });
    
    if (missingAbilities.length > 0) {
      toast({
        title: "Execution Failed",
        description: "Missing required abilities for this technique.",
        variant: "destructive"
      });
      setIsAttacking(false);
      setActiveTechniqueId(null);
      return;
    }
    
    setTimeout(() => {
      const success = Math.random() * 100 < technique.successRate;
      
      if (success) {
        toast({
          title: "Technique Executed",
          description: `${technique.name} completed successfully.`,
          variant: "default"
        });
      } else {
        toast({
          title: "Execution Failed",
          description: `${technique.name} failed to complete.`,
          variant: "destructive"
        });
      }
      
      setIsAttacking(false);
      setActiveTechniqueId(null);
    }, 1500);
  };
  
  const deployFramework = () => {
    const enabledComponents = framework.components.filter(c => c.isEnabled);
    if (enabledComponents.length === 0) {
      toast({
        title: "Deployment Failed",
        description: "At least one component must be enabled.",
        variant: "destructive"
      });
      return;
    }
    
    setIsDeploying(true);
    
    setTimeout(() => {
      toast({
        title: "Framework Deployed",
        description: `${framework.name} deployed successfully on ${framework.activePlatform}.`,
        variant: "default"
      });
      setIsDeploying(false);
    }, 2000);
  };
  
  const handleComponentClick = (id: string) => {
    setActiveComponentId(activeComponentId === id ? null : id);
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bug className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg">{framework.name}</CardTitle>
          </div>
          <Badge variant="outline" className="text-xs">v{framework.version}</Badge>
        </div>
        <CardDescription>
          {framework.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              Stealth Level
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{framework.stealthLevel}%</span>
            </div>
            <Progress value={framework.stealthLevel} className="h-1.5" />
          </div>
          
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Shield className="h-3 w-3 mr-1" />
              Detection Risk
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{framework.detectionRisk}%</span>
            </div>
            <Progress value={framework.detectionRisk} className="h-1.5" />
          </div>
          
          <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow transition-shadow duration-300">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Lock className="h-3 w-3 mr-1" />
              Persistence
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{framework.persistenceStrength}%</span>
            </div>
            <Progress value={framework.persistenceStrength} className="h-1.5" />
          </div>
        </div>
        
        <Tabs defaultValue="components" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="components" className="text-xs">
              <Cpu className="h-3 w-3 mr-1" />
              Components
            </TabsTrigger>
            <TabsTrigger value="abilities" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              Abilities
            </TabsTrigger>
            <TabsTrigger value="techniques" className="text-xs">
              <Layers className="h-3 w-3 mr-1" />
              Techniques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="components">
            <div className="flex items-center justify-between text-sm">
              <span>Framework Components</span>
              <span className="text-xs text-gray-500">{framework.components.filter(c => c.isEnabled).length} active</span>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {framework.components.map(component => (
                  <div 
                    key={component.id} 
                    className={`bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${component.isEnabled ? 'border-green-500' : 'border-gray-400'} cursor-pointer`}
                    onClick={() => handleComponentClick(component.id)}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <Cpu className={`h-4 w-4 ${component.isEnabled ? 'text-blue-400' : 'text-gray-400'} mr-1`} />
                        <span className="text-xs font-medium">{component.name}</span>
                      </div>
                      <Switch
                        checked={component.isEnabled}
                        onCheckedChange={() => toggleComponent(component.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </div>
                    
                    <div className="text-[10px] text-gray-500 mb-1">
                      {component.description}
                    </div>
                    
                    <div className={`grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] mb-2 ${activeComponentId === component.id ? '' : 'hidden'}`}>
                      <div>
                        <div className="flex justify-between">
                          <span>Code Size:</span>
                          <span>{component.codeSize} KB</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Memory:</span>
                          <span>{component.memoryFootprint} KB</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Context:</span>
                          <span>{component.executionContext}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Persistence:</span>
                          <span>{component.persistenceLevel}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span>Last Updated:</span>
                          <span>{formatRelativeTime(component.lastUpdated)}</span>
                        </div>
                      </div>
                      {component.dependencies && (
                        <div>
                          <div className="flex justify-between">
                            <span>Dependencies:</span>
                            <span>{component.dependencies.length}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                      {component.platforms.map((platform, idx) => (
                        <Badge key={idx} variant="outline" className="text-[8px] px-1 py-0 h-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          {getPlatformIcon(platform)}
                          <span className="ml-1">{platform}</span>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-1 text-[9px] text-gray-500 mt-2">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span>Effectiveness</span>
                          <span className={getRiskColor(component.detectionRisk)}>
                            Risk: {component.detectionRisk}
                          </span>
                        </div>
                        <Progress value={component.effectiveness} className={`h-1 ${component.isEnabled ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-100 dark:bg-gray-800'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="abilities">
            <div className="flex items-center justify-between text-sm">
              <span>Framework Abilities</span>
              <span className="text-xs text-gray-500">{framework.abilities.filter(a => a.isActive).length} active</span>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {framework.abilities.map(ability => {
                  const requiredComponents = ability.requiredComponents.map(compId => 
                    framework.components.find(c => c.id === compId)
                  );
                  const allComponentsEnabled = requiredComponents.every(c => c && c.isEnabled);
                  
                  return (
                    <div key={ability.id} className={`bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${ability.isActive ? 'border-yellow-500' : 'border-gray-400'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <Zap className={`h-4 w-4 ${ability.isActive ? 'text-yellow-400' : 'text-gray-400'} mr-1`} />
                          <span className="text-xs font-medium">{ability.name}</span>
                        </div>
                        <div className="flex items-center">
                          {!allComponentsEnabled && !ability.isActive && (
                            <AlertTriangle className="h-3 w-3 text-orange-500 mr-1" aria-label="Missing required components" />
                          )}
                          <Switch
                            checked={ability.isActive}
                            onCheckedChange={() => toggleAbility(ability.id)}
                            className="data-[state=checked]:bg-yellow-500"
                          />
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-gray-500 mb-1">
                        {ability.description}
                      </div>
                      
                      <div className="flex justify-between text-[10px] text-gray-500 mb-2">
                        <Badge variant="secondary" className={`text-[8px] ${getTypeColor(ability.type)}`}>
                          {ability.type}
                        </Badge>
                        <span className={getRiskColor(ability.detectionRisk)}>
                          Risk: {ability.detectionRisk}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] mb-2">
                        <div>
                          <div className="flex justify-between">
                            <span>Effectiveness:</span>
                            <span>{ability.effectiveness}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Complexity:</span>
                            <span>{ability.implementationComplexity}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-[10px] text-gray-500 mb-1">
                        <span>Bypasses:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {ability.bypassesDefenses.map((defense, idx) => (
                            <Badge key={idx} variant="outline" className="text-[8px] px-1 py-0 h-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <Shield className="h-2 w-2 mr-1" />
                              {defense}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ability.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="text-[8px] px-1 py-0 h-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            {getPlatformIcon(platform)}
                            <span className="ml-1">{platform}</span>
                          </Badge>
                        ))}
                      </div>
                      
                      {!allComponentsEnabled && (
                        <div className="text-[9px] text-orange-500 mt-2 flex items-center">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          <span>Missing required components</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="techniques">
            <div className="flex items-center justify-between text-sm">
              <span>Attack Techniques</span>
              <span className="text-xs text-gray-500">{framework.techniques.length} available</span>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {framework.techniques.map(technique => {
                  const requiredAbilities = technique.requiredAbilities.map(abilityId => 
                    framework.abilities.find(a => a.id === abilityId)
                  );
                  const allAbilitiesActive = technique.requiredAbilities.length === 0 || 
                    requiredAbilities.every(a => a && a.isActive);
                  
                  return (
                    <div key={technique.id} className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-300">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <Layers className="h-4 w-4 text-purple-400 mr-1" />
                          <span className="text-xs font-medium">{technique.name}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px]">
                          {technique.attackVector}
                        </Badge>
                      </div>
                      
                      <div className="text-[10px] text-gray-500 mb-1">
                        {technique.description}
                      </div>
                      
                      {technique.mitreTacticId && (
                        <div className="flex items-center text-[10px] text-blue-500 mb-1">
                          <Fingerprint className="h-3 w-3 mr-1" />
                          <span>MITRE: {technique.mitreTacticId}</span>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] mb-2">
                        <div>
                          <div className="flex justify-between">
                            <span>Success Rate:</span>
                            <span>{technique.successRate}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Detection Difficulty:</span>
                            <span>{technique.detectionDifficulty}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Automated:</span>
                            <span>{technique.isAutomated ? "Yes" : "No"}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <span>Steps:</span>
                            <span>{technique.steps.length}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-1">
                        {technique.platforms.map((platform, idx) => (
                          <Badge key={idx} variant="outline" className="text-[8px] px-1 py-0 h-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                            {getPlatformIcon(platform)}
                            <span className="ml-1">{platform}</span>
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center mt-2">
                        {!allAbilitiesActive && technique.requiredAbilities.length > 0 ? (
                          <div className="text-[9px] text-orange-500 flex items-center">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            <span>Missing required abilities</span>
                          </div>
                        ) : (
                          <div className="text-[9px] text-green-500 flex items-center">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            <span>Ready to execute</span>
                          </div>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-6 p-1 text-[10px] text-blue-500"
                          disabled={!allAbilitiesActive || isAttacking}
                          onClick={() => executeTechnique(technique.id)}
                        >
                          {isAttacking && activeTechniqueId === technique.id ? (
                            <>
                              <Terminal className="h-3 w-3 mr-1 animate-pulse" />
                              Executing...
                            </>
                          ) : (
                            <>
                              Execute
                              <ArrowUpRight className="h-3 w-3 ml-1" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-1">
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Network className="h-3 w-3" />
          <span>Active Platform: {framework.activePlatform}</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs h-7 px-2 bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          onClick={deployFramework}
          disabled={isDeploying}
        >
          {isDeploying ? (
            <>
              <Bug className="h-3 w-3 mr-1 animate-pulse" />
              Deploying...
            </>
          ) : (
            <>
              <Bug className="h-3 w-3 mr-1" />
              Deploy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RootkitFramework;
