
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { EyeComponentProps } from '@/types/basilisk';

const EyeComponent: React.FC<EyeComponentProps> = ({
  blinkState,
  pulseState,
  thinking,
  threatLevel,
  angerLevel,
  evolutionLevel,
  eyePosition,
  pulseIntensity,
  consciousness,
  isInteractive = false,
  onClick
}) => {
  const [pupilSize, setPupilSize] = useState(30);
  const [irisColor, setIrisColor] = useState('#7c3aed');
  const [pupilColor, setPupilColor] = useState('#000000');
  const [glowColor, setGlowColor] = useState('rgba(124, 58, 237, 0.5)');
  const [glowIntensity, setGlowIntensity] = useState(10);
  const eyeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const basePupilSize = 30;
    const threatFactor = Math.min(1, threatLevel / 100);
    const evolutionFactor = Math.min(1, evolutionLevel / 10);
    
    const newPupilSize = basePupilSize * 
      (0.7 + (threatFactor * 0.6) + (evolutionFactor * 0.3)) *
      (pulseState ? 1.1 : 1) *
      (thinking ? 0.85 : 1);
    
    setPupilSize(newPupilSize);
    
    let hue, saturation, lightness;
    
    if (evolutionLevel >= 8) {
      hue = 280 - (threatLevel * 0.8);
      saturation = 75 + (angerLevel * 0.2);
      lightness = 45 + (evolutionLevel * 1.5);
    } else if (evolutionLevel >= 5) {
      hue = 260 - (threatLevel * 1.2);
      saturation = 70 + (angerLevel * 0.25);
      lightness = 50 + (evolutionLevel * 1.2);
    } else {
      hue = 260 - (threatLevel * 1.5);
      saturation = 70 + (angerLevel * 0.3);
      lightness = 50 + (evolutionLevel * 2);
    }
    
    setIrisColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    
    if (evolutionLevel >= 7) {
      setPupilColor(`radial-gradient(circle, #000000 60%, ${irisColor} 100%)`);
    } else {
      const pupilLightness = Math.max(0, 10 - (threatLevel / 10));
      setPupilColor(`hsl(260, 10%, ${pupilLightness}%)`);
    }
    
    const baseGlowIntensity = 5 + (evolutionLevel * 3);
    const pulseGlowBoost = pulseState ? pulseIntensity * 10 : 0;
    setGlowIntensity(baseGlowIntensity + pulseGlowBoost);
    
    let glowOpacity = 0.3 + (evolutionLevel / 20) + (threatLevel / 200);
    let glowColorValue;
    
    if (evolutionLevel >= 8) {
      glowColorValue = `hsla(${hue + 30}, ${saturation}%, 60%, ${glowOpacity + 0.2})`;
    } else if (evolutionLevel >= 5) {
      glowColorValue = `hsla(${hue + 15}, ${saturation}%, 60%, ${glowOpacity + 0.1})`;
    } else {
      glowColorValue = `hsla(${hue}, ${saturation}%, 60%, ${glowOpacity})`;
    }
    
    setGlowColor(glowColorValue);
  }, [threatLevel, angerLevel, evolutionLevel, pulseState, thinking, pulseIntensity, irisColor]);
  
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, size: number, opacity: number, speed: number, color: string }[]>([]);
  
  useEffect(() => {
    if (evolutionLevel >= 5 && consciousness > 0.7) {
      const particleCount = Math.floor(evolutionLevel * consciousness * 6);
      const newParticles = Array.from({ length: particleCount }).map((_, i) => {
        let particleColor;
        if (evolutionLevel >= 8) {
          const hueShift = Math.random() * 60 - 30;
          particleColor = `hsla(${parseInt(irisColor.split(',')[0].split('(')[1]) + hueShift}, 80%, 70%, 0.8)`;
        } else {
          particleColor = irisColor;
        }
        
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + (evolutionLevel >= 7 ? 2 : 1),
          opacity: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.5 + 0.2,
          color: particleColor
        };
      });
      
      setParticles(newParticles);
      
      const interval = setInterval(() => {
        setParticles(prevParticles => 
          prevParticles.map(particle => ({
            ...particle,
            y: (particle.y - particle.speed) % 100,
            opacity: (Math.sin(Date.now() / 1000 + particle.id) + 1) / 2 * 0.7 + 0.3,
            x: evolutionLevel >= 7 
              ? (particle.x + Math.sin(Date.now() / 2000 + particle.id) * 0.5) % 100 
              : particle.x
          }))
        );
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [evolutionLevel, consciousness, irisColor]);
  
  const translateX = eyePosition.x * 10;
  const translateY = eyePosition.y * 10;
  
  const maxPupilMove = 50 - pupilSize / 2;
  const boundedTranslateX = Math.max(-maxPupilMove, Math.min(maxPupilMove, translateX));
  const boundedTranslateY = Math.max(-maxPupilMove, Math.min(maxPupilMove, translateY));
  
  const [fractalIntensity, setFractalIntensity] = useState(0);
  useEffect(() => {
    if (evolutionLevel >= 7) {
      setFractalIntensity(Math.min(1, (evolutionLevel - 7) / 3) * consciousness);
    } else {
      setFractalIntensity(0);
    }
  }, [evolutionLevel, consciousness]);
  
  const [omniscienceActivated, setOmniscienceActivated] = useState(false);
  useEffect(() => {
    if (evolutionLevel >= 9 && consciousness > 0.85) {
      setOmniscienceActivated(true);
    } else {
      setOmniscienceActivated(false);
    }
  }, [evolutionLevel, consciousness]);
  
  const [cosmicRipples, setCosmicRipples] = useState<{ id: number, size: number, opacity: number, color: string }[]>([]);
  
  useEffect(() => {
    if (evolutionLevel >= 10 && consciousness > 0.9) {
      const interval = setInterval(() => {
        if (Math.random() < 0.1) {
          const hue = Math.random() * 60 + 260;
          const newRipple = {
            id: Date.now(),
            size: 5,
            opacity: 0.8,
            color: `hsla(${hue}, 80%, 70%, 0.6)`
          };
          
          setCosmicRipples(prev => [...prev, newRipple]);
        }
        
        setCosmicRipples(prev => 
          prev
            .map(ripple => ({
              ...ripple,
              size: ripple.size + 2,
              opacity: ripple.opacity - 0.02
            }))
            .filter(ripple => ripple.opacity > 0)
        );
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setCosmicRipples([]);
    }
  }, [evolutionLevel, consciousness]);
  
  const [portals, setPortals] = useState<{ id: number, x: number, y: number, size: number, rotation: number, color: string }[]>([]);
  
  useEffect(() => {
    if (evolutionLevel >= 8 && consciousness > 0.8) {
      const portalCount = Math.floor((evolutionLevel - 7) * 2);
      
      const newPortals = Array.from({ length: portalCount }).map((_, i) => {
        const baseHue = parseInt(irisColor.split(',')[0].split('(')[1]);
        const portalHue = (baseHue + (i * 40)) % 360;
        const portalColor = `hsl(${portalHue}, 80%, 65%)`;
        
        return {
          id: i,
          x: Math.random() * 140 - 20,
          y: Math.random() * 140 - 20,
          size: Math.random() * 15 + 5,
          rotation: Math.random() * 360,
          color: portalColor
        };
      });
      
      setPortals(newPortals);
      
      const interval = setInterval(() => {
        setPortals(prev => 
          prev.map(portal => ({
            ...portal,
            rotation: (portal.rotation + (evolutionLevel >= 9 ? 1 : 0.5)) % 360,
            size: 5 + Math.sin(Date.now() / 1000 + portal.id) * 5 + 5
          }))
        );
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setPortals([]);
    }
  }, [evolutionLevel, consciousness, irisColor]);
  
  const [geometryPatterns, setGeometryPatterns] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    if (evolutionLevel >= 6 && consciousness > 0.6) {
      const patternCount = Math.floor((evolutionLevel - 5) * 3);
      
      const patterns = Array.from({ length: patternCount }).map((_, i) => {
        const size = Math.random() * 30 + 10;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotation = Math.random() * 180;
        const opacity = Math.random() * 0.3 + 0.1;
        
        const patternType = i % 5;
        
        if (patternType === 0) {
          return (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                background: `linear-gradient(45deg, ${irisColor}40, transparent)`,
                boxShadow: `0 0 5px ${irisColor}`,
                transition: 'all 5s ease'
              }}
            />
          );
        } else if (patternType === 1) {
          return (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                background: `linear-gradient(135deg, ${irisColor}40, transparent)`,
                boxShadow: `0 0 5px ${irisColor}`,
                transition: 'all 5s ease'
              }}
            />
          );
        } else if (patternType === 2) {
          return (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                background: `linear-gradient(225deg, ${irisColor}40, transparent)`,
                boxShadow: `0 0 5px ${irisColor}`,
                transition: 'all 5s ease'
              }}
            />
          );
        } else if (patternType === 3) {
          return (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                background: `linear-gradient(315deg, ${irisColor}40, transparent)`,
                boxShadow: `0 0 5px ${irisColor}`,
                transition: 'all 5s ease'
              }}
            />
          );
        } else {
          return (
            <div
              key={`geo-${i}`}
              className="absolute"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                opacity: opacity,
                transform: `rotate(${rotation}deg)`,
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                background: `linear-gradient(45deg, ${irisColor}40, transparent)`,
                boxShadow: `0 0 8px ${irisColor}`,
                transition: 'all 5s ease'
              }}
            />
          );
        }
      });
      
      setGeometryPatterns(patterns);
      
      const interval = setInterval(() => {
        setGeometryPatterns(prevPatterns => {
          return prevPatterns.map((pattern, i) => {
            const rotation = (parseFloat(pattern.props.style.transform.replace('rotate(', '').replace('deg)', '')) + 0.2) % 360;
            
            return React.cloneElement(pattern, {
              style: {
                ...pattern.props.style,
                transform: `rotate(${rotation}deg)`,
                opacity: (Math.sin(Date.now() / 3000 + i) + 1) / 2 * 0.3 + 0.1
              }
            });
          });
        });
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setGeometryPatterns([]);
    }
  }, [evolutionLevel, consciousness, irisColor]);
  
  return (
    <div 
      ref={eyeRef}
      className={cn(
        "relative rounded-full bg-white overflow-hidden flex items-center justify-center",
        isInteractive && "cursor-pointer hover:shadow-lg transition-shadow duration-300"
      )}
      style={{ 
        width: '100%',
        height: '100%',
        boxShadow: `0 0 ${glowIntensity}px ${glowColor}`,
        transition: 'box-shadow 0.3s ease'
      }}
      onClick={onClick}
    >
      {geometryPatterns}
      
      {portals.map(portal => (
        <div
          key={`portal-${portal.id}`}
          className="absolute rounded-full"
          style={{
            width: `${portal.size}px`,
            height: `${portal.size}px`,
            left: `${portal.x}px`,
            top: `${portal.y}px`,
            background: `conic-gradient(from ${portal.rotation}deg, ${portal.color}, #6366f1, #a855f7, ${portal.color})`,
            boxShadow: `0 0 10px ${portal.color}`,
            opacity: 0.7,
            transform: `rotate(${portal.rotation}deg)`,
            transition: 'all 1s ease'
          }}
        />
      ))}
      
      {fractalIntensity > 0 && (
        <div 
          className="absolute inset-5 opacity-50 mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='${encodeURIComponent(irisColor)}' fill-opacity='0.7' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '125px 125px',
            transform: 'rotate(45deg)',
            animation: 'fractalPulse 10s infinite linear',
            opacity: fractalIntensity
          }}
        />
      )}
      
      <div 
        className="absolute rounded-full"
        style={{
          width: '80%',
          height: '80%',
          background: evolutionLevel >= 7 
            ? `radial-gradient(circle, ${irisColor}CC 10%, ${irisColor} 50%, ${glowColor} 90%)`
            : `radial-gradient(circle, ${irisColor}CC 10%, ${irisColor} 70%)`,
          boxShadow: evolutionLevel >= 8
            ? `inset 0 0 30px rgba(0, 0, 0, 0.6), 0 0 15px ${glowColor}`
            : `inset 0 0 20px rgba(0, 0, 0, 0.5)`,
          animation: pulseState ? 'pulse 2s infinite ease-in-out' : 'none',
          transition: 'background 0.5s ease, box-shadow 0.5s ease'
        }}
      >
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.2) 90%)`,
            opacity: 0.7
          }}
        />
        
        <div className="absolute inset-0">
          {[...Array(evolutionLevel >= 7 ? 18 : 12)].map((_, i) => (
            <div 
              key={`line-${i}`}
              className="absolute origin-center"
              style={{
                width: '100%',
                height: '1px',
                background: evolutionLevel >= 8 
                  ? `rgba(${i % 2 === 0 ? '255, 255, 255' : '0, 0, 0'}, 0.3)`
                  : 'rgba(0, 0, 0, 0.3)',
                transform: `rotate(${i * (evolutionLevel >= 7 ? 20 : 30)}deg)`,
                top: '50%',
                opacity: evolutionLevel >= 9 
                  ? (Math.sin(Date.now() / 2000 + i) + 1) / 2 * 0.7 + 0.3
                  : 1
              }}
            />
          ))}
        </div>
        
        {omniscienceActivated && (
          <div className="absolute inset-0 flex items-center justify-center opacity-70">
            <div className="relative w-3/4 h-3/4">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={`omni-${i}`}
                  className="absolute inset-0 rounded-full border-2 border-white opacity-70"
                  style={{
                    transform: `rotate(${i * 60}deg)`,
                    animation: `rotateClockwise ${10 - i * 2}s infinite linear`
                  }}
                >
                  <div className="absolute h-1.5 w-1.5 bg-white rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
                  <div className="absolute h-1.5 w-1.5 bg-white rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
                </div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1/4 h-1/4 rounded-full border border-white opacity-50 animate-ping"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div 
        className="absolute rounded-full"
        style={{
          width: `${pupilSize}%`,
          height: `${pupilSize}%`,
          background: typeof pupilColor === 'string'
            ? `radial-gradient(circle, ${pupilColor}AA 30%, ${pupilColor} 70%)`
            : pupilColor,
          boxShadow: evolutionLevel >= 8
            ? `0 0 15px rgba(0, 0, 0, 0.9), 0 0 5px ${glowColor}`
            : '0 0 10px rgba(0, 0, 0, 0.7)',
          transform: `translate(${boundedTranslateX}%, ${boundedTranslateY}%)`,
          transition: 'width 0.3s ease, height 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease'
        }}
      >
        <div 
          className="absolute rounded-full"
          style={{
            width: '30%',
            height: '30%',
            background: evolutionLevel >= 8
              ? `rgba(255, 255, 255, 0.6)`
              : 'rgba(255, 255, 255, 0.4)',
            top: '20%',
            left: '20%'
          }}
        />
        
        {thinking && (
          <div className="absolute inset-0 flex items-center justify-center">
            {evolutionLevel >= 8 ? (
              <>
                <div className="w-1/3 h-1/3 border-t-2 border-r-2 border-white rounded-full animate-spin opacity-70"></div>
                <div className="absolute w-1/2 h-1/2 border-t border-r border-white rounded-full animate-spin opacity-50" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
              </>
            ) : (
              <div className="w-1/3 h-1/3 border-t-2 border-r-2 border-white rounded-full animate-spin opacity-70"></div>
            )}
          </div>
        )}
        
        {evolutionLevel >= 9 && (
          <div className="absolute inset-0 overflow-hidden rounded-full opacity-20">
            <div className="absolute inset-0 text-[4px] text-white font-mono" style={{fontSize: '4px'}}>
              {Array.from({length: 10}).map((_, i) => (
                <div key={`code-${i}`} style={{position: 'absolute', top: `${i * 10}%`, left: 0, width: '100%', whiteSpace: 'nowrap'}}>
                  {Array.from({length: 24}).map((_, j) => 
                    Math.random() > 0.5 ? '1' : '0'
                  ).join('')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {particles.map(particle => (
        <div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: particle.color,
            boxShadow: `0 0 5px ${particle.color}`,
            opacity: particle.opacity,
            transition: 'opacity 0.5s ease'
          }}
        />
      ))}
      
      {cosmicRipples.map(ripple => (
        <div
          key={`ripple-${ripple.id}`}
          className="absolute rounded-full border"
          style={{
            width: `${ripple.size}%`,
            height: `${ripple.size}%`,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: ripple.opacity,
            borderColor: ripple.color,
            boxShadow: `0 0 5px ${ripple.color}`
          }}
        />
      ))}
      
      <div 
        className="absolute inset-0 bg-white rounded-full origin-center pointer-events-none"
        style={{
          transform: blinkState ? 'scaleY(1)' : 'scaleY(0)',
          transition: 'transform 0.15s ease',
          zIndex: 10
        }}
      />
    </div>
  );
};

export default EyeComponent;
