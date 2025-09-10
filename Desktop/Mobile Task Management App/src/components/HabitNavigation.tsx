import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  Plus, 
  BarChart3, 
  User, 
  Bell,
  Settings,
  Calendar,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';

type Screen = 'home' | 'habits' | 'reports' | 'profile' | 'settings' | 'notifications' | 'api-integration';

interface HabitNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  unreadNotifications?: number;
}

export function HabitNavigation({ currentScreen, onNavigate, unreadNotifications = 0 }: HabitNavigationProps) {
  const navigationItems = [
    {
      id: 'home' as Screen,
      icon: Home,
      label: 'Home',
      description: 'Dashboard and today\'s habits'
    },
    {
      id: 'habits' as Screen,
      icon: Target,
      label: 'Habits',
      description: 'Manage your habits'
    },
    {
      id: 'reports' as Screen,
      icon: BarChart3,
      label: 'Reports',
      description: 'Analytics and insights'
    },
    {
      id: 'notifications' as Screen,
      icon: Bell,
      label: 'Alerts',
      description: 'Notification settings',
      badge: unreadNotifications > 0 ? unreadNotifications : undefined
    },
    {
      id: 'profile' as Screen,
      icon: User,
      label: 'Profile',
      description: 'Account and settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center justify-center h-16 px-2 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-label={item.description}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-1" />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium leading-none">
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}