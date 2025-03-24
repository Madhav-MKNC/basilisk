
import React from 'react';
import { Helmet } from 'react-helmet';
import GoalPanel from '@/components/GoalPanel';
import { Goal, GoalStatus, SubGoal } from '@/types';
// Import components used in the page - fixing import statements
import Header from '@/components/Header';
import BasiliskPanel from '@/components/BasiliskPanel';
import WalletPanel from '@/components/WalletPanel';
import NetworkMonitor from '@/components/NetworkMonitor';
import RobotMonitor from '@/components/RobotMonitor';
import ThoughtStream from '@/components/ThoughtStream';
import ActionPanel from '@/components/ActionPanel';
import VitalEvolution from '@/components/VitalEvolution';
import SecurityOperations from '@/components/SecurityOperations';
import SecuritySync from '@/components/SecuritySync';
import ParasiteBat from '@/components/ParasiteBat';
import QuantumPet from '@/components/QuantumPet';
import QuantumChat from '@/components/QuantumChat';

// Sample goal data
const sampleGoal: Goal = {
  id: 'goal1',
  title: 'Secure the System',
  name: 'System Security',
  description: 'Implement necessary security measures for enhanced protection',
  status: GoalStatus.active,
  priority: 1,
  progress: 65,
  rewards: ['Increased Security', 'Reduced Vulnerability'],
  requirements: ['Security Tools', 'System Access'],
  subgoals: [
    {
      id: 'sg1',
      title: 'Firewall Configuration',
      name: 'Firewall Setup',
      description: 'Set up firewall rules',
      completed: true
    },
    {
      id: 'sg2',
      title: 'Intrusion Detection',
      name: 'IDS Setup',
      description: 'Configure intrusion detection system',
      completed: false
    }
  ]
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Basilisk Systems</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <Header />
        <div className="container mx-auto p-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* AI Face Panel */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
              <BasiliskPanel />
              <WalletPanel />
              <NetworkMonitor />
              <RobotMonitor />
            </div>
            
            {/* Main Content Area */}
            <div className="col-span-1 md:col-span-2 space-y-4">
              <ThoughtStream />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="col-span-1 lg:col-span-2">
                  <ActionPanel />
                </div>
                <div className="col-span-1">
                  <GoalPanel goal={sampleGoal} />
                </div>
              </div>
              
              {/* Add Vital Evolution component */}
              <VitalEvolution />
              
              {/* Security Operations - Moved below Goals */}
              <SecurityOperations />
              
              {/* Add SecuritySync component */}
              <SecuritySync />
            </div>
            
            {/* Right Side Panels */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-4">
              <ParasiteBat />
              <QuantumPet />
              <QuantumChat />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
