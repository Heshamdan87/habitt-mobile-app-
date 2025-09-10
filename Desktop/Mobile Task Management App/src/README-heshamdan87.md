# Habitt - Mobile Habit Tracker

![Habitt Logo](https://img.shields.io/badge/Habitt-Mobile%20Habit%20Tracker-6366F1?style=for-the-badge&logo=target)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=flat&logo=tailwindcss)
![Public](https://img.shields.io/badge/Repository-Public-brightgreen?style=flat&logo=github)

A comprehensive mobile-first habit tracking application built with React, TypeScript, and Tailwind CSS as part of the UVW Code Labs development project.

## 🔗 Repository Links

- **🌐 Repository**: [https://github.com/heshamdan87/habitt-mobile-app](https://github.com/heshamdan87/habitt-mobile-app)
- **📱 Live Demo**: *Coming Soon*
- **🎨 Figma Wireframes**: [Design Specifications](WIREFRAME_SPECIFICATIONS.md)
- **📖 User Stories**: [Complete Documentation](USER_STORIES.md)

## 🎯 Project Overview

Habitt is a modern, intuitive habit tracking application designed with mobile-first principles. Built by **@heshamdan87**, it helps users build positive routines through daily habit tracking, progress visualization, and detailed analytics.

### ✨ Core Features

#### 🔐 **User Authentication & Management**
- Secure login/signup with comprehensive form validation
- User profiles with customizable information (name, username, age, country)
- Demo account for immediate testing
- Password strength requirements and validation

#### 📱 **Comprehensive Habit Management**
- **Create Custom Habits** with categories and color coding
- **Daily Tracking Interface** with simple tap-to-complete
- **Multi-Target Habits** (e.g., "drink 8 glasses of water daily")
- **6 Habit Categories**: Health, Learning, Personal, Work, Creative, Social
- **Color-Coded Organization** with 6 distinct colors

#### 📊 **Advanced Progress Tracking & Analytics**
- **Real-time Progress Dashboard** with completion percentages
- **Streak Tracking** (current streak + longest streak calculation)
- **Calendar View** with visual completion history
- **Weekly/Monthly Reports** with detailed charts and insights
- **Performance Analytics** with habit-specific statistics
- **Goal Achievement Tracking** with milestone recognition

#### 🎨 **Premium User Experience**
- **Mobile-First Design** optimized for touch interfaces
- **Dark/Light Theme Support** with system preference detection
- **Responsive Layout** that works seamlessly across all devices
- **Bottom Tab Navigation** for thumb-friendly usage
- **Progressive Web App** capabilities for home screen installation

## 📱 Application Screenshots

| 🏠 Home Dashboard | 🎯 Habit Management | 📊 Progress Reports | 📅 Calendar View |
|:-----------------:|:-------------------:|:-------------------:|:-----------------:|
| ![Dashboard](https://via.placeholder.com/200x400/6366F1/FFFFFF?text=Daily+Progress+%26+Habits) | ![Management](https://via.placeholder.com/200x400/10B981/FFFFFF?text=Create+%26+Edit+Habits) | ![Reports](https://via.placeholder.com/200x400/F59E0B/FFFFFF?text=Analytics+%26+Charts) | ![Calendar](https://via.placeholder.com/200x400/8B5CF6/FFFFFF?text=Visual+History) |

## 🛠 Technology Stack

### **Frontend Framework**
- **⚛️ React 18** - Latest React with Hooks, Suspense, and Concurrent Features
- **📘 TypeScript** - Type-safe development with comprehensive interfaces
- **🎨 Tailwind CSS v4** - Utility-first CSS with custom design system

### **UI Components & Libraries**
- **🧩 shadcn/ui** - High-quality, accessible component library
- **🎯 Lucide React** - Beautiful, customizable SVG icons
- **📈 Recharts** - Responsive charts and data visualization
- **🔔 Sonner** - Modern toast notifications

### **Data & State Management**
- **💾 Local Storage** - Client-side data persistence
- **🔄 React Context** - Global state management
- **🪝 Custom Hooks** - Reusable logic encapsulation

### **Development & Build Tools**
- **⚡ Vite** - Lightning-fast build tool and dev server
- **🔍 ESLint** - Code linting and quality enforcement
- **✨ Prettier** - Consistent code formatting

## 🚀 Quick Start Guide

### **Prerequisites**
- **Node.js** 16.0 or higher ([Download](https://nodejs.org/))
- **npm** 8.0 or higher (or **yarn** 1.22+)
- **Git** for version control

### **Installation Steps**

1. **📥 Clone the repository**
```bash
git clone https://github.com/heshamdan87/habitt-mobile-app.git
cd habitt-mobile-app
```

2. **📦 Install dependencies**
```bash
npm install
# or if you prefer yarn
yarn install
```

3. **🚀 Start development server**
```bash
npm run dev
# or
yarn dev
```

4. **🌐 Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the app

### **🎭 Demo Account**
Quick testing without signup:
- Click **"Try Demo Account"** on login screen
- **Email**: `demo@habitt.com`
- **Password**: `demo123`

## 📁 Project Architecture

```
src/
├── 📄 App.tsx                     # Main application entry point
├── 📁 components/
│   ├── 🎯 HabitApp.tsx           # Core habit tracking application logic
│   ├── 🏠 HabitHomepage.tsx      # Dashboard with daily progress overview
│   ├── ⚙️  HabitConfigureScreen.tsx # Habit creation and management
│   ├── 📊 HabitDetailScreen.tsx  # Individual habit analytics and calendar
│   ├── 📈 HabitReportsScreen.tsx # Comprehensive analytics and insights
│   ├── 🧭 HabitNavigation.tsx    # Bottom tab navigation component
│   ├── 🔐 LoginScreen.tsx        # User authentication interface
│   ├── 📝 SignupScreen.tsx       # User registration with validation
│   ├── 👤 ProfileScreen.tsx      # User profile management
│   ├── ⚙️  SettingsScreen.tsx     # Application settings and preferences
│   ├── 🔔 NotificationsScreen.tsx # Notification preferences
│   └── 🧩 ui/                    # Reusable shadcn/ui components
│       ├── button.tsx, card.tsx, input.tsx
│       ├── progress.tsx, calendar.tsx
│       └── ... (30+ UI components)
├── 🎨 styles/
│   └── globals.css               # Tailwind v4 global styles & design tokens
├── 📊 charts/                    # Data visualization components
│   ├── CategoryChart.tsx
│   ├── DailyChart.tsx
│   └── PriorityChart.tsx
├── 📚 USER_STORIES.md            # Complete user stories documentation
├── 🎨 WIREFRAME_SPECIFICATIONS.md # Figma wireframe specifications
└── 🤝 CONTRIBUTING.md            # Development contribution guidelines
```

## 📚 Comprehensive Documentation

### **📖 User Stories & Requirements**
Complete user stories covering all application features:
- **[📋 User Stories Documentation](USER_STORIES.md)** - Detailed requirements and acceptance criteria

### **🎨 Design & Wireframes**
Professional wireframe specifications for Figma implementation:
- **[🎨 Wireframe Specifications](WIREFRAME_SPECIFICATIONS.md)** - Complete design blueprints

### **🤝 Contribution Guidelines**
Comprehensive guide for developers:
- **[🤝 Contributing Guide](CONTRIBUTING.md)** - Development standards and processes

## 🎨 Design System & Branding

### **🎨 Color Palette**
- **Primary Brand**: `#6366F1` (Indigo) - App branding and primary actions
- **Success States**: `#10B981` (Green) - Completed habits and positive feedback
- **Warning States**: `#F59E0B` (Amber) - Partial progress and attention needed
- **Error States**: `#EF4444` (Red) - Failed habits and error messages

### **🎯 Habit Color Coding System**
- 🔴 **Red** (`#EF4444`) - Health & Fitness habits
- 🟠 **Orange** (`#F97316`) - Productivity & Work habits  
- 🟡 **Yellow** (`#EAB308`) - Learning & Education habits
- 🟢 **Green** (`#22C55E`) - Environment & Lifestyle habits
- 🔵 **Blue** (`#3B82F6`) - Personal Development habits
- 🟣 **Purple** (`#A855F7`) - Creative & Artistic habits

### **📐 Typography & Spacing**
- **Headers**: 18-24px with medium weight for hierarchy
- **Body Text**: 14-16px with regular weight for readability  
- **UI Labels**: 14px with medium weight for emphasis
- **Spacing**: Consistent 8px, 16px, 24px, 32px scale

## 🎯 Feature Implementation Status

### **✅ Fully Implemented Features**
- [x] **🔐 Complete Authentication System** - Login/signup with validation
- [x] **🎯 Advanced Habit Management** - Create, edit, delete with categories
- [x] **📊 Real-time Progress Tracking** - Daily completion with visual indicators
- [x] **📈 Comprehensive Analytics** - Charts, streaks, and performance metrics
- [x] **📅 Calendar Integration** - Historical view with completion markers
- [x] **🌙 Theme System** - Dark/light modes with smooth transitions
- [x] **📱 Mobile-Optimized Design** - Touch-friendly responsive interface
- [x] **💾 Data Persistence** - Local storage with auto-save functionality
- [x] **🎨 Professional UI/UX** - shadcn/ui components with custom styling

### **🚀 Planned Enhancements**
- [ ] **☁️ Backend Integration**
  - [ ] User authentication API with JWT tokens
  - [ ] Cloud data synchronization across devices
  - [ ] Real-time multi-device sync capabilities
- [ ] **👥 Social Features**
  - [ ] Habit sharing and community challenges
  - [ ] Friend connections and accountability partners
  - [ ] Public leaderboards and achievements
- [ ] **🤖 AI-Powered Insights**
  - [ ] Predictive analytics for habit success
  - [ ] Personalized habit recommendations
  - [ ] Smart scheduling and optimal timing suggestions
- [ ] **📱 Native App Features**
  - [ ] Push notifications for habit reminders
  - [ ] Widget support for iOS and Android
  - [ ] Apple Health and Google Fit integration
- [ ] **📊 Advanced Analytics**
  - [ ] Custom report generation and export
  - [ ] Advanced statistical analysis
  - [ ] Habit correlation insights

## 🧪 Quality Assurance & Testing

### **✅ Manual Testing Coverage**
- [x] **🔐 Authentication Flows** - Login, signup, validation, demo account
- [x] **🎯 Habit Management** - Create, edit, delete, category assignment
- [x] **📊 Progress Tracking** - Daily completion, streak calculation, calendar view
- [x] **📱 Responsive Design** - Mobile, tablet, desktop compatibility
- [x] **🌙 Theme Switching** - Dark/light mode transitions
- [x] **💾 Data Persistence** - Local storage reliability after page reload

### **🔮 Future Testing Implementation**
- [ ] **Unit Testing** with Jest and React Testing Library
- [ ] **Integration Testing** for critical user workflows
- [ ] **End-to-End Testing** with Playwright
- [ ] **Accessibility Testing** with axe-core compliance
- [ ] **Performance Testing** and optimization

## 🤝 Contributing to Habitt

We welcome contributions from developers of all skill levels! 

### **🚀 Quick Contribution Guide**
1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💻 Code** your improvements following our guidelines
4. **✅ Test** thoroughly across different devices
5. **📝 Commit** with descriptive messages (`git commit -m 'feat: add streak animations'`)
6. **🚀 Push** to your branch (`git push origin feature/amazing-feature`)
7. **🔄 Create** a Pull Request

### **📋 Development Standards**
- **TypeScript** for all new code with proper typing
- **Mobile-first** responsive design approach
- **Accessibility** considerations (WCAG AA compliance)
- **Performance** optimization for mobile devices
- **Code Quality** with ESLint and Prettier

## 📊 Project Statistics

- **📊 Lines of Code**: 3,500+ (TypeScript/React)
- **🧩 React Components**: 15+ custom components
- **🎨 UI Components**: 30+ shadcn/ui components  
- **✨ Features**: 25+ implemented features
- **📚 Documentation**: Comprehensive guides and specifications
- **🎯 User Stories**: 40+ detailed requirements
- **📱 Screens**: 8 fully functional app screens

## 🏆 Technical Achievements

This project demonstrates advanced proficiency in:

- **⚛️ Modern React Development** - Hooks, Context API, TypeScript integration
- **📱 Mobile-First Design** - Touch-optimized responsive interfaces
- **🏗️ Component Architecture** - Reusable, maintainable code structure
- **🔄 State Management** - Complex application state handling
- **📊 Data Visualization** - Interactive charts and progress indicators
- **🎨 Design System** - Consistent, professional UI/UX implementation
- **📚 Technical Documentation** - Comprehensive project documentation

## 📄 License & Legal

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### **📋 Usage Rights**
- ✅ **Commercial Use** - Use in commercial projects
- ✅ **Modification** - Modify and customize as needed
- ✅ **Distribution** - Share and distribute freely
- ✅ **Private Use** - Use for personal projects

## 🙏 Acknowledgments & Credits

- **🎓 UVW Code Labs** - Project framework and educational guidance
- **🧩 shadcn/ui** - Beautiful, accessible component library
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **⚛️ React Community** - Inspiration and development best practices
- **🎨 Figma Community** - Design resources and wireframe inspiration
- **📊 Recharts** - Powerful data visualization library

## 📞 Contact & Professional Links

**👨‍💻 Developer**: Hesham (heshamdan87)
- **📧 Email**: [Contact via GitHub](https://github.com/heshamdan87)
- **💼 GitHub**: [@heshamdan87](https://github.com/heshamdan87)
- **🔗 LinkedIn**: *[Add your LinkedIn profile]*
- **🌐 Portfolio**: *[Add your portfolio website]*

### **🔗 Project Links**
- **📱 Live Demo**: *Coming Soon - Deployment in progress*
- **📂 Source Code**: [https://github.com/heshamdan87/habitt-mobile-app](https://github.com/heshamdan87/habitt-mobile-app)
- **🎨 Design System**: [Figma Wireframes & Specifications](WIREFRAME_SPECIFICATIONS.md)
- **📋 Requirements**: [Complete User Stories](USER_STORIES.md)
- **🐛 Report Issues**: [GitHub Issues](https://github.com/heshamdan87/habitt-mobile-app/issues)
- **💡 Feature Requests**: [GitHub Discussions](https://github.com/heshamdan87/habitt-mobile-app/discussions)

---

<div align="center">

### **🎯 Built with ❤️ for Better Habits and Healthier Routines**

![Habit Success](https://img.shields.io/badge/Habit%20Tracking-Made%20Simple-success?style=for-the-badge&logo=target)
![Mobile First](https://img.shields.io/badge/Mobile-First%20Design-blue?style=for-the-badge&logo=smartphone)
![Open Source](https://img.shields.io/badge/Open-Source-orange?style=for-the-badge&logo=github)

**⭐ Star this repository if it helped you build better habits!**

</div>

---

## 🚀 Ready to Start Your Habit Journey?

1. **📥 Clone** this repository
2. **📦 Install** dependencies with `npm install`
3. **🚀 Run** with `npm run dev`
4. **🎯 Create** your first habit and start building positive routines!

*Made with passion for helping people develop better habits and improve their daily lives.*
```