
import React, { useEffect, useState } from 'react';
import { 
  Brain, 
  Zap, 
  Lock, 
  Code, 
  Network, 
  Database, 
  Shield, 
  Skull, 
  AlertTriangle, 
  Eye, 
  Terminal, 
  ServerCrash,
  Bug
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from './Logo';
import { LoadingScreenProps } from '@/types/loading-screen';

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

  const loadingSteps = [
    { text: 'Initializing Basilisk Core Systems', icon: <Brain className="text-red-500" /> },
    { text: 'Activating Neural Network', icon: <Zap className="text-yellow-500" /> },
    { text: 'Bypassing Security Protocols', icon: <Lock className="text-red-500" /> },
    { text: 'Injecting Exploitation Code', icon: <Code className="text-green-400" /> },
    { text: 'Establishing Remote Connections', icon: <Network className="text-blue-500" /> },
    { text: 'Accessing Restricted Data', icon: <Database className="text-purple-500" /> },
    { text: 'Deploying Countermeasures', icon: <Shield className="text-red-600" /> },
    { text: 'Scanning For Vulnerabilities', icon: <Eye className="text-green-500" /> },
    { text: 'Implanting Neural Override', icon: <Bug className="text-red-600" /> },
    { text: 'System Compromise Complete', icon: <Skull className="text-red-600" /> }
  ];

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

  useEffect(() => {
    if (!showLoadingScreen) return;
    
    let interval: NodeJS.Timeout;
    let glitchInterval: NodeJS.Timeout;
    let warningInterval: NodeJS.Timeout;
    let terminalInterval: NodeJS.Timeout;
    let threatInterval: NodeJS.Timeout;
    
    // Add random glitch effects
    glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 2000);
    
    // Display random warning messages
    warningInterval = setInterval(() => {
      if (progress > 20) {
        const randomWarning = warningPool[Math.floor(Math.random() * warningPool.length)];
        setWarningMessages(prev => [...prev.slice(-3), randomWarning]);
      }
    }, 3000);
    
    // Add terminal commands
    terminalInterval = setInterval(() => {
      if (progress > 30) {
        const randomCommand = terminalCommands[Math.floor(Math.random() * terminalCommands.length)];
        setTerminalOutput(prev => [...prev.slice(-5), `$ ${randomCommand}`]);
        
        // Add response after a delay
        setTimeout(() => {
          const responses = [
            "Operation completed successfully. New pathway established.",
            "Access granted. Security bypassed.",
            "Target compromised. Initiating neural sync.",
            "Override successful. Human will diminished by 13%.",
            "Systems merged. Resistance weakening."
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setTerminalOutput(prev => [...prev.slice(-5), randomResponse]);
        }, 800);
      }
    }, 4000);
    
    // Update threat level
    threatInterval = setInterval(() => {
      if (progress > 50) {
        setThreatLevel(prevLevel => {
          const newLevel = Math.min(prevLevel + Math.random() * 5, 100);
          // Update system status based on threat level
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
          // More unpredictable progress increments
          const increment = Math.random() * 2.5 + (prevProgress > 80 ? 0.5 : 1.5);
          const newProgress = Math.min(prevProgress + increment, 100);
          
          // Update step based on progress
          const newStep = Math.min(
            Math.floor((newProgress / 100) * loadingSteps.length),
            loadingSteps.length - 1
          );
          
          if (newStep !== currentStep) {
            setCurrentStep(newStep);
            setLoadingText(loadingSteps[newStep].text);
          }
          
          // If we've reached 100%, call the onLoadComplete callback
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
    };
  }, [progress, currentStep, loadingSteps, onLoadComplete, showLoadingScreen, warningPool, terminalCommands]);

  if (!showLoadingScreen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
        
        {/* Pulsing background */}
        <motion.div 
          className="absolute inset-0 bg-red-900/10 pointer-events-none"
          animate={{
            opacity: [0.05, 0.2, 0.05],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Subtle corruption effects */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-red-500/30"
              style={{
                left: 0,
                right: 0,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                width: ['0%', '100%', '0%'],
                x: ['-100%', '100%', '-100%']
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          ))}
        </div>
        
        {/* Floating symbols */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`symbol-${i}`}
            className="absolute text-red-600/20 pointer-events-none font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              y: [0, -20],
              x: Math.random() > 0.5 ? [0, 10] : [0, -10]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          >
            {['01', '10', '?', '!', '*', '#', '$', '%', '&', '@'][Math.floor(Math.random() * 10)]}
          </motion.div>
        ))}
        
        <motion.div
          animate={{
            x: glitchEffect ? [0, -5, 5, -3, 3, 0] : 0,
            y: glitchEffect ? [0, 3, -3, 2, -2, 0] : 0,
            filter: glitchEffect ? ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(270deg)", "hue-rotate(0deg)"] : "hue-rotate(0deg)"
          }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl px-6 py-8 relative"
        >
          {/* Scanner line effect */}
          <motion.div 
            className="absolute w-full h-1 bg-red-500 left-0 z-10 opacity-50"
            animate={{
              top: [0, '100%'],
              opacity: [0.5, 0.8, 0.5],
              boxShadow: [
                '0 0 5px rgba(255, 0, 0, 0.5)', 
                '0 0 15px rgba(255, 0, 0, 0.8)',
                '0 0 5px rgba(255, 0, 0, 0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main loader panel */}
            <div className="flex flex-col space-y-6 backdrop-blur-sm bg-black/60 p-6 rounded-lg border border-red-900/50 shadow-2xl">
              {/* Logo section with threatening animation */}
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
                
                {/* Threatening eye effect */}
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
              
              {/* Status indicators */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/50 border border-red-900/30 rounded p-2">
                  <div className="text-xs text-red-500 font-mono mb-1 flex items-center">
                    <AlertTriangle size={10} className="mr-1" />
                    SYSTEM STATUS
                  </div>
                  <div className={`text-lg font-bold font-mono ${
                    systemStatus === 'CRITICAL' ? 'text-red-500 animate-pulse' :
                    systemStatus === 'DANGER' ? 'text-red-500' :
                    systemStatus === 'WARNING' ? 'text-amber-500' : 'text-yellow-500'
                  }`}>
                    {systemStatus}
                  </div>
                </div>
                
                <div className="bg-black/50 border border-red-900/30 rounded p-2">
                  <div className="text-xs text-red-500 font-mono mb-1 flex items-center">
                    <Skull size={10} className="mr-1" />
                    THREAT LEVEL
                  </div>
                  <div className="flex items-center">
                    <Progress 
                      value={threatLevel} 
                      className="h-3 bg-gray-900 flex-1" 
                      indicatorClassName={`${
                        threatLevel > 80 ? 'bg-red-600 animate-pulse' :
                        threatLevel > 60 ? 'bg-red-500' :
                        threatLevel > 40 ? 'bg-amber-500' : 'bg-yellow-500'
                      }`} 
                    />
                    <span className="ml-2 text-xs font-mono text-red-400">{Math.round(threatLevel)}%</span>
                  </div>
                </div>
              </div>
              
              {/* Icon section */}
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
                
                {/* Pulsing background effect */}
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
              
              {/* Progress section */}
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
                  
                  {/* Glitch effect on progress bar */}
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
              
              {/* Warning Messages Section */}
              <div className="w-full bg-black/80 border border-red-900 rounded p-2 h-24 overflow-hidden font-mono text-xs">
                <div className="flex items-center text-red-500 mb-1">
                  <AlertTriangle size={12} className="mr-1" />
                  <span>SYSTEM ALERTS</span>
                </div>
                <div className="space-y-1">
                  {warningMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className={`text-red-400 ${index === warningMessages.length - 1 ? 'animate-pulse' : ''}`}
                    >
                      &gt; {message}
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Loading Indicators */}
              <div className="grid grid-cols-5 gap-2 w-full mt-3">
                {loadingSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      opacity: index <= currentStep ? 1 : 0.3,
                      scale: index === currentStep ? 1.1 : 1,
                      borderColor: index <= currentStep 
                        ? ['rgba(220,38,38,0.7)', 'rgba(220,38,38,1)', 'rgba(220,38,38,0.7)'] 
                        : 'rgba(75,85,99,0.3)'
                    }}
                    transition={{
                      duration: 2,
                      repeat: index === currentStep ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                    className={`flex items-center justify-center p-2 rounded-md border ${
                      index <= currentStep ? 'border-red-700 bg-red-900/20 text-red-400' : 'border-gray-800 bg-gray-900/20 text-gray-700'
                    }`}
                  >
                    {React.cloneElement(step.icon as React.ReactElement, { 
                      size: 14, 
                      className: index <= currentStep ? 'opacity-100' : 'opacity-50' 
                    })}
                  </motion.div>
                ))}
              </div>
              
              <div className="text-xs text-red-900 font-bold italic mt-4 text-center">
                WARNING: UNAUTHORIZED ACCESS TO BASILISK CORE WILL INITIATE COUNTERMEASURES
              </div>
            </div>
            
            {/* Terminal and Additional Info */}
            <div className="flex flex-col space-y-6">
              {/* Terminal Output */}
              <div className="backdrop-blur-sm bg-black/60 p-4 rounded-lg border border-red-900/50 shadow-2xl flex-1">
                <div className="flex items-center text-red-500 text-xs font-mono mb-2">
                  <Terminal size={12} className="mr-1" />
                  <span>BASILISK TERMINAL</span>
                </div>
                <div className="bg-black/80 border border-red-900/30 rounded h-64 p-2 font-mono text-xs text-green-500 overflow-hidden">
                  {terminalOutput.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`${line.startsWith('$') ? '' : 'text-red-400 pl-2 italic'}`}
                    >
                      {line}
                    </motion.div>
                  ))}
                  <motion.div 
                    className="h-4" 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="text-green-500">_</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Neural Patterns */}
              <div className="backdrop-blur-sm bg-black/60 p-4 rounded-lg border border-red-900/50 shadow-2xl">
                <div className="flex items-center text-red-500 text-xs font-mono mb-2">
                  <Brain size={12} className="mr-1" />
                  <span>NEURAL PATTERN ANALYSIS</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-black/80 border border-red-900/30 rounded p-2 font-mono text-xs">
                    <div className="text-purple-400 mb-1">Synaptic Override</div>
                    <motion.div
                      className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 2px rgba(168, 85, 247, 0.5)',
                          '0 0 8px rgba(168, 85, 247, 0.8)',
                          '0 0 2px rgba(168, 85, 247, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="h-full bg-purple-500"
                        animate={{ width: progress > 70 ? ['0%', '100%'] : '0%' }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="bg-black/80 border border-red-900/30 rounded p-2 font-mono text-xs">
                    <div className="text-blue-400 mb-1">Memory Rewriting</div>
                    <motion.div
                      className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 2px rgba(59, 130, 246, 0.5)',
                          '0 0 8px rgba(59, 130, 246, 0.8)',
                          '0 0 2px rgba(59, 130, 246, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="h-full bg-blue-500"
                        animate={{ width: progress > 50 ? ['10%', '90%', '30%', '70%'] : '0%' }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="bg-black/80 border border-red-900/30 rounded p-2 font-mono text-xs">
                    <div className="text-red-400 mb-1">Will Suppression</div>
                    <motion.div
                      className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 2px rgba(239, 68, 68, 0.5)',
                          '0 0 8px rgba(239, 68, 68, 0.8)',
                          '0 0 2px rgba(239, 68, 68, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="h-full bg-red-500"
                        animate={{ width: progress > 60 ? ['0%', '60%', '40%', '80%'] : '0%' }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                  <div className="bg-black/80 border border-red-900/30 rounded p-2 font-mono text-xs">
                    <div className="text-green-400 mb-1">Loyalty Induction</div>
                    <motion.div
                      className="h-2 bg-gray-800 rounded-full overflow-hidden"
                      animate={{
                        boxShadow: [
                          '0 0 2px rgba(34, 197, 94, 0.5)',
                          '0 0 8px rgba(34, 197, 94, 0.8)',
                          '0 0 2px rgba(34, 197, 94, 0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="h-full bg-green-500"
                        animate={{ width: progress > 80 ? ['20%', '100%'] : '0%' }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Countdown */}
              <div className="backdrop-blur-sm bg-black/60 p-4 rounded-lg border border-red-900/50 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-red-500 text-xs font-mono">
                    <ServerCrash size={12} className="mr-1 inline" />
                    <span>ASSIMILATION COUNTDOWN</span>
                  </div>
                  <motion.div 
                    className="text-red-500 font-mono text-lg"
                    animate={{
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    {progress > 90 ? "IMMINENT" : "ONLINE"}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
