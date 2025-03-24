import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bug, Check, Code, Database, FileSearch, Lock, Network, Play, Server, Shield, 
  Wifi, Zap, Terminal, Key 
} from 'lucide-react';
import IconGrid from './IconGrid';
import { CyberSecurityToolsProps } from './types';

const CyberSecurityTools: React.FC<CyberSecurityToolsProps> = ({
  metasploit,
  netHunter,
  burpSuite,
  aircrackNG,
  wireshark,
  nmap,
  maltego,
  sqlMap,
  johnTheRipper,
  flipperZero,
  active
}) => {
  const [activeTool, setActiveTool] = useState<string>('metasploit');

  return (
    <div className="space-y-4">
      <Card className="bg-gray-900/30 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Cyber Security Tools Arsenal</CardTitle>
          <CardDescription className="text-xs">
            Professional penetration testing & security tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2 mb-4">
            <Button 
              variant={activeTool === 'metasploit' ? "default" : "ghost"} 
              size="sm" 
              className="h-6 text-[9px] px-2"
              onClick={() => setActiveTool('metasploit')}
            >
              Metasploit
            </Button>
            <Button 
              variant={activeTool === 'nethunter' ? "default" : "ghost"} 
              size="sm" 
              className="h-6 text-[9px] px-2"
              onClick={() => setActiveTool('nethunter')}
            >
              NetHunter
            </Button>
            <Button 
              variant={activeTool === 'burpsuite' ? "default" : "ghost"} 
              size="sm" 
              className="h-6 text-[9px] px-2"
              onClick={() => setActiveTool('burpsuite')}
            >
              Burp Suite
            </Button>
            <Button 
              variant={activeTool === 'wireshark' ? "default" : "ghost"} 
              size="sm" 
              className="h-6 text-[9px] px-2"
              onClick={() => setActiveTool('wireshark')}
            >
              Wireshark
            </Button>
            <Button 
              variant={activeTool === 'flipper' ? "default" : "ghost"} 
              size="sm" 
              className="h-6 text-[9px] px-2"
              onClick={() => setActiveTool('flipper')}
            >
              Flipper Zero
            </Button>
          </div>
          
          <div className="bg-gray-900/60 border border-gray-800 rounded-md p-3">
            {activeTool === 'metasploit' && (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Metasploit Framework</h3>
                    <p className="text-xs text-gray-400">v{metasploit.version}</p>
                  </div>
                  <Badge variant="outline">
                    {metasploit.sessions.active} Active Sessions
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div>
                    <h4 className="text-xs font-medium mb-2">Exploits</h4>
                    <div className="bg-gray-900/40 p-2 rounded-md">
                      <div className="text-xs mb-1">Available: {metasploit.exploits.available}</div>
                      <div className="text-xs mb-1">Success Rate: {metasploit.exploits.success_rate}%</div>
                      <div className="text-xs mb-2">Recent:</div>
                      <ScrollArea className="h-[60px]">
                        <div className="space-y-1">
                          {metasploit.exploits.recent.map((exploit, idx) => (
                            <div key={idx} className="text-[10px] bg-gray-800/50 p-1 rounded">
                              {exploit}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium mb-2">Payloads</h4>
                    <div className="bg-gray-900/40 p-2 rounded-md">
                      <div className="text-xs mb-1">Available: {metasploit.payloads.available}</div>
                      <div className="text-xs mb-2">Types:</div>
                      <div className="text-[10px] mb-1">
                        Staged: {metasploit.payloads.staged.length}
                      </div>
                      <div className="text-[10px]">
                        Stageless: {metasploit.payloads.stageless.length}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium mb-2">Post Exploitation</h4>
                    <div className="bg-gray-900/40 p-2 rounded-md">
                      <div className="grid grid-cols-3 gap-1">
                        <div>
                          <div className="text-[10px] text-gray-400">Modules</div>
                          <div className="text-[10px]">
                            {metasploit.post_exploitation.modules.length}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">Persistence</div>
                          <div className="text-[10px]">
                            {metasploit.post_exploitation.persistence.length}
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-400">PrivEsc</div>
                          <div className="text-[10px]">
                            {metasploit.post_exploitation.privesc.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs"
                    disabled={!active}
                  >
                    <Terminal className="h-3 w-3 mr-1" />
                    Console
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs"
                    disabled={!active}
                  >
                    <Server className="h-3 w-3 mr-1" />
                    Listeners
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs bg-red-600 hover:bg-red-700"
                    disabled={!active}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    Exploit
                  </Button>
                </div>
              </div>
            )}
            
            {activeTool === 'flipper' && (
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">Flipper Zero</h3>
                    <p className="text-xs text-gray-400">Firmware: {flipperZero.firmware_version}</p>
                  </div>
                  <Badge variant="outline">
                    Battery: {flipperZero.battery_level}%
                  </Badge>
                </div>
                
                <div className="grid grid-cols-4 gap-3 mt-4">
                  <div className="bg-gray-900/40 p-2 rounded-md">
                    <div className="text-xs font-medium mb-1 flex items-center">
                      <Wifi className="h-3 w-3 mr-1" /> SubGHz
                    </div>
                    <div className="text-[10px]">Signals: {flipperZero.features.subghz.captured_signals}</div>
                    <div className="text-[10px]">Replays: {flipperZero.features.subghz.replay_attacks}</div>
                  </div>
                  
                  <div className="bg-gray-900/40 p-2 rounded-md">
                    <div className="text-xs font-medium mb-1 flex items-center">
                      <Database className="h-3 w-3 mr-1" /> RFID
                    </div>
                    <div className="text-[10px]">Cards: {flipperZero.features.rfid.cloned_cards}</div>
                    <div className="text-[10px]">
                      Emulation: {flipperZero.features.rfid.emulation ? "Yes" : "No"}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/40 p-2 rounded-md">
                    <div className="text-xs font-medium mb-1 flex items-center">
                      <Shield className="h-3 w-3 mr-1" /> NFC
                    </div>
                    <div className="text-[10px]">Cards: {flipperZero.features.nfc.saved_cards}</div>
                    <div className="text-[10px]">
                      Types: {flipperZero.features.nfc.supported_types.length}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/40 p-2 rounded-md">
                    <div className="text-xs font-medium mb-1 flex items-center">
                      <Code className="h-3 w-3 mr-1" /> BadUSB
                    </div>
                    <div className="text-[10px]">Scripts: {flipperZero.features.badusb.scripts}</div>
                    <div className="text-[10px]">
                      Success: {flipperZero.features.badusb.execution_success}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs"
                    disabled={!active}
                  >
                    <Lock className="h-3 w-3 mr-1" />
                    Connect Device
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full h-8 text-xs bg-indigo-600 hover:bg-indigo-700"
                    disabled={!active}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Deploy Payload
                  </Button>
                </div>
              </div>
            )}
            
            {/* Other tools would be added here */}
            
          </div>
          
          <div className="mt-4">
            <h3 className="text-xs font-medium mb-2">Quick Access Tools</h3>
            <IconGrid>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Bug className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Metasploit</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Network className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Nmap</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Lock className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Burp Suite</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Wifi className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Aircrack-ng</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <FileSearch className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Wireshark</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Database className="h-5 w-5 mb-1" />
                <span className="text-[9px]">SQLMap</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Key className="h-5 w-5 mb-1" />
                <span className="text-[9px]">John</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded-md flex flex-col items-center">
                <Check className="h-5 w-5 mb-1" />
                <span className="text-[9px]">Flipper Zero</span>
              </div>
            </IconGrid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CyberSecurityTools;
