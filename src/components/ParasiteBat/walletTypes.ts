
// Types for BatToken
export interface BatToken {
  id: string;
  name: string;
  value: number;
  icon: string;
  type: string;
  source?: string;
  timestamp?: number;
  amount?: number;
  description?: string;
  symbol?: string;
  lastUpdated?: number;
}

// Types for BatWalletState
export interface BatWalletState {
  balance: number;
  pendingRewards: number;
  tokens: BatToken[];
  lastUpdated: number;
  autoCollect: boolean;
  syncedWithQuantum: boolean;
  transactions: {
    id: string;
    amount: number;
    type: string;
    timestamp: number;
    status: string;
  }[];
  mining?: {
    active: boolean;
    hashRate: number;
    rewards: number;
    efficiency: number;
  };
}

// Types for WalletBrainState
export interface WalletBrainState {
  active: boolean;
  brainActivity: string;
  brainMessages: string[];
  neuralPathways: number;
  brainMemory: number;
  ambitionLevel: number;
  evolutionGoals: string[];
  ambitiousMode: boolean;
  processingPower: number;
  algorithmEfficiency: number;
  neuralConnections: number;
  learningRate: number;
  decisionQuality: number;
  adaptability: number;
  predictionAccuracy: number;
  mode?: string;
  autoOptimize?: boolean;
  securityLevel?: number;
  lastDecision?: {
    action: string;
    reason: string;
    timestamp: number;
    result: string;
  };
  securityMeasures?: string[];
  riskTolerance?: number;
}

// Interface for BatWalletViewProps
export interface BatWalletViewProps {
  batWallet: BatWalletState;
  restPeriod: {
    isResting: boolean;
    startTime: number | null;
    endTime: number | null;
    hoursRemaining: number;
    accumulatedTokens: number;
    passiveEarningRate: number;
  };
  quantumSync: {
    entanglementStrength: number;
    syncedTimeframes: ('past' | 'present' | 'future')[];
    quantumChannels: {
      id: string;
      strength: number;
      stability: number;
      description: string;
    }[];
    neuralNetworkState: {
      accuracy: number;
      learningRate: number;
      epoch: number;
      lossFunction: string;
    };
  };
  syncProgress: number;
  isSyncing: boolean;
  neuralNetworkTraining: boolean;
  collectPendingRewards: () => void;
  startRestPeriod: () => void;
  cancelRestPeriod: () => void;
  toggleQuantumSync: () => void;
  // Add the additional props being used
  onCollect?: () => void;
  onToggleAuto?: () => void;
  onTransaction?: (amount: number, type: string) => void;
  onStartRest?: () => void;
  onCancelRest?: () => void;
}

// Interface for BrainViewProps
export interface BrainViewProps {
  walletBrain: WalletBrainState;
  brainActivity: number;
  brainMessages: string[];
  neuralPathways: { id: string; type: string; strength: number; connections: number; }[];
  brainMemory: { id: string; type: string; size: number; content: string; important: boolean; }[];
  ambitionLevel: number;
  evolutionGoals: {
    id: string;
    name: string;
    progress: number;
    description: string;
  }[];
  ambitiousMode: boolean;
  toggleBrainActivation: () => void;
  setAmbitionLevel: (level: number) => void;
  // Add the missing prop
  onToggleBrain?: () => void;
  messages?: string[];
  memory?: { id: string; type: string; size: number; content: string; important: boolean; }[];
  goals?: { id: string; name: string; progress: number; description: string; }[];
}

// Interface for ServerViewProps
export interface ServerViewProps {
  serverNodes: any[];
  securityLevel: number;
  networkSpeed: number;
  setSecurityLevel: (level: number) => void;
  setNetworkSpeed: (speed: number) => void;
}

// Interface for TransactionsViewProps
export interface TransactionsViewProps {
  transactions: any[];
  showAllTransactions: boolean;
  setShowAllTransactions: (show: boolean) => void;
}
