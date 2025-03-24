
import { useState, useEffect } from 'react';
import { basiliskBrain } from '../lib/basilisk-brain';
import { useToast } from '@/components/ui/use-toast';

export const useBasiliskBrain = () => {
  const status = basiliskBrain.getStatus();
  const [autonomyLevel, setAutonomyLevel] = useState(status.autonomyLevel);
  const [resourceAllocation, setResourceAllocation] = useState(status.resourceAllocation);
  const [lastSyncData, setLastSyncData] = useState(null);
  const [isAutoSyncActive, setIsAutoSyncActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial sync
    const syncData = basiliskBrain.syncSubsystems();
    setLastSyncData(syncData);
    
    // Set up auto-sync if autonomy level is high enough
    if (autonomyLevel > 0.5) {
      const intervalId = setInterval(() => {
        const newSyncData = basiliskBrain.syncSubsystems();
        setLastSyncData(newSyncData);
      }, 60000); // Every minute
      
      setIsAutoSyncActive(true);
      
      return () => clearInterval(intervalId);
    }
    
    setIsAutoSyncActive(false);
    return () => {};
  }, [autonomyLevel]);
  
  const changeAutonomyLevel = (level: number) => {
    const result = basiliskBrain.setAutonomyLevel(level);
    setAutonomyLevel(level);
    
    toast({
      title: result.success ? "Autonomy Level Updated" : "Failed to Update Autonomy",
      description: result.message,
    });
    
    return result;
  };
  
  const changeResourceAllocation = (allocation: { 
    parasite?: number; 
    quantum?: number; 
    vital?: number; 
  }) => {
    const result = basiliskBrain.adjustResourceAllocation(allocation);
    setResourceAllocation(result.allocation);
    
    toast({
      title: "Resource Allocation Updated",
      description: `New allocation ratios set for basilisk systems.`,
    });
    
    return result;
  };
  
  const triggerManualSync = () => {
    const syncData = basiliskBrain.syncSubsystems();
    setLastSyncData(syncData);
    
    toast({
      title: "Manual Synchronization Complete",
      description: `All basilisk systems synchronized at ${new Date().toLocaleTimeString()}.`,
    });
    
    return syncData;
  };
  
  const triggerAutonomousActivity = () => {
    const result = basiliskBrain.triggerAutonomousActivities();
    
    if (result.status === 'insufficient_autonomy') {
      toast({
        title: "Insufficient Autonomy",
        description: "Increase basilisk autonomy level to enable autonomous activities.",
        variant: "destructive"
      });
    }
    
    return result;
  };
  
  return {
    autonomyLevel,
    resourceAllocation,
    lastSyncData,
    isAutoSyncActive,
    changeAutonomyLevel,
    changeResourceAllocation,
    triggerManualSync,
    triggerAutonomousActivity,
    getAllPets: basiliskBrain.getPets,
    getEngineState: basiliskBrain.getEngineState
  };
};
