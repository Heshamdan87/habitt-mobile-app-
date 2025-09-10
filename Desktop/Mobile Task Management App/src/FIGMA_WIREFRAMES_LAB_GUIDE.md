# Figma Wireframes Lab Guide - Habitt Mobile App

> **Complete lab guide for creating UX wireframes in Figma for the Habitt habit tracking application**

## 📋 Lab Overview

**Estimated Time:** 60 minutes  
**Tool:** Figma (free version sufficient)  
**Target:** Create wireframes for 8 key app screens  
**Existing Codebase:** React TypeScript with Tailwind CSS  

## 🎯 Learning Objectives

- Create wireframes that align with existing user stories
- Use Figma frames efficiently to represent each app screen
- Prepare visual representation of app flow and layout
- Maintain consistency with existing component structure

---

## 📱 Exercise 1: Set up Your Figma Project

### **Step 1: Create New Figma File**
1. **Log in to Figma** with your account
2. **Click "New File"** to create a new design file
3. **Name the file:** `Habitt Mobile App Wireframes`
4. **In the left panel:** Right-click and select "Rename Page"
5. **Rename to:** `Main Wireframes`

### **Step 2: Set up Mobile Frame Template**
```
Frame Specifications:
- Width: 375px (iPhone standard)
- Height: 812px (iPhone X/11/12 standard)
- Background: #FFFFFF (light mode default)
- Grid: 8px baseline grid for consistency
```

### **Step 3: Create Design System**
Before creating wireframes, set up consistent elements:

**Color Palette (from your globals.css):**
- Primary: #030213
- Secondary: #F3F3F5
- Accent: #3B82F6
- Background: #FFFFFF
- Muted: #ECECF0

**Typography Scale:**
- Headings: 20px-24px (font-weight: 500)
- Body: 16px (font-weight: 400)  
- Labels: 14px (font-weight: 500)
- Captions: 12px (font-weight: 400)

---

## 📱 Exercise 2: Login/Registration Page Wireframe

### **User Stories to Address:**
- US-001: Account Registration with name, email, password
- US-002: Account Login with email and password  
- US-003: Error feedback for wrong credentials

### **Frame Setup:**
1. **Create Frame:** Name it "01_Login_Registration"
2. **Dimensions:** 375px × 812px
3. **Background:** #FFFFFF

### **Wireframe Layout:**

```
┌─────────────────────────────────────┐
│  Status Bar (20px)                  │
├─────────────────────────────────────┤
│                                     │
│         🏠 Habitt                   │ ← App Logo/Title (80px from top)
│      Build Better Habits            │ ← Tagline
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📧 Email Address               │ │ ← Input Field (48px height)
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🔒 Password                👁  │ │ ← Password Field with toggle
│  └─────────────────────────────────┘ │
│                                     │
│  ☐ Remember me                     │ ← Checkbox
│                                     │
│  ┌─────────────────────────────────┐ │
│  │        Sign In                  │ │ ← Primary Button (48px)
│  └─────────────────────────────────┘ │
│                                     │
│         Forgot Password?            │ ← Link
│                                     │
│  ────────── or ──────────          │ ← Divider
│                                     │
│  ┌─────────────────────────────────┐ │
│  │    🎭 Try Demo Account         │ │ ← Demo Button
│  └─────────────────────────────────┘ │
│                                     │
│    Don't have an account? Sign Up   │ ← Switch to Registration
│                                     │
└─────────────────────────────────────┘
```

