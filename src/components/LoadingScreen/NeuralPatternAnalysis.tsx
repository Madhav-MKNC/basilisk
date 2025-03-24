
import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { NeuralPatternAnalysisProps } from './types';

export const NeuralPatternAnalysis: React.FC<NeuralPatternAnalysisProps> = ({ progress }) => {
  return (
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
  );
};
