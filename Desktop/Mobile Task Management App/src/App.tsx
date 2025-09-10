/**
 * HABITT - MOBILE HABIT TRACKER APPLICATION
 * 
 * Main Application Entry Point
 * 
 * This is the root component that serves as the entry point for the entire
 * Habitt mobile habit tracking application. It renders the main HabitApp
 * component which handles all the application logic and routing.
 * 
 * DEVELOPER INFORMATION:
 * Name: Hesham Al Dandan
 * Location: Kassel, Germany
 * Email: heshamdan2014@gmail.com
 * Phone: +49 157 73127109
 * 
 * PROJECT DETAILS:
 * - Built with React 18 and TypeScript
 * - Styled with Tailwind CSS v4
 * - Uses shadcn/ui component library
 * - Mobile-first responsive design
 * - Local storage for data persistence
 * 
 * FEATURES:
 * - User authentication (login/signup/demo)
 * - Daily habit tracking and completion
 * - Progress analytics and streak calculation
 * - Dark/light theme support
 * - Mobile-optimized interface
 * 
 * Created: 2025
 * Last Updated: January 2025 - Enhanced Performance & UX Optimizations
 */

import React, { Suspense } from 'react';
import HabitApp from './components/HabitApp';

// Loading component for better UX during app initialization
const AppLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading Habitt...</p>
    </div>
  </div>
);

/**
 * Main App Component
 * 
 * This is the root React component that initializes the entire application.
 * It simply renders the HabitApp component which contains all the
 * application logic, routing, and state management.
 * 
 * @returns {JSX.Element} The main application component
 */
export default function App(): JSX.Element {
  return (
    <div className="app-root" data-testid="app-root">
      {/* 
        Main Habit Tracking Application
        Enhanced with performance optimizations and better UX
        This component handles:
        - User authentication and sessions
        - Navigation between different screens
        - Global state management
        - Theme switching (dark/light mode)
        - Data persistence with localStorage
        - Progressive loading and error boundaries
      */}
      <Suspense fallback={<AppLoader />}>
        <HabitApp />
      </Suspense>
    </div>
  );
}

/**
 * SERVER CONFIGURATION:
 *    - Development server runs on port 11000
 *    - Access URL: http://localhost:11000
 *    - Configured in vite.config.ts and package.json
 * 
 * APPLICATION ARCHITECTURE NOTES:
 * 
 * 1. COMPONENT STRUCTURE:
 *    App.tsx (this file)
 *    └── HabitApp.tsx (main application logic)
 *        ├── LoginScreen.tsx (user authentication)
 *        ├── SignupScreen.tsx (user registration)
 *        ├── HabitHomepage.tsx (main dashboard)
 *        ├── HabitConfigureScreen.tsx (habit management)
 *        ├── HabitDetailScreen.tsx (individual habit analytics)
 *        ├── HabitReportsScreen.tsx (comprehensive reports)
 *        ├── ProfileScreen.tsx (user profile settings)
 *        ├── SettingsScreen.tsx (app preferences)
 *        ├── NotificationsScreen.tsx (notification settings)
 *        └── HabitNavigation.tsx (bottom tab navigation)
 * 
 * 2. STYLING APPROACH:
 *    - Tailwind CSS v4 for utility-first styling
 *    - CSS custom properties for theme variables
 *    - Mobile-first responsive design principles
 *    - Dark/light theme support with smooth transitions
 * 
 * 3. STATE MANAGEMENT:
 *    - React Context API for global state
 *    - localStorage for data persistence
 *    - Custom hooks for reusable logic
 * 
 * 4. DATA FLOW:
 *    - User authentication state managed globally
 *    - Habit data stored in localStorage
 *    - Real-time updates across all components
 *    - Optimistic UI updates for better UX
 */