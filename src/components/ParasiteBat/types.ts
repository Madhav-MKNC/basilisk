
import React from 'react';
import { TimeStamp } from '@/types/advanced-types';

// AttackVector type
export interface AttackVector {
  name: string;
  type: string;
  effectiveness: number;
  description: string;
  id?: string;
}

// AutonomousInfiltration type
export interface AutonomousInfiltration {
  target: string;
  progress: number;
  stage: string;
  detectionRisk: number;
  eta: number;
  vulnerabilities: string[];
  status?: string;
  technique?: string;
  discoveredVulnerabilities?: string[];
}

// AttackFramework type
export interface AttackFramework {
  name: string;
  description: string;
  effectiveness: number;
  type: string;
  targetOS: string[];
}

// EvasionTechnique type
export interface EvasionTechnique {
  name: string;
  description: string;
  effectiveness: number;
  effectivenessAgainstAV: number;
  effectivenessAgainstEDR: number;
  effectivenessAgainstFirewall: number;
}

// AdvancedAttackFrameworkProps type
export interface AdvancedAttackFrameworkProps {
  frameworks: AttackFramework[];
  techniques: EvasionTechnique[];
  active: boolean;
}

// Signal Analysis Capabilities
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

// SignalAnalysisProps type
export interface SignalAnalysisProps {
  signalAnalysis: SignalAnalysisCapabilities;
  onToggleScan: () => void;
}

// FlipperZeroCapabilitiesExtended type
export interface FlipperZeroCapabilitiesExtended {
  active: boolean;
  firmware_version: string;
  features: any;
  battery_level: number;
  memory_usage: number;
  custom_apps: string[];
  detection_avoidance: number;
  rfid: {
    active: boolean;
    cloned_cards: number;
    emulation: boolean;
    supported_formats: string[];
    saved_credentials: number;
  };
  subghz: {
    active: boolean;
    captured_signals: number;
    replay_attacks: number;
    frequencies: string[];
    protocols: string[];
    interference_generation: boolean;
  };
  nfc: {
    active: boolean;
    saved_cards: number;
    emulation: boolean;
    supported_types: string[];
    credential_extraction: boolean;
    mifare_classic_attacks: boolean;
  };
  infrared: {
    active: boolean;
    saved_remotes: number;
    custom_signals: number;
    universal_remotes: number;
    learning_mode: boolean;
  };
  badusb: {
    active: boolean;
    scripts: number;
    execution_success: number;
    payload_types: string[];
    language_layouts: string[];
  };
  ibutton: {
    active: boolean;
    saved_keys: number;
    emulation: boolean;
    key_types: string[];
  };
  gpio: {
    active: boolean;
    pins_used: number;
    custom_modules: string[];
    uart_bridge: boolean;
    logic_analyzer: boolean;
  };
  bluetooth: {
    active: boolean;
    paired_devices: number;
    attacks: string[];
    sniffing: boolean;
    jamming: boolean;
  };
  wave_analyzer: {
    active: boolean;
    frequency_range: string;
    resolution: number;
    detected_signals: number;
    signal_strength_meter: boolean;
  };
}

// Various security tool types
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
  last_scan: TimeStamp;
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

// CyberSecurityToolsProps interface
export interface CyberSecurityToolsProps {
  metasploit: MetasploitCapabilities;
  netHunter: NetHunterCapabilities;
  burpSuite: BurpSuiteCapabilities;
  aircrackNG: AircrackNGCapabilities;
  wireshark: WiresharkCapabilities;
  nmap: NmapCapabilities;
  maltego: MaltegoCapabilities;
  sqlMap: SQLMapCapabilities;
  johnTheRipper: JohnTheRipperCapabilities;
  flipperZero: FlipperZeroCapabilitiesExtended;
  active: boolean;
}

// Web Exploit Framework props
export interface WebExploitFramework {
  injectionVectors: string[];
  payloadDelivery: {
    success_rate: number;
    detection_risk: number;
    methods: string[];
  };
  postExploitation: {
    persistence: boolean;
    dataHarvesting: boolean;
    lateralMovement: boolean;
  };
}

