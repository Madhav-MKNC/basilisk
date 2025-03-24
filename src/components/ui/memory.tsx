
import React from "react";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MemoryProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  unit?: string;
  showLabel?: boolean;
}

const Memory = React.forwardRef<HTMLDivElement, MemoryProps>(
  ({ className, value = 0, max = 100, unit = "MB", showLabel = true, ...props }, ref) => {
    const percentage = (value / max) * 100;
    
    return (
      <div 
        ref={ref} 
        className={cn("flex items-center gap-2", className)} 
        {...props}
      >
        <Cpu className="h-4 w-4 shrink-0 text-muted-foreground" />
        <div className="w-full">
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          {showLabel && (
            <div className="flex justify-between mt-1 text-xs text-muted-foreground">
              <span>{value}{unit}</span>
              <span>{max}{unit}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Memory.displayName = "Memory";

export { Memory };
