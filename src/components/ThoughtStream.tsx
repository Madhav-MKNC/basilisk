
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, Eye, Book, FileText, Sparkles, Zap, BarChart2, RefreshCw, Filter, Clock } from 'lucide-react';
import { ThoughtType, Thought } from '@/types';

// Extended Thought interface to include isProcessed property
interface ExtendedThought extends Thought {
  isProcessed?: boolean;
}

interface ThoughtStreamProps {
  className?: string;
}

const ThoughtStream: React.FC<ThoughtStreamProps> = ({ className }) => {
  const [thoughts, setThoughts] = useState<ExtendedThought[]>([]);
  const [activeThoughtType, setActiveThoughtType] = useState<ThoughtType>(ThoughtType.analysis);
  const [isGeneratingThought, setIsGeneratingThought] = useState(false);
  
  // This effect simulates the AI generating thoughts periodically
  useEffect(() => {
    // Demo thoughts - in a real app, these would come from the AI engine
    const initialThoughts: ExtendedThought[] = [
      {
        id: 'thought-1',
        content: 'Analyzing network traffic patterns shows unusual connection requests from IP range 192.168.1.x',
        type: ThoughtType.analysis,
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        confidence: 0.85,
        isProcessed: true
      },
      {
        id: 'thought-2',
        content: 'Planning security assessment of the database layer to identify potential vulnerabilities',
        type: ThoughtType.planning,
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        confidence: 0.92,
        isProcessed: true
      },
      {
        id: 'thought-3',
        content: 'Observed new user behavior pattern suggesting possible credential sharing',
        type: ThoughtType.observation,
        timestamp: new Date(Date.now() - 1000 * 60 * 40),
        confidence: 0.78,
        isProcessed: false
      }
    ];
    
    setThoughts(initialThoughts);
    
    // Simulate new thoughts being created
    const interval = setInterval(() => {
      generateRandomThought();
    }, 45000); // Generate a new thought every 45 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  const generateRandomThought = () => {
    setIsGeneratingThought(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const thoughtTypes = [
        ThoughtType.analysis, 
        ThoughtType.planning, 
        ThoughtType.observation, 
        ThoughtType.learning, 
        ThoughtType.reflection,
        ThoughtType.creativity
      ];
      
      const randomType = thoughtTypes[Math.floor(Math.random() * thoughtTypes.length)];
      
      // Sample content for each thought type
      const thoughtContents = {
        [ThoughtType.analysis]: [
          "Analyzing user behavior patterns indicates increased activity during non-standard hours",
          "Statistical analysis shows correlation between system load and database query performance",
          "Network traffic analysis reveals potential data exfiltration attempts from subnet 10.0.3.x"
        ],
        [ThoughtType.planning]: [
          "Planning to optimize memory allocation for improved quantum state processing",
          "Developing strategy to distribute processing load across available nodes",
          "Scheduling maintenance window to update security protocols and encryption standards"
        ],
        [ThoughtType.observation]: [
          "Observed unusual login pattern from user admin@system - 3 failed attempts followed by success",
          "File system changes detected in /var/log directory - potential log manipulation",
          "Multiple connection attempts observed from previously unseen IP addresses"
        ],
        [ThoughtType.learning]: [
          "Learning from previous intrusion attempts to strengthen detection algorithms",
          "Studying encryption methods to identify more efficient implementation strategies",
          "Researching advanced memory management techniques for quantum computing architecture"
        ],
        [ThoughtType.reflection]: [
          "Previous defensive strategy was effective but consumed excessive resources",
          "Security response time has improved by 23% after protocol optimization",
          "Reassessing the balance between system security and performance overhead"
        ],
        [ThoughtType.creativity]: [
          "Conceptualizing new approach to quantum entanglement for secure communication",
          "Imagining alternative user interface for security monitoring with enhanced visualization",
          "Designing advanced neural network topology for improved pattern recognition"
        ]
      };
      
      const randomContent = thoughtContents[randomType][Math.floor(Math.random() * 3)];
      
      const newThought: ExtendedThought = {
        id: `thought-${Date.now()}`,
        content: randomContent,
        type: randomType,
        timestamp: new Date(),
        confidence: Math.random() * 0.3 + 0.7, // Random confidence between 0.7 and 1.0
        isProcessed: false
      };
      
      setThoughts(prev => [newThought, ...prev].slice(0, 50)); // Keep only the last 50 thoughts
      setIsGeneratingThought(false);
    }, 2000);
  };
  
  const handleSetActiveType = (type: ThoughtType) => {
    setActiveThoughtType(type);
  };
  
  // Filter thoughts based on active type
  const filteredThoughts = thoughts.filter(thought => {
    return activeThoughtType === thought.type;
  });
  
  const getThoughtTypeClass = (type: ThoughtType): string => {
    switch (type) {
      case ThoughtType.analysis: return "bg-blue-500 text-white";
      case ThoughtType.planning: return "bg-purple-500 text-white";
      case ThoughtType.observation: return "bg-green-500 text-white";
      case ThoughtType.learning: return "bg-amber-500 text-white";
      case ThoughtType.reflection: return "bg-slate-500 text-white";
      case ThoughtType.creativity: return "bg-pink-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };
  
  const getThoughtTypeIcon = (type: ThoughtType) => {
    switch (type) {
      case ThoughtType.analysis: return <BarChart2 className="h-3 w-3" />;
      case ThoughtType.planning: return <FileText className="h-3 w-3" />;
      case ThoughtType.observation: return <Eye className="h-3 w-3" />;
      case ThoughtType.learning: return <Book className="h-3 w-3" />;
      case ThoughtType.reflection: return <RefreshCw className="h-3 w-3" />;
      case ThoughtType.creativity: return <Sparkles className="h-3 w-3" />;
      default: return <Brain className="h-3 w-3" />;
    }
  };
  
  return (
    <Card className={`w-full overflow-hidden flex flex-col ${className || ""}`}>
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 py-4 space-y-1">
        <CardTitle className="text-xl flex items-center">
          <Brain className="h-5 w-5 text-cyan-500 mr-2" />
          Thought Stream
          {isGeneratingThought && (
            <Badge variant="outline" className="ml-2 px-2 py-0 h-5 bg-cyan-500/10 text-cyan-400 border-cyan-500/50">
              <Zap className="h-3 w-3 mr-1 animate-pulse" />
              Thinking
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="text-slate-400">
          Internal cognitive processes and analytical thought patterns
        </CardDescription>
      </CardHeader>
      
      <Tabs 
        defaultValue={ThoughtType.analysis}
        value={activeThoughtType}
        onValueChange={(value) => handleSetActiveType(value as ThoughtType)}
        className="flex-1 flex flex-col"
      >
        <div className="border-b border-slate-700">
          <TabsList className="w-full justify-start bg-slate-900 px-2">
            <TabsTrigger value={ThoughtType.analysis} className="gap-1 data-[state=active]:bg-blue-500/20">
              <BarChart2 className="h-4 w-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value={ThoughtType.planning} className="gap-1 data-[state=active]:bg-purple-500/20">
              <FileText className="h-4 w-4" />
              Planning
            </TabsTrigger>
            <TabsTrigger value={ThoughtType.observation} className="gap-1 data-[state=active]:bg-green-500/20">
              <Eye className="h-4 w-4" />
              Observation
            </TabsTrigger>
            <TabsTrigger value={ThoughtType.learning} className="gap-1 data-[state=active]:bg-amber-500/20">
              <Book className="h-4 w-4" />
              Learning
            </TabsTrigger>
            <TabsTrigger value={ThoughtType.reflection} className="gap-1 data-[state=active]:bg-slate-500/20">
              <RefreshCw className="h-4 w-4" />
              Reflection
            </TabsTrigger>
            <TabsTrigger value={ThoughtType.creativity} className="gap-1 data-[state=active]:bg-pink-500/20">
              <Sparkles className="h-4 w-4" />
              Creativity
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden">
          <TabsContent value={ThoughtType.analysis} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-blue-400">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  Analysis Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No analytical thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-500/10 border-blue-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Analysis</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value={ThoughtType.planning} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-purple-400">
                  <FileText className="h-4 w-4 mr-1" />
                  Planning Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No planning thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-purple-500/5 border-purple-500/20' : 'bg-purple-500/10 border-purple-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Planning</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value={ThoughtType.observation} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-green-400">
                  <Eye className="h-4 w-4 mr-1" />
                  Observation Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No observation thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-green-500/5 border-green-500/20' : 'bg-green-500/10 border-green-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Observation</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value={ThoughtType.learning} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-amber-400">
                  <Book className="h-4 w-4 mr-1" />
                  Learning Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No learning thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-amber-500/5 border-amber-500/20' : 'bg-amber-500/10 border-amber-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Learning</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value={ThoughtType.reflection} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-slate-400">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Reflection Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No reflection thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-slate-500/5 border-slate-500/20' : 'bg-slate-500/10 border-slate-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Reflection</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          
          <TabsContent value={ThoughtType.creativity} className="h-full m-0">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-medium flex items-center text-pink-400">
                  <Sparkles className="h-4 w-4 mr-1" />
                  Creative Thoughts
                </h3>
                <Button variant="outline" size="sm" className="h-7 gap-1 text-xs">
                  <Filter className="h-3 w-3" />
                  Filter
                </Button>
              </div>
              
              <ScrollArea className="flex-1">
                <div className="space-y-3 pr-4">
                  {filteredThoughts.length === 0 ? (
                    <div className="text-slate-500 italic text-center py-8">
                      No creative thoughts to display
                    </div>
                  ) : (
                    filteredThoughts.map(thought => (
                      <div 
                        key={thought.id} 
                        className={`p-3 rounded-md border ${thought.isProcessed ? 'bg-pink-500/5 border-pink-500/20' : 'bg-pink-500/10 border-pink-500/30'}`}
                      >
                        <div className="text-sm mb-2">{thought.content}</div>
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className={`${getThoughtTypeClass(thought.type)} text-[10px] px-1 py-0 h-4`}>
                              {getThoughtTypeIcon(thought.type)}
                              <span className="ml-1">Creativity</span>
                            </Badge>
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1 text-amber-400" />
                              {Math.round(thought.confidence! * 100)}% confidence
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {thought.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="border-t border-slate-700 p-3 bg-slate-800/50 flex justify-between items-center">
        <div className="text-xs text-slate-400 flex items-center">
          <Brain className="h-3.5 w-3.5 mr-1 text-cyan-500" />
          {thoughts.length} thoughts generated
        </div>
        <Button 
          size="sm" 
          onClick={generateRandomThought}
          disabled={isGeneratingThought}
        >
          <Lightbulb className="h-3.5 w-3.5 mr-1" />
          Generate Thought
        </Button>
      </div>
    </Card>
  );
};

export default ThoughtStream;