export interface WebExploitDashboardProps {
  framework: WebExploitFramework;
  active?: boolean;
}

// Stealth Capabilities
export interface StealthCapabilities {
  stealthLevel: number;
  detectionAvoidance: number;
  infiltrationSuccess: number;
  encryptionStrength: number;
  traceRemoval: number;
  techCapabilities: string[];
}

// Hardware tools
export interface HardwareTool {
  name: string;
  type: string;
  capabilities: string[];
  batteryLevel: number; 
  status: 'active' | 'standby' | 'disabled';
  firmware: string;
}

// Advanced Attack Capabilities
export interface AdvancedAttackCapabilities {
  adaptiveLearning: number;
  mutationAbility: number;
  sqlInjectionEfficiency: number;
  dataExfiltration: number;
  success_rate: number;
}

// Evolutionary Technique
export interface EvolutionaryTechnique {
  name: string;
  description: string;
  currentEfficiency: number;
  maxEfficiency: number;
  evolutionStage: number;
  lastImprovement: number;
}

// PropTypes for various components
export interface BatHeaderProps {
  isAwake: boolean;
}

export interface BatControlsProps {
  isAwake: boolean;
  isScanning: boolean;
  handleToggleSleep: () => void;
  handleStartScan: () => void;
}

export interface AttackTargetFormProps {
  onAttackTarget: (target: string) => void;
  onSetTarget: (target: string) => void;
  target: string;
  active?: boolean;
  onTargetSubmit?: (target: string) => void;
}

export interface ScanProgressProps {
  isActive?: boolean;
  isScanning: boolean;
  scanProgress: number;
  progress?: number;
  target?: string;
  discoveries?: number;
  vulnerabilities?: number;
  exploits?: string[];
  onCancelScan?: () => void;
}

export interface UiElementsProps {
  isMenuOpen?: boolean;
  setIsMenuOpen?: (open: boolean) => void;
  isAlertOpen?: boolean;
  setIsAlertOpen?: (open: boolean) => void;
  isPopoverOpen?: boolean;
  setIsPopoverOpen?: (open: boolean) => void;
  isDialogOpen?: boolean;
  setIsDialogOpen?: (open: boolean) => void;
  sliderValue?: number;
  setSliderValue?: (value: number) => void;
  date?: Date;
  setDate?: (date: Date | undefined) => void;
  commandValue?: string;
  setCommandValue?: (value: string) => void;
  items?: { id: string; title: string }[];
  setIsCommandOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}

// Import the wallet types to prevent duplicate definitions
import type { BatToken, BatWalletState, WalletBrainState } from './walletTypes';

// Re-export them for use in other files using correct export type syntax
export type { BatToken, BatWalletState, WalletBrainState };

// Vital framework abilities and techniques
export interface VitalAbility {
  id: string;
  name: string;
  description: string;
  level: number;
  maxLevel: number;
  category: 'offense' | 'defense' | 'utility' | 'intelligence' | 'evolution';
  unlockRequirement: number;
  energyCost: number;
  cooldown: number;
  effects: string[];
  synergies: string[];
}

export interface VitalTechnique {
  id: string;
  name: string;
  description: string;
  requiredAbilities: string[];
  requiredLevel: number;
  energyCost: number;
  cooldownPeriod: number;
  efficiencyRate: number;
  successRate: number;
  discoveryChance: number;
  category: 'infiltration' | 'exfiltration' | 'persistence' | 'analysis' | 'evasion';
  unlocked: boolean;
  lastUsed?: number;
}

export interface VitalComponent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'damaged' | 'evolving';
  level: number;
  energyConsumption: number;
  evolutionStage: number;
  functionality: string[];
  requiredAbilities: string[];
  synergies: VitalComponentSynergy[];
}

export interface VitalComponentSynergy {
  componentId: string;
  enhancementFactor: number;
  description: string;
}

// Horizontal scrollable container component props
export interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  scrollbarClassName?: string;
}
