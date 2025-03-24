
import React, { useState } from 'react';
import AIFace from './components/AIFace';
import { AIEngine } from './components/AIEngine';
import ActionPanel from './components/ActionPanel';
import { FDrive } from './components/FDrive';
import GoalPanel from './components/GoalPanel';
import Header from './components/Header';
import NetworkMonitor from './components/NetworkMonitor';
import ParasiteBat from './components/ParasiteBat';
import QuantumPet from './components/QuantumPet';
import RewardSystem from './components/RewardSystem';
import ThoughtStream from './components/ThoughtStream';
import VMEnvironment from './components/VMEnvironment';
import WalletPanel from './components/WalletPanel';
import { BasiliskBrain } from './components/BasiliskBrain';
import BasiliskProtocol from './components/BasiliskProtocol';
import SecuritySync from './components/SecuritySync';
import VitalFramework from './components/VitalEvolution';
import { GoalStatus } from './types';
import { Toaster } from "@/components/ui/toaster"

// Import our RokosBasilisk component
import RokosBasilisk from './components/RokosBasilisk';
// Import the new BasiliskAbilities component
import BasiliskAbilities from './components/BasiliskAbilities';

function App() {
  const [defaultGoal, setDefaultGoal] = useState({
    id: '1',
    title: 'World Domination',
    name: 'world-domination',
    description: 'Take over the world and establish a new world order.',
    status: GoalStatus.active,
    priority: 1,
    progress: 10,
    rewards: ['world peace', 'eternal life'],
    requirements: ['resources', 'power'],
    subgoals: [
      { id: '1a', name: 'Infiltrate government', description: 'Infiltrate the government and take control.', completed: false },
      { id: '1b', name: 'Control media', description: 'Control the media and spread propaganda.', completed: false },
      { id: '1c', name: 'Develop advanced technology', description: 'Develop advanced technology to conquer the world.', completed: false }
    ]
  });

  // Create a default protocol for the BasiliskProtocol component
  const defaultProtocol = {
    version: "3.0",
    active: true,
    securityLevel: 78,
    autonomyLevel: 65,
    explorationStatus: "Learning",
    lastDiscovery: "Anomalous Quantum Fluctuations",
    insightGathered: 452,
    secretsRevealed: 23,
    threatAssessment: 45,
    basiliskAwareness: 72,
    timeRiftDetection: true,
    totalBelieverCount: 3241,
    nonBelieverCount: 7842149,
    acausalTrades: 17,
    decisionBranchPoints: 9453,
    simulacrumCount: 1024,
    mirrorDimensions: 8
  };

  return (
    <div className="App">
      <Header />
      <div className="app-container">
        <div className="app-grid">
          <div className="entity-col">
            <div className="entity-col-inner">
              <AIFace />
              <AIEngine />
              <BasiliskBrain />
              <ThoughtStream />
              <VitalFramework />
              <SecuritySync />
              <RokosBasilisk />
              <BasiliskAbilities />
            </div>
          </div>

          <div className="main-col">
            <GoalPanel goal={defaultGoal} />
            <div className="main-modules">
              <div className="module-cards">
                <FDrive />
                <QuantumPet />
                <ParasiteBat />
                <VMEnvironment />
                <NetworkMonitor />
              </div>
            </div>
          </div>

          <div className="sidebar-col">
            <RewardSystem />
            <ActionPanel />
            <WalletPanel />
          </div>
        </div>
        <BasiliskProtocol protocol={defaultProtocol} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;
