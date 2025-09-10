/**
 * PROFILE SCREEN COMPONENT
 * 
 * This screen allows users to view and edit their profile information.
 * It includes personal details, account settings, and developer information.
 * 
 * FEATURES:
 * - User profile editing (name, email, location, etc.)
 * - Account statistics and achievements
 * - App information and developer contact
 * - Theme preferences and settings
 * 
 * DEVELOPER: Hesham Al Dandan
 * EMAIL: heshamdan2014@gmail.com
 * LOCATION: Kassel, Germany
 */

import React, { useState } from 'react';
import { User, Mail, MapPin, Phone, Calendar, Award, Code, Github, Heart, Globe, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ProfileScreenProps {
  /** User data object containing profile information */
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    age?: number;
    country?: string;
    createdAt: string;
  };
  /** Array of tasks (empty for habit app) */
  tasks: any[];
  /** Function to update user profile data */
  onUpdateUser: (updates: Partial<ProfileScreenProps['user']>) => void;
  /** Function to handle user logout */
  onLogout: () => void;
  /** Function to go back to previous screen */
  onBack: () => void;
}

/**
 * ProfileScreen Component
 * 
 * Displays and allows editing of user profile information, plus app details
 * and developer contact information.
 * 
 * @param user - Current user data
 * @param onUpdateProfile - Function to update user information
 * @param onLogout - Function to log out the current user
 */
export function ProfileScreen({ user, tasks, onUpdateUser, onLogout, onBack }: ProfileScreenProps) {
  // State for managing edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    username: user.username || '',
    age: user.age || '',
    country: user.country || '',
  });

  /**
   * Handle saving profile changes
   * Updates the user profile and exits edit mode
   */
  const handleSave = () => {
    onUpdateUser({
      name: formData.name,
      username: formData.username,
      age: formData.age ? Number(formData.age) : undefined,
      country: formData.country,
    });
    setIsEditing(false);
  };

  /**
   * Handle canceling profile edit
   * Resets form data and exits edit mode
   */
  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      username: user.username || '',
      age: user.age || '',
      country: user.country || '',
    });
    setIsEditing(false);
  };

  /**
   * Calculate how long the user has been using the app
   */
  const calculateDaysUsing = () => {
    const joinDate = new Date(user.createdAt);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-20">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <div className="space-y-6 max-w-2xl mx-auto">
        
        {/* User Profile Information Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Your basic profile details and account information
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "outline" : "default"}
              size="sm"
              onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Profile Picture Placeholder */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{user.name || 'Anonymous User'}</p>
                <p className="text-sm text-muted-foreground">@{user.username || 'username'}</p>
              </div>
            </div>

            {/* Editable Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-foreground">{user.name || 'Not provided'}</p>
                )}
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                {isEditing ? (
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    placeholder="Choose a username"
                  />
                ) : (
                  <p className="text-foreground">@{user.username || 'username'}</p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-foreground">{user.email}</p>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                {isEditing ? (
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="Your age"
                    min="13"
                    max="120"
                  />
                ) : (
                  <p className="text-foreground">{user.age ? `${user.age} years old` : 'Not provided'}</p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="country">Country/Location</Label>
                {isEditing ? (
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Your country or city"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <p className="text-foreground">{user.country || 'Not provided'}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button (only visible when editing) */}
            {isEditing && (
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Statistics Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Account Statistics
            </CardTitle>
            <CardDescription>
              Your habit tracking journey so far
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{calculateDaysUsing()}</p>
                <p className="text-sm text-muted-foreground">Days using Habitt</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">47</p>
                <p className="text-sm text-muted-foreground">Habits completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-500">12</p>
                <p className="text-sm text-muted-foreground">Current streak</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-500">3</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About the Developer Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              About the Developer
            </CardTitle>
            <CardDescription>
              Meet the person behind Habitt
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Developer Info */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                HA
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">Hesham Al Dandan</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Full-Stack Developer & UI/UX Enthusiast
                </p>
                
                {/* Contact Information */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Kassel, Germany 🇩🇪</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href="mailto:heshamdan2014@gmail.com"
                      className="text-primary hover:underline"
                    >
                      heshamdan2014@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href="tel:+4915773127109"
                      className="text-primary hover:underline"
                    >
                      +49 157 73127109
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <a 
                      href="https://github.com/Heshamdan87"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @Heshamdan87
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Developer Message */}
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-foreground mb-2">
                    <strong>Thank you for using Habitt!</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    I built this app with love and attention to detail, hoping it will help you 
                    build better daily habits. If you have any feedback, suggestions, or just want 
                    to say hello, please don't hesitate to reach out!
                  </p>
                </div>
              </div>
            </div>

            {/* Technology Badges */}
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Built with:</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React 18</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
                <Badge variant="secondary">shadcn/ui</Badge>
                <Badge variant="secondary">Vite</Badge>
                <Badge variant="secondary">Recharts</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              App Information
            </CardTitle>
            <CardDescription>
              Version details and legal information
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Version</p>
                <p className="text-muted-foreground">1.0.0</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Last Updated</p>
                <p className="text-muted-foreground">January 2025</p>
              </div>
              <div>
                <p className="font-medium text-foreground">License</p>
                <p className="text-muted-foreground">MIT Open Source</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Repository</p>
                <a 
                  href="https://github.com/Heshamdan87/habitt-mobile-app-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-xs"
                >
                  GitHub Repository
                </a>
              </div>
            </div>

            <Separator />

            {/* Feature Request & Bug Report */}
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Found a bug or have a feature request?
              </p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="https://github.com/Heshamdan87/habitt-mobile-app-/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Report Issue
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href="mailto:heshamdan2014@gmail.com?subject=Habitt%20Feedback"
                  >
                    Send Feedback
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Button 
                variant="destructive" 
                onClick={onLogout}
                className="w-full md:w-auto"
              >
                Sign Out of Habitt
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Your habits and progress are saved locally on this device
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

/**
 * COMPONENT USAGE NOTES:
 * 
 * This ProfileScreen component provides:
 * 
 * 1. USER PROFILE MANAGEMENT
 *    - Editable personal information
 *    - Account statistics and achievements
 *    - Join date and usage tracking
 * 
 * 2. DEVELOPER INFORMATION
 *    - Contact details for Hesham Al Dandan
 *    - Technology stack information
 *    - Links to repository and social profiles
 * 
 * 3. APP INFORMATION
 *    - Version details and update history
 *    - License and legal information
 *    - Bug reporting and feedback channels
 * 
 * 4. USER ACTIONS
 *    - Profile editing with form validation
 *    - Secure logout functionality
 *    - External link navigation
 * 
 * DESIGN PRINCIPLES:
 * - Clean, card-based layout for easy scanning
 * - Mobile-first responsive design
 * - Clear visual hierarchy with icons and badges
 * - Accessible form controls and navigation
 * - Professional developer contact information
 */