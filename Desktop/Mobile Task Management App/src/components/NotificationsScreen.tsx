import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Bell, 
  BellOff,
  Clock, 
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Calendar,
  TrendingUp,
  Target,
  Zap,
  Moon,
  Sun,
  MapPin,
  Users,
  Gift,
  Star,
  CheckCircle2,
  Plus,
  Edit3,
  Trash2,
  Settings2,
  AlertCircle,
  Info,
  Heart,
  Trophy,
  Flame,
  Quote,
  Cloud
} from 'lucide-react';
import type { Settings } from './HabitApp';

interface NotificationsScreenProps {
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  onBack: () => void;
}

interface NotificationRule {
  id: string;
  name: string;
  type: 'reminder' | 'achievement' | 'summary' | 'motivation' | 'weather';
  enabled: boolean;
  times: string[];
  days: string[];
  conditions?: Record<string, any>;
  customMessage?: string;
  priority: 'low' | 'medium' | 'high';
  icon: React.ReactNode;
}

interface SmartNotificationSettings {
  adaptiveReminders: boolean;
  quietHours: { start: string; end: string; enabled: boolean };
  locationBased: boolean;
  weatherAware: boolean;
  streakCelebrations: boolean;
  motivationalQuotes: boolean;
  socialReminders: boolean;
  aiSuggestions: boolean;
}

