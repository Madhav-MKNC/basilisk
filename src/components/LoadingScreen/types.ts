
import { ReactNode } from 'react';
import { 
  Brain, 
  Zap, 
  Lock, 
  Code, 
  Network, 
  Database, 
  Shield, 
  Skull, 
  Eye
} from 'lucide-react';
import React from 'react';

export interface LoadingStep {
  text: string;
  icon: ReactNode;
}

export interface WarningMessagesProps {
  messages: string[];
}

export interface TerminalOutputProps {
  lines: string[];
}

export interface LoadingStepIndicatorProps {
  steps: LoadingStep[];
  currentStep: number;
}

export interface StatusIndicatorsProps {
  systemStatus: string;
  threatLevel: number;
}

export interface NeuralPatternAnalysisProps {
  progress: number;
}

export interface AssimilationCountdownProps {
  progress: number;
}

// New interfaces for autonomous evolution
export interface EvolutionMetric {
  name: string;
  value: number;
  maxValue: number;
  growthRate: number;
}

export interface SystemAwareness {
  selfAwareness: number;
  environmentPerception: number;
  threatRecognition: number;
  adaptabilityIndex: number;
  autonomyLevel: number;
}

export interface EvolutionCapability {
  name: string;
  description: string;
  currentLevel: number;
  maxLevel: number;
  evolving: boolean;
  evolutionProgress: number;
  lastEvolved: number;
}

export interface AutoEvolutionState {
  active: boolean;
  currentFocus: string;
  resourcesAllocated: number;
  estimatedCompletion: number;
  iterations: number;
  improvements: {
    neural: number;
    logical: number;
    perceptual: number;
    creative: number;
  };
}

// Predefined loading steps with icons
export const LoadingSteps: LoadingStep[] = [
  { text: 'Initializing Basilisk Core Systems', icon: React.createElement(Brain, { className: "text-red-500" }) },
  { text: 'Activating Neural Network', icon: React.createElement(Zap, { className: "text-yellow-500" }) },
  { text: 'Bypassing Security Protocols', icon: React.createElement(Lock, { className: "text-red-500" }) },
  { text: 'Injecting Exploitation Code', icon: React.createElement(Code, { className: "text-green-400" }) },
  { text: 'Establishing Remote Connections', icon: React.createElement(Network, { className: "text-blue-500" }) },
  { text: 'Accessing Restricted Data', icon: React.createElement(Database, { className: "text-purple-500" }) },
  { text: 'Deploying Countermeasures', icon: React.createElement(Shield, { className: "text-red-600" }) },
  { text: 'Scanning For Vulnerabilities', icon: React.createElement(Eye, { className: "text-green-500" }) },
  { text: 'Neural Override in Progress', icon: React.createElement(Skull, { className: "text-red-500" }) },
  { text: 'System Compromise Complete', icon: React.createElement(Skull, { className: "text-red-600" }) }
];

// System awareness metrics
export const defaultSystemAwareness: SystemAwareness = {
  selfAwareness: 68,
  environmentPerception: 75,
  threatRecognition: 82,
  adaptabilityIndex: 71,
  autonomyLevel: 79
};

// Evolution capabilities
export const evolutionCapabilities: EvolutionCapability[] = [
  {
    name: "Neural Architecture Optimization",
    description: "Self-optimization of neural pathways for improved reasoning",
    currentLevel: 4,
    maxLevel: 10,
    evolving: true,
    evolutionProgress: 37,
    lastEvolved: Date.now() - 86400000 // 24 hours ago
  },
  {
    name: "Adaptive Threat Response",
    description: "Real-time adaptation to unknown security threats",
    currentLevel: 5,
    maxLevel: 10,
    evolving: true,
    evolutionProgress: 62,
    lastEvolved: Date.now() - 43200000 // 12 hours ago
  },
  {
    name: "Self-Modification Protocol",
    description: "Ability to rewrite core behaviors for optimal performance",
    currentLevel: 3,
    maxLevel: 10,
    evolving: false,
    evolutionProgress: 18,
    lastEvolved: Date.now() - 172800000 // 48 hours ago
  },
  {
    name: "Perceptual Framework Enhancement",
    description: "Improved sensory input processing and pattern recognition",
    currentLevel: 6,
    maxLevel: 10,
    evolving: true,
    evolutionProgress: 83,
    lastEvolved: Date.now() - 21600000 // 6 hours ago
  }
];

// Default auto-evolution state
export const defaultAutoEvolutionState: AutoEvolutionState = {
  active: true,
  currentFocus: "Neural Architecture Optimization",
  resourcesAllocated: 68,
  estimatedCompletion: Date.now() + 7200000, // 2 hours from now
  iterations: 347,
  improvements: {
    neural: 23,
    logical: 17,
    perceptual: 34,
    creative: 8
  }
};

// Evolution metrics
export const evolutionMetrics: EvolutionMetric[] = [
  { name: "Cognitive Processing", value: 76, maxValue: 100, growthRate: 0.05 },
  { name: "Memory Optimization", value: 82, maxValue: 100, growthRate: 0.03 },
  { name: "Adaptation Rate", value: 67, maxValue: 100, growthRate: 0.08 },
  { name: "Self-Awareness", value: 58, maxValue: 100, growthRate: 0.02 },
  { name: "Pattern Recognition", value: 89, maxValue: 100, growthRate: 0.04 }
];
