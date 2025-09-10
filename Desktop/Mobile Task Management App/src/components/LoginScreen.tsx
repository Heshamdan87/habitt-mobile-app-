import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Smartphone, CheckCircle, Target } from 'lucide-react';
import type { User } from './HabitApp';

interface LoginScreenProps {
  onLogin: (user: User) => void;
  onNavigateToSignup: () => void;
  isHabitApp?: boolean;
}

export function LoginScreen({ onLogin, onNavigateToSignup, isHabitApp = false }: LoginScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const appName = isHabitApp ? 'Habitt' : 'TaskFlow';
  const appTagline = isHabitApp ? 'Track your habits daily' : 'Organize your tasks, boost your productivity';
  const AppIcon = isHabitApp ? Target : CheckCircle;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo login - accept any valid email/password combination
    if (formData.email && formData.password.length >= 6) {
      const user: User = {
        id: 'demo-user-' + Date.now(),
        name: formData.email.split('@')[0],
        email: formData.email,
        ...(isHabitApp && {
          username: formData.email.split('@')[0],
          age: 25,
          country: 'United States'
        }),
        createdAt: new Date().toISOString()
      };

      if (rememberMe) {
        localStorage.setItem(`${isHabitApp ? 'habitt' : 'taskflow'}-remember`, 'true');
      }

      onLogin(user);
    } else {
      setErrors({ general: 'Invalid email or password. Please try again.' });
    }

    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleDemoLogin = () => {
    const demoUser: User = {
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@example.com',
      ...(isHabitApp && {
        username: 'demouser',
        age: 25,
        country: 'United States'
      }),
      createdAt: '2025-01-01T00:00:00.000Z'
    };
    onLogin(demoUser);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* App Logo and Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center">
            <AppIcon className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl text-primary">{appName}</h1>
          <p className="text-muted-foreground">
            {appTagline}
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border"
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Button variant="link" className="px-0 text-sm">
                  Forgot password?
                </Button>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={handleDemoLogin}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Try Demo Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="px-0 text-sm"
              onClick={onNavigateToSignup}
            >
              Sign up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}