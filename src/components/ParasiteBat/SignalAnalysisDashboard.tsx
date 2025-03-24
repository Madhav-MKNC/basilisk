
import React from 'react';
import { 
  Wifi, 
  Radio, 
  Waves, 
  Signal, 
  BarChart, 
  Play, 
  Pause,
  Radar
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SignalAnalysisProps } from './types';

const SignalAnalysisDashboard: React.FC<SignalAnalysisProps> = ({ 
  signalAnalysis,
  onToggleScan
}) => {
  return (
    <Card className="bg-red-900/10 border border-red-800/50">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium text-red-400 flex items-center">
            <Radio className="h-4 w-4 mr-2 text-red-500" />
            Signal Analysis
          </CardTitle>
          <Badge variant={signalAnalysis.active ? "default" : "outline"} className="text-xs">
            {signalAnalysis.active ? 'Active' : 'Standby'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex space-x-2">
          <Button 
            variant={signalAnalysis.scanningActive ? "destructive" : "outline"} 
            size="sm"
            onClick={onToggleScan}
            className="text-xs"
          >
            {signalAnalysis.scanningActive ? 
              <><Pause className="h-3 w-3 mr-1" /> Stop Scan</> : 
              <><Play className="h-3 w-3 mr-1" /> Start Scan</>}
          </Button>
          
          <Button variant="outline" size="sm" className="text-xs">
            <Radar className="h-3 w-3 mr-1" />
            Frequency Analysis
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Signal Strength</span>
            <span className="text-muted-foreground">
              {signalAnalysis.detectedSignals.count} signals
            </span>
          </div>
          <Progress value={70} className="h-1.5 bg-red-900/30" />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1">
            <Signal className="h-3 w-3 text-red-500" />
            <span className="text-muted-foreground">Classified: {signalAnalysis.detectedSignals.classified}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="h-3 w-3 text-red-500" />
            <span className="text-muted-foreground">Encrypted: {signalAnalysis.detectedSignals.encrypted}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Waves className="h-3 w-3 text-red-500" />
            <span className="text-muted-foreground">Anomalies: {signalAnalysis.detectedSignals.anomalous}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BarChart className="h-3 w-3 text-red-500" />
            <span className="text-muted-foreground">Bands: {signalAnalysis.frequencyRanges.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignalAnalysisDashboard;