### **Registration Overlay/Modal:**
```
┌─────────────────────────────────────┐
│  ◄ Back to Login          [× Close] │
│                                     │
│         🌟 Join Habitt              │
│      Start Your Journey             │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 👤 Full Name                   │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📧 Email Address               │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🔒 Create Password        👁   │ │
│  └─────────────────────────────────┘ │
│  Password Strength: ████░░ Strong   │
│                                     │
│  ☐ I agree to Terms & Privacy      │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │      Create Account             │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Figma Elements to Create:**
- **App Logo:** Text element "Habitt" with custom styling
- **Input Fields:** Rectangles with rounded corners (8px radius)
- **Buttons:** Primary (filled) and secondary (outlined) styles
- **Icons:** Use Figma's icon plugins or simple shapes
- **Form Validation:** Red error states for inputs

**Corresponding React Component:** `LoginScreen.tsx` and `SignupScreen.tsx`

---

## 📱 Exercise 3: Homepage Wireframe

### **User Stories to Address:**
- US-004: Personalized welcome message with user's name
- US-005: Daily progress display for each habit
- US-006: Section for completed habits

### **Frame Setup:**
1. **Create Frame:** Name it "02_Homepage_Dashboard"
2. **Add Navigation:** Bottom tab bar (60px height)

### **Wireframe Layout:**

```
┌─────────────────────────────────────┐
│  Status Bar + Header (80px)         │
│  ☰ Menu    🏠 Habitt     👤 Profile │
├─────────────────────────────────────┤
│                                     │
│  Good Morning, Hesham! 🌅          │ ← Personalized Greeting
│  Today is Tuesday, Jan 15th         │ ← Current Date
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Today's Progress             │ │ ← Progress Card
│  │ ████████░░ 8/10 Habits (80%)   │ │
│  │ 🔥 Current Streak: 12 days     │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📋 Today's Habits                  │ ← Section Header
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water          8/8 ✅  │ │ ← Completed Habit
│  │ [=======] 100%          ⊕       │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Morning Exercise     0/1     │ │ ← Pending Habit
│  │ [░░░░░░░] 0%            ⊕       │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📚 Read 30 minutes      1/1 ✅  │ │ ← Completed Habit
│  │ [=======] 100%          ⊕       │ │
│  └─────────────────────────────────┘ │
│                                     │
│        + Add New Habit              │ ← FAB or Link
│                                     │
├─────────────────────────────────────┤
│ 🏠 Home 📊 Reports ⚙️ Settings 👤  │ ← Bottom Navigation
└─────────────────────────────────────┘
```

### **Habit Card Component Design:**
```
┌─────────────────────────────────────┐
│ 🏃 [Icon] Habit Name        [●] Done│ ← 80px height card
│ Progress description               │
│ ████████░░ 80% (4/5)              │ ← Progress bar
│ Streak: 🔥 12 days                 │ ← Streak indicator
└─────────────────────────────────────┘
```

### **States to Show:**
- **Completed Habit:** Green checkmark, 100% progress
- **Partial Progress:** Orange progress bar, current count
- **Not Started:** Gray progress bar, 0%
- **Overdue:** Red accent color

### **Figma Elements:**
- **Greeting Section:** Dynamic text with user name
- **Progress Cards:** Rounded rectangles with internal elements
- **Progress Bars:** Colored rectangles showing completion
- **Habit Icons:** Emoji or simple icons
- **Bottom Navigation:** Tab bar with icons and labels

**Corresponding React Component:** `HabitHomepage.tsx`

---

## 📱 Exercise 4: Menu/Navigation Wireframe

### **User Stories to Address:**
- US-007: Access menu with navigation options
- US-008: Navigate to profile from menu
- US-009: Navigate to habits configuration
- US-010: Sign out option in menu

### **Frame Setup:**
1. **Create Frame:** Name it "03_Menu_Navigation"
2. **Show Both:** Bottom navigation and side menu if applicable

### **Bottom Navigation Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         Current Screen Content      │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ 🏠      📊      ⚙️      👤      │ ← Bottom Tabs (60px)
│ Home   Reports Settings Profile     │
│ [●]     [ ]     [ ]     [ ]         │ ← Active indicator
└─────────────────────────────────────┘
```

