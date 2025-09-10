import React, { useState, useEffect } from 'react';
import { LoginScreen } from './LoginScreen';
import { SignupScreen } from './SignupScreen';
import { HabitHomepage } from './HabitHomepage';
import { HabitConfigureScreen } from './HabitConfigureScreen';
import { HabitDetailScreen } from './HabitDetailScreen';
import { SettingsScreen } from './SettingsScreen';
import { ProfileScreen } from './ProfileScreen';
import { HabitReportsScreen } from './HabitReportsScreen';
import { NotificationsScreen } from './NotificationsScreen';
import { APIIntegrationScreen } from './APIIntegrationScreen';
import { APIDemoScreen } from './APIDemoScreen';
import { HabitNavigation } from './HabitNavigation';
import { toast, Toaster } from 'sonner@2.0.3';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  age?: number;
  country?: string;
  avatar?: string;
  createdAt: string;
}

export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  frequency: 'daily' | 'weekly' | 'custom';
  targetCount: number; // For habits like "drink 8 glasses of water"
  category: string;
  createdAt: string;
  userId: string;
  isActive: boolean;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD format
  completed: boolean;
  completedAt: string | null;
  count: number; // How many times completed that day
}

export interface Settings {
  theme: 'light' | 'dark';
  notifications: boolean;
  reminderTime: number; // minutes before reminder
  reminderTimes: string[]; // Array of times like ["09:00", "14:00", "19:00"]
  language: string;
  autoSave: boolean;
}

type Screen = 'login' | 'signup' | 'home' | 'habits' | 'habit-detail' | 'settings' | 'profile' | 'reports' | 'notifications' | 'api-integration' | 'api-demo';

