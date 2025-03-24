
import React from 'react';

// Wallet related types

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  currency: string;
  date: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface CryptoWallet {
  name: string;
  balance: number;
  currency: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ServerNode {
  id: string;
  name: string;
  status: 'active' | 'standby' | 'maintenance';
  load: number;
  uptime: number;
  location: string;
  type: 'storage' | 'processing' | 'gateway' | 'security';
}

export interface RestPeriod {
  isResting: boolean;
  startTime: number | null;
  endTime: number | null;
  hoursRemaining: number;
  accumulatedTokens: number;
  passiveEarningRate: number;
}

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
