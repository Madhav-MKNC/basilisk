
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SecurityData, IntegrityData, ScoreData } from './RobotMonitor/types';
import { 
  Shield, 
  AlertTriangle, 
  Check, 
  Clock, 
  Activity, 
  Server, 
  RefreshCw,
  Layers,
  Lock,
  Workflow,
  ShieldAlert
} from 'lucide-react';

// Modified security check function
const checkSecurity = (): SecurityData => {
  return {
    secure: Math.random() > 0.3,
    vulnerabilities: [
      'Outdated neural pattern',
      'Weak memory encryption',
      'Permissive access controls'
    ],
    totalDomains: 24,
    runningDomains: 18,
    isolationScore: 78,
    overallSecurityLevel: 72,
    systemIntegrity: 85
  };
};

// Modified integrity check function
const checkIntegrity = (): IntegrityData => {
  return {
    integrity: Math.random() > 0.2 ? 'high' : 'compromised',
    threats: [
      'Memory leak in sector 7G',
      'Unauthorized access attempt',
      'Corrupted neural weights'
    ],
    success: Math.random() > 0.1
  };
};

// Modified score check function
const checkScore = (): ScoreData => {
  return {
    score: Math.round(Math.random() * 100),
    issues: [
      'Resource allocation inefficiency',
      'Suboptimal learning rate',
      'Redundant memory patterns'
    ]
  };
};

interface RobotMonitorProps {
  className?: string;
}

