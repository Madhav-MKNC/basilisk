
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Beaker, 
  Brain, 
  FileCheck, 
  Trash2, 
  Star, 
  CalendarDays, 
  ChevronsUp, 
  Eraser, 
  Atom, 
  Clock, 
  FlaskConical, 
  Sparkles,
  CheckCircle,
  Circle
} from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Goal, SubGoal, GoalStatus } from '@/types';

// Add the missing function
const getPriorityClass = (priority: number | string): string => {
  if (typeof priority === 'string') {
    priority = parseInt(priority);
  }
  
  if (isNaN(priority as number)) {
    return "bg-slate-500 text-slate-100";
  }
  
  const numPriority = priority as number;
  
  if (numPriority > 8) {
    return "bg-red-500 text-white";
  } else if (numPriority > 6) {
    return "bg-orange-500 text-white";
  } else if (numPriority > 4) {
    return "bg-amber-500 text-black";
  } else if (numPriority > 2) {
    return "bg-green-500 text-white";
  } else {
    return "bg-blue-500 text-white";
  }
};

interface ResearchGoalsProps {
  className?: string;
}

// Extend Goal type to include category property
interface ExtendedGoal extends Goal {
  category?: string;
  name: string;
  subgoals: SubGoal[];
}

// Extend SubGoal to include status property
interface ExtendedSubGoal extends SubGoal {
  status?: GoalStatus;
}

