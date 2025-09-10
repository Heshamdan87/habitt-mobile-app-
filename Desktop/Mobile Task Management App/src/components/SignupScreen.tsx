import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Eye, EyeOff, Target, Check, X } from 'lucide-react';
import type { User } from './HabitApp';

interface SignupScreenProps {
  onSignup: (user: User) => void;
  onNavigateToLogin: () => void;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export function SignupScreen({ onSignup, onNavigateToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const passwordRequirements: PasswordRequirement[] = [
    {
      text: 'At least 8 characters long',
      met: formData.password.length >= 8
    },
    {
      text: 'Contains at least one number',
      met: /\d/.test(formData.password)
    },
    {
      text: 'Contains at least one special character',
      met: /[!@#$%^&*(),.?\":{}|<>]/.test(formData.password)
    }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const unmetRequirements = passwordRequirements.filter(req => !req.met);
      if (unmetRequirements.length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create new user
    const newUser: User = {
      id: 'user-' + Date.now(),
      name: formData.username.trim(), // Use username as name for simplicity
      email: formData.email,
      username: formData.username.trim(),
      createdAt: new Date().toISOString()
    };

    onSignup(newUser);
    setIsLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        {/* App Logo and Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-primary rounded-2xl flex items-center justify-center">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl text-primary">Habitt</h1>
          <p className="text-muted-foreground">
            Create your account to start tracking habits
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Create account</CardTitle>
            <CardDescription className="text-center">
              Sign up to start building healthy habits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                  className={errors.username ? 'border-destructive' : ''}
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-destructive' : ''}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={errors.password ? 'border-destructive' : ''}
                    autoComplete="new-password"
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
                
                {/* Password Requirements */}
                {formData.password && (
                  <div className="space-y-2">
                    {passwordRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        {requirement.met ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <X className="w-3 h-3 text-muted-foreground" />
                        )}
                        <span className={`text-xs ${requirement.met ? 'text-green-600' : 'text-muted-foreground'}`}>
                          {requirement.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Sign Up Button */}
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Button
              variant="link"
              className="px-0 text-sm"
              onClick={onNavigateToLogin}
            >
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}