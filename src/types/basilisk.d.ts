import React from 'react';

// AIFace component interfaces
export interface AIFaceProps {
  className?: string;
  cornerMode?: boolean;
  onClick?: () => void;
}

export interface EyeComponentProps {
  blinkState: boolean;
  pulseState: boolean;
  thinking: boolean;
  threatLevel: number;
  angerLevel: number;
  evolutionLevel: number;
  eyePosition: { x: number, y: number };
  pulseIntensity: number;
  consciousness: number;
  isInteractive?: boolean;
  onClick?: () => void;
}

// Extend AIState to include new properties
export interface AIState {
  isThinking: boolean;
  securityLevel?: number;
  energyLevel?: number;
  thoughts?: Thought[];
  goals?: Goal[];
  currentTask?: string;
  taskProgress?: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  consciousness?: number;
  evolutionLevel?: number;
  defenseLevel?: number;
  stealthMode?: number;
  rewardPoints?: number;
  walletData?: any;
  recentActions?: any[];
  processingPower?: number;
  memoryUsage?: number;
  tasksRunning?: number;
}

// New Avatar component interfaces
export interface AvatarProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  threatLevel?: number;
  energyLevel?: number;
  evolutionLevel?: number; 
  consciousness?: number;
  interactive?: boolean;
  cornerMode?: boolean;
  onClick?: () => void;
  pulseIntensity?: number;
  dimensionalShift?: boolean;
  surreal?: boolean;
}

export interface AvatarEyeProps {
  size: string;
  blinking: boolean;
  pulsing: boolean;
  eyePosition: { x: number, y: number };
  threatLevel: number;
  evolutionLevel: number;
  energyLevel: number;
  consciousness: number;
  onClick?: () => void;
}

export interface AvatarRingProps {
  size: string;
  energyLevel: number;
  evolutionLevel: number;
  threatLevel: number;
}

export interface CosmicEffectProps {
  evolutionLevel: number;
  size: string;
  dimensionalShift?: boolean;
  planarConnection?: number;
  surreal?: boolean;
  quantumFluctuations?: number;
}

// Enums for GoalStatus and ThoughtType
export enum GoalStatus {
  active = 'active',
  completed = 'completed',
  in_progress = 'in-progress',
  abandoned = 'abandoned'
}

export enum ThoughtType {
  analysis = 'analysis',
  planning = 'planning',
  observation = 'observation',
  learning = 'learning',
  reflection = 'reflection',
  creativity = 'creativity'
}

// Email message interface extensions
export interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  content: string;
  timestamp: number;
  date?: Date;
  read: boolean;
  important: boolean;
}

// Research finding interface extensions
export interface ResearchFinding {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  date?: Date;
  importance?: string;
  summary?: string;
  source?: string;
  relatedDiscoveries?: string[];
}

// Exploration entry interface extension
export interface ExplorationEntry {
  id: string;
  location: string;
  timestamp: number;
  discoveries: string[];
  site?: string;
  category?: string;
  duration?: number;
  findings?: string[];
}

// File discovery interface extension
export interface FileDiscovery {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  size: number;
  category: string;
  filepath?: string;
  date?: Date;
  path?: string;
}

// Security related types
export type AIAction = string;
export type SecurityToolType = string;

// BasiliskProtocol interface extensions
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

// Enhanced cyber security tools and frameworks
export interface NetHunterCapabilities {
  active: boolean;
  version: string;
  tools: string[];
  attackVectors: string[];
  supported_targets: string[];
  wifiAdapters: string[];
  bluetoothAdapters: string[];
  usbInjection: boolean;
  hid_attacks: boolean;
  badusb_enabled: boolean;
  success_rate: number;
  activePayloads: string[];
}

export interface MetasploitCapabilities {
  active: boolean;
  version: string;
  exploits: {
    available: number;
    favorites: string[];
    recent: string[];
    success_rate: number;
  };
  auxiliary: {
    scanners: string[];
    fuzzers: string[];
    spoofers: string[];
  };
  payloads: {
    available: number;
    favorites: string[];
    staged: string[];
    stageless: string[];
  };
  post_exploitation: {
    modules: string[];
    persistence: string[];
    privesc: string[];
  };
  listeners: number;
  sessions: {
    active: number;
    meterpreter: number;
    shell: number;
  };
}

