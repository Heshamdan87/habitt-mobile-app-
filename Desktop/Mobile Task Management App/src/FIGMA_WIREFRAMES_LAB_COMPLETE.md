# Figma Wireframes Lab - Habitt Mobile App Complete Guide

> **Complete wireframe specifications for all 8 lab exercises with exact Figma implementation instructions**

## 🎯 Lab Overview

**Estimated Time:** 60 minutes  
**Platform:** Figma (free version)  
**App:** Habitt Mobile Habit Tracker  
**Evidence Required:** 2 screenshots (figma-evidence1.png, figma-evidence2.png)  

## 📱 Project Setup in Figma

### **Step 1: Create New Project**
1. **Log in to Figma** and click "New File"
2. **Project Name:** "Habitt Mobile App Wireframes"
3. **Page Name:** "Main Wireframes"
4. **Canvas Setup:** Unlimited canvas for all frames

### **Step 2: Mobile Frame Template**
```
Frame Specifications:
- Name: iPhone_13_Pro_Template
- Width: 375px
- Height: 812px
- Background: #FFFFFF
- Corner Radius: 0px
- Layout: None (manual positioning)
```

### **Step 3: Design Tokens Setup**
Create these as Figma variables or consistent usage:
```css
Primary: #030213
Secondary: #F3F3F5  
Background: #FFFFFF
Muted: #ECECF0
Input Background: #F3F3F5
Chart Colors: #646FD4, #22C55E, #F59E0B, #EF4444, #8B5CF6
```

---

## 📋 Exercise 1: Login and Registration Pages

### **Login Screen Wireframe**

**Frame Name:** `01_Login_Screen`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ●●●                    📶 📶 100%  │ ← Status Bar (44px)
├─────────────────────────────────────┤
│                                     │
│         🏠                          │ ← App Icon (60px from top)
│       Habitt                        │ ← App Name (32px font)
│   Build Better Habits               │ ← Tagline (16px, muted)
│                                     │
│                                     │ ← 60px spacing
│  ┌─────────────────────────────────┐ │
│  │ 📧 Email Address               │ │ ← Input (48px height)
│  └─────────────────────────────────┘ │
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🔒 Password              👁    │ │ ← Password Input
│  └─────────────────────────────────┘ │
│                                     │
│  ☐ Remember me      Forgot Password?│ ← Checkbox + Link
│                                     │
│                (24px gap)           │
│  ┌─────────────────────────────────┐ │
│  │          Sign In                │ │ ← Primary Button
│  └─────────────────────────────────┘ │
│                                     │
│         ─────── or ───────          │ ← Divider (16px gap)
│                                     │
│  ┌─────────────────────────────────┐ │
│  │      🎭 Try Demo Account        │ │ ← Secondary Button
│  └─────────────────────────────────┘ │
│                                     │
│                (32px gap)           │
│    Don't have an account? Sign Up   │ ← Link to Registration
│                                     │
└─────────────────────────────────────┘
```

**Figma Implementation Steps:**
1. Create frame 375×812px, name "01_Login_Screen"
2. Add status bar: Rectangle 375×44px, #000000
3. Add app logo: Circle 48px, placeholder icon
4. Add "Habitt" text: 32px, #030213, centered
5. Add tagline: 16px, #717182, centered
6. Create input fields: Rectangle 343×48px, #F3F3F5, corner radius 8px
7. Add input labels inside rectangles
8. Create buttons: Rectangle 343×48px, #030213 (primary), corner radius 8px
9. Add "Sign In" text: 16px, #FFFFFF, centered in button

### **Registration Screen Wireframe**

**Frame Name:** `01_Registration_Screen`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back                             │ ← Navigation (60px)
├─────────────────────────────────────┤
│                                     │
│         🌟                          │ ← Icon (40px from top)
│      Join Habitt                    │ ← Title (24px font)
│   Start Your Journey                │ ← Subtitle (16px)
│                                     │
│                (40px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 👤 Full Name                   │ │ ← Name Input
│  └─────────────────────────────────┘ │
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📧 Email Address               │ │ ← Email Input
│  └─────────────────────────────────┘ │
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🔒 Create Password        👁   │ │ ← Password Input
│  └─────────────────────────────────┘ │
│  Password Strength: ████░░ Strong   │ ← Strength Indicator
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🔒 Confirm Password       👁   │ │ ← Confirm Input
│  └─────────────────────────────────┘ │
│                                     │
│  ☐ I agree to Terms & Privacy       │ ← Checkbox Agreement
│                                     │
│                (24px gap)           │
│  ┌─────────────────────────────────┐ │
│  │        Create Account           │ │ ← Primary Button
│  └─────────────────────────────────┘ │
│                                     │
│                (24px gap)           │
│    Already have account? Sign In    │ ← Link to Login
│                                     │
└─────────────────────────────────────┘
```

