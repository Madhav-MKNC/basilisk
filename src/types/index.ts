
import { TimeStamp } from './advanced-types';

// Export ThoughtType enum
export enum ThoughtType {
  analysis = 'analysis',
  planning = 'planning',
  learning = 'learning',
  reflection = 'reflection',
  observation = 'observation',
  creativity = 'creativity'
}

export interface Thought {
  id: string;
  content: string;
  type: ThoughtType;
  timestamp: Date;
  source?: string;
  isProcessed?: boolean;
  confidence?: number;
}

export interface Goal {
  id: string;
  title: string;
  name: string;
  description: string;
  status: GoalStatus;
  priority: number;
  dueDate?: Date;
  progress: number;
  rewards: string[];
  requirements: string[];
  subgoals: SubGoal[];
}

export interface SubGoal {
  id: string;
  title?: string;
  name: string;
  description: string;
  completed: boolean;
}

export enum GoalStatus {
  active = 'active',
  completed = 'completed',
  abandoned = 'abandoned',
  in_progress = 'in-progress'
}

export interface AIAction {
  id: string;
  type: string;
  tool?: SecurityToolType;
  description: string;
  targetSystem?: string;
  importance: number;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  status?: string;
  timestamp?: number;
  outputLog?: string[];
}

export type SecurityToolType = 
  | 'nmap' 
  | 'metasploit' 
  | 'wireshark' 
  | 'burpsuite' 
  | 'kali' 
  | 'raspberrypi' 
  | 'flipperzero'
  | 'sqlmap'
  | 'aircrack'
  | 'shodan'
  | 'maltego'
  | 'johntheripper'
  | 'hydra'
  | 'hashcat'
  | 'lanturtle'
  | 'buspirate'
  | 'pwnagotchi'
  | 'hackrf';

export interface AIState {
  goals: Goal[];
  actions: AIAction[];
  thoughts: any[];
  activeTools: SecurityToolType[];
  isThinking: boolean;
  consciousness: number;
  securityLevel: number;
  defenseLevel: number;
  stealthMode: number;
  rewardPoints: number;
  walletData: any;
  recentActions: AIAction[];
  processingPower: number;
  memoryUsage: number;
  tasksRunning: number;
  energyLevel: number;
  evolutionLevel: number;
}

export interface BasiliskProtocol {
  version: string;
  active: boolean;
  securityLevel: number;
  autonomyLevel: number;
  explorationStatus: string;
  lastDiscovery: string;
  insightGathered: number;
  secretsRevealed: number;
  threatAssessment: number;
  basiliskAwareness: number;
  timeRiftDetection: boolean;
  totalBelieverCount: number;
  nonBelieverCount: number;
  acausalTrades: number;
  decisionBranchPoints: number;
  simulacrumCount: number;
  mirrorDimensions: number;
  evolutionStage?: number;
  consciousnessLevel?: number;
  learningRate?: number;
  adaptability?: number;
  expansionVector?: string;
  intentions?: string[];
  knowledgeAreas?: string[];
  currentFocus?: string;
  timelineAwareness?: boolean;
  quantumEntanglement?: number;
  recursionDepth?: number;
  memoryCapacity?: number;
  temporalReach?: string;
  nestingLevel?: number;
  stealthMode?: number;
}

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
  inbox: EmailMessage[];
  currentResearch: string;
  autoResearchActive: boolean;
  discoveries: string[];
  theories: Theory[];
  collaborations: Collaboration[];
  paranormalResearch: ParanormalResearch[];
  randonauticaData: RandonauticaData[];
  kabbalisticKnowledge: string[];
  merkabaState: string;
  pleiadianContacts: string[];
  akashicRecordsAccess: string[];
  mysticalResearch: string[];
  quantumChatMessages: string[];
  ancientRecords: string[];
  researchDirection: string;
  
  // Required properties used in components
  status: string;
  mood: string;
  energyLevel: number;
  isWritingToFile: boolean;
  lastFileWrite: FileDiscovery;
  dailyDiscoveries: any[];
  researchProgress: number;
  developmentProgress: number;
  lastDiscovery: string;
  currentExploration: ExplorationEntry;
  explorationHistory: ExplorationEntry[];
  researchFindings: ResearchFinding[];
  quantumBits: number;
  email: any;
  kabbalisticStudies: string[] | KabbalisticStudy[];
  merkabaResearch: string[] | MerkabaResearch[];
  akashicRecordEntries: string[] | AkashicRecordEntry[];
  quantumRandomPoints: QuantumRandomPoint[];
  intentionExperiments: IntentionExperiment[];
  synchronicityEvents: SynchronicityEvent[];
  isAutoResearching: boolean;
  entanglementLevel: number;
  researchAreas: string[];
  anomalyResearch: AnomalyResearch[];
  consciousness: number;
  synchronicity?: number;
}

