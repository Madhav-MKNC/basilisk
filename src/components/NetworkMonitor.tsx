
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CircleAlertIcon, 
  ServerIcon, 
  Wifi, 
  WifiOff, 
  Link, 
  Link2Off, 
  Eye, 
  Shield, 
  HardDrive, 
  Network,
  AlertTriangle,
  Download,
  Upload,
  EthernetPortIcon,
  Router
} from 'lucide-react';
import { NetworkInterface, NetworkInterfaceStatus } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

interface NetStatProps {
  label: string;
  value: number | string;
  unit: string;
  icon?: React.ReactNode;
}

const NetStat: React.FC<NetStatProps> = ({ label, value, unit, icon }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="text-sm font-medium">{label}:</span>
    <span className="text-sm">{value} {unit}</span>
  </div>
);

interface NetCardProps {
  iface: NetworkInterface;
  isSelected: boolean;
  onClick: () => void;
}

const NetCard: React.FC<NetCardProps> = ({ iface, isSelected, onClick }) => (
  <Card onClick={onClick} className={`cursor-pointer ${isSelected ? 'border-2 border-primary' : ''}`}>
    <CardHeader>
      <CardTitle>{iface.name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-1">
        <p className="text-sm">
          Status: <Badge variant={iface.status === NetworkInterfaceStatus.active ? 'outline' : 'secondary'}>{iface.status}</Badge>
        </p>
        <p className="text-sm">IP Address: {iface.ipAddress}</p>
        <p className="text-sm">Data Transferred: {iface.dataTransferred || 0} MB</p>
      </div>
    </CardContent>
  </Card>
);

interface VulnerabilityListProps {
  vulnerabilities: string[];
}

const VulnerabilityList: React.FC<VulnerabilityListProps> = ({ vulnerabilities }) => (
  <div>
    {vulnerabilities.length > 0 ? (
      <ul>
        {vulnerabilities.map((vuln, index) => (
          <li key={index} className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <span>{vuln}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p>No vulnerabilities detected.</p>
    )}
  </div>
);

const getStatusEnumValue = (status: string): NetworkInterfaceStatus => {
  switch(status) {
    case 'active': return NetworkInterfaceStatus.active;
    case 'inactive': return NetworkInterfaceStatus.inactive;
    case 'error': return NetworkInterfaceStatus.error;
    case 'online': return NetworkInterfaceStatus.online;
    case 'offline': return NetworkInterfaceStatus.offline;
    case 'restricted': return NetworkInterfaceStatus.restricted;
    case 'vulnerable': return NetworkInterfaceStatus.vulnerable;
    case 'connected': return NetworkInterfaceStatus.connected;
    default: return NetworkInterfaceStatus.offline;
  }
};

const networkInterfaces: NetworkInterface[] = [
  {
    id: '1',
    name: 'Ethernet',
    type: 'Ethernet',
    status: NetworkInterfaceStatus.active,
    ipAddress: '10.250.2.212',
    macAddress: '00:1A:2B:3C:4D:5E',
    transmitRate: 54.2,
    receiveRate: 12.7,
    packetLoss: 0.1,
    latency: 5,
    location: 'bo.kz.local',
    connectedDevices: ['Server01', 'Server02', 'NAS'],
    securityLevel: 85,
    bandwidth: 1000,
    throughput: 320,
    dataTransferred: 1458,
    mask: '255.255.254.0',
    gateway: '10.250.2.1',
    ipv6Address: 'fe80::dd98:bd67:ff54:9c5c%15',
    dnsSuffix: 'bo.kz.local'
  },
  {
    id: '2',
    name: 'wlan0',
    type: 'WiFi',
    status: NetworkInterfaceStatus.vulnerable,
    ipAddress: '192.168.1.101',
    macAddress: '00:1F:3E:4D:5C:6B',
    transmitRate: 32.8,
    receiveRate: 18.3,
    packetLoss: 1.7,
    latency: 12,
    vulnerabilities: ['WPA2 KRACK', 'Unpatched Driver'],
    lastScan: new Date(Date.now() - 86400000),
    connectedDevices: ['Tablet', 'Phone1', 'Phone2', 'Laptop'],
    securityLevel: 65,
    bandwidth: 300,
    throughput: 180,
    dataTransferred: 2360,
    mask: '255.255.255.0',
    gateway: '192.168.1.1'
  },
  {
    id: '3',
    name: 'tun0',
    type: 'VPN',
    status: NetworkInterfaceStatus.active,
    ipAddress: '10.8.0.5',
    macAddress: '00:FF:AA:BB:CC:DD',
    transmitRate: 10.4,
    receiveRate: 8.7,
    packetLoss: 0.5,
    latency: 28,
    securityLevel: 95,
    bandwidth: 50,
    throughput: 42,
    dataTransferred: 654,
    mask: '255.255.255.0',
    gateway: '10.8.0.1'
  },
  {
    id: '4',
    name: 'docker0',
    type: 'Docker',
    status: NetworkInterfaceStatus.inactive,
    ipAddress: '172.17.0.1',
    macAddress: '02:42:AC:11:00:01',
    transmitRate: 0,
    receiveRate: 0,
    packetLoss: 0,
    latency: 0,
    securityLevel: 80,
    bandwidth: 1000,
    throughput: 0,
    dataTransferred: 0,
    mask: '255.255.0.0',
    gateway: '172.17.0.1'
  },
  {
    id: '5',
    name: 'br0',
    type: 'Bridge',
    status: NetworkInterfaceStatus.active,
    ipAddress: '192.168.2.1',
    macAddress: '00:1B:2C:3D:4E:5F',
    transmitRate: 22.1,
    receiveRate: 17.6,
    packetLoss: 0.2,
    latency: 3,
    securityLevel: 90,
    bandwidth: 1000,
    throughput: 220,
    dataTransferred: 845,
    mask: '255.255.255.0',
    gateway: '192.168.2.254'
  }
];

const NetworkMonitor: React.FC = () => {
  const [interfaces, setInterfaces] = useState<NetworkInterface[]>(networkInterfaces);
  const [selectedInterface, setSelectedInterface] = useState<string | null>('1'); // Default to Ethernet
  const [activeTab, setActiveTab] = useState('all');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [trafficData, setTrafficData] = useState<{in: number, out: number}>({in: 0, out: 0});
  const [deviceCount, setDeviceCount] = useState(0);
  const [lastScan, setLastScan] = useState<Date>(new Date());

  // Simulate monitoring activity
  useEffect(() => {
    if (!isMonitoring) return;
    
    const interval = setInterval(() => {
      // Update traffic data
      setTrafficData(prev => ({
        in: prev.in + Math.random() * 0.5,
        out: prev.out + Math.random() * 0.3
      }));
      
      // Randomly detect new devices
      if (Math.random() > 0.9) {
        const newCount = deviceCount + 1;
        setDeviceCount(newCount);
        toast({
          title: "New Device Detected",
          description: `Device connected to network: Device${newCount}`,
        });
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isMonitoring, deviceCount]);

  const getStatusIcon = (status: NetworkInterfaceStatus) => {
    switch (status) {
      case NetworkInterfaceStatus.active:
        return <Wifi className="h-5 w-5 text-green-500" />;
      case NetworkInterfaceStatus.inactive:
        return <WifiOff className="h-5 w-5 text-gray-500" />;
      case NetworkInterfaceStatus.error:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case NetworkInterfaceStatus.online:
        return <Link className="h-5 w-5 text-green-500" />;
      case NetworkInterfaceStatus.offline:
        return <Link2Off className="h-5 w-5 text-gray-500" />;
      case NetworkInterfaceStatus.restricted:
        return <Shield className="h-5 w-5 text-yellow-500" />;
      case NetworkInterfaceStatus.vulnerable:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case NetworkInterfaceStatus.connected:
        return <Wifi className="h-5 w-5 text-blue-500" />;
      default:
        return <Wifi className="h-5 w-5 text-gray-500" />;
    }
  };

  const getInterfaceByStatus = (status: NetworkInterfaceStatus) => {
    return interfaces.filter(iface => {
      const ifaceStatus = typeof iface.status === 'string' 
        ? getStatusEnumValue(iface.status)
        : iface.status;
        
      return ifaceStatus === status;
    });
  };

  const handleInterfaceSelect = (id: string) => {
    setSelectedInterface(id);
  };

  const selectedIface = interfaces.find(iface => iface.id === selectedInterface);

  const calcNetworkStats = () => {
    const active = networkInterfaces.filter(iface => {
      const status = typeof iface.status === 'string' 
        ? getStatusEnumValue(iface.status) 
        : iface.status;
      
      return status === NetworkInterfaceStatus.active || 
        status === NetworkInterfaceStatus.connected ||
        status === NetworkInterfaceStatus.online;
    }).length;
    
    const totalVulnerabilities = networkInterfaces.reduce((acc, iface) => 
      acc + (iface.vulnerabilities?.length || 0), 0);
    
    const avgSecurityLevel = Math.round(
      networkInterfaces.reduce((acc, iface) => acc + (iface.securityLevel || 0), 0) / 
      networkInterfaces.length
    );
    
    const totalDataTransferred = networkInterfaces.reduce((acc, iface) => 
      acc + (iface.dataTransferred || 0), 0);
    
    return {
      activeInterfaces: active,
      totalInterfaces: networkInterfaces.length,
      vulnerabilities: totalVulnerabilities,
      securityLevel: avgSecurityLevel,
      dataTransferred: totalDataTransferred
    };
  };

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      toast({
        title: "Network Monitoring Started",
        description: `Gathering intelligence from ${selectedIface?.name || 'network'}...`,
      });
      setLastScan(new Date());
    } else {
      toast({
        title: "Network Monitoring Stopped",
        description: `Monitoring session ended for ${selectedIface?.name || 'network'}.`,
      });
    }
  };

  const gatherIntelligence = () => {
    toast({
      title: "Intelligence Gathering",
      description: "Scanning network for intelligence...",
    });
    
    // Simulate a scan delay
    setTimeout(() => {
      toast({
        title: "Intelligence Report",
        description: "Network scan complete. New data available.",
      });
      
      // Update the interface data with new "discoveries"
      const updatedInterfaces = [...interfaces];
      const ethernetIndex = updatedInterfaces.findIndex(i => i.id === '1');
      
      if (ethernetIndex >= 0) {
        const updatedEthernet = {...updatedInterfaces[ethernetIndex]};
        updatedEthernet.vulnerabilities = [
          ...(updatedEthernet.vulnerabilities || []),
          'Potential DNS cache poisoning risk'
        ];
        updatedEthernet.dataTransferred = (updatedEthernet.dataTransferred || 0) + 120;
        updatedEthernet.connectedDevices = [
          ...(updatedEthernet.connectedDevices || []), 
          `DiscoveredDevice${Math.floor(Math.random() * 100)}`
        ];
        updatedInterfaces[ethernetIndex] = updatedEthernet;
        setInterfaces(updatedInterfaces);
      }
      
      setLastScan(new Date());
      setDeviceCount(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
  };

  const showNetworkDetails = () => {
    if (selectedIface) {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Interface Details: {selectedIface.name}</h3>
            <div className="space-x-2">
              <button 
                onClick={toggleMonitoring}
                className={`px-3 py-1.5 rounded text-white text-sm ${isMonitoring ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
              </button>
              <button 
                onClick={gatherIntelligence}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-white text-sm"
              >
                Gather Intelligence
              </button>
            </div>
          </div>

          {selectedIface.id === '1' && (
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <EthernetPortIcon className="mr-2 h-5 w-5" /> Ethernet Intelligence
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm font-medium">DNS Suffix: {selectedIface.dnsSuffix || 'bo.kz.local'}</p>
                  <p className="text-sm font-medium">IPv6 Address: {selectedIface.ipv6Address || 'fe80::dd98:bd67:ff54:9c5c%15'}</p>
                  <p className="text-sm font-medium">IPv4 Address: {selectedIface.ipAddress}</p>
                  <p className="text-sm font-medium">Subnet Mask: {selectedIface.mask}</p>
                  <p className="text-sm font-medium">Default Gateway: {selectedIface.gateway}</p>
                  
                  {isMonitoring && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium">Live Traffic Monitoring</h4>
                      <div className="flex items-center space-x-2">
                        <Download className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Incoming:</span>
                        <Progress value={trafficData.in * 10} className="w-40 h-2" />
                        <span className="text-xs">{trafficData.in.toFixed(2)} MB/s</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Upload className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Outgoing:</span>
                        <Progress value={trafficData.out * 10} className="w-40 h-2" />
                        <span className="text-xs">{trafficData.out.toFixed(2)} MB/s</span>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="font-medium">Network Activity</h4>
                        <p className="text-sm">Devices detected: {deviceCount}</p>
                        <p className="text-sm">Last scan: {lastScan.toLocaleTimeString()}</p>
                        <p className="text-sm">Security status: {selectedIface.vulnerabilities?.length ? 'Vulnerabilities detected' : 'Secure'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <NetStat 
                label="Status" 
                value={selectedIface.status.toString()} 
                unit="" 
                icon={getStatusIcon(
                  typeof selectedIface.status === 'string' 
                    ? getStatusEnumValue(selectedIface.status) 
                    : selectedIface.status
                )} 
              />
              <NetStat label="IP Address" value={selectedIface.ipAddress} unit="" />
              <NetStat label="MAC Address" value={selectedIface.macAddress} unit="" />
              <NetStat label="Location" value={selectedIface.location || 'Unknown'} unit="" />
            </div>
            <div>
              <NetStat label="Transmit Rate" value={selectedIface.transmitRate} unit="Mbps" />
              <NetStat label="Receive Rate" value={selectedIface.receiveRate} unit="Mbps" />
              <NetStat label="Packet Loss" value={selectedIface.packetLoss} unit="%" />
              <NetStat label="Latency" value={selectedIface.latency} unit="ms" />
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-md font-semibold flex items-center">
              <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" /> Vulnerabilities:
            </h4>
            <VulnerabilityList vulnerabilities={selectedIface.vulnerabilities || []} />
          </div>
          
          {selectedIface.connectedDevices && selectedIface.connectedDevices.length > 0 && (
            <div className="mt-4">
              <h4 className="text-md font-semibold flex items-center">
                <Router className="mr-2 h-4 w-4" /> Connected Devices:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {selectedIface.connectedDevices.map((device, idx) => (
                  <div key={idx} className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">
                    {device}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Monitor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value={NetworkInterfaceStatus.active.toString()}>Active</TabsTrigger>
            <TabsTrigger value={NetworkInterfaceStatus.inactive.toString()}>Inactive</TabsTrigger>
            <TabsTrigger value={NetworkInterfaceStatus.online.toString()}>Online</TabsTrigger>
            <TabsTrigger value={NetworkInterfaceStatus.offline.toString()}>Offline</TabsTrigger>
            <TabsTrigger value={NetworkInterfaceStatus.vulnerable.toString()}>Vulnerable</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {interfaces.map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={NetworkInterfaceStatus.active.toString()} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getInterfaceByStatus(NetworkInterfaceStatus.active).map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={NetworkInterfaceStatus.inactive.toString()} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getInterfaceByStatus(NetworkInterfaceStatus.inactive).map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={NetworkInterfaceStatus.online.toString()} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getInterfaceByStatus(NetworkInterfaceStatus.online).map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={NetworkInterfaceStatus.offline.toString()} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getInterfaceByStatus(NetworkInterfaceStatus.offline).map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value={NetworkInterfaceStatus.vulnerable.toString()} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getInterfaceByStatus(NetworkInterfaceStatus.vulnerable).map(iface => (
                <NetCard
                  key={iface.id}
                  iface={iface}
                  isSelected={selectedInterface === iface.id}
                  onClick={() => handleInterfaceSelect(iface.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showNetworkDetails()}
      </CardContent>
    </Card>
  );
};

export default NetworkMonitor;
