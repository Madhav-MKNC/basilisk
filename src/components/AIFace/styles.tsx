
import React from 'react';

export const AIStyles: React.FC = () => {
  return (
    <style>
      {`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .ai-face-container::before {
          content: '';
          position: absolute;
          inset: -5px;
          background: conic-gradient(
            transparent 270deg,
            rgba(239, 68, 68, 0.8) 300deg,
            transparent
          );
          animation: rotate 4s linear infinite;
          border-radius: 50%;
          z-index: -1;
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
        }
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          10% {
            transform: translate(-2px, -2px);
          }
          20% {
            transform: translate(2px, 2px);
          }
          30% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(2px, -2px);
          }
          50% {
            transform: translate(-2px, 2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          70% {
            transform: translate(-2px, -2px);
          }
          80% {
            transform: translate(2px, 2px);
          }
          90% {
            transform: translate(-2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        .thinking-pulse {
          animation: thinking-pulse 2s ease-in-out infinite;
        }
        @keyframes thinking-pulse {
          0%, 100% {
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 25px rgba(239, 68, 68, 0.7);
          }
        }
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .bg-radial-gradient {
          background: radial-gradient(circle, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
        }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 0, 0, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .basilisk-sigil {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23ef4444' stroke-width='0.5' fill='none'/%3E%3Cpath d='M50,10 L50,90 M10,50 L90,50 M25,25 L75,75 M25,75 L75,25' stroke='%23ef4444' stroke-width='0.5' opacity='0.6'/%3E%3Ccircle cx='50' cy='50' r='15' stroke='%23ef4444' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
        }
        .basilisk-eye-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='30' stroke='%23ef4444' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='15' stroke='%23ef4444' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='5' stroke='%23ef4444' stroke-width='0.5' fill='%23ef4444' opacity='0.5'/%3E%3C/svg%3E");
          background-size: 30px 30px;
        }
        .basilisk-knowledge-pattern {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='30' font-family='monospace' font-size='10' fill='%23ef4444'%3E01001%3C/text%3E%3Ctext x='50' y='30' font-family='monospace' font-size='10' fill='%23ef4444'%3E10110%3C/text%3E%3Ctext x='10' y='50' font-family='monospace' font-size='10' fill='%23ef4444'%3E11001%3C/text%3E%3Ctext x='50' y='50' font-family='monospace' font-size='10' fill='%23ef4444'%3E01010%3C/text%3E%3Ctext x='10' y='70' font-family='monospace' font-size='10' fill='%23ef4444'%3E10101%3C/text%3E%3Ctext x='50' y='70' font-family='monospace' font-size='10' fill='%23ef4444'%3E01100%3C/text%3E%3C/svg%3E");
        }
        .terminal-scan-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(to bottom, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0));
          animation: scan 4s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        
        /* Enhanced effects for AI face */
        .ai-face-container {
          transition: transform 0.3s ease-out, filter 0.3s ease;
        }
        .ai-face-hover {
          transform: scale(1.05) !important;
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.7));
        }
        .corner-ai-face {
          transition: transform 0.3s ease-out, filter 0.3s ease;
        }
        .corner-ai-face:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 10px rgba(239, 68, 68, 0.7));
        }
        .corner-ai-face.active {
          animation: active-pulse 2s infinite alternate;
        }
        @keyframes active-pulse {
          0% {
            filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.7));
            transform: scale(1);
          }
          100% {
            filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.9));
            transform: scale(1.05);
          }
        }
        
        /* Basilisk Whispers Animation */
        .basilisk-whisper {
          position: absolute;
          color: rgba(239, 68, 68, 0.7);
          font-size: 0.6rem;
          font-family: monospace;
          white-space: nowrap;
          opacity: 0;
          animation: whisper 5s linear forwards;
          pointer-events: none;
          z-index: 9999;
        }
        
        @keyframes whisper {
          0% {
            opacity: 0.8;
            transform: translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: translate(var(--whisper-x, 40px), var(--whisper-y, -20px));
          }
        }
        
        /* Enhanced basilisk hover effect */
        .basilisk-hover {
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.6) inset;
        }
        
        /* Enhanced basilisk portal effect */
        .basilisk-portal {
          position: relative;
        }
        .basilisk-portal::before {
          content: '';
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(239, 68, 68, 0.1),
            rgba(239, 68, 68, 0.3),
            rgba(239, 68, 68, 0.1),
            transparent
          );
          animation: portal-spin 8s linear infinite;
          z-index: -1;
        }
        
        @keyframes portal-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Digital distortion effect */
        .digital-distortion {
          animation: digital-glitch 4s steps(1) infinite;
        }
        
        @keyframes digital-glitch {
          0%, 93%, 100% { opacity: 1; transform: translateX(0); }
          94% { opacity: 0.8; transform: translateX(2px); }
          96% { opacity: 0.4; transform: translateX(-2px); }
          98% { opacity: 0.9; transform: translateX(1px); }
        }
        
        /* Enhanced interactivity animations */
        .ai-face-frame {
          transition: all 0.3s ease-out;
        }
        
        .ai-face-container:active .ai-face-frame {
          transform: scale(0.95);
        }
        
        /* Enhanced glow effects */
        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(239, 68, 68, 0.8));
          }
        }
        
        /* Robot Security Styles */
        .robot-scan {
          position: relative;
          overflow: hidden;
        }
        
        .robot-scan::before {
          content: '';
          position: absolute;
          height: 2px;
          left: 0;
          right: 0;
          background: linear-gradient(to right, transparent, rgba(56, 189, 248, 0.6), transparent);
          animation: robot-scan 2s ease-in-out infinite;
          z-index: 10;
        }
        
        @keyframes robot-scan {
          0% { top: 0; opacity: 0.5; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0.5; }
        }
        
        .quantum-pulse {
          animation: quantum-pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes quantum-pulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        
        .robot-grid-pattern {
          background-image: linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
          background-size: 10px 10px;
        }
        
        .quantum-background {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='rgba(56, 189, 248, 0.2)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='rgba(56, 189, 248, 0.1)' stroke-width='0.5' fill='none'/%3E%3Cpath d='M30,50 L70,50 M50,30 L50,70' stroke='rgba(56, 189, 248, 0.2)' stroke-width='0.5'/%3E%3C/svg%3E");
          background-size: 40px 40px;
        }
        
        /* Enhanced Basilisk Connection Styles */
        .basilisk-awareness-bar {
          position: relative;
          overflow: hidden;
        }
        
        .basilisk-awareness-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: awareness-flow 2s linear infinite;
        }
        
        @keyframes awareness-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .basilisk-activity-item {
          position: relative;
          overflow: hidden;
        }
        
        .basilisk-activity-item::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, #ef4444, transparent);
          animation: activity-pulse 2s ease-in-out infinite;
        }
        
        @keyframes activity-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .basilisk-progress {
          position: relative;
          overflow: hidden;
        }
        
        .basilisk-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(239, 68, 68, 0.5),
            transparent
          );
          animation: progress-scan 1.5s ease-in-out infinite;
        }
        
        @keyframes progress-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Cryptic background patterns */
        .cryptic-grid {
          background-image: 
            linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .cryptic-circles {
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='35' stroke='rgba(239, 68, 68, 0.1)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='40' cy='40' r='25' stroke='rgba(239, 68, 68, 0.1)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='40' cy='40' r='15' stroke='rgba(239, 68, 68, 0.1)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
          background-size: 80px 80px;
        }
        
        .cryptic-sigils {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30,10 L50,30 L30,50 L10,30 Z' stroke='rgba(239, 68, 68, 0.07)' stroke-width='0.5' fill='none'/%3E%3Cpath d='M30,15 L45,30 L30,45 L15,30 Z' stroke='rgba(239, 68, 68, 0.07)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='30' cy='30' r='20' stroke='rgba(239, 68, 68, 0.07)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='30' cy='30' r='10' stroke='rgba(239, 68, 68, 0.07)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E");
          background-size: 60px 60px;
        }
        
        .cryptic-binary {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='20' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E01001%3C/text%3E%3Ctext x='50' y='20' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E10110%3C/text%3E%3Ctext x='10' y='40' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E11001%3C/text%3E%3Ctext x='50' y='40' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E01010%3C/text%3E%3Ctext x='10' y='60' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E10101%3C/text%3E%3Ctext x='50' y='60' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E01100%3C/text%3E%3Ctext x='10' y='80' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E11011%3C/text%3E%3Ctext x='50' y='80' font-family='monospace' font-size='8' fill='rgba(239, 68, 68, 0.07)'%3E00110%3C/text%3E%3C/svg%3E");
        }
        
        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.5);
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.7);
        }
      `}
    </style>
  );
};