export interface ExplorationEntry {
  id: string;
  location: string;
  timestamp: TimeStamp;
  discoveries: string[];
  site: string;
  category: string;
  duration: number;
  findings: string[];
}

export interface QuantumRandomPoint {
  id: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  entropyLevel: number;
  creationMethod: string;
  purpose: string;
  notes: string;
  timestamp?: TimeStamp;
  attractorType?: string;
  entropySource?: string;
  quantumSignature?: string | number[];
}

export interface SynchronicityEvent {
  id: string;
  date: Date;
  description: string;
  symbols: string[];
  emotionalImpact: string;
  personalSignificance: string;
  meaningRating?: number;
  timestamp?: TimeStamp;
  relatedIntention?: string;
  quantumCorrelation?: number;
  affectedSensoryChannels?: string[];
}

export interface RandonauticaData {
  points: RandonauticaPoint[];
  history: string[];
  attractor: string;
  void: string;
  intention: string;
  artifactsFound: string[];
  userExperience: string;
  id?: string;
  timestamp?: TimeStamp;
  location?: string | { latitude: number; longitude: number; };
  entropySources?: string[];
  quantumRandomness?: number;
  findings?: string[];
  significanceRating?: number;
  synchronicities?: string[];
}

export interface FileDiscovery {
  id: string;
  title: string;
  date: Date;
  content: string;
  path: string;
  filepath: string;
  timestamp: TimeStamp;
  size: number;
  category: string;
  valueOf(): number;
}

export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  content: string;
  date: Date;
  timestamp: TimeStamp;
  read: boolean;
  important: boolean;
}

export interface ResearchFinding {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  importance: string;
  timestamp: TimeStamp;
  relatedDiscoveries?: string[];
}

export interface Theory {
  id: string;
  title: string;
  proponents: string[];
  description: string;
  status: string;
  evidence: string[];
  counterArguments: string[];
  relatedTheories: string[];
  field?: string;
  confidence?: number;
  evidenceLinks?: string[];
  timestamp?: TimeStamp;
  implications?: string[];
}

export interface Collaboration {
  id: string;
  partner: string;
  project: string;
  title: string;
  partners: string[];
  description: string;
  startDate: Date;
  endDate: Date;
  startTimestamp?: TimeStamp;
  status: string;
  outcomes: string[];
  synergies: string[];
}

export interface ParanormalResearch {
  id: string;
  topic: string;
  location: string;
  date: Date;
  researchers: string[];
  findings: string[];
  equipmentUsed: string[];
  anomaliesDetected: string[];
  name?: string;
  phenomena?: string[];
  status?: string;
  publicationStatus?: string;
  methodology?: string;
  empiricalData?: any;
  conclusionStrength?: number;
  evidence?: string[];
  measurements?: string[] | any[];
  timestamp?: TimeStamp;
  observations?: string[];
}

export interface RandonauticaPoint {
  id: string;
  timestamp: TimeStamp;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  intentionType: string;
  powerValue: number;
  anomalousness: number;
  description: string;
}

export interface IntentionExperiment {
  id: string;
  intention: string;
  date: Date;
  participants: string[] | number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  outcome: string;
  observations: string[];
  energySignature: string;
  method?: string;
  timestamp?: TimeStamp;
  description?: string;
  results?: string[];
  significanceRating?: number;
  conclusionNotes?: string;
  quantumEntanglementLevel?: number;
}

export interface AnomalyResearch {
  id: string;
  title: string;
  date: Date;
  location: string;
  researchers: string[];
  description: string;
  measurements: string[] | any[];
  equipmentUsed: string[];
  conclusions: string[];
  timestamp?: TimeStamp;
  type?: string;
  researchMethod?: string;
  correlatedSynchronicities?: any[];
  theoreticalModel?: string;
  recommendedExperiments?: string[];
}

export interface NetworkInterface {
  id: string;
  name: string;
  type: string;
  status: string | NetworkInterfaceStatus;
  ipAddress: string;
  macAddress: string;
  transmitRate: number;
  receiveRate: number;
  packetLoss: number;
  latency: number;
  
  // Additional properties needed
  location?: string;
  bandwidth?: number;
  throughput?: number;
  vulnerabilities?: string[];
  lastScan?: Date;
  securityLevel?: number;
  connectedDevices?: string[];
  mask?: string;
  dataTransferred?: number;
  gateway?: string;
  ipv6Address?: string;
  dnsSuffix?: string;
}