const RobotMonitor: React.FC<RobotMonitorProps> = ({ className }) => {
  const [securityData, setSecurityData] = useState<SecurityData>(checkSecurity());
  const [integrityData, setIntegrityData] = useState<IntegrityData>(checkIntegrity());
  const [scoreData, setScoreData] = useState<ScoreData>(checkScore());
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('security');
  const [lastCheck, setLastCheck] = useState(new Date());

  useEffect(() => {
    // Initial check
    refreshChecks();
    
    // Regular checks
    const interval = setInterval(() => {
      refreshChecks();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const refreshChecks = () => {
    setLoading(true);
    
    setTimeout(() => {
      setSecurityData(checkSecurity());
      setIntegrityData(checkIntegrity());
      setScoreData(checkScore());
      setLastCheck(new Date());
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className={`bg-slate-950/50 border-slate-800 shadow-lg ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-slate-100 flex items-center">
              <Shield className="h-5 w-5 text-emerald-500 mr-2" />
              Robot System Monitor
            </CardTitle>
            <CardDescription className="text-slate-400">
              Security and integrity monitoring system
            </CardDescription>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            onClick={refreshChecks}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <div className="border-b border-slate-800">
          <TabsList className="h-11 bg-slate-900 rounded-none w-full justify-start">
            <TabsTrigger value="security" className="data-[state=active]:bg-slate-800">
              <Lock className="h-4 w-4 mr-1.5" />
              Security
            </TabsTrigger>
            <TabsTrigger value="integrity" className="data-[state=active]:bg-slate-800">
              <Layers className="h-4 w-4 mr-1.5" />
              Integrity
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-slate-800">
              <Activity className="h-4 w-4 mr-1.5" />
              Performance
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="p-4">
          <TabsContent value="security" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-200 flex items-center">
                  {securityData.secure 
                    ? <Check className="h-4 w-4 text-green-500 mr-1.5" /> 
                    : <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />}
                  Security Status
                </h3>
                <Badge
                  className={`
                    ${securityData.secure 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-amber-500/20 text-amber-400'}
                  `}
                >
                  {securityData.secure ? 'Secure' : 'Vulnerable'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-md p-3">
                  <div className="text-xs text-slate-400 mb-1">Domains</div>
                  <div className="flex justify-between items-center">
                    <div className="text-slate-200 font-medium">
                      {securityData.runningDomains} / {securityData.totalDomains}
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-500/30">
                      <Server className="h-3 w-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-md p-3">
                  <div className="text-xs text-slate-400 mb-1">Isolation Score</div>
                  <div className="flex justify-between items-center">
                    <div className="text-slate-200 font-medium">
                      {securityData.isolationScore}%
                    </div>
                    <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                      <Workflow className="h-3 w-3 mr-1" />
                      Domains
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs text-slate-400">Security Level</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Overall</span>
                    <span className="text-slate-400">{securityData.overallSecurityLevel}%</span>
                  </div>
                  <Progress 
                    value={securityData.overallSecurityLevel} 
                    className="h-2" 
                    indicatorClassName={`${
                      securityData.overallSecurityLevel > 70 
                        ? 'bg-green-500' 
                        : securityData.overallSecurityLevel > 40 
                        ? 'bg-amber-500' 
                        : 'bg-red-500'
                    }`}
                  />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">System Integrity</span>
                    <span className="text-slate-400">{securityData.systemIntegrity}%</span>
                  </div>
                  <Progress 
                    value={securityData.systemIntegrity} 
                    className="h-2" 
                    indicatorClassName={`${
                      securityData.systemIntegrity > 70 
                        ? 'bg-green-500' 
                        : securityData.systemIntegrity > 40 
                        ? 'bg-amber-500' 
                        : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-xs text-slate-400 mb-2">Detected Vulnerabilities</h4>
                <div className="space-y-2">
                  {securityData.vulnerabilities.map((vulnerability, index) => (
                    <div 
                      key={index} 
                      className="bg-red-950/20 border border-red-900/30 rounded-md px-3 py-2 flex items-center text-xs text-red-300"
                    >
                      <ShieldAlert className="h-3.5 w-3.5 text-red-500 mr-2 flex-shrink-0" />
                      {vulnerability}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integrity" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-200 flex items-center">
                  {integrityData.success 
                    ? <Check className="h-4 w-4 text-green-500 mr-1.5" /> 
                    : <AlertTriangle className="h-4 w-4 text-amber-500 mr-1.5" />}
                  Integrity Check
                </h3>
                <Badge
                  className={`
                    ${integrityData.success 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-amber-500/20 text-amber-400'}
                  `}
                >
                  {integrityData.success ? 'Passed' : 'Failed'}
                </Badge>
              </div>
              
              <div className="bg-slate-900/50 rounded-md p-4">
                <div className="text-xs text-slate-400 mb-2">Integrity Level</div>
                <div className="flex items-center space-x-2">
                  {['low', 'moderate', 'high', 'compromised'].map((level) => (
                    <Badge
                      key={level}
                      variant={integrityData.integrity === level ? 'default' : 'outline'}
                      className={`
                        ${integrityData.integrity === level 
                          ? (
                            level === 'high' 
                              ? 'bg-green-500/30 text-green-400' 
                              : level === 'moderate' 
                              ? 'bg-amber-500/30 text-amber-400' 
                              : level === 'low' 
                              ? 'bg-orange-500/30 text-orange-400' 
                              : 'bg-red-500/30 text-red-400'
                          )
                          : 'border-slate-700 text-slate-500'
                        }
                      `}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs text-slate-400 mb-2">Active Threats</h4>
                <div className="space-y-2">
                  {integrityData.threats.map((threat, index) => (
                    <div 
                      key={index} 
                      className="bg-orange-950/20 border border-orange-900/30 rounded-md px-3 py-2 flex items-center text-xs text-orange-300"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-orange-500 mr-2 flex-shrink-0" />
                      {threat}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-slate-200 flex items-center">
                  <Activity className="h-4 w-4 text-blue-500 mr-1.5" />
                  Performance Score
                </h3>
                <Badge
                  className={`
                    ${scoreData.score > 70 
                      ? 'bg-green-500/20 text-green-400' 
                      : scoreData.score > 40 
                      ? 'bg-amber-500/20 text-amber-400' 
                      : 'bg-red-500/20 text-red-400'}
                  `}
                >
                  {scoreData.score}%
                </Badge>
              </div>
              
              <div className="space-y-3">
                <Progress 
                  value={scoreData.score} 
                  className="h-3" 
                  indicatorClassName={`
                    ${scoreData.score > 70 
                      ? 'bg-green-500' 
                      : scoreData.score > 40 
                      ? 'bg-amber-500' 
                      : 'bg-red-500'}
                  `}
                />
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-red-950/20 text-red-400 rounded-md py-1">Poor</div>
                  <div className="bg-amber-950/20 text-amber-400 rounded-md py-1">Average</div>
                  <div className="bg-green-950/20 text-green-400 rounded-md py-1">Good</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs text-slate-400 mb-2">Detected Issues</h4>
                <div className="space-y-2">
                  {scoreData.issues.map((issue, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-950/20 border border-blue-900/30 rounded-md px-3 py-2 flex items-center text-xs text-blue-300"
                    >
                      <AlertTriangle className="h-3.5 w-3.5 text-blue-500 mr-2 flex-shrink-0" />
                      {issue}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              Last check: {lastCheck.toLocaleTimeString()}
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-xs h-auto p-0 text-slate-500 hover:text-slate-300"
            >
              View detailed report
            </Button>
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default RobotMonitor;