export function NotificationsScreen({ settings, onUpdateSettings, onBack }: NotificationsScreenProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [localSettings, setLocalSettings] = useState(settings);
  const [notificationRules, setNotificationRules] = useState<NotificationRule[]>([
    {
      id: '1',
      name: 'Morning Motivation',
      type: 'motivation',
      enabled: true,
      times: ['08:00'],
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      customMessage: 'Good morning! Ready to build great habits today?',
      priority: 'high',
      icon: <Sun className="w-4 h-4" />
    },
    {
      id: '2',
      name: 'Habit Reminders',
      type: 'reminder',
      enabled: true,
      times: ['09:00', '14:00', '19:00'],
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      priority: 'medium',
      icon: <Bell className="w-4 h-4" />
    },
    {
      id: '3',
      name: 'Weekly Summary',
      type: 'summary',
      enabled: true,
      times: ['20:00'],
      days: ['sunday'],
      priority: 'low',
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: '4',
      name: 'Streak Achievements',
      type: 'achievement',
      enabled: true,
      times: ['21:00'],
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      priority: 'high',
      icon: <Trophy className="w-4 h-4" />
    }
  ]);

  const [smartSettings, setSmartSettings] = useState<SmartNotificationSettings>({
    adaptiveReminders: true,
    quietHours: { start: '22:00', end: '07:00', enabled: true },
    locationBased: false,
    weatherAware: true,
    streakCelebrations: true,
    motivationalQuotes: true,
    socialReminders: false,
    aiSuggestions: true
  });

  const [notificationStats] = useState({
    totalSent: 847,
    dailyAverage: 12,
    openRate: 78,
    engagement: 85
  });

  const [newRule, setNewRule] = useState({
    name: '',
    type: 'reminder' as const,
    times: ['09:00'],
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    customMessage: '',
    priority: 'medium' as const
  });

  const weekDays = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ];

  const notificationTypes = [
    { value: 'reminder', label: 'Habit Reminder', icon: <Bell className="w-4 h-4" /> },
    { value: 'achievement', label: 'Achievement', icon: <Trophy className="w-4 h-4" /> },
    { value: 'summary', label: 'Summary', icon: <TrendingUp className="w-4 h-4" /> },
    { value: 'motivation', label: 'Motivation', icon: <Heart className="w-4 h-4" /> },
    { value: 'weather', label: 'Weather-based', icon: <Cloud className="w-4 h-4" /> }
  ];

  const updateLocalSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
    onUpdateSettings({ [key]: value });
  };

  const toggleNotificationRule = (ruleId: string) => {
    setNotificationRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
    toast.success('Notification rule updated');
  };

  const deleteNotificationRule = (ruleId: string) => {
    setNotificationRules(prev => prev.filter(rule => rule.id !== ruleId));
    toast.success('Notification rule deleted');
  };

  const addNotificationRule = () => {
    if (!newRule.name) {
      toast.error('Please enter a rule name');
      return;
    }

    const rule: NotificationRule = {
      id: Date.now().toString(),
      ...newRule,
      enabled: true,
      icon: notificationTypes.find(t => t.value === newRule.type)?.icon || <Bell className="w-4 h-4" />
    };

    setNotificationRules(prev => [...prev, rule]);
    setNewRule({
      name: '',
      type: 'reminder',
      times: ['09:00'],
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      customMessage: '',
      priority: 'medium'
    });
    toast.success('Notification rule added');
  };

  const testNotification = (rule: NotificationRule) => {
    toast.success(`Test notification sent: ${rule.name}`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getReminderText = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes === 60) return '1 hour';
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    return `${Math.floor(minutes / 1440)} days`;
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
            <h1 className="text-xl">Notifications</h1>
            <Badge variant={localSettings.notifications ? "default" : "secondary"}>
              {localSettings.notifications ? 'On' : 'Off'}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              toast.promise(
                new Promise(resolve => setTimeout(resolve, 1000)),
                {
                  loading: 'Sending test notification...',
                  success: 'Test notification sent!',
                  error: 'Failed to send test notification'
                }
              );
            }}
          >
            <Bell className="w-4 h-4 mr-2" />
            Test
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="smart">Smart</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6 mt-6">
            {/* Master Switch */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="w-5 h-5 mr-2" />
                    Push Notifications
                  </div>
                  <Switch
                    checked={localSettings.notifications}
                    onCheckedChange={(checked) => updateLocalSetting('notifications', checked)}
                  />
                </CardTitle>
                <CardDescription>
                  {localSettings.notifications 
                    ? "Notifications are enabled. You'll receive reminders and updates."
                    : "Notifications are disabled. You won't receive any alerts."
                  }
                </CardDescription>
              </CardHeader>
            </Card>

            {localSettings.notifications && (
              <>
                {/* Notification Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Notification Channels
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-4 h-4" />
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">On-device notifications</p>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4" />
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Weekly summaries and important updates</p>
                        </div>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="w-4 h-4" />
                        <div>
                          <Label>SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Critical reminders only</p>
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                {/* Default Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings2 className="w-5 h-5 mr-2" />
                      Default Settings
                    </CardTitle>
                    <CardDescription>
                      Configure default notification behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Default Reminder Time</Label>
                        <span className="text-sm text-muted-foreground">
                          {getReminderText(localSettings.reminderTime)} before
                        </span>
                      </div>
                      <Slider
                        value={[localSettings.reminderTime]}
                        onValueChange={([value]) => updateLocalSetting('reminderTime', value)}
                        min={5}
                        max={2880}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5 min</span>
                        <span>2 days</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Sound</Label>
                        <Select defaultValue="default">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="gentle">Gentle</SelectItem>
                            <SelectItem value="chime">Chime</SelectItem>
                            <SelectItem value="bell">Bell</SelectItem>
                            <SelectItem value="none">Silent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Vibration</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="off">Off</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="strong">Strong</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Types */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Volume2 className="w-5 h-5 mr-2" />
                      Notification Types
                    </CardTitle>
                    <CardDescription>
                      Choose which types of notifications you want to receive
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Bell className="w-4 h-4" />
                          <div>
                            <Label>Habit Reminders</Label>
                            <p className="text-sm text-muted-foreground">Reminders for scheduled habits</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Trophy className="w-4 h-4" />
                          <div>
                            <Label>Achievements</Label>
                            <p className="text-sm text-muted-foreground">Streak milestones and goal completions</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-4 h-4" />
                          <div>
                            <Label>Progress Reports</Label>
                            <p className="text-sm text-muted-foreground">Daily and weekly summaries</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Heart className="w-4 h-4" />
                          <div>
                            <Label>Motivational Messages</Label>
                            <p className="text-sm text-muted-foreground">Encouraging quotes and tips</p>
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-4 h-4" />
                          <div>
                            <Label>Social Updates</Label>
                            <p className="text-sm text-muted-foreground">Friend activities and challenges</p>
                          </div>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Gift className="w-4 h-4" />
                          <div>
                            <Label>Special Offers</Label>
                            <p className="text-sm text-muted-foreground">App updates and promotions</p>
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* Rules Tab */}
          <TabsContent value="rules" className="space-y-6 mt-6">
            {/* Add New Rule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Custom Notification Rules
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Rule
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create Notification Rule</DialogTitle>
                        <DialogDescription>
                          Set up a custom notification schedule
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Rule Name</Label>
                          <Input
                            value={newRule.name}
                            onChange={(e) => setNewRule(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Evening Workout Reminder"
                          />
                        </div>
                        
                        <div>
                          <Label>Type</Label>
                          <Select
                            value={newRule.type}
                            onValueChange={(value: any) => setNewRule(prev => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {notificationTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  <div className="flex items-center">
                                    {type.icon}
                                    <span className="ml-2">{type.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Priority</Label>
                          <Select
                            value={newRule.priority}
                            onValueChange={(value: any) => setNewRule(prev => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Custom Message (Optional)</Label>
                          <Textarea
                            value={newRule.customMessage}
                            onChange={(e) => setNewRule(prev => ({ ...prev, customMessage: e.target.value }))}
                            placeholder="Enter a custom message..."
                            rows={3}
                          />
                        </div>

                        <Button onClick={addNotificationRule} className="w-full">
                          Create Rule
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Create custom notification schedules for different scenarios
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Existing Rules */}
            <div className="space-y-4">
              {notificationRules.map((rule) => (
                <Card key={rule.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {rule.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge variant="outline" className={getPriorityColor(rule.priority)}>
                              {rule.priority}
                            </Badge>
                            <Badge variant="secondary">
                              {rule.type}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{rule.times.join(', ')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{rule.days.length} days/week</span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {rule.days.map(day => (
                                <Badge key={day} variant="outline" className="text-xs">
                                  {weekDays.find(d => d.key === day)?.label}
                                </Badge>
                              ))}
                            </div>
                            
                            {rule.customMessage && (
                              <p className="text-xs italic">"{rule.customMessage}"</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <Switch
                          checked={rule.enabled}
                          onCheckedChange={() => toggleNotificationRule(rule.id)}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => testNotification(rule)}
                        >
                          Test
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteNotificationRule(rule.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Smart Tab */}
          <TabsContent value="smart" className="space-y-6 mt-6">
            {/* AI-Powered Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Smart Notifications
                </CardTitle>
                <CardDescription>
                  AI-powered features that adapt to your behavior and environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Adaptive Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      AI learns when you're most likely to complete habits
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.adaptiveReminders}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, adaptiveReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>AI Suggestions</Label>
                    <p className="text-sm text-muted-foreground">
                      Get personalized recommendations for better habits
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.aiSuggestions}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, aiSuggestions: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Cloud className="w-4 h-4 mr-2" />
                      Weather-Aware Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Adjust outdoor activity reminders based on weather
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.weatherAware}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, weatherAware: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Location-Based Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders when you arrive at specific locations
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.locationBased}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, locationBased: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quiet Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon className="w-5 h-5 mr-2" />
                  Quiet Hours
                </CardTitle>
                <CardDescription>
                  Automatically silence notifications during specific times
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Enable Quiet Hours</Label>
                  <Switch
                    checked={smartSettings.quietHours.enabled}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ 
                        ...prev, 
                        quietHours: { ...prev.quietHours, enabled: checked }
                      }))
                    }
                  />
                </div>

                {smartSettings.quietHours.enabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={smartSettings.quietHours.start}
                        onChange={(e) => 
                          setSmartSettings(prev => ({ 
                            ...prev, 
                            quietHours: { ...prev.quietHours, start: e.target.value }
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={smartSettings.quietHours.end}
                        onChange={(e) => 
                          setSmartSettings(prev => ({ 
                            ...prev, 
                            quietHours: { ...prev.quietHours, end: e.target.value }
                          }))
                        }
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Motivation & Engagement */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Motivation & Engagement
                </CardTitle>
                <CardDescription>
                  Features designed to keep you motivated and engaged
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Flame className="w-4 h-4 mr-2" />
                      Streak Celebrations
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Special notifications for streak milestones
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.streakCelebrations}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, streakCelebrations: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Quote className="w-4 h-4 mr-2" />
                      Motivational Quotes
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Daily inspirational messages to keep you going
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.motivationalQuotes}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, motivationalQuotes: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Social Reminders
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about friends' progress and challenges
                    </p>
                  </div>
                  <Switch
                    checked={smartSettings.socialReminders}
                    onCheckedChange={(checked) => 
                      setSmartSettings(prev => ({ ...prev, socialReminders: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            {/* Notification Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Total Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{notificationStats.totalSent.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Daily Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{notificationStats.dailyAverage}</div>
                  <p className="text-xs text-muted-foreground">Notifications/day</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Open Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{notificationStats.openRate}%</div>
                  <p className="text-xs text-muted-foreground">↑ 5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">{notificationStats.engagement}%</div>
                  <p className="text-xs text-muted-foreground">Action taken rate</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your notification engagement over the past week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { day: 'Today', sent: 12, opened: 10, acted: 8 },
                    { day: 'Yesterday', sent: 15, opened: 12, acted: 9 },
                    { day: 'Wednesday', sent: 11, opened: 9, acted: 7 },
                    { day: 'Tuesday', sent: 13, opened: 11, acted: 10 },
                    { day: 'Monday', sent: 14, opened: 12, acted: 8 }
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{data.day}</span>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{data.sent} sent</span>
                        <span>{data.opened} opened</span>
                        <span>{data.acted} acted</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notification Performance by Type */}
            <Card>
              <CardHeader>
                <CardTitle>Performance by Type</CardTitle>
                <CardDescription>
                  How different notification types perform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Habit Reminders', icon: <Bell className="w-4 h-4" />, rate: 89 },
                    { type: 'Achievements', icon: <Trophy className="w-4 h-4" />, rate: 95 },
                    { type: 'Motivation', icon: <Heart className="w-4 h-4" />, rate: 72 },
                    { type: 'Reports', icon: <TrendingUp className="w-4 h-4" />, rate: 68 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.icon}
                          <span className="text-sm">{item.type}</span>
                        </div>
                        <span className="text-sm font-medium">{item.rate}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.rate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}