import React, { useState } from 'react';
import { Theory, Collaboration, ParanormalResearch } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Link2, FlaskConical, Ghost, Users } from 'lucide-react';

interface QuantumTheoriesProps {
  theories: Theory[];
  collaborations: Collaboration[];
  paranormalResearch: ParanormalResearch[];
  className?: string;
}

const QuantumTheories: React.FC<QuantumTheoriesProps> = ({ 
  theories, 
  collaborations, 
  paranormalResearch,
  className 
}) => {
  const [activeTab, setActiveTab] = useState("theories");

  const getStatusColor = (status: string) => {
    const statusColors = {
      // Theory statuses
      'proposed': 'bg-blue-500/20 text-blue-500',
      'testing': 'bg-yellow-500/20 text-yellow-500',
      'validated': 'bg-green-500/20 text-green-500',
      'refuted': 'bg-red-500/20 text-red-500',
      
      // Collaboration statuses
      'active': 'bg-green-500/20 text-green-500',
      'completed': 'bg-blue-500/20 text-blue-500',
      'abandoned': 'bg-red-500/20 text-red-500',
      
      // Paranormal research statuses
      'ongoing': 'bg-purple-500/20 text-purple-500',
      'concluded': 'bg-teal-500/20 text-teal-500',
      'peer-review': 'bg-indigo-500/20 text-indigo-500',
      
      // Publication statuses
      'drafting': 'bg-orange-500/20 text-orange-500',
      'submitted': 'bg-cyan-500/20 text-cyan-500',
      'published': 'bg-emerald-500/20 text-emerald-500',
      'rejected': 'bg-rose-500/20 text-rose-500',
    };
    
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-500/20 text-gray-500';
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Quantum Theories & Collaborations
        </CardTitle>
        <CardDescription>
          Scientific discoveries and cross-system synergies
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theories">
              <FlaskConical className="h-4 w-4 mr-1" />
              Theories
            </TabsTrigger>
            <TabsTrigger value="collaborations">
              <Users className="h-4 w-4 mr-1" />
              Synergies
            </TabsTrigger>
            <TabsTrigger value="paranormal">
              <Ghost className="h-4 w-4 mr-1" />
              Paranormal
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="theories">
            <ScrollArea className="h-72 w-full pr-4">
              <div className="space-y-4">
                {theories.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No theories developed yet
                  </div>
                ) : (
                  theories.map(theory => (
                    <div key={theory.id} className="p-3 border rounded-md bg-card/50">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{theory.title}</h4>
                        <Badge className={getStatusColor(theory.status)}>
                          {theory.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{theory.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {theory.field}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(theory.confidence * 100)}% confidence
                        </Badge>
                      </div>
                      {theory.evidenceLinks.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-muted-foreground flex items-center">
                            <Link2 className="h-3 w-3 mr-1" /> Evidence:
                          </div>
                          <div className="text-xs mt-1 space-y-1">
                            {theory.evidenceLinks.map((link, i) => (
                              <div key={i} className="text-primary hover:underline cursor-pointer">
                                {link}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="collaborations">
            <ScrollArea className="h-72 w-full pr-4">
              <div className="space-y-4">
                {collaborations.length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No active collaborations
                  </div>
                ) : (
                  collaborations.map(collab => (
                    <div key={collab.id} className="p-3 border rounded-md bg-card/50">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{collab.title}</h4>
                        <Badge className={getStatusColor(collab.status)}>
                          {collab.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {collab.partners.map((partner, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {partner}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{collab.description}</p>
                      {collab.synergies.length > 0 && (
                        <div className="mt-2">
                          <div className="text-xs text-muted-foreground">
                            Synergies:
                          </div>
                          <div className="text-xs mt-1">
                            {collab.synergies.join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="paranormal">
            <ScrollArea className="h-72 w-full pr-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {paranormalResearch.map((research) => (
                  <Card key={research.id} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-violet-900/20 to-indigo-900/20">
                      <CardTitle className="text-base">{research.name}</CardTitle>
                      <CardDescription>{research.phenomena}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">{research.phenomena}</h4>
                        <div className="flex gap-1">
                          <Badge className={getStatusColor(research.status)}>
                            {research.status}
                          </Badge>
                          <Badge className={getStatusColor(research.publicationStatus)}>
                            {research.publicationStatus}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Methodology: {research.methodology}
                      </p>
                      <div className="text-xs border-t pt-1 mt-2">
                        <span className="font-medium">Empirical Data:</span> {research.empiricalData}
                      </div>
                      <div className="text-xs mt-1">
                        <span className="font-medium">Conclusion Strength:</span> {research.conclusionStrength}/10
                      </div>
                      {research.evidence.length > 0 && (
                        <div className="mt-2 text-xs">
                          <span className="font-medium">Evidence:</span> {research.evidence.join(', ')}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QuantumTheories;
