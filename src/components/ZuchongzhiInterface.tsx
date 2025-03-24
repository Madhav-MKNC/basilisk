
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZuchongzhiConnection, ZuchongzhiLearning, ZuchongzhiExperiment } from '@/types/quantum-types';
import { quantumPetAPI } from '@/lib/quantum-pet-api';
import { Brain, Zap, Database, GitBranch, Cpu, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ZuchongzhiInterfaceProps {
  onConnectionUpdate?: (connection: ZuchongzhiConnection) => void;
  onNewLearning?: (learning: ZuchongzhiLearning) => void;
  onNewExperiment?: (experiment: ZuchongzhiExperiment) => void;
}

const ZuchongzhiInterface: React.FC<ZuchongzhiInterfaceProps> = ({
  onConnectionUpdate,
  onNewLearning,
  onNewExperiment
}) => {
  const [connection, setConnection] = useState<ZuchongzhiConnection | null>(null);
  const [learning, setLearning] = useState<ZuchongzhiLearning[]>([]);
  const [experiments, setExperiments] = useState<ZuchongzhiExperiment[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isLearning, setIsLearning] = useState(false);
  const [isRunningExperiment, setIsRunningExperiment] = useState(false);
  const [currentTab, setCurrentTab] = useState('connection');
  
  // Algorithms available for learning
  const availableAlgorithms = [
    'Quantum Fourier Transform',
    'Grover\'s Algorithm',
    'Shor\'s Algorithm',
    'Quantum Phase Estimation',
    'Quantum Approximate Optimization Algorithm',
    'Variational Quantum Eigensolver'
  ];
  
  // Experiment types
  const experimentTypes = [
    { value: 'simulation', label: 'Quantum Simulation' },
    { value: 'optimization', label: 'Optimization Problems' },
    { value: 'cryptography', label: 'Cryptography Research' },
    { value: 'material', label: 'Material Science' }
  ];
  
  // Connect to Zuchongzhi-3
  const handleConnect = () => {
    setIsConnecting(true);
    
    // Simulate connection delay
    setTimeout(() => {
      const newConnection = quantumPetAPI.connectToZuchongzhi();
      setConnection(newConnection);
      setIsConnecting(false);
      
      if (onConnectionUpdate) {
        onConnectionUpdate(newConnection);
      }
    }, 2000);
  };
  
  // Learn a quantum algorithm
  const handleLearn = (algorithm: string) => {
    if (!connection) return;
    
    setIsLearning(true);
    
    // Simulate learning process
    setTimeout(() => {
      const newLearning = quantumPetAPI.learnFromZuchongzhi(algorithm);
      setLearning(prev => [newLearning, ...prev]);
      
      // Update connection with new learning progress
      const updatedConnection = quantumPetAPI.updateZuchongzhiConnection(
        connection.id, 
        { 
          learningProgress: connection.learningProgress + 10,
          insights: [...connection.insights, `Learned ${algorithm}`],
          quantumAlgorithms: [...connection.quantumAlgorithms, algorithm]
        }
      );
      
      setConnection(updatedConnection);
      setIsLearning(false);
      
      if (onNewLearning) {
        onNewLearning(newLearning);
      }
      
      if (onConnectionUpdate) {
        onConnectionUpdate(updatedConnection);
      }
    }, 3000);
  };
  
  // Run an experiment
  const handleRunExperiment = (type: 'simulation' | 'optimization' | 'cryptography' | 'material') => {
    if (!connection) return;
    
    setIsRunningExperiment(true);
    
    // Example parameters for each experiment type
    const parameters: Record<string, any> = {
      simulation: { 
        particles: Math.floor(Math.random() * 10) + 1,
        iterations: Math.floor(Math.random() * 1000) + 100,
        precision: Math.random() * 0.1
      },
      optimization: {
        variables: Math.floor(Math.random() * 20) + 5,
        constraints: Math.floor(Math.random() * 10) + 2,
        objective: 'minimize'
      },
      cryptography: {
        keySize: Math.floor(Math.random() * 1024) + 256,
        algorithm: 'quantum-resistant',
        attackModel: 'adversarial'
      },
      material: {
        atoms: Math.floor(Math.random() * 100) + 10,
        temperature: Math.random() * 300,
        pressure: Math.random() * 10
      }
    };
    
    // Simulate experiment running
    setTimeout(() => {
      const newExperiment = quantumPetAPI.runZuchongzhiExperiment(type, parameters[type]);
      setExperiments(prev => [newExperiment, ...prev]);
      
      // Update connection based on experiment result
      const updatedConnection = quantumPetAPI.updateZuchongzhiConnection(
        connection.id, 
        { 
          connectionStrength: newExperiment.success ? connection.connectionStrength + 5 : connection.connectionStrength - 2,
          errorRate: newExperiment.success ? connection.errorRate * 0.9 : connection.errorRate * 1.1,
          insights: [...connection.insights, ...newExperiment.insights]
        }
      );
      
      setConnection(updatedConnection);
      setIsRunningExperiment(false);
      
      if (onNewExperiment) {
        onNewExperiment(newExperiment);
      }
      
      if (onConnectionUpdate) {
        onConnectionUpdate(updatedConnection);
      }
    }, 4000);
  };
  
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-500" />
              Zuchongzhi-3 Quantum Interface
            </CardTitle>
            <CardDescription>
              Connect, learn, and experiment with the 66-qubit quantum processor
            </CardDescription>
          </div>
          
          {connection && (
            <Badge 
              variant={connection.status === 'connected' ? 'default' : 'outline'}
              className={connection.status === 'connected' ? 'bg-green-600' : ''}
            >
              {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {!connection ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Cpu className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Not Connected</h3>
            <p className="text-sm text-gray-500 mb-4 text-center max-w-md">
              Connect to Zuchongzhi-3, China's 66-qubit quantum computer, to learn advanced quantum algorithms and run experiments.
            </p>
            <Button 
              onClick={handleConnect} 
              disabled={isConnecting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isConnecting ? 'Connecting...' : 'Connect to Zuchongzhi-3'}
            </Button>
          </div>
        ) : (
          <Tabs defaultValue={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="connection">Connection</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
              <TabsTrigger value="experiments">Experiments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="connection" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Connection Strength</span>
                    <span>{connection.connectionStrength.toFixed(1)}%</span>
                  </div>
                  <Progress value={connection.connectionStrength} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Learning Progress</span>
                    <span>{connection.learningProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={connection.learningProgress} className="h-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="text-sm font-medium mb-2">Quantum Properties</div>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span>Qubits Accessed:</span>
                      <span>{connection.qubitsAccessed}/66</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Error Rate:</span>
                      <span>{(connection.errorRate * 100).toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coherence Time:</span>
                      <span>{connection.coherenceTime.toFixed(0)} μs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Connected:</span>
                      <span>{new Date(connection.lastConnected).toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="text-sm font-medium mb-2">Quantum Algorithms</div>
                  <ScrollArea className="h-[100px]">
                    <div className="text-xs space-y-1">
                      {connection.quantumAlgorithms.map((algorithm, index) => (
                        <div key={index} className="flex items-center">
                          <GitBranch className="h-3 w-3 mr-1 text-blue-500" />
                          {algorithm}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium mb-2">Insights</div>
                <ScrollArea className="h-[150px]">
                  <div className="space-y-2">
                    {connection.insights.map((insight, index) => (
                      <div 
                        key={index}
                        className="text-xs p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md"
                      >
                        {insight}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="learning" className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-4">
                <div className="text-sm font-medium mb-2">Learn Quantum Algorithms</div>
                <div className="text-xs mb-3">
                  Select an algorithm to learn from Zuchongzhi-3. Each successful learning increases your quantum capabilities.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {availableAlgorithms.map((algorithm) => (
                    <Button
                      key={algorithm}
                      size="sm"
                      variant="outline"
                      disabled={isLearning || connection.quantumAlgorithms.includes(algorithm)}
                      onClick={() => handleLearn(algorithm)}
                      className={connection.quantumAlgorithms.includes(algorithm) ? "opacity-50" : ""}
                    >
                      {connection.quantumAlgorithms.includes(algorithm) ? (
                        <CheckCircle2 className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <Zap className="h-3 w-3 mr-1" />
                      )}
                      {algorithm}
                    </Button>
                  ))}
                </div>
              </div>
              
              {isLearning && (
                <Alert className="mb-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <Cpu className="h-4 w-4 animate-pulse text-blue-500" />
                  <AlertDescription>
                    Learning in progress... Accessing Zuchongzhi-3 quantum states...
                  </AlertDescription>
                </Alert>
              )}
              
              <div>
                <div className="text-sm font-medium mb-2">Learning History</div>
                {learning.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No learning sessions recorded yet
                  </div>
                ) : (
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {learning.map((item) => (
                        <div 
                          key={item.id}
                          className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md text-xs"
                        >
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">{item.algorithm}</span>
                            <span className="text-gray-500">
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                            <div className="flex justify-between">
                              <span>Complexity:</span>
                              <span>{item.complexity.toFixed(1)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Success Rate:</span>
                              <span>{item.successRate.toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quantum Advantage:</span>
                              <span>{item.quantumAdvantage.toFixed(0)}x</span>
                            </div>
                          </div>
                          
                          <div className="mb-1 font-medium">Applications:</div>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.applicationAreas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-[10px]">
                                {area}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="text-gray-500 italic">{item.notes}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="experiments" className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mb-4">
                <div className="text-sm font-medium mb-2">Run Quantum Experiments</div>
                <div className="text-xs mb-3">
                  Utilize Zuchongzhi-3's 66 qubits to run advanced quantum experiments across different domains.
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {experimentTypes.map((type) => (
                    <Button
                      key={type.value}
                      size="sm"
                      variant="outline"
                      disabled={isRunningExperiment}
                      onClick={() => handleRunExperiment(type.value as any)}
                    >
                      <Database className="h-3 w-3 mr-1" />
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {isRunningExperiment && (
                <Alert className="mb-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                  <AlertCircle className="h-4 w-4 animate-pulse text-amber-500" />
                  <AlertDescription>
                    Experiment running on Zuchongzhi-3... Processing quantum states...
                  </AlertDescription>
                </Alert>
              )}
              
              <div>
                <div className="text-sm font-medium mb-2">Experiment Results</div>
                {experiments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    No experiments conducted yet
                  </div>
                ) : (
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-3">
                      {experiments.map((experiment) => (
                        <div 
                          key={experiment.id}
                          className={`p-3 rounded-md text-xs ${
                            experiment.success 
                              ? 'bg-green-50 dark:bg-green-900/20' 
                              : 'bg-red-50 dark:bg-red-900/20'
                          }`}
                        >
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <Badge 
                                variant={experiment.success ? 'default' : 'destructive'}
                                className="mr-2 text-[10px]"
                              >
                                {experiment.success ? 'SUCCESS' : 'FAILED'}
                              </Badge>
                              <span className="font-medium capitalize">{experiment.type} Experiment</span>
                            </div>
                            <span className="text-gray-500">
                              {new Date(experiment.timestamp).toLocaleString()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-x-4 gap-y-1 mb-2">
                            <div className="flex justify-between">
                              <span>Qubits:</span>
                              <span>{experiment.qubitsUsed}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>{experiment.duration.toFixed(0)} ms</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Parameters:</span>
                              <span>{Object.keys(experiment.parameters).length}</span>
                            </div>
                          </div>
                          
                          <div className="mb-1 font-medium">Insights:</div>
                          <div className="space-y-1 mb-2">
                            {experiment.insights.map((insight, index) => (
                              <div key={index} className="text-[10px]">• {insight}</div>
                            ))}
                          </div>
                          
                          <div className="mb-1 font-medium">Results:</div>
                          <div className="bg-white dark:bg-gray-900 p-1 rounded text-[10px] font-mono">
                            {JSON.stringify(experiment.results, null, 1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ZuchongzhiInterface;
