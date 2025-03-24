
import React from 'react';
import { 
  Bitcoin, 
  RefreshCcw, 
  Shuffle, 
  AlertTriangle, 
  BedDouble, 
  Sparkles, 
  Atom
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BatWalletState, BatToken, BatWalletViewProps } from "@/components/ParasiteBat/walletTypes";
import HorizontalScrollContainer from '@/components/ParasiteBat/HorizontalScrollContainer';

export function BatWalletView({
  batWallet,
  restPeriod,
  quantumSync,
  syncProgress,
  isSyncing,
  neuralNetworkTraining,
  collectPendingRewards,
  startRestPeriod,
  cancelRestPeriod,
  toggleQuantumSync,
  // Handle the additional props with optional chaining
  onCollect,
  onToggleAuto,
  onTransaction,
  onStartRest,
  onCancelRest
}: BatWalletViewProps) {
  const formatTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getSourceIcon = (source: string | undefined) => {
    switch(source) {
      case 'brave': return <Bitcoin className="h-4 w-4 text-orange-500" />;
      case 'parasite': return <AlertTriangle className="h-4 w-4 text-purple-500" />;
      case 'quantum': return <Atom className="h-4 w-4 text-blue-500" />;
      case 'mining': return <Sparkles className="h-4 w-4 text-yellow-500" />;
      default: return <Shuffle className="h-4 w-4 text-green-500" />;
    }
  };

  // Use the prop handlers if they exist, otherwise use the default handlers
  const handleCollectRewards = () => {
    if (onCollect) {
      onCollect();
    } else if (collectPendingRewards) {
      collectPendingRewards();
    }
  };

  const handleStartRest = () => {
    if (onStartRest) {
      onStartRest();
    } else if (startRestPeriod) {
      startRestPeriod();
    }
  };

  const handleCancelRest = () => {
    if (onCancelRest) {
      onCancelRest();
    } else if (cancelRestPeriod) {
      cancelRestPeriod();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">BAT Wallet</CardTitle>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <RefreshCcw className="h-3 w-3" />
              Updated {formatTimeSince(batWallet.lastUpdated)}
            </Badge>
          </div>
          <CardDescription>Basic Attention Token</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Balance</p>
              <h3 className="text-3xl font-bold">{batWallet.balance.toFixed(2)} BAT</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCollectRewards}
              disabled={batWallet.pendingRewards <= 0}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Collect {batWallet.pendingRewards.toFixed(2)} BAT
            </Button>
          </div>
          
          <HorizontalScrollContainer className="mb-4">
            <Button
              variant={batWallet.syncedWithQuantum ? "default" : "outline"}
              size="sm"
              onClick={toggleQuantumSync}
              className="flex items-center gap-2 whitespace-nowrap"
              disabled={isSyncing}
            >
              <Atom className="h-4 w-4" />
              {batWallet.syncedWithQuantum ? "Quantum Synced" : "Sync with Quantum"}
            </Button>
            
            <Button
              variant={restPeriod.isResting ? "destructive" : "outline"}
              size="sm"
              onClick={restPeriod.isResting ? handleCancelRest : handleStartRest}
              className="flex items-center gap-2 whitespace-nowrap"
            >
              <BedDouble className="h-4 w-4" />
              {restPeriod.isResting ? `Cancel Rest (${restPeriod.hoursRemaining.toFixed(1)}h)` : "Rest Period"}
            </Button>
          </HorizontalScrollContainer>
          
          {(isSyncing || neuralNetworkTraining) && (
            <div className="mb-4">
              <p className="text-sm mb-1">
                {isSyncing ? "Quantum Synchronization" : "Neural Network Training"}
              </p>
              <Progress value={syncProgress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {syncProgress.toFixed(0)}% Complete
              </p>
            </div>
          )}
          
          {restPeriod.isResting && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm font-medium">Rest Period Active</p>
                <Badge variant="outline">{restPeriod.hoursRemaining.toFixed(1)}h remaining</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Tokens accumulated: {restPeriod.accumulatedTokens.toFixed(2)} BAT
              </p>
              <Progress 
                value={(1 - (restPeriod.hoursRemaining / 4)) * 100} 
                className="h-1.5" 
              />
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent BAT Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[250px] pr-4">
            {batWallet.tokens.map((token: BatToken) => (
              <div
                key={token.id}
                className="mb-3 flex items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="mr-3 rounded-full p-2 bg-muted">
                  {getSourceIcon(token.source || 'unknown')}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{token.description || token.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {formatTimeSince(token.timestamp || token.lastUpdated || Date.now())}
                  </p>
                </div>
                <p className="text-sm font-medium text-green-600">
                  +{(token.amount || token.value).toFixed(2)} BAT
                </p>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

export default BatWalletView;