export default function HabitApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const [settings, setSettings] = useState<Settings>({
    theme: 'light',
    notifications: true,
    reminderTime: 30,
    reminderTimes: ['09:00', '14:00', '19:00'],
    language: 'en',
    autoSave: true
  });

  // Initialize app data and check for stored user session
  useEffect(() => {
    const storedUser = localStorage.getItem('habitt-user');
    const storedHabits = localStorage.getItem('habitt-habits');
    const storedCompletions = localStorage.getItem('habitt-completions');
    const storedSettings = localStorage.getItem('habitt-settings');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentScreen('home');
    }

    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    } else {
      // Initialize with sample habits
      const sampleHabits: Habit[] = [
        {
          id: '1',
          name: 'Morning Workout',
          description: '30 minutes of exercise',
          color: '#EF4444',
          frequency: 'daily',
          targetCount: 1,
          category: 'Health',
          createdAt: '2025-08-01',
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
          createdAt: '2025-08-01',
          userId: 'demo-user',
          isActive: true
        },
        {
          id: '3',
          name: 'Read 30 minutes',
          description: 'Read books or educational material',
          color: '#22C55E',
          frequency: 'daily',
          targetCount: 1,
          category: 'Learning',
          createdAt: '2025-08-01',
          userId: 'demo-user',
          isActive: true
        }
      ];
      setHabits(sampleHabits);
    }

    if (storedCompletions) {
      setCompletions(JSON.parse(storedCompletions));
    }

    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }

    // Apply theme
    const theme = storedSettings ? JSON.parse(storedSettings).theme : 'light';
    document.documentElement.className = theme === 'dark' ? 'dark' : '';
  }, []);

  // Auto-save data when it changes
  useEffect(() => {
    if (settings.autoSave) {
      localStorage.setItem('habitt-habits', JSON.stringify(habits));
      localStorage.setItem('habitt-completions', JSON.stringify(completions));
    }
  }, [habits, completions, settings.autoSave]);

  useEffect(() => {
    localStorage.setItem('habitt-settings', JSON.stringify(settings));
    document.documentElement.className = settings.theme === 'dark' ? 'dark' : '';
  }, [settings]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('habitt-user', JSON.stringify(user));
    setCurrentScreen('home');
    toast.success(`Welcome back, ${user.name}!`);
  };

  const handleSignup = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('habitt-user', JSON.stringify(user));
    setCurrentScreen('home');
    toast.success(`Welcome to Habitt, ${user.name}!`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('habitt-user');
    setCurrentScreen('login');
    toast.success('Logged out successfully');
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'userId' | 'isActive'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser?.id || 'demo-user',
      isActive: true
    };
    setHabits(prev => [...prev, newHabit]);
    toast.success('Habit added successfully');
  };

  const updateHabit = (habitId: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId ? { ...habit, ...updates } : habit
    ));
    toast.success('Habit updated successfully');
  };

  const deleteHabit = (habitId: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== habitId));
    // Also remove associated completions
    setCompletions(prev => prev.filter(completion => completion.habitId !== habitId));
    toast.success('Habit deleted successfully');
  };

  const toggleHabitCompletion = (habitId: string, date: string = new Date().toISOString().split('T')[0]) => {
    const existingCompletion = completions.find(c => c.habitId === habitId && c.date === date);
    
    if (existingCompletion) {
      // Toggle completion
      const updatedCompletion: HabitCompletion = {
        ...existingCompletion,
        completed: !existingCompletion.completed,
        completedAt: !existingCompletion.completed ? new Date().toISOString() : null,
        count: !existingCompletion.completed ? 1 : 0
      };
      
      setCompletions(prev => prev.map(c => 
        c.id === existingCompletion.id ? updatedCompletion : c
      ));
    } else {
      // Create new completion
      const newCompletion: HabitCompletion = {
        id: Date.now().toString(),
        habitId,
        date,
        completed: true,
        completedAt: new Date().toISOString(),
        count: 1
      };
      
      setCompletions(prev => [...prev, newCompletion]);
    }
    
    const isCompleted = !existingCompletion?.completed;
    toast.success(isCompleted ? 'Habit completed! 🎉' : 'Habit unmarked');
  };

  const incrementHabitCount = (habitId: string, date: string = new Date().toISOString().split('T')[0]) => {
    const existingCompletion = completions.find(c => c.habitId === habitId && c.date === date);
    const habit = habits.find(h => h.id === habitId);
    
    if (!habit) return;
    
    if (existingCompletion) {
      const newCount = Math.min(existingCompletion.count + 1, habit.targetCount);
      const updatedCompletion: HabitCompletion = {
        ...existingCompletion,
        count: newCount,
        completed: newCount >= habit.targetCount,
        completedAt: newCount >= habit.targetCount ? new Date().toISOString() : existingCompletion.completedAt
      };
      
      setCompletions(prev => prev.map(c => 
        c.id === existingCompletion.id ? updatedCompletion : c
      ));
    } else {
      const newCompletion: HabitCompletion = {
        id: Date.now().toString(),
        habitId,
        date,
        completed: habit.targetCount === 1,
        completedAt: habit.targetCount === 1 ? new Date().toISOString() : null,
        count: 1
      };
      
      setCompletions(prev => [...prev, newCompletion]);
    }
  };

  const viewHabitDetail = (habit: Habit) => {
    setSelectedHabit(habit);
    setCurrentScreen('habit-detail');
  };

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const renderScreen = () => {
    if (!currentUser && currentScreen !== 'login' && currentScreen !== 'signup') {
      return (
        <LoginScreen 
          onLogin={handleLogin} 
          onNavigateToSignup={() => setCurrentScreen('signup')}
          isHabitApp={true}
        />
      );
    }

    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin} 
            onNavigateToSignup={() => setCurrentScreen('signup')}
            isHabitApp={true}
          />
        );
      
      case 'signup':
        return (
          <SignupScreen 
            onSignup={handleSignup} 
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      
      case 'home':
        return (
          <HabitHomepage
            user={currentUser!}
            habits={habits}
            completions={completions}
            onToggleHabit={toggleHabitCompletion}
            onIncrementHabit={incrementHabitCount}
            onViewHabit={viewHabitDetail}
            onNavigateToHabits={() => setCurrentScreen('habits')}
          />
        );
      
      case 'habits':
        return (
          <HabitConfigureScreen
            habits={habits}
            onAddHabit={addHabit}
            onUpdateHabit={updateHabit}
            onDeleteHabit={deleteHabit}
            onViewHabit={viewHabitDetail}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'habit-detail':
        return selectedHabit ? (
          <HabitDetailScreen
            habit={selectedHabit}
            completions={completions.filter(c => c.habitId === selectedHabit.id)}
            onUpdateHabit={(updates) => updateHabit(selectedHabit.id, updates)}
            onDeleteHabit={() => {
              deleteHabit(selectedHabit.id);
              setCurrentScreen('habits');
            }}
            onToggleCompletion={toggleHabitCompletion}
            onIncrementCount={incrementHabitCount}
            onBack={() => setCurrentScreen('habits')}
          />
        ) : null;
      
      case 'settings':
        return (
          <SettingsScreen
            settings={settings}
            onUpdateSettings={updateSettings}
            onBack={() => setCurrentScreen('home')}
            onNavigateToAPIIntegration={() => setCurrentScreen('api-integration')}
            onNavigateToAPIDemo={() => setCurrentScreen('api-demo')}
          />
        );
      
      case 'profile':
        return (
          <ProfileScreen
            user={currentUser!}
            tasks={[]} // Empty for habit app
            onUpdateUser={(updates) => {
              const updatedUser = { ...currentUser!, ...updates };
              setCurrentUser(updatedUser);
              localStorage.setItem('habitt-user', JSON.stringify(updatedUser));
            }}
            onLogout={handleLogout}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'reports':
        return (
          <HabitReportsScreen
            habits={habits}
            completions={completions}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'notifications':
        return (
          <NotificationsScreen
            settings={settings}
            onUpdateSettings={updateSettings}
            onBack={() => setCurrentScreen('home')}
          />
        );
      
      case 'api-integration':
        return (
          <APIIntegrationScreen
            settings={settings}
            onUpdateSettings={updateSettings}
            onBack={() => setCurrentScreen('settings')}
          />
        );
      
      case 'api-demo':
        return (
          <APIDemoScreen
            onBack={() => setCurrentScreen('settings')}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-background">
        {renderScreen()}
        
        {currentUser && currentScreen !== 'login' && currentScreen !== 'signup' && (
          <HabitNavigation
            currentScreen={currentScreen}
            onNavigate={navigate}
            unreadNotifications={0}
          />
        )}
        
        <Toaster position="top-center" richColors />
      </div>
    </div>
  );
}