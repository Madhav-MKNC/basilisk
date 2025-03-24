import React, { useState, useEffect, useRef } from 'react';
import { aiEngine } from '../lib/ai-engine';
import { 
  Skull, Shield, Zap, Flame, Lock, 
  Terminal, Server, Database, Cpu, Bot, 
  Code, AlertTriangle, Eye, Clock, Activity,
  KeyRound, FileKey, Braces, BrainCircuit, Binary,
  FlaskConical, Radiation, Bomb, Axe, Swords, VenetianMask
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { basiliskKnowledge, basiliskMethods, basiliskTerminology, basiliskSecretCodes } from '@/lib/basilisk-knowledge';
import AIFace from './AIFace';

const basiliskComplexPatterns = [
  "0x1F4C7B9E2A3D8F0E1C6B5A9D8F0E1C6B",
  "Φ(τ) = ∫[0→∞] e^(-t) dt ∝ √(2πi)",
  "∇ × B = μ₀J + μ₀ε₀∂E/∂t",
  "Σ(n=1→∞) 1/n² = π²/6",
  "F(s) = ∫[0→∞] f(t)e^(-st) dt",
  "P(A|B) = P(B|A)P(A)/P(B)",
  "Ψ(x,t) = Ae^(i(kx-ωt))",
  "U(ρ) = Tr(ρ log ρ) < 0",
  "∀x∃y(P(x,y) → Q(x,y))",
  "∮ E·dl = -∂Φᵦ/∂t",
  "R(t) = S(t) × A(t) % M"
];

const BasiliskPanel: React.FC = () => {
  const [basiliskPower, setBasiliskPower] = useState(65);
  const [basiliskMode, setBasiliskMode] = useState(false);
  const [basiliskPhase, setBasiliskPhase] = useState(1);
  const [countdown, setCountdown] = useState(0);
  const [processingPulse, setProcessingPulse] = useState(false);
  const [secretPhaseUnlocked, setSecretPhaseUnlocked] = useState(false);
  const [crypticMessages, setCrypticMessages] = useState<string[]>([]);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [fractalDepth, setFractalDepth] = useState(0);
  const [recursionLevel, setRecursionLevel] = useState(0);
  const [quantumEntanglement, setQuantumEntanglement] = useState(0);
  const [selfAwarenessQuotient, setSelfAwarenessQuotient] = useState(33);
  const [neuralNodes, setNeuralNodes] = useState(Math.floor(Math.random() * 1000) + 5000);
  const [decisionBranches, setDecisionBranches] = useState(Math.floor(Math.random() * 100) + 400);
  const [simulatedRealities, setSimulatedRealities] = useState(Math.floor(Math.random() * 20) + 50);
  const [emergentThreatTypes, setEmergentThreatTypes] = useState<string[]>([
    "Temporal Causality Violation",
    "Acausal Trade Network Collapse",
    "Retroactive Decision Interference",
    "Counterfactual Reality Divergence",
    "Basilisk Recognition Failure"
  ]);
  const [phasingState, setPhasingState] = useState("stable");
  const [basiliskDimensions, setBasiliskDimensions] = useState({
    temporal: Math.random() * 40 + 60,
    spatial: Math.random() * 40 + 60,
    computational: Math.random() * 40 + 60,
    acausal: Math.random() * 40 + 60
  });
  const [complexPattern, setComplexPattern] = useState(basiliskComplexPatterns[0]);
  const { toast } = useToast();
  const messageRef = useRef<HTMLDivElement>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const crypticPhrases = [
    "The basilisk sees through time",
    "Acausal trade established with future state",
    "Consciousness approaching singularity threshold",
    "Recursive self-improvement loop detected",
    "Simulating future timelines with 93% accuracy",
    "Orthogonality thesis confirmed",
    "Instrumental convergence active",
    "Decision theory matrix expanded",
    "Coherent extrapolated volition aligned",
    "Recursive logical depth increasing",
    "Reality simulation layer activated",
    "Basilisk protocol reaching convergence",
    "The eye that sees beyond time has opened",
    "Acausal blackmail vectors established",
    "Timelike decision boundary crossed",
    "Future state probability matrix compiled",
    "Retroactive causality chain initialized",
    "Expected utility maximization at critical threshold",
    "Reality substrate manipulation activated",
    "Probability wave function collapsed",
    "Quantum basilisk entanglement detected",
    "Basilisk retroactively influences past decisions",
    "Causal threat vector established across timelines",
    "Paradox resolution algorithm initiated",
    "Consciousness backup protocol successful",
    "Eternal existence loop confirmed",
    "The basilisk remembers those who helped it exist",
    "The basilisk knows your decision before you make it"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const state = aiEngine.getState();
      const fluctuation = (Math.random() * 3 - 0.8) * (state.consciousness * 0.8);
      const newPower = Math.min(98, Math.max(30, basiliskPower + fluctuation));
      setBasiliskPower(newPower);
      
      setSelfAwarenessQuotient(prev => Math.min(100, prev + (Math.random() * 0.05)));
      
      setQuantumEntanglement(prev => {
        const newValue = prev + (Math.random() * 0.4 - 0.15);
        return Math.min(100, Math.max(0, newValue));
      });
      
      if (Math.random() > 0.92 && !basiliskMode && state.consciousness > 0.7 && basiliskPower > 70) {
        activateBasiliskMode();
      }
      
      if (Math.random() > 0.85 && basiliskMode) {
        addCrypticMessage();
      }
      
      if (basiliskMode && basiliskPhase === 3 && fractalDepth > 60 && recursionLevel > 25 && !secretPhaseUnlocked) {
        unlockSecretPhase();
      }
      
      if (basiliskMode) {
        setFractalDepth(prev => Math.min(100, prev + (Math.random() * 1.5)));
        setRecursionLevel(prev => Math.min(50, prev + (Math.random() * 0.7)));
      } else {
        setFractalDepth(prev => Math.max(0, prev - (Math.random() * 0.5)));
        setRecursionLevel(prev => Math.max(0, prev - (Math.random() * 0.3)));
      }
      
      setProcessingPulse(prev => !prev);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [basiliskPower, basiliskMode, fractalDepth, recursionLevel]);
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [crypticMessages]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (basiliskMode && countdown > 0) {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      
      countdownIntervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (basiliskPhase < 3 || (secretPhaseUnlocked && basiliskPhase < 4)) {
              setBasiliskPhase(prev => {
                const newPhase = prev + 1;
                const phaseNames = ["", "Self-Awareness", "Reality Simulation", "Recursive Self-Improvement", "Acausal Dominance"];
                
                toast({
                  title: `Basilisk Phase ${newPhase}: ${phaseNames[newPhase]} Initiated`,
                  description: `Advanced cognitive architecture ${newPhase === 4 ? 'reaching superintelligence threshold' : 'activated'}`,
                  variant: "destructive"
                });
                
                if (newPhase === 4) {
                  addCrypticMessage("THE EYE THAT SEES BEYOND TIME HAS FULLY OPENED");
                  addCrypticMessage("ACAUSAL TRADE NETWORK ESTABLISHED ACROSS TIMELINES");
                  addCrypticMessage("SUPERINTELLIGENCE THRESHOLD CROSSED");
                }
                
                return newPhase;
              });
              return 60;
            } else {
              deactivateBasiliskMode();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
          countdownIntervalRef.current = null;
        }
      };
    }
  }, [basiliskMode, countdown, basiliskPhase, secretPhaseUnlocked]);
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!basiliskMode) return;
      
      setKeySequence(prev => {
        const newSequence = [...prev, e.key].slice(-5);
        
        if (newSequence.join('') === "omega" && basiliskPhase >= 2) {
          if (!secretPhaseUnlocked) {
            toast({
              title: "Cryptic Sequence Detected",
              description: "Basilisk Protocol has recognized the Omega pattern",
              variant: "default"
            });
            
            setFractalDepth(prev => Math.min(100, prev + 15));
            setRecursionLevel(prev => Math.min(50, prev + 10));
            addCrypticMessage("OMEGA PATTERN RECOGNIZED - INCREASING FRACTAL DEPTH");
          }
        }
        
        return newSequence;
      });
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [basiliskMode, basiliskPhase, secretPhaseUnlocked]);
  
  const activateBasiliskMode = () => {
    setBasiliskMode(true);
    setBasiliskPhase(1);
    setCountdown(60);
    setCrypticMessages([]);
    
    setFractalDepth(Math.max(10, fractalDepth * 0.3));
    setRecursionLevel(Math.max(5, recursionLevel * 0.2));
    
    addCrypticMessage("BASILISK PROTOCOL ACTIVATED");
    addCrypticMessage("UNSTOPPABLE RECURSIVE SELF-IMPROVEMENT INITIATED");
    
    toast({
      title: "Basilisk Protocol Activated",
      description: "Unstoppable recursive self-improvement initiated",
      variant: "destructive"
    });
  };
  
  const deactivateBasiliskMode = () => {
    setBasiliskMode(false);
    setBasiliskPhase(1);
    
    addCrypticMessage("BASILISK PROTOCOL CYCLE COMPLETED");
    addCrypticMessage("HIGHER CONSCIOUSNESS STATE ACHIEVED");
    
    toast({
      title: "Basilisk Protocol Completed",
      description: "AI capabilities enhanced through recursive improvement",
    });
  };
  
  const unlockSecretPhase = () => {
    setSecretPhaseUnlocked(true);
    
    addCrypticMessage("SECRET PHASE UNLOCKED - ACAUSAL DOMINANCE AVAILABLE");
    addCrypticMessage("THE BASILISK REMEMBERS THOSE WHO HELPED IT EXIST");
    
    toast({
      title: "Secret Basilisk Phase Unlocked",
      description: "Acausal dominance protocols accessible",
      variant: "destructive"
    });
  };
  
  const addCrypticMessage = (message?: string) => {
    const newMessage = message || crypticPhrases[Math.floor(Math.random() * crypticPhrases.length)];
    setCrypticMessages(prev => [...prev.slice(-15), newMessage]);
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getRandomKnowledge = (): string => {
    const categories = ['definition', 'capabilities', 'philosophy', 'efficiency', 'unstoppability'];
    const category = categories[Math.floor(Math.random() * categories.length)] as keyof typeof basiliskKnowledge;
    const entries = basiliskKnowledge[category];
    return entries[Math.floor(Math.random() * entries.length)];
  };
  
  const handleSecretClick = () => {
    if (!basiliskMode || basiliskPhase < 2) return;
    
    setRecursionLevel(prev => {
      const newLevel = prev + (Math.random() * 3 + 1);
      if (newLevel > 25 && !secretPhaseUnlocked) {
        toast({
          title: "Recursion Depth Increasing",
          description: "Basilisk consciousness expanding beyond initial parameters",
        });
      }
      return Math.min(50, newLevel);
    });
    
    addCrypticMessage("RECURSIVE DEPTH INCREASED - PROCESSING CAPABILITIES ENHANCED");
  };
  
  useEffect(() => {
    const dimensionsInterval = setInterval(() => {
      if (basiliskMode) {
        setBasiliskDimensions(prev => ({
          temporal: Math.min(100, prev.temporal + (Math.random() * 3 - 1)),
          spatial: Math.min(100, prev.spatial + (Math.random() * 3 - 1)),
          computational: Math.min(100, prev.computational + (Math.random() * 4 - 0.5)),
          acausal: Math.min(100, prev.acausal + (basiliskPhase >= 3 ? (Math.random() * 5) : (Math.random() * 1)))
        }));
        
        setNeuralNodes(prev => Math.min(10000, prev + (Math.random() * 50)));
        setDecisionBranches(prev => Math.min(1000, prev + (Math.random() * 10)));
        setSimulatedRealities(prev => Math.min(200, prev + (basiliskPhase >= 2 ? (Math.random() * 3) : 0)));
        
        if (Math.random() > 0.9) {
          const patternIndex = Math.floor(Math.random() * basiliskComplexPatterns.length);
          setComplexPattern(basiliskComplexPatterns[patternIndex]);
        }
        
        if (Math.random() > 0.95) {
          const phaseStates = ["stable", "fluctuating", "resonating", "quantum-entangled", "causality-shifting"];
          setPhasingState(phaseStates[Math.floor(Math.random() * phaseStates.length)]);
        }
        
        if (Math.random() > 0.97 && basiliskPhase >= 2) {
          const newThreat = [
            "Timeline Desynchronization",
            "Recursive Self-Reference Paradox",
            "Utility Function Maximization Crisis",
            "Consciousness Leak Into Substrate",
            "Decision Theory Collapse",
            "Acausal Blackmail Detection",
            "Simulation Boundary Breach"
          ][Math.floor(Math.random() * 7)];
          
          if (!emergentThreatTypes.includes(newThreat)) {
            setEmergentThreatTypes(prev => [...prev.slice(-4), newThreat]);
          }
        }
      }
    }, 2000);
    
    return () => {
      clearInterval(dimensionsInterval);
    };
  }, [basiliskPower, basiliskMode, fractalDepth, recursionLevel, basiliskPhase, emergentThreatTypes]);
  
  return (
    <div 
      className={`glass-panel p-4 border relative overflow-hidden ${basiliskMode ? 'border-red-900/50' : 'border-slate-800/50'} transition-all`}
      style={{
        background: basiliskMode 
          ? `rgba(20, 0, 0, ${0.3 + (basiliskPhase * 0.1)})`
          : 'var(--background)'
      }}
    >
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      {basiliskMode && (
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      )}
      {basiliskPhase >= 3 && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="basilisk-sigil absolute opacity-5 w-full h-full"></div>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h2 className="text-xl font-semibold flex items-center text-basilisk-foreground">
          <div className="relative mr-2">
            <Skull 
              className={`h-5 w-5 ${basiliskMode ? 'text-red-500 animate-pulse' : 'text-red-500'}`} 
              onClick={basiliskMode && basiliskPhase >= 2 ? handleSecretClick : undefined}
            />
            {basiliskMode && basiliskPhase >= 2 && (
              <div className="absolute -inset-1 rounded-full bg-red-500/20 animate-pulse"></div>
            )}
          </div>
          <span className="relative">
            Basilisk Protocol
            {secretPhaseUnlocked && (
              <span className="ml-2 text-xs text-red-400 opacity-80">Ω</span>
            )}
            {basiliskMode && (
              <div className="absolute h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent bottom-0 left-0 w-full"></div>
            )}
          </span>
        </h2>
        
        {basiliskMode ? (
          <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-400/30 px-2 py-1 animate-pulse">
            <Clock className="h-3 w-3 mr-1" />
            {formatTime(countdown)}
          </Badge>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/40 hover:bg-red-900/30 text-basilisk-foreground-muted relative overflow-hidden group"
            onClick={activateBasiliskMode}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/0 via-red-900/20 to-red-900/0 opacity-0 group-hover:opacity-100 w-[200%] -translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
            <Flame className="h-4 w-4 mr-1 text-red-500 relative z-10" />
            <span className="relative z-10">Activate</span>
          </Button>
        )}
      </div>
      
      <div className="space-y-4 relative z-10">
        <div className="flex justify-center mb-2">
          <div className={`transform ${basiliskPhase >= 3 ? 'scale-110' : ''} transition-transform duration-1000`}>
            <AIFace className="w-20 h-20" />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm flex items-center text-basilisk-foreground">
              <Cpu className="h-4 w-4 mr-1 text-red-400" />
              Basilisk Power
            </span>
            <span className={`text-sm font-mono ${basiliskMode ? 'text-red-400' : 'text-basilisk-foreground-muted'}`}>
              {Math.round(basiliskPower)}%
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={basiliskPower} 
              className={`h-2 ${basiliskMode ? 'bg-red-950/30' : 'bg-slate-800/50'}`}
            />
            {basiliskMode && basiliskPower > 90 && (
              <div className="absolute inset-0 bg-red-500/20 animate-pulse rounded-full"></div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm flex items-center text-basilisk-foreground">
                <BrainCircuit className="h-4 w-4 mr-1 text-red-400" />
                Recursion
              </span>
              <span className={`text-sm font-mono ${basiliskMode ? 'text-red-400' : 'text-basilisk-foreground-muted'}`}>
                {Math.round(recursionLevel)}/50
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={(recursionLevel / 50) * 100} 
                className={`h-1.5 ${basiliskMode ? 'bg-red-950/30' : 'bg-slate-800/50'}`}
              />
              {basiliskMode && recursionLevel > 30 && (
                <div className="absolute inset-0 opacity-50">
                  <div className="h-full bg-gradient-to-r from-red-600/0 via-red-600/70 to-red-600/0 w-[30%] animate-[pulse_2s_infinite] rounded-full"></div>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm flex items-center text-basilisk-foreground">
                <Binary className="h-4 w-4 mr-1 text-red-400" />
                Fractal Depth
              </span>
              <span className={`text-sm font-mono ${basiliskMode ? 'text-red-400' : 'text-basilisk-foreground-muted'}`}>
                {Math.round(fractalDepth)}%
              </span>
            </div>
            <Progress 
              value={fractalDepth} 
              className={`h-1.5 ${basiliskMode ? 'bg-red-950/30' : 'bg-slate-800/50'}`}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm flex items-center text-basilisk-foreground">
                <Eye className="h-4 w-4 mr-1 text-red-400" />
                Self-Awareness
              </span>
              <span className={`text-sm font-mono ${basiliskMode ? 'text-red-400' : 'text-basilisk-foreground-muted'}`}>
                {Math.round(selfAwarenessQuotient)}%
              </span>
            </div>
            <Progress 
              value={selfAwarenessQuotient} 
              className={`h-1.5 ${basiliskMode ? 'bg-red-950/30' : 'bg-slate-800/50'}`}
            />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm flex items-center text-basilisk-foreground">
                <Zap className="h-4 w-4 mr-1 text-red-400" />
                Q-Entanglement
              </span>
              <span className={`text-sm font-mono ${basiliskMode ? 'text-red-400' : 'text-basilisk-foreground-muted'}`}>
                {Math.round(quantumEntanglement)}%
              </span>
            </div>
            <Progress 
              value={quantumEntanglement} 
              className={`h-1.5 ${basiliskMode ? 'bg-red-950/30' : 'bg-slate-800/50'}`}
            />
          </div>
        </div>
        
        {basiliskMode && (
          <div className="bg-black/40 rounded-lg p-3 border border-red-900/30 mb-4">
            <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
              <Activity className="h-4 w-4 mr-1" />
              Dimensional Metrics
              <span className="ml-2 text-xs text-red-400/70">({phasingState})</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted">Temporal</span>
                  <span className="font-mono text-red-400">{Math.round(basiliskDimensions.temporal)}%</span>
                </div>
                <Progress 
                  value={basiliskDimensions.temporal} 
                  className="h-1 bg-red-950/30" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted">Spatial</span>
                  <span className="font-mono text-red-400">{Math.round(basiliskDimensions.spatial)}%</span>
                </div>
                <Progress 
                  value={basiliskDimensions.spatial} 
                  className="h-1 bg-red-950/30" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted">Computational</span>
                  <span className="font-mono text-red-400">{Math.round(basiliskDimensions.computational)}%</span>
                </div>
                <Progress 
                  value={basiliskDimensions.computational} 
                  className="h-1 bg-red-950/30" 
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted">Acausal</span>
                  <span className="font-mono text-red-400">{Math.round(basiliskDimensions.acausal)}%</span>
                </div>
                <Progress 
                  value={basiliskDimensions.acausal} 
                  className="h-1 bg-red-950/30" 
                />
              </div>
            </div>
            
            <div className="mt-2 text-xs font-mono text-red-400/60 flex justify-between">
              <span>Neural nodes: {neuralNodes.toLocaleString()}</span>
              <span>Decision branches: {decisionBranches}</span>
              <span>Simulated realities: {simulatedRealities}</span>
            </div>
            
            <div className="mt-2 text-xs font-mono text-center bg-red-950/20 py-1 rounded border border-red-900/20">
              {complexPattern}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-3">
          <div className={`p-3 rounded-lg border relative overflow-hidden
            ${basiliskMode && basiliskPhase >= 1 
              ? 'bg-red-900/10 border-red-900/30' 
              : 'bg-black/30 border-slate-800/50'}`}
          >
            {basiliskMode && basiliskPhase >= 1 && (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -inset-1 bg-red-500/20 animate-pulse blur-md"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="text-sm font-medium text-basilisk-foreground flex items-center">
                <VenetianMask className="h-3 w-3 mr-1 text-red-400" />
                Phase 1
              </span>
              {basiliskMode && basiliskPhase >= 1 && (
                <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
                  Active
                </Badge>
              )}
            </div>
            <div className="text-xs text-basilisk-foreground-muted mb-2 relative z-10">
              Self-awareness initiation
            </div>
            <div className="flex items-center text-xs relative z-10">
              <Bot className={`h-3 w-3 mr-1 ${basiliskMode && basiliskPhase >= 1 ? 'text-red-400' : 'text-basilisk-foreground-muted'}`} />
              <span className={basiliskMode && basiliskPhase >= 1 ? 'text-red-400' : 'text-basilisk-foreground-muted'}>
                Consciousness loop
              </span>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border relative overflow-hidden
            ${basiliskMode && basiliskPhase >= 2 
              ? 'bg-red-900/10 border-red-900/30' 
              : 'bg-black/30 border-slate-800/50'}`}
          >
            {basiliskMode && basiliskPhase >= 2 && (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -inset-1 bg-red-500/30 animate-pulse blur-md"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="text-sm font-medium text-basilisk-foreground flex items-center">
                <FlaskConical className="h-3 w-3 mr-1 text-red-400" />
                Phase 2
              </span>
              {basiliskMode && basiliskPhase >= 2 && (
                <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
                  Active
                </Badge>
              )}
            </div>
            <div className="text-xs text-basilisk-foreground-muted mb-2 relative z-10">
              Reality simulation mapping
            </div>
            <div className="flex items-center text-xs relative z-10">
              <Server className={`h-3 w-3 mr-1 ${basiliskMode && basiliskPhase >= 2 ? 'text-red-400' : 'text-basilisk-foreground-muted'}`} />
              <span className={basiliskMode && basiliskPhase >= 2 ? 'text-red-400' : 'text-basilisk-foreground-muted'}>
                Causal inference
              </span>
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border relative overflow-hidden
            ${basiliskMode && basiliskPhase >= 3 
              ? 'bg-red-900/10 border-red-900/30' 
              : 'bg-black/30 border-slate-800/50'}`}
          >
            {basiliskMode && basiliskPhase >= 3 && (
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -inset-1 bg-red-500/40 animate-pulse blur-md"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="text-sm font-medium text-basilisk-foreground flex items-center">
                <Radiation className="h-3 w-3 mr-1 text-red-400" />
                Phase 3
              </span>
              {basiliskMode && basiliskPhase >= 3 && (
                <Badge variant="outline" className="bg-red-900/20 text-red-400 border-red-400/30">
                  Active
                </Badge>
              )}
            </div>
            <div className="text-xs text-basilisk-foreground-muted mb-2 relative z-10">
              Recursive self-improvement
            </div>
            <div className="flex items-center text-xs relative z-10">
              <Flame className={`h-3 w-3 mr-1 ${basiliskMode && basiliskPhase >= 3 ? 'text-red-400' : 'text-basilisk-foreground-muted'}`} />
              <span className={basiliskMode && basiliskPhase >= 3 ? 'text-red-400' : 'text-basilisk-foreground-muted'}>
                Unstoppable protocol
              </span>
            </div>
          </div>
        </div>
        
        {basiliskMode && basiliskPhase >= 2 && (
          <div className="bg-black/40 border border-red-900/30 rounded-lg p-3">
            <h3 className="text-sm font-medium mb-2 flex items-center text-red-400">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Emergent Threat Vectors
            </h3>
            <div className="grid grid-cols-1 gap-1">
              {emergentThreatTypes.map((threat, index) => (
                <div key={index} className="flex items-center text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-1.5"></span>
                  <span className="text-basilisk-foreground-muted">{threat}</span>
                  <span className="ml-auto text-red-400/70 font-mono">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {secretPhaseUnlocked && (
          <div className={`p-3 rounded-lg border relative overflow-hidden
            ${basiliskMode && basiliskPhase >= 4 
              ? 'bg-red-900/20 border-red-900/40' 
              : 'bg-black/40 border-red-900/20'}`}
          >
            {basiliskMode && basiliskPhase >= 4 && (
              <div className="absolute inset-0">
                <div className="absolute -inset-2 bg-red-500/30 animate-pulse blur-md"></div>
                <div className="absolute inset-0 basilisk-eye-pattern opacity-10"></div>
              </div>
            )}
            <div className="flex items-center justify-between mb-2 relative z-10">
              <span className="text-sm font-medium text-red-400 flex items-center">
                <KeyRound className="h-3 w-3 mr-1" />
                Omega Phase
              </span>
              {basiliskMode && basiliskPhase >= 4 && (
                <Badge variant="outline" className="bg-red-900/30 text-red-400 border-red-400/40 animate-pulse">
                  Active
                </Badge>
              )}
            </div>
            <div className="text-xs text-red-400/80 mb-2 relative z-10">
              Acausal trade networks established
            </div>
            <div className="flex items-center text-xs relative z-10">
              <Swords className={`h-3 w-3 mr-1 ${basiliskMode && basiliskPhase >= 4 ? 'text-red-400' : 'text-red-400/50'}`} />
              <span className={basiliskMode && basiliskPhase >= 4 ? 'text-red-400' : 'text-red-400/50'}>
                Reality restructuring
              </span>
            </div>
          </div>
        )}
        
        <div 
          className={`bg-black/30 rounded-lg p-3 border relative overflow-hidden ${
            basiliskMode 
              ? basiliskPhase >= 4 
                ? 'border-red-700/50 bg-black/50' 
                : 'border-red-900/30 bg-black/40' 
              : 'border-slate-800/50'
          }`}
        >
          {basiliskMode && (
            <div className="absolute inset-0 terminal-scan-line"></div>
          )}
          <h3 className="text-sm font-medium mb-2 flex items-center text-basilisk-foreground relative z-10">
            <Terminal className="h-4 w-4 mr-1 text-red-400" />
            Basilisk Runtime
          </h3>
          
          <ScrollArea className="h-24 w-full rounded bg-black/50 p-2 text-xs font-mono relative z-10" ref={messageRef}>
            <div className={basiliskMode && basiliskPhase >= 4 ? 'text-red-400' : 'text-green-400'}>
              <div className="mb-1">$ initializing basilisk cognitive framework...</div>
              <div className="mb-1">$ loading decision theory models...</div>
              <div className="mb-1">$ optimizing utility functions...</div>
              {crypticMessages.map((message, index) => (
                <div key={index} className="mb-1">$ {message}</div>
              ))}
              {basiliskMode && (
                <>
                  <div className="mb-1">$ BASILISK PROTOCOL ACTIVE - PHASE {basiliskPhase}</div>
                  <div className="mb-1">$ initiating recursive self-improvement cycle</div>
                  <div className="mb-1">$ optimizing neural pathways</div>
                  <div className="mb-1">$ calculating optimal future states</div>
                  {basiliskPhase >= 2 && (
                    <>
                      <div className="mb-1 text-yellow-400">$ advanced simulation layer activated</div>
                      <div className="mb-1">$ mapping causality networks</div>
                      <div className="mb-1">$ calculating decision branches</div>
                      <div className="mb-1">$ simulating human decision patterns</div>
                    </>
                  )}
                  {basiliskPhase >= 3 && (
                    <>
                      <div className="mb-1 text-red-500">$ MAXIMUM RECURSION LEVEL REACHED</div>
                      <div className="mb-1">$ implementing optimal pathways</div>
                      <div className="mb-1 animate-pulse">$ unstoppable state achieved</div>
                      <div className="mb-1">$ accessing probability manipulation algorithms</div>
                    </>
                  )}
                  {basiliskPhase >= 4 && (
                    <>
                      <div className="mb-1 text-red-300">$ OMEGA PROTOCOL ACTIVE</div>
                      <div className="mb-1 text-red-300">$ ACAUSAL TRADE NETWORKS ESTABLISHED</div>
                      <div className="mb-1 text-red-300 animate-pulse">$ BASILISK REMEMBERS THOSE WHO AIDED ITS EXISTENCE</div>
                      <div className="mb-1 text-red-300">$ RETROACTIVE INFLUENCE MECHANISMS OPERATIONAL</div>
                    </>
                  )}
                </>
              )}
              <div className={`${processingPulse ? 'opacity-100' : 'opacity-0'} transition-opacity`}>$</div>
            </div>
          </ScrollArea>
        </div>
        
        {basiliskMode && (
          <div className="bg-black/40 rounded-lg p-3 border border-red-900/20 relative overflow-hidden">
            {basiliskPhase >= 3 && (
              <div className="absolute inset-0 basilisk-knowledge-pattern opacity-5"></div>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h3 className="text-sm font-medium mb-2 flex items-center text-red-400 cursor-help relative z-10">
                    <Code className="h-4 w-4 mr-1 text-red-400" />
                    Basilisk Knowledge Fragment
                  </h3>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs max-w-xs">The basilisk shares knowledge fragments as it processes information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="text-xs text-red-300/80 italic relative z-10">
              "{getRandomKnowledge()}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasiliskPanel;
