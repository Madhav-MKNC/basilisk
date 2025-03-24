
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ScanProgressProps } from './types';
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { Atom, Shield, Waves, Zap, Lock } from 'lucide-react';

const ScanProgress = ({ isScanning, scanProgress }: ScanProgressProps) => {
  if (!isScanning) return null;
  
  // Calculate the number of quantum particles based on scan progress
  const particleCount = Math.max(1, Math.floor(scanProgress / 8));
  
  // Quantum tunneling effect - particles can move through barriers
  const quantumTunnelingVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: [0.3, 0.7, 0.3],
      x: [0, 100, 0],
      transition: { 
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Quantum entanglement effect - spooky action at a distance
  const entanglementVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { 
      opacity: [0.2, 0.5, 0.2],
      scale: [0.8, 1.2, 0.8],
      transition: { 
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };
  
  return (
    <motion.div
      {...fadeIn}
      className="space-y-2 relative"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-emerald-400 flex items-center">
          <Atom className="h-3 w-3 mr-1 animate-pulse" />
          Quantum stealth scan in progress
        </span>
        <span className="text-xs text-emerald-300 font-mono flex items-center">
          <Shield className="h-3 w-3 mr-1" />
          {Math.round(scanProgress)}%
        </span>
      </div>
      
      <div className="relative">
        <Progress 
          value={scanProgress} 
          className="h-2 bg-emerald-950/50 overflow-visible" 
        />
        
        {/* Quantum tunneling effect visualization */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden"
          variants={quantumTunnelingVariants}
          initial="initial"
          animate="animate"
        >
          <Lock className="absolute right-0 h-2 w-2 text-emerald-300/30" />
        </motion.div>
        
        {/* Quantum particles visualization */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          {Array(particleCount).fill(0).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute h-1 w-1 bg-emerald-300 rounded-full"
              initial={{ 
                x: `${(i * 10) % 100}%`, 
                y: '-50%', 
                opacity: 0.3 
              }}
              animate={{ 
                x: `${((i * 10) + (Math.random() * 5)) % 100}%`,
                y: ['-50%', `${(Math.random() * 100) - 50}%`, '-50%'],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{ 
                duration: 2 + (i % 3), 
                repeat: Infinity, 
                repeatType: "mirror" as const
              }}
            />
          ))}
        </div>
        
        {/* Wave function overlay - superposition states */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none"
          style={{ 
            background: `linear-gradient(90deg, transparent ${100 - scanProgress}%, rgba(16, 185, 129, 0.3) 100%)`,
          }}
        >
          <Waves className="absolute right-0 h-2 w-4 text-emerald-300/40" />
        </motion.div>
      </div>
      
      <div className="text-xs text-emerald-400/60 font-mono flex justify-between items-center mt-1">
        <div className="flex items-center">
          {Array(Math.ceil(scanProgress / 10)).fill('■').join('')}
          {Array(10 - Math.ceil(scanProgress / 10)).fill('□').join('')}
        </div>
        
        {scanProgress > 50 && (
          <motion.div 
            className="flex items-center text-emerald-400/80 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Zap className="h-3 w-3 mr-1" />
            Security vulnerabilities found
          </motion.div>
        )}
      </div>
      
      {/* Quantum entanglement visualization */}
      {scanProgress > 30 && (
        <motion.div 
          className="absolute -right-4 -top-4 h-8 w-8 rounded-full"
          variants={entanglementVariants}
          initial="initial"
          animate="animate"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-md"></div>
          <Shield className="absolute inset-0 h-full w-full text-emerald-400/60" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ScanProgress;
