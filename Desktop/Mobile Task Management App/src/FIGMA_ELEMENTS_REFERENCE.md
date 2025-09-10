# Figma Elements Reference Guide

> **Quick reference for creating each wireframe element with exact specifications**

## 📐 Basic Frame Setup

### **Mobile Frame Template**
```
Frame Name: iPhone_13_Pro
Width: 375px
Height: 812px
Background: #FFFFFF
Constraints: Center
```

### **Status Bar**
```
Height: 44px
Background: transparent
Elements: Time (left), Signal/Battery (right)
Font: SF Pro Text, 14px, #000000
```

---

## 🎨 Component Specifications

### **Navigation Header**
```
Height: 60px
Background: #FFFFFF
Border Bottom: 1px #E5E7EB
Layout: 
  - Back button: 24px icon, left aligned
  - Title: 18px, #030213, centered
  - Action button: 24px icon, right aligned
```

### **Bottom Navigation**
```
Height: 60px + safe area
Background: #FFFFFF
Border Top: 1px #E5E7EB
Items: 4 tabs, evenly spaced
Each Tab:
  - Icon: 24px, #6B7280 (inactive), #3B82F6 (active)
  - Label: 12px, same colors as icon
  - Active indicator: 3px blue bar at top
```

### **Button Components**

#### **Primary Button**
```
Height: 48px
Width: Full width - 32px margins
Background: #030213
Corner Radius: 8px
Text: 16px, #FFFFFF, font-weight: 500
States: Default, Hover, Pressed, Disabled
```

#### **Secondary Button**
```
Height: 48px
Width: Full width - 32px margins
Background: transparent
Border: 2px #030213
Corner Radius: 8px
Text: 16px, #030213, font-weight: 500
```

#### **Icon Button**
```
Size: 44px × 44px
Background: transparent
Icon: 24px, #6B7280
Touch target: minimum 44px
```

### **Input Fields**
```
Height: 48px
Width: Full width - 32px margins
Background: #F3F3F5
Border: 1px transparent (2px #3B82F6 when focused)
Corner Radius: 8px
Padding: 12px 16px
Font: 16px, #111827
Placeholder: 16px, #6B7280
```

### **Card Components**

#### **Progress Card**
```
Height: 120px
Width: Full width - 32px margins
Background: #FFFFFF
Border: 1px #E5E7EB
Corner Radius: 12px
Shadow: 0 2px 8px rgba(0,0,0,0.1)
Padding: 20px
```

#### **Habit Card**
```
Height: 80px
Width: Full width - 32px margins
Background: #FFFFFF
Border: 1px #E5E7EB
Corner Radius: 12px
Padding: 16px
Layout: Icon (left), Content (center), Action (right)
```

### **Progress Elements**

#### **Progress Bar**
```
Height: 8px
Width: Variable
Background: #E5E7EB (track)
Fill: #22C55E (progress)
Corner Radius: 4px
```

#### **Progress Ring**
```
Size: 60px × 60px
Stroke Width: 6px
Background: #E5E7EB
Progress: #22C55E
Center Text: 14px, #111827, font-weight: 500
```

---

## 📊 Chart Placeholders

### **Bar Chart**
```
Height: 120px
Width: Full width - 64px margins
Bars: 7 rectangles (one per day)
Bar Width: 24px
Bar Spacing: 16px
Colors: #3B82F6 (completed), #E5E7EB (incomplete)
Labels: 12px, #6B7280, below bars
```

### **Line Chart**
```
Height: 120px
Width: Full width - 64px margins
Line: 2px stroke, #3B82F6
Points: 6px circles, #3B82F6
Grid: 1px lines, #F3F4F6
Axes: 1px lines, #D1D5DB
```

### **Donut Chart**
```
Size: 100px × 100px
Stroke Width: 12px
Background: #E5E7EB
Segments: Various colors from chart palette
Center: Percentage text, 18px, #111827
```

---

## 🎯 Specific Screen Elements

### **Login Screen**

#### **Logo Section**
```
Height: 120px
Logo: "Habitt" text, 32px, #030213, font-weight: 600
Tagline: "Build Better Habits", 16px, #6B7280
Centered alignment
```

#### **Form Section**
```
Spacing between fields: 16px
Form width: Full width - 32px margins
Submit button: 16px margin top
Link text: 14px, #3B82F6, underline
```

### **Homepage**

#### **Welcome Section**
```
Height: 80px
Greeting: "Good Morning, [Name]!", 20px, #111827
Date: "Today is [Day, Date]", 14px, #6B7280
Left aligned with 16px margins
```

#### **Progress Overview**
```
Height: 100px
Title: "Today's Progress", 16px, #111827, font-weight: 500
Progress text: "8/10 Habits (80%)", 24px, #111827, font-weight: 600
Streak: "🔥 Current Streak: 12 days", 14px, #6B7280
```

### **Profile Screen**

