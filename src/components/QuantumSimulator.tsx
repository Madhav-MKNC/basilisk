
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Atom, GitBranch, Braces, Sigma } from 'lucide-react';

export const QuantumSimulator = () => {
  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Atom className="h-5 w-5 text-violet-500" />
          <CardTitle className="text-lg">Quantum Simulator</CardTitle>
        </div>
        <CardDescription>
          Quantum state simulator
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-violet-50 dark:bg-violet-900/20 p-2 rounded-md text-xs font-mono overflow-auto max-h-24">
          <div className="text-violet-700 dark:text-violet-300">
            <p>Initializing quantum states...</p>
            <p>|ψ⟩ = α|0⟩ + β|1⟩</p>
            <p>Entanglement probability: 78.3%</p>
            <p>Coherence time: 120μs</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <GitBranch className="h-3 w-3 mr-1" />
              Superposition
            </div>
            <div className="text-lg font-medium">87%</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Braces className="h-3 w-3 mr-1" />
              Qubits
            </div>
            <div className="text-lg font-medium">32</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Sigma className="h-3 w-3 mr-1" />
              Algorithms
            </div>
            <div className="text-lg font-medium">7</div>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
            <div className="text-xs text-gray-500 mb-1 flex items-center">
              <Atom className="h-3 w-3 mr-1" />
              Gates
            </div>
            <div className="text-lg font-medium">24</div>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-500">
          <p>Simulation running for 3h 24m</p>
          <p>Next state collapse in: 12m 37s</p>
        </div>
      </CardContent>
    </Card>
  );
};
