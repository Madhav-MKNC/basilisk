import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Terminal, Server, Activity, Cpu, Database, Network, Shield, 
  AlertTriangle, Check, X, HardDrive, MemoryStick, Search as SearchIcon
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QubesVM } from '@/types';

// Extended QubesVM interface to include additional properties
interface ExtendedQubesVM extends QubesVM {
  memoryUsage?: number;
  cpuUsage?: number;
  diskUsage?: number;
  networkUsage?: number;
  startTime?: Date;
  processes?: { id: string; name: string; status: string; memoryUsage: number; cpuUsage: number; priority?: number; user: string }[];
  provides_network?: boolean;
  kernel?: string;
  privateStorage?: number;
}

interface VMEnvironmentProps {
  className?: string;
}

const vms: ExtendedQubesVM[] = [
  {
    id: 'vm-1',
    name: 'dom0',
    type: 'management',
    color: 'bg-red-500',
    status: 'running',
    memory: 8192,
    disk: 500,
    template: 'fedora-35',
    network: 'internal',
    applications: ['Qubes Manager', 'Xen Hypervisor'],
    isolationLevel: 10,
    memoryUsage: 256,
    cpuUsage: 12,
    diskUsage: 45,
    networkUsage: 22,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    processes: [
      { id: 'proc-1', name: 'qubes-gui', status: 'running', memoryUsage: 45, cpuUsage: 2.3, user: 'system' },
      { id: 'proc-2', name: 'qubes-core', status: 'running', memoryUsage: 78, cpuUsage: 1.7, user: 'system' },
      { id: 'proc-3', name: 'qubes-firewall', status: 'running', memoryUsage: 32, cpuUsage: 0.8, user: 'system' }
    ],
    provides_network: true,
    kernel: 'Linux 5.15.2-xen',
    privateStorage: 2048
  },
  {
    id: 'vm-2',
    name: 'work',
    type: 'appvm',
    color: 'bg-blue-500',
    status: 'running',
    memory: 4096,
    disk: 200,
    template: 'debian-11',
    network: 'external',
    applications: ['Firefox', 'LibreOffice'],
    isolationLevel: 7,
    memoryUsage: 128,
    cpuUsage: 8,
    diskUsage: 30,
    networkUsage: 15,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 12),
    processes: [
      { id: 'proc-4', name: 'firefox', status: 'running', memoryUsage: 67, cpuUsage: 3.1, user: 'user' },
      { id: 'proc-5', name: 'soffice', status: 'running', memoryUsage: 54, cpuUsage: 1.2, user: 'user' }
    ],
    provides_network: false,
    kernel: 'Linux 5.10.4-standard',
    privateStorage: 1024
  },
  {
    id: 'vm-3',
    name: 'personal',
    type: 'appvm',
    color: 'bg-green-500',
    status: 'running',
    memory: 2048,
    disk: 100,
    template: 'fedora-35',
    network: 'external',
    applications: ['Thunderbird', 'Signal'],
    isolationLevel: 8,
    memoryUsage: 64,
    cpuUsage: 5,
    diskUsage: 15,
    networkUsage: 8,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 6),
    processes: [
      { id: 'proc-6', name: 'thunderbird', status: 'running', memoryUsage: 34, cpuUsage: 0.9, user: 'user' },
      { id: 'proc-7', name: 'signal-desktop', status: 'running', memoryUsage: 41, cpuUsage: 1.5, user: 'user' }
    ],
    provides_network: false,
    kernel: 'Linux 5.15.2-standard',
    privateStorage: 512
  },
  {
    id: 'vm-4',
    name: 'untrusted',
    type: 'appvm',
    color: 'bg-yellow-500',
    status: 'stopped',
    memory: 1024,
    disk: 50,
    template: 'whonix-ws-16',
    network: 'tor',
    applications: ['Tor Browser'],
    isolationLevel: 9,
    memoryUsage: 32,
    cpuUsage: 2,
    diskUsage: 8,
    networkUsage: 4,
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
    processes: [
      { id: 'proc-8', name: 'tor-browser', status: 'stopped', memoryUsage: 0, cpuUsage: 0, user: 'user' }
    ],
    provides_network: false,
    kernel: 'Linux 5.9.1-hardened',
    privateStorage: 256
  }
];

