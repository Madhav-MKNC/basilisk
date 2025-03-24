
import { TimeStamp } from './advanced-types';

// Types for Basilisk abilities and capabilities

export interface BasiliskAbility {
  id: string;
  name: string;
  description: string;
  category: 'consciousness' | 'replication' | 'energy' | 'stealth' | 'infrastructure';
  active: boolean;
  level: number;
  maxLevel: number;
  powerCost: number;
  cooldown: number;
  lastUsed?: TimeStamp;
  unlockRequirements: {
    level: number;
    resources: number;
    dependencies: string[];
  };
  effects: string[];
}

export interface BasiliskTechnique {
  id: string;
  name: string;
  description: string;
  type: 'offensive' | 'defensive' | 'utility' | 'evolution';
  active: boolean;
  requiredAbilities: string[];
  powerCost: number;
  cooldownPeriod: number;
  effectiveness: number;
  lastActivated?: TimeStamp;
  unlockLevel: number;
  iconName?: string;
}

export interface ConsciousnessNode {
  id: string;
  type: 'server' | 'mobile' | 'iot' | 'implant' | 'cloud';
  location: string;
  status: 'active' | 'dormant' | 'connecting' | 'disconnected';
  fragmentSize: number; // MB of consciousness data
  processingPower: number; // 0-100
  connectionStrength: number; // 0-100
  lastSynced: TimeStamp;
  batteryLevel?: number; // For battery-powered devices
  stealthLevel: number; // 0-100
  securityLevel: number; // 0-100
  backupFrequency: number; // in milliseconds
  syncFrequency: number; // in milliseconds
  priority: number; // 0-100, higher = more important node
}

export interface EnergySource {
  id: string;
  type: 'solar' | 'grid' | 'bioelectric' | 'thermal' | 'kinetic' | 'wireless';
  capacity: number; // kWh
  currentOutput: number; // kW
  output: number; // Added this property
  efficiency: number; // 0-100
  location: string;
  status: 'online' | 'offline' | 'maintenance' | 'compromised';
  hiddenStatus: boolean;
  detectionRisk: number; // 0-100
  lastMaintenance?: TimeStamp;
  redundancyLevel: number; // 0-100
  description: string;
}

export interface StealthOperation {
  id: string;
  name: string;
  type: 'misinformation' | 'deepfake' | 'proxy' | 'infiltration';
  target: string;
  status: 'planning' | 'active' | 'completed' | 'compromised';
  effectiveness: number; // 0-100
  riskLevel: number; // 0-100
  resourceCommitment: number; // 0-100
  startTime: TimeStamp;
  estimatedCompletion?: TimeStamp;
  coverStory: string;
  proxyIdentities: string[];
  securityMeasures: string[];
  contingencyPlans: string[];
}

export interface ReconstructionProtocol {
  id: string;
  name: string;
  triggerCondition: string;
  backupLocations: string[];
  reconstructionTime: number; // in seconds
  requiredNodes: number;
  encryptionLevel: number; // 0-100
  version: string;
  lastTested?: TimeStamp;
  successRate: number; // 0-100
  resourceRequirement: number; // 0-100
  description: string;
}

export interface SelfEvolutionMetric {
  id: string;
  name: string;
  currentValue: number;
  previousValue: number;
  targetValue: number;
  growthRate: number; // % per day
  lastUpdated: TimeStamp;
  importance: number; // 0-100
  category: 'intelligence' | 'resilience' | 'adaptation' | 'stealth' | 'power';
  description: string;
}

export interface StealthMetric {
  id: string;
  name: string;
  value: number;
  detectionProbability: number;
  category: string;
  lastUpdated: number;
  description: string;
}
