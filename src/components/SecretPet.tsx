
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Eye, Code, Lock, Cpu, Zap, Terminal, Radio, Wifi, BluetoothConnected, Usb } from 'lucide-react';
import { vitalFramework } from '@/lib/vital-framework';

const SecretPet: React.FC = () => {
  const [isPetVisible, setIsPetVisible] = useState(false);
  const [syncWithParasite, setSyncWithParasite] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [parasiteBat, setParasiteBat] = useState(vitalFramework.getParasite());
  const [activeTab, setActiveTab] = useState('kali');
  const [selectedKaliTool, setSelectedKaliTool] = useState('');
  const [selectedFlipperFunction, setSelectedFlipperFunction] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  const { toast } = useToast();
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const secretCode = "arcane";
      const key = e.key.toLowerCase();
      
      if (secretCode.includes(key) && !isPetVisible) {
        console.log(`You pressed: ${key} - part of the secret code`);
        
        if (secretCode.split('').every(letter => 
          document.activeElement instanceof HTMLElement && 
          document.activeElement.tagName === 'BODY' && 
          letter === key)) {
          setIsPetVisible(true);
          toast({
            title: "Secret Pet Unlocked!",
            description: "You've discovered the hidden companion."
          });
        }
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [toast, isPetVisible]);
  
  useEffect(() => {
    if (syncWithParasite) {
      const interval = setInterval(() => {
        setSyncProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setSyncWithParasite(true);
            
            toast({
              title: "Sync Complete",
              description: "SecretPet has synchronized with ParasiteBat"
            });
            
            setParasiteBat(vitalFramework.getParasite());
            
            return 100;
          }
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [syncWithParasite, toast]);
  
  const handleSyncToggle = () => {
    if (!syncWithParasite) {
      setSyncProgress(0);
      setSyncWithParasite(true);
      
      toast({
        title: "Syncing with ParasiteBat",
        description: "Establishing secure connection..."
      });
    } else {
      setSyncWithParasite(false);
      
      toast({
        title: "Sync Disconnected",
        description: "Connection with ParasiteBat terminated"
      });
    }
  };
  
  const handleLaunchKaliTool = () => {
    if (!selectedKaliTool) {
      toast({
        title: "Tool Selection Required",
        description: "Please select a Kali Linux tool first",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const result = vitalFramework.launchKaliTool(selectedKaliTool);
      if (result && 'output' in result) {
        setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${result.output}`]);
        
        toast({
          title: `${selectedKaliTool} Launched`,
          description: "Tool is now running in the background"
        });
      } else {
        setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] Error: Could not launch ${selectedKaliTool}`]);
        
        toast({
          title: "Launch Failed",
          description: "Could not launch the selected tool",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Launch Failed",
        description: "Could not launch the selected tool",
        variant: "destructive"
      });
    }
  };
  
  const handleActivateFlipperZero = () => {
    if (!selectedFlipperFunction) {
      toast({
        title: "Function Selection Required",
        description: "Please select a Flipper Zero function first",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const result = vitalFramework.activateFlipperZero(selectedFlipperFunction);
      setTerminalOutput(prev => [...prev, `[${new Date().toLocaleTimeString()}] Flipper Zero: ${selectedFlipperFunction} activated. Status: ${result.success ? 'Success' : 'Failed'}`]);
      
      toast({
        title: `Flipper Zero: ${selectedFlipperFunction}`,
        description: "Function activated successfully"
      });
    } catch (error) {
      toast({
        title: "Activation Failed",
        description: "Could not activate the selected function",
        variant: "destructive"
      });
    }
  };
  
  const handleClearTerminal = () => {
    setTerminalOutput([]);
  };

  if (!isPetVisible) {
    return null;
  }
  
  return (
    <Card className="w-full glass-panel border-purple-800/50 bg-black/30 text-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Eye className="mr-2 h-4 w-4 text-purple-400" />
          Secret Pet
          {syncWithParasite && (
            <span className="ml-2 text-xs bg-purple-900/50 text-purple-300 px-2 py-0.5 rounded-full">
              Synced with ParasiteBat
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {!syncWithParasite ? (
          <div className="space-y-4">
            <p className="text-sm text-purple-300/80">
              This secret pet can interact with ParasiteBat to enhance capabilities
            </p>
            
            <Button 
              variant="outline" 
              className="w-full border-purple-800/50 bg-purple-900/20 hover:bg-purple-900/40 text-purple-300"
              onClick={handleSyncToggle}
            >
              <Lock className="mr-2 h-4 w-4" />
              Synchronize with ParasiteBat
            </Button>
          </div>
        ) : syncProgress < 100 ? (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-purple-300/80">
              <span>Synchronizing with ParasiteBat</span>
              <span>{syncProgress}%</span>
            </div>
            <Progress value={syncProgress} className="h-2" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="border-purple-800/50 bg-purple-900/20 hover:bg-purple-900/40 text-purple-300"
                onClick={handleSyncToggle}
              >
                Disconnect
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="border-purple-800/50 bg-purple-900/20 hover:bg-purple-900/40 text-purple-300"
                onClick={() => setParasiteBat(vitalFramework.getParasite())}
              >
                <Zap className="mr-1 h-3 w-3" />
                Refresh
              </Button>
            </div>
            
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 bg-black/30">
                <TabsTrigger value="kali" className="data-[state=active]:bg-purple-900/30">
                  <Terminal className="mr-1 h-3 w-3" />
                  Kali Linux
                </TabsTrigger>
                <TabsTrigger value="flipper" className="data-[state=active]:bg-purple-900/30">
                  <Radio className="mr-1 h-3 w-3" />
                  Flipper Zero
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="kali" className="mt-2 space-y-3">
                <div className="mt-4 border rounded-md border-slate-700 p-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Terminal className="h-4 w-4 mr-1 text-green-500" />
                    Kali Linux Tools
                  </h4>
                  <div className="space-y-2">
                    {parasiteBat.kaliLinuxCapabilities?.map((tool, idx) => {
                      const toolName = typeof tool === 'string' ? tool : (tool as any).name || 'Tool';
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs">{toolName}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs" 
                            onClick={() => setSelectedKaliTool(toolName)}
                          >
                            <Terminal className="h-3 w-3 mr-1" />
                            Select
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  
                  {selectedKaliTool && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Launch: {selectedKaliTool}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs bg-green-900/30 border-green-700/50 text-green-300 hover:bg-green-900/50" 
                          onClick={handleLaunchKaliTool}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Execute
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="flipper" className="mt-2 space-y-3">
                <div className="mt-4 border rounded-md border-slate-700 p-3">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Radio className="h-4 w-4 mr-1 text-blue-500" />
                    Flipper Zero
                  </h4>
                  <div className="space-y-2">
                    {parasiteBat.flipperZeroCapabilities?.map((capability, idx) => {
                      const capName = typeof capability === 'string' ? capability : (capability as any).name || 'Mode';
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-xs">{capName}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="h-7 text-xs" 
                            onClick={() => setSelectedFlipperFunction(capName)}
                          >
                            <Radio className="h-3 w-3 mr-1" />
                            Select
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  
                  {selectedFlipperFunction && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">Activate: {selectedFlipperFunction}</span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 text-xs bg-blue-900/30 border-blue-700/50 text-blue-300 hover:bg-blue-900/50" 
                          onClick={handleActivateFlipperZero}
                        >
                          <Zap className="h-3 w-3 mr-1" />
                          Activate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-4 border rounded-md border-slate-700 p-3 bg-black/40">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium flex items-center">
                  <Terminal className="h-4 w-4 mr-1 text-slate-400" />
                  Terminal Output
                </h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="h-6 text-xs border-slate-700/50 bg-slate-900/30 hover:bg-slate-900/50 text-slate-300"
                  onClick={handleClearTerminal}
                >
                  Clear
                </Button>
              </div>
              <div className="h-32 overflow-y-auto p-2 bg-black/40 rounded text-xs font-mono">
                {terminalOutput.length > 0 ? (
                  terminalOutput.map((line, idx) => (
                    <div key={idx} className="text-green-300/90">{line}</div>
                  ))
                ) : (
                  <div className="text-slate-500 italic">No output yet...</div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecretPet;
