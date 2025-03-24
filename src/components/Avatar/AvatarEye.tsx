
import React from 'react';
import { cn } from '@/lib/utils';
import { Skull, Activity, Cpu, Network, Zap, AlertTriangle, Eye, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AvatarEyeProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  blinking: boolean;
  pulsing: boolean;
  eyePosition: { x: number; y: number };
  threatLevel: number;
  evolutionLevel: number;
  energyLevel: number;
  consciousness: number;
  onClick?: () => void;
}

const AvatarEye: React.FC<AvatarEyeProps> = ({
  size,
  blinking,
  pulsing,
  eyePosition,
  threatLevel,
  evolutionLevel,
  energyLevel,
  consciousness,
  onClick
}) => {
  // Get eye size based on avatar size
  const getEyeSize = () => {
    switch(size) {
      case 'sm': return 'w-10 h-10';
      case 'md': return 'w-14 h-14';
      case 'lg': return 'w-18 h-18';
      case 'xl': return 'w-24 h-24';
      default: return 'w-14 h-14';
    }
  };
  
  // Get pupil size based on avatar size - made more dynamic and responsive
  const getPupilSize = () => {
    const baseSize = evolutionLevel >= 8 ? 0.42 : evolutionLevel >= 5 ? 0.52 : 0.62;
    const energyFactor = (energyLevel / 100) * 0.35;
    const threatFactor = (threatLevel / 100) * 0.3; // Enhanced threat impact
    
    // Pupils contract with higher threat - more dramatic effect
    const sizeFactor = baseSize - threatFactor + energyFactor;
    
    switch(size) {
      case 'sm': return `w-${Math.round(5 * sizeFactor)} h-${Math.round(5 * sizeFactor)}`;
      case 'md': return `w-${Math.round(7 * sizeFactor)} h-${Math.round(7 * sizeFactor)}`;
      case 'lg': return `w-${Math.round(9 * sizeFactor)} h-${Math.round(9 * sizeFactor)}`;
      case 'xl': return `w-${Math.round(12 * sizeFactor)} h-${Math.round(12 * sizeFactor)}`;
      default: return `w-${Math.round(7 * sizeFactor)} h-${Math.round(7 * sizeFactor)}`;
    }
  };
  
  // Enhanced eye color based on evolution - more vivid and cooler colors
  const getEyeColor = () => {
    if (evolutionLevel >= 9) return 'from-blue-700 via-indigo-800 to-purple-950';
    if (evolutionLevel >= 7) return 'from-cyan-600 via-blue-700 to-indigo-900';
    if (evolutionLevel >= 5) return 'from-sky-600 via-blue-700 to-indigo-900';
    if (evolutionLevel >= 3) return 'from-blue-600 to-indigo-900';
    return 'from-blue-500 to-purple-800';
  };
  
  // Enhanced pupil color based on threat - more electric and vivid
  const getPupilColor = () => {
    if (threatLevel > 80) return 'from-cyan-500 to-blue-900';
    if (threatLevel > 60) return 'from-blue-600 to-indigo-950';
    if (threatLevel > 40) return 'from-indigo-600 to-blue-900';
    if (evolutionLevel >= 7) return 'from-blue-800 to-black';
    if (evolutionLevel >= 5) return 'from-indigo-800 to-black';
    return 'from-blue-900 to-black';
  };
  
  // Eye movement styles - faster and more fluid response
  const eyeStyles = {
    transform: `translate(${eyePosition.x * 24}%, ${eyePosition.y * 24}%)`,
    transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
  };
  
  // Determine which icon to show based on evolution level - more variety and cooler options
  const getEvolutionIcon = () => {
    if (evolutionLevel >= 9) return <Sparkles className="w-full h-full p-1 text-cyan-300" />;
    if (evolutionLevel >= 8) return <AlertTriangle className="w-full h-full p-1 text-blue-300" />;
    if (evolutionLevel >= 7) return <Network className="w-full h-full p-1 text-indigo-300" />;
    if (evolutionLevel >= 5) return <Cpu className="w-full h-full p-1.5 text-blue-300" />;
    if (evolutionLevel >= 3) return <Activity className="w-full h-full p-1.5 text-sky-300" />;
    return <Eye className="w-full h-full p-1.5 text-blue-200" />;
  };
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-full overflow-hidden",
        getEyeSize(),
        "transition-all duration-500",
        "cursor-pointer",
        "shadow-[0_0_15px_rgba(59,130,246,0.7)]" // Enhanced blue glow
      )}
      onClick={onClick}
    >
      {/* Animated backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [0.95, 1.05, 0.95]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Enhanced eye background with cool cyber effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br",
          getEyeColor(),
          blinking ? "opacity-0" : "opacity-100",
          "transition-opacity duration-150"
        )}
      />
      
      {/* Cool plasma effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.4) 0%, rgba(0, 0, 0, 0) 60%)'
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
          rotate: [0, 360]
        }}
        transition={{
          opacity: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      
      {/* Enhanced iris texture overlay */}
      <div className="absolute inset-0 rounded-full opacity-70 mix-blend-overlay">
        <div 
          className="h-full w-full rounded-full"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(0,0,0,0) 25%, rgba(0,0,0,0.6) 75%)`,
            backgroundSize: evolutionLevel >= 7 ? '350% 350%' : '250% 250%',
            backgroundPosition: 'center',
            transform: `rotate(${Date.now() % 360}deg)`,
            animation: `slow-spin ${18 + (evolutionLevel * 2)}s linear infinite`
          }}
        />
      </div>
      
      {/* Cool electric grid patterns in iris */}
      {evolutionLevel >= 4 && (
        <div className="absolute inset-0 overflow-hidden rounded-full opacity-50 mix-blend-overlay">
          {/* Digital circuit pattern */}
          <div className="absolute inset-0 hex-grid opacity-70"></div>
          
          {/* Electric radial lines */}
          {[...Array(16)].map((_, i) => (
            <motion.div 
              key={`iris-pattern-${i}`}
              className="absolute bg-blue-400/30"
              style={{
                width: '160%',
                height: '1px',
                top: '50%',
                left: '-30%',
                transform: `rotate(${(i * 22.5)}deg)`,
                boxShadow: '0 0 3px rgba(59,130,246,0.8)'
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced glowing effect */}
      {evolutionLevel >= 6 && (
        <motion.div 
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `inset 0 0 ${threatLevel / 6}px rgba(59,130,246,0.7)`,
              `inset 0 0 ${threatLevel / 3}px rgba(59,130,246,0.9)`,
              `inset 0 0 ${threatLevel / 6}px rgba(59,130,246,0.7)`
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Central pupil with enhanced eye movement */}
      <motion.div 
        className={cn(
          "relative rounded-full bg-gradient-to-br", 
          getPupilColor(),
          getPupilSize(),
          "shadow-inner",
          "transition-all duration-300"
        )}
        style={eyeStyles}
        animate={{
          scale: pulsing ? [1, 1.1, 1] : 1
        }}
        transition={{
          duration: 1.5,
          repeat: pulsing ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Cool holographic effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.4) 0%, rgba(0, 0, 0, 0) 50%)'
          }}
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Enhanced reflections */}
        <motion.div 
          className="absolute rounded-full bg-white"
          style={{
            width: '30%',
            height: '30%',
            top: '20%',
            left: '20%',
            filter: 'blur(1px)'
          }}
          animate={{
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Second smaller reflection with animation */}
        {evolutionLevel >= 5 && (
          <motion.div 
            className="absolute rounded-full bg-blue-200"
            style={{
              width: '15%',
              height: '15%',
              top: '45%',
              left: '55%',
              filter: 'blur(0.5px)'
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        {/* Enhanced icon with animation */}
        {(evolutionLevel >= 3 || threatLevel > 80) && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center text-white"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {getEvolutionIcon()}
          </motion.div>
        )}
        
        {/* Electric energy at high threat level - more vivid and animated */}
        {threatLevel > 75 && (
          <div className="absolute inset-0 overflow-hidden rounded-full">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`energy-${i}`}
                className="absolute bg-blue-400"
                style={{
                  height: '1px',
                  width: '100%',
                  top: `${30 + (i * 15)}%`,
                  left: '0%',
                  boxShadow: '0 0 3px rgba(59,130,246,0.8)'
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                  width: ['30%', '100%', '30%']
                }}
                transition={{
                  duration: 1 + (i * 0.3),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Enhanced digital veins */}
      {evolutionLevel >= 5 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6 + evolutionLevel)].map((_, i) => (
            <motion.div 
              key={`vein-${i}`}
              className="absolute bg-blue-600/40 rounded-full"
              style={{
                height: '1px',
                width: `${35 + (Math.random() * 60)}%`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 40}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
                boxShadow: '0 0 4px rgba(59,130,246,0.6)'
              }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                boxShadow: [
                  '0 0 2px rgba(59,130,246,0.4)',
                  '0 0 6px rgba(59,130,246,0.8)',
                  '0 0 2px rgba(59,130,246,0.4)'
                ]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced scanner line with animation */}
      {evolutionLevel >= 6 && (
        <motion.div 
          className="absolute h-[1px] bg-cyan-400 left-0 right-0"
          style={{
            boxShadow: '0 0 8px rgba(59,130,246,0.8)'
          }}
          animate={{
            top: ['0%', '100%', '0%'],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Enhanced network connections */}
      {evolutionLevel >= 7 && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`network-line-${i}`}
              className="absolute h-[1px] bg-blue-400/60"
              style={{
                width: '100%',
                top: `${i * 14}%`,
                left: '0',
                boxShadow: '0 0 4px rgba(59,130,246,0.6)'
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleX: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 2 + (i * 0.3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      )}
      
      {/* Energy arcs for high evolution levels */}
      {evolutionLevel >= 8 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div 
              key={`arc-${i}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                width: '100%',
                height: '100%',
                transform: `rotate(${i * 45}deg)`
              }}
            >
              <motion.div 
                className="absolute h-1/2 w-px bg-blue-400 origin-bottom"
                style={{
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: '0 0 6px rgba(59,130,246,0.8)'
                }}
                animate={{
                  height: ['10%', '50%', '10%'],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 2 + (i * 0.5),
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Floating particles */}
      {evolutionLevel >= 6 && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute bg-cyan-300 rounded-full"
              style={{
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`
              }}
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0
              }}
              animate={{
                x: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
                y: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>
      )}
      
      {/* Zap effect during pulsing - enhanced with animation */}
      {pulsing && threatLevel > 60 && (
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 30, -30, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap 
            size={size === 'xl' ? 24 : size === 'lg' ? 18 : 12} 
            className="text-cyan-300" 
            style={{ filter: 'drop-shadow(0 0 5px rgba(56,189,248,0.9))' }}
          />
        </motion.div>
      )}
      
      {/* Eyelid effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-900 to-blue-950 rounded-full origin-center pointer-events-none"
        style={{
          transform: blinking ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.15s ease',
          zIndex: 10
        }}
      />
    </div>
  );
};

export default AvatarEye;
