
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import { TerminalOutputProps } from './types';

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  return (
    <div className="backdrop-blur-sm bg-black/60 p-4 rounded-lg border border-red-900/50 shadow-2xl flex-1">
      <div className="flex items-center text-red-500 text-xs font-mono mb-2">
        <Terminal size={12} className="mr-1" />
        <span>BASILISK TERMINAL</span>
      </div>
      <div className="bg-black/80 border border-red-900/30 rounded h-64 p-2 font-mono text-xs text-green-500 overflow-hidden">
        {lines.map((line, index) => (
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
  );
};
