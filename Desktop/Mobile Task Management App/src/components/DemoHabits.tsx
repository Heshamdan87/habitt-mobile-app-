import type { Habit, HabitCompletion } from './HabitApp';

// Sample habits for demo purposes
export const demoHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Workout',
    description: '30 minutes of exercise to start the day',
    color: '#EF4444',
    frequency: 'daily',
    targetCount: 1,
    category: 'Health',
    createdAt: '2025-01-01T00:00:00.000Z',
    userId: 'demo-user',
    isActive: true
  },
  {
    id: '2',
    name: 'Drink Water',
    description: 'Stay hydrated throughout the day',
    color: '#3B82F6',
    frequency: 'daily',
    targetCount: 8,
    category: 'Health',
    createdAt: '2025-01-01T00:00:00.000Z',
    userId: 'demo-user',
    isActive: true
  },
  {
    id: '3',
    name: 'Read for 30 minutes',
    description: 'Read books or educational material',
    color: '#22C55E',
    frequency: 'daily',
    targetCount: 1,
    category: 'Learning',
    createdAt: '2025-01-01T00:00:00.000Z',
    userId: 'demo-user',
    isActive: true
  },
  {
    id: '4',
    name: 'Meditate',
    description: 'Daily meditation for mental wellness',
    color: '#A855F7',
    frequency: 'daily',
    targetCount: 1,
    category: 'Personal',
    createdAt: '2025-01-01T00:00:00.000Z',
    userId: 'demo-user',
    isActive: true
  },
  {
    id: '5',
    name: 'Write in Journal',
    description: 'Reflect on the day and thoughts',
    color: '#F59E0B',
    frequency: 'daily',
    targetCount: 1,
    category: 'Personal',
    createdAt: '2025-01-01T00:00:00.000Z',
    userId: 'demo-user',
    isActive: true
  }
];

// Generate sample completions for the last 30 days
export const generateDemoCompletions = (): HabitCompletion[] => {
  const completions: HabitCompletion[] = [];
  const today = new Date();
  
  // Generate completions for last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    demoHabits.forEach(habit => {
      // Simulate realistic completion patterns
      const completionRate = getCompletionRate(habit.id, i);
      const shouldComplete = Math.random() < completionRate;
      
      if (shouldComplete || i === 0) { // Always show some progress for today
        const count = habit.targetCount === 1 ? 1 : Math.floor(Math.random() * habit.targetCount) + 1;
        const completed = count >= habit.targetCount;
        
        completions.push({
          id: `${habit.id}-${dateStr}`,
          habitId: habit.id,
          date: dateStr,
          completed,
          completedAt: completed ? date.toISOString() : null,
          count
        });
      }
    });
  }
  
  return completions;
};

// Simulate different completion patterns for different habits
function getCompletionRate(habitId: string, daysAgo: number): number {
  const baseRates = {
    '1': 0.8, // Morning Workout - high commitment
    '2': 0.95, // Drink Water - easy to maintain  
    '3': 0.7, // Reading - moderate commitment
    '4': 0.6, // Meditation - harder to maintain
    '5': 0.5  // Journaling - most challenging
  };
  
  const baseRate = baseRates[habitId as keyof typeof baseRates] || 0.7;
  
  // Simulate decreasing motivation over time
  const motivationDecay = Math.max(0.3, 1 - (daysAgo * 0.02));
  
  return baseRate * motivationDecay;
}

// Motivational achievements based on streaks and completion rates
export const calculateAchievements = (habits: Habit[], completions: HabitCompletion[]) => {
  const achievements = [];
  
  // Calculate streaks for each habit
  habits.forEach(habit => {
    const habitCompletions = completions
      .filter(c => c.habitId === habit.id && c.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date();
    
    // Calculate current streak
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasCompletion = habitCompletions.some(c => c.date === dateStr);
      
      if (hasCompletion) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr === today) {
        // Today hasn't been completed yet, check yesterday
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    // Award achievements based on streaks
    if (currentStreak >= 7) {
      achievements.push({
        id: `week-${habit.id}`,
        title: 'Week Warrior!',
        description: `7 day streak with ${habit.name}`,
        icon: '🔥',
        habit: habit.name,
        earnedDate: new Date().toISOString()
      });
    }
    
    if (currentStreak >= 30) {
      achievements.push({
        id: `month-${habit.id}`,
        title: 'Monthly Master!',
        description: `30 day streak with ${habit.name}`,
        icon: '🏆',
        habit: habit.name,
        earnedDate: new Date().toISOString()
      });
    }
  });
  
  // Overall completion achievements
  const totalCompletions = completions.filter(c => c.completed).length;
  
  if (totalCompletions >= 50) {
    achievements.push({
      id: 'completionist',
      title: 'Habit Champion!',
      description: '50+ total habit completions',
      icon: '⭐',
      habit: 'All Habits',
      earnedDate: new Date().toISOString()
    });
  }
  
  return achievements;
};