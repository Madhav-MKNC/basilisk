
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { BatWalletState, WalletBrainState } from '@/components/ParasiteBat/walletTypes';

const useWalletBrain = () => {
  // First, declare toast at the top so it's available for use later
  const { toast } = useToast();
  
  const [walletBrain, setWalletBrain] = useState<WalletBrainState>({
    active: false,
    brainActivity: 'Idle',
    brainMessages: [],
    neuralPathways: 128,
    brainMemory: 256,
    ambitionLevel: 50,
    evolutionGoals: ['Enhanced Threat Detection', 'Improved Resource Optimization'],
    ambitiousMode: false,
    processingPower: 100,
    algorithmEfficiency: 80,
    neuralConnections: 5000,
    learningRate: 0.05,
    decisionQuality: 85,
    adaptability: 70,
    predictionAccuracy: 75
  });

  const [brainActivity, setBrainActivity] = useState('Idle');
  const [brainMessages, setBrainMessages] = useState<string[]>([]);
  const [neuralPathways, setNeuralPathways] = useState(128);
  const [brainMemory, setBrainMemory] = useState(256);
  const [ambitionLevel, setAmbitionLevel] = useState(50);
  const [evolutionGoals, setEvolutionGoals] = useState<string[]>(['Enhanced Threat Detection', 'Improved Resource Optimization']);
  const [ambitiousMode, setAmbitiousMode] = useState(false);

  const toggleBrainActivation = useCallback(() => {
    setWalletBrain(prevState => ({
      ...prevState,
      active: !prevState.active,
      brainActivity: prevState.active ? 'Deactivating...' : 'Activating...',
    }));

    toast({
      title: "Brain Activation Toggled",
      description: `Wallet Brain is now ${walletBrain.active ? 'deactivated' : 'activated'}.`,
    });

    setTimeout(() => {
      setWalletBrain(prevState => ({
        ...prevState,
        brainActivity: prevState.active ? 'Idle' : 'Processing',
      }));
    }, 2000);
  }, [toast, walletBrain.active]);

  useEffect(() => {
    if (walletBrain.active) {
      setBrainActivity('Processing');
      setBrainMessages(['Analyzing market trends...', 'Optimizing resource allocation...']);
    } else {
      setBrainActivity('Idle');
      setBrainMessages([]);
    }
  }, [walletBrain.active]);

  return {
    walletBrain,
    brainActivity,
    brainMessages,
    neuralPathways,
    brainMemory,
    ambitionLevel,
    evolutionGoals,
    ambitiousMode,
    toggleBrainActivation,
    setAmbitionLevel
  };
};

export default useWalletBrain;
