# Figma Quick Reference Card - Habitt App Wireframes

> **Quick copy-paste reference for measurements, colors, and elements while creating wireframes**

## 📐 Standard Measurements

### **Frame Setup**
```
Mobile Frame: 375px × 812px
Status Bar: 375px × 44px
Header: 375px × 60px
Bottom Navigation: 375px × 60px
Content Area: 375px × 648px (total minus header/nav)
```

### **Spacing System**
```
Screen Margins: 16px (left/right)
Content Width: 343px (375 - 32px margins)
Section Gaps: 20px
Element Gaps: 16px
Small Gaps: 12px
Text Line Height: 1.5
```

### **Component Heights**
```
Input Fields: 48px
Buttons: 48px
Habit Cards: 72px
Menu Items: 56px
Progress Cards: 100px-120px
Chart Sections: 140px-160px
Toggle Items: 60px
Profile Avatar: 80px (circle)
```

---

## 🎨 Color Palette (Copy-Paste)

### **Primary Colors**
```css
Primary: #030213
Secondary: #F3F3F5
Background: #FFFFFF
Muted Text: #717182
Input Background: #F3F3F5
Border: rgba(0,0,0,0.1)
```

### **Status Colors**
```css
Success: #22C55E
Warning: #F59E0B
Error: #EF4444
Info: #3B82F6
```

### **Chart Colors**
```css
Chart 1: #646FD4
Chart 2: #22C55E
Chart 3: #F59E0B
Chart 4: #EF4444
Chart 5: #8B5CF6
```

---

## 📝 Typography Scale

### **Text Sizes**
```
Page Title: 24px, weight 600
Section Header: 18px, weight 500
Body Text: 16px, weight 400
Secondary Text: 14px, weight 400
Caption: 12px, weight 400
Button Text: 16px, weight 500
```

### **Font Weights**
```
Normal: 400
Medium: 500
Semi-bold: 600
```

---

## 🔧 Component Specifications

### **Button Styles**
```
Primary Button:
- Size: 343px × 48px
- Background: #030213
- Text: #FFFFFF, 16px, weight 500
- Corner Radius: 8px

Secondary Button:
- Size: 343px × 48px
- Background: transparent
- Border: 2px #030213
- Text: #030213, 16px, weight 500
- Corner Radius: 8px
```

### **Input Fields**
```
Standard Input:
- Size: 343px × 48px
- Background: #F3F3F5
- Border: 1px transparent
- Corner Radius: 8px
- Padding: 12px 16px
- Text: 16px, #030213
- Placeholder: 16px, #717182
```

### **Card Components**
```
Habit Card:
- Size: 343px × 72px
- Background: #FFFFFF
- Border: 1px rgba(0,0,0,0.1)
- Corner Radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.1)
- Padding: 16px

Progress Card:
- Size: 343px × 100px
- Same styling as habit card
- Internal progress bar: height 8px
```

### **Toggle Switches**
```
Toggle Background:
- Size: 44px × 24px
- Corner Radius: 12px
- Off: #E5E7EB
- On: #3B82F6

Toggle Thumb:
- Size: 20px × 20px (circle)
- Color: #FFFFFF
- Position: 2px from edges
```

### **Progress Bars**
```
Track:
- Height: 8px
- Background: #E5E7EB
- Corner Radius: 4px

Fill:
- Height: 8px
- Background: #22C55E (completed)
- Corner Radius: 4px
```

---

## 🎯 Icon Guidelines

### **Icon Sizes**
```
Small Icons: 16px × 16px
Standard Icons: 24px × 24px
Large Icons: 32px × 32px
Profile Avatar: 80px × 80px
App Icon: 48px × 48px
```

### **Common Icons** (Use Text or Figma Icons)
```
🏠 Home
📊 Reports/Analytics
⚙️ Settings
👤 Profile
🔔 Notifications
🏃 Exercise
💧 Water
📚 Reading
🧘 Meditation
✅ Completed
⊕ Add/Plus
◄ Back
► Forward/Next
⋮ More Options
🔄 Refresh
📤 Share
✏️ Edit
🚪 Sign Out
```

