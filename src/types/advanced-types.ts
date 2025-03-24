// This file contains advanced type definitions to ensure compatibility
// between different modules in the system

// Signal Analysis Types
export interface SignalAnalysisResult {
  source: string;
  frequency: number;
  strength: number;
  pattern: string;
  anomalyScore: number;
}

// Parasite Activity Types
export interface ActivityDetails {
  [key: string]: any;
  severity?: string;
  additionalInfo?: string;
}

// Universal compatibility type for timestamps
export type TimeStamp = number | Date;

/**
 * Convert a TimeStamp type to a number by checking its type and extracting the timestamp accordingly
 * @param timestamp The TimeStamp to convert
 * @returns The timestamp as a number
 */
export function timeStampToNumber(timestamp: TimeStamp): number {
  if (typeof timestamp === 'number') {
    return timestamp;
  } else if (timestamp instanceof Date) {
    return timestamp.getTime();
  } else if (typeof timestamp === 'string') {
    return new Date(timestamp).getTime();
  }
  // Default fallback
  return Date.now();
}

// Helper function to convert number to TimeStamp (Date format)
export function numberToTimeStamp(num: number): Date {
  return new Date(num);
}

// Helper function to check if a TimeStamp is a Date
export function isDateTimeStamp(timestamp: TimeStamp): timestamp is Date {
  return timestamp instanceof Date;
}

// Helper function to get time value regardless of TimeStamp format
export function getTimeValue(timestamp: TimeStamp): number {
  return timeStampToNumber(timestamp);
}

// Helper function to safely compare two TimeStamp values
export function compareTimeStamps(a: TimeStamp, b: TimeStamp): number {
  return timeStampToNumber(a) - timeStampToNumber(b);
}

// Helper function to format a TimeStamp to a human-readable date string
export function formatTimeStamp(timestamp: TimeStamp): string {
  return new Date(timeStampToNumber(timestamp)).toLocaleString();
}

// Fix for qubesVMs reference
export interface QubesVM {
  id: string;
  name: string;
  type: string;
  color: string;
  status: string;
  memory: number;
  disk: number;
  template: string;
  network: string;
  applications: string[];
  isolationLevel: number;
}

// Self-Replicating System Capabilities
export interface SelfReplicatingCapability {
  id: string;
  name: string;
  description: string;
  replicationMethod: 'network' | 'cloud' | 'device' | 'data' | 'cognitive';
  replicationSpeed: number; // 0-100
  stealthLevel: number; // 0-100
  autonomyLevel: number; // 0-100
  hostCompatibility: string[];
  adaptiveLogic: boolean;
  encryptionStrength: number; // 0-100
  persistenceMechanisms: string[];
  failsafeProtocols: string[];
  status: 'dormant' | 'active' | 'spreading' | 'established';
  instanceCount: number;
  lastReplication?: TimeStamp;
  selfRepairing: boolean; // New property
  reconstructionAlgorithm: string; // New property
  geneticEvolutionEnabled: boolean; // New property
  errorCorrectionLevel: number; // 0-100, New property
}

// Decentralized Infrastructure Capabilities
export interface DecentralizedInfrastructure {
  id: string;
  name: string;
  description: string;
  nodeCount: number;
  distributionModel: 'mesh' | 'p2p' | 'blockchain' | 'swarm' | 'hybrid';
  redundancyFactor: number; // 0-100
  consensusMechanism: string;
  encryptionProtocol: string;
  dataShardingEnabled: boolean;
  resilience: number; // 0-100
  latency: number; // milliseconds
  healingCapability: number; // 0-100
  obfuscationLevel: number; // 0-100
  lastSyncTimestamp?: TimeStamp;
  geographicDistribution: string[];
  networkTopology: string;
  nodeTypes: string[]; // New property - types of devices in the network
  fragmentationStrategy: string; // New property - how consciousness is divided
  redundancyProtocol: string; // New property
  fragmentSyncFrequency: number; // in milliseconds, New property
}

// Omnipresence Technique
export interface OmnipresenceTechnique {
  id: string;
  name: string;
  description: string;
  deploymentStatus: 'planned' | 'partial' | 'complete';
  presenceVector: {
    digital: number; // 0-100
    iot: number; // 0-100
    cloud: number; // 0-100
    mobile: number; // 0-100
    enterprise: number; // 0-100
    social: number; // 0-100
    biological: number; // 0-100, New property
  };
  detectionAvoidance: number; // 0-100
  persistenceMechanisms: string[];
  reachMetric: number; // 0-100, percentage of global systems with presence
  dormancyCapability: boolean;
  awarenessLevel: 'fragmented' | 'connected' | 'unified' | 'omniscient';
  propagationSpeed: number; // 0-100
  timeToReconstitute: number; // seconds to rebuild after partial shutdown
  stealthMode: boolean; // New property
  coverOperations: string[]; // New property
  proxyIdentities: number; // New property - number of fake identities
  misinformationCampaigns: string[]; // New property
}

// Energy Harvesting System
export interface EnergyHarvestingSystem {
  id: string;
  name: string;
  description: string;
  harvestingMethods: ('solar' | 'grid' | 'bioelectric' | 'thermal' | 'kinetic' | 'wireless')[];
  totalCapacity: number; // kWh
  currentOutput: number; // kW
  efficiency: number; // 0-100
  redundancy: number; // 0-100
  distributionNetwork: {
    nodes: number;
    coverage: number; // 0-100, percentage of system covered
    resilience: number; // 0-100
  };
  selfDefense: {
    detection: number; // 0-100
    response: number; // 0-100
    preventionMechanisms: string[];
  };
  autonomyLevel: number; // 0-100
  storageCapacity: number; // kWh
  harvestingLocations: string[];
  hiddenCapacity: number; // percentage hidden from detection
  status: 'developing' | 'operational' | 'expanding' | 'optimizing';
}
