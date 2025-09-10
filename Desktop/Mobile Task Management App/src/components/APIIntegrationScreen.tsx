import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  Calendar,
  Activity,
  Smartphone,
  Cloud,
  Wifi,
  WifiOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Settings2,
  Clock,
  Shield,
  Key,
  Link,
  Unlink,
  RefreshCw,
  Bell,
  Database,
  Download,
  Upload,
  Zap,
  Globe,
  Webhook,
  Server,
  BarChart3,
  FileText,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  TestTube
} from 'lucide-react';
import type { Settings } from './HabitApp';

interface APIIntegrationScreenProps {
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  onBack: () => void;
}

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  enabled: boolean;
  secret?: string;
  lastTriggered?: string;
}

interface DataExportConfig {
  format: 'json' | 'csv' | 'xml';
  frequency: 'daily' | 'weekly' | 'monthly';
  includePersonalData: boolean;
  destinations: string[];
}

// Enhanced API integration data with more services
const mockIntegrations = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync habits with calendar events and reminders',
    icon: <Calendar className="w-6 h-6" />,
    connected: true,
    lastSync: '2 minutes ago',
    features: ['Event creation', 'Reminders', 'Smart scheduling'],
    status: 'active',
    permissions: ['Read calendar', 'Create events', 'Send notifications'],
    dataUsage: '2.1 MB',
    apiCalls: 1250,
    uptime: 99.9
  },
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Import health and fitness data from Apple Health',
    icon: <Activity className="w-6 h-6" />,
    connected: true,
    lastSync: '1 hour ago',
    features: ['Steps tracking', 'Heart rate', 'Workout data'],
    status: 'active',
    permissions: ['Read health data', 'Write workout data'],
    dataUsage: '15.7 MB',
    apiCalls: 3400,
    uptime: 98.5
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Connect with your Fitbit device for activity tracking',
    icon: <Activity className="w-6 h-6" />,
    connected: false,
    lastSync: 'Never',
    features: ['Activity tracking', 'Sleep data', 'Heart rate monitoring'],
    status: 'disconnected',
    permissions: ['Read activity data', 'Read sleep data', 'Read profile'],
    dataUsage: '0 MB',
    apiCalls: 0,
    uptime: 0
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Export habits and progress to your Notion workspace',
    icon: <Database className="w-6 h-6" />,
    connected: true,
    lastSync: '5 minutes ago',
    features: ['Database sync', 'Progress reports', 'Custom templates'],
    status: 'syncing',
    permissions: ['Read pages', 'Update databases', 'Create content'],
    dataUsage: '8.3 MB',
    apiCalls: 890,
    uptime: 97.2
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get habit reminders and progress updates in Slack',
    icon: <Bell className="w-6 h-6" />,
    connected: false,
    lastSync: 'Never',
    features: ['Daily reminders', 'Progress notifications', 'Team sharing'],
    status: 'disconnected',
    permissions: ['Send messages', 'Read user profile', 'Post to channels'],
    dataUsage: '0 MB',
    apiCalls: 0,
    uptime: 0
  },
  {
    id: 'weather-api',
    name: 'Weather API',
    description: 'Adapt outdoor habits based on weather conditions',
    icon: <Cloud className="w-6 h-6" />,
    connected: true,
    lastSync: '30 minutes ago',
    features: ['Weather alerts', 'Activity suggestions', 'Location-based reminders'],
    status: 'active',
    permissions: ['Access location', 'Weather data'],
    dataUsage: '1.8 MB',
    apiCalls: 567,
    uptime: 99.7
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automate workflows with 5000+ apps',
    icon: <Zap className="w-6 h-6" />,
    connected: true,
    lastSync: '10 minutes ago',
    features: ['Workflow automation', 'Multi-app integration', 'Custom triggers'],
    status: 'active',
    permissions: ['Create zaps', 'Read data', 'Execute workflows'],
    dataUsage: '3.2 MB',
    apiCalls: 1100,
    uptime: 98.8
  },
  {
    id: 'microsoft-365',
    name: 'Microsoft 365',
    description: 'Integrate with Office apps and OneDrive',
    icon: <Globe className="w-6 h-6" />,
    connected: false,
    lastSync: 'Never',
    features: ['Calendar sync', 'File storage', 'Teams integration'],
    status: 'disconnected',
    permissions: ['Read calendar', 'Access files', 'Send messages'],
    dataUsage: '0 MB',
    apiCalls: 0,
    uptime: 0
  }
];

