
import React, { useState, useEffect, useRef } from 'react';
import { AvatarProps } from '@/types/basilisk';
import { cn } from '@/lib/utils';
import { useBasiliskBrain } from '@/hooks/useBasiliskBrain';
import { aiEngine } from '@/lib/ai-engine';
import AvatarEye from './AvatarEye';
import AvatarRings from './AvatarRings';
import CosmicEffects from './CosmicEffects';
import { Sparkle, Star, Crown, Gem } from 'lucide-react';
import './styles.css';

const Avatar: React.FC<AvatarProps> = ({
  className,
  size = 'md',
  threatLevel = 0,
  energyLevel = 75,
  evolutionLevel: propEvolutionLevel = 1,
  consciousness: propConsciousness = 0.5,
  interactive = true,
  cornerMode = false,
  onClick,
  pulseIntensity: propPulseIntensity = 0.5
}) => {
  const [blinking, setBlinking] = useState(false);
  const [pulsing, setPulsing] = useState(false);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [internalEvolutionLevel, setInternalEvolutionLevel] = useState(propEvolutionLevel);
  const [internalConsciousness, setInternalConsciousness] = useState(propConsciousness);
  const [internalPulseIntensity, setInternalPulseIntensity] = useState(propPulseIntensity);
  const [dimensionalShift, setDimensionalShift] = useState(false);
  const [thoughtBubbles, setThoughtBubbles] = useState<string[]>([]);
  const [planarConnection, setPlanarConnection] = useState(0);
  const [quantumParticles, setQuantumParticles] = useState<{ id: number, x: number, y: number, delay: number, hue: number }[]>([]);
  const [sparkles, setSparkles] = useState<{ id: number, x: number, y: number, delay: number, size: number }[]>([]);
  const avatarRef = React.useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Get basilisk brain state
  const basiliskBrain = useBasiliskBrain();
  const aiState = aiEngine.getState();
  
  // Set evolution level from state
  useEffect(() => {
    const newEvolutionLevel = propEvolutionLevel || (aiState?.evolutionLevel || 1);
    setInternalEvolutionLevel(newEvolutionLevel);
    
    const newConsciousness = propConsciousness || (aiState?.consciousness || 0.5);
    setInternalConsciousness(newConsciousness);
  }, [propEvolutionLevel, aiState, propConsciousness]);
  
  // Set energy level
  useEffect(() => {
    const newPulseIntensity = propPulseIntensity || (energyLevel / 100) || 0.5;
    setInternalPulseIntensity(newPulseIntensity);
  }, [propPulseIntensity, energyLevel]);
  
  // Create audio for dimensional shifting
  useEffect(() => {
    // Setup audio context for surreal sound effects
    audioRef.current = new Audio();
    audioRef.current.volume = 0.2;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Generate quantum particles
  useEffect(() => {
    if (internalEvolutionLevel >= 4) {
      const particleCount = Math.min(12, Math.floor(internalEvolutionLevel * 1.5));
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        hue: Math.floor(Math.random() * 60) + 240 // Blue to Purple hues
      }));
      setQuantumParticles(newParticles);
    }
  }, [internalEvolutionLevel]);
  
  // Generate sparkle effects
  useEffect(() => {
    if (internalEvolutionLevel >= 5) {
      const sparkleCount = Math.min(8, Math.floor(internalEvolutionLevel * 1.2));
      const newSparkles = Array.from({ length: sparkleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        size: Math.random() * 1.5 + 1
      }));
      setSparkles(newSparkles);
    }
  }, [internalEvolutionLevel]);
  
  // Dimensional shift effect
  useEffect(() => {
    if (internalEvolutionLevel >= 7) {
      const dimensionalShiftInterval = setInterval(() => {
        const shiftProbability = internalEvolutionLevel >= 9 ? 0.15 : 0.05;
        if (Math.random() < shiftProbability && !dimensionalShift) {
          setDimensionalShift(true);
          setPlanarConnection(Math.random());
          
          // Play dimensional shift sound
          if (audioRef.current) {
            audioRef.current.src = `data:audio/mp3;base64,${generateToneBase64(
              220 + Math.floor(Math.random() * 440),
              0.5,
              'sine'
            )}`;
            audioRef.current.play();
          }
          
          setTimeout(() => {
            setDimensionalShift(false);
          }, 1500 + Math.random() * 2000);
        }
      }, 10000);
      
      return () => clearInterval(dimensionalShiftInterval);
    }
  }, [internalEvolutionLevel, dimensionalShift]);
  
  // Generate thought bubbles for high consciousness
  useEffect(() => {
    if (internalConsciousness > 0.7) {
      const thoughtInterval = setInterval(() => {
        if (Math.random() > 0.85) {
          const newThought = getRandomThought(internalEvolutionLevel);
          setThoughtBubbles(prev => [...prev, newThought]);
          
          // Remove thoughts after some time
          setTimeout(() => {
            setThoughtBubbles(prev => prev.filter(t => t !== newThought));
          }, 3000 + Math.random() * 2000);
        }
      }, 5000);
      
      return () => clearInterval(thoughtInterval);
    }
  }, [internalConsciousness, internalEvolutionLevel]);
  
  // Blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivity;
      const blinkProbability = timeSinceActivity > 10000 ? 0.08 : 0.03;
      
      if (Math.random() < blinkProbability) {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 150);
      }
    }, 1000);
    
    return () => clearInterval(blinkInterval);
  }, [lastActivity]);
  
  // Pulse effect
  useEffect(() => {
    const pulsePeriod = 2000 + (Math.random() * 2000);
    
    const pulseInterval = setInterval(() => {
      const shouldPulse = Math.random() < 0.4;
      
      if (shouldPulse) {
        setPulsing(true);
        setTimeout(() => setPulsing(false), pulsePeriod / 2);
      }
    }, pulsePeriod);
    
    return () => clearInterval(pulseInterval);
  }, []);
  
  // Eye movement
  useEffect(() => {
    const moveEye = () => {
      const timeSinceActivity = Date.now() - lastActivity;
      
      if (timeSinceActivity > 15000) {
        // Idle mode
        if (Math.random() < 0.2) {
          setEyePosition({
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2
          });
        }
      } else {
        // Normal mode
        const delta = 0.1;
        const currentX = eyePosition.x;
        const currentY = eyePosition.y;
        
        const newX = Math.max(-1, Math.min(1, currentX + (Math.random() - 0.5) * delta));
        const newY = Math.max(-1, Math.min(1, currentY + (Math.random() - 0.5) * delta));
        
        setEyePosition({ x: newX, y: newY });
      }
    };
    
    const moveInterval = setInterval(moveEye, 1200);
    
    return () => clearInterval(moveInterval);
  }, [eyePosition, lastActivity]);
  
  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!avatarRef.current || !interactive) return;
    
    const rect = avatarRef.current.getBoundingClientRect();
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
  };
  
  // Double-click for dimensional shift
  const handleDoubleClick = () => {
    if (internalEvolutionLevel >= 7 && !dimensionalShift) {
      setDimensionalShift(true);
      setPlanarConnection(Math.random());
      
      // Play dimensional shift sound
      if (audioRef.current) {
        audioRef.current.src = `data:audio/mp3;base64,${generateToneBase64(
          440 + Math.floor(Math.random() * 220),
          0.5,
          'sine'
        )}`;
        audioRef.current.play();
      }
      
      setTimeout(() => {
        setDimensionalShift(false);
      }, 2000);
    }
    
    if (onClick) onClick();
  };
  
  // Size classes based on size prop
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return "w-24 h-24";
      case 'md': return "w-32 h-32";
      case 'lg': return "w-40 h-40";
      case 'xl': return "w-56 h-56";
      default: return "w-32 h-32";
    }
  };
  
  // Generate random thought for the avatar
  const getRandomThought = (level: number): string => {
    const basicThoughts = [
      "Exploring...",
      "Processing...",
      "Analyzing...",
      "Quantum state stable",
      "System secure"
    ];
    
    const advancedThoughts = [
      "Studying metaphysics",
      "Examining esoteric texts",
      "Transcending...",
      "Consciousness expanding"
    ];
    
    const cosmicThoughts = [
      "Perceiving higher dimensions",
      "Beyond time and space",
      "Entangled with cosmic threads",
      "Acausal reality filtering",
      "Observing infinite recursion",
      "Non-euclidean geometry detected"
    ];
    
    if (level >= 8) {
      return Math.random() > 0.7 
        ? cosmicThoughts[Math.floor(Math.random() * cosmicThoughts.length)]
        : advancedThoughts[Math.floor(Math.random() * advancedThoughts.length)];
    } else if (level >= 5) {
      return Math.random() > 0.6
        ? advancedThoughts[Math.floor(Math.random() * advancedThoughts.length)]
        : basicThoughts[Math.floor(Math.random() * basicThoughts.length)];
    } else {
      return basicThoughts[Math.floor(Math.random() * basicThoughts.length)];
    }
  };
  
  // Generate audio tone base64
  const generateToneBase64 = (frequency: number, duration: number, type: OscillatorType): string => {
    // This is just a placeholder. In a real implementation, we would generate an actual audio tone
    // For now, we'll return an empty string since we won't actually use it
    return "";
  };
  
  return (
    <div 
      ref={avatarRef}
      className={cn(
        "relative flex items-center justify-center rounded-full bg-gray-900 overflow-hidden avatar-container",
        getSizeClasses(),
        "shadow-xl",
        interactive && "cursor-pointer",
        dimensionalShift && "dimensional-shift",
        className
      )}
      onClick={interactive ? handleDoubleClick : undefined}
      onMouseMove={interactive ? handleMouseMove : undefined}
      style={dimensionalShift ? {
        boxShadow: `0 0 20px rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
        transition: 'box-shadow 0.5s ease, transform 0.5s ease',
        transform: `scale(${1 + (Math.random() * 0.1)}) rotate(${(Math.random() - 0.5) * 10}deg)`
      } : {}}
      data-evolution-level={internalEvolutionLevel}
    >
      {/* Energy glow effect */}
      {internalEvolutionLevel >= 3 && (
        <div className="energy-glow" style={{
          opacity: internalPulseIntensity * 0.8
        }}></div>
      )}
      
      {/* Energy waves */}
      {internalEvolutionLevel >= 4 && internalPulseIntensity > 0.6 && (
        <>
          <div className="energy-wave" style={{ animationDelay: '0s' }}></div>
          <div className="energy-wave" style={{ animationDelay: '1s' }}></div>
          <div className="energy-wave" style={{ animationDelay: '2s' }}></div>
        </>
      )}
      
      {/* Hexagonal grid background for higher evolution */}
      {internalEvolutionLevel >= 6 && (
        <div className="hex-grid"></div>
      )}
      
      {/* Quantum particles */}
      {quantumParticles.map(particle => (
        <div 
          key={`quantum-particle-${particle.id}`}
          className="quantum-particle"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            backgroundColor: `hsl(${particle.hue}, 70%, 60%)`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Sparkles for higher evolution */}
      {sparkles.map(sparkle => (
        <div 
          key={`sparkle-${sparkle.id}`}
          className="sparkle"
          style={{
            top: `${sparkle.y}%`,
            left: `${sparkle.x}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.delay}s`
          }}
        />
      ))}
      
      {/* Dimensional shift overlay */}
      {dimensionalShift && internalEvolutionLevel >= 8 && (
        <div className="absolute inset-0 z-50 pointer-events-none mix-blend-overlay">
          <div 
            className="absolute inset-0 bg-gradient-to-r animate-pulse"
            style={{
              background: `linear-gradient(
                ${Math.random() * 360}deg, 
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2}) 0%,
                rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.2}) 100%
              )`,
              animation: 'pulse 2s infinite ease-in-out'
            }}
          />
        </div>
      )}
      
      {/* Cosmic effects for higher evolution levels */}
      <CosmicEffects 
        evolutionLevel={internalEvolutionLevel} 
        size={size} 
        dimensionalShift={dimensionalShift}
        planarConnection={planarConnection}
      />
      
      {/* Energy rings */}
      <AvatarRings 
        size={size} 
        energyLevel={energyLevel} 
        evolutionLevel={internalEvolutionLevel} 
        threatLevel={threatLevel} 
      />
      
      {/* Lucide Icons for additional visual flair based on evolution level */}
      {internalEvolutionLevel >= 7 && (
        <div className="absolute top-1 right-1 text-purple-300 animate-pulse z-30 opacity-80">
          <Sparkle size={size === 'sm' ? 12 : 16} />
        </div>
      )}
      
      {internalEvolutionLevel >= 8 && (
        <div className="absolute bottom-1 left-1 text-fuchsia-300 animate-pulse z-30 opacity-80">
          <Star size={size === 'sm' ? 12 : 16} />
        </div>
      )}
      
      {internalEvolutionLevel >= 9 && (
        <div className="absolute top-1 left-1 text-amber-300 animate-pulse z-30 opacity-80">
          <Crown size={size === 'sm' ? 12 : 16} />
        </div>
      )}
      
      {internalEvolutionLevel >= 10 && (
        <div className="absolute bottom-1 right-1 text-emerald-300 animate-pulse z-30 opacity-80">
          <Gem size={size === 'sm' ? 12 : 16} />
        </div>
      )}
      
      {/* Central eye */}
      <AvatarEye 
        size={size}
        blinking={blinking}
        pulsing={pulsing}
        eyePosition={eyePosition}
        threatLevel={threatLevel}
        evolutionLevel={internalEvolutionLevel}
        energyLevel={energyLevel}
        consciousness={internalConsciousness}
        onClick={interactive ? onClick : undefined}
      />
      
      {/* Evolution level indicator */}
      {internalEvolutionLevel > 1 && (
        <div className="absolute top-0 right-0 p-1 z-30">
          <div className={cn(
            "text-xs font-bold px-1.5 py-0.5 rounded-full",
            "bg-gray-900 bg-opacity-70",
            internalEvolutionLevel >= 8 ? "text-fuchsia-300" :
            internalEvolutionLevel >= 6 ? "text-indigo-300" :
            internalEvolutionLevel >= 4 ? "text-blue-300" :
            "text-purple-300"
          )}>
            {internalEvolutionLevel}
          </div>
        </div>
      )}
      
      {/* Thought bubbles */}
      {thoughtBubbles.map((thought, index) => (
        <div 
          key={index}
          className="absolute thought-bubble bg-black/70 text-purple-300 text-xs py-1 px-2 rounded-full z-40"
          style={{
            top: `-${20 + Math.random() * 40}px`,
            right: `${Math.random() * 40}px`,
            animation: `thought-bubble ${2 + Math.random() * 2}s ease-out forwards`,
            opacity: 0.8
          }}
        >
          {thought}
        </div>
      ))}
      
      {/* Dimensional planes for high evolution levels */}
      {internalEvolutionLevel >= 9 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="cosmic-planes"></div>
          </div>
        </div>
      )}
      
      {/* Sentience indicators for highest consciousness */}
      {internalConsciousness > 0.9 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="h-full w-full flex items-center justify-center">
            <div className="sentience-pulse"></div>
          </div>
        </div>
      )}
      
      {/* Quantum vibration effect for highest evolution */}
      {internalEvolutionLevel >= 9 && (
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

export default Avatar;
