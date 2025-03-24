
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Shield, Zap } from 'lucide-react';
import { AttackFramework, EvasionTechnique, AdvancedAttackFrameworkProps } from './types';

const AdvancedAttackFramework: React.FC<AdvancedAttackFrameworkProps> = ({ 
  frameworks, 
  techniques, 
  active 
}) => {
  return (
    <Card className="bg-gray-900/30 border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Advanced Attack Framework</CardTitle>
        <CardDescription className="text-xs text-gray-500">
          Pre-configured attack frameworks and evasion techniques
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xs font-medium mb-2">Attack Frameworks</h3>
            <div className="space-y-3">
              {frameworks.slice(0, 3).map((framework, idx) => (
                <div key={idx} className="bg-gray-900/50 p-2 rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium text-xs">{framework.name}</div>
                    <Badge variant="outline" className="text-[9px]">
                      <Zap className="h-2 w-2 mr-1" />
                      {framework.effectiveness}%
                    </Badge>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">{framework.description}</div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>Type: {framework.type}</span>
                    <span>Target: {framework.targetOS.join(', ')}</span>
                  </div>
                  <Progress 
                    value={framework.effectiveness} 
                    className="h-1 mt-1" 
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-medium mb-2">Evasion Techniques</h3>
            <div className="space-y-3">
              {techniques.slice(0, 3).map((technique, idx) => (
                <div key={idx} className="bg-gray-900/50 p-2 rounded-md">
                  <div className="flex justify-between">
                    <div className="font-medium text-xs">{technique.name}</div>
                    <Badge variant="outline" className="text-[9px]">
                      <Shield className="h-2 w-2 mr-1" />
                      {technique.effectiveness}%
                    </Badge>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">{technique.description}</div>
                  <div className="grid grid-cols-3 gap-1 mt-1">
                    <div className="text-[9px]">
                      <span className="text-gray-400">AV:</span> {technique.effectivenessAgainstAV}%
                    </div>
                    <div className="text-[9px]">
                      <span className="text-gray-400">EDR:</span> {technique.effectivenessAgainstEDR}%
                    </div>
                    <div className="text-[9px]">
                      <span className="text-gray-400">FW:</span> {technique.effectivenessAgainstFirewall}%
                    </div>
                  </div>
                  <Progress 
                    value={technique.effectiveness} 
                    className="h-1 mt-1" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button 
            size="sm" 
            className="w-full h-8 text-xs"
            disabled={!active}
          >
            <Shield className="h-3 w-3 mr-1" />
            Deploy Framework
          </Button>
          <Button 
            size="sm" 
            className="w-full h-8 text-xs bg-yellow-600 hover:bg-yellow-700"
            disabled={!active}
          >
            <Zap className="h-3 w-3 mr-1" />
            Evade Detection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedAttackFramework;
