
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  Bath, 
  BotOff, 
  Target, 
  Wifi, 
  Activity, 
  AlertTriangle, 
  Layers, 
  Shield, 
  Brain,
  Radio,
  Aperture,
  Axe,
  Bug,
  Terminal,
  KeyRound,
  Usb,
  Bluetooth,
  Router,
  Signal,
  Network,
  Key,
  FileJson,
  Upload,
  Download,
  Search,
  Settings,
  HelpCircle,
  Power,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import useParasiteBat from './useParasiteBat';
import AttackTargetForm from './AttackTargetForm';
import ScanProgress from './ScanProgress';
import IconGrid, { IconGridItem } from './IconGrid';
import SignalAnalysisDashboard from './SignalAnalysisDashboard';
import WebExploitDashboard from './WebExploitDashboard';
import HorizontalScrollContainer from './HorizontalScrollContainer';

// Export components for use elsewhere - correct way to re-export
export { HorizontalScrollContainer };

const ParasiteBat: React.FC = () => {
  const {
    isAwake,
    isScanning,
    scanProgress,
    infiltrationProgress,
    attackVectors,
    autonomousInfiltration,
    signalAnalysis,
    
    // Add missing properties for components
    stealthCapabilities,
    advancedAttackCapabilities,
    hardwareTools,
    evolutionaryTechniques,
    webExploitFramework,
    attackFrameworks,
    evasionTechniques,
    flipperZeroCapabilities,
    
    // Add missing handlers
    handleToggleSleep,
    handleWakeUp,
    handleStartScan,
    handleAbortInfiltration,
    handleStartInfiltration,
    
    // Fix properties to match requirements in index.tsx
    target,
    metasploit,
    netHunter,
    burpSuite,
    aircrackNG,
    wireshark,
    nmap,
    maltego,
    sqlMap,
    johnTheRipper,
    setIsMenuOpen,
    setIsAlertOpen,
    setIsPopoverOpen,
    setIsDialogOpen,
    toggleSignalScan,
    setTarget
  } = useParasiteBat();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          {isAwake ? <Bath className="h-6 w-6 text-yellow-500" /> : <BotOff className="h-6 w-6 text-gray-500" />}
          <h2 className="text-lg font-semibold">Parasite Bat</h2>
          <Badge variant="secondary">v3.1.1</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleToggleSleep}>
            {isAwake ? 'Hibernate' : 'Wake Up'}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Target: {target || 'None'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Scanning: {isScanning ? 'Active' : 'Idle'}</span>
                </div>
                <Progress value={scanProgress} className="h-2 bg-red-900/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Infiltration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Stage: {autonomousInfiltration.stage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Detection Risk: {autonomousInfiltration.detectionRisk}%</span>
                </div>
                <Progress value={infiltrationProgress} className="h-2 bg-red-900/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AttackTargetForm
            onTargetSubmit={handleStartInfiltration}
            onAttackTarget={handleStartInfiltration}
            active={isAwake}
            target={target}
            onSetTarget={setTarget}
          />

          <ScanProgress
            isActive={isAwake}
            isScanning={isScanning}
            scanProgress={scanProgress}
            onCancelScan={handleAbortInfiltration}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SignalAnalysisDashboard signalAnalysis={signalAnalysis} onToggleScan={toggleSignalScan} />
          <WebExploitDashboard
            framework={webExploitFramework}
            active={isAwake}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Stealth Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Stealth Level: {stealthCapabilities.stealthLevel}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <EyeOff className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Detection Avoidance: {stealthCapabilities.detectionAvoidance}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Advanced Attack Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Adaptive Learning: {advancedAttackCapabilities.adaptiveLearning}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-red-500" />
                  <span className="text-xs text-gray-400">Mutation Ability: {advancedAttackCapabilities.mutationAbility}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Hardware Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                {hardwareTools.map((tool) => (
                  <div key={tool.name} className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="font-semibold">{tool.name}</span>
                    <span>({tool.type})</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-red-900/10 border border-red-800/50">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-red-400">Evolutionary Techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                {evolutionaryTechniques.map((technique) => (
                  <div key={technique.name} className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="font-semibold">{technique.name}</span>
                    <span>({technique.evolutionStage})</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ParasiteBat;
