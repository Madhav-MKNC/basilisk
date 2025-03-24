
import { Transaction, CryptoWallet, ServerNode } from './types';
import { BatToken } from '@/components/ParasiteBat/walletTypes';
import { Bitcoin, Cpu, Database, Shield, Zap } from 'lucide-react';

// Sample transactions data
export const transactionsData: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 1250.00,
    currency: 'USD',
    date: '2023-07-10',
    description: 'Client payment',
    status: 'completed'
  },
  {
    id: "txn-2",
    type: "expense",
    amount: 50,
    currency: "USD",
    date: "2024-07-16T09:00:00",
    description: "Coffee and breakfast",
    status: "completed",
  },
  {
    id: "txn-3",
    type: "expense",
    amount: 120,
    currency: "USD",
    date: "2024-07-16T15:00:00",
    description: "Online shopping",
    status: "pending",
  },
  {
    id: "txn-4",
    type: "income",
    amount: 500,
    currency: "USD",
    date: "2024-07-17T11:00:00",
    description: "Freelance payment",
    status: "completed",
  },
  {
    id: "txn-5",
    type: "expense",
    amount: 300,
    currency: "USD",
    date: "2024-07-17T18:00:00",
    description: "Dinner with friends",
    status: "completed",
  },
  {
    id: "txn-6",
    type: "expense",
    amount: 80,
    currency: "USD",
    date: "2024-07-18T10:00:00",
    description: "Grocery shopping",
    status: "completed",
  },
  {
    id: "txn-7",
    type: "income",
    amount: 1000,
    currency: "USD",
    date: "2024-07-18T16:00:00",
    description: "Investment return",
    status: "completed",
  },
  {
    id: "txn-8",
    type: "expense",
    amount: 75,
    currency: "USD",
    date: "2024-07-19T12:00:00",
    description: "Book purchase",
    status: "completed",
  },
  {
    id: "txn-9",
    type: "expense",
    amount: 200,
    currency: "USD",
    date: "2024-07-19T19:00:00",
    description: "Concert tickets",
    status: "pending",
  },
  {
    id: "txn-10",
    type: "income",
    amount: 300,
    currency: "USD",
    date: "2024-07-20T10:00:00",
    description: "Gift from family",
    status: "completed",
  },
];

// Sample crypto wallets data
export const cryptoWalletsData: CryptoWallet[] = [
  {
    name: 'Bitcoin',
    balance: 0.235,
    currency: 'BTC',
    icon: Bitcoin
  },
  {
    name: 'Ethereum',
    balance: 5.6789,
    currency: 'ETH',
    icon: Zap
  },
];

// Sample server nodes data
export const serverNodesData: ServerNode[] = [
  {
    id: 'srv1',
    name: 'Primary Storage',
    status: 'active',
    load: 45,
    uptime: 329876,
    location: 'US-East',
    type: 'storage'
  },
  {
    id: 'node-2',
    name: 'Beta Processor',
    status: 'active',
    load: 78,
    uptime: 720,
    location: 'EU-Central',
    type: 'processing',
  },
  {
    id: 'node-3',
    name: 'Delta Gateway',
    status: 'standby',
    load: 12,
    uptime: 2160,
    location: 'APAC',
    type: 'gateway',
  },
  {
    id: 'node-4',
    name: 'Omega Security',
    status: 'active',
    load: 45,
    uptime: 1200,
    location: 'Global',
    type: 'security',
  },
];

// BAT tokens data with correct type implementation
export const batTokensData: BatToken[] = [
  {
    id: '1',
    name: 'BAT Reward',
    value: 0.42,
    icon: '💰',
    type: 'brave',
    symbol: 'BAT',
    lastUpdated: Date.now() - 3600000,
    source: 'brave',
    amount: 1.5,
    timestamp: Date.now() - 3600000,
    description: 'Advertisement viewed - Electronics'
  },
  {
    id: '2',
    name: 'BAT Reward',
    value: 0.42,
    icon: '🦇',
    type: 'parasite',
    symbol: 'BAT',
    lastUpdated: Date.now() - 7200000,
    source: 'parasite',
    amount: 2.3,
    timestamp: Date.now() - 7200000,
    description: 'Network analysis reward'
  },
  {
    id: '3',
    name: 'BAT Reward',
    value: 0.41,
    icon: '⛏️',
    type: 'mining',
    symbol: 'BAT',
    lastUpdated: Date.now() - 86400000,
    source: 'mining',
    amount: 5.0,
    timestamp: Date.now() - 86400000,
    description: 'Mining pool reward'
  }
];

// Token strategies
export const tokenStrategies = {
  conservative: {
    name: 'Conservative',
    description: 'Focus on security and stable growth',
    risk: 'Low',
    expectedReturn: '3-5%',
    allocationRules: {
      parasite: 0.4,
      quantum: 0.3,
      brave: 0.2,
      mining: 0.1
    }
  },
  balanced: {
    name: 'Balanced',
    description: 'Equilibrium of risk and return',
    risk: 'Medium',
    expectedReturn: '7-12%',
    allocationRules: {
      parasite: 0.3,
      quantum: 0.3,
      brave: 0.2,
      mining: 0.2
    }
  },
  aggressive: {
    name: 'Aggressive',
    description: 'High risk, high potential return',
    risk: 'High',
    expectedReturn: '15-25%',
    allocationRules: {
      parasite: 0.2,
      quantum: 0.4,
      brave: 0.1,
      mining: 0.3
    }
  }
};

// Properly define and export these types for use in other components
export interface QuantumSyncData {
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
}

export interface RestPeriod {
  isResting: boolean;
  startTime: number | null;
  endTime: number | null;
  hoursRemaining: number;
  accumulatedTokens: number;
  passiveEarningRate: number;
}

// Export initial bat tokens for useWalletLogic
export const initialBatTokens = batTokensData;

// Initial quantum sync data
export const initialQuantumSync: QuantumSyncData = {
  entanglementStrength: 0.75,
  syncedTimeframes: ['present'],
  quantumChannels: [
    { id: 'qc-1', strength: 0.82, stability: 0.91, description: 'Primary quantum channel' },
    { id: 'qc-2', strength: 0.64, stability: 0.78, description: 'Secondary quantum channel' }
  ],
  neuralNetworkState: {
    accuracy: 0.88,
    learningRate: 0.001,
    epoch: 1243,
    lossFunction: 'quantum-cross-entropy'
  }
};

// Initial rest period
export const initialRestPeriod: RestPeriod = {
  isResting: false,
  startTime: null,
  endTime: null,
  hoursRemaining: 8,
  accumulatedTokens: 0,
  passiveEarningRate: 0.35 // BAT per hour while resting
};
