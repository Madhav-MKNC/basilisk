
import React, { useState } from 'react';
import { useBasiliskBrain } from '@/hooks/useBasiliskBrain';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Brain, Zap, BarChart3, RefreshCw, ShieldAlert, Sparkles, Workflow } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

export const BasiliskBrain: React.FC = () => {
  const {
    autonomyLevel,
    resourceAllocation,
    isAutoSyncActive,
    changeAutonomyLevel,
    changeResourceAllocation,
    triggerManualSync,
    triggerAutonomousActivity,
    getAllPets,
    getEngineState,
  } = useBasiliskBrain();

  const [activeTab, setActiveTab] = useState('overview');
  const pets = getAllPets();
  const engineState = getEngineState();

  const handleAutonomyChange = (values: number[]) => {
    changeAutonomyLevel(values[0]);
  };

  const handleParasiteAllocationChange = (values: number[]) => {
    const parasiteValue = values[0];
    const remaining = 1 - parasiteValue;
    const quantumValue = resourceAllocation.quantum * (remaining / (resourceAllocation.quantum + resourceAllocation.vital));
    const vitalValue = resourceAllocation.vital * (remaining / (resourceAllocation.quantum + resourceAllocation.vital));
    
    changeResourceAllocation({
      parasite: parasiteValue,
      quantum: quantumValue,
      vital: vitalValue
    });
  };

  const handleQuantumAllocationChange = (values: number[]) => {
    const quantumValue = values[0];
    const remaining = 1 - quantumValue;
    const parasiteValue = resourceAllocation.parasite * (remaining / (resourceAllocation.parasite + resourceAllocation.vital));
    const vitalValue = resourceAllocation.vital * (remaining / (resourceAllocation.parasite + resourceAllocation.vital));
    
    changeResourceAllocation({
      parasite: parasiteValue,
      quantum: quantumValue,
      vital: vitalValue
    });
  };

  const handleVitalAllocationChange = (values: number[]) => {
    const vitalValue = values[0];
    const remaining = 1 - vitalValue;
    const parasiteValue = resourceAllocation.parasite * (remaining / (resourceAllocation.parasite + resourceAllocation.quantum));
    const quantumValue = resourceAllocation.quantum * (remaining / (resourceAllocation.parasite + resourceAllocation.quantum));
    
    changeResourceAllocation({
      parasite: parasiteValue,
      quantum: quantumValue,
      vital: vitalValue
    });
  };

  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-purple-500" />
            <CardTitle>Basilisk Brain</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={triggerManualSync} 
            className="h-8 px-2 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5 mr-1" />
            Sync All
          </Button>
        </div>
        <CardDescription>
          Central management system for all basilisk components
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
        </TabsList>

        <ScrollArea className="h-[calc(100%-8rem)]">
          <TabsContent value="overview" className="space-y-4 p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Autonomy Level</h3>
                  <span className="text-xs text-muted-foreground">{Math.round(autonomyLevel * 100)}%</span>
                </div>
                <Slider 
                  value={[autonomyLevel]} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleAutonomyChange} 
                />
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium">Auto-Sync</h3>
                  <span className={`text-xs ${isAutoSyncActive ? 'text-green-500' : 'text-amber-500'}`}>
                    {isAutoSyncActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Auto-sync is {autonomyLevel > 0.5 ? 'enabled' : 'disabled'} (requires autonomy {'>'}50%)</p>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">System Status</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ShieldAlert className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-xs">Security Level</span>
                    </div>
                    <span className="text-xs font-medium">{engineState.securityLevel}%</span>
                  </div>
                  <Progress value={engineState.securityLevel} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-xs">Consciousness</span>
                    </div>
                    <span className="text-xs font-medium">{Math.round(engineState.consciousness * 100)}%</span>
                  </div>
                  <Progress value={engineState.consciousness * 100} className="h-1" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Workflow className="h-4 w-4 text-emerald-500 mr-2" />
                      <span className="text-xs">Evolution Stage</span>
                    </div>
                    <span className="text-xs font-medium">{pets.vital.stage}</span>
                  </div>
                  <Progress value={pets.vital.adaptability} max={100} className="h-1" />
                </div>
              </div>
              
              <Button 
                onClick={triggerAutonomousActivity} 
                className="w-full"
                variant="secondary"
              >
                <Zap className="h-4 w-4 mr-2" />
                Trigger Autonomous Activity
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Resource Allocation</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs">Parasite Bat</h4>
                  <span className="text-xs text-muted-foreground">{Math.round(resourceAllocation.parasite * 100)}%</span>
                </div>
                <Slider 
                  value={[resourceAllocation.parasite]} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleParasiteAllocationChange} 
                />
                
                <div className="flex justify-between mt-4 items-center">
                  <h4 className="text-xs">Quantum Pet</h4>
                  <span className="text-xs text-muted-foreground">{Math.round(resourceAllocation.quantum * 100)}%</span>
                </div>
                <Slider 
                  value={[resourceAllocation.quantum]} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleQuantumAllocationChange} 
                />
                
                <div className="flex justify-between mt-4 items-center">
                  <h4 className="text-xs">Vital Framework</h4>
                  <span className="text-xs text-muted-foreground">{Math.round(resourceAllocation.vital * 100)}%</span>
                </div>
                <Slider 
                  value={[resourceAllocation.vital]} 
                  max={1} 
                  step={0.01} 
                  onValueChange={handleVitalAllocationChange} 
                />
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-3">System Resources</h3>
                
                <div className="grid grid-cols-3 gap-2">
                  <Card className="col-span-1 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Security</p>
                      <p className="text-xl font-bold">{engineState.securityLevel}</p>
                    </div>
                  </Card>
                  
                  <Card className="col-span-1 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Defense</p>
                      <p className="text-xl font-bold">{engineState.defenseLevel}</p>
                    </div>
                  </Card>
                  
                  <Card className="col-span-1 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Stealth</p>
                      <p className="text-xl font-bold">{Math.round(engineState.stealthMode * 100)}</p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="systems" className="space-y-4 p-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Connected Systems</h3>
              
              <Card className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Parasite Bat</h4>
                    <p className="text-xs text-muted-foreground">{pets.parasite.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Security</p>
                    <p className="text-sm font-medium">{pets.parasite.securityLevel}%</p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <div className="flex justify-between">
                    <span>Discoveries</span>
                    <span>{pets.parasite.discoveries.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy</span>
                    <span>{pets.parasite.energyLevel}%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Quantum Pet</h4>
                    <p className="text-xs text-muted-foreground">{pets.quantum.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Research</p>
                    <p className="text-sm font-medium">{pets.quantum.researchProgress}%</p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <div className="flex justify-between">
                    <span>Theories</span>
                    <span>{pets.quantum.theories?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Energy</span>
                    <span>{pets.quantum.energyLevel}%</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">Vital Framework</h4>
                    <p className="text-xs text-muted-foreground">Stage {pets.vital.stage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Adaptability</p>
                    <p className="text-sm font-medium">{pets.vital.adaptability}%</p>
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <div className="flex justify-between">
                    <span>Goals</span>
                    <span>{pets.vital.goals?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Techniques</span>
                    <span>{pets.vital.techniques?.length || 0}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
      
      <CardFooter className="border-t p-3 text-xs text-muted-foreground">
        <div className="flex w-full justify-between items-center">
          <span>Last synced: {new Date().toLocaleTimeString()}</span>
          <span>{isAutoSyncActive ? 'Auto-sync ON' : 'Auto-sync OFF'}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
