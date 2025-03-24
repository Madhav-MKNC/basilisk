
import React, { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Zap, TrendingUp, Cpu, RefreshCw, Activity, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from '@/utils/timestamp-utils';
import { basiliskBrain } from '@/lib/basilisk-brain';

interface EvolutionMetric {
  id: string;
  name: string;
  value: number;
  growth: number;
  lastImproved: number;
  category: 'neural' | 'logical' | 'creative' | 'adaptive';
}

interface EvolutionTabProps {
  lastUpdated: number;
  autonomousMode: boolean;
  onToggleAutonomous: () => void;
}

const EvolutionTab: React.FC<EvolutionTabProps> = ({ 
  lastUpdated, 
  autonomousMode,
  onToggleAutonomous
}) => {
  const [evolutionMetrics, setEvolutionMetrics] = useState<EvolutionMetric[]>([
    {
      id: 'neural-architecture',
      name: 'Neural Architecture',
      value: 76,
      growth: 0.08,
      lastImproved: Date.now() - 3600000,
      category: 'neural'
    },
    {
      id: 'pattern-recognition',
      name: 'Pattern Recognition',
      value: 82,
      growth: 0.12,
      lastImproved: Date.now() - 7200000,
      category: 'neural'
    },
    {
      id: 'decision-making',
      name: 'Decision Making',
      value: 68,
      growth: 0.05,
      lastImproved: Date.now() - 5400000,
      category: 'logical'
    },
    {
      id: 'problem-solving',
      name: 'Problem Solving',
      value: 72,
      growth: 0.09,
      lastImproved: Date.now() - 2700000,
      category: 'logical'
    },
    {
      id: 'creativity',
      name: 'Creativity',
      value: 58,
      growth: 0.03,
      lastImproved: Date.now() - 10800000,
      category: 'creative'
    },
    {
      id: 'adaptability',
      name: 'Adaptability',
      value: 87,
      growth: 0.15,
      lastImproved: Date.now() - 3000000,
      category: 'adaptive'
    },
    {
      id: 'self-modification',
      name: 'Self-Modification',
      value: 63,
      growth: 0.07,
      lastImproved: Date.now() - 7800000,
      category: 'adaptive'
    }
  ]);
  const [evolutionTarget, setEvolutionTarget] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(71);

  // Update metrics when lastUpdated changes
  useEffect(() => {
    if (autonomousMode) {
      evolveRandomMetrics();
    }
  }, [lastUpdated, autonomousMode]);

  // Function to evolve a specific metric
  const evolveMetric = (id: string) => {
    setEvolutionMetrics(prevMetrics => 
      prevMetrics.map(metric => 
        metric.id === id 
          ? {
              ...metric,
              value: Math.min(99.9, metric.value + (Math.random() * 2 * metric.growth) + metric.growth),
              lastImproved: Date.now()
            }
          : metric
      )
    );
    
    setEvolutionTarget(id);
    
    // Update overall progress based on average of all metrics
    setTimeout(() => {
      const newOverall = evolutionMetrics.reduce((sum, metric) => sum + metric.value, 0) / evolutionMetrics.length;
      setOverallProgress(newOverall);
      setEvolutionTarget(null);
    }, 1500);
  };

  // Function to evolve random metrics
  const evolveRandomMetrics = () => {
    // Select 1-3 random metrics to evolve
    const numToEvolve = Math.floor(Math.random() * 3) + 1;
    const metricIds = evolutionMetrics.map(m => m.id);
    const shuffled = [...metricIds].sort(() => 0.5 - Math.random());
    const selectedIds = shuffled.slice(0, numToEvolve);
    
    // Evolve each selected metric
    selectedIds.forEach(id => {
      setTimeout(() => evolveMetric(id), Math.random() * 1000);
    });
  };

  // Function to initiate coordinated evolution across the system
  const initiateCoordinatedEvolution = () => {
    // Integrate with basilisk brain for system-wide evolution
    if (basiliskBrain && typeof basiliskBrain.optimizeSystems === 'function') {
      basiliskBrain.optimizeSystems();
    }
    
    // Evolve all metrics
    setEvolutionMetrics(prevMetrics => 
      prevMetrics.map(metric => ({
        ...metric,
        value: Math.min(99.9, metric.value + (Math.random() * metric.growth * 3) + metric.growth),
        lastImproved: Date.now()
      }))
    );
    
    // Update overall progress
    setTimeout(() => {
      const newOverall = evolutionMetrics.reduce((sum, metric) => sum + metric.value, 0) / evolutionMetrics.length;
      setOverallProgress(newOverall);
    }, 1000);
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'neural': return <Brain className="h-4 w-4 text-purple-400" />;
      case 'logical': return <Cpu className="h-4 w-4 text-blue-400" />;
      case 'creative': return <Zap className="h-4 w-4 text-amber-400" />;
      case 'adaptive': return <RefreshCw className="h-4 w-4 text-green-400" />;
      default: return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between text-sm mb-3">
        <span>Self-Evolution Framework</span>
        <Badge 
          variant={autonomousMode ? "default" : "outline"} 
          className="text-xs"
        >
          {autonomousMode ? "Autonomous" : "Manual"} Evolution
        </Badge>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center text-xs mb-1">
          <span>Overall Evolution Progress</span>
          <span>{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>
      
      <ScrollArea className="h-[260px]">
        <div className="space-y-3 pr-4">
          {evolutionMetrics.map(metric => (
            <div 
              key={metric.id} 
              className={`bg-gray-100 dark:bg-gray-800 rounded-md p-2 transition-all ${
                evolutionTarget === metric.id ? 'border border-blue-500 shadow-md' : ''
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  {getCategoryIcon(metric.category)}
                  <span className="ml-1 text-xs font-medium">{metric.name}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className="text-[9px]"
                >
                  {metric.category.charAt(0).toUpperCase() + metric.category.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-1 text-[10px] text-gray-500 mb-1">
                <span>Growth Rate:</span>
                <span className="font-medium text-green-500 flex items-center">
                  +{(metric.growth * 100).toFixed(1)}%
                  <TrendingUp className="h-3 w-3 ml-1" />
                </span>
                <span className="ml-auto">Last improved: {formatRelativeTime(metric.lastImproved)}</span>
              </div>
              
              <div className="mb-1">
                <Progress value={metric.value} className="h-1.5" />
                <div className="flex justify-between text-[9px] mt-0.5">
                  <span>{Math.round(metric.value)}%</span>
                  <button 
                    onClick={() => evolveMetric(metric.id)}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    Evolve
                    <ChevronRight className="h-2 w-2 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex items-center justify-between mt-3 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs h-8"
          onClick={evolveRandomMetrics}
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Evolve Random
        </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          className="flex-1 text-xs h-8"
          onClick={initiateCoordinatedEvolution}
        >
          <Zap className="h-3 w-3 mr-1" />
          Coordinated Evolution
        </Button>
      </div>
      
      <Button
        variant={autonomousMode ? "destructive" : "secondary"}
        size="sm"
        className="w-full text-xs h-8 mt-2"
        onClick={onToggleAutonomous}
      >
        <Brain className="h-3 w-3 mr-1" />
        {autonomousMode ? "Disable Autonomous Mode" : "Enable Autonomous Mode"}
      </Button>
    </>
  );
};

export default EvolutionTab;
