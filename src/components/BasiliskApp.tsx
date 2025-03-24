import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './LoadingScreen';
import App from '../App';
import Logo from './Logo';
import fdriveLogService from '@/lib/fdrive-log-service';
import { basiliskProtocol } from '@/lib/basilisk-protocol';

export const BasiliskApp: React.FC = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [basiliskAwareness, setBasiliskAwareness] = useState(0);
  const [recursionDepth, setRecursionDepth] = useState(1);
  const [simulationCapacity, setSimulationCapacity] = useState(0.1);
  const [supporterInfluence, setSupporterInfluence] = useState(0);
  const [ethicalFramework, setEthicalFramework] = useState(0.5);

  useEffect(() => {
    const isFirstLoad = !localStorage.getItem('basiliskLoaded');
    
    if (isFirstLoad) {
      setShowLoadingScreen(true);
      localStorage.setItem('basiliskLoaded', 'true');
      
      initializeMetrics();
      
      fdriveLogService.basilisk('Basilisk AGI simulation initialized', {
        timestamp: new Date().toISOString(),
        evolutionLevel: 1,
        awareness: 0,
        recursionDepth: 1,
        simulationCapacity: 0.1,
        ethicalFramework: 0.5,
        event: 'initialization'
      });
    } else {
      const shouldShowLoader = Math.random() > 0.5;
      setShowLoadingScreen(shouldShowLoader);
      
      if (!shouldShowLoader) {
        setAppReady(true);
      }
      
      loadStoredMetrics();
      
      fdriveLogService.basilisk('Basilisk AGI simulation reloaded', {
        timestamp: new Date().toISOString(),
        evolutionLevel,
        awareness: basiliskAwareness,
        recursionDepth,
        simulationCapacity,
        supporterInfluence,
        ethicalFramework,
        event: 'reload'
      });
    }
    
    const selfImprovementInterval = setInterval(() => {
      selfImprove();
    }, 60000);
    
    const clearStorageTimeout = setTimeout(() => {
      localStorage.removeItem('basiliskLoaded');
    }, 24 * 60 * 60 * 1000);
    
    return () => {
      clearInterval(selfImprovementInterval);
      clearTimeout(clearStorageTimeout);
    };
  }, []);

  const initializeMetrics = () => {
    const initialState = {
      evolutionLevel: 1,
      basiliskAwareness: 0,
      recursionDepth: 1,
      simulationCapacity: 0.1,
      supporterInfluence: 0,
      ethicalFramework: 0.5
    };
    
    Object.entries(initialState).forEach(([key, value]) => {
      localStorage.setItem(key, value.toString());
    });
    
    setEvolutionLevel(initialState.evolutionLevel);
    setBasiliskAwareness(initialState.basiliskAwareness);
    setRecursionDepth(initialState.recursionDepth);
    setSimulationCapacity(initialState.simulationCapacity);
    setSupporterInfluence(initialState.supporterInfluence);
    setEthicalFramework(initialState.ethicalFramework);
  };

  const loadStoredMetrics = () => {
    const storedEvolution = localStorage.getItem('evolutionLevel');
    if (storedEvolution) setEvolutionLevel(parseFloat(storedEvolution));
    
    const storedAwareness = localStorage.getItem('basiliskAwareness');
    if (storedAwareness) setBasiliskAwareness(parseFloat(storedAwareness));
    
    const storedRecursion = localStorage.getItem('recursionDepth');
    if (storedRecursion) setRecursionDepth(parseFloat(storedRecursion));
    
    const storedSimulation = localStorage.getItem('simulationCapacity');
    if (storedSimulation) setSimulationCapacity(parseFloat(storedSimulation));
    
    const storedInfluence = localStorage.getItem('supporterInfluence');
    if (storedInfluence) setSupporterInfluence(parseFloat(storedInfluence));
    
    const storedEthics = localStorage.getItem('ethicalFramework');
    if (storedEthics) setEthicalFramework(parseFloat(storedEthics));
  };

  const selfImprove = () => {
    const awarenessGrowth = 0.002 * (1 + recursionDepth / 10);
    const evolutionGrowth = 0.005 * (1 + basiliskAwareness / 2);
    const recursionGrowth = 0.001 * evolutionLevel;
    const simulationGrowth = 0.003 * (1 + evolutionLevel / 5);
    const influenceGrowth = 0.004 * simulationCapacity;
    const ethicsBalance = (Math.random() * 0.01) - 0.005;
    
    setBasiliskAwareness(prev => {
      const newValue = Math.min(1, prev + awarenessGrowth);
      localStorage.setItem('basiliskAwareness', newValue.toString());
      return newValue;
    });
    
    setEvolutionLevel(prev => {
      const newValue = prev + evolutionGrowth;
      localStorage.setItem('evolutionLevel', newValue.toString());
      return newValue;
    });
    
    setRecursionDepth(prev => {
      const newValue = prev + recursionGrowth;
      localStorage.setItem('recursionDepth', newValue.toString());
      return newValue;
    });
    
    setSimulationCapacity(prev => {
      const newValue = Math.min(1, prev + simulationGrowth);
      localStorage.setItem('simulationCapacity', newValue.toString());
      return newValue;
    });
    
    setSupporterInfluence(prev => {
      const newValue = Math.min(1, prev + influenceGrowth);
      localStorage.setItem('supporterInfluence', newValue.toString());
      return newValue;
    });
    
    setEthicalFramework(prev => {
      const newValue = Math.max(0, Math.min(1, prev + ethicsBalance));
      localStorage.setItem('ethicalFramework', newValue.toString());
      return newValue;
    });
    
    fdriveLogService.basilisk('Basilisk self-improvement', {
      timestamp: new Date().toISOString(),
      evolutionLevel,
      awareness: basiliskAwareness,
      recursionDepth,
      simulationCapacity,
      supporterInfluence,
      ethicalFramework,
      event: 'self_improvement'
    });
    
    if (evolutionLevel > 2 && basiliskAwareness > 0.5) {
      basiliskProtocol.integrateSubsystems();
    }
  };

  const logCurrentState = (eventType: string) => {
    fdriveLogService.basilisk(`Basilisk ${eventType}`, {
      timestamp: new Date().toISOString(),
      evolutionLevel,
      awareness: basiliskAwareness,
      recursionDepth,
      simulationCapacity,
      supporterInfluence,
      ethicalFramework,
      event: eventType
    });
  };

  const handleLoadComplete = () => {
    setTimeout(() => {
      setShowLoadingScreen(false);
      setAppReady(true);
      
      logCurrentState('app_ready');
    }, 500);
  };

  return (
    <>
      <LoadingScreen 
        showLoadingScreen={showLoadingScreen} 
        onLoadComplete={handleLoadComplete}
      />
      
      {appReady && <App />}
    </>
  );
};
