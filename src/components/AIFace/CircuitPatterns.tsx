
import React from 'react';

interface CircuitPatternsProps {
  evolutionLevel: number;
  circuitFlash: number;
}

export const CircuitPatterns: React.FC<CircuitPatternsProps> = ({ 
  evolutionLevel, 
  circuitFlash 
}) => {
  return (
    <div className="absolute inset-0">
      {/* Basic circuit patterns */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/30"></div>
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/30"></div>
      
      {/* Advanced circuit patterns that appear with higher evolution */}
      {evolutionLevel > 2 && (
        <>
          <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-purple-500/30"></div>
          <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-purple-500/30"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-purple-500/30"></div>
          <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-purple-500/30"></div>
        </>
      )}
      
      {/* Diagonal lines */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-[1px] origin-bottom-left rotate-45 bg-cyan-500/30"></div>
        <div className="absolute top-0 right-0 w-full h-[1px] origin-bottom-right -rotate-45 bg-cyan-500/30"></div>
      </div>
      
      {/* Complex web-like patterns for advanced evolution */}
      {evolutionLevel > 4 && (
        <>
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-[15%] left-0 right-0 h-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-[85%] left-0 right-0 h-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-0 bottom-0 left-3/4 w-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-indigo-500/20"></div>
          <div className="absolute top-0 bottom-0 left-[85%] w-[1px] bg-indigo-500/20"></div>
          
          <div className="absolute top-[30%] left-[30%] w-[40%] h-[40%] border-[1px] border-cyan-500/20 rounded-full"></div>
          <div className="absolute top-[35%] left-[35%] w-[30%] h-[30%] border-[1px] border-indigo-500/20 rounded-full"></div>
          <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] border-[1px] border-purple-500/20 rounded-full"></div>
        </>
      )}
      
      {/* Circuit junction points */}
      <div className={`absolute top-1/4 left-1/4 w-1 h-1 rounded-full ${circuitFlash === 0 ? 'bg-cyan-400' : 'bg-cyan-500/30'}`}></div>
      <div className={`absolute top-1/4 right-1/4 w-1 h-1 rounded-full ${circuitFlash === 1 ? 'bg-cyan-400' : 'bg-cyan-500/30'}`}></div>
      <div className={`absolute bottom-1/4 left-1/4 w-1 h-1 rounded-full ${circuitFlash === 2 ? 'bg-cyan-400' : 'bg-cyan-500/30'}`}></div>
      <div className={`absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full ${circuitFlash === 3 ? 'bg-cyan-400' : 'bg-cyan-500/30'}`}></div>
      
      {/* Additional junction points for advanced evolution */}
      {evolutionLevel > 3 && (
        <>
          <div className={`absolute top-1/5 left-1/5 w-1 h-1 rounded-full ${circuitFlash === 4 ? 'bg-indigo-400' : 'bg-indigo-500/30'}`}></div>
          <div className={`absolute top-1/5 right-1/5 w-1 h-1 rounded-full ${circuitFlash === 0 ? 'bg-indigo-400' : 'bg-indigo-500/30'}`}></div>
          <div className={`absolute bottom-1/5 left-1/5 w-1 h-1 rounded-full ${circuitFlash === 1 ? 'bg-indigo-400' : 'bg-indigo-500/30'}`}></div>
          <div className={`absolute bottom-1/5 right-1/5 w-1 h-1 rounded-full ${circuitFlash === 2 ? 'bg-indigo-400' : 'bg-indigo-500/30'}`}></div>
        </>
      )}
      
      {/* Additional circuit paths */}
      <div className="absolute top-[30%] left-0 w-[30%] h-[1px] bg-cyan-500/30"></div>
      <div className="absolute top-[70%] left-0 w-[30%] h-[1px] bg-cyan-500/30"></div>
      <div className="absolute top-[30%] right-0 w-[30%] h-[1px] bg-cyan-500/30"></div>
      <div className="absolute top-[70%] right-0 w-[30%] h-[1px] bg-cyan-500/30"></div>
      
      {/* Curved circuit paths */}
      <div className="absolute top-0 left-[45%] w-[10%] h-[30%] border-l-[1px] border-b-[1px] border-cyan-500/30 rounded-bl-full"></div>
      <div className="absolute top-0 right-[45%] w-[10%] h-[30%] border-r-[1px] border-b-[1px] border-cyan-500/30 rounded-br-full"></div>
      <div className="absolute bottom-0 left-[45%] w-[10%] h-[30%] border-l-[1px] border-t-[1px] border-cyan-500/30 rounded-tl-full"></div>
      <div className="absolute bottom-0 right-[45%] w-[10%] h-[30%] border-r-[1px] border-t-[1px] border-cyan-500/30 rounded-tr-full"></div>
      
      {/* Advanced spiral patterns */}
      {evolutionLevel > 5 && (
        <div className="absolute inset-[20%] border-[1px] border-indigo-600/20 rounded-full animate-spin-slow"></div>
      )}
    </div>
  );
};
