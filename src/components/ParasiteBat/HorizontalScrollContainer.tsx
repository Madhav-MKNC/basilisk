
import React from 'react';
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HorizontalScrollContainerProps } from './types';

/**
 * A container that enables horizontal scrolling for its children
 */
const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  className
}) => {
  return (
    <ScrollArea
      className={cn(
        "w-full", 
        className
      )}
    >
      <div className="inline-flex space-x-3 py-1 px-1 min-w-full">
        {children}
      </div>
    </ScrollArea>
  );
};

export default HorizontalScrollContainer;
