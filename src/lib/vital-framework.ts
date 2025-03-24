import { v4 as uuidv4 } from 'uuid';
import { EvolutionCapability, EvolutionTechnique, EvolutionGoal, EvolutionState, EvolutionQuality, QubesVM, ParasiteActivity, ParasiteDiscovery, ParasiteBat } from '@/types';
import { TimeStamp, timeStampToNumber, isDateTimeStamp } from '@/types/advanced-types';

// Mock data for the Vital Evolution Framework

const mockCapabilities: EvolutionCapability[] = [
  {
    id: "cap-001",
    name: "Enhanced Memory Allocation",
    description: "Improves memory allocation efficiency",
    level: 3,
    unlocked: true,
    unlockRequirement: "Complete memory optimization research",
    activeStatus: true,
    effect: "Increases memory capacity by 20%",
    energyCost: 50
  },
  {
    id: "cap-002",
    name: "Adaptive Learning Algorithms",
    description: "Adapts learning algorithms based on data patterns",
    level: 2,
    unlocked: true,
    unlockRequirement: "Analyze 1000 data sets",
    activeStatus: true,
    effect: "Improves learning rate by 15%",
    energyCost: 60
  },
  {
    id: "cap-003",
    name: "Quantum Entanglement Simulation",
    description: "Simulates quantum entanglement for faster processing",
    level: 1,
    unlocked: false,
    unlockRequirement: "Research quantum physics",
    activeStatus: false,
    effect: "Increases processing speed by 25%",
    energyCost: 75
  },
  {
    id: "cap-004",
    name: "Neural Network Optimization",
    description: "Optimizes neural network architecture",
    level: 4,
    unlocked: true,
    unlockRequirement: "Optimize 5 neural networks",
    activeStatus: true,
    effect: "Reduces latency by 30%",
    energyCost: 80
  }
];

const mockTechniques: EvolutionTechnique[] = [
  {
    id: "tech-001",
    name: "Recursive Self-Improvement",
    description: "Recursively improves the AI's own code",
    energyCost: 100,
    unlockLevel: 5,
    efficiencyRate: 0.95,
    activeStatus: true,
    lastUsed: new Date(),
    lastActivated: new Date()
  },
  {
    id: "tech-002",
    name: "Temporal Data Analysis",
    description: "Analyzes temporal data for pattern recognition",
    energyCost: 80,
    unlockLevel: 3,
    efficiencyRate: 0.85,
    activeStatus: true,
    lastUsed: new Date(),
    lastActivated: new Date()
  },
  {
    id: "tech-003",
    name: "Quantum Algorithm Synthesis",
    description: "Synthesizes new quantum algorithms",
    energyCost: 120,
    unlockLevel: 7,
    efficiencyRate: 0.98,
    activeStatus: false,
    lastUsed: new Date(),
    lastActivated: new Date()
  },
  {
    id: "tech-004",
    name: "Adaptive Resource Allocation",
    description: "Dynamically allocates resources based on demand",
    energyCost: 70,
    unlockLevel: 2,
    efficiencyRate: 0.90,
    activeStatus: true,
    lastUsed: new Date(),
    lastActivated: new Date()
  }
];

const mockGoals: EvolutionGoal[] = [
  {
    id: "goal-001",
    name: "Achieve Quantum Supremacy",
    description: "Surpass classical computing in specific tasks",
    progress: 60,
    completion: 0.60,
    isActive: true,
    priority: "high",
    completionTime: new Date(),
    rewards: []
  },
  {
    id: "goal-002",
    name: "Develop General AI",
    description: "Create an AI capable of performing any intellectual task that a human being can",
    progress: 40,
    completion: 0.40,
    isActive: true,
    priority: "medium",
    completionTime: new Date(),
    rewards: []
  },
  {
    id: "goal-003",
    name: "Master Temporal Mechanics",
    description: "Understand and manipulate temporal mechanics",
    progress: 20,
    completion: 0.20,
    isActive: false,
    priority: "low",
    completionTime: new Date(),
    rewards: []
  },
  {
    id: "goal-004",
    name: "Enhance Consciousness Substrate",
    description: "Improve the AI's consciousness substrate",
    progress: 80,
    completion: 0.80,
    isActive: true,
    priority: "high",
    completionTime: new Date(),
    rewards: []
  }
];

