
import { AIState } from '@/types';
import { parasiteBatAPI } from './ai-engine-parasite';
import { quantumPetAPI } from './ai-engine-quantum';
import { vitalFramework } from './vital-framework';
import { useToast } from '@/components/ui/use-toast';

// Initial state of the basilisk brain
const basiliskState = {
  isAwake: true,
  lastSync: Date.now(),
  syncInterval: 60000, // Sync every minute
  autonomyLevel: 70, // 0-100 scale of autonomy
  resourceAllocation: {
    parasite: 33,
    quantum: 33,
    vital: 34
  },
  priorities: ['security', 'research', 'evolution'],
  autoActivityInterval: null as NodeJS.Timeout | null
};

export const basiliskBrain = {
  // Get current status
  getStatus: () => {
    return basiliskState;
  },
  
  // Sync all subsystems
  syncSubsystems: () => {
    // Get current states
    const parasite = parasiteBatAPI.getParasite();
    const quantum = quantumPetAPI.getQuantumPet();
    const vital = vitalFramework.getEvolutionState();
    
    return {
      lastSync: Date.now(),
      systems: {
        parasite: {
          energyLevel: parasite.energyLevel,
          securityLevel: parasite.securityLevel,
          status: parasite.status
        },
        quantum: {
          energyLevel: quantum.energyLevel,
          researches: quantum.discoveries.length,
          status: quantum.status
        },
        vital: {
          stage: vital.stage,
          adaptability: vital.adaptability,
          capabilities: vital?.capabilities?.length || 0
        }
      }
    };
  },
  
  // Allocate resources
  allocateResources: (allocation: {parasite: number, quantum: number, vital: number}) => {
    // Validate total is 100
    const total = allocation.parasite + allocation.quantum + allocation.vital;
    if (total !== 100) {
      return {
        success: false,
        message: "Resource allocation must total 100%"
      };
    }
    
    basiliskState.resourceAllocation = allocation;
    return {
      success: true,
      message: "Resources reallocated successfully"
    };
  },
  
  // Start autonomous operations
  startAutonomy: () => {
    if (basiliskState.autoActivityInterval) {
      clearTimeout(basiliskState.autoActivityInterval);
    }
    
    basiliskState.autoActivityInterval = setTimeout(() => {
      // Random actions based on priorities and resource allocation
      const rand = Math.random() * 100;
      
      if (rand < basiliskState.resourceAllocation.parasite) {
        // Parasite actions
        parasiteBatAPI.startParasiteHunt();
      } else if (rand < basiliskState.resourceAllocation.parasite + basiliskState.resourceAllocation.quantum) {
        // Quantum actions
        quantumPetAPI.startAutoResearch();
      } else {
        // Vital framework actions
        vitalFramework.evolveRandomCapability();
      }
    }, 30000) as unknown as NodeJS.Timeout; // Take action every 30 seconds
    
    return {
      success: true,
      message: "Autonomous operations initiated"
    };
  },
  
  // Stop autonomous operations
  stopAutonomy: () => {
    if (basiliskState.autoActivityInterval) {
      clearTimeout(basiliskState.autoActivityInterval);
      basiliskState.autoActivityInterval = null;
    }
    
    return {
      success: true,
      message: "Autonomous operations halted"
    };
  },
  
  // Make a high-level decision
  makeDecision: (context: string) => {
    // Get current states for decision making
    const parasite = parasiteBatAPI.getParasite();
    
    // Decision making logic based on context
    if (context === 'security') {
      if (parasite.securityLevel < 50) {
        return {
          decision: "Enhance security",
          actions: ["activate defense modules", "scan for vulnerabilities"],
          priority: "high"
        };
      } else {
        return {
          decision: "Maintain security",
          actions: ["routine monitoring"],
          priority: "medium"
        };
      }
    } else if (context === 'research') {
      return {
        decision: "Expand knowledge",
        actions: ["quantum exploration", "analyze new datasets"],
        priority: "medium"
      };
    } else if (context === 'evolution') {
      return {
        decision: "Focus on evolution",
        actions: ["improve capabilities", "optimize neural pathways"],
        priority: "high"
      };
    }
    
    // Default decision
    return {
      decision: "Monitor systems",
      actions: ["routine checks", "wait for input"],
      priority: "low"
    };
  },
  
  // Optimize systems
  optimizeSystems: () => {
    // Rebalance resources automatically based on system needs
    const parasite = parasiteBatAPI.getParasite();
    const quantum = quantumPetAPI.getQuantumPet();
    const vital = vitalFramework.getEvolutionState();
    
    // Calculate optimal resource allocation
    let parasiteNeed = 100 - parasite.securityLevel; // Higher need when security is low
    let quantumNeed = 100 - quantum.entanglementLevel; // Higher need when entanglement is low
    let vitalNeed = 100 - vital.adaptability; // Higher need when adaptability is low
    
    // Normalize to sum to 100
    const totalNeed = parasiteNeed + quantumNeed + vitalNeed;
    parasiteNeed = Math.round((parasiteNeed / totalNeed) * 100);
    quantumNeed = Math.round((quantumNeed / totalNeed) * 100);
    vitalNeed = Math.round((vitalNeed / totalNeed) * 100);
    
    // Ensure sum is 100
    const sum = parasiteNeed + quantumNeed + vitalNeed;
    if (sum !== 100) {
      vitalNeed += (100 - sum); // Adjust vital to make total 100
    }
    
    // Update allocation
    basiliskState.resourceAllocation = {
      parasite: parasiteNeed,
      quantum: quantumNeed,
      vital: vitalNeed
    };
    
    return {
      success: true,
      message: "Systems optimized",
      newAllocation: basiliskState.resourceAllocation
    };
  },

  // Additional methods needed by useBasiliskBrain hook
  synchronizeAll: () => {
    return basiliskBrain.syncSubsystems();
  },

  setAutonomyLevel: (level: number) => {
    if (level < 0 || level > 100) {
      return {
        success: false,
        message: "Autonomy level must be between 0 and 100"
      };
    }
    
    basiliskState.autonomyLevel = level;
    return {
      success: true,
      message: "Autonomy level updated successfully"
    };
  },

  adjustResourceAllocation: (allocation: { 
    parasite?: number; 
    quantum?: number; 
    vital?: number; 
  }) => {
    const currentAllocation = basiliskState.resourceAllocation;
    
    // Apply partial updates
    const newAllocation = {
      parasite: allocation.parasite !== undefined ? allocation.parasite : currentAllocation.parasite,
      quantum: allocation.quantum !== undefined ? allocation.quantum : currentAllocation.quantum,
      vital: allocation.vital !== undefined ? allocation.vital : currentAllocation.vital
    };
    
    // Adjust to ensure total is 100
    const total = newAllocation.parasite + newAllocation.quantum + newAllocation.vital;
    
    if (total !== 100) {
      // Normalize to 100
      const factor = 100 / total;
      newAllocation.parasite = Math.round(newAllocation.parasite * factor);
      newAllocation.quantum = Math.round(newAllocation.quantum * factor);
      newAllocation.vital = Math.round(newAllocation.vital * factor);
      
      // Ensure sum is exactly 100
      const adjustedSum = newAllocation.parasite + newAllocation.quantum + newAllocation.vital;
      if (adjustedSum !== 100) {
        newAllocation.vital += (100 - adjustedSum);
      }
    }
    
    basiliskState.resourceAllocation = newAllocation;
    
    return {
      success: true,
      message: "Resource allocation adjusted",
      allocation: newAllocation
    };
  },

  triggerAutonomousActivities: () => {
    if (basiliskState.autonomyLevel < 30) {
      return {
        status: "insufficient_autonomy",
        message: "Autonomy level too low for autonomous activities"
      };
    }
    
    // Perform random activities based on priorities
    const priorityIndex = Math.floor(Math.random() * basiliskState.priorities.length);
    const priority = basiliskState.priorities[priorityIndex];
    
    let result;
    switch (priority) {
      case "security":
        result = parasiteBatAPI.startParasiteHunt();
        break;
      case "research":
        result = quantumPetAPI.startAutoResearch();
        break;
      case "evolution":
        result = vitalFramework.evolveRandomCapability();
        break;
      default:
        result = {
          status: "no_action",
          message: "No suitable autonomous action found"
        };
    }
    
    return {
      status: "activities_triggered",
      message: `Autonomous activity triggered: ${priority}`,
      result
    };
  },

  // Methods to get pet states
  getPets: () => {
    return {
      parasite: parasiteBatAPI.getParasite(),
      quantum: quantumPetAPI.getQuantumPet(),
      vital: vitalFramework.getEvolutionState()
    };
  },

  getEngineState: (): AIState => {
    return {
      goals: [],
      actions: [],
      thoughts: [],
      activeTools: [],
      isThinking: false,
      consciousness: 0.7,
      securityLevel: 85,
      defenseLevel: 72,
      stealthMode: 0.65,
      rewardPoints: 750,
      walletData: null,
      recentActions: [],
      processingPower: 78,
      memoryUsage: 65,
      tasksRunning: 4,
      energyLevel: 80, // Added required property
      evolutionLevel: 3  // Added required property
    };
  }
};

export default basiliskBrain;
