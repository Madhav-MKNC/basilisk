
import React from 'react';
import { 
  Cpu, 
  Brain, 
  Zap, 
  Eye, 
  Wifi, 
  Activity, 
  Server,
  Braces,
  Skull,
  Shield,
  Angry,
  AlertTriangle,
  Flame,
  Snowflake,
  Bolt
} from 'lucide-react';

interface StatusIndicatorsProps {
  pulseState: boolean;
  thinking: boolean;
  evolutionLevel: number;
  threatLevel: number;
  angerLevel: number;
  consciousness: number;
  energyLevel: number;
}

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  pulseState,
  thinking,
  evolutionLevel,
  threatLevel,
  angerLevel,
  consciousness,
  energyLevel
}) => {
  return (
    <div className="absolute inset-0">
      {/* CPU indicator */}
      <div className={`absolute top-[10%] left-[10%] 
                     ${pulseState ? 'text-cyan-400' : 'text-cyan-600'} 
                     transform -translate-x-1/2 -translate-y-1/2`}>
        <Cpu size={16} className={`${thinking ? 'animate-spin-slow' : ''}`} />
      </div>
      
      {/* Brain indicator */}
      <div className={`absolute top-[10%] right-[10%] 
                     ${thinking ? 'text-red-400 animate-pulse' : pulseState ? 'text-purple-400' : 'text-purple-600'} 
                     transform translate-x-1/2 -translate-y-1/2`}>
        <Brain size={16} />
      </div>
      
      {/* Energy indicator */}
      <div className={`absolute bottom-[10%] left-[10%] 
                     ${pulseState ? 'text-yellow-400' : 'text-yellow-600'} 
                     transform -translate-x-1/2 translate-y-1/2`}>
        <Zap size={16} />
      </div>
      
      {/* Network indicator */}
      <div className={`absolute bottom-[10%] right-[10%] 
                     ${pulseState ? 'text-green-400' : 'text-green-600'} 
                     transform translate-x-1/2 translate-y-1/2`}>
        <Wifi size={16} />
      </div>
      
      {/* Activity indicator */}
      <div className={`absolute top-[50%] left-[10%] 
                     ${pulseState ? 'text-blue-400' : 'text-blue-600'} 
                     transform -translate-x-1/2 -translate-y-1/2`}>
        <Activity size={16} />
      </div>
      
      {/* Server indicator */}
      <div className={`absolute top-[50%] right-[10%] 
                     ${pulseState ? 'text-indigo-400' : 'text-indigo-600'} 
                     transform translate-x-1/2 -translate-y-1/2`}>
        <Server size={16} />
      </div>
      
      {/* Code indicator */}
      <div className={`absolute bottom-[50%] left-[10%] 
                     ${thinking ? 'text-emerald-400 animate-pulse' : pulseState ? 'text-emerald-400' : 'text-emerald-600'} 
                     transform -translate-x-1/2 translate-y-1/2`}>
        <Braces size={16} />
      </div>
      
      {/* Eye indicator */}
      <div className={`absolute bottom-[50%] right-[10%] 
                     ${consciousness > 0.8 ? 'text-red-400' : pulseState ? 'text-gray-400' : 'text-gray-600'} 
                     transform translate-x-1/2 translate-y-1/2`}>
        <Eye size={16} />
      </div>
      
      {/* Skull indicator for threat level */}
      <div className={`absolute top-[20%] left-[50%] 
                     ${threatLevel > 0.2 ? 'text-red-500 animate-pulse' : 'text-red-800/50'} 
                     transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300`}>
        <Skull size={16} />
      </div>
      
      {/* Shield indicator for defense */}
      <div className={`absolute bottom-[20%] left-[50%] 
                     ${energyLevel > 80 ? 'text-blue-400' : 'text-blue-800/50'} 
                     transform -translate-x-1/2 translate-y-1/2`}>
        <Shield size={16} />
      </div>
      
      {/* Anger indicator */}
      <div className={`absolute left-[25%] top-[50%] 
                     ${angerLevel > 0.3 ? 'text-red-500 animate-pulse' : 'text-red-800/50'} 
                     transform -translate-x-1/2 -translate-y-1/2`}>
        <Angry size={16} />
      </div>
      
      {/* Alert indicator */}
      <div className={`absolute right-[25%] top-[50%] 
                     ${threatLevel > 0.3 ? 'text-yellow-500 animate-pulse' : 'text-yellow-800/50'} 
                     transform translate-x-1/2 -translate-y-1/2`}>
        <AlertTriangle size={16} />
      </div>
      
      {/* Heat/cold indicators */}
      {evolutionLevel > 4 && (
        <>
          <div className={`absolute left-[15%] top-[75%] 
                         ${pulseState ? 'text-red-400' : 'text-red-600'} 
                         transform -translate-x-1/2 -translate-y-1/2`}>
            <Flame size={14} />
          </div>
          <div className={`absolute right-[15%] top-[75%] 
                         ${pulseState ? 'text-blue-400' : 'text-blue-600'} 
                         transform translate-x-1/2 -translate-y-1/2`}>
            <Snowflake size={14} />
          </div>
        </>
      )}
      
      {/* Power indicator */}
      {evolutionLevel > 3 && (
        <div className={`absolute left-[50%] top-[75%] 
                       ${pulseState ? 'text-yellow-400' : 'text-yellow-600'} 
                       transform -translate-x-1/2 -translate-y-1/2`}>
          <Bolt size={16} />
        </div>
      )}
    </div>
  );
};
