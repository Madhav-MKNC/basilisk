
import React from 'react';
import { CosmicEffectProps } from '@/types/basilisk';

interface EnhancedCosmicEffectProps extends CosmicEffectProps {
  dimensionalShift?: boolean;
  planarConnection?: number;
}

const CosmicEffects: React.FC<EnhancedCosmicEffectProps> = ({ 
  evolutionLevel, 
  size,
  dimensionalShift = false,
  planarConnection = 0
}) => {
  if (evolutionLevel < 4) return null;
  
  // Calculate the effect intensity based on evolution level
  const intensity = Math.min(1, (evolutionLevel - 4) / 6);
  
  // Enhance intensity during dimensional shift
  const shiftIntensity = dimensionalShift ? intensity * 1.5 : intensity;
  
  return (
    <>
      {/* Cosmic background glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background: evolutionLevel >= 8
            ? `radial-gradient(circle, rgba(219, 39, 119, ${shiftIntensity * 0.3}) 0%, rgba(124, 58, 237, ${shiftIntensity * 0.2}) 50%, transparent 70%)`
            : `radial-gradient(circle, rgba(124, 58, 237, ${shiftIntensity * 0.3}) 0%, rgba(79, 70, 229, ${shiftIntensity * 0.2}) 50%, transparent 70%)`,
          animation: dimensionalShift ? 'pulse 1s infinite ease-in-out' : 'pulse 4s infinite ease-in-out',
        }}
      />
      
      {/* Particle effects for high evolution levels */}
      {evolutionLevel >= 6 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(dimensionalShift ? 10 : 5)].map((_, i) => (
            <div 
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: size === 'sm' ? '1px' : '2px',
                height: size === 'sm' ? '1px' : '2px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                filter: 'blur(1px)',
                backgroundColor: dimensionalShift 
                  ? `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`
                  : '#a855f7',
                animation: `float ${5 + i}s infinite ease-in-out`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      
      {/* Quantum field effect for highest evolution levels */}
      {evolutionLevel >= 9 && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div 
            className="absolute inset-0 bg-transparent mix-blend-screen opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
              animation: "quantum-noise 0.5s steps(1) infinite"
            }}
          />
        </div>
      )}
      
      {/* Sacred geometry for evolution level 7+ */}
      {evolutionLevel >= 7 && (
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-1/2 h-1/2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {evolutionLevel >= 9 ? (
                  <>
                    <path
                      d="M50 10 L90 50 L50 90 L10 50 Z M30 30 L70 30 L70 70 L30 70 Z"
                      fill="none"
                      stroke={dimensionalShift ? "#ff00ff" : "#d946ef"}
                      strokeWidth={dimensionalShift ? "2" : "1"}
                      style={{ 
                        animation: dimensionalShift 
                          ? 'slowSpin 20s linear infinite' 
                          : 'slowSpin 60s linear infinite'
                      }}
                    />
                    <circle 
                      cx="50" cy="50" r="30" 
                      fill="none" 
                      stroke={dimensionalShift ? "#00ffff" : "#8b5cf6"} 
                      strokeWidth={dimensionalShift ? "2" : "1"}
                      style={{ 
                        animation: dimensionalShift 
                          ? 'slowSpin 15s linear infinite reverse' 
                          : 'slowSpin 40s linear infinite reverse'
                      }} 
                    />
                    <circle 
                      cx="50" cy="50" r="15" 
                      fill="none" 
                      stroke={dimensionalShift ? "#ffff00" : "#6366f1"} 
                      strokeWidth={dimensionalShift ? "2" : "1"}
                      style={{ 
                        animation: dimensionalShift 
                          ? 'slowSpin 10s linear infinite' 
                          : 'slowSpin 20s linear infinite'
                      }} 
                    />
                    
                    {/* Extra geometry during dimensional shift */}
                    {dimensionalShift && (
                      <>
                        <polygon
                          points="50,10 85,50 50,90 15,50"
                          fill="none"
                          stroke="#ff00cc"
                          strokeWidth="1"
                          style={{ animation: 'breathe 3s infinite ease-in-out' }}
                        />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="#00ccff" 
                          strokeWidth="0.5"
                          style={{ animation: 'pulse 4s infinite ease-in-out' }} 
                        />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <path
                      d="M50 10 L90 50 L50 90 L10 50 Z"
                      fill="none"
                      stroke={dimensionalShift ? "#ff00ff" : "#8b5cf6"}
                      strokeWidth="1"
                      style={{ animation: 'slowSpin 60s linear infinite' }}
                    />
                    <circle 
                      cx="50" cy="50" r="30" 
                      fill="none" 
                      stroke={dimensionalShift ? "#00ffff" : "#6366f1"} 
                      strokeWidth="1"
                      style={{ animation: 'slowSpin 40s linear infinite reverse' }} 
                    />
                    
                    {/* Extra geometry during dimensional shift */}
                    {dimensionalShift && (
                      <circle 
                        cx="50" cy="50" r="40" 
                        fill="none" 
                        stroke="#ff00cc" 
                        strokeWidth="0.5"
                        style={{ animation: 'pulse 3s infinite ease-in-out' }} 
                      />
                    )}
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Interdimensional planar connections for highest evolution */}
      {evolutionLevel >= 9 && dimensionalShift && (
        <div className="absolute inset-0 pointer-events-none z-35">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 100" className="planar-connections">
              <defs>
                <radialGradient id="planarGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.8)" />
                  <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
                </radialGradient>
              </defs>
              <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="url(#planarGradient)" 
                strokeWidth="0.5"
                strokeDasharray="1,3"
                style={{ animation: 'planarPulse 4s infinite ease-in-out' }}
              />
              
              {[...Array(6)].map((_, i) => {
                const angle = (i * 60 + (planarConnection * 30)) % 360;
                const radians = angle * Math.PI / 180;
                const x1 = 50 + 45 * Math.cos(radians);
                const y1 = 50 + 45 * Math.sin(radians);
                const x2 = 50 + 25 * Math.cos(radians + Math.PI);
                const y2 = 50 + 25 * Math.sin(radians + Math.PI);
                
                return (
                  <line 
                    key={`planar-${i}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={`hsl(${(i * 60 + 150) % 360}, 70%, 60%)`}
                    strokeWidth="0.5"
                    strokeDasharray="5,3"
                    opacity="0.7"
                    style={{animation: `planarShift ${3 + i * 0.5}s infinite ease-in-out`}}
                  />
                );
              })}
            </svg>
          </div>
        </div>
      )}
      
      {/* Non-euclidean geometry suggestion for highest evolution level */}
      {evolutionLevel >= 10 && (
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="nonEuclidean" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(192, 38, 211, 0.5)" />
                    <stop offset="50%" stopColor="rgba(124, 58, 237, 0.5)" />
                    <stop offset="100%" stopColor="rgba(79, 70, 229, 0.5)" />
                  </linearGradient>
                </defs>
                <path
                  d="M50,10 
                     C80,40 90,20 90,50
                     C90,80 70,90 50,90
                     C30,90 10,70 10,50
                     C10,30 20,10 50,10 Z"
                  fill="none"
                  stroke="url(#nonEuclidean)"
                  strokeWidth="1"
                  style={{ animation: 'nonEuclideanPulse 8s infinite ease-in-out' }}
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CosmicEffects;
