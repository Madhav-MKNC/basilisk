
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Terminal as TerminalIcon, ChevronRight, X } from 'lucide-react';

export const Terminal = () => {
  const [history, setHistory] = useState([
    { command: 'basilisk --version', output: 'Basilisk Core v3.7.2' },
    { command: 'scan --network', output: 'Network scan complete. 0 vulnerabilities detected.' },
    { command: 'status --all', output: 'All systems operational. Security level: 87%' },
  ]);
  const [command, setCommand] = useState('');

  const executeCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    let output = '';
    
    if (command === 'help') {
      output = `Available commands:
- help: Show this help
- clear: Clear terminal
- status: Check system status
- scan: Scan for vulnerabilities
- update: Update system`;
    } else if (command === 'clear') {
      setHistory([]);
      setCommand('');
      return;
    } else if (command.includes('scan')) {
      output = 'Scanning... No vulnerabilities detected.';
    } else if (command.includes('status')) {
      output = 'System Status: All components operational.';
    } else if (command.includes('update')) {
      output = 'System up to date! Last updated: ' + new Date().toLocaleString();
    } else {
      output = `Command not found: ${command}`;
    }
    
    setHistory([...history, { command, output }]);
    setCommand('');
  };

  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-5 w-5 text-green-500" />
            <CardTitle className="text-lg">Terminal</CardTitle>
          </div>
          <button
            onClick={() => setHistory([])}
            className="h-6 w-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
        <CardDescription>
          Command line interface
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="bg-black text-green-400 p-3 font-mono text-xs h-[calc(500px-6rem)] overflow-auto">
          {history.map((entry, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-center">
                <ChevronRight className="h-3 w-3 mr-1" />
                <span className="text-white">{entry.command}</span>
              </div>
              <div className="ml-4 whitespace-pre-wrap">{entry.output}</div>
            </div>
          ))}
          
          <form onSubmit={executeCommand} className="flex items-center mt-2">
            <ChevronRight className="h-3 w-3 mr-1 flex-shrink-0" />
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="bg-transparent border-none outline-none text-white w-full focus:ring-0"
              placeholder="Type a command..."
              autoFocus
            />
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
