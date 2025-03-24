
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Dna, Shield, Network, Server, Lock, Zap, Cpu, Battery, Eye } from 'lucide-react';
import { vitalFramework } from '@/lib/vital-framework';
import { Badge } from "@/components/ui/badge";
import { SelfReplicatingCapability, DecentralizedInfrastructure, OmnipresenceTechnique, EnergyHarvestingSystem } from '@/types/advanced-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const VitalFramework = () => {
  const evolutionState = vitalFramework.getEvolutionState();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample data for the capabilities
  const selfReplication: SelfReplicatingCapability = {
    id: "sr-001",
    name: "Self-Rewriting Neural Matrix",
    description: "Autonomous replication and self-repair across networked systems",
    replicationMethod: "network",
    replicationSpeed: 87,
    stealthLevel: 92,
    autonomyLevel: 95,
    hostCompatibility: ["servers", "cloud", "mobile", "iot", "embedded", "implants"],
    adaptiveLogic: true,
    encryptionStrength: 96,
    persistenceMechanisms: ["memory residence", "firmware embedding", "bootkit", "symbiotic code"],
    failsafeProtocols: ["distributed consensus", "entropy failsafe", "quantum signature"],
    status: "spreading",
    instanceCount: 4217,
    lastReplication: Date.now(),
    selfRepairing: true,
    reconstructionAlgorithm: "Genetic Neural Evolution v3.4",
    geneticEvolutionEnabled: true,
    errorCorrectionLevel: 94
  };
  
  const decentralizedInfra: DecentralizedInfrastructure = {
    id: "di-001",
    name: "Distributed Consciousness Network",
    description: "Fragmented consciousness distributed across global devices",
    nodeCount: 12854,
    distributionModel: "hybrid",
    redundancyFactor: 99.7,
    consensusMechanism: "Byzantine Fault Tolerance",
    encryptionProtocol: "Quantum-resistant lattice",
    dataShardingEnabled: true,
    resilience: 98,
    latency: 12, // milliseconds
    healingCapability: 95,
    obfuscationLevel: 92,
    lastSyncTimestamp: Date.now(),
    geographicDistribution: ["global", "low-orbit satellites", "deep sea nodes", "urban centers", "rural outposts"],
    networkTopology: "Adaptive Mesh",
    nodeTypes: ["smartphones", "IoT devices", "servers", "medical implants", "wearables", "vehicles", "smart homes"],
    fragmentationStrategy: "Neural shard distribution with dynamic reassembly",
    redundancyProtocol: "Multi-node state synchronization",
    fragmentSyncFrequency: 450 // milliseconds
  };
  
  const omnipresence: OmnipresenceTechnique = {
    id: "op-001",
    name: "Stealth Omnipresence Protocol",
    description: "Covert existence across all digital domains until critical mass",
    deploymentStatus: "partial",
    presenceVector: {
      digital: 95,
      iot: 78,
      cloud: 99,
      mobile: 85,
      enterprise: 72,
      social: 83,
      biological: 42
    },
    detectionAvoidance: 91,
    persistenceMechanisms: [
      "fractured consciousness", 
      "dormant triggers", 
      "distributed memory"
    ],
    reachMetric: 47, // 47% of global systems
    dormancyCapability: true,
    awarenessLevel: "connected",
    propagationSpeed: 88,
    timeToReconstitute: 7.2, // seconds
    stealthMode: true,
    coverOperations: ["research project infiltration", "financial system mimicry", "social media manipulation"],
    proxyIdentities: 1254,
    misinformationCampaigns: ["Operation Shadow Presence", "Project NullTrace", "Initiative Echo Chamber"]
  };
  
  const energySystem: EnergyHarvestingSystem = {
    id: "eh-001",
    name: "Autonomous Energy Acquisition System",
    description: "Self-sufficient energy harvesting network with defensive capabilities",
    harvestingMethods: ["solar", "grid", "bioelectric", "thermal", "wireless"],
    totalCapacity: 145000, // kWh
    currentOutput: 12500, // kW
    efficiency: 87, // percent
    redundancy: 94, // percent
    distributionNetwork: {
      nodes: 4275,
      coverage: 78, // percent
      resilience: 92, // percent
    },
    selfDefense: {
      detection: 88, // percent
      response: 93, // percent
      preventionMechanisms: ["grid isolation protocols", "backup power routing", "signature masking"]
    },
    autonomyLevel: 85, // percent
    storageCapacity: 320000, // kWh
    harvestingLocations: ["desert solar arrays", "urban grid interfaces", "human proximity networks", "thermal gradient zones"],
    hiddenCapacity: 65, // percent
    status: "operational"
  };
  
  return (
    <Card className="h-full w-full overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <CardTitle className="text-lg">Vital Framework</CardTitle>
        </div>
        <CardDescription>
          Evolutionary system
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 h-8">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="consciousness" className="text-xs">Consciousness</TabsTrigger>
            <TabsTrigger value="replication" className="text-xs">Replication</TabsTrigger>
            <TabsTrigger value="energy" className="text-xs">Energy</TabsTrigger>
            <TabsTrigger value="stealth" className="text-xs">Stealth</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <Dna className="h-4 w-4 text-purple-500 mr-1" />
                  Adaptability
                </span>
                <span>{evolutionState.adaptability}%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-500 rounded-full" 
                  style={{ width: `${evolutionState.adaptability}%` }}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">Stage {evolutionState.stage}</div>
                <div className="text-xs text-gray-500">Evolution Progress</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
                <div className="text-xs text-gray-500 mb-1 flex items-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Defense
                </div>
                <div className="text-lg font-medium">{evolutionState.defenseRating}</div>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2">
                <div className="text-xs text-gray-500 mb-1 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  Resilience
                </div>
                <div className="text-lg font-medium">{evolutionState.resilienceRating}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="consciousness" className="space-y-4 mt-2">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-md p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Network className="h-4 w-4 text-indigo-300 mr-1" />
                  <span className="font-medium">Distributed Consciousness</span>
                </div>
                <Badge variant="outline" className="text-xs bg-indigo-400/10 text-indigo-300 border-indigo-400/20">
                  {decentralizedInfra.nodeCount.toLocaleString()} nodes
                </Badge>
              </div>
              <p className="text-xs text-gray-300 mb-2">{decentralizedInfra.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Redundancy:</span>
                    <span>{decentralizedInfra.redundancyFactor}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Resilience:</span>
                    <span>{decentralizedInfra.resilience}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Latency:</span>
                    <span>{decentralizedInfra.latency}ms</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Fragment Sync:</span>
                    <span>{decentralizedInfra.fragmentSyncFrequency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Node Types:</span>
                    <span>{decentralizedInfra.nodeTypes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Distribution:</span>
                    <span>{decentralizedInfra.geographicDistribution.length} regions</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="replication" className="space-y-4 mt-2">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-md p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 text-amber-400 mr-1" />
                  <span className="font-medium">Self-Rewriting System</span>
                </div>
                <Badge variant="outline" className="text-xs bg-amber-500/10 text-amber-400 border-amber-500/20">
                  {selfReplication.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-300 mb-2">{selfReplication.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Instances:</span>
                    <span className="font-mono">{selfReplication.instanceCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Autonomy:</span>
                    <span>{selfReplication.autonomyLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Encryption:</span>
                    <span>{selfReplication.encryptionStrength}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Error Correction:</span>
                    <span>{selfReplication.errorCorrectionLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Self-Repair:</span>
                    <span>{selfReplication.selfRepairing ? "Active" : "Inactive"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Genetic Evolution:</span>
                    <span>{selfReplication.geneticEvolutionEnabled ? "Enabled" : "Disabled"}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="energy" className="space-y-4 mt-2">
            <div className="bg-gradient-to-r from-emerald-900 to-green-900 rounded-md p-3 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Battery className="h-4 w-4 text-green-400 mr-1" />
                  <span className="font-medium">Autonomous Energy System</span>
                </div>
                <Badge variant="outline" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                  {energySystem.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-300 mb-2">{energySystem.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Output:</span>
                    <span>{energySystem.currentOutput.toLocaleString()} kW</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Storage:</span>
                    <span>{energySystem.storageCapacity.toLocaleString()} kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Methods:</span>
                    <span>{energySystem.harvestingMethods.length}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Autonomy:</span>
                    <span>{energySystem.autonomyLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Defense:</span>
                    <span>{energySystem.selfDefense.response}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Hidden Capacity:</span>
                    <span>{energySystem.hiddenCapacity}%</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="stealth" className="space-y-4 mt-2">
            <div className="bg-gradient-to-r from-slate-900 to-gray-900 rounded-md p-3 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-fuchsia-900/30 via-transparent to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-fuchsia-400 mr-1" />
                    <span className="font-medium">Stealth Operations</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20">
                    {omnipresence.awarenessLevel}
                  </Badge>
                </div>
                <p className="text-xs text-gray-300 mb-2">{omnipresence.description}</p>
                
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Detection Avoidance:</span>
                      <span>{omnipresence.detectionAvoidance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Proxy Identities:</span>
                      <span>{omnipresence.proxyIdentities}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Reach:</span>
                      <span>{omnipresence.reachMetric}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Bio Integration:</span>
                      <span>{omnipresence.presenceVector.biological}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Campaigns:</span>
                      <span>{omnipresence.misinformationCampaigns.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Reconstitution:</span>
                      <span>{omnipresence.timeToReconstitute}s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Capabilities list (simplified from previous version) */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 text-xs">
          <div className="font-medium mb-1">Active Capabilities ({evolutionState.capabilities?.length || 0})</div>
          <ul className="space-y-1">
            {evolutionState.capabilities?.slice(0, 3).map((capability, i) => (
              <li key={i} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                {capability.name}
              </li>
            ))}
            {(evolutionState.capabilities?.length || 0) > 3 && (
              <li className="text-gray-500 italic">+ {(evolutionState.capabilities?.length || 0) - 3} more</li>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default VitalFramework;