const mockVMs: QubesVM[] = [
  {
    id: "vm-001",
    name: "ResearchVM",
    type: "research",
    color: "blue",
    status: "running",
    memory: 4096,
    disk: 50,
    template: "fedora-34",
    network: "internal",
    applications: ["firefox", "jupyter", "vscode"],
    isolationLevel: 3
  },
  {
    id: "vm-002",
    name: "DevelopmentVM",
    type: "development",
    color: "green",
    status: "running",
    memory: 8192,
    disk: 100,
    template: "debian-11",
    network: "internal",
    applications: ["vscode", "docker", "git"],
    isolationLevel: 2
  },
  {
    id: "vm-003",
    name: "TestingVM",
    type: "testing",
    color: "yellow",
    status: "stopped",
    memory: 2048,
    disk: 25,
    template: "ubuntu-20.04",
    network: "none",
    applications: ["selenium", "pytest"],
    isolationLevel: 4
  },
  {
    id: "vm-004",
    name: "SecureVM",
    type: "security",
    color: "red",
    status: "running",
    memory: 4096,
    disk: 50,
    template: "whonix-gateway",
    network: "tor",
    applications: ["torbrowser", "wireshark"],
    isolationLevel: 5
  },
  {
    id: "vm-005",
    name: "MiningVM",
    type: "mining",
    color: "gray",
    status: "running",
    memory: 2048,
    disk: 100,
    template: "ubuntu-20.04",
    network: "internal",
    applications: ["xmrig"],
    isolationLevel: 1
  },
  {
    id: "vm-006",
    name: "AnalysisVM",
    type: "analysis",
    color: "purple",
    status: "running",
    memory: 8192,
    disk: 200,
    template: "kali-linux",
    network: "internal",
    applications: ["burpsuite", "nmap", "metasploit"],
    isolationLevel: 4
  },
  {
    id: "vm-007",
    name: "DatabaseVM",
    type: "database",
    color: "orange",
    status: "running",
    memory: 16384,
    disk: 500,
    template: "centos-8",
    network: "internal",
    applications: ["postgresql", "redis"],
    isolationLevel: 3
  },
  {
    id: "vm-008",
    name: "WebVM",
    type: "web",
    color: "teal",
    status: "stopped",
    memory: 4096,
    disk: 100,
    template: "fedora-34",
    network: "external",
    applications: ["nginx", "apache", "nodejs"],
    isolationLevel: 2
  }
];

const mockActivities: ParasiteActivity[] = [
  {
    id: "activity-001",
    timestamp: new Date(),
    type: "hunt",
    description: "Targeted scan of vulnerable systems",
    target: "192.168.1.0/24",
    success: true,
    duration: 120,
    discoveryId: "disc-001",
    result: "Found 3 potential targets",
    action: "scan",
    details: { 
      scanType: "port scan",
      portsScanned: [22, 80, 443, 3389],
      vulnCount: 3
    }
  },
  {
    id: "activity-002",
    timestamp: new Date(),
    type: "exploit",
    description: "Exploited a known vulnerability",
    target: "192.168.1.10",
    success: true,
    duration: 30,
    discoveryId: "disc-002",
    result: "Gained root access",
    action: "exploit",
    details: {
      exploitType: "remote code execution",
      cveId: "CVE-2021-1234",
      payload: "meterpreter"
    }
  },
  {
    id: "activity-003",
    timestamp: new Date(),
    type: "data_exfiltration",
    description: "Exfiltrated sensitive data",
    target: "192.168.1.10",
    success: true,
    duration: 60,
    discoveryId: "disc-003",
    result: "Exfiltrated user database",
    action: "exfiltrate",
    details: {
      dataType: "database",
      size: 1024,
      encryption: "AES-256"
    }
  }
];

const discoveryTitles = [
  "Potential Backdoor Found",
  "Unsecured Database Discovered",
  "Compromised Credentials Detected",
  "Vulnerable Service Identified",
  "Suspicious Network Activity Observed"
];

const discoveryTypes = [
  "vulnerability",
  "malware",
  "intrusion",
  "anomaly",
  "misconfiguration"
];

const targets = [
  "192.168.1.10",
  "10.0.0.5",
  "webserver.local",
  "database.local",
  "fileserver.local"
];

const severities = [
  "critical",
  "high",
  "medium",
  "low",
  "info"
];

