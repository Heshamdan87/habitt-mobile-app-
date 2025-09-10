# 📸 Lab Evidence Screenshots Guide

## 🎯 **Required Evidence for SkillUp EdTech Lab**

### **Screenshot 1: figma-evidence1.png**
**Required Screens:** Login, Signup, Home, Detail

**Figma Frame Layout:**
```
┌─────────────────┬─────────────────┐
│   Login Screen  │  Signup Screen  │
│                 │                 │
│  📧 Email       │  👤 Full Name   │
│  🔒 Password    │  📧 Email       │
│  [Login Button] │  🔒 Password    │
│  [Demo Access]  │  [Create Acc]   │
├─────────────────┼─────────────────┤
│   Home Screen   │  Detail Screen  │
│                 │                 │
│  Welcome User!  │  🏃 Exercise    │
│  📊 Progress    │  📈 Analytics   │
│  🏃 Exercise ✅ │  🔥 Streaks     │
│  💧 Water  ○    │  📊 Charts      │
│  [Add Habit]    │  [Edit Habit]   │
└─────────────────┴─────────────────┘
```

### **Screenshot 2: figma-evidence2.png**
**Required Screens:** API Integration, Settings Menu, Profile, Notifications

**Figma Frame Layout:**
```
┌─────────────────┬─────────────────┐
│ API Integration │ Settings Menu   │
│                 │                 │
│ 💬 Daily Quote  │ 👤 Profile      │
│ "Success is..." │ 🔔 Notifications│
│ [Get New Quote] │ 🎨 Appearance   │
│ 🔄 Refresh API  │ 📊 Data Privacy │
├─────────────────┼─────────────────┤
│ Profile Screen  │ Notifications   │
│                 │                 │
│ 👤 Hesham Al D. │ 🔔 Push Notifs  │
│ 📧 Email        │ ⏰ Reminders    │
│ 📍 Kassel, DE   │ 🔕 Quiet Hours  │
│ [Save Changes]  │ [Test Notify]   │
└─────────────────┴─────────────────┘
```

---

## 🖼️ **Wireframe Creation Instructions for Figma**

### **Frame Setup**
1. **Create New Figma Project:** "Habitt Wireframes - SkillUp Lab"
2. **Frame Dimensions:** 375 × 812px (iPhone dimensions)
3. **Background:** Light gray (#F5F5F5) for wireframe feel

### **Design Elements to Include**

#### **Login Screen Wireframe**
- Header: "Habitt" logo
- Input fields: Email, Password
- Buttons: Login (primary), Demo Access (secondary)
- Links: Forgot Password, Sign Up

#### **Signup Screen Wireframe**
- Header: "Join Habitt"
- Input fields: Name, Email, Password, Confirm Password
- Button: Create Account
- Link: Already have account?

#### **Home Screen Wireframe**
- Greeting: "Good Morning, Hesham!"
- Progress summary card
- Habit list with checkboxes
- Add habit button
- Bottom navigation

#### **Detail Screen Wireframe**
- Habit name and icon
- Statistics: streak, completion rate
- Progress charts
- Action buttons: Edit, Delete

#### **Settings Menu Wireframe**
- Profile section
- Menu items with arrows:
  - Account & Profile
  - Notifications
  - Appearance
  - Data & Privacy
  - Help & Support
- Logout button

#### **Profile Screen Wireframe**
- User avatar
- Personal info: Name, Email, Location
- Preferences: Theme, Reminders
- Save button

#### **Analytics Screen Wireframe**
- Time period selector
- Key metrics cards
- Charts: bar chart, trend line
- Top habits list

#### **Notifications Screen Wireframe**
- Master toggle: Push Notifications
- Reminder times section
- Notification types with toggles
- Sound & vibration settings

---

## 📋 **Evidence Submission Checklist**

### **Before Taking Screenshots:**
- [ ] All 8 wireframes created in Figma
- [ ] Consistent spacing and alignment
- [ ] Clear labels and placeholder text
- [ ] Mobile-appropriate dimensions
- [ ] Clean, professional appearance

### **Screenshot Requirements:**
- [ ] **figma-evidence1.png**: Login, Signup, Home, Detail screens
- [ ] **figma-evidence2.png**: API, Settings, Profile, Notifications screens
- [ ] High resolution (at least 1200px wide)
- [ ] All frames clearly visible
- [ ] No overlapping elements

### **File Naming Convention:**
- `figma-evidence1.png` or `figma-evidence1.jpg`
- `figma-evidence2.png` or `figma-evidence2.jpg`

---

## 🎨 **Wireframe Design Tips**

### **Visual Consistency**
- Use same color scheme throughout
- Consistent button sizes and styles
- Standard spacing between elements
- Same font sizes for similar elements

### **Mobile-First Design**
- Touch-friendly button sizes (44px minimum)
- Easy thumb navigation
- Clear visual hierarchy
- Readable text sizes

### **Wireframe Principles**
- Focus on layout, not detailed design
- Use simple shapes and placeholder text
- Show functionality and user flow
- Keep it clean and uncluttered

---

## 📱 **Your Existing Application Reference**

Use these actual component files as reference for your wireframes:

1. **Login:** `/components/LoginScreen.tsx`
2. **Signup:** `/components/SignupScreen.tsx`
3. **Home:** `/components/HabitHomepage.tsx`
4. **Detail:** `/components/HabitDetailScreen.tsx`
5. **Settings:** `/components/SettingsScreen.tsx`
6. **Profile:** `/components/ProfileScreen.tsx`
7. **Analytics:** `/components/HabitReportsScreen.tsx`
8. **Notifications:** `/components/NotificationsScreen.tsx`

Your wireframes should reflect the structure and functionality already implemented in these components!

---

**✅ Ready to Create Figma Wireframes and Capture Evidence Screenshots!**