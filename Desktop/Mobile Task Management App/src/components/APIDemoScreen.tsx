import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Skeleton } from './ui/skeleton';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  ArrowLeft, 
  RefreshCw,
  Clock,
  User,
  Mail,
  Phone,
  Globe,
  Building,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Wifi,
  WifiOff
} from 'lucide-react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface APIResponse {
  users: User[];
  posts: Post[];
  lastFetched: string;
  status: 'loading' | 'success' | 'error';
}

interface APIDemoScreenProps {
  onBack: () => void;
}

export function APIDemoScreen({ onBack }: APIDemoScreenProps) {
  const [apiData, setApiData] = useState<APIResponse>({
    users: [],
    posts: [],
    lastFetched: '',
    status: 'loading'
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch data from multiple APIs
  const fetchAPIData = async () => {
    setApiData(prev => ({ ...prev, status: 'loading' }));
    
    try {
      toast.promise(
        Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        ]),
        {
          loading: 'Fetching data from APIs...',
          success: 'Data fetched successfully!',
          error: 'Failed to fetch data'
        }
      );

      const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      ]);

      if (!usersResponse.ok || !postsResponse.ok) {
        throw new Error('API request failed');
      }

      const users: User[] = await usersResponse.json();
      const posts: Post[] = await postsResponse.json();

      setApiData({
        users,
        posts,
        lastFetched: new Date().toLocaleString(),
        status: 'success'
      });

      // Auto-select first user
      if (users.length > 0) {
        setSelectedUser(users[0]);
      }

    } catch (error) {
      console.error('API fetch error:', error);
      setApiData(prev => ({
        ...prev,
        status: 'error'
      }));
      toast.error('Failed to fetch API data. Please try again.');
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAPIData();
  }, []);

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      <Skeleton className="h-32 w-full" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );

  const ErrorState = () => (
    <Alert className="border-destructive">
      <AlertCircle className="w-4 h-4" />
      <AlertDescription>
        Failed to fetch data from API. Please check your connection and try again.
      </AlertDescription>
    </Alert>
  );

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
            <h1 className="text-xl">API Data Demo</h1>
            <div className="flex items-center space-x-2">
              {isOnline ? (
                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Wifi className="w-3 h-3 mr-1" />
                  Online
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <WifiOff className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={fetchAPIData}
            disabled={apiData.status === 'loading' || !isOnline}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${apiData.status === 'loading' ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* API Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              API Connection Status
            </CardTitle>
            <CardDescription>
              Real-time data from JSONPlaceholder API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <div className="flex items-center space-x-2">
                  {apiData.status === 'success' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  {apiData.status === 'error' && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {apiData.status === 'loading' && <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />}
                  <Badge variant={
                    apiData.status === 'success' ? 'default' : 
                    apiData.status === 'error' ? 'destructive' : 'secondary'
                  }>
                    {apiData.status}
                  </Badge>
                </div>
              </div>
              
              {apiData.lastFetched && (
                <div className="flex items-center justify-between">
                  <span>Last Updated:</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {apiData.lastFetched}
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold">{apiData.users.length}</div>
                  <div className="text-sm text-muted-foreground">Users Fetched</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{apiData.posts.length}</div>
                  <div className="text-sm text-muted-foreground">Posts Fetched</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {apiData.status === 'loading' && (
          <Card>
            <CardHeader>
              <CardTitle>Loading API Data...</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadingSkeleton />
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {apiData.status === 'error' && (
          <Card>
            <CardHeader>
              <CardTitle>Connection Error</CardTitle>
            </CardHeader>
            <CardContent>
              <ErrorState />
            </CardContent>
          </Card>
        )}

        {/* Success State - Display Fetched Data */}
        {apiData.status === 'success' && (
          <>
            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Users ({apiData.users.length})
                </CardTitle>
                <CardDescription>
                  Click on a user to view detailed information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {apiData.users.map((user) => (
                      <div
                        key={user.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent/50 ${
                          selectedUser?.id === user.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedUser(user)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>
                          </div>
                          <Badge variant="outline">ID: {user.id}</Badge>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Selected User Details */}
            {selectedUser && (
              <Card>
                <CardHeader>
                  <CardTitle>User Details: {selectedUser.name}</CardTitle>
                  <CardDescription>
                    Detailed information fetched from API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {/* Contact Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium">Contact Information</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{selectedUser.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{selectedUser.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{selectedUser.website}</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Company Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium">Company</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>{selectedUser.company.name}</span>
                        </div>
                        <p className="text-muted-foreground italic">
                          "{selectedUser.company.catchPhrase}"
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Address Information */}
                    <div className="space-y-3">
                      <h5 className="font-medium">Address</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                          <span>
                            {selectedUser.address.street}, {selectedUser.address.suite}
                          </span>
                        </div>
                        <div className="text-muted-foreground ml-6">
                          {selectedUser.address.city}, {selectedUser.address.zipcode}
                        </div>
                        <div className="text-xs text-muted-foreground ml-6">
                          Coordinates: {selectedUser.address.geo.lat}, {selectedUser.address.geo.lng}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts ({apiData.posts.length})</CardTitle>
                <CardDescription>
                  Latest posts fetched from API
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {apiData.posts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">Post #{post.id}</Badge>
                          <Badge variant="secondary">
                            User {post.userId}
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-2 capitalize">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {post.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* API Stats */}
            <Card>
              <CardHeader>
                <CardTitle>API Response Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {JSON.stringify(apiData.users).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Users Data Size (bytes)
                    </div>
                  </div>
                  <div className="p-4 bg-accent/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {JSON.stringify(apiData.posts).length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Posts Data Size (bytes)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}