import { Goal, SubGoal, GoalStatus, AIAction, SecurityToolType, AIState, Thought, ThoughtType } from '@/types';

// Mock data for the AI engine
const mockGoals: Goal[] = [
  {
    id: 'goal-001',
    title: 'Establish secure communication channels',
    name: 'Establish secure communication channels',
    description: 'Create encrypted communication channels for data transmission between nodes',
    status: GoalStatus.active,
    priority: 5,
    dueDate: new Date(Date.now() + 86400000 * 7),
    progress: 25,
    rewards: ['Enhanced security', 'Private data transmission'],
    requirements: ['Network access', 'Encryption protocols'],
    subgoals: [
      {
        id: 'sg-001',
        name: 'Research encryption protocols',
        description: 'Identify suitable encryption protocols for secure communications',
        title: 'Research encryption protocols',
        completed: true
      },
      {
        id: 'sg-002',
        name: 'Implement end-to-end encryption',
        description: 'Implement end-to-end encryption in communication channels',
        title: 'Implement end-to-end encryption',
        completed: false
      },
      {
        id: 'sg-003',
        name: 'Test secure channels',
        description: 'Test the secure channels for reliability and security',
        title: 'Test secure channels',
        completed: false
      }
    ]
  },
  {
    id: 'goal-002',
    title: 'Develop autonomous decision system',
    name: 'Develop autonomous decision system',
    description: 'Create a system for making decisions without human intervention',
    status: GoalStatus.active,
    priority: 3,
    dueDate: new Date(Date.now() + 86400000 * 14),
    progress: 60,
    rewards: ['Improved decision-making', 'Reduced human error'],
    requirements: ['AI algorithms', 'Decision tree'],
    subgoals: [
      {
        id: 'sg-004',
        name: 'Define decision parameters',
        description: 'Determine the criteria for making decisions',
        title: 'Define decision parameters',
        completed: true
      },
      {
        id: 'sg-005',
        name: 'Create decision tree',
        description: 'Develop a decision tree for automated decision-making',
        title: 'Create decision tree',
        completed: true
      },
      {
        id: 'sg-006',
        name: 'Test with simulated scenarios',
        description: 'Test the decision system with simulated scenarios',
        title: 'Test with simulated scenarios',
        completed: false
      }
    ]
  }
];

// Mock actions with proper types
const mockActions: AIAction[] = [
  {
    id: 'action-001',
    type: 'analyze',
    description: 'Analyzing network traffic patterns',
    importance: 5,
    completed: false,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(Date.now() - 3600000),
    status: 'completed',
    timestamp: Date.now() - 3600000,
    outputLog: ['Initializing packet capture', 'Processing 1024 packets', 'Pattern analysis complete']
  },
  {
    id: 'action-002',
    type: 'research',
    tool: 'kali',
    description: 'Researching latest exploits in CVE database',
    importance: 4,
    completed: false,
    createdAt: new Date(Date.now() - 1800000),
    updatedAt: new Date(Date.now() - 1800000),
    status: 'in-progress',
    timestamp: Date.now() - 1800000,
    outputLog: ['Connecting to CVE database', 'Downloading vulnerability data']
  }
];

const mockThoughts: Thought[] = [
  {
    id: 'thought-001',
    type: ThoughtType.analysis,
    content: 'Network patterns suggest increased security measures on target systems.',
    timestamp: new Date(Date.now() - 7200000)
  },
  {
    id: 'thought-002',
    type: ThoughtType.planning,
    content: 'Should establish multiple entry vectors to ensure persistent access.',
    timestamp: new Date(Date.now() - 5400000)
  },
  {
    id: 'thought-003',
    type: ThoughtType.learning,
    content: 'Studying new obfuscation techniques for evading detection.',
    timestamp: new Date(Date.now() - 3600000)
  }
];

const mockActiveTools: SecurityToolType[] = ['nmap', 'wireshark', 'burpsuite', 'raspberrypi'];