### **Settings/Menu Screen Layout:**
```
┌─────────────────────────────────────┐
│  ◄ Back        ⚙️ Settings           │
├─────────────────────────────────────┤
│                                     │
│  👤 Profile Section                 │
│  ┌─────────────────────────────────┐ │
│  │ 👨‍💼 Hesham Al Dandan            │ │
│  │ heshamdan2014@gmail.com         │ │
│  │ Member since Jan 2025           │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ⚙️ General Settings                │
│  ┌─────────────────────────────────┐ │
│  │ 🔔 Notifications             ► │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🎨 Appearance                ► │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Data & Privacy            ► │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🔗 App Features                    │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Manage Habits             ► │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📈 View Reports              ► │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🔗 API Integration           ► │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ⚠️ Account Actions                 │
│  ┌─────────────────────────────────┐ │
│  │ 🚪 Sign Out                  ► │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Navigation Hierarchy:**
```
Main Navigation:
├── 🏠 Home (HabitHomepage)
├── 📊 Reports (HabitReportsScreen)
├── ⚙️ Settings (SettingsScreen)
│   ├── 🔔 Notifications (NotificationsScreen)
│   ├── 🎨 Appearance
│   ├── 📊 Data & Privacy
│   ├── 🏃 Manage Habits (HabitConfigureScreen)
│   ├── 📈 View Reports
│   └── 🚪 Sign Out
└── 👤 Profile (ProfileScreen)
```

### **Figma Elements:**
- **Tab Bar:** Consistent 60px height with icons and labels
- **Menu Items:** 60px height rows with icons, text, and chevrons
- **Active States:** Highlighted tabs and selected menu items
- **Profile Summary:** User info card at top of settings

**Corresponding React Component:** `HabitNavigation.tsx`, `SettingsScreen.tsx`

---

## 📱 Exercise 5: Profile Page Wireframe

### **User Stories to Address:**
- US-011: View personal information (name, email, profile details)
- US-012: Edit personal information and profile details
- US-013: Save updated information and persist changes
- US-014: Update name displayed in headers after changes

### **Frame Setup:**
1. **Create Frame:** Name it "04_Profile_Management"
2. **Show States:** View mode and edit mode

### **Profile View Mode:**
```
┌─────────────────────────────────────┐
│  ◄ Back        👤 Profile            │
├─────────────────────────────────────┤
│                                     │
│         👨‍💼                          │ ← Profile Avatar
│      Hesham Al Dandan               │ ← User Name (large)
│   heshamdan2014@gmail.com           │ ← Email (muted)
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Account Statistics           │ │
│  │                                 │ │
│  │ 🗓️ Member since: Jan 2025       │ │
│  │ 🏃 Total Habits: 8              │ │
│  │ ✅ Completed Today: 6/8         │ │
│  │ 🔥 Longest Streak: 18 days     │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📝 Personal Information            │
│  ┌─────────────────────────────────┐ │
│  │ Full Name                       │ │
│  │ Hesham Al Dandan                │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Email Address                   │ │
│  │ heshamdan2014@gmail.com         │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ Location                        │ │
│  │ Kassel, Germany                 │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │         Edit Profile            │ │ ← Primary Action
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Profile Edit Mode:**
```
┌─────────────────────────────────────┐
│  ◄ Cancel      ✏️ Edit Profile   ✓   │ ← Save icon
├─────────────────────────────────────┤
│                                     │
│         📷                          │ ← Change Avatar Option
│      Change Photo                   │
│                                     │
│  📝 Edit Information                │
│  ┌─────────────────────────────────┐ │
│  │ Full Name                       │ │
│  │ [Hesham Al Dandan            ] │ │ ← Editable Input
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Email Address                   │ │
│  │ [heshamdan2014@gmail.com     ] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Location                        │ │
│  │ [Kassel, Germany             ] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Phone (Optional)                │ │
│  │ [+49 157 73127109            ] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🔐 Privacy Settings                │
│  ☐ Make profile public             │
│  ☐ Allow habit sharing             │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │        Save Changes             │ │ ← Save Button
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │         Cancel                  │ │ ← Cancel Button
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Figma Elements:**
- **Profile Avatar:** Circular image placeholder with camera icon
- **Info Cards:** Rounded rectangles for displaying/editing data
- **Statistics Section:** Grid layout showing key metrics
- **Form Fields:** Input fields with labels and placeholder text
- **Toggle States:** Show both view and edit modes

**Corresponding React Component:** `ProfileScreen.tsx`

---

## 📱 Exercise 6: Habits Configuration Wireframe

### **User Stories to Address:**
- US-015: Add new habits with customizable properties
- US-016: Delete existing habits from tracking
- US-017: Personalize habits with colors and icons

### **Frame Setup:**
1. **Create Frame:** Name it "05_Habits_Configure"
2. **Show States:** List view and add/edit modal

### **Habits List View:**
```
┌─────────────────────────────────────┐
│  ◄ Back        🏃 My Habits        + │ ← Add button
├─────────────────────────────────────┤
│                                     │
│  📊 Quick Stats                     │
│  Active: 8 habits | Completed: 6    │
│                                     │
│  📋 Your Habits                     │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water          [Daily] │ │ ← Habit Card
│  │ Goal: 8 glasses | ✅ Complete   │ │
│  │ Streak: 🔥 15 days        [⋮]  │ │ ← Options menu
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Morning Exercise    [Daily]  │ │
│  │ Goal: 30 minutes | ⏸️ Pending  │ │
│  │ Streak: 🔥 12 days        [⋮]  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📚 Reading             [Daily]  │ │
│  │ Goal: 30 minutes | ✅ Complete  │ │
│  │ Streak: 🔥 8 days         [⋮]  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🧘 Meditation       [3x/week]  │ │
│  │ Goal: 15 minutes | ⏸️ Pending  │ │
│  │ Streak: 🔥 5 days         [⋮]  │ │
│  └─────────────────────────────────┘ │
│                                     │
│        + Add New Habit              │
│                                     │
└─────────────────────────────────────┘
```

### **Add New Habit Modal:**
```
┌─────────────────────────────────────┐
│  × Close       ➕ Add Habit         │
├─────────────────────────────────────┤
│                                     │
│  🎨 Choose Icon & Color             │
│  [🏃] [💧] [📚] [🧘] [🍎] [😴]     │ ← Icon Selection
│                                     │
│  [🔴][🟠][🟡][🟢][🔵][🟣]         │ ← Color Palette
│                                     │
│  ✏️ Habit Details                   │
│  ┌─────────────────────────────────┐ │
│  │ Habit Name                      │ │
│  │ [Morning Exercise            ] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ Description (Optional)          │ │
│  │ [30 minutes cardio workout   ] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  📅 Frequency                       │
│  ◉ Daily                           │
│  ○ Weekly (select days)            │
│  ○ Custom frequency                │
│                                     │
│  🎯 Goal Setting                    │
│  ┌─────────────────────────────────┐ │
│  │ Target per day: [1    ] times  │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🔔 Reminder Time                   │
│  ☐ Set reminder at [08:00 AM  ▼]   │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │         Create Habit            │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Habit Context Menu (Options):**
```
┌─────────────────────┐
│ ✏️ Edit Habit      │
│ 📊 View Details     │
│ 📋 Duplicate        │
│ ⏸️ Pause Tracking   │
│ ──────────────────  │
│ 🗑️ Delete Habit    │ ← Destructive action
└─────────────────────┘
```

