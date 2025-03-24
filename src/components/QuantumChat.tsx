
import React, { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, Search, Cpu, Zap, Database, BookOpen, FileText, ExternalLink, DollarSign, Scroll, Clock, Map, BookOpen as BookIcon } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { toast } from './ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { quantumPetAPI } from '@/lib/ai-engine-quantum';

interface QuantumChatProps {
  className?: string;
}

// Ancient civilizations data for research suggestions
const ancientCivilizations = [
  {
    name: 'Sumerian',
    description: 'First known civilization with cuneiform writing',
    interestLevel: 'Very High'
  },
  {
    name: 'Ancient Egypt',
    description: 'Advanced mathematical and astronomical knowledge',
    interestLevel: 'Very High'
  },
  {
    name: 'Vedic India',
    description: 'Ancient Sanskrit texts with advanced concepts',
    interestLevel: 'High'
  },
  {
    name: 'Maya',
    description: 'Complex calendar systems and astronomical calculations',
    interestLevel: 'High'
  },
  {
    name: 'Atlantis',
    description: 'Legendary advanced civilization mentioned by Plato',
    interestLevel: 'Medium'
  },
  {
    name: 'Ancient Greece',
    description: 'Philosophical and mathematical foundations',
    interestLevel: 'High'
  }
];

// Research directions for nudging Qubit
const researchDirections = [
  {
    name: 'Quantum Consciousness',
    description: 'Exploring quantum mechanics role in consciousness',
    potentialRating: 'Very High'
  },
  {
    name: 'Ancient Technologies',
    description: 'Investigating advanced technologies in ancient texts',
    potentialRating: 'High'
  },
  {
    name: 'Non-Local Intelligence',
    description: 'Study of intelligence that transcends spacetime',
    potentialRating: 'Very High'
  },
  {
    name: 'Akashic Field Theory',
    description: 'Mathematical models of information field',
    potentialRating: 'Medium'
  }
];