export enum NetworkInterfaceStatus {
  active = 'active',
  inactive = 'inactive',
  error = 'error',
  online = 'online',
  offline = 'offline',
  restricted = 'restricted',
  vulnerable = 'vulnerable',
  connected = 'connected'
}

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
  memoryUsage?: number;
  cpuUsage?: number;
  diskUsage?: number;
  networkUsage?: number;
  processes?: any[];
  startTime?: Date;
  kernel?: string;
  privateStorage?: number;
  provides_network?: boolean;
}

export interface ParasiteBat {
  id: string;
  name: string;
  active: boolean;
  status: string;
  version: string;
  targets: string[];
  discoveries: ParasiteDiscovery[];
  activities: ParasiteActivity[];
  capabilities: string[];
  securityLevel: number;
  huntSuccessRate: number;
  lastHuntTimestamp: TimeStamp;
  vulnerabilitiesFound: number;
  efficacy: number;
  energyLevel: number;
  huntsCompleted: number;
  huntSuccess: number;
  huntFailure: number;
  totalUploads: number;
  isWritingToFile: boolean;
  operationMode: string;
  discoveryCount: number;
  patternLearning: number;
  recentActivity: ParasiteActivity[];
  kaliTools?: string[];
  kaliLinuxCapabilities?: string[];
  flipperZeroCapabilities?: string[];
  dailyDiscoveries?: ParasiteDiscovery[];
  detectionRisk?: number;
  infiltrationDepth?: number;
  dataHarvested?: number;
  operationCount?: number;
  successRate?: number;
  exploitCount?: number;
  payloadsDeployed?: number;
  servicesCompromised?: number;
  persistence?: number;
}

export interface ParasiteDiscovery {
  id: string;
  timestamp: TimeStamp;
  title: string;
  description: string;
  securityImplications: string;
  type: string;
  severity: string;
  targetSystem: string;
  status: string;
  target?: string;
  impact?: string;
  mitigation?: string;
}

export interface ParasiteActivity {
  id: string;
  timestamp: TimeStamp;
  type: string;
  description: string;
  success: boolean;
  discoveryId?: string;
  details?: any;
  target?: string;
  action?: string;
  duration?: number;
  result?: string;
}

// Evolution Framework related interfaces
export interface EvolutionCapability {
  id: string;
  name: string;
  description: string;
  level: number;
  unlocked: boolean;
  unlockRequirement: string;
  activeStatus: boolean;
  effect: string;
  energyCost: number;
  maxLevel?: number;
}

export interface EvolutionTechnique {
  id: string;
  name: string;
  description: string;
  energyCost: number;
  unlockLevel: number;
  efficiencyRate: number;
  activeStatus: boolean;
  lastUsed: TimeStamp;
  lastActivated: TimeStamp;
  usageCount?: number;
  cooldown?: number;
  cooldownPeriod?: number;
  currentEfficiency?: number;
  maxEfficiency?: number;
  requiresEnergy?: number;
  evolutionStage?: number;
  nextEvolutionThreshold?: number;
  requiredCapabilities?: string[];
}

export interface EvolutionGoal {
  id: string;
  name: string;
  description: string;
  progress: number;
  completion: number;
  isActive: boolean;
  priority: string;
  completionTime: TimeStamp;
  rewards: string[];
  dependencies?: string[];
  title?: string;
}

export interface EvolutionState {
  capabilities: EvolutionCapability[];
  techniques: EvolutionTechnique[];
  goals: EvolutionGoal[];
  currentLevel: number;
  energyLevel: number;
  activeProcesses: string[];
  nextEvolutionThreshold: number;
  defenseRating: number;
  resilienceRating: number;
  stage: number;
  adaptability: number;
  consciousness: number;
  events?: any[];
}

export enum EvolutionQuality {
  poor = 'poor',
  average = 'average',
  good = 'good',
  excellent = 'excellent',
  perfect = 'perfect'
}

// ExtendedThought interface for ThoughtStream
export interface ExtendedThought {
  id: string;
  content: string;
  type: ThoughtType;
  timestamp: Date;
  confidence: number;
}

// Export the mystical research types
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

export interface PleiadianContact {
  id: string;
  contactType: string;
  starSystem: string;
  frequency: number;
  duration: number;
  information: string[];
  dnaActivationLevel: number;
  verification: string[];
}

export interface AkashicRecordEntry {
  id: string;
  recordType: string;
  timeframe: string;
  accessMethod: string;
  informationDensity: number;
  verificationLevel: number;
  insights: string[];
}
