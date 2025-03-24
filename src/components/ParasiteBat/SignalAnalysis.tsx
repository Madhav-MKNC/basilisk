
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Sliders, Waves, Radio, Activity, Scan, Signal } from 'lucide-react';
import { SignalAnalysisCapabilities, SignalAnalysisProps } from './types';

const SignalAnalysis: React.FC<SignalAnalysisProps> = ({ signalAnalysis, onToggleScan }) => {
  const [activeTab, setActiveTab] = useState('spectrum');
  
  return (
    <Card className="bg-gray-900/30 border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Signal Analysis</CardTitle>
          <Badge variant={signalAnalysis.scanningActive ? "default" : "outline"} className="text-[10px]">
            {signalAnalysis.scanningActive ? 'Scanning' : 'Idle'}
          </Badge>
        </div>
        <CardDescription className="text-xs text-gray-500">
          RF and wireless signal detection and analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center">
              <Waves className="h-3 w-3 mr-1 text-blue-400" />
              <span>Range: {signalAnalysis.frequencyRanges.join(', ')}</span>
            </div>
            <div className="flex items-center">
              <Sliders className="h-3 w-3 mr-1 text-amber-400" />
              <span>Resolution: {signalAnalysis.spectrumAnalysis.resolution}Hz</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <Radio className="h-3 w-3 mr-1 text-green-400" />
              <span>Signals: {signalAnalysis.detectedSignals.count}</span>
            </div>
            <div className="flex items-center">
              <Activity className="h-3 w-3 mr-1 text-red-400" />
              <span>Anomalies: {signalAnalysis.detectedSignals.anomalous}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded-md p-2 mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Signal Strength</span>
            <span className="text-green-400">-45 dBm</span>
          </div>
          <div className="h-20 bg-black/30 rounded border border-gray-800 flex items-end p-1">
            {[...Array(32)].map((_, i) => (
              <div 
                key={i} 
                className="w-1 mx-[1px] bg-green-500" 
                style={{ 
                  height: `${Math.random() * 80 + 10}%`,
                  opacity: i % 3 === 0 ? 1 : 0.5
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>88 MHz</span>
            <span>108 MHz</span>
          </div>
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="text-xs font-medium">Detected Signals</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gray-900/50 p-2 rounded text-xs">
              <div className="font-medium flex items-center text-blue-400">
                <Signal className="h-3 w-3 mr-1" />
                FM Radio
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                96.3 MHz, -35 dBm
              </div>
              <Progress value={85} className="h-1 mt-1" />
            </div>
            <div className="bg-gray-900/50 p-2 rounded text-xs">
              <div className="font-medium flex items-center text-purple-400">
                <Signal className="h-3 w-3 mr-1" />
                WiFi
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                2.4 GHz, -42 dBm
              </div>
              <Progress value={70} className="h-1 mt-1" />
            </div>
            <div className="bg-gray-900/50 p-2 rounded text-xs">
              <div className="font-medium flex items-center text-red-400">
                <Signal className="h-3 w-3 mr-1" />
                Unknown
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                433 MHz, -67 dBm
              </div>
              <Progress value={35} className="h-1 mt-1" />
            </div>
            <div className="bg-gray-900/50 p-2 rounded text-xs">
              <div className="font-medium flex items-center text-amber-400">
                <Signal className="h-3 w-3 mr-1" />
                Bluetooth
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                2.4 GHz, -58 dBm
              </div>
              <Progress value={45} className="h-1 mt-1" />
            </div>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700"
          onClick={onToggleScan}
        >
          <Scan className="h-3 w-3 mr-1" />
          {signalAnalysis.scanningActive ? 'Stop Scanning' : 'Start Scanning'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignalAnalysis;