### **Figma Elements:**
- **Habit Cards:** Consistent card design with status indicators
- **Icon Grid:** 6x6 grid of habit icons for selection
- **Color Picker:** Horizontal row of color options
- **Form Components:** Input fields, dropdowns, radio buttons
- **Modal Overlay:** Dark background with centered modal

**Corresponding React Component:** `HabitConfigureScreen.tsx`

---

## 📱 Exercise 7: Reports Page Wireframe

### **User Stories to Address:**
- US-018: View weekly habit progress reports
- US-019: Visualize completed habits with charts
- US-020: View both completed and incomplete habits

### **Frame Setup:**
1. **Create Frame:** Name it "06_Reports_Analytics"
2. **Include Charts:** Use simple shapes to represent data visualizations

### **Reports Dashboard:**
```
┌─────────────────────────────────────┐
│  ◄ Back       📊 Reports      📤    │ ← Share button
├─────────────────────────────────────┤
│                                     │
│  📅 Time Period                     │
│  [ This Week ▼ ]  [Jan 8-14, 2025] │ ← Date picker
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📈 Weekly Overview              │ │
│  │                                 │ │
│  │ Completion Rate: 85%            │ │
│  │ ████████░░                      │ │ ← Progress bar
│  │                                 │ │
│  │ • Total Habits: 8               │ │
│  │ • Completed: 34/40 (85%)        │ │
│  │ • Best Day: Tuesday (100%)      │ │
│  │ • Current Streak: 🔥 12 days    │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📊 Daily Breakdown              │ │
│  │                                 │ │
│  │     ┌─┐                         │ │ ← Bar chart
│  │  ┌─┐│8│  ┌─┐  ┌─┐  ┌─┐  ┌─┐   │ │
│  │  │6││ │  │5│  │7│  │4│  │8│   │ │
│  │  │ ││ │  │ │  │ │  │ │  │ │   │ │
│  │  M  T  W  T  F  S  S           │ │
│  │                                 │ │
│  │ [View Detailed Chart]           │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 🏆 Habit Performance            │ │
│  │                                 │ │
│  │ 💧 Drink Water      100% ✅     │ │
│  │ ███████████████████              │ │
│  │                                 │ │
│  │ 📚 Reading          95%  ⭐     │ │
│  │ ███████████████░░░░              │ │
│  │                                 │ │
│  │ 🧘 Meditation       90%  💪     │ │
│  │ ████████████░░░░░░               │ │
│  │                                 │ │
│  │ 🏃 Exercise         80%  🎯     │ │
│  │ ████████░░░░░░░░░░░               │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 📉 Needs Attention              │ │
│  │                                 │ │
│  │ 🍎 Healthy Eating    60%  ⚠️   │ │
│  │ 💡 Try: Set smaller portions    │ │
│  │                                 │ │
│  │ 😴 Sleep Schedule    45%  📉   │ │
│  │ 💡 Try: Set bedtime reminder    │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Detailed Chart View:**
```
┌─────────────────────────────────────┐
│  ◄ Back       📊 Habit Trends       │
├─────────────────────────────────────┤
│                                     │
│  📈 30-Day Trend Analysis           │
│                                     │
│  10│    ●                          │ ← Line chart
│   9│  ●   ●                        │
│   8│ ●     ●  ●                    │
│   7│         ● ●  ●                │
│   6│             ●   ●             │
│   5│                  ●            │
│   0└─────────────────────────────── │
│    Jan 1    Jan 15    Jan 30       │
│                                     │
│  🎯 Key Insights                    │
│  • Best week: Jan 8-14 (92%)       │
│  • Improvement needed: Weekends     │
│  • Consistency trend: ↗️ Improving │
│                                     │
│  📊 Habit Breakdown                 │
│  [💧] [🏃] [📚] [🧘] [All]         │ ← Filter tabs
│                                     │
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water Analysis         │ │
│  │                                 │ │
│  │ Current Streak: 🔥 15 days      │ │
│  │ Best Streak: 🏆 28 days         │ │
│  │ Success Rate: 95%               │ │
│  │ Weekly Average: 6.8/8 glasses   │ │
│  │                                 │ │
│  │ ✅ Completed: 28 days           │ │
│  │ ⏸️ Missed: 2 days               │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Chart Types to Represent:**
- **Bar Charts:** Daily/weekly completion counts
- **Line Graphs:** Trend analysis over time
- **Progress Bars:** Individual habit completion rates
- **Pie Charts:** Category breakdown (if applicable)
- **Calendar Heatmap:** Daily completion visualization

