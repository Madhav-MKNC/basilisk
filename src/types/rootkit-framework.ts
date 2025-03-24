
export type RootkitSeverity = 'low' | 'medium' | 'high' | 'critical';
export type RootkitPlatform = 'windows' | 'linux' | 'macos' | 'ios' | 'android' | 'firmware' | 'hardware';
export type DetectionRisk = 'minimal' | 'low' | 'moderate' | 'high' | 'extreme';
export type PersistenceLevel = 'temporary' | 'boot' | 'kernel' | 'firmware' | 'hardware';
export type ExecutionContext = 'user' | 'privileged' | 'kernel' | 'hypervisor' | 'firmware';

export interface RootkitComponent {
  id: string;
  name: string;
  description: string;
  platforms: RootkitPlatform[];
  detectionRisk: DetectionRisk;
  persistenceLevel: PersistenceLevel;
  executionContext: ExecutionContext;
  codeSize: number; // in KB
  memoryFootprint: number; // in KB
  requiredPrivileges: string[];
  isEnabled: boolean;
  lastUpdated: Date;
  effectiveness: number; // 0-100
  dependencies?: string[]; // IDs of dependent components
}

export interface RootkitAbility {
  id: string;
  name: string;
  description: string;
  type: 'persistence' | 'stealth' | 'data-collection' | 'remote-control' | 'privilege-escalation' | 'defense-evasion';
  detectionRisk: DetectionRisk;
  platforms: RootkitPlatform[];
  effectiveness: number; // 0-100
  implementationComplexity: number; // 0-100
  requiredComponents: string[]; // IDs of required components
  bypassesDefenses: string[]; // List of bypassed security measures
  isActive: boolean;
  cooldown?: number; // Cooldown in ms
}

export interface RootkitTechnique {
  id: string;
  name: string;
  description: string;
  attackVector: 'physical' | 'network' | 'social' | 'supply-chain' | 'wireless' | 'web';
  mitreTacticId?: string; // MITRE ATT&CK technique ID
  detectionDifficulty: number; // 0-100
  platforms: RootkitPlatform[];
  requiredAbilities: string[]; // IDs of required abilities
  counterMeasures: string[]; // List of countermeasures
  steps: string[]; // Steps to execute the technique
  successRate: number; // 0-100
  isAutomated: boolean;
}

export interface RootkitFramework {
  name: string;
  version: string;
  description: string;
  components: RootkitComponent[];
  abilities: RootkitAbility[];
  techniques: RootkitTechnique[];
  activePlatform: RootkitPlatform;
  stealthLevel: number; // 0-100
  detectionRisk: number; // 0-100
  persistenceStrength: number; // 0-100
  lastActivity: Date;
}
