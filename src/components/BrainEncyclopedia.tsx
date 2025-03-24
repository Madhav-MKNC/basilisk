
import React, { useState } from 'react';
import { Brain, Search, Info, BookOpen, Zap, Server, ChevronRight, ChevronDown } from 'lucide-react';
import { aiEngine } from '../lib/ai-engine';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const BrainEncyclopedia: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  
  const allTopics = aiEngine.getAllKnowledgeTopics();
  
  const formatTopicName = (topic: string): string => {
    return topic
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const filteredTopics = searchTerm.trim() === '' 
    ? allTopics 
    : allTopics.filter(topic => 
        topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        formatTopicName(topic).toLowerCase().includes(searchTerm.toLowerCase())
      );
      
  const toggleTopic = (topic: string) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
    
    if (!expandedTopics[topic]) {
      setSelectedTopic(topic);
    }
  };
  
  const topicIcons: Record<string, React.ReactNode> = {
    kali: <Server className="h-4 w-4" />,
    raspberry_pi: <Server className="h-4 w-4" />,
    lanturtle: <Server className="h-4 w-4" />,
    buspirate: <Zap className="h-4 w-4" />,
    pwnagotchi: <Zap className="h-4 w-4" />,
    hackrf: <Zap className="h-4 w-4" />,
    flipperzero: <Zap className="h-4 w-4" />,
    crypto_mining: <Zap className="h-4 w-4" />,
    crypto_faucets: <Zap className="h-4 w-4" />,
    atomic_wallet: <Zap className="h-4 w-4" />,
    machine_learning: <Brain className="h-4 w-4" />,
    llm_capabilities: <Brain className="h-4 w-4" />
  };
  
  // Fix: Ensure selectedTopicContent is always an array
  const selectedTopicContent = selectedTopic ? aiEngine.getKnowledge(selectedTopic) || [] : [];
  
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center text-basilisk-foreground">
          <BookOpen className="mr-2 h-5 w-5 text-basilisk-primary" />
          Knowledge Base
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Brain className="h-4 w-4 text-basilisk-primary" />
            <span className="text-xs text-basilisk-foreground-muted">LLM: {aiEngine.getLLMModel()}</span>
          </div>
        </div>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-basilisk-foreground-muted" />
        <Input
          type="text"
          placeholder="Search knowledge base..."
          className="pl-9 bg-basilisk-muted/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-6rem)]">
        <Card className="glass-panel p-4 neu-shadow overflow-hidden h-full">
          <h3 className="text-sm font-medium mb-3 text-basilisk-foreground">Topics</h3>
          <ScrollArea className="h-[calc(100%-2rem)] pr-4">
            <div className="space-y-1.5">
              {filteredTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`w-full text-left text-sm px-3 py-2 rounded-md flex items-center justify-between ${
                    selectedTopic === topic
                      ? 'bg-basilisk-primary/20 text-basilisk-primary'
                      : 'hover:bg-basilisk-muted text-basilisk-foreground'
                  }`}
                >
                  <div className="flex items-center">
                    {topicIcons[topic] || <Info className="h-4 w-4" />}
                    <span className="ml-2">{formatTopicName(topic)}</span>
                  </div>
                  {expandedTopics[topic] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
              ))}
              
              {filteredTopics.length === 0 && (
                <div className="text-basilisk-foreground-muted text-sm py-2 px-3">
                  No topics found
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
        
        <Card className="glass-panel p-4 neu-shadow overflow-hidden h-full">
          <h3 className="text-sm font-medium mb-3 text-basilisk-foreground">
            {selectedTopic ? formatTopicName(selectedTopic) : 'Select a topic'}
          </h3>
          
          <ScrollArea className="h-[calc(100%-2rem)] pr-4">
            {selectedTopic ? (
              <div className="space-y-3">
                {Array.isArray(selectedTopicContent) && selectedTopicContent.map((content, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-start">
                      <div className="min-w-5 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-basilisk-primary mt-1"></div>
                      </div>
                      <p className="ml-2 text-basilisk-foreground">{content}</p>
                    </div>
                    
                    {index < selectedTopicContent.length - 1 && (
                      <Separator className="my-3 bg-basilisk-muted/50" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-basilisk-foreground-muted">
                <Info className="h-12 w-12 mb-2 opacity-30" />
                <p className="text-sm">Select a topic to view information</p>
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default BrainEncyclopedia;