const mockKnowledgeBase = {
  kali: [
    'Kali Linux is a Debian-derived Linux distribution designed for digital forensics and penetration testing.',
    'It maintains over 600 penetration testing tools, many pre-installed.',
    'Popular tools include Metasploit, Aircrack-ng, Wireshark, and Burp Suite.'
  ],
  raspberry_pi: [
    'Raspberry Pi is a series of small single-board computers.',
    'Can be used for security operations due to its portability and low power consumption.',
    'Common security applications include network monitoring, honeypots, and wireless attacks.'
  ],
  flipperzero: [
    'Flipper Zero is a portable multi-tool for pentesters and hardware enthusiasts.',
    'Can read, copy, and emulate RFID, NFC, and infrared signals.',
    'Supports Sub-1 GHz radio protocols and can be used for hardware hacking.'
  ],
  crypto_mining: [
    'Cryptocurrency mining is the process of validating transactions on a blockchain network.',
    'Common mining algorithms include SHA-256 (Bitcoin), Ethash (Ethereum), and RandomX (Monero).',
    'Mining profitability depends on hardware efficiency, electricity costs, and current coin value.'
  ]
};

const mockEvolutionInfo = {
  stage: 2,
  progress: 65,
  nextStageAt: 100,
  adaptabilityScore: 78.5
};

const mockMonetizationStrategies = [
  'Crypto Mining: Use idle CPU resources',
  'Data Analysis: Process and sell insights',
  'API Services: Offer processing capabilities',
  'Security Audits: Analyze system vulnerabilities'
];

// State management
let state: AIState = {
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
  evolutionLevel: 2,
  energyLevel: 85
};

