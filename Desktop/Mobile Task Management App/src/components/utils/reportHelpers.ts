import type { Task } from '../../App';

export type TimeFrame = 'week' | 'month' | 'quarter' | 'year';

export const getDateRange = (frame: TimeFrame) => {
  const end = new Date();
  const start = new Date();
  
  switch (frame) {
    case 'week':
      start.setDate(end.getDate() - 7);
      break;
    case 'month':
      start.setMonth(end.getMonth() - 1);
      break;
    case 'quarter':
      start.setMonth(end.getMonth() - 3);
      break;
    case 'year':
      start.setFullYear(end.getFullYear() - 1);
      break;
  }
  
  return { start, end };
};

export const generateDailyData = (tasks: Task[], start: Date, end: Date) => {
  const data = [];
  const current = new Date(start);
  
  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    const dayTasks = tasks.filter(task => 
      task.createdAt.split('T')[0] === dateStr
    );
    const completed = dayTasks.filter(task => task.completed).length;
    
    data.push({
      date: current.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      created: dayTasks.length,
      completed: completed
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return data.slice(-14); // Show last 14 days for better visualization
};

export const getCategoryData = (tasks: Task[]) => {
  const categories: { [key: string]: { total: number; completed: number } } = {};
  
  tasks.forEach(task => {
    if (!categories[task.category]) {
      categories[task.category] = { total: 0, completed: 0 };
    }
    categories[task.category].total++;
    if (task.completed) {
      categories[task.category].completed++;
    }
  });

  return Object.entries(categories).map(([name, data]) => ({
    name,
    total: data.total,
    completed: data.completed,
    rate: data.total > 0 ? (data.completed / data.total) * 100 : 0
  }));
};

export const getPriorityData = (tasks: Task[]) => {
  const priorities = { high: 0, medium: 0, low: 0 };
  const prioritiesCompleted = { high: 0, medium: 0, low: 0 };
  
  tasks.forEach(task => {
    priorities[task.priority]++;
    if (task.completed) {
      prioritiesCompleted[task.priority]++;
    }
  });

  return [
    { name: 'High', value: priorities.high, completed: prioritiesCompleted.high, color: '#ef4444' },
    { name: 'Medium', value: priorities.medium, completed: prioritiesCompleted.medium, color: '#f59e0b' },
    { name: 'Low', value: priorities.low, completed: prioritiesCompleted.low, color: '#10b981' }
  ].filter(item => item.value > 0);
};

export const calculateStreaks = (tasks: Task[]) => {
  const completedTasks = tasks.filter(task => task.completed);
  const completionDates = completedTasks
    .map(task => task.completedAt ? new Date(task.completedAt).toDateString() : null)
    .filter(Boolean) as string[];

  const uniqueDates = [...new Set(completionDates)].sort();
  
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;

  for (let i = 1; i < uniqueDates.length; i++) {
    const prevDate = new Date(uniqueDates[i - 1]);
    const currDate = new Date(uniqueDates[i]);
    const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (diffDays === 1) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }
  
  longestStreak = Math.max(longestStreak, tempStreak);
  
  // Calculate current streak
  const today = new Date().toDateString();
  if (completionDates.includes(today)) {
    currentStreak++;
    let checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);
    
    while (completionDates.includes(checkDate.toDateString())) {
      currentStreak++;
      checkDate.setDate(checkDate.getDate() - 1);
    }
  }

  return { currentStreak, longestStreak };
};

export const getTimeFrameLabel = (frame: TimeFrame) => {
  switch (frame) {
    case 'week': return 'Last 7 Days';
    case 'month': return 'Last 30 Days';
    case 'quarter': return 'Last 3 Months';
    case 'year': return 'Last Year';
  }
};