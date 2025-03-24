
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type EmailMessage, type ExplorationEntry, type ResearchFinding, type FileDiscovery } from '@/types';
import { Atom, Brain, Zap, Sparkles, Cpu, RefreshCw, FileCode, BookOpen, Coffee, Globe, Mail, ExternalLink, Database, FileQuestion, Bookmark, Send, FileText, Calendar, Search, DollarSign } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Input } from './ui/input';

import { quantumPetAPI as apiImplementation } from '@/lib/ai-engine-quantum';
import type { QuantumPet as QuantumPetType } from '@/types/index';
import { convertTimeStampToNumber } from '@/utils/timestamp-utils';

const quantumPetAPI = apiImplementation;

interface QuantumPetProps {
  className?: string;
}

const QuantumPet: React.FC<QuantumPetProps> = ({ className }) => {
  const [pet, setPet] = useState<QuantumPetType>(() => quantumPetAPI.getQuantumPet() as unknown as QuantumPetType);
  const [isAnimating, setIsAnimating] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello, I am Qubit. How can I assist with your research today?", sender: 'bot' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [researchProgress, setResearchProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [batTokens, setBatTokens] = useState(Math.floor(Math.random() * 50) + 10);
  const [timeDisplayed, setTimeDisplayed] = useState(false);
  const [isAutoResearching, setIsAutoResearching] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPet = quantumPetAPI.getQuantumPet() as unknown as QuantumPetType;
      setPet(updatedPet);
      
      if (updatedPet.status === 'exploring' && Math.random() > 0.7) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 800);
      } else if (updatedPet.status === 'playing' && Math.random() > 0.8) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    if (isVerifying) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 1;
        setResearchProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          setIsVerifying(false);
          setResearchProgress(0);
          toast({
            title: "Anomaly Verified",
            description: "Quantum signatures confirmed. Further research recommended.",
          });
          
          setBatTokens(prev => prev + Math.floor(Math.random() * 5) + 1);
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isVerifying]);
  
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        setBatTokens(prev => prev + 1);
        toast({
          title: "BAT Token Earned",
          description: "Your Brave browser activity has earned you a token.",
        });
      }
    }, 60000);
    
    return () => clearInterval(tokenInterval);
  }, []);
  
  const handleExplore = () => {
    const researchSites = [
      { url: "arxiv.org", category: "academic" },
      { url: "researchgate.net", category: "research" },
      { url: "nature.com", category: "journal" },
      { url: "quantumcomputing.stackexchange.com", category: "forum" },
      { url: "quantum-journal.org", category: "journal" },
      { url: "physicsforums.com", category: "forum" },
      { url: "science.gov", category: "database" },
      { url: "ieee.org/quantum", category: "research" }
    ];
    
    const site = researchSites[Math.floor(Math.random() * researchSites.length)];
    
    quantumPetAPI.startQuantumExploration(site.url, site.category as 'academic' | 'research' | 'forum' | 'database' | 'journal');
    
    toast({
      title: "Exploration Started",
      description: `Qubit is now exploring ${site.url}`,
    });
    
    if (Math.random() > 0.5) {
      const tokens = Math.floor(Math.random() * 3) + 1;
      setBatTokens(prev => prev + tokens);
      toast({
        title: `${tokens} BAT Token${tokens > 1 ? 's' : ''} Earned`,
        description: "Exploration via Brave browser has rewarded you.",
      });
    }
  };
  
  const handleCheckEmail = () => {
    quantumPetAPI.checkQuantumEmail();
    toast({
      title: "Checking Email",
      description: `Qubit is checking quantum.qubit@quantum.ai`,
    });
  };
  
  const handleWriteDiscovery = () => {
    const discovery = quantumPetAPI.writeDiscoveryToFile();
    toast({
      title: "Writing Discovery",
      description: `Qubit is writing "${discovery.title}" to C: drive`,
    });
    
    if (Math.random() > 0.7) {
      const tokens = Math.floor(Math.random() * 2) + 1;
      setBatTokens(prev => prev + tokens);
    }
  };
  
  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    try {
      const botResponse = await quantumPetAPI.sendQuantumChat(inputValue);
      const botMessage = { text: botResponse, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      
      if (Math.random() > 0.7) {
        const tokens = Math.floor(Math.random() * 2) + 1;
        setBatTokens(prev => prev + tokens);
        toast({
          title: `${tokens} BAT Token${tokens > 1 ? 's' : ''} Earned`,
          description: "Research via Brave browser has rewarded you.",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response from Quantum AI.",
        variant: "destructive",
      });
    } finally {
      setIsThinking(false);
    }
  };
  
  const handleVerifyAnomaly = () => {
    setIsVerifying(true);
    toast({
      title: "Verifying Anomaly",
      description: "Analyzing quantum signatures and timeline consistencies...",
    });
  };
  
  const handleAutoResearchToggle = () => {
    setIsAutoResearching(prev => !prev);
  };
  
  const getStatusIcon = () => {
    switch(pet.status) {
      case 'researching': return <BookOpen className="h-4 w-4 text-indigo-400" />;
      case 'developing': return <FileCode className="h-4 w-4 text-emerald-400" />;
      case 'computing': return <Cpu className="h-4 w-4 text-cyan-400" />;
      case 'sleeping': return <Coffee className="h-4 w-4 text-gray-400" />;
      case 'playing': return <Sparkles className="h-4 w-4 text-amber-400" />;
      case 'exploring': return <Globe className="h-4 w-4 text-blue-400" />;
      case 'writing': return <FileText className="h-4 w-4 text-green-400" />;
    }
  };
  
  const getMoodIcon = () => {
    switch(pet.mood) {
      case 'excited': return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'focused': return <Brain className="h-4 w-4 text-purple-400" />;
      case 'curious': return <Atom className="h-4 w-4 text-blue-400" />;
      case 'tired': return <Coffee className="h-4 w-4 text-orange-400" />;
      case 'playful': return <Sparkles className="h-4 w-4 text-pink-400" />;
    }
  };
  
  const getAnimationClass = () => {
    if (glitching) return "animate-glitch";
    if (isAnimating) return "animate-bounce";
    if (pet.status === 'computing') return "animate-pulse";
    if (pet.status === 'exploring') return "animate-pulse-slow";
    if (pet.status === 'writing') return "animate-pulse";
    return "";
  };
  
  const getUnreadCount = () => {
    return pet.inbox?.filter(msg => !msg.read).length || 0;
  };
  
  const formatRelativeTime = (timestamp: any) => {
    const now = Date.now();
    const diff = now - convertTimeStampToNumber(timestamp);
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };
  
  const formatDate = (timestamp: any) => {
    return new Date(convertTimeStampToNumber(timestamp)).toLocaleString();
  };
  
  const timeSince = (timestamp: any) => {
    const now = Date.now();
    const diff = now - convertTimeStampToNumber(timestamp);
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };
  
  const calculateProgress = (start: any, end: any) => {
    const now = Date.now();
    const total = convertTimeStampToNumber(end) - convertTimeStampToNumber(start);
    const current = now - convertTimeStampToNumber(start);
    
    const percentage = (current / total) * 100;
    return Math.round(percentage);
  };
  
  const getTimeAgo = (timestamp: any) => {
    const seconds = Math.floor((Date.now() - convertTimeStampToNumber(timestamp)) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  const getFormattedDate = (timestamp: any) => {
    return new Date(convertTimeStampToNumber(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleLastFileWriteClick = () => {
    if (pet.lastFileWrite) {
      const fileTimestamp = pet.lastFileWrite.timestamp;
      console.log(`File timestamp: ${fileTimestamp}`);
      setTimeDisplayed(!timeDisplayed);
    }
  };
  
  const researchTopics = [
    {
      name: 'Quantum Computing',
      description: 'Latest breakthroughs in quantum computing and algorithms',
      batPotential: 'Very High'
    },
    {
      name: 'Advanced Mathematics',
      description: 'Complex mathematical theories and applications',
      batPotential: 'High'
    },
    {
      name: 'Pharmacology',
      description: 'New drug development and pharmaceutical research',
      batPotential: 'High'
    },
    {
      name: 'Neuropharmacology',
      description: 'Effects of drugs on the nervous system and brain function',
      batPotential: 'Very High'
    },
    {
      name: 'String Theory',
      description: 'Latest developments in theoretical physics and string theory',
      batPotential: 'Medium'
    },
    {
      name: 'Synthetic Biology',
      description: 'Emerging research in synthetic organisms and genetic engineering',
      batPotential: 'High'
    }
  ];
  
  return (
    <div className={`relative ${className}`}>
      <div className="glass-panel border border-basilisk-muted rounded-lg p-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-basilisk-foreground flex items-center">
            <Atom className="mr-1 h-4 w-4 text-cyan-400" />
            Quantum Can: {pet.name}
          </h3>
          <div className="flex items-center">
            <Badge 
              variant="outline" 
              className="text-xs py-0 h-5 flex items-center gap-1 bg-black/30 mr-2"
            >
              {getStatusIcon()}
              {pet.status}
            </Badge>
            <Badge 
              variant="outline" 
              className="text-xs py-0 h-5 flex items-center gap-1 bg-yellow-900/30 text-yellow-400"
            >
              <DollarSign className="h-3 w-3 mr-0.5" />
              BAT: {batTokens}
            </Badge>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 h-7 mb-2 bg-black/20">
            <TabsTrigger value="overview" className="text-xs h-6">Overview</TabsTrigger>
            <TabsTrigger value="chat" className="text-xs h-6 relative">
              Chat
              {isThinking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="explore" className="text-xs h-6">Explore</TabsTrigger>
            <TabsTrigger value="research" className="text-xs h-6">Research</TabsTrigger>
            <TabsTrigger value="inbox" className="text-xs h-6 relative">
              Inbox
              {getUnreadCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 text-[8px] flex items-center justify-center">
                    {getUnreadCount() > 9 ? '9+' : getUnreadCount()}
                  </span>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="files" className="text-xs h-6 relative">
              C: Drive
              {pet.isWritingToFile && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              )}
            </TabsTrigger>
          </TabsList>
        
          <TabsContent value="overview" className="space-y-2">
            <div className={`relative flex justify-center mb-3 ${getAnimationClass()}`}>
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/40 to-purple-600/40 blur-sm animate-pulse" 
                  style={{ transform: `scale(${1 + pet.energyLevel/200})` }} />
                
                <div className="relative z-10 bg-black/70 rounded-full p-4 border border-cyan-900/50 flex items-center justify-center">
                  <Atom className="h-8 w-8 text-cyan-400" />
                  
                  <div className="absolute inset-0 rounded-full">
                    <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin-slow" 
                      style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }} />
                    <div className="absolute inset-0 rounded-full border border-purple-500/30 animate-reverse-spin" 
                      style={{ width: '140%', height: '110%', left: '-20%', top: '-5%' }} />
                    <div className="absolute inset-0 rounded-full border border-indigo-500/30 animate-spin" 
                      style={{ width: '130%', height: '130%', left: '-15%', top: '-15%' }} />
                  </div>
                  
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <div className={`h-1.5 w-1.5 rounded-full ${pet.mood === 'excited' || pet.mood === 'playful' ? 'bg-yellow-400 animate-pulse' : 'bg-basilisk-muted'}`}></div>
                    <div className={`h-1.5 w-1.5 rounded-full ${pet.status === 'computing' || pet.status === 'exploring' || pet.status === 'writing' ? 'bg-cyan-400 animate-pulse' : 'bg-basilisk-muted'}`}></div>
                    <div className={`h-1.5 w-1.5 rounded-full ${pet.energyLevel < 30 ? 'bg-red-400 animate-pulse' : pet.energyLevel > 80 ? 'bg-green-400' : 'bg-basilisk-muted'}`}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs text-basilisk-foreground-muted flex items-center">
                <div className="flex items-center mr-3">
                  {getMoodIcon()}
                  <span className="ml-1">{pet.mood}</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>{Math.round(pet.energyLevel)}%</span>
                </div>
              </div>
              <div className="flex items-center text-xs text-basilisk-foreground-muted">
                <span className="font-mono text-cyan-400">{pet.quantumBits}</span> 
                <span className="ml-1">qubits</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted flex items-center">
                    <BookOpen className="h-3 w-3 mr-1 text-indigo-400" /> Research
                  </span>
                  <span className="text-basilisk-foreground-muted">{Math.round(pet.researchProgress)}%</span>
                </div>
                <Progress value={pet.researchProgress} className="h-1.5" 
                  style={{ background: 'rgba(99, 102, 241, 0.2)' }}
                />
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-basilisk-foreground-muted flex items-center">
                    <FileCode className="h-3 w-3 mr-1 text-emerald-400" /> Development
                  </span>
                  <span className="text-basilisk-foreground-muted">{Math.round(pet.developmentProgress)}%</span>
                </div>
                <Progress value={pet.developmentProgress} className="h-1.5" 
                  style={{ background: 'rgba(52, 211, 153, 0.2)' }}
                />
              </div>
            </div>
            
            {pet.lastDiscovery && (
              <div className="mb-3 text-xs bg-black/40 rounded p-2 border border-basilisk-muted">
                <div className="text-basilisk-foreground-muted mb-1 flex items-center">
                  <Zap className="h-3 w-3 mr-1 text-yellow-400" />
                  Latest Discovery:
                </div>
                <div className="text-cyan-400 font-mono">{pet.lastDiscovery}</div>
              </div>
            )}
            
            <ScrollArea className="h-24 rounded-md text-xs">
              <div className="space-y-1.5">
                {pet.discoveries.map((discovery, index) => (
                  <div key={index} className="flex items-center">
                    <Atom className="h-3 w-3 mr-1 flex-shrink-0 text-blue-400 opacity-70" />
                    <span className="text-basilisk-foreground-muted">{discovery}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-basilisk-foreground flex items-center">
                <Cpu className="h-4 w-4 mr-1 text-purple-400" />
                <span>Quantum Chat</span>
              </div>
              <div className="flex items-center">
                <Badge 
                  variant="outline" 
                  className="text-xs py-0 h-5 mr-2 bg-green-900/20 text-green-400 border-green-900/30"
                >
                  Online
                </Badge>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="h-7 text-xs bg-quantum-card-accent hover:bg-quantum-card-accent/80 py-0"
                  onClick={handleVerifyAnomaly}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Verify Anomaly
                </Button>
              </div>
            </div>
            
            {isVerifying && (
              <div className="bg-black/30 rounded p-2 border border-purple-900/30 mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-purple-400 flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    Anomaly Verification
                  </span>
                  <span className="text-basilisk-foreground-muted">{researchProgress}%</span>
                </div>
                <Progress value={researchProgress} className="h-1.5" 
                  style={{ background: 'rgba(147, 51, 234, 0.2)' }}
                />
              </div>
            )}
            
            <div className="flex flex-col h-[200px]">
              <ScrollArea className="flex-grow mb-2 pr-2">
                <div className="space-y-2">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
                    >
                      {message.text}
                    </div>
                  ))}
                  {isThinking && (
                    <div className="message-bubble bot-message thinking">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>
              </ScrollArea>
              
              <div className="flex mt-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Research a topic or ask a question..."
                  className="bg-black/30 text-basilisk-foreground border-basilisk-muted text-xs h-8"
                />
                <Button 
                  className="ml-2 bg-purple-600/80 hover:bg-purple-600 h-8 w-8 p-0" 
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-2">
              <div className="text-xs text-basilisk-foreground-muted mb-1 flex items-center">
                <Database className="h-3 w-3 mr-1 text-purple-400" />
                Research Topics via Brave Browser:
              </div>
              <div className="grid grid-cols-2 gap-1">
                {researchTopics.slice(0, 4).map((topic, index) => (
                  <div 
                    key={index}
                    className="bg-black/30 rounded p-1.5 border border-quantum-border cursor-pointer hover:bg-quantum-card-hover"
                    onClick={() => {
                      setInputValue(`Research more about ${topic.name}`);
                      toast({
                        title: `Selected: ${topic.name}`,
                        description: "Topic loaded for research"
                      });
                    }}
                  >
                    <div className="text-[10px] text-basilisk-foreground">{topic.name}</div>
                    <div className="flex justify-between items-center mt-1">
                      <Badge 
                        variant="outline" 
                        className="text-[8px] py-0 h-3.5 bg-black/20 text-basilisk-foreground-muted"
                      >
                        <Search className="h-2 w-2 mr-0.5" />
                        Brave
                      </Badge>
                      <Badge 
                        variant="outline"
                        className={`
                          text-[8px] py-0 h-3.5
                          ${topic.batPotential === 'Very High' 
                            ? 'bg-green-900/20 text-green-400' 
                            : topic.batPotential === 'High'
                            ? 'bg-blue-900/20 text-blue-400'
                            : 'bg-yellow-900/20 text-yellow-400'
                          }
                        `}
                      >
                        <DollarSign className="h-2 w-2 mr-0.5" />
                        {topic.batPotential}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-basilisk-foreground flex items-center">
                <Globe className="h-4 w-4 mr-1 text-blue-400" />
                <span>Scientific Exploration</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs bg-black/20 hover:bg-black/40 border border-basilisk-muted"
                onClick={handleExplore}
              >
                <Globe className="h-3 w-3 mr-1" /> Explore
              </Button>
            </div>
            
            {pet.currentExploration && (
              <div className="bg-black/30 rounded-md p-2 border border-basilisk-muted text-xs mb-3 animate-pulse">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <ExternalLink className="h-3 w-3 mr-1 text-blue-400" />
                    <span className="text-cyan-400 font-medium">{pet.currentExploration.site}</span>
                  </div>
                  <Badge variant="outline" className="h-4 text-[8px] px-1">
                    {pet.currentExploration.category}
                  </Badge>
                </div>
                <div className="text-basilisk-foreground-muted">
                  Exploring... {Math.floor(Math.random() * 100)}% complete
                </div>
              </div>
            )}
            
            <ScrollArea className="h-[180px] rounded-md">
              <div className="space-y-2">
                {pet.explorationHistory && pet.explorationHistory.length > 0 ? (
                  pet.explorationHistory.map((entry) => (
                    <div key={entry.id} className="text-xs bg-black/20 rounded-md p-2 border border-basilisk-muted">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1 text-blue-400" />
                          <span className="text-basilisk-foreground">{entry.site}</span>
                        </div>
                        <Badge variant="outline" className="h-4 text-[8px] px-1">
                          {entry.category}
                        </Badge>
                      </div>
                      <div className="text-basilisk-foreground-muted">
                        {formatRelativeTime(entry.timestamp)}
                      </div>
                      {entry.findings && entry.findings.length > 0 && (
                        <div className="mt-1 pt-1 border-t border-basilisk-muted">
                          <div className="text-[10px] text-basilisk-foreground-muted mb-1">Findings:</div>
                          <ul className="list-disc list-inside text-[10px] text-basilisk-foreground-muted">
                            {entry.findings.map((finding, idx) => (
                              <li key={idx} className="truncate">{finding}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-basilisk-foreground-muted text-xs p-4">
                    No exploration history yet. Click "Explore" to start.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="research" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-basilisk-foreground flex items-center">
                <Database className="h-4 w-4 mr-1 text-indigo-400" />
                <span>Research Findings</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {pet.researchFindings ? pet.researchFindings.length : 0} entries
              </Badge>
            </div>
            
            <ScrollArea className="h-[180px] rounded-md">
              <div className="space-y-2">
                {pet.researchFindings && pet.researchFindings.length > 0 ? (
                  pet.researchFindings.map((finding) => (
                    <div key={finding.id} className="text-xs bg-black/20 rounded-md p-2 border border-basilisk-muted">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <FileQuestion className="h-3 w-3 mr-1 text-indigo-400" />
                          <span className="text-basilisk-foreground font-medium">{finding.title}</span>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`h-4 text-[8px] px-1 ${
                            finding.importance === 'breakthrough' ? 'bg-purple-900/50 text-purple-300' :
                            finding.importance === 'high' ? 'bg-red-900/50 text-red-300' :
                            finding.importance === 'medium' ? 'bg-yellow-900/50 text-yellow-300' :
                            'bg-blue-900/50 text-blue-300'
                          }`}
                        >
                          {finding.importance}
                        </Badge>
                      </div>
                      <div className="text-basilisk-foreground-muted text-[10px] mb-1">
                        {finding.summary}
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-cyan-400/70">{finding.source}</span>
                        <span className="text-basilisk-foreground-muted">{getTimeAgo(finding.timestamp)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-basilisk-foreground-muted text-xs p-4">
                    No research findings yet. Explore scientific sites to collect data.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="inbox" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-basilisk-foreground flex items-center">
                <Mail className="h-4 w-4 mr-1 text-purple-400" />
                <span>{pet.email || "quantum.qubit@rokosai.quantum"}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs bg-black/20 hover:bg-black/40 border border-basilisk-muted"
                onClick={handleCheckEmail}
              >
                <RefreshCw className="h-3 w-3 mr-1" /> Check Mail
              </Button>
            </div>
            
            <ScrollArea className="h-[180px] rounded-md">
              <div className="space-y-2">
                {pet.inbox && pet.inbox.length > 0 ? (
                  pet.inbox.map((email) => (
                    <div 
                      key={email.id} 
                      className={`text-xs rounded-md p-2 border ${
                        !email.read 
                          ? 'bg-indigo-950/30 border-indigo-700/40' 
                          : 'bg-black/20 border-basilisk-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          {email.important && <Bookmark className="h-3 w-3 mr-1 text-yellow-400" />}
                          <Mail className={`h-3 w-3 ${email.important ? 'mr-1' : 'mr-1'} ${!email.read ? 'text-blue-400' : 'text-basilisk-foreground-muted'}`} />
                          <span className={`${!email.read ? 'text-white font-medium' : 'text-basilisk-foreground'}`}>
                            {email.subject}
                          </span>
                        </div>
                        <span className="text-basilisk-foreground-muted text-[10px]">
                          {formatRelativeTime(email.timestamp)}
                        </span>
                      </div>
                      <div className="text-basilisk-foreground-muted mb-1 text-[10px]">
                        From: <span className="text-cyan-400/80">{email.from}</span>
                      </div>
                      <div className={`${!email.read ? 'text-white/90' : 'text-basilisk-foreground-muted'} text-[10px]`}>
                        {email.content}
                      </div>
                      <div className="mt-1 pt-1 flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-5 w-5">
                          <Send className="h-3 w-3 text-basilisk-foreground-muted" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-basilisk-foreground-muted text-xs p-4">
                    No messages in inbox. Click "Check Mail" to refresh.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="files" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-basilisk-foreground flex items-center">
                <FileText className="h-4 w-4 mr-1 text-green-400" />
                <span>C: Drive Discoveries</span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-xs bg-black/20 hover:bg-black/40 border border-basilisk-muted"
                onClick={handleWriteDiscovery}
                disabled={pet.isWritingToFile}
              >
                <FileText className="h-3 w-3 mr-1" />
                Write Now
              </Button>
            </div>
            
            {pet.isWritingToFile && (
              <div className="bg-black/30 rounded-md p-2 border border-green-900/40 text-xs mb-3 animate-pulse">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <FileText className="h-3 w-3 mr-1 text-green-400" />
                    <span className="text-green-400 font-medium">Writing to C: Drive...</span>
                  </div>
                </div>
                <div className="text-basilisk-foreground-muted">
                  Generating discovery document... Please wait...
                </div>
              </div>
            )}
            
            {pet.lastFileWrite && (
              <div className="text-xs text-basilisk-foreground-muted mb-2">
                Last written: {formatRelativeTime(pet.lastFileWrite.timestamp)}
                <span className="ml-2 text-cyan-400/70">
                  {getFormattedDate(new Date(pet.lastFileWrite.timestamp))}
                </span>
              </div>
            )}
            
            <ScrollArea className="h-[160px] rounded-md">
              <div className="space-y-2">
                {pet.dailyDiscoveries && pet.dailyDiscoveries.length > 0 ? (
                  pet.dailyDiscoveries.map((file) => (
                    <div key={file.id} className="text-xs bg-black/20 rounded-md p-2 border border-basilisk-muted">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <FileText className="h-3 w-3 mr-1 text-green-400" />
                          <span className="text-basilisk-foreground font-medium truncate max-w-[150px]">{file.title}</span>
                        </div>
                        <Badge variant="outline" className="h-4 text-[8px] px-1">
                          {file.category}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-basilisk-foreground-muted mb-1 truncate">
                        {file.filepath}
                      </div>
                      <div className="text-[10px] text-cyan-400/80 mb-1">
                        {getFormattedDate(file.date)}
                      </div>
                      <div className="text-[10px] text-basilisk-foreground-muted truncate">
                        {file.content.substring(0, 100)}{file.content.length > 100 ? '...' : ''}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-basilisk-foreground-muted text-xs p-4">
                    No files discovered yet. Click "Write Now" to create one.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuantumPet;
