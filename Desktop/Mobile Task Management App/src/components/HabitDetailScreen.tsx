import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Circle,
  Target,
  Calendar as CalendarIcon,
  TrendingUp,
  Flame,
  Award
} from 'lucide-react';
import type { Habit, HabitCompletion } from './HabitApp';

interface HabitDetailScreenProps {
  habit: Habit;
  completions: HabitCompletion[];
  onUpdateHabit: (updates: Partial<Habit>) => void;
  onDeleteHabit: () => void;
  onToggleCompletion: (habitId: string, date: string) => void;
  onIncrementCount: (habitId: string, date: string) => void;
  onBack: () => void;
}

export function HabitDetailScreen({ 
  habit, 
  completions, 
  onUpdateHabit, 
  onDeleteHabit, 
  onToggleCompletion,
  onIncrementCount,
  onBack 
}: HabitDetailScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Calculate statistics
  const totalCompletions = completions.filter(c => c.completed).length;
  const totalDays = completions.length;
  const completionRate = totalDays > 0 ? (totalCompletions / totalDays) * 100 : 0;

  // Calculate streak
  const calculateCurrentStreak = () => {
    const sortedCompletions = [...completions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date();
    
    // Check if today is completed
    const todayCompletion = completions.find(c => c.date === today);
    if (todayCompletion?.completed) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Count backwards
    while (true) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const completion = completions.find(c => c.date === dateStr);
      
      if (completion?.completed) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const calculateLongestStreak = () => {
    const sortedCompletions = [...completions]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let longestStreak = 0;
    let currentStreak = 0;
    
    for (let i = 0; i < sortedCompletions.length; i++) {
      if (sortedCompletions[i].completed) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }
    
    return longestStreak;
  };

  const currentStreak = calculateCurrentStreak();
  const longestStreak = calculateLongestStreak();

  // Get last 7 days for weekly view
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const completion = completions.find(c => c.date === dateStr);
      
      days.push({
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completed: completion?.completed || false,
        count: completion?.count || 0
      });
    }
    return days;
  };

  const weeklyData = getLast7Days();

  // Get completion for selected date
  const selectedDateStr = selectedDate.toISOString().split('T')[0];
  const selectedDateCompletion = completions.find(c => c.date === selectedDateStr);
  const isSelectedDateCompleted = selectedDateCompletion?.completed || false;
  const selectedDateCount = selectedDateCompletion?.count || 0;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleToggleSelectedDate = () => {
    onToggleCompletion(habit.id, selectedDateStr);
  };

  const handleIncrementSelectedDate = () => {
    onIncrementCount(habit.id, selectedDateStr);
  };

  // Check if the selected date has a completion that can be modified
  const getDateModifiers = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    const completion = completions.find(c => c.date === dateStr);
    
    return {
      completed: completion?.completed || false,
      partial: completion && completion.count > 0 && completion.count < habit.targetCount
    };
  };

  return (
    <div className="flex-1 overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: habit.color }}
              />
              <h1 className="text-xl truncate">{habit.name}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit3 className="w-4 h-4" />
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Habit</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete "{habit.name}"? This action cannot be undone and all progress data will be lost.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={onDeleteHabit}>
                    Delete Habit
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Habit Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {habit.description && (
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">{habit.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Category</h4>
                <Badge variant="outline">{habit.category}</Badge>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1">Frequency</h4>
                <span className="text-sm">{habit.frequency === 'daily' ? 'Every day' : habit.frequency}</span>
              </div>
            </div>
            
            {habit.targetCount > 1 && (
              <div>
                <h4 className="text-sm font-medium mb-1">Daily Target</h4>
                <span className="text-sm">{habit.targetCount} times per day</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-2xl text-green-600">{Math.round(completionRate)}%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Days</p>
                  <p className="text-2xl text-blue-600">{totalCompletions}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                out of {totalDays} tracked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-2xl text-orange-600">{currentStreak}</p>
                </div>
                <Flame className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                days in a row
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-2xl text-purple-600">{longestStreak}</p>
                </div>
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                personal record
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              This Week
            </CardTitle>
            <CardDescription>
              Your progress over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">{day.dayName}</p>
                  <div className={`w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center ${
                    day.completed 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : day.count > 0
                      ? 'bg-yellow-500 border-yellow-500 text-white'
                      : 'border-muted-foreground text-muted-foreground'
                  }`}>
                    {day.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : day.count > 0 ? (
                      <span className="text-xs">{day.count}</span>
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Calendar View
            </CardTitle>
            <CardDescription>
              Track your habit on any date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                modifiers={{
                  completed: (date) => getDateModifiers(date).completed,
                  partial: (date) => getDateModifiers(date).partial
                }}
                modifiersStyles={{
                  completed: { 
                    backgroundColor: '#22C55E', 
                    color: 'white',
                    fontWeight: 'bold'
                  },
                  partial: { 
                    backgroundColor: '#EAB308', 
                    color: 'white',
                    fontWeight: 'bold'
                  }
                }}
                className="rounded-md border"
              />
              
              {/* Selected Date Actions */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{formatDate(selectedDateStr)}</h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Status: {isSelectedDateCompleted ? 'Completed' : selectedDateCount > 0 ? 'Partial' : 'Not started'}
                    </p>
                    {habit.targetCount > 1 && (
                      <p className="text-sm text-muted-foreground">
                        Progress: {selectedDateCount}/{habit.targetCount}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {habit.targetCount === 1 ? (
                      <Button
                        variant={isSelectedDateCompleted ? "default" : "outline"}
                        size="sm"
                        onClick={handleToggleSelectedDate}
                      >
                        {isSelectedDateCompleted ? 'Completed' : 'Mark Complete'}
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleIncrementSelectedDate}
                          disabled={selectedDateCount >= habit.targetCount}
                        >
                          +1
                        </Button>
                        <Button
                          variant={isSelectedDateCompleted ? "default" : "outline"}
                          size="sm"
                          onClick={handleToggleSelectedDate}
                        >
                          {isSelectedDateCompleted ? 'Completed' : 'Toggle'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                {habit.targetCount > 1 && selectedDateCount > 0 && (
                  <div className="mt-2">
                    <Progress 
                      value={(selectedDateCount / habit.targetCount) * 100} 
                      className="h-2" 
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivation */}
        {currentStreak >= 3 && (
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Flame className="w-8 h-8 text-orange-500" />
                <div>
                  <h3 className="font-medium">You're on fire! 🔥</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentStreak} days in a row! Keep the momentum going.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}