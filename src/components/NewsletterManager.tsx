
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Mail, Send, Users, Settings, Clock, FileText, CheckCircle, XCircle, Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";

// Newsletter templates
const NEWSLETTER_TEMPLATES = [
  {
    id: "template-1",
    name: "Research Update",
    subject: "Weekly Research Progress - [Date]",
    content: "Hello,\n\nHere's your weekly update on our research progress:\n\n- Quantum Computing: [Progress]%\n- Neural Networks: [Progress]%\n- Energy Systems: [Progress]%\n\nKey milestones achieved:\n- [Milestone 1]\n- [Milestone 2]\n\nUpcoming goals:\n- [Goal 1]\n- [Goal 2]\n\nBest regards,\nParasite Bat Intelligence System"
  },
  {
    id: "template-2",
    name: "Strategic Goals Briefing",
    subject: "Monthly Strategic Goals Update - [Date]",
    content: "Hello,\n\nHere's your monthly strategic goals update:\n\n- Goal 1: [Progress]%\n- Goal 2: [Progress]%\n- Goal 3: [Progress]%\n\nRecently completed:\n- [Completed Goal 1]\n\nNew initiatives:\n- [New Initiative 1]\n- [New Initiative 2]\n\nBest regards,\nParasite Bat Intelligence System"
  },
  {
    id: "template-3",
    name: "Security Bulletin",
    subject: "Security Status Update - [Date]",
    content: "Hello,\n\nHere's your security status update:\n\nCurrent threat level: [Level]/5\n\nRecent incidents:\n- [Incident 1]\n- [Incident 2]\n\nSecurity recommendations:\n- [Recommendation 1]\n- [Recommendation 2]\n\nBest regards,\nParasite Bat Intelligence System"
  }
];

// Subscriber data
const INITIAL_SUBSCRIBERS = [
  {
    id: "sub-1",
    email: "omnisgod@outlook.com",
    name: "Primary User",
    subscribed: true,
    preferences: ["research", "goals", "security"],
    lastEmailSent: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    frequency: "weekly"
  }
];

// Sent emails history
const INITIAL_SENT_EMAILS = [
  {
    id: "email-1",
    subject: "Weekly Research Progress - " + format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), "MMM dd, yyyy"),
    recipients: ["omnisgod@outlook.com"],
    sentAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    openRate: 100,
    template: "Research Update"
  }
];

