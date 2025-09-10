import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  TrendingUp, 
  Target, 
  CheckCircle2,
  BarChart3,
  Download,
  Filter
} from 'lucide-react';
import { DailyChart } from './charts/DailyChart';
import { CategoryChart } from './charts/CategoryChart';
import { PriorityChart } from './charts/PriorityChart';
import {
  TimeFrame,
  getDateRange,
  generateDailyData,
  getCategoryData,
  getPriorityData,
  calculateStreaks,
  getTimeFrameLabel
} from './utils/reportHelpers';
import type { Task } from '../App';

interface ReportsScreenProps {
  tasks: Task[];
  onBack: () => void;
}

type MetricType = 'completion' | 'category' | 'priority';

export function ReportsScreen({ tasks, onBack }: ReportsScreenProps) {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('month');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('completion');

  const { start, end } = getDateRange(timeFrame);
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    return taskDate >= start && taskDate <= end;
  });

  const completedTasks = filteredTasks.filter(task => task.completed);
  const completionRate = filteredTasks.length > 0 ? (completedTasks.length / filteredTasks.length) * 100 : 0;

  const dailyData = generateDailyData(filteredTasks, start, end);
  const categoryData = getCategoryData(filteredTasks);
  const priorityData = getPriorityData(filteredTasks);
  const { currentStreak, longestStreak } = calculateStreaks(tasks);

  const renderChart = () => {
    switch (selectedMetric) {
      case 'completion':
        return <DailyChart data={dailyData} />;
      case 'category':
        return <CategoryChart data={categoryData} />;
      case 'priority':
        return <PriorityChart data={priorityData} />;
      default:
        return null;
    }
  };

  const getChartDescription = () => {
    switch (selectedMetric) {
      case 'completion':
        return 'Daily task creation and completion over time';
      case 'category':
        return 'Task completion rates by category';
      case 'priority':
        return 'Task distribution by priority level';
      default:
        return '';
    }
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
            <h1 className="text-xl">Reports & Analytics</h1>
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
                <SelectItem value="quarter">Last 3 Months</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
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
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
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
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl text-blue-600">{completedTasks.length}</p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                out of {filteredTasks.length} total
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
                <TrendingUp className="w-8 h-8 text-orange-600" />
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
                  <p className="text-sm text-muted-foreground">Longest Streak</p>
                  <p className="text-2xl text-purple-600">{longestStreak}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                personal best
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Activity Overview
              </CardTitle>
              <Select value={selectedMetric} onValueChange={(value: MetricType) => setSelectedMetric(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completion">Daily</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>{getChartDescription()}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
            <CardDescription>
              Highlights from your {getTimeFrameLabel(timeFrame).toLowerCase()} activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {completionRate >= 80 && (
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400">
                  🎉 Excellent completion rate! You're staying on top of your tasks.
                </p>
              </div>
            )}
            
            {currentStreak >= 7 && (
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-700 dark:text-orange-400">
                  🔥 You're on a {currentStreak}-day streak! Keep up the momentum.
                </p>
              </div>
            )}

            {categoryData.length > 0 && (
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  📊 Most active category: {categoryData.sort((a, b) => b.total - a.total)[0]?.name}
                </p>
              </div>
            )}

            {filteredTasks.length === 0 && (
              <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                <p className="text-sm text-muted-foreground">
                  No tasks found for this time period. Try selecting a different timeframe.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}