---

## 📋 Exercise 2: Home Page Wireframe

**Frame Name:** `02_Home_Dashboard`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ☰      🏠 Habitt        👤         │ ← Header (60px)
├─────────────────────────────────────┤
│                                     │
│  Good Morning, Hesham! 🌅          │ ← Greeting (20px font)
│  Today is Tuesday, Jan 15th         │ ← Date (14px, muted)
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Today's Progress             │ │ ← Progress Card
│  │                                 │ │ (Height: 100px)
│  │ ████████░░ 8/10 Habits (80%)   │ │ ← Progress Bar
│  │ 🔥 Current Streak: 12 days     │ │ ← Streak Info
│  └─────────────────────────────────┘ │
│                (20px gap)           │
│  📋 Today's Habits                  │ ← Section Header
│                                     │
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water          8/8 ✅  │ │ ← Habit Card 1
│  │ [████████████] 100%      ⊕     │ │ (Height: 72px)
│  └─────────────────────────────────┘ │
│                (12px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Morning Exercise     0/1     │ │ ← Habit Card 2
│  │ [░░░░░░░░░░░░] 0%        ⊕     │ │
│  └─────────────────────────────────┘ │
│                (12px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📚 Read 30 minutes      1/1 ✅  │ │ ← Habit Card 3
│  │ [████████████] 100%      ⊕     │ │
│  └─────────────────────────────────┘ │
│                (12px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🧘 Meditation          0/1      │ │ ← Habit Card 4
│  │ [░░░░░░░░░░░░] 0%        ⊕     │ │
│  └─────────────────────────────────┘ │
│                                     │
│        + Add New Habit              │ ← Add Button
│                                     │
├─────────────────────────────────────┤
│ 🏠 Home 📊 Reports ⚙️ Settings 👤  │ ← Bottom Nav (60px)
└─────────────────────────────────────┘
```

**Figma Implementation:**
1. Add header rectangle: 375×60px, #FFFFFF, border bottom
2. Create greeting text: 20px, #030213
3. Add date text: 14px, #717182
4. Create progress card: 343×100px, #FFFFFF, shadow, corner radius 12px
5. Add progress bar: Rectangle with fill representing completion
6. Create habit cards: 343×72px each, consistent styling
7. Add bottom navigation: 375×60px with 4 equal sections

---

## 📋 Exercise 3: Detail Screen Wireframe

**Frame Name:** `03_Habit_Detail_Screen`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back    🏃 Morning Exercise   ⋮  │ ← Header with actions
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐ │
│  │        🏃                       │ │ ← Habit Icon (large)
│  │   Morning Exercise              │ │ ← Habit Name (24px)
│  │   30 minutes daily workout      │ │ ← Description
│  │                                 │ │
│  │   Current Streak: 🔥 12 days    │ │ ← Current Streak
│  │   Best Streak: 🏆 18 days       │ │ ← Best Streak  
│  │   Success Rate: 📈 85%          │ │ ← Success Rate
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ This Week's Progress            │ │ ← Weekly Section
│  │                                 │ │ (Height: 120px)
│  │ M  T  W  T  F  S  S             │ │ ← Day Labels
│  │ ✅ ✅ ✅ ○  ○  ○  ○              │ │ ← Completion Dots
│  │                                 │ │
│  │ 3/7 days completed this week    │ │ ← Summary Text
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📊 30-Day Trend                │ │ ← Chart Section
│  │                                 │ │ (Height: 140px)
│  │      ┌─┐     ┌─┐                │ │ ← Simple Bar Chart
│  │   ┌─┐│ │  ┌─┐│ │  ┌─┐           │ │
│  │   │ ││ │  │ ││ │  │ │           │ │
│  │   Wk1 Wk2 Wk3 Wk4              │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ Quick Actions                   │ │ ← Action Section
│  │ [Mark Complete] [Edit Habit]    │ │ ← Action Buttons
│  │ [View Calendar] [Add Note]      │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ Recent Notes                    │ │ ← Notes Section
│  │ Jan 14: Great workout session!  │ │
│  │ Jan 12: Felt tired but pushed   │ │
│  │ Jan 10: New personal record!    │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Key Elements:**
- Large habit icon and info section
- Visual progress indicators (dots for days)
- Simple chart representation
- Action buttons in grid layout
- Scrollable notes section

---

## 📋 Exercise 4: Settings Menu Wireframe

**Frame Name:** `04_Settings_Menu`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back        ⚙️ Settings           │ ← Header
├─────────────────────────────────────┤
│                                     │
│  👤 Profile                         │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 👨‍💼 Hesham Al Dandan            │ │ ← Profile Summary
│  │ heshamdan2014@gmail.com         │ │ (Height: 80px)
│  │ Member since Jan 2025       ►   │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ⚙️ General                         │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 🔔 Notifications             ►  │ │ ← Menu Item 1
│  └─────────────────────────────────┘ │ (Height: 56px each)
│  ┌─────────────────────────────────┐ │
│  │ 🎨 Appearance               ►   │ │ ← Menu Item 2
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Data & Privacy           ►   │ │ ← Menu Item 3
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  🏃 Habits                          │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 🔧 Manage Habits            ►   │ │ ← Habits Menu
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📈 View Reports             ►   │ │ ← Reports Menu
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🔗 API Integration          ►   │ │ ← API Menu
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ❓ Support                         │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 📚 Help & FAQs              ►   │ │ ← Help Menu
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📞 Contact Support          ►   │ │ ← Support Menu
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ⚠️ Account                         │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 🚪 Sign Out                 ►   │ │ ← Sign Out
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Implementation Notes:**
- Consistent menu item height (56px)
- Section headers with emoji icons
- Clear visual separation between sections
- Profile summary at top with key info

---

## 📋 Exercise 5: Profile/Settings Screen

**Frame Name:** `05_Profile_Settings`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back        👤 Profile       ✏️   │ ← Header with edit
├─────────────────────────────────────┤
│                                     │
│         👨‍💼                          │ ← Profile Avatar
│      Hesham Al Dandan               │ ← Name (20px)
│   heshamdan2014@gmail.com           │ ← Email (14px, muted)
│                                     │
│                (24px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Account Statistics           │ │ ← Stats Section
│  │                                 │ │ (Height: 120px)
│  │ 🗓️ Member since: Jan 2025       │ │
│  │ 🏃 Total Habits: 8              │ │
│  │ ✅ Completed Today: 6/8         │ │
│  │ 🔥 Longest Streak: 18 days     │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  📝 Personal Information            │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Full Name                       │ │ ← Info Field 1
│  │ Hesham Al Dandan                │ │ (Height: 48px each)
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Email Address                   │ │ ← Info Field 2
│  │ heshamdan2014@gmail.com         │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Location                        │ │ ← Info Field 3
│  │ Kassel, Germany                 │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Phone (Optional)                │ │ ← Info Field 4
│  │ +49 157 73127109                │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (24px gap)           │
│  🔐 Privacy Settings                │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Make profile public         [○] │ │ ← Toggle 1
│  │ Allow habit sharing         [●] │ │ ← Toggle 2
│  │ Enable analytics           [●] │ │ ← Toggle 3
│  └─────────────────────────────────┘ │
│                                     │
│                (24px gap)           │
│  ┌─────────────────────────────────┐ │
│  │         Edit Profile            │ │ ← Primary Action
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Key Components:**
- Large profile avatar (80px circle)
- Statistics grid with key metrics
- Information fields with labels and values
- Toggle switches for privacy settings
- Primary action button for editing

---

## 📋 Exercise 6: Reports and Analytics

**Frame Name:** `06_Reports_Analytics`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back       📊 Reports      📤    │ ← Header with share
├─────────────────────────────────────┤
│                                     │
│  📅 Time Period                     │ ← Filter Section
│  [ This Week ▼ ]  [Jan 8-14, 2025] │ ← Dropdown + Date
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📈 Weekly Overview              │ │ ← Overview Card
│  │                                 │ │ (Height: 120px)
│  │ Completion Rate: 85%            │ │
│  │ ████████░░                      │ │ ← Progress Bar
│  │                                 │ │
│  │ • Total Habits: 8               │ │ ← Bullet Points
│  │ • Completed: 34/40 (85%)        │ │
│  │ • Best Day: Tuesday (100%)      │ │
│  │ • Current Streak: 🔥 12 days    │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Daily Breakdown              │ │ ← Chart Section
│  │                                 │ │ (Height: 160px)
│  │     ┌─┐                         │ │ ← Bar Chart Visual
│  │  ┌─┐│8│  ┌─┐  ┌─┐  ┌─┐  ┌─┐   │ │
│  │  │6││ │  │5│  │7│  │4│  │8│   │ │
│  │  │ ││ │  │ │  │ │  │ │  │ │   │ │
│  │  M  T  W  T  F  S  S           │ │ ← Day Labels
│  │                                 │ │
│  │ [View Detailed Chart]           │ │ ← Action Link
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🏆 Top Performing Habits        │ │ ← Performance Section
│  │                                 │ │ (Height: 140px)
│  │ 1. 💧 Drink Water      100% ✅  │ │ ← Ranked List
│  │ 2. 📚 Reading          95%  ⭐  │ │
│  │ 3. 🧘 Meditation       90%  💪  │ │
│  │ 4. 🏃 Exercise         80%  🎯  │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📉 Needs Attention              │ │ ← Improvement Section
│  │                                 │ │ (Height: 100px)
│  │ 🍎 Healthy Eating    60%  ⚠️   │ │
│  │ 💡 Try: Set smaller portions    │ │ ← Suggestion
│  │                                 │ │
│  │ 😴 Sleep Schedule    45%  📉   │ │
│  │ 💡 Try: Set bedtime reminder    │ │ ← Suggestion
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Chart Implementation:**
- Use rectangles for bar chart bars
- Different heights to represent data
- Include day labels below bars
- Add percentage and ranking indicators

---

## 📋 Exercise 7: External API Integration

**Frame Name:** `07_API_Integration`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Back       🔗 API Demo            │ ← Header
├─────────────────────────────────────┤
│                                     │
│  🌐 External Data Integration       │ ← Page Title
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 💡 Daily Motivation             │ │ ← Motivation Section
│  │                                 │ │ (Height: 120px)
│  │ "Success is the sum of small    │ │ ← Quote Text
│  │  efforts repeated day in and    │ │
│  │  day out."                      │ │
│  │                                 │ │
│  │ - Robert Collier                │ │ ← Author
│  │                                 │ │
│  │ [Refresh Quote] 🔄              │ │ ← Action Button
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Live Data Feed               │ │ ← Data Section
│  │                                 │ │ (Height: 160px)
│  │ 🌍 JSONPlaceholder API          │ │ ← API Source
│  │                                 │ │
│  │ • Active Users: 1,247           │ │ ← Sample Data
│  │ • Posts Today: 89               │ │
│  │ • Comments: 2,156               │ │
│  │ • Server Status: 🟢 Online     │ │
│  │                                 │ │
│  │ Last Updated: 2:34 PM           │ │ ← Timestamp
│  │                                 │ │
│  │ [Refresh Data] 🔄               │ │ ← Action Button
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ 🔄 Loading States               │ │ ← Loading Demo
│  │                                 │ │ (Height: 100px)
│  │ ⚪ ⚪ ⚪                          │ │ ← Loading Animation
│  │                                 │ │
│  │ Fetching fresh data...          │ │ ← Loading Text
│  │                                 │ │
│  │ [Simulate Loading] 📱           │ │ ← Demo Button
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ┌─────────────────────────────────┐ │
│  │ ⚠️ Error Handling               │ │ ← Error Demo
│  │                                 │ │ (Height: 80px)
│  │ Network connection failed       │ │ ← Error Message
│  │ Please check your internet      │ │
│  │                                 │ │
│  │ [Retry] 🔄                      │ │ ← Retry Button
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  📋 Integration Features:           │ ← Features List
│  • Real-time data fetching         │
│  • Error handling & retry          │
│  • Loading states                  │
│  • Data caching                    │
│  • Offline support                 │
│                                     │
└─────────────────────────────────────┘
```

**API Integration Elements:**
- Quote/motivation from external API
- Live data display with metrics
- Loading state animations
- Error handling demonstrations
- Feature list showing API capabilities

---

## 📋 Exercise 8: Notifications Settings

**Frame Name:** `08_Notifications`  
**Dimensions:** 375px × 812px

```
┌─────────────────────────────────────┐
│  ◄ Settings    🔔 Notifications      │ ← Header
├─────────────────────────────────────┤
│                                     │
│  🔔 Master Control                  │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Enable Notifications        [●] │ │ ← Master Toggle
│  │ Receive habit reminders         │ │ (Height: 60px)
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  ⏰ Reminder Schedule                │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Morning Reminder                │ │ ← Time Setting 1
│  │ 08:00 AM              ⚙️ Edit   │ │ (Height: 56px each)
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Afternoon Check-in              │ │ ← Time Setting 2
│  │ 02:00 PM              ⚙️ Edit   │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Evening Review                  │ │ ← Time Setting 3
│  │ 08:00 PM              ⚙️ Edit   │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ + Add Custom Time               │ │ ← Add Button
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  🔕 Quiet Hours                     │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Do Not Disturb              [●] │ │ ← DND Toggle
│  │ 10:00 PM - 07:00 AM             │ │ (Height: 72px)
│  │ No notifications during sleep   │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  🏃 Individual Habits               │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water              [●] │ │ ← Habit Toggle 1
│  │ 3 reminders per day             │ │ (Height: 56px each)
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Morning Exercise         [●] │ │ ← Habit Toggle 2
│  │ 1 reminder per day              │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📚 Reading                  [○] │ │ ← Habit Toggle 3
│  │ No reminders                    │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🧘 Meditation               [●] │ │ ← Habit Toggle 4
│  │ 2 reminders per day             │ │
│  └─────────────────────────────────┘ │
│                                     │
│                (20px gap)           │
│  🔊 Notification Style              │ ← Section Header
│  ┌─────────────────────────────────┐ │
│  │ Sound                   [Default▼]│ ← Sound Dropdown
│  │ Vibration                   [●] │ │ ← Vibration Toggle
│  │ Show on Lock Screen         [●] │ │ ← Lock Screen Toggle
│  │ Badge App Icon              [●] │ │ ← Badge Toggle
│  └─────────────────────────────────┘ │
│                                     │
│                (16px gap)           │
│  ┌─────────────────────────────────┐ │
│  │      Preview Notification       │ │ ← Test Button
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

**Toggle Implementation:**
- Use oval shapes for toggle backgrounds
- Circle for the toggle thumb
- Different colors for on/off states
- Consistent spacing and alignment

---

## 📸 Evidence Screenshots Required

### **Screenshot 1: `figma-evidence1.png`**
**Include these 5 screens in one image:**
1. **Login Screen** (01_Login_Screen)
2. **Registration Screen** (01_Registration_Screen)  
3. **Home Dashboard** (02_Home_Dashboard)
4. **Detail Screen** (03_Habit_Detail_Screen)
5. **Profile Settings** (05_Profile_Settings)

**Figma Export Steps:**
1. Select all 5 frames
2. Right-click → Export
3. Format: PNG, 2x resolution
4. Save as: `figma-evidence1.png`

### **Screenshot 2: `figma-evidence2.png`**
**Include these 4 screens in one image:**
1. **API Integration** (07_API_Integration)
2. **Settings Menu** (04_Settings_Menu)  
3. **Reports Analytics** (06_Reports_Analytics)
4. **Notifications Settings** (08_Notifications)

**Figma Export Steps:**
1. Select all 4 frames
2. Right-click → Export
3. Format: PNG, 2x resolution
4. Save as: `figma-evidence2.png`

---

## 🎨 Figma Implementation Tips

### **Quick Creation Steps:**
1. **Use Auto Layout:** Enable auto layout for consistent spacing
2. **Create Components:** Make reusable buttons, inputs, cards
3. **Use Constraints:** Pin elements to maintain responsive behavior
4. **Add Shadows:** Use drop shadow effect: 0 2px 8px rgba(0,0,0,0.1)
5. **Consistent Colors:** Create color styles for your palette

### **Keyboard Shortcuts:**
- `R` = Rectangle tool
- `T` = Text tool  
- `F` = Frame tool
- `Cmd/Ctrl + G` = Group elements
- `Cmd/Ctrl + D` = Duplicate
- `Cmd/Ctrl + E` = Export

### **Component Library:**
Create these as components for reuse:
- Mobile Frame (375×812px)
- Button (Primary/Secondary)
- Input Field (with/without icons)
- Habit Card (with progress bar)
- Toggle Switch (on/off states)
- Navigation Bar (bottom tabs)

---

## ✅ Lab Completion Checklist

### **Before Export:**
- [ ] All 8 frames created with correct dimensions
- [ ] Consistent color scheme throughout
- [ ] Text is readable and properly sized
- [ ] All interactive elements clearly indicated
- [ ] Proper spacing and alignment
- [ ] Icons and emojis used consistently

### **Export Requirements:**
- [ ] figma-evidence1.png created (5 screens)
- [ ] figma-evidence2.png created (4 screens)
- [ ] Both images are high resolution (2x)
- [ ] All screens clearly visible in exports
- [ ] File names match exactly as specified

### **Design Quality:**
- [ ] Mobile-first approach maintained
- [ ] Touch targets appropriate size (44px minimum)
- [ ] Visual hierarchy clear throughout
- [ ] Consistent with existing app style
- [ ] All user flows represented accurately

**Lab Total Time:** 60 minutes  
**Final Deliverables:** 8 wireframes + 2 evidence screenshots  
**Alignment:** 100% with your existing Habitt React TypeScript app! 🎯

Your wireframes will perfectly represent your already-built application and demonstrate excellent UX/UI planning skills! 🚀