const ResearchGoals: React.FC<ResearchGoalsProps> = ({ className }) => {
  const [goals, setGoals] = useState<ExtendedGoal[]>([
    {
      id: 'goal-1',
      title: 'Develop Advanced AI Algorithms',
      name: 'Develop Advanced AI Algorithms',
      description: 'Research and implement new AI algorithms for improved performance.',
      priority: 9,
      status: GoalStatus.active,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      subgoals: [
        { id: 'sub-1', title: 'Study Neural Networks', name: 'Study Neural Networks', description: 'Learn about neural networks', completed: false, status: GoalStatus.completed },
        { id: 'sub-2', title: 'Implement Genetic Algorithms', name: 'Implement Genetic Algorithms', description: 'Implement genetic algorithms', completed: false, status: GoalStatus.in_progress },
        { id: 'sub-3', title: 'Test AI Performance', name: 'Test AI Performance', description: 'Test AI performance', completed: false, status: GoalStatus.active }
      ] as ExtendedSubGoal[],
      category: 'AI Research',
      progress: 60,
      rewards: [],
      requirements: []
    },
    {
      id: 'goal-2',
      title: 'Enhance Data Security Protocols',
      name: 'Enhance Data Security Protocols',
      description: 'Improve data encryption and access control mechanisms.',
      priority: 7,
      status: GoalStatus.in_progress,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
      subgoals: [
        { id: 'sub-4', title: 'Research Encryption Methods', name: 'Research Encryption Methods', description: 'Research encryption methods', completed: false, status: GoalStatus.completed },
        { id: 'sub-5', title: 'Implement Access Controls', name: 'Implement Access Controls', description: 'Implement access controls', completed: false, status: GoalStatus.in_progress },
        { id: 'sub-6', title: 'Audit Security Systems', name: 'Audit Security Systems', description: 'Audit security systems', completed: false, status: GoalStatus.active }
      ] as ExtendedSubGoal[],
      category: 'Security',
      progress: 40,
      rewards: [],
      requirements: []
    },
    {
      id: 'goal-3',
      title: 'Optimize System Performance',
      name: 'Optimize System Performance',
      description: 'Identify and resolve performance bottlenecks in the system.',
      priority: 5,
      status: GoalStatus.active,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
      subgoals: [
        { id: 'sub-7', title: 'Analyze System Logs', name: 'Analyze System Logs', description: 'Analyze system logs', completed: false, status: GoalStatus.completed },
        { id: 'sub-8', title: 'Optimize Database Queries', name: 'Optimize Database Queries', description: 'Optimize database queries', completed: false, status: GoalStatus.in_progress },
        { id: 'sub-9', title: 'Upgrade Hardware', name: 'Upgrade Hardware', description: 'Upgrade hardware', completed: false, status: GoalStatus.active }
      ] as ExtendedSubGoal[],
      category: 'System Optimization',
      progress: 20,
      rewards: [],
      requirements: []
    }
  ]);
  const [activeTab, setActiveTab] = useState('active');
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalPriority, setNewGoalPriority] = useState('5');
  const [selectedGoal, setSelectedGoal] = useState<ExtendedGoal | null>(null);
  const [newSubGoalTitle, setNewSubGoalTitle] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate loading goals from an API or local storage
    // In a real application, you would fetch or load goals here
  }, []);
  
  const handleAddGoal = () => {
    if (!newGoalTitle.trim() || !newGoalDescription.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all goal details.",
        variant: "destructive",
      });
      return;
    }
    
    const newGoal: ExtendedGoal = {
      id: `goal-${Date.now()}`,
      title: newGoalTitle,
      name: newGoalTitle,
      description: newGoalDescription,
      priority: parseInt(newGoalPriority),
      status: GoalStatus.active,
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      subgoals: [],
      category: 'General',
      progress: 0,
      rewards: [],
      requirements: []
    };
    
    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalDescription('');
    setNewGoalPriority('5');
    
    toast({
      title: "Goal Added",
      description: `New goal "${newGoal.title}" has been added.`,
    });
  };
  
  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    setSelectedGoal(null);
    toast({
      title: "Goal Deleted",
      description: "Goal has been successfully deleted.",
    });
  };
  
  const handleGoalClick = (goal: ExtendedGoal) => {
    setSelectedGoal(goal);
  };
  
  const handleAddSubGoal = () => {
    if (!selectedGoal) return;
    if (!newSubGoalTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a sub-goal title.",
        variant: "destructive",
      });
      return;
    }
    
    const newSubGoal: ExtendedSubGoal = {
      id: `subgoal-${Date.now()}`,
      title: newSubGoalTitle,
      status: GoalStatus.active,
      name: newSubGoalTitle,
      description: "",
      completed: false
    };
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        return { ...goal, subgoals: [...goal.subgoals, newSubGoal] };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    setNewSubGoalTitle('');
    
    toast({
      title: "Sub-goal Added",
      description: `New sub-goal "${newSubGoal.title}" has been added.`,
    });
  };
  
  const handleDeleteSubGoal = (subGoalId: string) => {
    if (!selectedGoal) return;
    
    const updatedGoals = goals.map(goal => {
      if (goal.id === selectedGoal.id) {
        return { ...goal, subgoals: goal.subgoals.filter(subGoal => subGoal.id !== subGoalId) };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    
    toast({
      title: "Sub-goal Deleted",
      description: "Sub-goal has been successfully deleted.",
    });
  };
  
  const handleStatusChange = (goalId: string, newStatus: GoalStatus) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, status: newStatus };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
    
    toast({
      title: "Status Updated",
      description: `Goal status updated to ${newStatus}.`,
    });
  };
  
  const filteredGoals = goals.filter(goal => {
    if (activeTab === 'active') {
      return goal.status === GoalStatus.active || goal.status === GoalStatus.in_progress;
    } else if (activeTab === 'completed') {
      return goal.status === GoalStatus.completed;
    } else {
      return goal.status === GoalStatus.abandoned;
    }
  });
  
  return (
    <Card className={`w-full h-full flex flex-col overflow-hidden ${className || ''}`}>
      <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-800 py-4 px-6">
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
          Research Goals
        </CardTitle>
        <CardDescription className="text-slate-400">
          Manage and track your research objectives
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-slate-700">
          <TabsList className="w-full justify-start px-4 bg-slate-900">
            <TabsTrigger value="active" className="data-[state=active]:bg-slate-800">
              <Beaker className="h-4 w-4 mr-1" />
              Active
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-slate-800">
              <FileCheck className="h-4 w-4 mr-1" />
              Completed
            </TabsTrigger>
            <TabsTrigger value="abandoned" className="data-[state=active]:bg-slate-800">
              <Trash2 className="h-4 w-4 mr-1" />
              Abandoned
            </TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 flex flex-row">
          <div className="w-1/2 p-4 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {filteredGoals.length === 0 ? (
                  <div className="text-slate-500 italic text-center py-4">
                    No goals found in this category.
                  </div>
                ) : (
                  filteredGoals.map(goal => (
                    <Card 
                      key={goal.id} 
                      className="bg-slate-800/50 border border-slate-700 cursor-pointer hover:bg-slate-700/50"
                      onClick={() => handleGoalClick(goal)}
                    >
                      <CardHeader className="p-3">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                          {goal.title}
                          <Badge className={`text-[10px] ${getPriorityClass(goal.priority)}`}>
                            Priority {goal.priority}
                          </Badge>
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-400">
                          {goal.description.substring(0, 50)}...
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <Brain className="h-3 w-3 mr-1 text-purple-400" />
                            {goal.category}
                          </div>
                          <div className="flex items-center">
                            <CalendarDays className="h-3 w-3 mr-1 text-blue-400" />
                            {goal.dueDate.toLocaleDateString()}
                          </div>
                        </div>
                        <Progress value={goal.progress} className="h-1.5 mt-2" />
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
          
          <div className="w-1/2 p-4 border-l border-slate-700 bg-slate-900/30">
            {selectedGoal ? (
              <div className="space-y-4 h-full flex flex-col">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <Lightbulb className="h-5 w-5 mr-1 text-amber-500" />
                      {selectedGoal.title}
                    </h3>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteGoal(selectedGoal.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete Goal
                    </Button>
                  </div>
                  <p className="text-sm text-slate-400">{selectedGoal.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <Brain className="h-3 w-3 mr-1 text-purple-400" />
                      {selectedGoal.category}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-3 w-3 mr-1 text-blue-400" />
                      {selectedGoal.dueDate.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <Progress value={selectedGoal.progress} className="h-1.5" />
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`text-[10px] ${getPriorityClass(selectedGoal.priority)}`}>
                      Priority {selectedGoal.priority}
                    </Badge>
                    <Select 
                      defaultValue={selectedGoal.status}
                      onValueChange={(value) => handleStatusChange(selectedGoal.id, value as GoalStatus)}
                    >
                      <SelectTrigger className="w-[180px] h-7 text-xs">
                        <SelectValue placeholder={selectedGoal.status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={GoalStatus.active} className="text-xs">
                          Active
                        </SelectItem>
                        <SelectItem value={GoalStatus.in_progress} className="text-xs">
                          In Progress
                        </SelectItem>
                        <SelectItem value={GoalStatus.completed} className="text-xs">
                          Completed
                        </SelectItem>
                        <SelectItem value={GoalStatus.abandoned} className="text-xs">
                          Abandoned
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-1 text-green-500" />
                    Sub-goals
                  </h4>
                  <ScrollArea className="h-full">
                    <div className="space-y-2 p-2">
                      {selectedGoal.subgoals.length === 0 ? (
                        <div className="text-slate-500 italic text-center py-3">
                          No sub-goals added yet.
                        </div>
                      ) : (
                        selectedGoal.subgoals.map(subGoal => (
                          <div key={subGoal.id} className="flex items-center justify-between bg-slate-800/40 border border-slate-700 rounded-md p-2 text-xs">
                            <div className="flex items-center">
                              {(subGoal as ExtendedSubGoal).status === GoalStatus.completed ? (
                                <CheckCircle className="h-4 w-4 mr-1 text-green-400" />
                              ) : (
                                <Circle className="h-4 w-4 mr-1 text-slate-400" />
                              )}
                              {subGoal.title}
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteSubGoal(subGoal.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </div>
                
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Add new sub-goal..."
                      className="text-xs h-8"
                      value={newSubGoalTitle}
                      onChange={(e) => setNewSubGoalTitle(e.target.value)}
                    />
                    <Button 
                      onClick={handleAddSubGoal} 
                      className="ml-2 h-8 text-xs"
                    >
                      Add Sub-goal
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 italic">
                Select a goal to view details
              </div>
            )}
          </div>
        </div>
      </Tabs>
      
      <CardFooter className="py-3 px-6 border-t border-slate-700 bg-slate-900">
        <div className="flex items-center">
          <Input
            type="text"
            placeholder="New goal title..."
            className="text-xs h-8 mr-2"
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
          />
          <Textarea
            placeholder="New goal description..."
            className="text-xs h-8 mr-2 resize-none"
            value={newGoalDescription}
            onChange={(e) => setNewGoalDescription(e.target.value)}
          />
          <Select onValueChange={(value) => setNewGoalPriority(value)}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(priority => (
                <SelectItem value={String(priority)} key={priority} className="text-xs">
                  Priority {priority}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddGoal} className="ml-2 h-8 text-xs">
            Add Goal
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResearchGoals;
