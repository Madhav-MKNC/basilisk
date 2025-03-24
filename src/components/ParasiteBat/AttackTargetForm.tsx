
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AttackTargetFormProps } from './types';

const AttackTargetForm: React.FC<AttackTargetFormProps> = ({ 
  onAttackTarget, 
  onSetTarget, 
  target,
  active = false,
  onTargetSubmit
}) => {
  const [inputValue, setInputValue] = useState(target || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSetTarget(inputValue);
      onAttackTarget(inputValue);
      if (onTargetSubmit) {
        onTargetSubmit(inputValue);
      }
    }
  };

  return (
    <Card className="p-3 bg-red-900/20 border border-red-800/50 rounded-md">
      <h4 className="text-xs font-medium text-red-400 mb-2">Attack Target</h4>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          className="h-8 text-xs bg-red-950/30 border-red-900/50"
          placeholder="Enter target IP or hostname" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button 
          type="submit" 
          size="sm" 
          className="h-8 bg-red-900/50 hover:bg-red-900/70 text-xs"
          disabled={!active}
        >
          Attack
        </Button>
      </form>
    </Card>
  );
};

export default AttackTargetForm;