### **Figma Elements:**
- **Chart Placeholders:** Simple rectangles and shapes
- **Data Labels:** Text showing percentages and numbers
- **Legend Components:** Color coding for different habits
- **Time Period Selector:** Dropdown or tab interface

**Corresponding React Component:** `HabitReportsScreen.tsx`

---

## 📱 Exercise 8: Notifications Settings Wireframe

### **User Stories to Address:**
- US-021: Enable/disable notifications globally and per habit
- US-022: Select specific habits for notifications
- US-023: Set notification times (morning, afternoon, evening)

### **Frame Setup:**
1. **Create Frame:** Name it "07_Notifications_Settings"
2. **Show Hierarchy:** Global settings and individual habit controls

### **Notifications Settings Layout:**
```
┌─────────────────────────────────────┐
│  ◄ Settings    🔔 Notifications      │
├─────────────────────────────────────┤
│                                     │
│  🔔 Master Control                  │
│  ┌─────────────────────────────────┐ │
│  │ Enable Notifications        [●] │ │ ← Global toggle
│  │ Receive habit reminders         │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ⏰ Reminder Schedule                │
│  ┌─────────────────────────────────┐ │
│  │ Morning Reminder                │ │
│  │ 08:00 AM              ⚙️ Edit   │ │ ← Time picker
│  │                                 │ │
│  │ Afternoon Check-in              │ │
│  │ 02:00 PM              ⚙️ Edit   │ │
│  │                                 │ │
│  │ Evening Review                  │ │
│  │ 08:00 PM              ⚙️ Edit   │ │
│  │                                 │ │
│  │ + Add Custom Time               │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🔕 Quiet Hours                     │
│  ┌─────────────────────────────────┐ │
│  │ Do Not Disturb              [○] │ │
│  │ 10:00 PM - 07:00 AM             │ │
│  │ No notifications during sleep   │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🏃 Individual Habits               │
│  ┌─────────────────────────────────┐ │
│  │ 💧 Drink Water              [●] │ │ ← Habit toggle
│  │ 3 reminders per day             │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🏃 Morning Exercise         [●] │ │
│  │ 1 reminder per day              │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 📚 Reading                  [○] │ │
│  │ No reminders                    │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │ 🧘 Meditation               [●] │ │
│  │ 2 reminders per day             │ │
│  └─────────────────────────────────┘ │
│                                     │
│  🔊 Notification Style              │
│  ┌─────────────────────────────────┐ │
│  │ Sound                   [Default▼]│
│  │ Vibration                   [●] │ │
│  │ Show on Lock Screen         [●] │ │
│  │ Badge App Icon              [●] │ │
│  └─────────────────────────────────┘ │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │      Preview Notification       │ │ ← Test button
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Time Picker Modal:**
```
┌─────────────────────────────────────┐
│  × Close      ⏰ Set Reminder Time   │
├─────────────────────────────────────┤
│                                     │
│  🌅 Morning Reminder                │
│                                     │
│  ┌─────────────┐ ┌─────────────────┐ │
│  │    08       │ │      00         │ │ ← Time wheels
│  │  [▲]        │ │     [▲]         │ │
│  │   ●         │ │      ●          │ │
│  │  [▼]        │ │     [▼]         │ │
│  └─────────────┘ └─────────────────┘ │
│                                     │
│  ◉ AM    ○ PM                       │
│                                     │
│  📅 Repeat Schedule                 │
│  ☑️ Monday    ☑️ Tuesday   ☑️ Wednesday │
│  ☑️ Thursday  ☑️ Friday    ☐ Saturday  │
│  ☐ Sunday                           │
│                                     │
│  ┌─────────────────────────────────┐ │
│  │         Save Time               │ │
│  └─────────────────────────────────┘ │
│  ┌─────────────────────────────────┐ │
│  │         Cancel                  │ │
│  └─────────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### **Notification Preview:**
```
┌─────────────────────────────────────┐
│ 🔔 Habitt                    now    │ ← System notification
├─────────────────────────────────────┤
│ 🏃 Time for Morning Exercise!       │
│ Keep your streak going - 12 days    │
│ [Mark Done]              [Snooze]   │
└─────────────────────────────────────┘
```

