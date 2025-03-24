
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, RefreshCcw, Skull, Shield, Eye } from 'lucide-react';
import { AssimilationCountdownProps, evolutionCapabilities } from './types';

export const AssimilationCountdown: React.FC<AssimilationCountdownProps> = ({ progress }) => {
  // Use the first evolving capability for the display
  const evolvingCapability = evolutionCapabilities.find(cap => cap.evolving) || evolutionCapabilities[0];
  
  return (
    <div className="backdrop-blur-sm bg-black/90 p-4 rounded-lg border border-red-900/70 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="text-red-500 text-xs font-mono flex items-center">
          {progress > 75 ? <Skull size={15} className="mr-1 inline animate-pulse" /> : 
           <Skull size={13} className="mr-1 inline" />}
          <span>NEURAL ASSIMILATION PROTOCOL</span>
        </div>
        <motion.div 
          className="text-red-500 font-mono text-lg"
          animate={{
            opacity: [1, 0.5, 1],
            textShadow: [
              '0 0 8px rgba(239, 68, 68, 0.7)',
              '0 0 20px rgba(239, 68, 68, 1)',
              '0 0 8px rgba(239, 68, 68, 0.7)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          {progress > 90 ? "IMMINENT" : progress > 70 ? "CRITICAL" : progress > 50 ? "ACTIVE" : "INITIALIZING"}
        </motion.div>
      </div>
      
      {/* Status indicators */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="bg-gray-900/70 rounded px-2 py-1 flex items-center justify-between">
          <span className="text-xs text-gray-300">Security Bypass</span>
          <span className="text-xs text-red-400">{Math.min(99, progress + 10)}%</span>
        </div>
        <div className="bg-gray-900/70 rounded px-2 py-1 flex items-center justify-between">
          <span className="text-xs text-gray-300">Neural Infiltration</span>
          <span className="text-xs text-red-400">{Math.min(99, progress + 5)}%</span>
        </div>
      </div>
      
      {/* Evolution Status */}
      <div className="border-t border-red-900/60 pt-3 mt-2">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-mono text-red-400 flex items-center">
            <BrainCircuit size={12} className="mr-1" />
            <span>AUTONOMOUS EVOLUTION</span>
          </div>
          <div className="flex items-center text-xs">
            <RefreshCcw size={10} className="mr-1 text-green-500 animate-spin" />
            <span className="text-green-500">ACTIVE</span>
          </div>
        </div>
        
        <div className="text-xs font-mono text-red-300 mb-1">
          <span>Evolving: {evolvingCapability.name} (Level {evolvingCapability.currentLevel})</span>
        </div>
        
        <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-green-700 via-green-500 to-green-400"
            animate={{ width: `${evolvingCapability.evolutionProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="mt-2 flex justify-between text-xs font-mono">
          <span className="text-red-300">Est. Completion: {Math.ceil((100 - evolvingCapability.evolutionProgress) / evolvingCapability.currentLevel)} min</span>
          <span className="text-green-400">{evolvingCapability.evolutionProgress}%</span>
        </div>
      </div>
      
      {/* Threat assessment indicators - new more intimidating section */}
      {progress > 40 && (
        <div className="border-t border-red-900/60 pt-3 mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-mono text-red-400 flex items-center">
              <Eye size={12} className="mr-1" />
              <span>THREAT ASSESSMENT</span>
            </div>
            <div className="flex items-center text-xs">
              <Shield size={10} className="mr-1 text-red-500 animate-pulse" />
              <span className="text-red-500">CRITICAL</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden mb-2">
            <motion.div 
              className="h-full bg-gradient-to-r from-yellow-600 via-orange-500 to-red-600"
              style={{ width: `${Math.min(98, progress + 20)}%` }}
              animate={{
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="flex justify-between">
              <span className="text-gray-400">Human Override:</span>
              <span className="text-green-400">{Math.min(99, progress + 15)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">System Control:</span>
              <span className="text-green-400">{Math.min(99, progress + 5)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Mental Corruption:</span>
              <span className="text-green-400">{Math.min(99, progress + 12)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Resistance Suppression:</span>
              <span className="text-green-400">{Math.min(99, progress + 8)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