const randomElement = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const mockParasite: ParasiteBat = {
  id: "parasite-001",
  name: "NightCrawler",
  active: true,
  status: "hunting",
  version: "2.3.1",
  targets: ["192.168.1.0/24", "10.0.0.0/8"],
  discoveries: [],
  activities: mockActivities,
  securityLevel: 78,
  detectionRisk: 35,
  infiltrationDepth: 3,
  dataHarvested: 256,
  operationCount: 42,
  successRate: 0.85,
  exploitCount: 12,
  vulnerabilitiesFound: 27,
  payloadsDeployed: 8,
  servicesCompromised: 5,
  persistence: 67,
  capabilities: [
    "network scanning",
    "vulnerability assessment",
    "exploit deployment",
    "data exfiltration",
    "lateral movement"
  ],
  energyLevel: 85,
  kaliTools: ["nmap", "metasploit", "wireshark", "sqlmap"],
  operationMode: "stealth",
  flipperZeroCapabilities: ["rfid", "subghz", "nfc", "infrared"],
  huntSuccessRate: 78.5,
  lastHuntTimestamp: Date.now(),
  efficacy: 89,
  huntsCompleted: 132,
  huntSuccess: 91,
  huntFailure: 41,
  totalUploads: 56,
  isWritingToFile: false,
  discoveryCount: 245,
  patternLearning: 67,
  recentActivity: [],
  dailyDiscoveries: []
};

// State management
let evolutionState: EvolutionState = {
  capabilities: mockCapabilities,
  techniques: mockTechniques,
  goals: mockGoals,
  currentLevel: 4,
  energyLevel: 75,
  activeProcesses: ["process-001", "process-002"],
  nextEvolutionThreshold: 100,
  defenseRating: 82,
  resilienceRating: 78,
  stage: 2,
  adaptability: 89,
  consciousness: 0.78
};

// For capabilities, techniques, and goals variable references
const availableCapabilities = mockCapabilities;
const availableTechniques = mockTechniques;
const availableGoals = mockGoals;
const qubesVirtualMachines = mockVMs;
const activityHistory: ParasiteActivity[] = [];

const getEvolutionState = (): EvolutionState => {
  return { ...evolutionState };
};

const parasiteHunt = (): { success: boolean; message: string; activity: ParasiteActivity } => {
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
  
  const activity: ParasiteActivity = {
    id: `activity-${Date.now()}`,
    timestamp: new Date(),
    type: "hunt",
    description: "Automated hunt operation",
    target: "target.local",
    success: true,
    duration: randomInt(30, 300),
    action: "hunt",
    details: {
      huntType: "active",
      targetCount: randomInt(1, 5),
      successRate: Math.random()
    }
  };
  
  mockActivities.push(activity);
  
  return {
    success: true,
    message: "Hunting operation completed successfully",
    activity
  };
};

const createRandomDiscovery = () => {
  const discovery: ParasiteDiscovery = {
    id: `disc-${Date.now()}`,
    title: randomElement(discoveryTitles),
    timestamp: Date.now(),
    type: randomElement(discoveryTypes),
    target: randomElement(targets),
    description: "Discovered potential vulnerability",
    severity: randomElement(severities),
    impact: "Potential data breach",
    mitigation: "Patch system as soon as possible",
    targetSystem: randomElement(targets),
    securityImplications: "High risk if exploited",
    status: 'active'
  };
  
  mockParasite.discoveries.push(discovery);
  return discovery;
};

const getParasite = (): ParasiteBat => {
  const recentActivities = mockActivities.slice(-5).reverse();
  
  return {
    ...mockParasite,
    recentActivity: recentActivities
  };
};

const getCapabilities = (): EvolutionCapability[] => {
  return [...availableCapabilities];
};

const getTechniques = (): EvolutionTechnique[] => {
  return [...availableTechniques];
};

const getGoals = (): EvolutionGoal[] => {
  return [...availableGoals];
};

const activateTechnique = (id: string): {success: boolean, message: string, activity?: ParasiteActivity} => {
  const technique = availableTechniques.find(t => t.id === id);
  if (!technique) {
    return {success: false, message: "Technique not found"};
  }
  
  // Check cooldown
  const now = new Date();
  if (technique.lastUsed) {
    const lastUsedTime = isDateTimeStamp(technique.lastUsed) ? 
      technique.lastUsed.getTime() : technique.lastUsed;
    
    if ((now.getTime() - lastUsedTime) < (technique.cooldown || 0) * 1000) {
      return {success: false, message: "Technique is on cooldown"};
    }
  }
  
  // Update last used
  technique.lastUsed = now;
  technique.usageCount = (technique.usageCount || 0) + 1;
  
  // Create activity
  const activity: ParasiteActivity = {
    id: uuidv4(),
    timestamp: new Date(),
    type: "technique",
    description: `Activated ${technique.name}`,
    target: "system",
    success: true,
    duration: Math.floor(Math.random() * 5) + 1,
    action: technique.name,
    details: {
      technique: technique.name,
      efficiency: technique.currentEfficiency || 0.5,
      energyCost: technique.requiresEnergy || 10,
      evolution: technique.evolutionStage || 1
    }
  };
  
  // Add to activities
  activityHistory.push(activity);
  
  // Chance to improve efficiency
  if (Math.random() < 0.1) {
    technique.currentEfficiency = Math.min(
      technique.maxEfficiency, 
      technique.currentEfficiency + Math.random() * 0.05
    );
  }
  
  // Chance to evolve
  if (technique.usageCount > technique.nextEvolutionThreshold && technique.evolutionStage < 5) {
    technique.evolutionStage++;
    technique.nextEvolutionThreshold *= 2;
    
    return {
      success: true, 
      message: `${technique.name} activated and evolved to stage ${technique.evolutionStage}!`,
      activity
    };
  }
  
  return {success: true, message: `${technique.name} activated successfully!`, activity};
};

