
import { useState, useEffect } from 'react';
import { aiEngine } from '@/lib/ai-engine';
import { toast } from '@/components/ui/use-toast';

export interface SecuritySyncState {
  isSync: boolean;
  syncLevel: number;
  securityMode: 'offense' | 'defense' | 'balanced';
  batStealthLevel: number;
  robotDefenseLevel: number;
  vulnerabilities: string[];
  securityLogs: string[];
  syncedOperations: number;
}

export const useSecuritySync = () => {
  const [state, setState] = useState<SecuritySyncState>({
    isSync: false,
    syncLevel: 0,
    securityMode: 'balanced',
    batStealthLevel: 0,
    robotDefenseLevel: 0,
    vulnerabilities: [],
    securityLogs: [
      'System initialization complete',
      'Parasite Bat status: Standby',
      'Security Robot status: Active',
    ],
    syncedOperations: 0
  });

  // Update a single property in the state object
  const updateState = (key: keyof SecuritySyncState, value: any) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  // Add a log entry to the securityLogs array
  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      securityLogs: [message, ...prev.securityLogs.slice(0, 9)]
    }));
  };

  // Toggle the synchronization state
  const toggleSync = () => {
    if (!state.isSync) {
      updateState('isSync', true);
      addLog('Initiating security systems synchronization...');
      toast({
        title: "Synchronization Initiated",
        description: "Parasite Bat and Security Robot connecting...",
      });
    } else {
      updateState('isSync', false);
      updateState('syncLevel', 0);
      addLog('Synchronization disconnected');
      toast({
        title: "Systems Disconnected",
        description: "Security components operating independently",
      });
    }
  };

  // Switch between security modes
  const switchMode = (mode: 'offense' | 'defense' | 'balanced') => {
    updateState('securityMode', mode);
    
    switch (mode) {
      case 'offense':
        addLog('Switching to offensive security operations mode');
        toast({
          title: "Offensive Mode Engaged",
          description: "Parasite Bat taking primary role in security operations",
        });
        break;
      case 'defense':
        addLog('Switching to defensive security operations mode');
        toast({
          title: "Defensive Mode Engaged",
          description: "Security Robot taking primary role in security operations",
        });
        break;
      case 'balanced':
        addLog('Switching to balanced security operations mode');
        toast({
          title: "Balanced Mode Engaged",
          description: "Equal distribution of security responsibilities",
        });
        break;
    }
  };

  // Generate random vulnerabilities
  const updateVulnerabilities = () => {
    const possibleVulnerabilities = [
      'Unpatched system vulnerability detected in network layer',
      'Suspicious connection attempts from external sources',
      'Potential data exfiltration detected on port 443',
      'Cryptographic weakness in TLS implementation',
      'Outdated security certificate found',
      'API rate limiting bypass vulnerability',
      'Cross-site scripting vulnerability on web interface',
      'Memory corruption in kernel module'
    ];
    
    // Randomly select 1-3 vulnerabilities
    const count = Math.floor(Math.random() * 3) + 1;
    const newVulnerabilities = [];
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * possibleVulnerabilities.length);
      newVulnerabilities.push(possibleVulnerabilities[randomIndex]);
      possibleVulnerabilities.splice(randomIndex, 1);
      
      if (possibleVulnerabilities.length === 0) break;
    }
    
    updateState('vulnerabilities', newVulnerabilities);
    newVulnerabilities.forEach(vuln => {
      addLog(`ALERT: ${vuln}`);
    });
  };

  // Effect to update sync progress when isSync is true
  useEffect(() => {
    if (state.isSync) {
      const interval = setInterval(() => {
        setState(prev => {
          const newSyncLevel = Math.min(prev.syncLevel + 5, 100);
          
          // When we reach key thresholds, trigger events
          if (newSyncLevel === 25 && prev.syncLevel < 25) {
            addLog('Quantum handshake established between systems');
            toast({
              title: "Systems Connected",
              description: "Initial synchronization established",
            });
          }
          
          if (newSyncLevel === 50 && prev.syncLevel < 50) {
            addLog('Neural pathway integration complete');
            toast({
              title: "Neural Sync Complete",
              description: "Enhanced processing capabilities activated",
            });
            // Simulate discovering vulnerabilities
            updateVulnerabilities();
          }
          
          if (newSyncLevel === 75 && prev.syncLevel < 75) {
            addLog('Shared defense protocols activated');
            toast({
              title: "Defense Grid Online",
              description: "Coordinated protection systems engaged",
            });
          }
          
          if (newSyncLevel === 100 && prev.syncLevel < 100) {
            addLog('Full synchronization achieved - all systems operational');
            toast({
              title: "Full Synchronization",
              description: "Maximum security capabilities unlocked",
            });
            
            // Try to get AI engine data if available
            try {
              const aiState = aiEngine.getState();
              if (aiState) {
                return {
                  ...prev,
                  syncLevel: newSyncLevel,
                  robotDefenseLevel: aiState.defenseLevel,
                  batStealthLevel: aiState.stealthMode * 100,
                  syncedOperations: prev.syncedOperations + 1
                };
              }
            } catch (e) {
              console.log('AI Engine not fully available:', e);
            }
          }
          
          let newBatStealthLevel = prev.batStealthLevel;
          let newRobotDefenseLevel = prev.robotDefenseLevel;
          
          if (prev.securityMode === 'offense') {
            newBatStealthLevel = Math.min(prev.batStealthLevel + 2, 100);
          } else if (prev.securityMode === 'defense') {
            newRobotDefenseLevel = Math.min(prev.robotDefenseLevel + 2, 100);
          } else {
            newBatStealthLevel = Math.min(prev.batStealthLevel + 1, 100);
            newRobotDefenseLevel = Math.min(prev.robotDefenseLevel + 1, 100);
          }
          
          return {
            ...prev,
            syncLevel: newSyncLevel,
            batStealthLevel: newBatStealthLevel,
            robotDefenseLevel: newRobotDefenseLevel
          };
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [state.isSync, state.securityMode]);

  return {
    ...state,
    toggleSync,
    switchMode,
    addLog,
    updateVulnerabilities
  };
};
