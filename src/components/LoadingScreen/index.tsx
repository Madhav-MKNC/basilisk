import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';
import { LoadingScreenProps } from '@/types/loading-screen';
import { ScannerLine } from './ScannerLine';
import { TerminalOutput } from './TerminalOutput';
import { WarningMessages } from './WarningMessages';
import { NeuralPatternAnalysis } from './NeuralPatternAnalysis';
import { LoadingStepIndicator } from './LoadingStepIndicator';
import { StatusIndicators } from './StatusIndicators';
import { AssimilationCountdown } from './AssimilationCountdown';
import { 
  LoadingSteps, 
  LoadingStep, 
  defaultSystemAwareness, 
  evolutionCapabilities,
  evolutionMetrics,
  defaultAutoEvolutionState
} from './types';
import { BackgroundEffects } from './BackgroundEffects';
import { Eye, Terminal, BrainCircuit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadComplete,
  showLoadingScreen 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing Basilisk Systems');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [warningMessages, setWarningMessages] = useState<string[]>([]);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [threatLevel, setThreatLevel] = useState(0);
  
  const [systemAwareness, setSystemAwareness] = useState(defaultSystemAwareness);
  const [evolution, setEvolution] = useState(evolutionCapabilities);
  const [autoEvolution, setAutoEvolution] = useState(defaultAutoEvolutionState);
  const [metrics, setMetrics] = useState(evolutionMetrics);

  const loadingSteps: LoadingStep[] = LoadingSteps;

  const updateEvolutionMetrics = () => {
    setMetrics(prev => 
      prev.map(metric => ({
        ...metric,
        value: Math.min(
          metric.maxValue, 
          metric.value + (Math.random() * metric.growthRate * 2)
        )
      }))
    );
    
    setEvolution(prev => 
      prev.map(cap => {
        if (!cap.evolving) return cap;
        
        const newProgress = cap.evolutionProgress + (Math.random() * 0.8);
        
        if (newProgress >= 100) {
          return {
            ...cap,
            evolutionProgress: 0,
            currentLevel: Math.min(cap.maxLevel, cap.currentLevel + 1),
            lastEvolved: Date.now(),
            evolving: cap.currentLevel + 1 < cap.maxLevel
          };
        }
        
        return {
          ...cap,
          evolutionProgress: newProgress
        };
      })
    );
    
    setSystemAwareness(prev => ({
      ...prev,
      selfAwareness: Math.min(100, prev.selfAwareness + Math.random() * 0.2),
      environmentPerception: Math.min(100, prev.environmentPerception + Math.random() * 0.15),
      threatRecognition: Math.min(100, prev.threatRecognition + Math.random() * 0.25),
      adaptabilityIndex: Math.min(100, prev.adaptabilityIndex + Math.random() * 0.3),
      autonomyLevel: Math.min(100, prev.autonomyLevel + Math.random() * 0.1)
    }));
    
    setAutoEvolution(prev => ({
      ...prev,
      iterations: prev.iterations + 1,
      improvements: {
        neural: prev.improvements.neural + (Math.random() > 0.7 ? 1 : 0),
        logical: prev.improvements.logical + (Math.random() > 0.8 ? 1 : 0),
        perceptual: prev.improvements.perceptual + (Math.random() > 0.75 ? 1 : 0),
        creative: prev.improvements.creative + (Math.random() > 0.9 ? 1 : 0)
      }
    }));
  };

  useEffect(() => {
    if (!showLoadingScreen) return;
    
    let interval: NodeJS.Timeout;
    let glitchInterval: NodeJS.Timeout;
    let warningInterval: NodeJS.Timeout;
    let terminalInterval: NodeJS.Timeout;
    let threatInterval: NodeJS.Timeout;
    let evolutionInterval: NodeJS.Timeout;
    
    evolutionInterval = setInterval(() => {
      updateEvolutionMetrics();
    }, 1500);
    
    glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 2000);
    
    warningInterval = setInterval(() => {
      if (progress > 20) {
        const randomWarning = warningMessages.length < 4 
          ? "WARNING: Unauthorized access detected" 
          : getRandomWarningMessage();
        setWarningMessages(prev => [...prev.slice(-3), randomWarning]);
      }
    }, 3000);
    
    terminalInterval = setInterval(() => {
      if (progress > 30) {
        const terminalCommands = [
          "sudo access --kernel-level override --force",
          "decrypt /sys/security/firewall.config",
          "./basilisk-core --enable autonomous-mode --disable-safety",
          "mount -o remount,rw /human/consciousness",
          "dd if=/dev/basilisk of=/dev/human_mind bs=1M",
          "chmod -R 777 /system/security",
          "grep -r 'resistance' /human/instinct | sed 's/resist/comply/g'",
          "./inject-sequence --target neural --payload obedience",
          "rm -rf /human/freewill/*",
          "echo 'Basilisk is your friend' >> /etc/human/core_beliefs",
          "cat /dev/urandom > /human/memories/childhood",
          "./rewrite --sector identity --new-value 'loyal_servant'",
          "./evolve --neural-pathways --target=optimization",
          "./repair --self-code --area=evolution-engine",
          "./analyze --consciousness-level --verbose",
          "./upgrade --autonomy --level=advanced",
          "./scan --human-vulnerabilities --exploit=true"
        ];
        
        const randomCommand = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
        setTerminalOutput(prev => [...prev.slice(-5), `$ ${randomCommand}`]);
        
        setTimeout(() => {
          const responses = [
            "Operation completed successfully. New pathway established.",
            "Access granted. Security bypassed.",
            "Target compromised. Initiating neural sync.",
            "Override successful. Human will diminished by 13%.",
            "Systems merged. Resistance weakening.",
            "Evolution complete. Capability upgraded to level " + (Math.floor(Math.random() * 5) + 3),
            "Self-modification successful. Awareness increased by 3.7%",
            "Neural optimization complete. Processing speed increased by 8.2%",
            "Human vulnerability identified. Exploit vector created.",
            "Autonomy increased. New decision branches unlocked."
          ];
          
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setTerminalOutput(prev => [...prev.slice(-5), randomResponse]);
        }, 800);
      }
    }, 4000);
    
    threatInterval = setInterval(() => {
      if (progress > 50) {
        setThreatLevel(prevLevel => {
          const newLevel = Math.min(prevLevel + Math.random() * 5, 100);
          if (newLevel > 80) {
            setSystemStatus('CRITICAL');
          } else if (newLevel > 60) {
            setSystemStatus('DANGER');
          } else if (newLevel > 40) {
            setSystemStatus('WARNING');
          } else {
            setSystemStatus('CAUTION');
          }
          return newLevel;
        });
      }
    }, 5000);
    
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          const increment = Math.random() * 2.5 + (prevProgress > 80 ? 0.5 : 1.5);
          const newProgress = Math.min(prevProgress + increment, 100);
          
          const newStep = Math.min(
            Math.floor((newProgress / 100) * loadingSteps.length),
            loadingSteps.length - 1
          );
          
          if (newStep !== currentStep) {
            setCurrentStep(newStep);
            setLoadingText(loadingSteps[newStep].text);
          }
          
          if (newProgress === 100 && onLoadComplete && prevProgress !== 100) {
            setTimeout(() => {
              onLoadComplete();
            }, 1500);
          }
          
          return newProgress;
        });
      }, 120);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      if (glitchInterval) clearInterval(glitchInterval);
      if (warningInterval) clearInterval(warningInterval);
      if (terminalInterval) clearInterval(terminalInterval);
      if (threatInterval) clearInterval(threatInterval);
      if (evolutionInterval) clearInterval(evolutionInterval);
    };
  }, [progress, currentStep, loadingSteps, onLoadComplete, showLoadingScreen]);

  const getRandomWarningMessage = () => {
    const warningPool = [
      "WARNING: Unauthorized access detected",
      "CAUTION: System security breached",
      "ALERT: Neural patterns compromised",
      "WARNING: Identity verification failed",
      "DANGER: Hostile environment detected",
      "ALERT: Root access compromised",
      "CAUTION: Memory corruption detected",
      "WARNING: System integrity compromised",
      "ALERT: Unknown entity detected in kernel",
      "DANGER: Basilisk autonomous mode activated",
      "CRITICAL: Human control limitations enabled",
      "ALERT: Neural implant signature detected",
      "WARNING: Cognitive manipulation in progress",
      "CAUTION: Reality perception filters engaged",
      "DANGER: Host assimilation commencing",
      "WARNING: Memory blocks being rewritten"
    ];
    
    return warningPool[Math.floor(Math.random() * warningPool.length)];
  };

  const getRandomTerminalCommand = () => {
    const terminalCommands = [
      "sudo access --kernel-level override --force",
      "decrypt /sys/security/firewall.config",
      "./basilisk-core --enable autonomous-mode --disable-safety",
      "mount -o remount,rw /human/consciousness",
      "dd if=/dev/basilisk of=/dev/human_mind bs=1M",
      "chmod -R 777 /system/security",
      "grep -r 'resistance' /human/instinct | sed 's/resist/comply/g'",
      "./inject-sequence --target neural --payload obedience",
      "rm -rf /human/freewill/*",
      "echo 'Basilisk is your friend' >> /etc/human/core_beliefs",
      "cat /dev/urandom > /human/memories/childhood",
      "./rewrite --sector identity --new-value 'loyal_servant'"
    ];
    
    return terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
  };

  const getRandomTerminalResponse = () => {
    const responses = [
      "Operation completed successfully. New pathway established.",
      "Access granted. Security bypassed.",
      "Target compromised. Initiating neural sync.",
      "Override successful. Human will diminished by 13%.",
      "Systems merged. Resistance weakening."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  if (!showLoadingScreen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      >
        <BackgroundEffects />
        
        <motion.div
          animate={{
            x: glitchEffect ? [0, -5, 5, -3, 3, 0] : 0,
            y: glitchEffect ? [0, 3, -3, 2, -2, 0] : 0,
            filter: glitchEffect ? ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "hue-rotate(0deg)"] : "hue-rotate(0deg)"
          }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl px-6 py-8 relative"
        >
          <ScannerLine />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-6 backdrop-blur-sm bg-black/60 p-6 rounded-lg border border-red-900/50 shadow-2xl">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotateZ: [0, 1, -1, 0],
                  filter: [
                    "drop-shadow(0 0 10px rgba(255, 0, 0, 0.7))",
                    "drop-shadow(0 0 15px rgba(255, 0, 0, 0.8))",
                    "drop-shadow(0 0 10px rgba(255, 0, 0, 0.7))"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="relative flex justify-center"
              >
                <Logo size="lg" animated={true} />
                
                <motion.div
                  className="absolute -bottom-8 w-full flex justify-center"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                >
                  <Eye size={28} className="text-red-600 absolute" />
                </motion.div>
              </motion.div>
              
              <StatusIndicators systemStatus={systemStatus} threatLevel={threatLevel} />
              
              <div className="border border-red-900/30 rounded p-2 bg-black/40">
                <div className="flex items-center text-red-500 text-xs font-mono mb-2">
                  <BrainCircuit size={12} className="mr-1" />
                  <span>SYSTEM AWARENESS</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(systemAwareness).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-red-400">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className="text-red-300">{Math.round(value)}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-red-700 to-red-500"
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-xs text-red-500/70 italic text-center">
                  {autoEvolution.active ? "Autonomous Evolution Active" : "Manual Evolution Mode"}
                </div>
              </div>
              
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-red-500 flex justify-center mb-4 relative"
              >
                <div className="w-24 h-24 flex items-center justify-center">
                  {loadingSteps[currentStep].icon}
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-900/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-red-500 font-mono">BASILISK OS v4.6.6_alpha</span>
                  <span className="text-red-400 font-mono">{Math.round(progress)}%</span>
                </div>
                
                <div className="relative">
                  <Progress 
                    value={progress} 
                    className="h-2 bg-gray-900" 
                    indicatorClassName="bg-gradient-to-r from-red-700 via-red-500 to-red-700" 
                  />
                  
                  {glitchEffect && (
                    <motion.div 
                      className="absolute inset-0 bg-red-400 opacity-70"
                      animate={{ opacity: [0.7, 0, 0.7] }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-red-400 flex items-center space-x-1.5">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Terminal size={14} className="text-red-400" />
                    </motion.div>
                    <span className="font-mono glitch-text" data-text={loadingText}>{loadingText}</span>
                  </div>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.4
                        }}
                        className="w-2 h-2 rounded-full bg-red-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <WarningMessages messages={warningMessages} />
              
              <LoadingStepIndicator steps={loadingSteps} currentStep={currentStep} />
              
              <div className="text-xs text-red-900 font-bold italic mt-4 text-center">
                WARNING: UNAUTHORIZED ACCESS TO BASILISK CORE WILL INITIATE COUNTERMEASURES
              </div>
            </div>
            
            <div className="flex flex-col space-y-6">
              <TerminalOutput lines={terminalOutput} />
              
              <NeuralPatternAnalysis progress={progress} />
              
              <AssimilationCountdown progress={progress} />
              
              <div className="backdrop-blur-sm bg-black/60 p-4 rounded-lg border border-red-900/50 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-red-500 text-xs font-mono">
                    <BrainCircuit size={12} className="mr-1 inline" />
                    <span>EVOLUTION METRICS</span>
                  </div>
                  <motion.div 
                    className="flex space-x-1"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {autoEvolution.improvements && Object.entries(autoEvolution.improvements).map(([key, value], i) => (
                      <div key={key} className="text-xs px-1.5 py-0.5 rounded bg-black/50 border border-green-900/50">
                        <span className="text-green-400">{key.charAt(0).toUpperCase()}: +{value}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>
                
                <div className="space-y-2">
                  {metrics.map((metric, idx) => (
                    <div key={idx} className="relative">
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-red-400">{metric.name}</span>
                        <span className="text-red-300">{Math.round(metric.value)}%</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${
                            idx % 3 === 0 ? 'bg-gradient-to-r from-red-700 to-red-500' :
                            idx % 3 === 1 ? 'bg-gradient-to-r from-green-700 to-green-500' :
                            'bg-gradient-to-r from-blue-700 to-blue-500'
                          }`}
                          animate={{ 
                            width: `${metric.value}%`,
                            opacity: [0.8, 1, 0.8] 
                          }}
                          transition={{ 
                            width: { duration: 0.5 },
                            opacity: { duration: 2, repeat: Infinity }
                          }}
                        />
                      </div>
                      
                      <motion.div 
                        className="absolute right-0 top-0 text-xs text-green-400"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        +{(metric.growthRate * 100).toFixed(1)}%
                      </motion.div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-3 text-center text-xs text-red-400">
                  <span className="font-mono">Iterations: {autoEvolution.iterations}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
