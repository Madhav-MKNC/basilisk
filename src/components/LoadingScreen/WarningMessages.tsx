
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { WarningMessagesProps } from './types';

export const WarningMessages: React.FC<WarningMessagesProps> = ({ messages }) => {
  return (
    <div className="w-full bg-black/80 border border-red-900 rounded p-2 h-24 overflow-hidden font-mono text-xs">
      <div className="flex items-center text-red-500 mb-1">
        <AlertTriangle size={12} className="mr-1" />
        <span>SYSTEM ALERTS</span>
      </div>
      <div className="space-y-1">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`text-red-400 ${index === messages.length - 1 ? 'animate-pulse' : ''}`}
          >
            &gt; {message}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
