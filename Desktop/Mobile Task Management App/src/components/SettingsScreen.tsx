import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Save, 
  Download,
  Upload,
  Trash2,
  Shield,
  Smartphone,
  Volume2,
  Clock,
  Database,
  Link,
  Palette,
  Accessibility,
  Zap,
  HardDrive,
  Wifi,
  Battery,
  Monitor,
  RefreshCw,
  Settings2,
  User,
  Lock,
  Eye,
  Fingerprint,
  QrCode,
  Archive,
  Calendar,
  MapPin,
  Globe2
} from 'lucide-react';
import type { Settings } from './HabitApp';

interface SettingsScreenProps {
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  onBack: () => void;
  onNavigateToAPIIntegration?: () => void;
  onNavigateToAPIDemo?: () => void;
}

interface AppData {
  habits: number;
  completions: number;
  analytics: number;
  size: string;
}

export function SettingsScreen({ settings, onUpdateSettings, onBack, onNavigateToAPIIntegration, onNavigateToAPIDemo }: SettingsScreenProps) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('general');
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isClearDataDialogOpen, setIsClearDataDialogOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    biometricAuth: false,
    autoLock: true,
    lockTimeout: 300,
    requireAuthForExport: true,
    twoFactorAuth: false,
    deviceTrust: true
  });
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    voiceOver: false,
    hapticFeedback: true,
    screenReader: false
  });
  const [performanceSettings, setPerformanceSettings] = useState({
    animationsEnabled: true,
    backgroundRefresh: true,
    cacheSize: 50,
    dataSaver: false,
    qualityMode: 'high'
  });

  const updateLocalSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setHasUnsavedChanges(false);
    toast.success('Settings saved successfully');
  };

  const handleReset = () => {
    setLocalSettings(settings);
    setHasUnsavedChanges(false);
    toast.info('Changes reset');
  };

  const getAppData = (): AppData => {
    const habits = JSON.parse(localStorage.getItem('habitt-habits') || '[]').length;
    const completions = JSON.parse(localStorage.getItem('habitt-completions') || '[]').length;
    const analytics = Math.floor(Math.random() * 100);
    const size = ((habits * 0.5) + (completions * 0.1) + 2.5).toFixed(1) + ' MB';
    
    return { habits, completions, analytics, size };
  };

  const appData = getAppData();

  const handleExportData = () => {
    const data = {
      settings: localSettings,
      habits: JSON.parse(localStorage.getItem('habitt-habits') || '[]'),
      completions: JSON.parse(localStorage.getItem('habitt-completions') || '[]'),
      user: JSON.parse(localStorage.getItem('habitt-user') || '{}'),
      exportDate: new Date().toISOString(),
      version: '1.0.0'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `habitt-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsExportDialogOpen(false);
    toast.success('Data exported successfully');
  };

  const handleClearData = () => {
    localStorage.removeItem('habitt-habits');
    localStorage.removeItem('habitt-completions');
    localStorage.removeItem('habitt-user');
    localStorage.removeItem('habitt-settings');
    setIsClearDataDialogOpen(false);
    toast.success('All data cleared');
    setTimeout(() => window.location.reload(), 1000);
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
            <h1 className="text-xl">Settings</h1>
          </div>
          {hasUnsavedChanges && (
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        {hasUnsavedChanges && (
          <Alert className="mb-6">
            <Save className="w-4 h-4" />
            <AlertDescription>
              You have unsaved changes. Don't forget to save your settings.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6 mt-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of the app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Theme</Label>
                    <p className="text-sm text-muted-foreground">
                      Choose between light and dark theme
                    </p>
                  </div>
                  <Select
                    value={localSettings.theme}
                    onValueChange={(value: 'light' | 'dark') => updateLocalSetting('theme', value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">
                        <div className="flex items-center">
                          <Sun className="w-4 h-4 mr-2" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center">
                          <Moon className="w-4 h-4 mr-2" />
                          Dark
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>Display Preferences</Label>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">High contrast mode</span>
                      <Switch
                        checked={accessibilitySettings.highContrast}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings(prev => ({ ...prev, highContrast: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reduce motion</span>
                      <Switch
                        checked={accessibilitySettings.reduceMotion}
                        onCheckedChange={(checked) => 
                          setAccessibilitySettings(prev => ({ ...prev, reduceMotion: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Animations</span>
                      <Switch
                        checked={performanceSettings.animationsEnabled}
                        onCheckedChange={(checked) => 
                          setPerformanceSettings(prev => ({ ...prev, animationsEnabled: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Control when and how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications for habit reminders
                    </p>
                  </div>
                  <Switch
                    checked={localSettings.notifications}
                    onCheckedChange={(checked) => updateLocalSetting('notifications', checked)}
                  />
                </div>

                {localSettings.notifications && (
                  <>
                    <Separator />
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

                    <div className="space-y-3">
                      <Label className="flex items-center">
                        <Volume2 className="w-4 h-4 mr-2" />
                        Notification Types
                      </Label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Habit reminders</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Daily summary</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Streak achievements</span>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Weekly reports</span>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Motivational quotes</span>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe2 className="w-5 h-5 mr-2" />
                  Language & Region
                </CardTitle>
                <CardDescription>
                  Set your preferred language and regional settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={localSettings.language}
                      onValueChange={(value) => updateLocalSetting('language', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇺🇸 English</SelectItem>
                        <SelectItem value="es">🇪🇸 Español</SelectItem>
                        <SelectItem value="fr">🇫🇷 Français</SelectItem>
                        <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                        <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                        <SelectItem value="pt">🇵🇹 Português</SelectItem>
                        <SelectItem value="zh">🇨🇳 中文</SelectItem>
                        <SelectItem value="ja">🇯🇵 日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select defaultValue="mm/dd/yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12 Hour</SelectItem>
                        <SelectItem value="24h">24 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>First Day of Week</Label>
                    <Select defaultValue="sunday">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="w-5 h-5 mr-2" />
                  Integrations
                </CardTitle>
                <CardDescription>
                  Connect with external services and APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onNavigateToAPIIntegration}
                >
                  <Link className="w-4 h-4 mr-2" />
                  API Integrations
                  <Badge variant="secondary" className="ml-auto">4 connected</Badge>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onNavigateToAPIDemo}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  API Data Demo
                  <Badge variant="outline" className="ml-auto">Live Data</Badge>
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Calendar Sync
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Location Services
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6 mt-6">
            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security
                </CardTitle>
                <CardDescription>
                  Protect your data with advanced security features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Biometric Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition to unlock the app
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.biometricAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, biometricAuth: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Auto Lock
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically lock the app when inactive
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.autoLock}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, autoLock: checked }))
                    }
                  />
                </div>

                {securitySettings.autoLock && (
                  <div className="space-y-2 ml-6">
                    <Label>Lock Timeout</Label>
                    <Select
                      value={securitySettings.lockTimeout.toString()}
                      onValueChange={(value) => 
                        setSecuritySettings(prev => ({ ...prev, lockTimeout: parseInt(value) }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="900">15 minutes</SelectItem>
                        <SelectItem value="1800">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="flex items-center">
                      <QrCode className="w-4 h-4 mr-2" />
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, twoFactorAuth: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Require Auth for Export</Label>
                    <p className="text-sm text-muted-foreground">
                      Require authentication before exporting data
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.requireAuthForExport}
                    onCheckedChange={(checked) => 
                      setSecuritySettings(prev => ({ ...prev, requireAuthForExport: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Privacy Controls
                </CardTitle>
                <CardDescription>
                  Control how your data is collected and used
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Analytics & Crash Reports</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve the app by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Personalized Experience</Label>
                    <p className="text-sm text-muted-foreground">
                      Use your data to provide personalized recommendations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Location Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow location-based habit reminders and insights
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Terms of Service
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Data Processing Agreement
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Backup, import, and manage your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-medium">{appData.habits}</div>
                    <div className="text-xs text-muted-foreground">Habits</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium">{appData.completions}</div>
                    <div className="text-xs text-muted-foreground">Completions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium">{appData.size}</div>
                    <div className="text-xs text-muted-foreground">Storage</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Export Your Data</DialogTitle>
                        <DialogDescription>
                          Download a backup of all your habits, completions, settings, and user data.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert>
                          <Shield className="w-4 h-4" />
                          <AlertDescription>
                            Your exported data will include all personal information. Keep it secure.
                          </AlertDescription>
                        </Alert>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleExportData}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>

                  <Button variant="outline" className="w-full justify-start">
                    <Archive className="w-4 h-4 mr-2" />
                    Cloud Backup
                    <Badge variant="secondary" className="ml-auto">Pro</Badge>
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Danger Zone</p>
                  <Dialog open={isClearDataDialogOpen} onOpenChange={setIsClearDataDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Clear All Data</DialogTitle>
                        <DialogDescription>
                          This will permanently delete all your habits, completions, settings, and user data. This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert>
                          <Trash2 className="w-4 h-4" />
                          <AlertDescription>
                            Make sure to export your data first if you want to keep it.
                          </AlertDescription>
                        </Alert>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setIsClearDataDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={handleClearData}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Everything
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            {/* Performance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Performance
                </CardTitle>
                <CardDescription>
                  Optimize app performance and resource usage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Background Refresh</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the app to refresh content in the background
                    </p>
                  </div>
                  <Switch
                    checked={performanceSettings.backgroundRefresh}
                    onCheckedChange={(checked) => 
                      setPerformanceSettings(prev => ({ ...prev, backgroundRefresh: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Saver Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce data usage and improve battery life
                    </p>
                  </div>
                  <Switch
                    checked={performanceSettings.dataSaver}
                    onCheckedChange={(checked) => 
                      setPerformanceSettings(prev => ({ ...prev, dataSaver: checked }))
                    }
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Cache Size</Label>
                    <span className="text-sm text-muted-foreground">{performanceSettings.cacheSize} MB</span>
                  </div>
                  <Slider
                    value={[performanceSettings.cacheSize]}
                    onValueChange={([value]) => setPerformanceSettings(prev => ({ ...prev, cacheSize: value }))}
                    min={10}
                    max={200}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10 MB</span>
                    <span>200 MB</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quality Mode</Label>
                  <Select
                    value={performanceSettings.qualityMode}
                    onValueChange={(value) => setPerformanceSettings(prev => ({ ...prev, qualityMode: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (Better Performance)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Better Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Clear Cache
                </Button>
              </CardContent>
            </Card>

            {/* Accessibility Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Accessibility className="w-5 h-5 mr-2" />
                  Accessibility
                </CardTitle>
                <CardDescription>
                  Make the app more accessible for everyone
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={accessibilitySettings.fontSize}
                    onValueChange={(value) => setAccessibilitySettings(prev => ({ ...prev, fontSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Voice Over Support</Label>
                    <p className="text-sm text-muted-foreground">
                      Enhanced screen reader compatibility
                    </p>
                  </div>
                  <Switch
                    checked={accessibilitySettings.voiceOver}
                    onCheckedChange={(checked) => 
                      setAccessibilitySettings(prev => ({ ...prev, voiceOver: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Haptic Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Vibration feedback for interactions
                    </p>
                  </div>
                  <Switch
                    checked={accessibilitySettings.hapticFeedback}
                    onCheckedChange={(checked) => 
                      setAccessibilitySettings(prev => ({ ...prev, hapticFeedback: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Developer Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings2 className="w-5 h-5 mr-2" />
                  Developer Options
                </CardTitle>
                <CardDescription>
                  Advanced settings for debugging and development
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="w-4 h-4 mr-2" />
                  View App Logs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Monitor className="w-4 h-4 mr-2" />
                  Performance Monitor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Reset All Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6 mt-6">
            {/* App Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  App Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary rounded-2xl mx-auto flex items-center justify-center">
                    <span className="text-white text-xl">H</span>
                  </div>
                  <h3 className="font-medium">Habitt</h3>
                  <p className="text-sm text-muted-foreground">Mobile Habit Tracker</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Version</span>
                    <span className="text-sm text-muted-foreground">1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Build</span>
                    <span className="text-sm text-muted-foreground">2025.08.03</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Platform</span>
                    <span className="text-sm text-muted-foreground">Web</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Storage Used</span>
                    <span className="text-sm text-muted-foreground">{appData.size}</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check for Updates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    What's New
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Developer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Developer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm"><strong>Hesham Al Dandan</strong></p>
                  <p className="text-sm text-muted-foreground">Kassel, Germany</p>
                  <p className="text-sm text-muted-foreground">heshamdan2014@gmail.com</p>
                  <p className="text-sm text-muted-foreground">+49 157 73127109</p>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Rate the App
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Send Feedback
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Help Center
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  User Guide
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Report a Bug
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Feature Request
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}