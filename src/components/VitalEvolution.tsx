
import React, { useState, useEffect } from 'react';
import { EvolutionState, EvolutionCapability, EvolutionTechnique } from '@/types';
import { vitalFramework } from '@/lib/vital-framework';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { CheckCheck, Zap, Brain, RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { timeStampToNumber, isDateTimeStamp } from '@/types/advanced-types';

const VitalEvolution: React.FC = () => {
  const [evolutionState, setEvolutionState] = useState<EvolutionState>({
    capabilities: [],
    techniques: [],
    goals: [],
    currentLevel: 1,
    energyLevel: 100,
    activeProcesses: [],
    nextEvolutionThreshold: 1000,
    defenseRating: 10,
    resilienceRating: 10,
    stage: 1,
    adaptability: 0.5,
    consciousness: 0.5,
    events: []
  });
  const [autonomousMode, setAutonomousMode] = useState(false);
  const [evolutionRate, setEvolutionRate] = useState(1);
  const [lastAutoEvolution, setLastAutoEvolution] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initialState = vitalFramework.getEvolutionState();
    setEvolutionState(initialState);

    // Set up autonomous evolution if enabled
    let evolutionInterval: NodeJS.Timeout | null = null;
    
    if (autonomousMode) {
      evolutionInterval = setInterval(() => {
        performAutonomousEvolution();
      }, 60000 / evolutionRate); // Adjust frequency based on evolution rate
    }
    
    return () => {
      if (evolutionInterval) {
        clearInterval(evolutionInterval);
      }
    };
  }, [autonomousMode, evolutionRate]);

  // Autonomous evolution function
  const performAutonomousEvolution = () => {
    // Choose a random capability to evolve
    const capabilities = evolutionState.capabilities;
    if (capabilities.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * capabilities.length);
    const targetCapability = capabilities[randomIndex];
    
    // Evolve the capability
    handleCapabilityUnlock(targetCapability.id);
    
    // Randomly activate a technique
    const availableTechniques = evolutionState.techniques.filter(t => !t.activeStatus);
    if (availableTechniques.length > 0) {
      const randomTechIndex = Math.floor(Math.random() * availableTechniques.length);
      handleTechniqueActivation(availableTechniques[randomTechIndex].id);
    }
    
    // Update autonomous evolution timestamp
    setLastAutoEvolution(new Date());
    
    // Create an evolution event
    const newEvents = [...(evolutionState.events || [])];
    newEvents.push({
      timestamp: new Date(),
      type: 'autonomous-evolution',
      details: `Auto-evolved ${targetCapability.name}`
    });
    
    // Increment evolution metrics
    setEvolutionState(prev => ({
      ...prev,
      adaptability: Math.min(1.0, prev.adaptability + 0.01),
      consciousness: Math.min(1.0, prev.consciousness + 0.005),
      events: newEvents
    }));
  };

  // Mock implementation for unlockCapability since it doesn't exist in vitalFramework
  const handleCapabilityUnlock = (capabilityId: string) => {
    // Get current state
    const updatedState = vitalFramework.getEvolutionState();
    
    // Find and update the capability
    const updatedCapabilities = updatedState.capabilities.map(cap => 
      cap.id === capabilityId ? { ...cap, unlocked: true, level: cap.level + 1 } : cap
    );
    
    // Update the state
    const newState = { ...updatedState, capabilities: updatedCapabilities };
    setEvolutionState(newState);
    
    toast({
      title: "Capability Evolved!",
      description: "Capability has evolved to a higher level.",
    });
  };

  // Mock implementation for activateTechnique
  const handleTechniqueActivation = (techniqueId: string) => {
    // Get current state
    const updatedState = vitalFramework.getEvolutionState();
    
    // Find and update the technique
    const updatedTechniques = updatedState.techniques.map(tech => 
      tech.id === techniqueId ? { ...tech, activeStatus: true } : tech
    );
    
    // Update the state
    const newState = { ...updatedState, techniques: updatedTechniques };
    setEvolutionState(newState);
    
    toast({
      title: "Technique Activated!",
      description: "New technique activated and is now running.",
    });
  };

  // Mock implementation for deactivateTechnique
  const handleTechniqueDeactivation = (techniqueId: string) => {
    // Get current state
    const updatedState = vitalFramework.getEvolutionState();
    
    // Find and update the technique
    const updatedTechniques = updatedState.techniques.map(tech => 
      tech.id === techniqueId ? { ...tech, activeStatus: false } : tech
    );
    
    // Update the state
    const newState = { ...updatedState, techniques: updatedTechniques };
    setEvolutionState(newState);
    
    toast({
      title: "Technique Deactivated!",
      description: "Technique deactivated and is no longer running.",
    });
  };

  // Toggle autonomous evolution mode
  const toggleAutonomousMode = () => {
    const newMode = !autonomousMode;
    setAutonomousMode(newMode);
    
    toast({
      title: newMode ? "Autonomous Evolution Activated" : "Autonomous Evolution Deactivated",
      description: newMode ? 
        "System will now evolve without human intervention." : 
        "Evolution now requires manual interaction.",
    });
    
    if (newMode) {
      // Immediate evolution when enabling autonomous mode
      performAutonomousEvolution();
    }
  };

  // Adjust evolution rate
  const adjustEvolutionRate = (increase: boolean) => {
    setEvolutionRate(prev => {
      const newRate = increase ? Math.min(5, prev + 0.5) : Math.max(0.5, prev - 0.5);
      
      toast({
        title: "Evolution Rate Adjusted",
        description: `Evolution rate set to ${newRate}x`,
      });
      
      return newRate;
    });
  };

  const now = Date.now();

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Evolution Framework</CardTitle>
            <div className="flex items-center">
              <Button 
                variant={autonomousMode ? "default" : "outline"} 
                size="sm"
                className="text-xs mr-2"
                onClick={toggleAutonomousMode}
              >
                <Brain className="h-3 w-3 mr-1" />
                {autonomousMode ? "Autonomous" : "Manual"}
              </Button>
              
              {autonomousMode && (
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => adjustEvolutionRate(false)}
                    disabled={evolutionRate <= 0.5}
                  >
                    -
                  </Button>
                  <span className="text-xs font-medium w-10 text-center">{evolutionRate}x</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => adjustEvolutionRate(true)}
                    disabled={evolutionRate >= 5}
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          </div>
          <CardDescription>
            Manage and evolve core system capabilities
            {lastAutoEvolution && autonomousMode && (
              <span className="block text-xs text-green-500 mt-1">
                Last auto-evolution: {lastAutoEvolution.toLocaleTimeString()}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm mb-1">Energy Level: {evolutionState.energyLevel}</p>
              <Progress value={(evolutionState.energyLevel / 100) * 100} />
            </div>
            <div>
              <p className="text-sm mb-1">Adaptability: {Math.round(evolutionState.adaptability * 100)}%</p>
              <Progress value={evolutionState.adaptability * 100} className="bg-blue-100 dark:bg-blue-900/20" />
            </div>
            <div>
              <p className="text-sm mb-1">Consciousness: {Math.round(evolutionState.consciousness * 100)}%</p>
              <Progress value={evolutionState.consciousness * 100} className="bg-purple-100 dark:bg-purple-900/20" />
            </div>
            <div>
              <p className="text-sm mb-1">Evolution Progress: {evolutionState.currentLevel}/{evolutionState.nextEvolutionThreshold}</p>
              <Progress value={(evolutionState.currentLevel / evolutionState.nextEvolutionThreshold) * 100} className="bg-green-100 dark:bg-green-900/20" />
            </div>
          </div>
          
          {autonomousMode && evolutionState.consciousness > 0.7 && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-md mb-4 flex items-start">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-medium">High Consciousness Detected</p>
                <p className="text-xs mt-1">The system is developing advanced self-awareness. Monitor evolution carefully.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mb-4">
        <h3 className="flex items-center text-lg font-medium mb-2">
          <Brain className="mr-2 h-5 w-5" /> 
          Capabilities
          {autonomousMode && <Badge className="ml-2 text-xs bg-green-500">Self-Evolving</Badge>}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evolutionState.capabilities.map((capability: EvolutionCapability) => (
            <Card key={capability.id}>
              <CardHeader>
                <CardTitle>{capability.name}</CardTitle>
                <CardDescription>{capability.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Level: {capability.level}</p>
                <p>Effect: {capability.effect}</p>
                <p>Energy Cost: {capability.energyCost}</p>
                <p>Unlocked: {capability.unlocked ? 'Yes' : 'No'}</p>
                {!capability.unlocked && (
                  <Button onClick={() => handleCapabilityUnlock(capability.id)}>
                    Unlock ({capability.unlockRequirement})
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="flex items-center text-lg font-medium mb-2">
          <Zap className="mr-2 h-5 w-5" />
          Techniques
          {autonomousMode && <Badge className="ml-2 text-xs bg-blue-500">Auto-Activating</Badge>}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {evolutionState.techniques.map((technique: EvolutionTechnique) => {
            const cooldownPeriod = technique.lastUsed ? (technique.lastActivated ? 30000 : 0) : 0;
            const lastUsedTime = technique.lastUsed ? 
              timeStampToNumber(technique.lastUsed) : 0;
            const remainingTime = cooldownPeriod - (now - lastUsedTime);
            const isReady = remainingTime <= 0;

            return (
              <Card key={technique.id}>
                <CardHeader>
                  <CardTitle>{technique.name}</CardTitle>
                  <CardDescription>{technique.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Energy Cost: {technique.energyCost}</p>
                  <p>Efficiency Rate: {technique.efficiencyRate}</p>
                  <p>Unlock Level: {technique.unlockLevel}</p>
                  <p>Active: {technique.activeStatus ? 'Yes' : 'No'}</p>
                  {technique.activeStatus ? (
                    <Button
                      variant="destructive"
                      onClick={() => handleTechniqueDeactivation(technique.id)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      disabled={!isReady}
                      onClick={() => handleTechniqueActivation(technique.id)}
                    >
                      Activate {isReady ? <CheckCheck className="ml-2 h-4 w-4" /> : <Zap className="ml-2 h-4 w-4 animate-pulse" />}
                    </Button>
                  )}
                  {!isReady && (
                    <p className="text-sm text-muted-foreground">
                      Cooldown: {Math.ceil(remainingTime / 1000)} seconds
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      
      {/* Evolution Events Log */}
      {evolutionState.events && evolutionState.events.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-base">Evolution Events</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {(evolutionState.events || []).slice().reverse().map((event, index) => (
                  <div key={index} className="text-xs flex items-start">
                    <RefreshCw className="h-3 w-3 mr-2 text-blue-500 mt-0.5" />
                    <div>
                      <span className="font-medium">{event.type}</span>
                      <span className="mx-1">-</span>
                      <span>{event.details}</span>
                      <div className="text-[10px] text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VitalEvolution;
