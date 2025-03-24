
import React from 'react';
import { motion } from 'framer-motion';
import { LoadingStepIndicatorProps } from './types';

export const LoadingStepIndicator: React.FC<LoadingStepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="grid grid-cols-5 gap-2 w-full mt-3">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: index <= currentStep ? 1 : 0.3,
            scale: index === currentStep ? 1.1 : 1,
            borderColor: index <= currentStep 
              ? ['rgba(220,38,38,0.7)', 'rgba(220,38,38,1)', 'rgba(220,38,38,0.7)'] 
              : 'rgba(75,85,99,0.3)'
          }}
          transition={{
            duration: 2,
            repeat: index === currentStep ? Infinity : 0,
            repeatType: "reverse"
          }}
          className={`flex items-center justify-center p-2 rounded-md border ${
            index <= currentStep ? 'border-red-700 bg-red-900/20 text-red-400' : 'border-gray-800 bg-gray-900/20 text-gray-700'
          }`}
        >
          {React.cloneElement(step.icon as React.ReactElement, { 
            size: 14, 
            className: index <= currentStep ? 'opacity-100' : 'opacity-50' 
          })}
        </motion.div>
      ))}
    </div>
  );
};
