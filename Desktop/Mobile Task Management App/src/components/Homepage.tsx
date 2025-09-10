import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  TrendingUp,
  Target,
  Zap,
  Star,
  AlertTriangle
} from 'lucide-react';
import type { User, Task } from '../App';

interface HomepageProps {
  user: User;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'completedAt' | 'userId'>) => void;
  onViewTask: (task: Task) => void;
  onToggleComplete: (taskId: string) => void;
}

interface NewTaskForm {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  dueDate: string;
}

const motivationalQuotes = [
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Yesterday is history, tomorrow is a mystery, today is a gift. - Eleanor Roosevelt"
];

const categories = ['Work', 'Personal', 'Health', 'Learning', 'Family', 'Finance', 'Other'];

export function Homepage({ user, tasks, onAddTask, onViewTask, onToggleComplete }: HomepageProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<NewTaskForm>({
    title: '',
    description: '',
    priority: 'medium',
    category: 'Personal',
    dueDate: ''
  });

  // Calculate statistics
  const today = new Date().toDateString();
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    return new Date(task.dueDate).toDateString() === today;
  });
  
  const completedTasks = tasks.filter(task => task.completed);
  const completedToday = todayTasks.filter(task => task.completed);
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  });

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;
  const todayCompletionRate = todayTasks.length > 0 ? (completedToday.length / todayTasks.length) * 100 : 0;

  // Get upcoming tasks
  const upcomingTasks = tasks
    .filter(task => !task.completed && task.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 3);

  // Get random quote
  const dailyQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString();
  };

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    onAddTask({
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: newTask.dueDate || null,
      completed: false
    });

    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      category: 'Personal',
      dueDate: ''
    });
    setIsAddTaskOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <section className="w-full max-w-4xl space-y-4">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user.name}! 👋</h1>
            <p className="text-muted-foreground">Let's make today productive</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Daily Quote */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm italic">{dailyQuote}</p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                  <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
                </div>
              </div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Today's Tasks</p>
                  <p className="text-2xl font-bold">{completedToday.length}/{todayTasks.length}</p>
                </div>
              </div>
              {todayTasks.length > 0 && (
                <Progress value={todayCompletionRate} className="mt-2" />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <p className="text-lg font-bold">{completedTasks.length}</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 text-center">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-lg font-bold">{tasks.length - completedTasks.length}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 text-center">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="text-lg font-bold">{overdueTasks.length}</p>
              <p className="text-xs text-muted-foreground">Overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Task */}
        <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Add New Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task to your list and stay organized.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: 'high' | 'medium' | 'low') => 
                    setNewTask(prev => ({ ...prev, priority: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={newTask.category} onValueChange={(value) => 
                    setNewTask(prev => ({ ...prev, category: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (Optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTask} disabled={!newTask.title.trim()}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Your next {upcomingTasks.length} tasks to focus on
            </CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingTasks.length > 0 ? (
              <div className="space-y-3">
                {upcomingTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => onViewTask(task)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleComplete(task.id);
                      }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                    </Button>
                    <div className="flex-1 min-w-0">
                      <p className="truncate">{task.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {task.category}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-muted-foreground">
                            Due {formatDueDate(task.dueDate)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Zap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No upcoming tasks!</p>
                <p className="text-sm text-muted-foreground">You're all caught up 🎉</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Overdue Tasks Warning */}
        {overdueTasks.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-destructive">
                    {overdueTasks.length} overdue task{overdueTasks.length > 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Don't let them pile up! Take a moment to review and complete them.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}