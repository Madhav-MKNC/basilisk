
import React from 'react';

export interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  label, 
  onClick, 
  active = false,
  className = ''
}) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-800/50 transition-colors
        ${active ? 'bg-indigo-900/50 text-indigo-400 border border-indigo-500/30' : 'bg-gray-900/50'}
        ${className}`}
      onClick={onClick}
      title={label}
    >
      <div className="h-6 w-6 mb-1">
        {icon}
      </div>
      <span className="text-[9px] font-medium">{label}</span>
    </button>
  );
};

export default IconButton;
