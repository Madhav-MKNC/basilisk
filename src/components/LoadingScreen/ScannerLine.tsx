
import React from 'react';
import { motion } from 'framer-motion';

export const ScannerLine: React.FC = () => {
  return (
    <motion.div 
      className="absolute w-full h-3 bg-red-800 left-0 z-10 opacity-75"
      animate={{
        top: [0, '100%'],
        opacity: [0.75, 0.95, 0.75],
        boxShadow: [
          '0 0 20px rgba(255, 0, 0, 0.9)', 
          '0 0 40px rgba(255, 0, 0, 1)',
          '0 0 20px rgba(255, 0, 0, 0.9)'
        ]
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {/* Adding more aggressive pattern within the scanner line */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-around overflow-hidden"
        animate={{
          opacity: [0.6, 1, 0.6]
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity
        }}
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full w-1.5 bg-white"
            animate={{
              height: ['40%', '120%', '40%'],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{
              duration: 0.2 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.03,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.div>
      
      {/* Add pulsing "data transmission" effect */}
      <motion.div
        className="absolute top-0 left-0 h-full"
        initial={{ width: 0 }}
        animate={{
          width: ['0%', '100%', '0%'],
          opacity: [0.3, 0.9, 0.3]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255, 30, 30, 0.9), transparent)',
        }}
      />
      
      {/* Add digital distortion artifacts */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0, 0.8, 0]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 1.2
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`glitch-${i}`}
            className="absolute h-full bg-red-400"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 5}px`,
            }}
            animate={{
              opacity: [0, 1, 0],
              height: ['20%', '150%', '20%'],
              y: ['-50%', '50%', '-50%']
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              delay: i * 0.05,
              repeatDelay: Math.random() * 0.7
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
