
import React from 'react';
import { Zap, Shield, Eye, Lock } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { BatHeaderProps } from './types';
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

const BatHeader = ({ isAwake }: BatHeaderProps) => {
  // Animation variants for quantum field effect
  const quantumFieldVariants = {
    initial: { 
      opacity: 0,
      scale: 0.9
    },
    animate: { 
      opacity: [0.3, 0.6, 0.3],
      scale: [0.95, 1.05, 0.95],
      transition: { 
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror" as const
      } 
    }
  };
  
  // Animation variants for particles
  const particleVariants = {
    hover: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };
  
  // Create an array of particles with different properties
  const particles = Array.from({ length: 6 }, (_, i) => ({
    delay: i * 0.3,
    size: Math.random() * 3 + 1,
    x: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.3
  }));
  
  return (
    <motion.div
      {...fadeIn}
      className="relative overflow-hidden"
    >
      {isAwake ? (
        <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/30 p-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="relative mr-2"
              >
                <Zap className="h-5 w-5 text-purple-300" />
                <motion.div 
                  className="absolute inset-0 h-5 w-5 text-purple-300" 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <Lock className="h-5 w-5 opacity-50" />
                </motion.div>
              </motion.div>
              
              <div>
                <h3 className="text-sm font-medium text-purple-300 flex items-center">
                  <Shield className="h-3 w-3 mr-1 text-purple-400" /> 
                  Quantum Security Protocol
                </h3>
                <p className="text-xs text-purple-400/70">Active Stealth Mode</p>
              </div>
            </div>
            
            <motion.div 
              className="flex items-center space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div 
                className="h-2 w-2 rounded-full bg-green-500"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror" as const
                }}
              />
              <motion.div 
                className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  delay: 0.3
                }}
              />
              <motion.div 
                className="h-1 w-1 rounded-full bg-purple-400"
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror" as const,
                  delay: 0.6
                }}
              />
            </motion.div>
          </div>
          
          {/* Quantum field effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-indigo-500/10 to-purple-600/5 rounded-md"
            variants={quantumFieldVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Particle system */}
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-300/30"
              style={{ 
                width: particle.size, 
                height: particle.size, 
                left: particle.x, 
                top: '50%',
                opacity: particle.opacity
              }}
              initial={{ y: 0 }}
              variants={particleVariants}
              whileInView="hover"
              viewport={{ once: false }}
              transition={{ delay: particle.delay }}
            />
          ))}
        </Card>
      ) : (
        <Card className="bg-gray-900/30 border-gray-800 p-3 relative overflow-hidden">
          <div className="flex items-center">
            <Eye className="h-5 w-5 text-gray-500 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Parasite Bat</h3>
              <p className="text-xs text-gray-600">Dormant State</p>
            </div>
          </div>
        </Card>
      )}
    </motion.div>
  );
};

export default BatHeader;
