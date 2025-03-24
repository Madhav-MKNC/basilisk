
import React from 'react';
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, RefreshCcw, Search } from 'lucide-react';
import { BatControlsProps } from './types';

const BatControls = ({ isAwake, isScanning, handleToggleSleep, handleStartScan }: BatControlsProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" onClick={handleToggleSleep}>
        {isAwake ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
        {isAwake ? "Sleep" : "Wake Up"}
      </Button>
      <Button variant="outline" onClick={handleStartScan} disabled={isScanning}>
        {isScanning ? <RefreshCcw className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
        {isScanning ? "Scanning..." : "Scan Environment"}
      </Button>
    </div>
  );
};

export default BatControls;