#### **Profile Header**
```
Height: 160px
Avatar: 80px circle, background: #F3F4F6
Name: 24px, #111827, font-weight: 600
Email: 14px, #6B7280
Centered alignment
```

#### **Stats Grid**
```
Grid: 2×2 layout
Each stat:
  - Height: 60px
  - Background: #F9FAFB
  - Corner Radius: 8px
  - Icon: 20px
  - Value: 18px, #111827, font-weight: 600
  - Label: 12px, #6B7280
```

### **Settings/Menu**

#### **Menu Items**
```
Height: 60px
Icon: 24px, left aligned (16px from edge)
Text: 16px, #111827, 16px from icon
Chevron: 16px, right aligned (16px from edge)
Divider: 1px #E5E7EB between items
```

#### **Toggle Switch**
```
Width: 44px
Height: 24px
Background: #E5E7EB (off), #3B82F6 (on)
Thumb: 20px circle, #FFFFFF
Corner Radius: 12px
```

### **Habits Configure**

#### **Habit List Item**
```
Height: 88px
Icon: 32px, left aligned
Content area: Name (16px), Description (14px), Streak (12px)
Status indicator: Right aligned
Action menu: 24px dots icon
```

#### **Add Habit Modal**
```
Width: 343px (full width - 32px)
Background: #FFFFFF
Corner Radius: 16px
Padding: 24px
Shadow: 0 20px 25px rgba(0,0,0,0.15)
```

### **Reports Screen**

#### **Time Period Selector**
```
Height: 40px
Background: #F9FAFB
Border: 1px #E5E7EB
Corner Radius: 8px
Text: 14px, #111827
Dropdown arrow: 16px
```

#### **Stat Card**
```
Height: 80px
Background: gradient or solid color
Corner Radius: 12px
Icon: 24px
Value: 24px, font-weight: 600
Label: 14px
White text for colored backgrounds
```

### **Notifications Screen**

#### **Notification Toggle**
```
Height: 72px
Layout: Icon + Text (left), Toggle (right)
Icon: 24px in colored circle background
Primary text: 16px, #111827
Secondary text: 14px, #6B7280
Toggle: 44px × 24px switch
```

#### **Time Setting**
```
Height: 56px
Time display: 18px, #111827, font-weight: 500
Edit button: 32px × 24px, #3B82F6
Label: 14px, #6B7280
```

---

## 🎨 Color Usage Guide

### **Semantic Colors**
```
Success: #22C55E (completed habits, positive metrics)
Warning: #F59E0B (needs attention, overdue items)
Error: #EF4444 (failed actions, delete buttons)
Info: #3B82F6 (links, active states, primary actions)
Neutral: #6B7280 (secondary text, disabled states)
```

### **Chart Color Palette**
```
Chart 1: #3B82F6 (primary blue)
Chart 2: #10B981 (emerald)
Chart 3: #F59E0B (amber)
Chart 4: #EF4444 (red)
Chart 5: #8B5CF6 (violet)
```

### **State Colors**
```
Default: #FFFFFF (white backgrounds)
Hover: #F9FAFB (light gray)
Active: #3B82F6 (blue)
Disabled: #F3F4F6 (light gray)
Focus: #3B82F6 with 0.1 opacity ring
```

---

## 📏 Spacing System

### **Margins and Padding**
```
Screen margins: 16px (left/right)
Section spacing: 24px (between major sections)
Component spacing: 16px (between related items)
Element spacing: 8px (between small elements)
Text line height: 1.5 (24px for 16px text)
```

### **Grid System**
```
Base unit: 8px
Component heights: multiples of 8px
Spacing increments: 8px, 16px, 24px, 32px, 48px
Icon sizes: 16px, 20px, 24px, 32px
Touch targets: minimum 44px × 44px
```

---

## ⚡ Quick Copy-Paste Elements

### **Common Text Styles**
```
Page Title: 24px, #111827, font-weight: 600
Section Header: 18px, #111827, font-weight: 500
Body Text: 16px, #111827, font-weight: 400
Secondary Text: 14px, #6B7280, font-weight: 400
Caption: 12px, #6B7280, font-weight: 400
Button Text: 16px, #FFFFFF, font-weight: 500
```

### **Shadow Styles**
```
Card Shadow: 0 2px 8px rgba(0,0,0,0.1)
Modal Shadow: 0 20px 25px rgba(0,0,0,0.15)
Button Shadow: 0 1px 2px rgba(0,0,0,0.05)
Floating Shadow: 0 4px 12px rgba(0,0,0,0.15)
```

### **Border Radius**
```
Small: 6px (small buttons, badges)
Medium: 8px (inputs, buttons)
Large: 12px (cards, panels)
XLarge: 16px (modals, major components)
Round: 50% (avatars, circular buttons)
```

This reference guide provides all the exact measurements and specifications needed to create pixel-perfect wireframes in Figma that match your existing Habitt app design system! 🎯