---

## 📊 Chart Representations

### **Bar Chart** (Simple Rectangles)
```
Bar Width: 24px
Bar Heights: Variable (represent data)
Bar Spacing: 16px
Colors: Use chart palette
Labels: 12px text below bars
Grid Lines: 1px, #F3F4F6
```

### **Progress Indicators**
```
Circular Progress:
- Outer circle: 60px, stroke 6px, #E5E7EB
- Progress arc: stroke 6px, #22C55E
- Center text: 14px, weight 500

Linear Progress:
- Width: Variable
- Height: 8px
- Background: #E5E7EB
- Fill: #22C55E
```

---

## 🔍 Shadow Effects

### **Standard Shadows**
```
Card Shadow: 0 2px 8px rgba(0,0,0,0.1)
Button Shadow: 0 1px 2px rgba(0,0,0,0.05)
Modal Shadow: 0 20px 25px rgba(0,0,0,0.15)
Floating Shadow: 0 4px 12px rgba(0,0,0,0.15)
```

---

## 📱 Screen-Specific Elements

### **Login Screen**
```
Logo Section: 120px height
Form Container: 343px width, centered
Input Spacing: 16px vertical gap
Button Margin: 24px top margin
Link Text: 14px, #3B82F6
```

### **Homepage**
```
Greeting: 20px, #030213
Date: 14px, #717182
Progress Card: 343px × 100px
Habit Cards: 343px × 72px, 12px gaps
Add Button: Centered, 16px font
```

### **Detail Screen**
```
Header: 60px with back button
Icon Section: 80px height
Stats Grid: 2×3 layout
Chart Area: 343px × 140px
Action Buttons: 2×2 grid, 8px gaps
```

### **Reports Screen**
```
Time Picker: 343px × 40px
Overview Card: 343px × 120px
Chart Section: 343px × 160px
Performance List: 16px vertical gaps
```

### **Notifications**
```
Master Toggle: 343px × 60px
Time Settings: 343px × 56px each
Habit Toggles: 343px × 56px each
Section Headers: 18px, #030213
```

---

## ⚡ Quick Creation Steps

### **1. Setup Frame**
1. Press `F` for Frame tool
2. Create 375×812px frame
3. Add #FFFFFF background
4. Name frame (e.g., "01_Login_Screen")

### **2. Add Header**
1. Rectangle: 375×60px at top
2. Background: #FFFFFF
3. Border bottom: 1px, rgba(0,0,0,0.1)
4. Add back arrow and title text

### **3. Create Button**
1. Rectangle: 343×48px
2. Background: #030213
3. Corner radius: 8px
4. Add text: 16px, #FFFFFF, weight 500
5. Center align text

### **4. Add Input Field**
1. Rectangle: 343×48px
2. Background: #F3F3F5
3. Corner radius: 8px
4. Add placeholder text: 16px, #717182

### **5. Make Toggle Switch**
1. Rectangle: 44×24px, corner radius 12px
2. Background: #3B82F6 (on) or #E5E7EB (off)
3. Circle: 20×20px, #FFFFFF
4. Position circle at appropriate edge

---

## 📋 Export Settings

### **For Evidence Screenshots**
```
Format: PNG
Resolution: 2x
Include: Multiple frames in selection
Quality: High
Naming: figma-evidence1.png, figma-evidence2.png
```

---

## ✅ Quality Checklist

### **Before Export**
- [ ] All text is readable (minimum 14px)
- [ ] Touch targets minimum 44px
- [ ] Consistent spacing throughout
- [ ] Colors match specification
- [ ] All interactive elements clearly indicated
- [ ] Visual hierarchy clear
- [ ] Frames properly named
- [ ] Components aligned to 8px grid

**This reference card contains everything needed to create pixel-perfect Habitt app wireframes in Figma!** 🎯