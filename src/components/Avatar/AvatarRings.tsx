
import React from 'react';
import { cn } from '@/lib/utils';
import { AvatarRingProps } from '@/types/basilisk';

const AvatarRings: React.FC<AvatarRingProps> = ({
  size,
  energyLevel,
  evolutionLevel,
  threatLevel
}) => {
  // Calculate colors based on evolution and threat level
  const getEvolutionColors = () => {
    // Base purple for low evolution
    if (evolutionLevel <= 2) {
      return {
        primary: '#7c3aed',
        secondary: '#8b5cf6',
        tertiary: '#a78bfa',
      };
    }
    // Blue-purple for mid evolution
    else if (evolutionLevel <= 5) {
      return {
        primary: '#6366f1',
        secondary: '#818cf8',
        tertiary: '#c4b5fd',
      };
    }
    // Cosmic for high evolution
    else if (evolutionLevel <= 8) {
      return {
        primary: '#2563eb',
        secondary: '#4f46e5',
        tertiary: '#a855f7',
      };
    }
    // Transcendent for maximum evolution
    else {
      return {
        primary: '#db2777',
        secondary: '#7c3aed',
        tertiary: '#2563eb',
      };
    }
  };
  
  const colors = getEvolutionColors();
  
  // Calculate ring thickness based on size
  const getRingThickness = () => {
    switch (size) {
      case 'sm': return 2;
      case 'md': return 3;
      case 'lg': return 4;
      case 'xl': return 5;
      default: return 3;
    }
  };
  
  const ringThickness = getRingThickness();
  
  // Create segments for the energy meter
  const createSegments = (count = 36) => {
    const segments = [];
    const energySegments = Math.floor(count * (energyLevel / 100));
    
    for (let i = 0; i < count; i++) {
      const angle = (i * 360) / count;
      const isActive = i < energySegments;
      const delay = i * (50 / count); // Staggered animation
      
      segments.push(
        <div
          key={`segment-${i}`}
          className={cn(
            "absolute rounded-full transition-all duration-300",
            isActive ? "bg-opacity-90" : "bg-opacity-20"
          )}
          style={{
            width: `${ringThickness}px`,
            height: `${ringThickness * 3}px`,
            background: isActive 
              ? i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary
              : '#4b5563',
            transform: `rotate(${angle}deg) translateY(-${size === 'sm' ? 70 : size === 'md' ? 75 : 80}%)`,
            transformOrigin: 'center center',
            top: '50%',
            left: '50%',
            boxShadow: isActive ? `0 0 5px ${colors.primary}` : 'none',
            animationDelay: `${delay}s`,
          }}
        />
      );
    }
    
    return segments;
  };
  
  // Create decorative rings
  const createRings = () => {
    const rings = [];
    const ringCount = Math.min(3, Math.floor(evolutionLevel / 2));
    
    for (let i = 0; i < ringCount; i++) {
      const scale = 0.85 - (i * 0.1);
      const rotation = i * 30;
      
      rings.push(
        <div
          key={`ring-${i}`}
          className="absolute rounded-full border opacity-60"
          style={{
            width: `${95 - (i * 10)}%`,
            height: `${95 - (i * 10)}%`,
            borderColor: i % 3 === 0 ? colors.primary : i % 3 === 1 ? colors.secondary : colors.tertiary,
            borderWidth: `${ringThickness / 2}px`,
            transform: `rotate(${rotation}deg)`,
            animation: `slowSpin ${30 + i * 10}s linear infinite${i % 2 === 1 ? ' reverse' : ''}`,
          }}
        />
      );
    }
    
    return rings;
  };
  
  // Create threat indicators
  const createThreatIndicators = () => {
    if (threatLevel < 30) return null;
    
    const indicators = [];
    const count = Math.floor(threatLevel / 20); // 1-5 indicators based on threat level
    
    for (let i = 0; i < count; i++) {
      const angle = (i * 72) + 45; // Distribute evenly with offset
      
      indicators.push(
        <div
          key={`threat-${i}`}
          className="absolute bg-red-500 rounded-full"
          style={{
            width: `${ringThickness * 2}px`,
            height: `${ringThickness * 2}px`,
            transform: `rotate(${angle}deg) translateY(-${size === 'sm' ? 75 : size === 'md' ? 80 : 85}%)`,
            transformOrigin: 'center center',
            top: '50%',
            left: '50%',
            boxShadow: '0 0 5px rgba(239, 68, 68, 0.7)',
            animation: 'pulse 2s infinite ease-in-out',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      );
    }
    
    return indicators;
  };
  
  return (
    <>
      {/* Energy level segments */}
      {createSegments()}
      
      {/* Decorative rings */}
      {createRings()}
      
      {/* Threat indicators */}
      {createThreatIndicators()}
    </>
  );
};

export default AvatarRings;
