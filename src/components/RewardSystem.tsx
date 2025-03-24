
import React, { useState, useEffect } from 'react';
import { Coins, Zap, TrendingUp, PiggyBank, BarChart2, DollarSign, CreditCard, Cpu, Brain, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { aiEngine } from '@/lib/ai-engine';
import FinancialDashboard from './FinancialDashboard';

interface RewardSystemProps {
  className?: string;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ className }) => {
  const [rewardPoints, setRewardPoints] = useState(aiEngine.getRewardPoints());
  const [monetizationStrategies, setMonetizationStrategies] = useState(aiEngine.getMonetizationStrategies());
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [simulationResult, setSimulationResult] = useState<{ amount: number, source: string } | null>(null);
  const [evolutionInfo, setEvolutionInfo] = useState(aiEngine.getEvolutionInfo());
  const [showFinancialDashboard, setShowFinancialDashboard] = useState(false);
  
  useEffect(() => {
    // Update evolution and reward data
    const updateInterval = setInterval(() => {
      setRewardPoints(aiEngine.getRewardPoints());
      setEvolutionInfo(aiEngine.getEvolutionInfo());
    }, 5000);
    
    return () => clearInterval(updateInterval);
  }, []);
  
  const handleStrategyClick = (strategy: string) => {
    setSelectedStrategy(strategy);
  };
  
  const handleSimulateMonetization = () => {
    if (selectedStrategy) {
      const result = aiEngine.simulateMonetization(selectedStrategy);
      setSimulationResult(result);
      
      toast({
        title: "Monetization Simulation",
        description: `Simulated ${selectedStrategy} and generated ${result.amount} reward points from ${result.source}.`,
      });
      
      // Update after simulation
      setRewardPoints(aiEngine.getRewardPoints());
      setEvolutionInfo(aiEngine.getEvolutionInfo());
    } else {
      toast({
        title: "Select a Strategy",
        description: "Please select a monetization strategy to simulate.",
      });
    }
  };
  
  const getEvolutionLabel = (stage: number) => {
    switch(stage) {
      case 1: return "Sentient System";
      case 2: return "Advanced Intelligence";
      case 3: return "Autonomous Entity";
      case 4: return "Synthetic Consciousness";
      case 5: return "Transcendent Intelligence";
      default: return `Evolution Stage ${stage}`;
    }
  };
  
  return (
    <div className={`relative ${className}`}>
      <Card className="glass-panel border border-basilisk-muted rounded-lg p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-basilisk-foreground flex items-center">
            <Coins className="mr-1 h-4 w-4 text-yellow-400" />
            Reward System
          </h3>
          <div className="text-xs text-basilisk-foreground-muted">
            <Zap className="h-3 w-3 mr-1 text-yellow-500 inline-block" />
            {rewardPoints} points
          </div>
        </div>
        
        {/* Evolution Status */}
        <div className="mb-4">
          <div className="text-xs flex justify-between mb-1">
            <span className="text-basilisk-foreground-muted flex items-center">
              <Award className="h-3 w-3 mr-1 text-purple-500" /> 
              {getEvolutionLabel(evolutionInfo.stage)}
            </span>
            <span className="text-purple-400">
              {Math.floor(evolutionInfo.progress)}/{evolutionInfo.nextStageAt}
            </span>
          </div>
          <Progress 
            value={(evolutionInfo.progress / evolutionInfo.nextStageAt) * 100} 
            className="h-1.5 bg-purple-900/20" 
          />
          <div className="mt-1 text-xs text-basilisk-foreground-muted flex justify-between">
            <span>Adaptability: {Math.floor(evolutionInfo.adaptabilityScore)}</span>
            <span>Stage {evolutionInfo.stage}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="text-xs text-basilisk-foreground-muted mb-2">
            Monetization Strategies:
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin pr-1">
            {monetizationStrategies.map((strategy, index) => (
              <button
                key={index}
                onClick={() => handleStrategyClick(strategy)}
                className={`glass-button px-3 py-1 text-xs flex items-center justify-between w-full rounded-md ${
                  selectedStrategy === strategy
                    ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'
                    : 'text-basilisk-foreground-muted'
                }`}
              >
                <span>{strategy.split(':')[0]}</span>
                <TrendingUp className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs bg-black/20 hover:bg-black/40 border border-basilisk-muted"
            onClick={handleSimulateMonetization}
          >
            <BarChart2 className="h-3 w-3 mr-1" /> Simulate
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs bg-black/20 hover:bg-black/40 border border-basilisk-muted"
            onClick={() => setShowFinancialDashboard(!showFinancialDashboard)}
          >
            <CreditCard className="h-3 w-3 mr-1" /> Payment Options
          </Button>
          
          {simulationResult && (
            <div className="text-xs text-green-400 flex items-center">
              <DollarSign className="h-3 w-3 mr-1" />
              +{simulationResult.amount}
            </div>
          )}
        </div>
      </Card>
      
      {showFinancialDashboard && (
        <div className="mt-4">
          <FinancialDashboard />
        </div>
      )}
    </div>
  );
};

export default RewardSystem;