const NewsletterManager: React.FC = () => {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [sentEmails, setSentEmails] = useState(INITIAL_SENT_EMAILS);
  const [selectedTemplate, setSelectedTemplate] = useState(NEWSLETTER_TEMPLATES[0]);
  const [emailSubject, setEmailSubject] = useState(NEWSLETTER_TEMPLATES[0].subject);
  const [emailContent, setEmailContent] = useState(NEWSLETTER_TEMPLATES[0].content);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [scheduledEmails, setScheduledEmails] = useState<any[]>([]);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState("");
  const [newSubscriberName, setNewSubscriberName] = useState("");
  const [autoSendEnabled, setAutoSendEnabled] = useState(true);

  const handleTemplateChange = (templateId: string) => {
    const template = NEWSLETTER_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setEmailSubject(template.subject.replace("[Date]", format(new Date(), "MMM dd, yyyy")));
      setEmailContent(template.content);
    }
  };

  const handleSendNewsletter = () => {
    // In a real app, this would connect to an email service
    const newEmail = {
      id: `email-${Date.now()}`,
      subject: emailSubject,
      recipients: subscribers.filter(s => s.subscribed).map(s => s.email),
      sentAt: new Date(),
      openRate: 0,
      template: selectedTemplate.name
    };
    
    setSentEmails([newEmail, ...sentEmails]);
    
    toast({
      title: "Newsletter Sent",
      description: `Newsletter has been sent to ${newEmail.recipients.length} subscriber(s).`
    });
  };

  const handleScheduleNewsletter = () => {
    if (!selectedDate) return;
    
    const newScheduledEmail = {
      id: `scheduled-${Date.now()}`,
      subject: emailSubject,
      scheduledFor: selectedDate,
      recipients: subscribers.filter(s => s.subscribed).length,
      template: selectedTemplate.name
    };
    
    setScheduledEmails([...scheduledEmails, newScheduledEmail]);
    
    toast({
      title: "Newsletter Scheduled",
      description: `Newsletter scheduled for ${format(selectedDate, "PPP")}.`
    });
  };

  const handleAddSubscriber = () => {
    if (!newSubscriberEmail) return;
    
    const newSubscriber = {
      id: `sub-${Date.now()}`,
      email: newSubscriberEmail,
      name: newSubscriberName || "Subscriber",
      subscribed: true,
      preferences: ["research", "goals", "security"],
      lastEmailSent: null,
      frequency: "weekly"
    };
    
    setSubscribers([...subscribers, newSubscriber]);
    setNewSubscriberEmail("");
    setNewSubscriberName("");
    
    toast({
      title: "Subscriber Added",
      description: `${newSubscriberEmail} has been added to the newsletter.`
    });
  };

  const toggleSubscriberStatus = (subscriberId: string) => {
    setSubscribers(subscribers.map(sub => 
      sub.id === subscriberId 
        ? {...sub, subscribed: !sub.subscribed} 
        : sub
    ));
    
    const subscriber = subscribers.find(s => s.id === subscriberId);
    if (subscriber) {
      toast({
        title: subscriber.subscribed ? "Subscriber Unsubscribed" : "Subscriber Resubscribed",
        description: `${subscriber.email} has been ${subscriber.subscribed ? "unsubscribed from" : "resubscribed to"} the newsletter.`
      });
    }
  };

  return (
    <Card className="w-full bg-black border border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-primary-foreground flex items-center">
          <Mail className="mr-2 h-5 w-5 text-blue-400" />
          Newsletter Management System
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage research updates and newsletters for subscribers
        </CardDescription>
      </CardHeader>
      <Separator className="bg-gray-800" />
      
      <Tabs defaultValue="compose" className="w-full">
        <div className="px-6 pt-4">
          <TabsList className="grid grid-cols-4 bg-gray-900">
            <TabsTrigger value="compose" className="data-[state=active]:bg-gray-800">
              <div className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span>Compose</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-gray-800">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>Subscribers</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="sent" className="data-[state=active]:bg-gray-800">
              <div className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                <span>Sent</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-gray-800">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <span>Schedule</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="compose" className="p-6 pt-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Template</Label>
              <Select 
                defaultValue={selectedTemplate.id} 
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger className="bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  {NEWSLETTER_TEMPLATES.map(template => (
                    <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={emailSubject} 
                onChange={(e) => setEmailSubject(e.target.value)} 
                className="bg-gray-900 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                value={emailContent} 
                onChange={(e) => setEmailContent(e.target.value)} 
                rows={12}
                className="bg-gray-900 border-gray-700 font-mono text-sm resize-none"
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" className="border-gray-700">
                Preview
              </Button>
              <div className="space-x-2">
                <Button variant="outline" className="border-gray-700" onClick={handleScheduleNewsletter}>
                  Schedule
                </Button>
                <Button onClick={handleSendNewsletter}>
                  Send Now
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="subscribers" className="p-6 pt-4">
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-2">
              <Input 
                placeholder="Email address" 
                value={newSubscriberEmail}
                onChange={(e) => setNewSubscriberEmail(e.target.value)}
                className="bg-gray-900 border-gray-700"
              />
              <Input 
                placeholder="Name (optional)" 
                value={newSubscriberName}
                onChange={(e) => setNewSubscriberName(e.target.value)}
                className="bg-gray-900 border-gray-700"
              />
              <Button onClick={handleAddSubscriber}>
                <Plus className="h-4 w-4 mr-1" />
                Add Subscriber
              </Button>
            </div>
            
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-900/40 border-gray-800">
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Last Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id} className="hover:bg-gray-900/40 border-gray-800">
                      <TableCell>{subscriber.email}</TableCell>
                      <TableCell>{subscriber.name}</TableCell>
                      <TableCell>
                        <Badge variant={subscriber.subscribed ? "default" : "outline"} className={subscriber.subscribed ? "bg-green-600" : ""}>
                          {subscriber.subscribed ? "Active" : "Unsubscribed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{subscriber.frequency}</TableCell>
                      <TableCell>
                        {subscriber.lastEmailSent 
                          ? format(new Date(subscriber.lastEmailSent), "MMM dd, yyyy") 
                          : "Never"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleSubscriberStatus(subscriber.id)}
                          className="h-8 px-2 text-xs"
                        >
                          {subscriber.subscribed ? "Unsubscribe" : "Resubscribe"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sent" className="p-6 pt-4">
          <ScrollArea className="h-[400px]">
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-900/40 border-gray-800">
                    <TableHead>Subject</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Sent To</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sentEmails.map((email) => (
                    <TableRow key={email.id} className="hover:bg-gray-900/40 border-gray-800">
                      <TableCell>{email.subject}</TableCell>
                      <TableCell>{email.template}</TableCell>
                      <TableCell>{email.recipients.length} recipients</TableCell>
                      <TableCell>{format(new Date(email.sentAt), "MMM dd, yyyy HH:mm")}</TableCell>
                      <TableCell>{email.openRate}%</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2 text-xs"
                        >
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="schedule" className="p-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Select Date</Label>
              <div className="rounded-md border border-gray-800 p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-gray-800"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="auto-send" 
                    checked={autoSendEnabled}
                    onCheckedChange={setAutoSendEnabled}
                  />
                  <Label htmlFor="auto-send">Enable automatic sending</Label>
                </div>
                <p className="text-xs text-gray-400">
                  When enabled, newsletters will be automatically sent based on subscriber preferences.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Scheduled Emails</Label>
              <div className="rounded-md border border-gray-800">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-gray-900/40 border-gray-800">
                      <TableHead>Subject</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledEmails.length === 0 ? (
                      <TableRow className="hover:bg-gray-900/40 border-gray-800">
                        <TableCell colSpan={5} className="text-center py-4 text-gray-400">
                          No scheduled emails
                        </TableCell>
                      </TableRow>
                    ) : (
                      scheduledEmails.map((email) => (
                        <TableRow key={email.id} className="hover:bg-gray-900/40 border-gray-800">
                          <TableCell>{email.subject}</TableCell>
                          <TableCell>{email.template}</TableCell>
                          <TableCell>{format(new Date(email.scheduledFor), "MMM dd, yyyy")}</TableCell>
                          <TableCell>{email.recipients} recipients</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-xs"
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-between pt-2 pb-6 px-6 border-t border-gray-800 mt-4">
        <div className="text-xs text-gray-400">
          All emails are sent from system@parasitebat.ai
        </div>
        <Button variant="outline" size="sm" className="h-8 border-gray-700">
          <Settings className="h-4 w-4 mr-1" />
          Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsletterManager;