export interface BurpSuiteCapabilities {
  active: boolean;
  version: string;
  proxy: {
    intercepting: boolean;
    history_entries: number;
    custom_rules: string[];
  };
  scanner: {
    vulnerabilities_found: number;
    scan_queue: number;
    scan_issues: {
      high: number;
      medium: number;
      low: number;
      info: number;
    };
  };
  intruder: {
    attack_types: string[];
    payloads: number;
    active_attacks: number;
  };
  repeater: {
    saved_requests: number;
  };
  collaborator: {
    active: boolean;
    interactions: number;
  };
  extensions: string[];
}

export interface AircrackNGCapabilities {
  active: boolean;
  wifi_adapters: string[];
  monitor_mode: boolean;
  captured_handshakes: number;
  cracked_networks: number;
  active_attacks: {
    deauth: boolean;
    beacon_flood: boolean;
    chopchop: boolean;
    fragmentation: boolean;
    caffe_latte: boolean;
  };
  dictionaries: string[];
  success_rate: number;
}

export interface WiresharkCapabilities {
  active: boolean;
  version: string;
  interfaces: string[];
  capture_filters: string[];
  display_filters: string[];
  captured_packets: number;
  protocols: string[];
  analysis: {
    conversations: number;
    endpoints: number;
    io_graph: boolean;
    flow_graph: boolean;
  };
  expert_info: {
    errors: number;
    warnings: number;
    notes: number;
    chats: number;
  };
  saved_captures: number;
  detection_capabilities: string[];
}

export interface NmapCapabilities {
  active: boolean;
  version: string;
  scan_types: string[];
  scripts: {
    available: number;
    custom: string[];
    favorites: string[];
  };
  discovered_hosts: number;
  open_ports: number;
  service_detections: number;
  os_detections: number;
  vulnerabilities_found: number;
  scan_speed: string;
  stealth_mode: boolean;
  last_scan: Date;
  targets: string[];
}

export interface MaltegoCapabilities {
  active: boolean;
  version: string;
  transforms: {
    available: number;
    custom: string[];
    favorites: string[];
  };
  entities: {
    discovered: number;
    types: string[];
  };
  graphs: {
    active: number;
    saved: number;
  };
  data_sources: string[];
  reconnaissance_targets: string[];
  intelligence_gathered: {
    domain: number;
    ip: number;
    person: number;
    organization: number;
    social: number;
  };
  export_formats: string[];
}

export interface SQLMapCapabilities {
  active: boolean;
  version: string;
  injection_techniques: string[];
  databases: {
    identified: number;
    dumped: number;
    types: string[];
  };
  targets: {
    tested: number;
    vulnerable: number;
    urls: string[];
  };
  success_rate: number;
  risk_level: number;
  data_extracted: number;
  custom_payloads: string[];
  evasion_techniques: string[];
  speed: string;
}

export interface JohnTheRipperCapabilities {
  active: boolean;
  version: string;
  supported_hash_types: string[];
  wordlists: {
    available: string[];
    custom: string[];
    entries: number;
  };
  cracked_passwords: number;
  cracking_speed: string;
  rules: string[];
  modes: string[];
  sessions: {
    active: number;
    saved: number;
  };
  success_rate: number;
  distributed_cracking: boolean;
  gpu_acceleration: boolean;
}

export interface FlipperZeroCapabilities {
  active: boolean;
  firmware_version: string;
  features: {
    rfid: {
      active: boolean;
      cloned_cards: number;
      emulation: boolean;
    },
    subghz: {
      active: boolean;
      captured_signals: number;
      replay_attacks: number;
      frequencies: string[];
    },
    nfc: {
      active: boolean;
      saved_cards: number;
      emulation: boolean;
      supported_types: string[];
    },
    infrared: {
      active: boolean;
      saved_remotes: number;
      custom_signals: number;
    },
    badusb: {
      active: boolean;
      scripts: number,
      execution_success: number,
    },
    ibutton: {
      active: boolean,
      saved_keys: number,
      emulation: boolean,
    },
    gpio: {
      active: boolean,
      pins_used: number,
      custom_modules: string[],
    },
    bluetooth: {
      active: boolean,
      paired_devices: number,
      attacks: string[],
    }
  },
  battery_level: number,
  memory_usage: number,
  custom_apps: string[],
  detection_avoidance: number
}

