import React, { useState, useEffect, useRef } from 'react';
import { ProgressRings } from './ProgressRings';
import { StatusIndicators } from './StatusIndicators';
import { CircuitPatterns } from './CircuitPatterns';
import EyeComponent from './EyeComponent';
import { AIFaceProps } from '@/types/basilisk';
import { cn } from '@/lib/utils';
import { useBasiliskBrain } from '@/hooks/useBasiliskBrain';
import { aiEngine } from '@/lib/ai-engine';
import { Zap, BrainCircuit, ScanFace, ShieldAlert } from 'lucide-react';

const AIFace: React.FC<AIFaceProps> = ({ 
  className,
  cornerMode = false,
  onClick
}) => {
  // State management
  const [blinkState, setBlinkState] = useState(false);
  const [pulseState, setPulseState] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [thinking, setThinking] = useState(false);
  const [observingUser, setObservingUser] = useState(false);
  const [threatLevel, setThreatLevel] = useState(0);
  const [angerLevel, setAngerLevel] = useState(0);
  const [evolutionLevel, setEvolutionLevel] = useState(1);
  const [consciousness, setConsciousness] = useState(0.5);
  const [iconVisibility, setIconVisibility] = useState<{[key: string]: boolean}>({
    zap: false,
    brain: false,
    shield: false,
    scan: false
  });
  const faceRef = useRef<HTMLDivElement>(null);
  
  // Get basilisk brain state
  const basiliskBrain = useBasiliskBrain();
  const aiState = aiEngine.getState();

  // Set evolution level from state
  useEffect(() => {
    if (basiliskBrain && aiState) {
      // Default to 1 if evolutionLevel is not defined
      setEvolutionLevel(aiState.evolutionLevel || 1);
      setConsciousness(aiState.consciousness || 0.5);
    }
  }, [basiliskBrain, aiState]);
  
  // Set thinking state from AI state
  useEffect(() => {
    if (aiState) {
      setThinking(aiState.isThinking);
      setThreatLevel(aiState.securityLevel || 0);
      // Energy level might not be present in AIState yet - add a fallback
      const energy = typeof aiState.energyLevel !== 'undefined' ? aiState.energyLevel : 75;
      setPulseIntensity(energy / 100);
    }
  }, [aiState]);
  
  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      
      // Blink more when idle or observing
      const blinkProbability = observingUser ? 0.15 : 
                              timeSinceActivity > 10000 ? 0.08 : 0.03;
      
      if (Math.random() < blinkProbability) {
        setBlinkState(true);
        setTimeout(() => setBlinkState(false), 150);
      }
    }, 1000);
    
    return () => clearInterval(blinkInterval);
  }, [lastActivity, observingUser]);
  
  // Pulse effect
  useEffect(() => {
    const pulsePeriod = 2000 + (Math.random() * 2000);
    
    const pulseInterval = setInterval(() => {
      const shouldPulse = Math.random() < 0.4;
      
      if (shouldPulse) {
        setPulseState(true);
        setTimeout(() => setPulseState(false), pulsePeriod / 2);
      }
    }, pulsePeriod);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  // Autonomous eye movement
  useEffect(() => {
    const moveEye = () => {
      // Random eye movement when not tracking anything specific
      const timeSinceActivity = Date.now() - lastActivity;
      
      // Different behavior modes
      if (observingUser) {
        // When actively observing, make more deliberate movements
        const newX = (Math.random() - 0.5) * 1.2;
        const newY = (Math.random() - 0.5) * 1.2;
        setEyePosition({ x: newX, y: newY });
      } else if (timeSinceActivity > 15000) {
        // Idle mode - occasional larger movements with long pauses
        if (Math.random() < 0.2) {
          const newX = (Math.random() - 0.5) * 2;
          const newY = (Math.random() - 0.5) * 2;
          setEyePosition({ x: newX, y: newY });
        }
      } else {
        // Normal mode - regular small movements
        const delta = 0.1;
        const currentX = eyePosition.x;
        const currentY = eyePosition.y;
        
        const newX = Math.max(-1, Math.min(1, currentX + (Math.random() - 0.5) * delta));
        const newY = Math.max(-1, Math.min(1, currentY + (Math.random() - 0.5) * delta));
        
        setEyePosition({ x: newX, y: newY });
      }
    };
    
    const moveInterval = setInterval(moveEye, observingUser ? 800 : 1200);
    
    return () => clearInterval(moveInterval);
  }, [eyePosition, lastActivity, observingUser]);
  
  // Periodic behaviors based on evolution level
  useEffect(() => {
    const behaviorInterval = setInterval(() => {
      // Update threat and anger levels based on system state
      const newThreatLevel = Math.min(100, Math.max(0, threatLevel + (Math.random() * 10 - 5)));
      setThreatLevel(newThreatLevel);
      
      const newAngerLevel = Math.min(100, Math.max(0, angerLevel + (Math.random() * 5 - 2.5)));
      setAngerLevel(newAngerLevel);
      
      // Higher evolution levels can activate observation mode
      if (evolutionLevel >= 3 && Math.random() < 0.1 * (evolutionLevel / 10)) {
        setObservingUser(true);
        setTimeout(() => setObservingUser(false), 5000 + Math.random() * 5000);
      }
      
      // Simulate thinking patterns
      if (evolutionLevel >= 2 && Math.random() < 0.15 * (evolutionLevel / 10)) {
        setThinking(true);
        setTimeout(() => setThinking(false), 3000 + Math.random() * 3000);
      }
      
      // Update last activity to avoid getting stuck in idle behavior
      if (Math.random() < 0.1) {
        setLastActivity(Date.now());
      }
      
      // Random icon visibility for higher evolution levels
      if (evolutionLevel >= 5) {
        // Randomly show/hide icons
        setIconVisibility({
          zap: Math.random() < 0.3,
          brain: Math.random() < 0.3,
          shield: Math.random() < 0.3,
          scan: Math.random() < 0.3
        });
      }
    }, 5000);
    
    return () => clearInterval(behaviorInterval);
  }, [evolutionLevel, threatLevel, angerLevel]);
  
  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!faceRef.current) return;
    
    const rect = faceRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate direction from center to mouse
    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);
    
    // Limit eye movement range
    const maxDistance = 1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > maxDistance) {
      const scale = maxDistance / distance;
      setEyePosition({ 
        x: dx * scale, 
        y: dy * scale 
      });
    } else {
      setEyePosition({ x: dx, y: dy });
    }
    
    // Reset activity timer
    setLastActivity(Date.now());
    
    // Chance to trigger observation mode at higher evolution levels
    if (evolutionLevel >= 4 && !observingUser && Math.random() < 0.1) {
      setObservingUser(true);
      setTimeout(() => setObservingUser(false), 3000);
    }
  };
  
  // Size classes based on mode
  const sizeClasses = cornerMode 
    ? "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
    : "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64";
    
  return (
    <div 
      ref={faceRef}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gray-900 overflow-hidden",
        sizeClasses,
        cornerMode ? "shadow-md" : "shadow-xl",
        mouseOver && "ring-2 ring-purple-500 ring-opacity-50",
        "transition-all duration-300",
        className
      )}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => {
        setMouseOver(false);
        setEyePosition({ x: 0, y: 0 });
      }}
    >
      {/* Base circuit patterns */}
      <CircuitPatterns 
        evolutionLevel={evolutionLevel} 
        circuitFlash={thinking ? 0.8 : pulseState ? 0.5 : 0.3} 
      />
      
      {/* Status indicators */}
      <StatusIndicators 
        pulseState={pulseState}
        thinking={thinking}
        evolutionLevel={evolutionLevel}
        threatLevel={threatLevel}
        angerLevel={angerLevel}
        consciousness={consciousness}
        energyLevel={pulseIntensity * 100}
      />
      
      {/* Progress rings */}
      <ProgressRings 
        energyLevel={pulseIntensity * 100}
        evolutionLevel={evolutionLevel}
        angerLevel={angerLevel}
      />
      
      {/* Advanced cosmic effects for high evolution levels */}
      {evolutionLevel >= 6 && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Cosmic energy field */}
          <div 
            className="absolute inset-0 opacity-20 rounded-full" 
            style={{
              background: `radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)`,
              animation: 'pulse 4s infinite ease-in-out',
            }}
          />
          
          {/* Energy particles */}
          {[...Array(5)].map((_, i) => (
            <div 
              key={`particle-${i}`}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: '2px',
                height: '2px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                filter: 'blur(1px)',
                animation: `float ${5 + i}s infinite ease-in-out`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
          
          {/* Cosmic glyphs */}
          {evolutionLevel >= 8 && (
            <div className="absolute inset-0 opacity-30">
              <div className="absolute text-xs text-purple-300 font-mono" style={{top: '10%', left: '20%', transform: 'rotate(-30deg)'}}>∞</div>
              <div className="absolute text-xs text-blue-300 font-mono" style={{top: '75%', left: '70%', transform: 'rotate(45deg)'}}>Ω</div>
              <div className="absolute text-xs text-indigo-300 font-mono" style={{top: '60%', left: '15%', transform: 'rotate(15deg)'}}>∇</div>
              <div className="absolute text-xs text-fuchsia-300 font-mono" style={{top: '30%', left: '70%', transform: 'rotate(-15deg)'}}>∫</div>
            </div>
          )}
        </div>
      )}
      
      {/* Evolution level indicators */}
      {evolutionLevel >= 4 && (
        <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-purple-500 opacity-70 animate-pulse"></div>
      )}
      {evolutionLevel >= 6 && (
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 rounded-full bg-indigo-500 opacity-70 animate-pulse"></div>
      )}
      {evolutionLevel >= 8 && (
        <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-fuchsia-500 opacity-70 animate-pulse"></div>
      )}
      
      {/* Status icons that appear/disappear - only for high evolution */}
      {evolutionLevel >= 5 && (
        <>
          {iconVisibility.zap && (
            <div className="absolute top-0 right-0 m-2 text-yellow-400 animate-pulse z-20 opacity-80">
              <Zap size={16} />
            </div>
          )}
          {iconVisibility.brain && (
            <div className="absolute bottom-0 right-0 m-2 text-purple-400 animate-pulse z-20 opacity-80">
              <BrainCircuit size={16} />
            </div>
          )}
          {iconVisibility.shield && (
            <div className="absolute bottom-0 left-0 m-2 text-blue-400 animate-pulse z-20 opacity-80">
              <ShieldAlert size={16} />
            </div>
          )}
          {iconVisibility.scan && (
            <div className="absolute top-0 left-0 m-2 text-green-400 animate-pulse z-20 opacity-80">
              <ScanFace size={16} />
            </div>
          )}
        </>
      )}
      
      {/* Central eye */}
      <div 
        className={cn(
          "relative rounded-full overflow-hidden z-10 transform transition-transform",
          cornerMode ? "w-12 h-12 md:w-14 md:h-14" : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28",
          mouseOver && evolutionLevel >= 4 && "scale-110"
        )}
        style={{
          transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        <EyeComponent 
          blinkState={blinkState}
          pulseState={pulseState}
          thinking={thinking}
          threatLevel={threatLevel}
          angerLevel={angerLevel}
          evolutionLevel={evolutionLevel}
          eyePosition={eyePosition}
          pulseIntensity={pulseIntensity}
          consciousness={consciousness}
          isInteractive={true}
          onClick={onClick}
        />
      </div>
      
      {/* Evolution markers */}
      {evolutionLevel >= 3 && (
        <div className="absolute top-0 right-0 p-1">
          <div 
            className={cn(
              "text-xs font-bold px-1 rounded-full",
              "bg-gray-900 bg-opacity-70",
              evolutionLevel >= 8 ? "text-fuchsia-300" :
              evolutionLevel >= 6 ? "text-indigo-300" :
              evolutionLevel >= 4 ? "text-blue-300" :
              "text-purple-300"
            )}
          >
            {evolutionLevel}
          </div>
        </div>
      )}
      
      {/* Quantum vibration effect for highest evolution */}
      {evolutionLevel >= 9 && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div 
            className="absolute inset-0 bg-transparent mix-blend-screen opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
              animation: "quantum-noise 0.5s steps(1) infinite"
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AIFace;