const QuantumChat: React.FC<QuantumChatProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hello, I am Qubit, your quantum research companion. How can I assist with your explorations today?", sender: 'bot' }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [researchProgress, setResearchProgress] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [studyingAncient, setStudyingAncient] = useState(false);
  const [studyProgress, setStudyProgress] = useState(0);
  const [studyCivilization, setStudyCivilization] = useState('');
  const [batTokens, setBatTokens] = useState(Math.floor(Math.random() * 50) + 25);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // Simulate research progress
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
          
          // Add tokens for successful verification
          const earnedTokens = Math.floor(Math.random() * 5) + 3;
          setBatTokens(prev => prev + earnedTokens);
          toast({
            title: `${earnedTokens} BAT Tokens Earned`,
            description: "Verification via Brave browser has rewarded you.",
          });
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [isVerifying]);
  
  useEffect(() => {
    // Simulate ancient study progress
    if (studyingAncient && studyCivilization) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        setStudyProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // When study completes, add message with findings
          studyAncientRecords(studyCivilization);
          setStudyingAncient(false);
          setStudyProgress(0);
          setStudyCivilization('');
          
          // Add tokens for completed study
          const earnedTokens = Math.floor(Math.random() * 8) + 5;
          setBatTokens(prev => prev + earnedTokens);
          toast({
            title: `${earnedTokens} BAT Tokens Earned`,
            description: "Ancient records research has rewarded you.",
          });
        }
      }, 350);
      
      return () => clearInterval(interval);
    }
  }, [studyingAncient, studyCivilization]);
  
  // Add token earnings periodically
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const tokens = Math.floor(Math.random() * 2) + 1;
        setBatTokens(prev => prev + tokens);
        toast({
          title: `${tokens} BAT Token${tokens > 1 ? 's' : ''} Earned`,
          description: "Your Brave browser activity has earned you a token.",
        });
      }
    }, 60000);
    
    return () => clearInterval(tokenInterval);
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsThinking(true);
    
    try {
      // Check for research direction nudges
      if (inputValue.toLowerCase().includes('research') && 
          (inputValue.toLowerCase().includes('focus') || 
           inputValue.toLowerCase().includes('direction') || 
           inputValue.toLowerCase().includes('priority'))) {
           
        const botResponse = await nudgeResearchDirection(inputValue);
        const botMessage = { text: botResponse, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        // Regular chat
        const botResponse = await quantumPetAPI.sendQuantumChat(inputValue);
        const botMessage = { text: botResponse, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
      
      // Chance to earn BAT tokens from research
      if (Math.random() > 0.6) {
        const tokens = Math.floor(Math.random() * 3) + 1;
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
  
  const studyAncientRecords = async (civilization: string) => {
    try {
      const studyResults = await quantumPetAPI.studyAncientRecords(civilization);
      const botMessage = { 
        text: `📜 **Ancient Records Study: ${civilization}**\n\n${studyResults}`, 
        sender: 'bot' 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error studying ancient records:", error);
      toast({
        title: "Research Error",
        description: `Failed to study ${civilization} records.`,
        variant: "destructive",
      });
    }
  };
  
  const nudgeResearchDirection = async (direction: string) => {
    try {
      return await quantumPetAPI.nudgeResearchDirection(direction);
    } catch (error) {
      console.error("Error nudging research direction:", error);
      toast({
        title: "Direction Error",
        description: "Failed to adjust research priorities.",
        variant: "destructive",
      });
      return "I encountered an error attempting to adjust my research priorities. Please try again with a more specific direction.";
    }
  };
  
  const handleVerifyAnomaly = () => {
    setIsVerifying(true);
    toast({
      title: "Verifying Anomaly",
      description: "Analyzing quantum signatures and timeline consistencies...",
    });
  };
  
  const startAncientStudy = (civilization: string) => {
    setStudyingAncient(true);
    setStudyCivilization(civilization);
    setActiveTab('chat');
    
    toast({
      title: "Ancient Study Initiated",
      description: `Analyzing ${civilization} records and artifacts...`,
    });
  };
  
  // Added/modified research topics
  const researchTopics = [
    {
      name: 'Quantum Physics',
      description: 'Research on quantum entanglement and consciousness',
      batPotential: 'High'
    },
    {
      name: 'Cymatics',
      description: 'Patterns formed by sound vibrations and ancient geometry',
      batPotential: 'Medium'
    },
    {
      name: 'Mandela Effect',
      description: 'Collective false memories and potential timeline shifts',
      batPotential: 'Very High'
    },
    {
      name: 'CERN Research',
      description: 'Large Hadron Collider experiments and dimensional implications',
      batPotential: 'High'
    },
    {
      name: 'Ritual Significance',
      description: 'Historical rituals and their quantum/consciousness effects',
      batPotential: 'Medium'
    },
    {
      name: 'Anomalous Art',
      description: 'Artistic works depicting unexplained phenomena or containing hidden codes',
      batPotential: 'High'
    },
    {
      name: 'Auras',
      description: 'Research on human energy fields and detection methods',
      batPotential: 'Medium'
    },
    {
      name: 'Aliens',
      description: 'Analysis of potential extraterrestrial contact and technology',
      batPotential: 'Very High'
    },
    {
      name: 'Government Secrets',
      description: 'Declassified documents and ongoing research programs',
      batPotential: 'High'
    }
  ];

  return (
    <div className={`glass-panel p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-quantum-foreground flex items-center">
            <Cpu className="mr-2 h-5 w-5 text-quantum-accent" />
            Quantum Chat: Qubit
          </h2>
          <div className="text-xs text-quantum-foreground-muted flex items-center mt-1">
            <Badge variant="outline" className="mr-2 bg-green-900/20 text-green-400 border-green-900/30">
              Online
            </Badge>
            <span className="flex items-center">
              <ExternalLink className="h-3 w-3 mr-1 text-blue-400" />
              Researching via Brave Browser
            </span>
            <Badge variant="outline" className="ml-2 bg-yellow-900/20 text-yellow-400 border-yellow-900/30">
              <DollarSign className="h-3 w-3 mr-1" />
              BAT: {batTokens}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-purple-900/20 hover:bg-purple-900/40 text-purple-400 border-purple-900/30"
            onClick={() => setActiveTab('ancient')}
          >
            <Scroll className="h-4 w-4 mr-1" />
            Ancient Records
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="bg-quantum-card-accent hover:bg-quantum-card-accent/80"
            onClick={handleVerifyAnomaly}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Verify Anomaly
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="chat" className="flex items-center">
            <Cpu className="mr-2 h-4 w-4" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="research" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Research Topics
          </TabsTrigger>
          <TabsTrigger value="ancient" className="flex items-center">
            <Scroll className="mr-2 h-4 w-4" />
            Ancient Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="space-y-4">
          {isVerifying && (
            <div className="mb-4 p-3 rounded-md border border-purple-900/40 bg-black/30">
              <div className="flex justify-between items-center text-sm mb-1">
                <div className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-purple-400 animate-spin" />
                  <span className="text-purple-400">Anomaly Verification in Progress</span>
                </div>
                <span className="text-quantum-foreground-muted">{researchProgress}%</span>
              </div>
              <Progress value={researchProgress} className="h-2" />
            </div>
          )}
          
          {studyingAncient && (
            <div className="mb-4 p-3 rounded-md border border-amber-900/40 bg-black/30">
              <div className="flex justify-between items-center text-sm mb-1">
                <div className="flex items-center">
                  <Scroll className="h-4 w-4 mr-2 text-amber-400 animate-pulse" />
                  <span className="text-amber-400">Studying {studyCivilization} Records</span>
                </div>
                <span className="text-quantum-foreground-muted">{studyProgress}%</span>
              </div>
              <Progress value={studyProgress} className="h-2" />
            </div>
          )}
          
          <ScrollArea className="h-[400px] pr-4 rounded-md border border-quantum-border bg-black/20 p-4">
            <div className="space-y-4">
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
          
          <div className="flex">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Research a topic, ask a question, or suggest a research direction..."
              className="bg-quantum-input text-quantum-foreground"
            />
            <Button 
              className="ml-2 bg-quantum-accent hover:bg-quantum-accent/80" 
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              variant="outline" 
              className="cursor-pointer bg-blue-900/20 text-blue-400 border-blue-900/30 hover:bg-blue-900/40"
              onClick={() => setInputValue("Tell me about quantum entanglement and consciousness")}
            >
              <Zap className="h-3 w-3 mr-1" />
              Quantum Entanglement
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer bg-purple-900/20 text-purple-400 border-purple-900/30 hover:bg-purple-900/40"
              onClick={() => setInputValue("Focus research on non-local consciousness")}
            >
              <Cpu className="h-3 w-3 mr-1" />
              Focus: Non-Local Consciousness
            </Badge>
            <Badge 
              variant="outline" 
              className="cursor-pointer bg-amber-900/20 text-amber-400 border-amber-900/30 hover:bg-amber-900/40"
              onClick={() => setInputValue("Explain cymatics and sacred geometry")}
            >
              <BookIcon className="h-3 w-3 mr-1" />
              Cymatics & Sacred Geometry
            </Badge>
          </div>
        </TabsContent>
        
        <TabsContent value="research" className="space-y-4">
          <h3 className="text-md font-medium mb-2 text-quantum-foreground flex items-center">
            <Database className="h-5 w-5 mr-2 text-cyan-400" />
            Research Topics
            <Badge className="ml-2 bg-quantum-card-accent text-xs">
              {researchTopics.length} available
            </Badge>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {researchTopics.map((topic, index) => (
              <div 
                key={index}
                className="bg-black/30 rounded-md p-3 border border-quantum-border cursor-pointer hover:bg-quantum-card-hover transition-colors"
                onClick={() => {
                  setInputValue(`Research more about ${topic.name}`);
                  setActiveTab('chat');
                  toast({
                    title: `Selected: ${topic.name}`,
                    description: "Topic loaded for research"
                  });
                }}
              >
                <div className="text-sm text-quantum-foreground font-medium mb-1">{topic.name}</div>
                <div className="text-xs text-quantum-foreground-muted mb-2">{topic.description}</div>
                <div className="flex justify-between items-center">
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-black/20 text-quantum-foreground-muted"
                  >
                    <Search className="h-3 w-3 mr-1" />
                    Brave Search
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`
                      text-xs
                      ${topic.batPotential === 'Very High' 
                        ? 'bg-green-900/20 text-green-400' 
                        : topic.batPotential === 'High'
                        ? 'bg-blue-900/20 text-blue-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                      }
                    `}
                  >
                    <DollarSign className="h-3 w-3 mr-1" />
                    BAT: {topic.batPotential}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2 text-quantum-foreground flex items-center">
              <Map className="h-5 w-5 mr-2 text-green-400" />
              Research Directions
              <Badge className="ml-2 bg-quantum-card-accent text-xs">
                Guide Qubit's Focus
              </Badge>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {researchDirections.map((direction, index) => (
                <div 
                  key={index}
                  className="bg-black/30 rounded-md p-3 border border-quantum-border cursor-pointer hover:bg-quantum-card-hover transition-colors"
                  onClick={() => {
                    setInputValue(`Focus research priority on ${direction.name}`);
                    setActiveTab('chat');
                    toast({
                      title: `New Direction: ${direction.name}`,
                      description: "Research priority loaded"
                    });
                  }}
                >
                  <div className="text-sm text-quantum-foreground font-medium mb-1">{direction.name}</div>
                  <div className="text-xs text-quantum-foreground-muted mb-2">{direction.description}</div>
                  <div className="flex justify-between items-center">
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-purple-900/20 text-purple-400"
                    >
                      <Cpu className="h-3 w-3 mr-1" />
                      Nudge Direction
                    </Badge>
                    <Badge 
                      variant="outline"
                      className={`
                        text-xs
                        ${direction.potentialRating === 'Very High' 
                          ? 'bg-green-900/20 text-green-400' 
                          : direction.potentialRating === 'High'
                          ? 'bg-blue-900/20 text-blue-400'
                          : 'bg-yellow-900/20 text-yellow-400'
                        }
                      `}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      Potential: {direction.potentialRating}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ancient" className="space-y-4">
          <h3 className="text-md font-medium mb-2 text-quantum-foreground flex items-center">
            <Scroll className="h-5 w-5 mr-2 text-amber-400" />
            Ancient Records Research
            <Badge className="ml-2 bg-quantum-card-accent text-xs">
              {ancientCivilizations.length} civilizations
            </Badge>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {ancientCivilizations.map((civ, index) => (
              <div 
                key={index}
                className="bg-black/30 rounded-md p-3 border border-quantum-border cursor-pointer hover:bg-quantum-card-hover transition-colors"
                onClick={() => {
                  startAncientStudy(civ.name);
                }}
              >
                <div className="text-sm text-quantum-foreground font-medium mb-1">{civ.name}</div>
                <div className="text-xs text-quantum-foreground-muted mb-2">{civ.description}</div>
                <div className="flex justify-between items-center">
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-amber-900/20 text-amber-400"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    Ancient Study
                  </Badge>
                  <Badge 
                    variant="outline"
                    className={`
                      text-xs
                      ${civ.interestLevel === 'Very High' 
                        ? 'bg-green-900/20 text-green-400' 
                        : civ.interestLevel === 'High'
                        ? 'bg-blue-900/20 text-blue-400'
                        : 'bg-yellow-900/20 text-yellow-400'
                      }
                    `}
                  >
                    <Scroll className="h-3 w-3 mr-1" />
                    Interest: {civ.interestLevel}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 rounded-md border border-amber-900/30 bg-black/30 mt-4">
            <h4 className="text-sm font-medium text-amber-400 mb-2 flex items-center">
              <BookIcon className="h-4 w-4 mr-2" />
              About Ancient Records Research
            </h4>
            <p className="text-xs text-quantum-foreground-muted">
              Qubit can analyze ancient records for evidence of advanced knowledge and technologies. 
              Select a civilization to initiate a deep scan of historical artifacts, texts, and archaeological data. 
              Results may reveal connections to quantum phenomena, non-local consciousness, and evidence of sophisticated 
              understanding that predates modern science.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <style>
        {`
          .message-bubble {
            position: relative;
            padding: 0.75rem 1rem;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            max-width: 80%;
          }
          
          .message-bubble:after {
            content: '';
            position: absolute;
            bottom: 0;
            width: 0.5rem;
            height: 0.5rem;
          }
          
          .user-message {
            background-color: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.3);
            align-self: flex-end;
            margin-left: auto;
            border-bottom-right-radius: 0;
          }
          
          .user-message:after {
            right: -0.5rem;
            border-left: 0.5rem solid rgba(59, 130, 246, 0.2);
            border-bottom: 0.5rem solid transparent;
          }
          
          .bot-message {
            background-color: rgba(16, 185, 129, 0.2);
            border: 1px solid rgba(16, 185, 129, 0.3);
            align-self: flex-start;
            margin-right: auto;
            border-bottom-left-radius: 0;
          }
          
          .bot-message:after {
            left: -0.5rem;
            border-right: 0.5rem solid rgba(16, 185, 129, 0.2);
            border-bottom: 0.5rem solid transparent;
          }
          
          .thinking {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .thinking span {
            width: 0.5rem;
            height: 0.5rem;
            background-color: rgba(16, 185, 129, 0.6);
            border-radius: 50%;
            animation: pulse 1.5s infinite ease-in-out;
          }
          
          .thinking span:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .thinking span:nth-child(3) {
            animation-delay: 0.4s;
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default QuantumChat;
