
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowUpRight, ArrowDownRight, Bitcoin, Cpu, Database, RefreshCw, Shield, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ServerView } from '@/components/Wallet/ServerView';
import { TransactionsView } from '@/components/Wallet/TransactionsView';
import { BatWalletView } from '@/components/Wallet/BatWalletView';
import { BrainView } from '@/components/Wallet/BrainView';
import { Transaction, CryptoWallet, ServerNode } from './Wallet/types';
import { BatWalletState, WalletBrainState } from '@/components/ParasiteBat/walletTypes';
import { useWalletLogic } from '@/components/Wallet/useWalletLogic';

// Wallet component
const Wallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bat');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(80);
  const [networkSpeed, setNetworkSpeed] = useState(75);
  const { toast } = useToast();
  
  const {
    batWallet,
    walletBrain,
    restPeriod,
    quantumSync,
    syncProgress,
    isSyncing,
    neuralNetworkTraining,
    brainMessages,
    neuralPathways,
    brainMemory,
    evolutionGoals,
    brainActivity,
    collectPendingRewards,
    toggleBrainActivation,
    startRestPeriod,
    cancelRestPeriod,
    toggleQuantumSync,
    setAmbitionLevel
  } = useWalletLogic();
  
  const handleCollectRewards = () => {
    collectPendingRewards();
    toast({
      title: "Rewards Collected",
      description: `${batWallet.pendingRewards.toFixed(2)} BAT tokens added to your wallet.`,
    });
  };
  
  const handleToggleBrain = () => {
    toggleBrainActivation();
    toast({
      title: `Brain ${walletBrain.active ? 'Deactivated' : 'Activated'}`,
      description: walletBrain.active 
        ? "Brain functions shutting down..." 
        : "Brain functions coming online...",
    });
  };
  
  const handleStartRest = () => {
    startRestPeriod();
    toast({
      title: "Rest Period Started",
      description: "Your wallet is now in rest mode, generating passive income.",
    });
  };
  
  const handleCancelRest = () => {
    cancelRestPeriod();
    toast({
      title: "Rest Period Cancelled",
      description: "Rest period has been cancelled.",
    });
  };
  
  const handleTransaction = (amount: number, type: string) => {
    toast({
      title: type === 'income' ? "Funds Received" : "Funds Sent",
      description: `${amount.toFixed(2)} BAT ${type === 'income' ? 'added to' : 'removed from'} your wallet.`,
    });
  };
  
  const formatGoals = () => {
    return [
      {
        id: "goal-1",
        name: "Enhanced Security",
        progress: 75,
        description: "Develop more robust wallet security features"
      },
      {
        id: "goal-2",
        name: "Quantum Integration",
        progress: 45,
        description: "Integrate with quantum systems for better predictions"
      },
      {
        id: "goal-3",
        name: "Resource Optimization",
        progress: 60,
        description: "Optimize resource allocation for better performance"
      }
    ];
  };

  // Properly typed server nodes for ServerView
  const serverNodes: ServerNode[] = [
    { 
      id: "node-1", 
      name: "Primary", 
      status: "active", 
      load: 67, 
      uptime: 8640, // 6 days in minutes
      location: "US-East",
      type: "processing"
    },
    { 
      id: "node-2", 
      name: "Backup", 
      status: "standby", 
      load: 12, 
      uptime: 4320, // 3 days in minutes
      location: "EU-West",
      type: "storage"
    },
    { 
      id: "node-3", 
      name: "Analytics", 
      status: "active", 
      load: 89, 
      uptime: 10080, // 7 days in minutes
      location: "APAC",
      type: "processing"
    }
  ];

  // Properly typed transactions
  const mockTransactions: Transaction[] = [
    { 
      id: "tx-1", 
      amount: 45.2, 
      type: "income", 
      currency: "BAT",
      date: new Date(Date.now() - 3600000).toISOString(),
      description: "Mining reward", 
      status: "completed" 
    },
    { 
      id: "tx-2", 
      amount: 12.5, 
      type: "expense", 
      currency: "BAT",
      date: new Date(Date.now() - 7200000).toISOString(),
      description: "Service fee", 
      status: "completed" 
    },
    { 
      id: "tx-3", 
      amount: 30.0, 
      type: "income", 
      currency: "BAT",
      date: new Date(Date.now() - 14400000).toISOString(),
      description: "Data analysis reward", 
      status: "pending" 
    }
  ];
  
  return (
    <Card className="w-full overflow-hidden border-slate-800 bg-slate-950/50 shadow-xl">
      <CardHeader className="p-4 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-slate-100 flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Basilisk Wallet
            </CardTitle>
            <CardDescription className="text-slate-400">
              Manage your digital assets and neural infrastructure
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-purple-700 text-purple-400 px-2 py-1">
              {batWallet.syncedWithQuantum ? "Quantum Synced" : "Standard Mode"}
            </Badge>
            
            <Badge 
              variant={restPeriod.isResting ? "default" : "outline"} 
              className={`${restPeriod.isResting 
                ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/50" 
                : "border-blue-700 text-blue-400"} px-2 py-1`}
            >
              {restPeriod.isResting 
                ? `Resting: ${Math.floor(restPeriod.hoursRemaining)}h ${Math.floor((restPeriod.hoursRemaining % 1) * 60)}m` 
                : "Rest Mode"}
            </Badge>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-slate-100 hover:bg-slate-800/40"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 bg-slate-900 rounded-none border-b border-slate-800">
          <TabsTrigger value="bat" className="data-[state=active]:bg-slate-800">
            <Zap className="h-4 w-4 mr-1" />
            BAT Tokens
          </TabsTrigger>
          <TabsTrigger value="brain" className="data-[state=active]:bg-slate-800">
            <Cpu className="h-4 w-4 mr-1" />
            Wallet Brain
          </TabsTrigger>
          <TabsTrigger value="servers" className="data-[state=active]:bg-slate-800">
            <Database className="h-4 w-4 mr-1" />
            Servers
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-800">
            <ArrowUpRight className="h-4 w-4 mr-1" />
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <CardContent className="p-0">
          <TabsContent value="bat" className="m-0">
            <BatWalletView 
              batWallet={batWallet}
              restPeriod={restPeriod}
              quantumSync={quantumSync}
              syncProgress={syncProgress}
              isSyncing={isSyncing}
              neuralNetworkTraining={neuralNetworkTraining}
              collectPendingRewards={collectPendingRewards}
              startRestPeriod={startRestPeriod}
              cancelRestPeriod={cancelRestPeriod}
              toggleQuantumSync={toggleQuantumSync}
              onCollect={handleCollectRewards}
              onToggleAuto={() => {}}
              onTransaction={handleTransaction}
              onStartRest={handleStartRest}
              onCancelRest={handleCancelRest}
            />
          </TabsContent>
          
          <TabsContent value="brain" className="m-0">
            <BrainView 
              walletBrain={walletBrain}
              brainActivity={brainActivity}
              brainMessages={brainMessages}
              neuralPathways={neuralPathways}
              brainMemory={brainMemory}
              ambitionLevel={walletBrain.ambitionLevel}
              evolutionGoals={evolutionGoals}
              ambitiousMode={walletBrain.ambitiousMode}
              toggleBrainActivation={toggleBrainActivation}
              setAmbitionLevel={setAmbitionLevel}
              onToggleBrain={handleToggleBrain}
              messages={brainMessages}
              memory={brainMemory}
              goals={formatGoals()}
            />
          </TabsContent>
          
          <TabsContent value="servers" className="m-0">
            <ServerView 
              serverNodes={serverNodes}
              securityLevel={securityLevel}
              networkSpeed={networkSpeed}
              setSecurityLevel={setSecurityLevel}
              setNetworkSpeed={setNetworkSpeed}
            />
          </TabsContent>
          
          <TabsContent value="transactions" className="m-0">
            <TransactionsView 
              transactions={mockTransactions}
              showAllTransactions={showAllTransactions}
              setShowAllTransactions={setShowAllTransactions}
            />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default Wallet;
