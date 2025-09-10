# 📱 Habitt - Mobile Habit Tracker

> **A comprehensive React TypeScript application for tracking and building better habits with analytics, streaks, and beautiful mobile-first design.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-V4-38B2AC.svg)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/Live-Demo-success.svg)](https://habitt-mobile-app.netlify.app/)

## 🌟 **Features**

### 📊 **Core Functionality**
- ✅ **Daily Habit Tracking** - Track multiple habits with customizable goals
- 📈 **Progress Analytics** - Comprehensive charts and statistics
- 🔥 **Streak Calculation** - Monitor and celebrate habit streaks
- 🎯 **Goal Setting** - Set and track daily, weekly, or custom targets
- 📱 **Mobile-First Design** - Optimized for mobile devices

### 🎨 **User Experience**
- 🌙 **Dark/Light Theme** - Beautiful theme switching with smooth transitions
- 📊 **Visual Analytics** - Charts, graphs, and progress indicators
- 🔔 **Smart Notifications** - Customizable reminders and alerts
- 💾 **Local Storage** - Data persistence without backend dependency
- ⚡ **Real-time Updates** - Instant UI updates and synchronization

### 🔧 **Technical Features**
- 🚀 **React 18** - Latest React with concurrent features
- 📘 **TypeScript** - Full type safety and developer experience
- 🎨 **Tailwind CSS V4** - Modern utility-first styling
- 📱 **Responsive Design** - Works on all device sizes
- 🧪 **Comprehensive Testing** - Unit and integration tests with Vitest
- 🔄 **API Integration** - External API connectivity demonstrations

## 🚀 **Quick Start**

### **Prerequisites**
```bash
node >= 18.0.0
npm >= 9.0.0
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/Heshamdan87/habitt-mobile-app.git
cd habitt-mobile-app

# Install dependencies
npm install

# Start development server
npm run dev
```

**🌐 Open [http://localhost:11000](http://localhost:11000)** to view the app in your browser.

## 📱 **Screenshots**

### **Desktop View**
![Habitt Desktop](./docs/screenshots/desktop-view.png)

### **Mobile View**
![Habitt Mobile](./docs/screenshots/mobile-view.png)

### **Dark Theme**
![Habitt Dark Theme](./docs/screenshots/dark-theme.png)

## 🛠 **Available Scripts**

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 11000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run tests |
| `npm run test:ui` | Run tests with UI |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |

## 📋 **Project Structure**

```
habitt-mobile-app/
├── 📁 components/              # React components
│   ├── 📁 ui/                 # Reusable UI components (shadcn/ui)
│   ├── 📁 charts/             # Chart components
│   ├── 📁 utils/              # Utility functions
│   ├── HabitApp.tsx           # Main application component
│   ├── HabitHomepage.tsx      # Dashboard/homepage
│   ├── HabitConfigureScreen.tsx # Habit management
│   ├── HabitDetailScreen.tsx  # Individual habit analytics
│   ├── SettingsScreen.tsx     # App settings
│   └── ...                    # Other components
├── 📁 styles/                 # Global styles
│   └── globals.css            # Tailwind CSS + custom styles
├── 📁 src/test/               # Test files
├── App.tsx                    # Root component
├── main.tsx                   # Application entry point
└── 📄 Configuration files
```

## 🎯 **Key Components**

### **🏠 Core Screens**
- **HabitHomepage** - Main dashboard with today's habits
- **HabitConfigureScreen** - Add, edit, and manage habits
- **HabitDetailScreen** - Detailed analytics for individual habits
- **HabitReportsScreen** - Comprehensive progress reports
- **SettingsScreen** - App configuration and preferences

### **🔧 Utility Components**
- **HabitNavigation** - Bottom tab navigation
- **API Integration** - External service connections
- **Theme Management** - Dark/light mode switching
- **Data Persistence** - Local storage management

## 📊 **Analytics Features**

### **📈 Progress Tracking**
- Daily completion rates
- Weekly and monthly summaries
- Streak calculations and records
- Goal achievement percentages

### **📊 Visual Analytics**
- Interactive charts with Recharts
- Progress bars and completion indicators
- Trend analysis and insights
- Calendar heatmaps

## 🎨 **Design System**

### **🌈 Theme Support**
- **Light Theme** - Clean, minimalist design
- **Dark Theme** - Easy on the eyes for night usage
- **Smooth Transitions** - Animated theme switching
- **Consistent Colors** - Cohesive color palette

### **📱 Responsive Design**
- **Mobile-First** - Optimized for mobile devices
- **Tablet Compatible** - Scales beautifully on tablets
- **Desktop Ready** - Full desktop support
- **Touch-Friendly** - Large tap targets and gestures

## 🚀 **Deployment**

### **Netlify (Recommended)**
```bash
# Build the project
npm run build

# Deploy to Netlify
# Upload the 'dist' folder to Netlify
```

### **Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **GitHub Pages**
```bash
# Build with correct base path
npm run build

# Deploy to gh-pages branch
# Upload contents of 'dist' folder
```

## 🧪 **Testing**

### **Run Tests**
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run with UI
npm run test:ui
```

### **Test Coverage**
- Unit tests for all components
- Integration tests for user flows
- Utility function testing
- Mock data and API testing

## 🔧 **Technologies Used**

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.2.0 | UI framework |
| **TypeScript** | 5.2.2 | Type safety |
| **Tailwind CSS** | V4 | Styling |
| **Vite** | 5.1.0 | Build tool |
| **Vitest** | 1.3.0 | Testing |
| **Lucide React** | 0.344.0 | Icons |
| **Recharts** | 2.12.0 | Charts |
| **Sonner** | 2.0.3 | Notifications |

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 **Developer**

**Hesham Al Dandan**
- 📧 **Email:** heshamdan2014@gmail.com
- 📱 **Phone:** +49 157 73127109
- 📍 **Location:** Kassel, Germany
- 💼 **LinkedIn:** [linkedin.com/in/heshamdan87](https://linkedin.com/in/heshamdan87)
- 🐱 **GitHub:** [github.com/Heshamdan87](https://github.com/Heshamdan87)

## 🙏 **Acknowledgments**

- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Beautiful icon library
- **Recharts** - Composable chart library
- **React Community** - Amazing ecosystem and support

## 📈 **Project Stats**

- ⭐ **Stars:** ![GitHub stars](https://img.shields.io/github/stars/Heshamdan87/habitt-mobile-app)
- 🍴 **Forks:** ![GitHub forks](https://img.shields.io/github/forks/Heshamdan87/habitt-mobile-app)
- 🐛 **Issues:** ![GitHub issues](https://img.shields.io/github/issues/Heshamdan87/habitt-mobile-app)
- 📝 **License:** ![GitHub license](https://img.shields.io/github/license/Heshamdan87/habitt-mobile-app)

---

**⭐ Star this repository if you found it helpful!**

**🚀 [Live Demo](https://habitt-mobile-app.netlify.app/) | 📚 [Documentation](https://github.com/Heshamdan87/habitt-mobile-app/wiki) | 🐛 [Report Bug](https://github.com/Heshamdan87/habitt-mobile-app/issues) | ✨ [Request Feature](https://github.com/Heshamdan87/habitt-mobile-app/issues)**