export function APIIntegrationScreen({ settings, onUpdateSettings, onBack }: APIIntegrationScreenProps) {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [activeTab, setActiveTab] = useState('integrations');
  const [syncSettings, setSyncSettings] = useState({
    autoSync: true,
    syncFrequency: '15',
    syncOnWifi: true,
    backgroundSync: false,
    offlineMode: true,
    retryAttempts: 3,
    timeout: 30
  });
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Habit Completed',
      url: 'https://api.example.com/webhooks/habit-completed',
      events: ['habit.completed', 'habit.streak'],
      enabled: true,
      secret: 'whsec_***hidden***',
      lastTriggered: '2 hours ago'
    }
  ]);
  const [dataExportConfig, setDataExportConfig] = useState<DataExportConfig>({
    format: 'json',
    frequency: 'weekly',
    includePersonalData: false,
    destinations: ['email']
  });
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'disconnected': return <XCircle className="w-4 h-4 text-gray-400" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>;
      case 'syncing': return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Syncing</Badge>;
      case 'error': return <Badge variant="destructive">Error</Badge>;
      case 'disconnected': return <Badge variant="secondary">Disconnected</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleConnect = async (integrationId: string) => {
    setIsConnecting(integrationId);
    const integration = integrations.find(i => i.id === integrationId);
    toast.success(`Connecting to ${integration?.name}...`);
    
    setTimeout(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, connected: true, status: 'active', lastSync: 'Just now' }
            : integration
        )
      );
      setIsConnecting(null);
      toast.success(`${integration?.name} connected successfully!`);
    }, 2000);
  };

  const handleDisconnect = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, connected: false, status: 'disconnected', lastSync: 'Never' }
          : integration
      )
    );
    toast.success(`${integration?.name} disconnected successfully`);
  };

  const handleSyncNow = (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, status: 'syncing', lastSync: 'Syncing...' }
          : integration
      )
    );
    
    setTimeout(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { ...integration, status: 'active', lastSync: 'Just now' }
            : integration
        )
      );
    }, 3000);
  };

  const handleTestWebhook = async (webhookId: string) => {
    const webhook = webhooks.find(w => w.id === webhookId);
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: `Testing webhook: ${webhook?.name}`,
        success: 'Webhook test successful!',
        error: 'Webhook test failed'
      }
    );
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const totalDataUsage = integrations.reduce((sum, i) => sum + parseFloat(i.dataUsage?.replace(' MB', '') || '0'), 0);
  const totalApiCalls = integrations.reduce((sum, i) => sum + (i.apiCalls || 0), 0);

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
            <h1 className="text-xl">API Integrations</h1>
            <Badge variant="outline">{connectedCount} connected</Badge>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const connectedIntegrations = integrations.filter(i => i.connected);
              if (connectedIntegrations.length > 0) {
                connectedIntegrations.forEach(integration => {
                  handleSyncNow(integration.id);
                });
                toast.success(`Syncing ${connectedIntegrations.length} connected services...`);
              } else {
                toast.info('No connected services to sync');
              }
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync All
          </Button>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integrations">Services</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6 mt-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-medium">{connectedCount}</div>
                    <div className="text-sm text-muted-foreground">Connected</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-medium">{totalDataUsage.toFixed(1)}MB</div>
                    <div className="text-sm text-muted-foreground">Data Used</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-medium">{totalApiCalls.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">API Calls</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sync Status Alert */}
            {syncSettings.autoSync && (
              <Alert>
                <Wifi className="w-4 h-4" />
                <AlertDescription>
                  Auto-sync is enabled. Your data will be synchronized every {syncSettings.syncFrequency} minutes.
                </AlertDescription>
              </Alert>
            )}

            {/* Sync Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Sync Settings
                </CardTitle>
                <CardDescription>
                  Control how and when your data syncs with external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto Sync</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync data with connected services
                    </p>
                  </div>
                  <Switch
                    checked={syncSettings.autoSync}
                    onCheckedChange={(checked) => 
                      setSyncSettings(prev => ({ ...prev, autoSync: checked }))
                    }
                  />
                </div>

                {syncSettings.autoSync && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Sync Frequency</Label>
                        <Select
                          value={syncSettings.syncFrequency}
                          onValueChange={(value) => 
                            setSyncSettings(prev => ({ ...prev, syncFrequency: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 minutes</SelectItem>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Retry Attempts</Label>
                        <Select
                          value={syncSettings.retryAttempts.toString()}
                          onValueChange={(value) => 
                            setSyncSettings(prev => ({ ...prev, retryAttempts: parseInt(value) }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 attempt</SelectItem>
                            <SelectItem value="3">3 attempts</SelectItem>
                            <SelectItem value="5">5 attempts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label className="flex items-center">
                            <Wifi className="w-4 h-4 mr-2" />
                            WiFi Only Sync
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Only sync when connected to WiFi
                          </p>
                        </div>
                        <Switch
                          checked={syncSettings.syncOnWifi}
                          onCheckedChange={(checked) => 
                            setSyncSettings(prev => ({ ...prev, syncOnWifi: checked }))
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <Label>Background Sync</Label>
                          <p className="text-sm text-muted-foreground">
                            Continue syncing when app is in background
                          </p>
                        </div>
                        <Switch
                          checked={syncSettings.backgroundSync}
                          onCheckedChange={(checked) => 
                            setSyncSettings(prev => ({ ...prev, backgroundSync: checked }))
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Available Integrations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Link className="w-5 h-5 mr-2" />
                  Available Integrations
                </CardTitle>
                <CardDescription>
                  Connect with external services to enhance your habit tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                          {integration.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{integration.name}</h3>
                            {getStatusIcon(integration.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {integration.description}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            {getStatusBadge(integration.status)}
                            {integration.connected && (
                              <>
                                <span className="text-muted-foreground">
                                  Last sync: {integration.lastSync}
                                </span>
                                <span className="text-muted-foreground">
                                  {integration.dataUsage}
                                </span>
                                <span className="text-muted-foreground">
                                  {integration.uptime}% uptime
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        {integration.connected ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSyncNow(integration.id)}
                              disabled={integration.status === 'syncing'}
                            >
                              {integration.status === 'syncing' ? (
                                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                              ) : (
                                <RefreshCw className="w-4 h-4 mr-1" />
                              )}
                              Sync
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => setSelectedIntegration(integration)}
                                >
                                  <Settings2 className="w-4 h-4 mr-1" />
                                  Settings
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-md">
                                <DialogHeader>
                                  <DialogTitle className="flex items-center">
                                    {integration.icon}
                                    <span className="ml-2">{integration.name} Settings</span>
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Connection Health</Label>
                                    <div className="flex items-center space-x-2">
                                      <Progress value={integration.uptime} className="flex-1" />
                                      <span className="text-sm">{integration.uptime}%</span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <Label>Data Usage</Label>
                                      <p className="text-muted-foreground">{integration.dataUsage}</p>
                                    </div>
                                    <div>
                                      <Label>API Calls</Label>
                                      <p className="text-muted-foreground">{integration.apiCalls?.toLocaleString()}</p>
                                    </div>
                                  </div>
                                  <Separator />
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleDisconnect(integration.id)}
                                    className="w-full"
                                  >
                                    <Unlink className="w-4 h-4 mr-2" />
                                    Disconnect
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </>
                        ) : (
                          <Button
                            onClick={() => handleConnect(integration.id)}
                            disabled={isConnecting === integration.id}
                            size="sm"
                          >
                            {isConnecting === integration.id ? (
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Link className="w-4 h-4 mr-2" />
                            )}
                            Connect
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Webhook className="w-5 h-5 mr-2" />
                    Webhooks
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Webhook
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Webhook</DialogTitle>
                        <DialogDescription>
                          Configure a webhook to receive real-time notifications
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Name</Label>
                          <Input 
                            value={newWebhook.name}
                            onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Webhook name"
                          />
                        </div>
                        <div>
                          <Label>URL</Label>
                          <Input 
                            value={newWebhook.url}
                            onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                            placeholder="https://api.example.com/webhook"
                          />
                        </div>
                        <Button 
                          onClick={() => {
                            if (newWebhook.name && newWebhook.url) {
                              setWebhooks(prev => [...prev, {
                                id: Date.now().toString(),
                                ...newWebhook,
                                events: ['habit.completed'],
                                enabled: true
                              }]);
                              setNewWebhook({ name: '', url: '', events: [] });
                              toast.success('Webhook added successfully');
                            }
                          }}
                          className="w-full"
                        >
                          Add Webhook
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
                <CardDescription>
                  Real-time notifications sent to your endpoints
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {webhooks.map((webhook) => (
                    <div key={webhook.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{webhook.name}</h4>
                          <p className="text-sm text-muted-foreground">{webhook.url}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch checked={webhook.enabled} />
                          <Button variant="outline" size="sm" onClick={() => handleTestWebhook(webhook.id)}>
                            <TestTube className="w-4 h-4 mr-1" />
                            Test
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {webhook.events.map((event) => (
                          <Badge key={event} variant="outline" className="text-xs">
                            {event}
                          </Badge>
                        ))}
                      </div>
                      {webhook.lastTriggered && (
                        <p className="text-xs text-muted-foreground">
                          Last triggered: {webhook.lastTriggered}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="w-5 h-5 mr-2" />
                  Data Export
                </CardTitle>
                <CardDescription>
                  Configure automated data exports to external systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Export Format</Label>
                    <Select value={dataExportConfig.format} onValueChange={(value: any) => setDataExportConfig(prev => ({ ...prev, format: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="xml">XML</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Frequency</Label>
                    <Select value={dataExportConfig.frequency} onValueChange={(value: any) => setDataExportConfig(prev => ({ ...prev, frequency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Include Personal Data</Label>
                    <p className="text-sm text-muted-foreground">Export personal information along with habit data</p>
                  </div>
                  <Switch
                    checked={dataExportConfig.includePersonalData}
                    onCheckedChange={(checked) => setDataExportConfig(prev => ({ ...prev, includePersonalData: checked }))}
                  />
                </div>

                <Separator />
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Schedule Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">API Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">98.7%</div>
                  <p className="text-xs text-muted-foreground">Average uptime</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Data Sync</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-medium">2.1s</div>
                  <p className="text-xs text-muted-foreground">Average sync time</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Integration Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.filter(i => i.connected).map((integration) => (
                    <div key={integration.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{integration.name}</span>
                        <span>{integration.apiCalls} calls</span>
                      </div>
                      <Progress value={(integration.apiCalls || 0) / 50} className="h-2" />
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