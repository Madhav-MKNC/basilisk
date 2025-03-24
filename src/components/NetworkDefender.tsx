import React, { useState, useEffect } from 'react';
import { NetworkInterface, NetworkInterfaceStatus } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area"
import { MoreVertical, AlertTriangle, ArrowDown, ArrowUp, Wifi, Database, Bluetooth, ShieldAlert } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';

const NetworkDefender: React.FC = () => {
  const [interfaces, setInterfaces] = useState<NetworkInterface[]>([
    {
      id: 'eth0',
      name: 'Ethernet',
      type: 'ethernet',
      status: NetworkInterfaceStatus.active,
      ipAddress: '192.168.1.100',
      macAddress: '00:1A:2B:3C:4D:5E',
      transmitRate: 120,
      receiveRate: 90,
      packetLoss: 0.02,
      latency: 5,
      location: 'Home Network',
      bandwidth: 1000,
      throughput: 800,
      vulnerabilities: ['CVE-2023-4567', 'CVE-2023-4568'],
      lastScan: new Date(),
      securityLevel: 75,
      connectedDevices: ['Laptop', 'Smart TV'],
      mask: '255.255.255.0',
      dataTransferred: 500,
      gateway: '192.168.1.1'
    },
    {
      id: 'wlan0',
      name: 'Wi-Fi',
      type: 'wifi',
      status: NetworkInterfaceStatus.online,
      ipAddress: '192.168.1.101',
      macAddress: '00:A1:B2:C3:D4:E5',
      transmitRate: 80,
      receiveRate: 60,
      packetLoss: 0.01,
      latency: 8,
      location: 'Coffee Shop',
      bandwidth: 50,
      throughput: 40,
      vulnerabilities: ['WPA2 Vulnerability'],
      lastScan: new Date(),
      securityLevel: 60,
      connectedDevices: ['Smartphone', 'Tablet'],
      mask: '255.255.255.0',
      dataTransferred: 300,
      gateway: '192.168.1.1'
    },
    {
      id: 'bluetooth0',
      name: 'Bluetooth',
      type: 'bluetooth',
      status: NetworkInterfaceStatus.inactive,
      ipAddress: '192.168.1.102',
      macAddress: '11:22:33:44:55:66',
      transmitRate: 10,
      receiveRate: 5,
      packetLoss: 0,
      latency: 1,
      location: 'Personal Devices',
      bandwidth: 3,
      throughput: 2,
      vulnerabilities: ['BlueBorne'],
      lastScan: new Date(),
      securityLevel: 90,
      connectedDevices: ['Headphones', 'Smartwatch'],
      mask: '255.255.255.0',
      dataTransferred: 10,
      gateway: '192.168.1.1'
    },
  ]);

  const [selectedInterface, setSelectedInterface] = useState<NetworkInterface | null>(null);
  const [isFirewallEnabled, setIsFirewallEnabled] = useState(true);
  const [intrusionDetectionLevel, setIntrusionDetectionLevel] = useState(50);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setInterfaces(prevInterfaces =>
        prevInterfaces.map(iface => ({
          ...iface,
          transmitRate: Math.max(0, iface.transmitRate + Math.floor(Math.random() * 20) - 10),
          receiveRate: Math.max(0, iface.receiveRate + Math.floor(Math.random() * 20) - 10),
          packetLoss: Math.max(0, iface.packetLoss + (Math.random() * 0.01) - 0.005),
          securityLevel: Math.max(0, Math.min(100, iface.securityLevel + Math.floor(Math.random() * 4) - 2)),
        }))
      );
    }, 5000);

    return () => clearInterval(scanInterval);
  }, []);

  const getInterfaceIcon = (type: string) => {
    switch (type) {
      case 'wifi':
        return <Wifi className="mr-2 h-4 w-4" />;
      case 'ethernet':
        return <Database className="mr-2 h-4 w-4" />;
      case 'bluetooth':
        return <Bluetooth className="mr-2 h-4 w-4" />;
      default:
        return <Database className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Defender</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firewall">Firewall</Label>
            <div className="flex items-center space-x-2">
              <Switch id="firewall" checked={isFirewallEnabled} onCheckedChange={setIsFirewallEnabled} />
              <span>{isFirewallEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
          <div>
            <Label htmlFor="intrusion-detection">Intrusion Detection Level</Label>
            <Slider
              id="intrusion-detection"
              defaultValue={[intrusionDetectionLevel]}
              max={100}
              step={1}
              onValueChange={(value) => setIntrusionDetectionLevel(value[0])}
            />
            <Progress value={intrusionDetectionLevel} />
          </div>
        </div>

        <div>
          <Label>Network Interfaces</Label>
          <ScrollArea className="h-[200px] w-full rounded-md border">
            <div className="p-2">
              {interfaces.map((iface) => (
                <div
                  key={iface.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-secondary"
                  onClick={() => setSelectedInterface(iface)}
                >
                  <div className="flex items-center">
                    {getInterfaceIcon(iface.type)}
                    <span>{iface.name} ({iface.ipAddress})</span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Scan for Vulnerabilities</DropdownMenuItem>
                      <DropdownMenuItem>Block Suspicious Activity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {selectedInterface && (
          <div>
            <Label>Interface Details: {selectedInterface.name}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <p>Status: {selectedInterface.status}</p>
                <p>IP Address: {selectedInterface.ipAddress}</p>
                <p>MAC Address: {selectedInterface.macAddress}</p>
                <p>Location: {selectedInterface.location}</p>
              </div>
              <div>
                <p>Transmit Rate: {selectedInterface.transmitRate} Mbps</p>
                <p>Receive Rate: {selectedInterface.receiveRate} Mbps</p>
                <p>Packet Loss: {selectedInterface.packetLoss}%</p>
                <p>Latency: {selectedInterface.latency} ms</p>
              </div>
            </div>
            <div>
              <Label>Vulnerabilities</Label>
              {selectedInterface.vulnerabilities && selectedInterface.vulnerabilities.length > 0 ? (
                <ul>
                  {selectedInterface.vulnerabilities.map((vuln, index) => (
                    <li key={index} className="flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                      {vuln}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No vulnerabilities detected.</p>
              )}
            </div>
          </div>
        )}

        <div>
          <Label>Scan History</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP", { locale: enUS })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkDefender;