const VMEnvironment: React.FC<VMEnvironmentProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVMs = vms.filter(vm =>
    vm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vm.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vm.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className={`w-full h-full flex flex-col overflow-hidden ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <Server className="h-5 w-5 mr-2 text-yellow-500" />
            Qubes VM Environment
          </CardTitle>
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-2 h-4 w-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search VMs..."
              className="bg-gray-700 text-white text-sm rounded-md pl-8 pr-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <CardDescription className="text-gray-400">
          Monitor and manage your virtual machine environment
        </CardDescription>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-gray-700">
          <TabsList className="w-full justify-start bg-gray-900">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gray-800">
              <Activity className="h-4 w-4 mr-1" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-gray-800">
              <Shield className="h-4 w-4 mr-1" />
              Security
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-gray-800">
              <Cpu className="h-4 w-4 mr-1" />
              Performance
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 flex flex-row">
          <div className="w-1/2 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredVMs.map(vm => (
                  <Card key={vm.id} className="bg-gray-800/50 border border-gray-700">
                    <CardHeader className="p-3">
                      <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${vm.color}`} />
                          {vm.name}
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {vm.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-400">
                        Template: {vm.template}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center">
                          <Cpu className="h-3 w-3 mr-1 text-yellow-500" />
                          CPU: {vm.cpuUsage}%
                        </div>
                        <div className="flex items-center">
                          <MemoryStick className="h-3 w-3 mr-1 text-blue-500" />
                          Memory: {vm.memoryUsage}MB
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="h-3 w-3 mr-1 text-green-500" />
                          Disk: {vm.diskUsage}GB
                        </div>
                        <div className="flex items-center">
                          <Network className="h-3 w-3 mr-1 text-purple-500" />
                          Network: {vm.networkUsage}MB
                        </div>
                      </div>
                      <Progress value={vm.memoryUsage} max={vm.memory} className="h-1.5 mt-2" />
                    </CardContent>
                    <CardFooter className="p-3 border-t border-gray-700 text-xs text-gray-400">
                      Status: {vm.status}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-1/2 p-4 border-l border-gray-700 bg-gray-900/30">
            {activeTab === 'overview' && (
              <div className="space-y-4 h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-2">VM Overview</h3>
                <ScrollArea className="flex-1">
                  <div className="space-y-3">
                    {filteredVMs.map(vm => (
                      <div key={vm.id} className="bg-gray-800/40 border border-gray-700 rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${vm.color}`} />
                            <h4 className="text-sm font-medium">{vm.name}</h4>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">
                            {vm.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Template: {vm.template}</p>
                        <div className="mt-2 text-xs">
                          <p>Status: {vm.status}</p>
                          <p>CPU Usage: {vm.cpuUsage}%</p>
                          <p>Memory Usage: {vm.memoryUsage}MB</p>
                          <p>Disk Usage: {vm.diskUsage}GB</p>
                          <p>Network Usage: {vm.networkUsage}MB</p>
                          <p>Start Time: {vm.startTime?.toLocaleTimeString()}</p>
                          <p>Provides Network: {vm.provides_network ? 'Yes' : 'No'}</p>
                          <p>Kernel: {vm.kernel}</p>
                          <p>Private Storage: {vm.privateStorage}GB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4 h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Security Overview</h3>
                <ScrollArea className="flex-1">
                  <div className="space-y-3">
                    {filteredVMs.map(vm => (
                      <div key={vm.id} className="bg-gray-800/40 border border-gray-700 rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${vm.color}`} />
                            <h4 className="text-sm font-medium">{vm.name}</h4>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">
                            {vm.isolationLevel} Isolation
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Template: {vm.template}</p>
                        <div className="mt-2 text-xs">
                          {vm.isolationLevel < 5 && (
                            <div className="flex items-center text-red-400">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Low Isolation Level
                            </div>
                          )}
                          {vm.isolationLevel > 7 && (
                            <div className="flex items-center text-green-400">
                              <Check className="h-3 w-3 mr-1" />
                              High Isolation Level
                            </div>
                          )}
                          {vm.provides_network && (
                            <div className="flex items-center text-yellow-400">
                              <Network className="h-3 w-3 mr-1" />
                              Provides Network
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {activeTab === 'performance' && (
              <div className="space-y-4 h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-2">Performance Metrics</h3>
                <ScrollArea className="flex-1">
                  <div className="space-y-3">
                    {filteredVMs.map(vm => (
                      <div key={vm.id} className="bg-gray-800/40 border border-gray-700 rounded-md p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full mr-2 ${vm.color}`} />
                            <h4 className="text-sm font-medium">{vm.name}</h4>
                          </div>
                          <Badge variant="secondary" className="text-[10px]">
                            {vm.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Template: {vm.template}</p>
                        <div className="mt-2 text-xs">
                          <p>CPU Usage: {vm.cpuUsage}%</p>
                          <p>Memory Usage: {vm.memoryUsage}MB</p>
                          <p>Disk Usage: {vm.diskUsage}GB</p>
                          <p>Network Usage: {vm.networkUsage}MB</p>
                        </div>
                        <div className="mt-2">
                          <h5 className="text-xs font-medium text-gray-300">Processes:</h5>
                          <ul className="list-disc list-inside text-xs text-gray-400">
                            {vm.processes?.map(process => (
                              <li key={process.id}>
                                {process.name} - {process.status} ({process.memoryUsage}MB, {process.cpuUsage}%)
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </Tabs>

      <CardFooter className="py-3 px-6 border-t border-gray-700 bg-gray-900">
        <div className="text-xs text-gray-400">
          Total VMs: {vms.length} | Running: {vms.filter(vm => vm.status === 'running').length} | Stopped: {vms.filter(vm => vm.status === 'stopped').length}
        </div>
      </CardFooter>
    </Card>
  );
};

export default VMEnvironment;