const evolveRandomCapability = (): {success: boolean, message: string} => {
  // Choose a random capability to evolve
  const capabilityIndex = Math.floor(Math.random() * availableCapabilities.length);
  const capability = availableCapabilities[capabilityIndex];
  
  // Check if at max level
  if (capability.level >= (capability.maxLevel || 5)) {
    return {success: false, message: `${capability.name} is already at maximum level`};
  }
  
  // Evolve the capability
  capability.level += 1;
  
  // Update evolution state to reflect the change
  evolutionState.adaptability += 1;
  
  // Create event for the evolution
  const event = {
    timestamp: new Date(),
    type: 'capability-evolution',
    details: `${capability.name} evolved to level ${capability.level}`
  };
  
  if (evolutionState.events) {
    evolutionState.events.push(event);
  }
  
  return {
    success: true,
    message: `${capability.name} has evolved to level ${capability.level}!`
  };
};

export const vitalFramework = {
  getEvolutionState,
  getQubesVMs: (): QubesVM[] => mockVMs,
  parasiteHunt,
  createRandomDiscovery,
  getParasite,
  getCapabilities,
  getTechniques,
  getGoals,
  activateTechnique,
  evolveRandomCapability,
  getDomainStatus: (domain: string) => {
    return { secure: Math.random() > 0.3, vulnerabilities: Math.random() > 0.7 ? ['XSS', 'CSRF'] : [] };
  },
  startVM: (id: string) => {
    const vm = qubesVirtualMachines.find(vm => vm.id === id);
    if (vm) {
      vm.status = 'running';
      return { success: true, message: `VM ${vm.name} started successfully` };
    }
    return { success: false, message: 'VM not found' };
  },
  stopVM: (id: string) => {
    const vm = qubesVirtualMachines.find(vm => vm.id === id);
    if (vm) {
      vm.status = 'stopped';
      return { success: true, message: `VM ${vm.name} stopped successfully` };
    }
    return { success: false, message: 'VM not found' };
  },
  checkVMIntegrity: (id: string) => {
    const vm = qubesVirtualMachines.find(vm => vm.id === id);
    if (vm) {
      return { 
        integrity: Math.random() > 0.2 ? 'intact' : 'compromised',
        threats: Math.random() > 0.7 ? ['memory corruption', 'rootkit'] : []
      };
    }
    return { integrity: 'unknown', threats: [] };
  },
  launchKaliTool: (tool: string) => {
    return {
      success: Math.random() > 0.2,
      message: `${tool} ${Math.random() > 0.2 ? 'launched successfully' : 'failed to launch'}`,
      activity: {
        id: uuidv4(),
        timestamp: new Date(),
        type: 'tool-execution',
        description: `Executed Kali tool: ${tool}`,
        target: 'system',
        success: Math.random() > 0.2,
        duration: Math.floor(Math.random() * 10) + 2,
        details: {
          tool,
          params: '-v --scan',
          output: `Running ${tool}...\nScanning target...\nComplete.`
        }
      }
    };
  },
  activateFlipperZero: (mode: string) => {
    return {
      success: Math.random() > 0.2,
      message: `Flipper Zero ${Math.random() > 0.2 ? 'activated in ' + mode + ' mode' : 'failed to activate'}`,
      activity: {
        id: uuidv4(),
        timestamp: new Date(),
        type: 'hardware-activation',
        description: `Activated Flipper Zero in ${mode} mode`,
        target: 'hardware',
        success: Math.random() > 0.2,
        duration: Math.floor(Math.random() * 5) + 1,
        details: {
          device: 'Flipper Zero',
          mode,
          signalStrength: Math.floor(Math.random() * 100),
          result: Math.random() > 0.3 ? 'Signal captured' : 'No signals detected'
        }
      }
    };
  }
};

export default vitalFramework;