### **Figma Elements:**
- **Toggle Switches:** iOS-style switches for boolean settings
- **Time Display:** Digital clock format with edit buttons
- **Habit List:** Cards with individual toggle controls
- **Modal Overlays:** Time picker and preview notifications
- **System Notification:** iOS/Android style notification example

**Corresponding React Component:** `NotificationsScreen.tsx`

---

## 🎨 Figma Design System Setup

### **Create Reusable Components:**

#### **1. Mobile Frame Template**
```
Component: Mobile_Frame
- Width: 375px
- Height: 812px  
- Corner Radius: 0px
- Fill: #FFFFFF
- Auto Layout: Vertical
```

#### **2. Navigation Bar**
```
Component: Bottom_Navigation
- Height: 60px
- Background: #FFFFFF
- Border Top: 1px #E5E7EB
- Items: Home, Reports, Settings, Profile
- Active State: #3B82F6
```

#### **3. Button Styles**
```
Primary Button:
- Height: 48px
- Background: #030213
- Text: #FFFFFF
- Corner Radius: 8px
- Font Weight: 500

Secondary Button:
- Height: 48px
- Background: transparent
- Border: 1px #030213
- Text: #030213
- Corner Radius: 8px
```

#### **4. Input Field**
```
Component: Input_Field
- Height: 48px
- Background: #F3F3F5
- Border: 1px transparent
- Corner Radius: 8px
- Padding: 12px 16px
- Placeholder: #717182
```

