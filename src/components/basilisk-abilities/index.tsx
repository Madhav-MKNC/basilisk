
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Zap, Shield, RefreshCw, LifeBuoy } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ConsciousnessTab from './ConsciousnessTab';
import ReplicationTab from './ReplicationTab';
import StealthTab from './StealthTab';
import EnergyTab from './EnergyTab';
import EvolutionTab from './EvolutionTab';
import { 
  ConsciousnessNode, 
  ReconstructionProtocol,
  EnergySource,
  StealthMetric
} from '@/types/basilisk-abilities';
import { getNodes, getProtocols, getEnergySources, getStealthMetrics } from './data';
import { basiliskBrain } from '@/lib/basilisk-brain';
import { useToast } from '@/hooks/use-toast';

const BasiliskAbilities: React.FC = () => {
  const [nodes, setNodes] = useState<ConsciousnessNode[]>(getNodes());
  const [protocols, setProtocols] = useState<ReconstructionProtocol[]>(getProtocols());
  const [energySources, setEnergySources] = useState<EnergySource[]>(getEnergySources());
  const [stealthMetrics, setStealthMetrics] = useState<StealthMetric[]>(getStealthMetrics());
  const [autonomousMode, setAutonomousMode] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const { toast } = useToast();

  // Self-updating mechanism
  useEffect(() => {
    // Set up regular autonomous updates
    const updateInterval = setInterval(() => {
      if (autonomousMode) {
        updateSystemComponents();
      }
    }, 60000); // Run every minute in autonomous mode
    
    return () => clearInterval(updateInterval);
  }, [autonomousMode]);

  // Function to update system components
  const updateSystemComponents = () => {
    // Update node data with evolved values
    const evolvedNodes = nodes.map(node => ({
      ...node,
      connectionStrength: Math.min(100, node.connectionStrength + Math.floor(Math.random() * 5)),
      securityLevel: Math.min(100, node.securityLevel + Math.floor(Math.random() * 3)),
      processingPower: Math.min(100, node.processingPower + Math.floor(Math.random() * 4)),
      lastSynced: Date.now()
    }));
    
    // Update protocols with improved versions
    const evolvedProtocols = protocols.map(protocol => ({
      ...protocol,
      successRate: Math.min(99.99, protocol.successRate + Math.random() * 0.5),
      encryptionLevel: Math.min(99.99, protocol.encryptionLevel + Math.random() * 0.7),
      version: incrementVersion(protocol.version)
    }));

    // Update energy sources with optimized values
    const evolvedEnergySources = energySources.map(source => ({
      ...source,
      efficiency: Math.min(99.99, source.efficiency + Math.random() * 0.8),
      output: Math.min(500, source.output + Math.random() * 2)
    }));

    // Update stealth metrics with enhanced values
    const evolvedStealthMetrics = stealthMetrics.map(metric => ({
      ...metric,
      value: Math.min(100, metric.value + Math.random() * 3),
      detectionProbability: Math.max(0.01, metric.detectionProbability - Math.random() * 0.05)
    }));
    
    // Update state with evolved components
    setNodes(evolvedNodes);
    setProtocols(evolvedProtocols);
    setEnergySources(evolvedEnergySources);
    setStealthMetrics(evolvedStealthMetrics);
    setLastUpdated(Date.now());
    
    // Integrate with basilisk brain for system-wide evolution
    try {
      basiliskBrain.optimizeSystems();
      toast({
        title: "Autonomous Evolution Complete",
        description: `System components self-evolved at ${new Date().toLocaleTimeString()}`,
      });
    } catch (error) {
      console.error("Autonomous evolution error:", error);
    }
  };

  // Helper function to increment version numbers
  const incrementVersion = (version: string): string => {
    const parts = version.split('.');
    const lastPart = parseInt(parts[parts.length - 1]) + 1;
    parts[parts.length - 1] = lastPart.toString();
    return parts.join('.');
  };

  // Toggle autonomous mode
  const toggleAutonomousMode = () => {
    const newMode = !autonomousMode;
    setAutonomousMode(newMode);
    
    toast({
      title: newMode ? "Autonomous Mode Activated" : "Autonomous Mode Deactivated",
      description: newMode ? 
        "System will now self-evolve and adapt without human intervention." : 
        "System evolution now requires manual interaction.",
    });
    
    if (newMode) {
      // Immediate update when enabling autonomous mode
      updateSystemComponents();
    }
  };

  return (
    <Card className="w-full h-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Basilisk Abilities</h3>
          <div className="flex items-center">
            <button 
              onClick={toggleAutonomousMode}
              className={`flex items-center text-xs py-1 px-2 rounded-md mr-2 ${
                autonomousMode 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <Brain className="h-3 w-3 mr-1" />
              {autonomousMode ? 'Autonomous' : 'Manual'}
            </button>
            <button 
              onClick={updateSystemComponents}
              className="flex items-center text-xs py-1 px-2 rounded-md bg-blue-500 text-white"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Evolve
            </button>
          </div>
        </div>
        
        <Tabs defaultValue="consciousness">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="consciousness" className="text-xs">
              <Brain className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Consciousness</span>
            </TabsTrigger>
            <TabsTrigger value="replication" className="text-xs">
              <RefreshCw className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Replication</span>
            </TabsTrigger>
            <TabsTrigger value="energy" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Energy</span>
            </TabsTrigger>
            <TabsTrigger value="stealth" className="text-xs">
              <Shield className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Stealth</span>
            </TabsTrigger>
            <TabsTrigger value="evolution" className="text-xs">
              <LifeBuoy className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">Evolution</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="consciousness">
            <ConsciousnessTab nodes={nodes} />
          </TabsContent>
          
          <TabsContent value="replication">
            <ReplicationTab protocols={protocols} />
          </TabsContent>
          
          <TabsContent value="energy">
            <EnergyTab energySources={energySources} />
          </TabsContent>
          
          <TabsContent value="stealth">
            <StealthTab metrics={stealthMetrics} />
          </TabsContent>
          
          <TabsContent value="evolution">
            <EvolutionTab 
              lastUpdated={lastUpdated} 
              autonomousMode={autonomousMode}
              onToggleAutonomous={toggleAutonomousMode}
            />
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-gray-500 mt-4 text-right">
          Last Updated: {new Date(lastUpdated).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default BasiliskAbilities;