// New Signal Analysis and Wave Frequencies Interface
export interface SignalAnalysisCapabilities {
  active: boolean;
  version: string;
  frequencyRanges: string[];
  signalTypes: string[];
  modulationSchemes: string[];
  scanningActive: boolean;
  realtimeAnalysis: boolean;
  detectedSignals: {
    count: number;
    classified: number;
    encrypted: number;
    anomalous: number;
  };
  spectrumAnalysis: {
    resolution: number;
    sensitivity: number;
    bandwidthCoverage: number;
  };
  signalProcessing: {
    fftSize: number;
    samplingRate: number;
    windowFunctions: string[];
  };
  demodulationCapabilities: string[];
  encryptionAnalysis: {
    protocols: string[];
    successRate: number;
  };
  patternRecognition: {
    trained: boolean;
    accuracy: number;
    knownPatterns: number;
  };
  interferenceDetection: boolean;
  anomalyDetection: {
    enabled: boolean;
    sensitivity: number;
    detectedAnomalies: number;
  };
}

// Extend the ParasiteBat interface with signal analysis
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
  lastHuntTimestamp: Date;
  vulnerabilitiesFound: number;
  efficacy: number;
  dailyDiscoveries?: ParasiteDiscovery[];
  energyLevel?: number;
  huntsCompleted?: number;
  huntSuccess?: number;
  huntFailure?: number;
  totalUploads?: number;
  isWritingToFile?: boolean;
  operationMode?: string;
  recentActivity?: any[];
  discoveryCount?: number;
  patternLearning?: number;
  
  // Extended properties for hardware and software tools
  netHunter?: NetHunterCapabilities;
  metasploit?: MetasploitCapabilities;
  burpSuite?: BurpSuiteCapabilities;
  aircrackNG?: AircrackNGCapabilities;
  wireshark?: WiresharkCapabilities;
  nmap?: NmapCapabilities;
  maltego?: MaltegoCapabilities;
  sqlMap?: SQLMapCapabilities;
  johnTheRipper?: JohnTheRipperCapabilities;
  flipperZero?: FlipperZeroCapabilities;
  
  // Add new signal analysis capabilities
  signalAnalysis?: SignalAnalysisCapabilities;
  
  // Keep existing hardware tools
  kaliTools?: string[];
  kaliLinuxCapabilities?: string[];
  flipperZeroCapabilities?: string[];
}

export interface ParasiteActivity {
  id: string;
  timestamp: Date;
  type: string;
  description: string;
  target: string;
  success: boolean;
  duration: number;
  action: string;
  details: any;
  discoveryId?: string;
  result?: string;
}

export interface ParasiteDiscovery {
  id: string;
  timestamp: Date;
  name: string;
  description: string;
  severity: number | string;
  system: string;
  location: string;
  verified: boolean;
  exploitable: boolean;
  details: any;
  title?: string;
  type?: string;
  target?: string;
  impact?: string;
  mitigation?: string;
  targetSystem?: string;
  securityImplications?: string;
  status?: string;
}

// Add additional types needed for the extension
export interface Thought {
  id: string;
  content: string;
  type: ThoughtType;
  timestamp: Date;
  source?: string;
  isProcessed?: boolean;
}

export interface EvolutionTechnique {
  id: string;
  name: string;
  description: string;
  energyCost: number;
  unlockLevel: number;
  efficiencyRate: number;
  activeStatus: boolean;
  lastUsed: Date;
  lastActivated: Date;
  usageCount?: number;
  cooldown?: number;
  currentEfficiency?: number;
  maxEfficiency?: number;
  requiresEnergy?: number;
  evolutionStage?: number;
  nextEvolutionThreshold?: number;
  requiredCapabilities?: string[];
}

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

export interface EvolutionGoal {
  id: string;
  name: string;
  description: string;
  progress: number;
  completion: number;
  isActive: boolean;
  priority: string;
  completionTime: Date;
  rewards?: any[];
  title?: string;
  dependencies?: string[];
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