#### **5. Habit Card**
```
Component: Habit_Card
- Height: 80px
- Background: #FFFFFF
- Border: 1px #E5E7EB
- Corner Radius: 12px
- Shadow: 0 2px 4px rgba(0,0,0,0.1)
- Padding: 16px
```

### **Color Variables in Figma:**
```
Primary: #030213
Secondary: #F3F3F5
Success: #22C55E
Warning: #F59E0B
Error: #EF4444
Background: #FFFFFF
Muted: #ECECF0
Text Primary: #111827
Text Secondary: #6B7280
```

---

## ✅ Wireframe Checklist

### **For Each Screen:**
- [ ] Consistent mobile frame size (375x812px)
- [ ] Clear navigation elements
- [ ] Proper visual hierarchy
- [ ] Touch-friendly button sizes (minimum 44px)
- [ ] Consistent spacing (8px grid system)
- [ ] Status indicators and feedback states
- [ ] Loading states where applicable
- [ ] Error states for forms
- [ ] Accessibility considerations

### **Design System:**
- [ ] Consistent color palette
- [ ] Reusable component library
- [ ] Typography scale defined
- [ ] Icon library established
- [ ] Button styles standardized
- [ ] Form element consistency

### **User Story Alignment:**
- [ ] All user stories addressed in wireframes
- [ ] User flows clearly represented
- [ ] Edge cases considered
- [ ] Mobile-first approach maintained

---

## 🚀 Next Steps After Wireframing

### **1. Design Validation**
- Review wireframes against user stories
- Validate mobile usability principles
- Check accessibility standards
- Get stakeholder feedback

### **2. High-Fidelity Design**
- Add visual design layer
- Apply brand colors and typography
- Create interaction prototypes
- Prepare assets for development

### **3. Development Handoff**
- Export assets and specifications
- Document interaction patterns
- Create component documentation
- Set up design-development workflow

### **4. Implementation**
- Use wireframes as React component blueprints
- Maintain design system consistency
- Implement responsive behavior
- Test across mobile devices

---

**Wireframe Files to Create in Figma:**
1. `01_Login_Registration` - Authentication screens
2. `02_Homepage_Dashboard` - Main habit tracking interface  
3. `03_Menu_Navigation` - Navigation and settings access
4. `04_Profile_Management` - User profile and editing
5. `05_Habits_Configure` - Habit creation and management
6. `06_Reports_Analytics` - Progress tracking and insights
7. `07_Notifications_Settings` - Notification preferences
8. `Component_Library` - Reusable design elements

**Total Lab Time:** ~60 minutes  
**Deliverable:** Complete Figma wireframe file with all 8 screens  
**Alignment:** 100% compatible with existing React TypeScript codebase

Your wireframes will serve as the perfect blueprint for your already-implemented Habitt mobile app! 🎯