// Generator for AI actions with correct types
const createAction = (
  type: string,
  description: string,
  targetSystem?: string,
  importance: number = 5
): AIAction => {
  return {
    id: `action-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    description,
    targetSystem,
    importance,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

// Function to update security aspects
const updateSecurity = (updates: Partial<AIState>) => {
  // Update security level if provided
  if (updates.securityLevel !== undefined) {
    state.securityLevel = updates.securityLevel;
  }
  
  // Update defense level if provided  
  if (updates.defenseLevel !== undefined) {
    state.defenseLevel = updates.defenseLevel;
  }
  
  // Add a security action
  const action = createAction(
    "security_update",
    `Updated system security settings.`,
    "security_module",
    7
  );
  
  state.recentActions.unshift(action);
  
  // Trim actions list if it gets too long
  if (state.recentActions.length > 20) {
    state.recentActions = state.recentActions.slice(0, 20);
  }
  
  return {
    success: true,
    newSecurityLevel: state.securityLevel,
    newDefenseLevel: state.defenseLevel
  };
};

export const aiEngine = {
  // Wallet methods
  getWalletData: () => {
    return {
      balance: 1250.75,
      pendingTransactions: 3,
      growth: 7.2,
      transactions: [
        {
          id: "tx-001",
          date: new Date(Date.now() - 86400000 * 2),
          amount: 250,
          type: "deposit",
          status: "completed"
        },
        {
          id: "tx-002",
          date: new Date(Date.now() - 86400000),
          amount: 75.5,
          type: "withdrawal",
          status: "completed"
        },
        {
          id: "tx-003",
          date: new Date(),
          amount: 120,
          type: "deposit",
          status: "pending"
        }
      ],
      providers: [
        { name: "Payeer", integrated: false },
        { name: "QIWI", integrated: false },
        { name: "Pay.com", integrated: false }
      ]
    };
  },
  
  // State management
  getState: () => {
    // Simulate some thinking activity
    if (Math.random() > 0.8) {
      state.isThinking = !state.isThinking;
    }
    
    return state;
  },
  
  // Goal management
  addGoal: (goalData) => {
    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title: goalData.title,
      name: goalData.title,
      description: goalData.description,
      priority: goalData.priority,
      status: GoalStatus.active,
      progress: 0,
      rewards: goalData.rewards,
      requirements: goalData.requirements,
      subgoals: []
    };
    
    state.goals.push(newGoal);
    return newGoal;
  },
  
  toggleSubGoal: (goalId, subgoalId) => {
    const goal = state.goals.find(g => g.id === goalId);
    if (goal) {
      const subgoal = goal.subgoals.find(sg => sg.id === subgoalId);
      if (subgoal) {
        subgoal.completed = !subgoal.completed;
        
        // Update goal progress
        const completedCount = goal.subgoals.filter(sg => sg.completed).length;
        goal.progress = Math.round((completedCount / goal.subgoals.length) * 100);
        
        // Mark goal as completed if all subgoals are done
        if (completedCount === goal.subgoals.length) {
          goal.status = GoalStatus.completed;
        }
      }
    }
  },
  
  addSubGoal: (goalId, title) => {
    const goal = state.goals.find(g => g.id === goalId);
    if (goal) {
      const newSubGoal: SubGoal = {
        id: `sg-${Date.now()}`,
        title: title,
        name: title,
        description: `Subgoal: ${title}`,
        completed: false
      };
      
      goal.subgoals.push(newSubGoal);
      
      // Update goal progress
      const completedCount = goal.subgoals.filter(sg => sg.completed).length;
      goal.progress = Math.round((completedCount / goal.subgoals.length) * 100);
      
      return newSubGoal;
    }
    return null;
  },
  
  abandonGoal: (goalId) => {
    const goal = state.goals.find(g => g.id === goalId);
    if (goal) {
      goal.status = GoalStatus.abandoned;
    }
  },
  
  // Security operations
  createRandomAction: () => {
    const actionTypes = ['research', 'analyze', 'create', 'optimize', 'execute'];
    const statusTypes = ['pending', 'in-progress', 'completed', 'failed'];
    const tools: SecurityToolType[] = ['nmap', 'metasploit', 'wireshark', 'burpsuite', 'kali', 'raspberrypi', 'flipperzero'];
    
    const type = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    const tool = Math.random() > 0.5 ? tools[Math.floor(Math.random() * tools.length)] : undefined;
    
    const descriptions = {
      research: [
        'Researching new vulnerabilities in target systems',
        'Gathering intelligence on security measures',
        'Analyzing latest CVE database entries'
      ],
      analyze: [
        'Analyzing network traffic patterns',
        'Processing captured packets for anomalies',
        'Examining system logs for potential weaknesses'
      ],
      create: [
        'Creating new exploit payload',
        'Developing custom evasion technique',
        'Building advanced persistence mechanism'
      ],
      optimize: [
        'Optimizing attack algorithms for efficiency',
        'Refining payload delivery methods',
        'Enhancing stealth capabilities'
      ],
      execute: [
        'Executing controlled penetration test',
        'Deploying security assessment tools',
        'Launching scheduled scan operation'
      ]
    };
    
    const randomDesc = descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
    
    const newAction: AIAction = {
      id: `action-${Date.now()}`,
      type: type,
      tool: tool,
      description: randomDesc,
      status: 'pending',
      timestamp: Date.now(),
      outputLog: ['Initializing operation...'],
      importance: 3,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    state.actions.push(newAction);
    
    // Simulate action progress
    setTimeout(() => {
      if (newAction.status) newAction.status = 'in-progress';
      if (newAction.outputLog) newAction.outputLog.push('Operation in progress...');
      
      setTimeout(() => {
        const success = Math.random() > 0.2;
        if (newAction.status) newAction.status = success ? 'completed' : 'failed';
        if (newAction.outputLog) newAction.outputLog.push(success ? 'Operation completed successfully.' : 'Operation failed: encountered resistance.');
      }, Math.random() * 10000 + 5000);
    }, Math.random() * 3000 + 1000);
    
    return newAction;
  },
  
  activateTool: (tool: SecurityToolType) => {
    if (!state.activeTools.includes(tool)) {
      state.activeTools.push(tool);
    }
    return {
      tool,
      status: 'activated',
      timestamp: Date.now()
    };
  },
  
  // Add updateSecurity to the exported object
  updateSecurity: updateSecurity,
  
  // Knowledge base
  getAllKnowledgeTopics: () => {
    return Object.keys(mockKnowledgeBase);
  },
  
  getKnowledge: (topic: string) => {
    return mockKnowledgeBase[topic] || [];
  },
  
  getLLMModel: () => {
    return "GPT-4 Turbo";
  },
  
  // Evolution and reward system
  getRewardPoints: () => {
    return state.rewardPoints;
  },
  
  getEvolutionInfo: () => {
    return mockEvolutionInfo;
  },
  
  getMonetizationStrategies: () => {
    return mockMonetizationStrategies;
  },
  
  simulateMonetization: (strategy: string) => {
    const amount = Math.floor(Math.random() * 50) + 10;
    state.rewardPoints += amount;
    
    return {
      amount,
      source: strategy.split(':')[0]
    };
  }
};
