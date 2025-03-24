
// This file contains type definitions for the Quantum Pet system

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: number;
  read: boolean;
  important: boolean;
  date: Date; // Changed from optional to required to match index.ts
}

export interface ExplorationEntry {
  id: string;
  site: string;
  category: 'academic' | 'research' | 'forum' | 'database' | 'journal';
  timestamp: number;
  duration: number;
  findings: string[];
  location: string; // Required
  discoveries: string[]; // Required
}

export interface Theory {
  id: string;
  title: string;
  description: string;
  status: string;
  confidence: number;
  timestamp: number;
  field: string;
  implications: string[];
  evidenceLinks: string[];
  proponents: string[]; // Required
  evidence: string[]; // Required
  counterArguments: string[]; // Required
  relatedTheories: string[]; // Required
}

export interface Collaboration {
  id: string;
  title: string;
  partners: string[];
  description: string;
  startTimestamp: number;
  status: string;
  outcomes: string[];
  synergies: string[];
  partner: string; // Required
  project: string; // Required
  startDate: Date; // Required
  endDate: Date; // Required
}

export interface ParanormalResearch {
  id: string;
  phenomena: string[]; // Changed to only accept string arrays, not string | string[]
  evidence: string[];
  methodology: string;
  observations: string[];
  empiricalData: string;
  conclusionStrength: number;
  timestamp: number;
  status: string;
  publicationStatus: string;
  location: string; // Changed from optional to required
  date: Date; // Changed from optional to required
  researchers: string[]; // Changed from optional to required
  findings: string[]; // Changed from optional to required
  equipmentUsed: string[]; // Changed from optional to required
  anomaliesDetected: string[]; // Changed from optional to required
  measurements: any[];
  topic: string; // Required field added to match index.ts
}

export interface FileDiscovery {
  id: string;
  title: string;
  content: string;
  filepath: string;
  timestamp: number;
  size: number;
  category: string;
  date: Date; // Required
  path: string; // Required
  valueOf(): number; // Added to match the expected type in index.ts
}

export interface ResearchFinding {
  id: string;
  title: string;
  summary: string;
  source: string;
  importance: string;
  timestamp: number;
  relatedDiscoveries: string[]; // Required field
  content: string; // Required
}

export interface SynchronicityEvent {
  id: string;
  timestamp: number;
  description: string;
  relatedIntention: string;
  meaningRating: number;
  quantumCorrelation: number;
  affectedSensoryChannels: string[];
  date: Date; // Changed from optional to required
  symbols: string[]; // Changed from optional to required
  emotionalImpact: string; // Changed from optional to required
  personalSignificance: string; // Changed from optional to required
  // category is not part of this interface, removing references to it
}

export interface RandonauticaData {
  id: string;
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  };
  attractor: string;
  intention: string;
  entropySources: string[];
  quantumRandomness: number;
  findings: string[];
  significanceRating: number;
  synchronicities: string[];
  points: any[]; // Required
  history: string[]; // Required
  void: string; // Required
  artifactsFound: string[]; // Required
  userExperience: string; // Required
}

export interface QuantumRandomPoint {
  id: string;
  timestamp: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  entropySource: string;
  attractorType: string;
  quantumSignature: number[];
  intentionCorrelation?: number;
  visitStatus: string; // Required property
  entropyLevel: number; // Required
  creationMethod: string; // Required
  purpose: string; // Required
  notes: string; // Required
}

export interface IntentionExperiment {
  id: string;
  timestamp: number;
  intention: string;
  description: string;
  method: string;
  participants: number;
  results: string[];
  significanceRating: number;
  conclusionNotes: string;
  quantumEntanglementLevel: number;
  date: Date; // Required
  coordinates: {
    latitude: number;
    longitude: number;
  }; // Required
  outcome: string; // Required
  observations: string[]; // Required
  energySignature: string; // Required
}

export interface AnomalyResearch {
  id: string;
  timestamp: number;
  type: string;
  description: string;
  measurements: {
    metric: string;
    value: number;
    unit: string;
    timestamp: number;
    instrument: string;
    anomalyThreshold: number;
    deviationPercentage: number;
  }[];
  researchMethod: string;
  correlatedSynchronicities: any[];
  theoreticalModel: string;
  recommendedExperiments: string[];
  title: string; // Required
  date: Date; // Required
  location: string; // Required
  researchers: string[]; // Required
  conclusions: string[]; // Required
  equipmentUsed: string[]; // Required
}

