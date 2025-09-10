import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Target, 
  CheckCircle2,
  BarChart3,
  Download,
  Filter,
  Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { Habit, HabitCompletion } from './HabitApp';

interface HabitReportsScreenProps {
  habits: Habit[];
  completions: HabitCompletion[];
  onBack: () => void;
}

type TimeFrame = 'week' | 'month' | 'quarter';

export function HabitReportsScreen({ habits, completions, onBack }: HabitReportsScreenProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');

  // Get date range based on timeframe
  const getDateRange = (frame: TimeFrame) => {
    const end = new Date();
    const start = new Date();
    
    switch (frame) {
      case 'week':
        start.setDate(end.getDate() - 7);
        break;
      case 'month':
        start.setDate(end.getDate() - 30);
        break;
      case 'quarter':
        start.setDate(end.getDate() - 90);
        break;
    }
    
    return { start, end };
  };

  const { start, end } = getDateRange(timeFrame);
  const activeHabits = habits.filter(h => h.isActive);

  // Filter completions for the selected timeframe
  const filteredCompletions = completions.filter(completion => {
    const completionDate = new Date(completion.date);
    return completionDate >= start && completionDate <= end;
  });

  // Calculate overall completion rate
  const totalPossibleCompletions = activeHabits.length * Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalCompletions = filteredCompletions.filter(c => c.completed).length;
  const overallCompletionRate = totalPossibleCompletions > 0 ? (totalCompletions / totalPossibleCompletions) * 100 : 0;

  // Generate daily completion data for chart
  const generateDailyData = () => {
    const data = [];
    const current = new Date(start);
    
    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayCompletions = filteredCompletions.filter(c => c.date === dateStr);
      const completed = dayCompletions.filter(c => c.completed).length;
      const total = activeHabits.length;
      
      data.push({
        date: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        completed: completed,
        total: total,
        rate: total > 0 ? (completed / total) * 100 : 0
      });
      
      current.setDate(current.getDate() + 1);
    }
    
    return data.slice(-14); // Show last 14 days for better visualization
  };

  // Get habit performance data
  const getHabitPerformance = () => {
    return activeHabits.map(habit => {
      const habitCompletions = filteredCompletions.filter(c => c.habitId === habit.id);
      const completed = habitCompletions.filter(c => c.completed).length;
      const total = habitCompletions.length;
      const rate = total > 0 ? (completed / total) * 100 : 0;

      // Calculate streak
      const calculateStreak = () => {
        const sortedCompletions = [...habitCompletions]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        let streak = 0;
        const today = new Date().toISOString().split('T')[0];
        
        for (const completion of sortedCompletions) {
          if (completion.completed) {
            streak++;
          } else {
            break;
          }
        }
        
        return streak;
      };

      return {
        habit,
        completed,
        total,
        rate,
        streak: calculateStreak()
      };
    }).sort((a, b) => b.rate - a.rate);
  };

  const dailyData = generateDailyData();
  const habitPerformance = getHabitPerformance();

  // Calculate insights
  const bestPerformingHabit = habitPerformance[0];
  const averageCompletionRate = habitPerformance.length > 0 
    ? habitPerformance.reduce((sum, h) => sum + h.rate, 0) / habitPerformance.length 
    : 0;

  const getTimeFrameLabel = (frame: TimeFrame) => {
    switch (frame) {
      case 'week': return 'Last 7 Days';
      case 'month': return 'Last 30 Days';
      case 'quarter': return 'Last 90 Days';
    }
  };

  const getInsightLevel = (rate: number) => {
    if (rate >= 80) return { label: 'Excellent', color: 'text-green-600' };
    if (rate >= 60) return { label: 'Good', color: 'text-blue-600' };
    if (rate >= 40) return { label: 'Fair', color: 'text-yellow-600' };
    return { label: 'Needs Work', color: 'text-red-600' };
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
            <h1 className="text-xl">Habit Reports</h1>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Time Frame Selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge variant="outline">{getTimeFrameLabel(timeFrame)}</Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overall Rate</p>
                  <p className="text-2xl text-green-600">{Math.round(averageCompletionRate)}%</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <Progress value={averageCompletionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Completed</p>
                  <p className="text-2xl text-blue-600">{totalCompletions}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                habit completions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Habits</p>
                  <p className="text-2xl text-purple-600">{activeHabits.length}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                being tracked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Best Streak</p>
                  <p className="text-2xl text-orange-600">
                    {habitPerformance.length > 0 ? Math.max(...habitPerformance.map(h => h.streak)) : 0}
                  </p>
                </div>
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                days in a row
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Daily Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Daily Completion Rate
            </CardTitle>
            <CardDescription>
              Your habit completion percentage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Line 
                    type="monotone"
                    dataKey="rate" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Habit Performance Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Habit Performance</CardTitle>
            <CardDescription>
              Individual habit completion rates and streaks
            </CardDescription>
          </CardHeader>
          <CardContent>
            {habitPerformance.length > 0 ? (
              <div className="space-y-4">
                {habitPerformance.map((item) => {
                  const insight = getInsightLevel(item.rate);
                  return (
                    <div key={item.habit.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.habit.color }}
                          />
                          <div>
                            <p className="font-medium">{item.habit.name}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {item.completed}/{item.total} days
                              </Badge>
                              <span className={`text-xs ${insight.color}`}>
                                {insight.label}
                              </span>
                              {item.streak > 0 && (
                                <span className="text-xs text-orange-600">
                                  🔥 {item.streak} day streak
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">
                          {Math.round(item.rate)}%
                        </span>
                      </div>
                      <Progress value={item.rate} className="h-2" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                <p>No habit data available for this period</p>
                <p className="text-sm">Start tracking habits to see your progress here</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Highlights from your {getTimeFrameLabel(timeFrame).toLowerCase()} performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {averageCompletionRate >= 80 && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  🎉 Outstanding performance! You're maintaining an excellent completion rate.
                </p>
              </div>
            )}
            
            {bestPerformingHabit && bestPerformingHabit.rate >= 90 && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  ⭐ "{bestPerformingHabit.habit.name}" is your strongest habit at {Math.round(bestPerformingHabit.rate)}% completion rate.
                </p>
              </div>
            )}

            {habitPerformance.some(h => h.streak >= 7) && (
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  🔥 You have active streaks of 7+ days! Keep the momentum going.
                </p>
              </div>
            )}

            {averageCompletionRate < 50 && habitPerformance.length > 0 && (
              <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  💡 Focus on consistency. Try starting with fewer habits to build strong foundations.
                </p>
              </div>
            )}

            {habitPerformance.length === 0 && (
              <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                <p className="text-sm text-muted-foreground">
                  📊 Start tracking habits to see personalized insights and progress reports.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}