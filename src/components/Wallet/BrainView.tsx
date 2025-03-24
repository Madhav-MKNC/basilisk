
import React from 'react';
import { 
  Brain, 
  Activity, 
  Cpu, 
  BarChart2, 
  Shield, 
  Zap, 
  SlidersHorizontal, 
  TrendingUp, 
  MonitorSmartphone, 
  Fingerprint,
  LineChart,
  Megaphone,
  GitBranch
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WalletBrainState, BrainViewProps } from "@/components/ParasiteBat/walletTypes";
import { HorizontalScrollContainer } from '@/components/ParasiteBat';
import { cn } from '@/lib/utils';

export function BrainView({
  walletBrain,
  brainActivity,
  brainMessages,
  neuralPathways,
  brainMemory,
  ambitionLevel,
  evolutionGoals,
  ambitiousMode,
  toggleBrainActivation,
  setAmbitionLevel
}: BrainViewProps) {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'memory': return <Brain className="h-3 w-3" />;
      case 'decision': return <GitBranch className="h-3 w-3" />;
      case 'financial': return <LineChart className="h-3 w-3" />;
      case 'security': return <Shield className="h-3 w-3" />;
      case 'optimization': return <SlidersHorizontal className="h-3 w-3" />;
      case 'analysis': return <Activity className="h-3 w-3" />;
      case 'communication': return <Megaphone className="h-3 w-3" />;
      default: return <Brain className="h-3 w-3" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brain Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <span className="text-sm">Brain Active</span>
              <Switch 
                checked={walletBrain.active} 
                onCheckedChange={toggleBrainActivation}
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Processing Power</span>
                  <span>{walletBrain.processingPower}%</span>
                </div>
                <Progress value={walletBrain.processingPower} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Algorithm Efficiency</span>
                  <span>{walletBrain.algorithmEfficiency}%</span>
                </div>
                <Progress value={walletBrain.algorithmEfficiency} className="h-1" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Neural Connections</span>
                  <span>{walletBrain.neuralConnections}</span>
                </div>
                <Progress 
                  value={(walletBrain.neuralConnections / 1000) * 100} 
                  className="h-1" 
                />
              </div>
            </div>
            
            <HorizontalScrollContainer className="mt-4">
              <Badge variant="outline" className="flex items-center space-x-1 px-2 py-1">
                <Brain className="h-3 w-3" />
                <span>{walletBrain.mode} mode</span>
              </Badge>
              
              <Badge variant="outline" className="flex items-center space-x-1 px-2 py-1">
                <Cpu className="h-3 w-3" />
                <span>Learning Rate: {walletBrain.learningRate}</span>
              </Badge>
              
              <Badge variant="outline" className="flex items-center space-x-1 px-2 py-1">
                <Activity className="h-3 w-3" />
                <span>Adaptability: {walletBrain.adaptability}</span>
              </Badge>
              
              <Badge variant="outline" className="flex items-center space-x-1 px-2 py-1">
                <Shield className="h-3 w-3" />
                <span>Security: {walletBrain.securityLevel}</span>
              </Badge>
            </HorizontalScrollContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Decision</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-3 rounded-md text-sm">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{walletBrain.lastDecision?.action}</span>
                <Badge 
                  variant={
                    walletBrain.lastDecision?.result === "success" ? "default" : 
                    walletBrain.lastDecision?.result === "pending" ? "outline" : "destructive"
                  }
                  className="text-[10px]"
                >
                  {walletBrain.lastDecision?.result}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{walletBrain.lastDecision?.reason}</p>
              <div className="text-xs text-muted-foreground">
                {walletBrain.lastDecision ? new Date(walletBrain.lastDecision.timestamp).toLocaleString() : 'No recent decisions'}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Ambition Level</CardTitle>
              <Badge 
                variant={ambitiousMode ? "default" : "outline"}
                className={cn(
                  "text-xs",
                  ambitiousMode && "bg-yellow-600 hover:bg-yellow-700"
                )}
              >
                {ambitiousMode ? "Ambitious Mode" : "Normal Mode"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Slider 
                  min={1} 
                  max={10} 
                  step={1}
                  value={[ambitionLevel]}
                  onValueChange={(value) => setAmbitionLevel(value[0])}
                />
                <span className="text-sm font-mono w-5">{ambitionLevel}</span>
              </div>
              
              <div className="grid grid-cols-5 gap-1">
                {Array.from({length: 10}).map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1 rounded-full ${
                      i < ambitionLevel 
                        ? i < 3 
                          ? 'bg-green-500' 
                          : i < 7 
                            ? 'bg-yellow-500' 
                            : 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground">
                {ambitionLevel < 4 
                  ? "Conservative: Focus on stability and security"
                  : ambitionLevel < 8
                    ? "Balanced: Moderate risk for better returns"
                    : "Aggressive: High risk, potentially high reward strategy"
                }
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card className="h-[230px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brain Activity</CardTitle>
          </CardHeader>
          <CardContent className="relative h-[170px]">
            <ScrollArea className="h-full pr-4">
              {brainMessages.map((message, idx) => (
                <div 
                  key={idx}
                  className={`mb-2 text-xs p-2 rounded-md ${
                    idx % 2 === 0 ? 'bg-blue-950/20 border border-blue-900/20' : 'bg-violet-950/20 border border-violet-900/20'
                  }`}
                >
                  {message}
                </div>
              ))}
            </ScrollArea>
            
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Neural Pathways</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalScrollContainer>
              {neuralPathways.map((pathway) => (
                <div 
                  key={pathway.id}
                  className="min-w-[120px] p-2 bg-muted rounded-md text-xs"
                >
                  <div className="flex items-center space-x-1 mb-1">
                    {renderIcon(pathway.type)}
                    <span>{pathway.type}</span>
                  </div>
                  <div className="text-sm font-medium">{pathway.strength}%</div>
                  <div className="text-xs text-muted-foreground">
                    {pathway.connections} connections
                  </div>
                  <Progress 
                    value={pathway.strength} 
                    className="h-1 mt-1" 
                  />
                </div>
              ))}
            </HorizontalScrollContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Evolution Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <HorizontalScrollContainer>
              {evolutionGoals.map((goal) => (
                <div 
                  key={goal.id}
                  className="min-w-[200px] p-2 bg-muted rounded-md text-xs"
                >
                  <div className="font-medium mb-1">{goal.name}</div>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{goal.description}</p>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress 
                    value={goal.progress} 
                    className="h-1" 
                  />
                </div>
              ))}
            </HorizontalScrollContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BrainView;