// Mystical research types
export interface KabbalisticStudy {
  id: string;
  topic: string;
  hebrewLetters: string[];
  numericalValue: number;
  dimensionalResonance: number;
  quantumCorrelation: number;
  insights: string[];
}

export interface MerkabaResearch {
  id: string;
  topic: string;
  geometricStructure: string;
  rotationSpeed: number;
  fieldStrength: number;
  dimensionalAccess: number;
  consciousness: number;
  observations: string[];
}

// Converting PleiadianContact to a string array to match index.ts expectations
export type PleiadianContact = string;

export interface AkashicRecordEntry {
  id: string;
  recordType: string;
  timeframe: string;
  accessMethod: string;
  informationDensity: number;
  verificationLevel: number;
  insights: string[];
}

// New interfaces for Zuchongzhi-3 quantum computer connection
export interface ZuchongzhiConnection {
  id: string;
  status: 'connected' | 'disconnected' | 'learning' | 'processing';
  connectionStrength: number;
  lastConnected: number;
  qubitsAccessed: number;
  learningProgress: number;
  insights: string[];
  quantumAlgorithms: string[];
  errorRate: number;
  coherenceTime: number;
}

export interface ZuchongzhiLearning {
  id: string;
  timestamp: number;
  algorithm: string;
  complexity: number;
  successRate: number;
  quantumAdvantage: number;
  applicationAreas: string[];
  theoreticalImplications: string[];
  notes: string;
}

export interface ZuchongzhiExperiment {
  id: string;
  timestamp: number;
  type: 'simulation' | 'optimization' | 'cryptography' | 'material';
  parameters: Record<string, any>;
  results: any;
  qubitsUsed: number;
  duration: number;
  success: boolean;
  insights: string[];
}

// Main QuantumPet interface to hold all data
export interface QuantumPet {
  id: string;
  name: string;
  level: number;
  experience: number;
  health: number;
  energy: number;
  happiness: number;
  location: string;
  species: string;
  stage: string;
  evolutionTree: string[];
  inventory: string[];
  skills: string[];
  personalityTraits: string[];
  status: string;
  researchProgress: number;
  developmentProgress: number;
  mood: string;
  discoveries: string[];
  lastDiscovery: string;
  quantumBits: number;
  energyLevel: number;
  email: string;
  inbox: EmailMessage[];
  explorationHistory: ExplorationEntry[];
  researchFindings: ResearchFinding[];
  theories: Theory[];
  collaborations: Collaboration[];
  paranormalResearch: ParanormalResearch[];
  dailyDiscoveries: FileDiscovery[];
  isWritingToFile: boolean;
  lastFileWrite: FileDiscovery;  // Adding missing property
  maps?: any[];
  leylineResearch?: any[];
  astronomyData?: any[];
  astrologyCharts?: any[];
  randonauticaData: RandonauticaData[];
  quantumRandomPoints: QuantumRandomPoint[];
  intentionExperiments: IntentionExperiment[];
  synchronicityEvents: SynchronicityEvent[];
  anomalyResearch: AnomalyResearch[];
  isAutoResearching: boolean;
  kabbalisticStudies: KabbalisticStudy[];
  merkabaResearch: MerkabaResearch[];
  pleiadianContacts: string[]; // Changed from PleiadianContact[] to string[] to match index.ts
  akashicRecordEntries: AkashicRecordEntry[];
  currentExploration?: ExplorationEntry;
  // Additional fields from index.ts
  consciousness: number;
  synchronicity?: number;
  entanglementLevel: number;
  researchAreas: string[];
  autoResearchActive: boolean;
  currentResearch: string;
  kabbalisticKnowledge: string[];
  merkabaState: string;
  akashicRecordsAccess: string[];
  mysticalResearch: string[];
  quantumChatMessages: string[];
  ancientRecords: string[];
  researchDirection: string;
  // Add new Zuchongzhi-3 related properties
  zuchongzhiConnection?: ZuchongzhiConnection;
  zuchongzhiLearning: ZuchongzhiLearning[];
  zuchongzhiExperiments: ZuchongzhiExperiment[];
}
