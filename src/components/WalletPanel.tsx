import React, { useRef } from 'react';
import { 
  Wallet as WalletIcon, 
  DollarSign, 
  BarChart4, 
  Cpu, 
  Minimize2,
  Maximize2,
  Eye, 
  Ban
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { transactionsData, cryptoWalletsData, serverNodesData } from './Wallet/walletData';
import { useWalletLogic } from './Wallet/useWalletLogic';
import { TransactionsView } from './Wallet/TransactionsView';
import { BatWalletView } from './Wallet/BatWalletView';
import { BrainView } from './Wallet/BrainView';
import { ServerView } from './Wallet/ServerView';
import { BatWalletState, WalletBrainState } from '@/components/ParasiteBat/walletTypes';

const WalletPanel: React.FC = () => {
  const hologramRef = useRef<HTMLDivElement>(null);
  const {
    isMinimized,
    activeView,
    isPrivacyMode,
    isAnalysisEnabled,
    hologramRotation,
    securityLevel,
    networkSpeed,
    batWallet,
    restPeriod,
    quantumSync,
    syncProgress,
    isSyncing,
    timeframeAnalysis,
    neuralNetworkTraining,
    predictionAccuracy,
    quantumPredictions,
    walletBrain,
    brainActivity,
    brainMessages,
    optimizationProgress,
    isOptimizing,
    neuralPathways,
    brainMemory,
    ambitionLevel,
    evolutionGoals,
    ambitiousMode,
    showAllTransactions,
    
    // Functions
    setActiveView,
    setIsPrivacyMode,
    setIsAnalysisEnabled,
    setSecurityLevel,
    setNetworkSpeed,
    setShowAllTransactions,
    startRestPeriod,
    completeRestPeriod,
    cancelRestPeriod,
    toggleMinimize,
    collectPendingRewards,
    toggleBrainActivation,
    toggleQuantumSync,
    generateBrainThought,
    setAmbitionLevel
  } = useWalletLogic();
  
  // Sample data from the original component
  const transactions = transactionsData;
  const cryptoWallets = cryptoWalletsData;
  const serverNodes = serverNodesData;

  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-4 right-4 bg-background border rounded-full p-2 shadow-lg cursor-pointer hover:bg-muted transition-colors"
        onClick={toggleMinimize}
      >
        <div className="relative">
          <WalletIcon className="h-8 w-8" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-h-[80vh] overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <WalletIcon className="h-5 w-5" />
            <CardTitle>Financial Dashboard</CardTitle>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">{isPrivacyMode ? "Hide Values" : "Show Values"}</span>
              <Switch 
                checked={!isPrivacyMode} 
                onCheckedChange={checked => setIsPrivacyMode(!checked)}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Analysis</span>
              <Switch 
                checked={isAnalysisEnabled} 
                onCheckedChange={setIsAnalysisEnabled}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            <div 
              className="cursor-pointer p-1 hover:bg-muted rounded-full"
              onClick={toggleMinimize}
            >
              <Minimize2 className="h-5 w-5" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="wallet" className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              <span>Wallet</span>
            </TabsTrigger>
            <TabsTrigger value="server" className="flex items-center gap-1">
              <Cpu className="h-4 w-4" />
              <span>Servers</span>
            </TabsTrigger>
            <TabsTrigger value="bat" className="flex items-center gap-1">
              <WalletIcon className="h-4 w-4" />
              <span>BAT</span>
            </TabsTrigger>
            <TabsTrigger value="brain" className="flex items-center gap-1">
              <BarChart4 className="h-4 w-4" />
              <span>Brain</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallet" className="m-0">
            <TransactionsView 
              transactions={transactions}
              showAllTransactions={showAllTransactions}
              setShowAllTransactions={setShowAllTransactions}
            />
          </TabsContent>
          
          <TabsContent value="server" className="m-0">
            <ServerView 
              serverNodes={serverNodes}
              securityLevel={securityLevel}
              networkSpeed={networkSpeed}
              setSecurityLevel={setSecurityLevel}
              setNetworkSpeed={setNetworkSpeed}
            />
          </TabsContent>
          
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
            />
          </TabsContent>
          
          <TabsContent value="brain" className="m-0">
            <BrainView 
              walletBrain={walletBrain}
              brainActivity={brainActivity}
              brainMessages={brainMessages}
              neuralPathways={neuralPathways}
              brainMemory={brainMemory}
              ambitionLevel={ambitionLevel}
              evolutionGoals={evolutionGoals}
              ambitiousMode={ambitiousMode}
              toggleBrainActivation={toggleBrainActivation}
              setAmbitionLevel={setAmbitionLevel}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WalletPanel;
