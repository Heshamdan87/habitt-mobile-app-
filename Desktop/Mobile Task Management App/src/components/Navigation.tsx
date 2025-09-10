import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Home, 
  User, 
  Settings, 
  BarChart3, 
  Bell 
} from 'lucide-react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'home' | 'profile' | 'settings' | 'reports' | 'notifications') => void;
  unreadNotifications: number;
}

type NavigationScreen = 'home' | 'profile' | 'settings' | 'reports' | 'notifications';

export function Navigation({ currentScreen, onNavigate, unreadNotifications }: NavigationProps) {
  const navItems: Array<{
    id: NavigationScreen;
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'notifications',
      label: 'Alerts',
      icon: <Bell className="w-5 h-5" />,
      badge: unreadNotifications
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-5 h-5" />
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentScreen === item.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex-col h-auto py-2 px-3 relative ${
                currentScreen === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-accent'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}