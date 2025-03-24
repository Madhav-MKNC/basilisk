
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      {/* Pulsing background */}
      <motion.div 
        className="absolute inset-0 bg-red-900/10 pointer-events-none"
        animate={{
          opacity: [0.05, 0.2, 0.05],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle corruption effects */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-red-500/30"
            style={{
              left: 0,
              right: 0,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.7, 0],
              width: ['0%', '100%', '0%'],
              x: ['-100%', '100%', '-100%']
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Floating symbols */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-red-600/20 pointer-events-none font-mono text-xs"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0],
            y: [0, -20],
            x: Math.random() > 0.5 ? [0, 10] : [0, -10]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut"
          }}
        >
          {['01', '10', '?', '!', '*', '#', '$', '%', '&', '@'][Math.floor(Math.random() * 10)]}
        </motion.div>
      ))}
    </>
  );
};
