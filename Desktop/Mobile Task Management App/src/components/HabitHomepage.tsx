import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  CheckCircle2, 
  Circle,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Menu
} from 'lucide-react';
import type { User, Habit, HabitCompletion } from './HabitApp';

interface HabitHomepageProps {
  user: User;
  habits: Habit[];
  completions: HabitCompletion[];
  onToggleHabit: (habitId: string, date?: string) => void;
  onIncrementHabit: (habitId: string, date?: string) => void;
  onViewHabit: (habit: Habit) => void;
  onNavigateToHabits: () => void;
}

interface NewHabitForm {
  name: string;
  description: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number;
  category: string;
}

const habitColors = [
  { name: 'Red', value: '#EF4444', bg: 'bg-red-500' },
  { name: 'Orange', value: '#F97316', bg: 'bg-orange-500' },
  { name: 'Yellow', value: '#EAB308', bg: 'bg-yellow-500' },
  { name: 'Green', value: '#22C55E', bg: 'bg-green-500' },
  { name: 'Blue', value: '#3B82F6', bg: 'bg-blue-500' },
  { name: 'Purple', value: '#A855F7', bg: 'bg-purple-500' }
];

const categories = ['Health', 'Learning', 'Personal', 'Work', 'Creative', 'Social'];

export function HabitHomepage({ 
  user, 
  habits, 
  completions, 
  onToggleHabit, 
  onIncrementHabit, 
  onViewHabit,
  onNavigateToHabits 
}: HabitHomepageProps) {
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [newHabit, setNewHabit] = useState<NewHabitForm>({
    name: '',
    description: '',
    color: '#3B82F6',
    frequency: 'daily',
    targetCount: 1,
    category: 'Personal'
  });

  const today = new Date().toISOString().split('T')[0];
  const todayCompletions = completions.filter(c => c.date === today);

  // Calculate today's progress
  const activeHabits = habits.filter(h => h.isActive);
  const completedToday = todayCompletions.filter(c => c.completed).length;
  const totalToday = activeHabits.length;
  const progressPercentage = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  // Get completion status for each habit today
  const getHabitCompletion = (habitId: string) => {
    return todayCompletions.find(c => c.habitId === habitId);
  };

  // Get completed habits for today
  const completedHabitsToday = activeHabits
    .filter(habit => {
      const completion = getHabitCompletion(habit.id);
      return completion?.completed;
    })
    .map(habit => {
      const completion = getHabitCompletion(habit.id);
      return {
        habit,
        completedAt: completion?.completedAt
      };
    })
    .sort((a, b) => {
      if (!a.completedAt || !b.completedAt) return 0;
      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAddHabit = () => {
    if (!newHabit.name.trim()) return;

    const habitData = {
      name: newHabit.name,
      description: newHabit.description,
      color: newHabit.color,
      frequency: newHabit.frequency,
      targetCount: newHabit.targetCount,
      category: newHabit.category
    };

    // This would call the parent's addHabit function
    // For now, we'll navigate to the habits screen
    setNewHabit({
      name: '',
      description: '',
      color: '#3B82F6',
      frequency: 'daily',
      targetCount: 1,
      category: 'Personal'
    });
    setIsAddHabitOpen(false);
    onNavigateToHabits();
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleHabitClick = (habit: Habit) => {
    const completion = getHabitCompletion(habit.id);
    
    if (habit.targetCount === 1) {
      // Simple toggle for single-target habits
      onToggleHabit(habit.id);
    } else {
      // For multi-target habits, increment count
      onIncrementHabit(habit.id);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl">{getGreeting()}, {user.name}! 👋</h1>
            <p className="text-muted-foreground">Let's build great habits today</p>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: '#6366F1' }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg">Today's Progress</h3>
                <p className="text-3xl mt-1">{Math.round(progressPercentage)}%</p>
                <p className="text-sm text-muted-foreground">
                  {completedToday} of {totalToday} habits completed
                </p>
              </div>
              <div className="text-right">
                <Target className="w-8 h-8 text-blue-600 mb-2" />
              </div>
            </div>
            <Progress value={progressPercentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Daily Habits */}
        {activeHabits.length > 0 ? (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Daily Habits
              </CardTitle>
              <CardDescription>
                Complete your habits for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeHabits.map(habit => {
                  const completion = getHabitCompletion(habit.id);
                  const isCompleted = completion?.completed || false;
                  const currentCount = completion?.count || 0;
                  const progress = habit.targetCount > 1 ? (currentCount / habit.targetCount) * 100 : 0;

                  return (
                    <div
                      key={habit.id}
                      className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors"
                      onClick={() => handleHabitClick(habit)}
                    >
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <CheckCircle2 
                            className="w-6 h-6 text-green-500" 
                          />
                        ) : (
                          <Circle 
                            className="w-6 h-6 text-muted-foreground hover:text-primary" 
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`truncate ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {habit.name}
                          </p>
                          <div className="flex items-center space-x-2 ml-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: habit.color }}
                            />
                            {habit.targetCount > 1 && (
                              <Badge variant={isCompleted ? 'default' : 'outline'} className="text-xs">
                                {currentCount}/{habit.targetCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {habit.targetCount > 1 && (
                          <div className="mt-2">
                            <Progress value={progress} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ) : (
          // Empty state
          <Card>
            <CardContent className="p-8 text-center">
              <Zap className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg mb-2">Welcome to Habitt!</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any habits yet. Create your first habit to get started on your journey.
              </p>
              <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    <Plus className="w-5 h-5 mr-2" />
                    Add First Habit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Your First Habit</DialogTitle>
                    <DialogDescription>
                      Start building a positive routine with your first habit.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Habit Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Morning Workout, Drink Water"
                        value={newHabit.name}
                        onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Brief description of your habit"
                        value={newHabit.description}
                        onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select value={newHabit.category} onValueChange={(value) => 
                          setNewHabit(prev => ({ ...prev, category: value }))
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

                      <div className="space-y-2">
                        <Label>Target per day</Label>
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          value={newHabit.targetCount}
                          onChange={(e) => setNewHabit(prev => ({ 
                            ...prev, 
                            targetCount: parseInt(e.target.value) || 1 
                          }))}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Habit Color</Label>
                      <div className="flex space-x-2">
                        {habitColors.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                              newHabit.color === color.value ? 'border-foreground' : 'border-transparent'
                            }`}
                            onClick={() => setNewHabit(prev => ({ ...prev, color: color.value }))}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddHabitOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddHabit} disabled={!newHabit.name.trim()}>
                        Create Habit
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}

        {/* Completed Today */}
        {completedHabitsToday.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
                Completed Today
              </CardTitle>
              <CardDescription>
                Great job! You've completed {completedHabitsToday.length} habit{completedHabitsToday.length > 1 ? 's' : ''} today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {completedHabitsToday.map(({ habit, completedAt }) => (
                  <div key={habit.id} className="flex items-center space-x-3 p-2 rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <span className="flex-1 text-sm">{habit.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(completedAt)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {activeHabits.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={onNavigateToHabits}>
              <Menu className="w-4 h-4 mr-2" />
              Manage Habits
            </Button>
            <Dialog open={isAddHabitOpen} onOpenChange={setIsAddHabitOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Habit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Habit</DialogTitle>
                  <DialogDescription>
                    Create a new habit to track and build consistency.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Habit Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Evening Walk, Read for 20 minutes"
                      value={newHabit.name}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your habit"
                      value={newHabit.description}
                      onChange={(e) => setNewHabit(prev => ({ ...prev, description: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newHabit.category} onValueChange={(value) => 
                        setNewHabit(prev => ({ ...prev, category: value }))
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

                    <div className="space-y-2">
                      <Label>Target per day</Label>
                      <Input
                        type="number"
                        min="1"
                        max="50"
                        value={newHabit.targetCount}
                        onChange={(e) => setNewHabit(prev => ({ 
                          ...prev, 
                          targetCount: parseInt(e.target.value) || 1 
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Habit Color</Label>
                    <div className="flex space-x-2">
                      {habitColors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          className={`w-8 h-8 rounded-full ${color.bg} border-2 ${
                            newHabit.color === color.value ? 'border-foreground' : 'border-transparent'
                          }`}
                          onClick={() => setNewHabit(prev => ({ ...prev, color: color.value }))}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsAddHabitOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddHabit} disabled={!newHabit.name.trim()}>
                      Add Habit
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}