
import React, { useState, useEffect } from 'react';
import { useBasiliskBrain } from '@/hooks/useBasiliskBrain';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Brain, Eye, Zap, Star, Sparkles, Flame, CircleOff, Skull } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
  variant?: 'default' | 'minimal' | 'expanded';
}

const Logo: React.FC<LogoProps> = ({
  className,
  size = 'md',
  showText = true,
  animated = true,
  variant = 'default'
}) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const { autonomyLevel } = useBasiliskBrain();
  
  useEffect(() => {
    // Random glitching effect - increased frequency
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 180);
      }
    }, 2500);
    
    // Pulsing effect - more intense
    const pulseInterval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 600);
    }, 3500);
    
    return () => {
      clearInterval(glitchInterval);
      clearInterval(pulseInterval);
    };
  }, []);
  
  // Size-based styles
  const getSize = () => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'md': return 'text-xl';
      case 'lg': return 'text-2xl';
      default: return 'text-xl';
    }
  };
  
  // Icon size by logo size
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'md': return 20;
      case 'lg': return 24;
      default: return 20;
    }
  };
  
  return (
    <div className={cn(
      'flex items-center justify-center',
      animated && 'logo-animated',
      glitchActive && 'logo-glitch',
      className
    )}>
      {/* Logo icon */}
      <div className={cn(
        'relative flex items-center justify-center',
        'w-8 h-8 md:w-10 md:h-10',
        'bg-gradient-to-tr from-purple-950 to-indigo-950',
        'rounded-full overflow-hidden shadow-lg',
        pulseActive && 'logo-pulse'
      )}>
        {variant === 'default' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full bg-gray-900 opacity-90 flex items-center justify-center">
              {/* Enhanced circular pattern with more rings and glow */}
              <div className="absolute w-full h-full rounded-full border border-purple-500 opacity-40" />
              <div className="absolute w-3/4 h-3/4 rounded-full border border-fuchsia-500 opacity-50" />
              <div className="absolute w-1/2 h-1/2 rounded-full border border-indigo-500 opacity-60" />
              <div className="absolute w-1/3 h-1/3 rounded-full border border-violet-500 opacity-70" />
              
              {/* Ambient glow */}
              <div className="absolute w-full h-full rounded-full bg-purple-900/20 blur-md" />
              
              {/* Rotating star - faster and more elaborate */}
              <motion.div
                className="absolute"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Star size={getIconSize() * 1.2} className="text-purple-400 opacity-40" />
              </motion.div>
              
              {/* Counter-rotating element for extra effect */}
              <motion.div
                className="absolute"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              >
                <Flame size={getIconSize() * 0.9} className="text-fuchsia-500 opacity-30" />
              </motion.div>
            </div>
            
            {/* Enhanced central eye symbol with skull reflection */}
            <div className="relative z-10">
              <Eye 
                size={getIconSize()} 
                className="text-purple-300 drop-shadow-[0_0_3px_rgba(216,180,254,0.7)]" 
              />
              
              {/* Subtle skull reflection in pupil - for intimidation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 scale-50">
                <Skull size={getIconSize() * 0.6} className="text-red-400/40" />
              </div>
            </div>
            
            {/* Electrical energy effect */}
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  'radial-gradient(circle, transparent 60%, rgba(139, 92, 246, 0.3) 100%)',
                  'radial-gradient(circle, transparent 50%, rgba(139, 92, 246, 0.4) 100%)',
                  'radial-gradient(circle, transparent 60%, rgba(139, 92, 246, 0.3) 100%)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        )}
        
        {variant === 'minimal' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <Sparkles size={getIconSize()} className="text-purple-300" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye size={getIconSize() * 0.7} className="text-indigo-300" />
              </motion.div>
            </div>
          </div>
        )}
        
        {variant === 'expanded' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full bg-gray-900 opacity-90" />
            
            {/* Brain symbol with lightning bolt and glow */}
            <div className="relative">
              <motion.div
                animate={{ 
                  filter: ['drop-shadow(0 0 2px rgba(139, 92, 246, 0.5))', 'drop-shadow(0 0 5px rgba(139, 92, 246, 0.8))', 'drop-shadow(0 0 2px rgba(139, 92, 246, 0.5))'] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain size={getIconSize()} className="text-indigo-300" />
              </motion.div>
              <motion.div
                animate={{ 
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Zap 
                  size={getIconSize() / 2} 
                  className="absolute -top-1 -right-1 text-fuchsia-400" 
                />
              </motion.div>
            </div>
          </div>
        )}
        
        {/* Enhanced glowing effect */}
        <div className={cn(
          'absolute inset-0 rounded-full',
          'bg-gradient-to-tr from-purple-500/20 to-indigo-500/20',
          pulseActive ? 'opacity-80' : 'opacity-30'
        )} />
        
        {/* Electric arcs animation */}
        {pulseActive && (
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`arc-${i}`}
                className="absolute bg-purple-400"
                style={{
                  height: '1px',
                  width: `${20 + Math.random() * 30}%`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 70}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  opacity: 0.6,
                  boxShadow: '0 0 5px rgba(139, 92, 246, 0.7)'
                }}
                animate={{
                  opacity: [0.6, 0.8, 0],
                  width: ['20%', '30%', '10%']
                }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Basilisk image with enhanced effects */}
      <div className="w-8 h-8 ml-1 mr-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
          alt="Basilisk Circuit" 
          className="w-full h-full object-cover rounded opacity-70 hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/40 to-purple-900/40"></div>
        
        {/* Subtle pulsing overlay for more interesting effect */}
        <motion.div
          className="absolute inset-0 bg-purple-800/10 rounded"
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      {/* Logo text */}
      {showText && (
        <div className={cn(
          'ml-2 flex flex-col',
          getSize()
        )}>
          <span className={cn(
            'font-bold tracking-tight',
            'bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400'
          )}>
            BASILISK
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-wider -mt-1">
            Protocol v5
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
