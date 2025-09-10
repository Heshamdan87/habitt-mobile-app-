# Lab User Stories for Habitt Mobile App

> **User stories formatted according to the SkillUp EdTech lab requirements**

---

## Exercise 2: User Stories for Login/Registration Page

### US-001: Account Registration
**Title:** _As a new user, I want to register with my name, email, and password, so that I can create an account and access the habit tracking features._

**Acceptance Criteria:**
1. User can enter full name, email address, and secure password
2. Form validates email format and password strength
3. System creates new user account upon successful submission
4. User receives confirmation of successful registration
5. User is automatically logged in after registration

**Priority:** High
**Story Points:** 5
**Notes:**
- Password must meet security requirements (minimum 8 characters)
- Email validation should check for proper format
- Registration form should have clear error messaging

---

### US-002: Account Login
**Title:** _As a returning user, I want to log in using my email and password, so that I can access my account and track my habits._

**Acceptance Criteria:**
1. User can enter email and password in login form
2. System validates credentials against stored user data
3. Successful login redirects to main dashboard
4. "Remember me" option saves login state
5. Failed login shows appropriate error message

**Priority:** High
**Story Points:** 3
**Notes:**
- Demo account option should be prominently available
- Forgot password functionality for future implementation
- Form should maintain state during validation errors

---

### US-003: Error Feedback on Login
**Title:** _As a user, I want to receive clear feedback if I enter wrong credentials, so that I know my login attempt was unsuccessful and can correct my input._

**Acceptance Criteria:**
1. Display specific error messages for invalid credentials
2. Show field-level validation for email format
3. Provide helpful guidance for password requirements
4. Clear error messages when user corrects input
5. No sensitive information revealed in error messages

**Priority:** High
**Story Points:** 2
**Notes:**
- Error messages should be user-friendly and actionable
- Consider rate limiting for security
- Maintain accessibility standards for error states

---

## Exercise 3: User Stories for Homepage

### US-004: View Welcome Message
**Title:** _As a user, I want to see a personalized welcome message with my name on the homepage, so that I feel recognized and can confirm I am logged into the correct account._

**Acceptance Criteria:**
1. Display personalized greeting with user's name
2. Show current date and day of week
3. Include motivational quote or daily tip
4. Greeting changes based on time of day (morning, afternoon, evening)
5. Handle cases where user name is not available

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Greeting should be contextual to time of day
- Consider internationalization for different locales
- Fallback greeting if user name is missing

---

### US-005: Display Daily Progress
**Title:** _As a user, I want to see my daily progress for each habit on the homepage, so that I can easily monitor my current performance._

**Acceptance Criteria:**
1. Show list of all active habits for today
2. Display completion status for each habit (completed/pending)
3. Show progress bars or percentage completion
4. Include quick action buttons for habit completion
5. Update progress in real-time when habits are completed

**Priority:** High
**Story Points:** 5
**Notes:**
- Progress indicators should be visually clear
- Quick completion actions should provide immediate feedback
- Consider different habit types (binary, counted, timed)

---

### US-006: View Completed Habits
**Title:** _As a user, I want to see a section for completed habits on the homepage, so that I can track what I have already achieved today._

**Acceptance Criteria:**
1. Separate section showing completed habits
2. Visual distinction between completed and pending habits
3. Show completion time for each completed habit
4. Option to undo accidental completions
5. Celebratory feedback for habit completions

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Completed habits should provide sense of accomplishment
- Undo functionality should have reasonable time limit
- Consider streak indicators for motivation

---

## Exercise 4: User Stories for Menu/Navigation

### US-007: Access Menu Options
**Title:** _As a user, I want to access a menu with options for configuring my habits, viewing reports, editing my profile, and signing out, so that I can easily navigate to different parts of the app._

**Acceptance Criteria:**
1. Bottom navigation with clear icons and labels
2. Navigation items for Home, Reports, Settings, and Profile
3. Current screen highlighted in navigation
4. Consistent navigation across all screens
5. Touch-friendly sizing for mobile devices

**Priority:** High
**Story Points:** 4
**Notes:**
- Navigation should follow mobile best practices
- Icons should be universally understood
- Consider badge indicators for notifications

---

### US-008: Navigate to Profile
**Title:** _As a user, I want to access my profile settings from the navigation, so that I can manage my personal information and account preferences._

**Acceptance Criteria:**
1. Profile tab clearly visible in navigation
2. Profile screen shows current user information
3. Easy return to main app features from profile
4. Profile information is current and accurate
5. Clear visual hierarchy in profile layout

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Profile should integrate with overall app theme
- Consider quick settings access from profile
- User avatar or initials for visual recognition

---

### US-009: Navigate to Habits Configuration
**Title:** _As a user, I want to access the habits configuration page from the navigation, so that I can add, edit, and manage my habits._

**Acceptance Criteria:**
1. Easy access to habit management from main navigation
2. Clear path to add new habits
3. List view of existing habits for editing
4. Intuitive habit organization and categorization
5. Quick actions for common habit management tasks

**Priority:** High
**Story Points:** 4
**Notes:**
- Habit management should be intuitive and fast
- Consider different habit types and frequencies
- Bulk operations for multiple habits

---

### US-010: Sign Out from Menu
**Title:** _As a user, I want to sign out of my account using an option in the settings, so that I can securely log out when I'm finished using the app._

**Acceptance Criteria:**
1. Logout option clearly available in settings
2. Confirmation dialog before logging out
3. All user session data cleared on logout
4. Redirect to login screen after logout
5. Option to clear stored credentials

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Logout should be secure and complete
- Consider saving draft changes before logout
- Clear indication of logout success

---

## Exercise 5: User Stories for Profile Page

### US-011: View Personal Information
**Title:** _As a user, I want to view my saved name, email, and other profile details on my profile page, so that I can see the information I provided during registration._

**Acceptance Criteria:**
1. Display current user name, email, and profile details
2. Show account creation date and basic statistics
3. Clear, readable layout of personal information
4. Privacy-conscious display of sensitive information
5. Profile completeness indicator

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Profile information should be clearly organized
- Consider privacy settings for information display
- Show relevant account statistics

---

### US-012: Edit Personal Information
**Title:** _As a user, I want to update my name, email, and other profile details, so that I can keep my information up to date._

**Acceptance Criteria:**
1. Edit form for name, email, and other profile fields
2. Field validation for email format and required fields
3. Save changes functionality with confirmation
4. Cancel option to discard unsaved changes
5. Real-time validation feedback

**Priority:** Medium
**Story Points:** 4
**Notes:**
- Email changes may require verification
- Form should preserve original values on cancel
- Consider password confirmation for sensitive changes

---

### US-013: Save Updated Information
**Title:** _As a user, I want the changes I make to my profile to be saved and persisted, so that my updated details are stored and reflected throughout the app._

**Acceptance Criteria:**
1. Profile changes saved to persistent storage
2. Updated information reflected immediately across app
3. Confirmation message for successful saves
4. Error handling for save failures
5. Automatic save or clear save indication

**Priority:** High
**Story Points:** 3
**Notes:**
- Data persistence should be reliable
- Consider offline capability for profile changes
- Sync with backend if applicable

---

### US-014: Update Name in Header
**Title:** _As a user, I want my updated name to be displayed in the app's header and welcome messages after I change it in the profile, so that my changes are immediately visible._

**Acceptance Criteria:**
1. Name updates reflected in header/welcome messages immediately
2. Consistent name display across all app screens
3. Proper handling of special characters in names
4. Fallback display for empty or invalid names
5. Smooth UI updates without page refreshes

**Priority:** Low
**Story Points:** 2
**Notes:**
- Name updates should propagate through React state
- Consider name display length limits for UI
- Handle edge cases like very long names

---

## Exercise 6: User Stories for Habits Page

### US-015: Add a New Habit
**Title:** _As a user, I want to add new habits with customizable properties, so that I can track activities that are important to my personal development._

**Acceptance Criteria:**
1. Habit creation form with name, description, and frequency
2. Category selection and color customization
3. Goal setting (daily target, frequency, etc.)
4. Icon selection from available library
5. Save new habit and add to active tracking

**Priority:** High
**Story Points:** 6
**Notes:**
- Habit creation should be intuitive and quick
- Consider habit templates for common activities
- Validation for habit name uniqueness

---

### US-016: Delete a Habit
**Title:** _As a user, I want to delete existing habits that I no longer want to track, so that I can keep my habit list current and relevant._

**Acceptance Criteria:**
1. Delete option available for each habit
2. Confirmation dialog before permanent deletion
3. Historical data handling (preserve or delete)
4. Undo option for accidental deletions
5. Clear feedback when habit is deleted

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Consider archiving instead of permanent deletion
- Warn about data loss implications
- Undo should have reasonable time limit

---

### US-017: Personalize Habit with Color and Icon
**Title:** _As a user, I want to assign specific colors and icons to each habit, so that I can easily identify and personalize my habit tracking experience._

**Acceptance Criteria:**
1. Color picker with predefined palette
2. Icon library with relevant symbols
3. Preview of habit appearance during selection
4. Save customization settings per habit
5. Consistent color/icon display throughout app

**Priority:** Low
**Story Points:** 4
**Notes:**
- Color palette should work with light/dark themes
- Icons should be meaningful and recognizable
- Consider accessibility for color-blind users

---

## Exercise 7: User Stories for Reports Page

### US-018: View Weekly Reports
**Title:** _As a user, I want to see a report of my weekly habit progress, so that I can understand how well I am maintaining my habits over time._

**Acceptance Criteria:**
1. Weekly summary showing completion rates
2. Comparison with previous weeks
3. Trend analysis and insights
4. Visual charts and graphs for progress
5. Filter options for specific habits or time periods

**Priority:** High
**Story Points:** 6
**Notes:**
- Charts should be mobile-optimized
- Consider different time period views
- Include actionable insights and recommendations

---

### US-019: Visualize Completed Habits
**Title:** _As a user, I want to see visual charts of my completed habits for each day of the week, so that I can quickly identify patterns in my progress._

**Acceptance Criteria:**
1. Daily completion visualization (calendar, bar chart, etc.)
2. Color-coded completion status
3. Interactive charts with drill-down capability
4. Week-over-week comparison views
5. Export or share chart functionality

**Priority:** Medium
**Story Points:** 5
**Notes:**
- Visualizations should be intuitive and informative
- Consider different chart types for different insights
- Ensure charts work well on mobile devices

---

### US-020: View All Habits Status
**Title:** _As a user, I want to see both completed and incomplete habits in my reports, so that I have a comprehensive view of my habit tracking performance._

**Acceptance Criteria:**
1. Complete overview of all tracked habits
2. Status indicators for completed vs. incomplete
3. Performance metrics and statistics
4. Habit-specific completion rates
5. Recommendations for improvement

**Priority:** Medium
**Story Points:** 4
**Notes:**
- Report should provide actionable insights
- Consider streak information and milestones
- Balance positive reinforcement with improvement areas

---

## Exercise 8: User Stories for Notifications Page

### US-021: Enable/Disable Notifications
**Title:** _As a user, I want to enable or disable notifications for the app, so that I can choose whether or not to receive reminders for my habits._

**Acceptance Criteria:**
1. Master toggle for all notifications
2. Individual habit notification controls
3. System permission handling for notifications
4. Clear indication of notification status
5. Immediate effect when toggling settings

**Priority:** High
**Story Points:** 4
**Notes:**
- Handle system-level notification permissions
- Provide clear explanation of notification benefits
- Respect user privacy and preferences

---

### US-022: Add Habits for Notifications
**Title:** _As a user, I want to select specific habits to receive notifications for, so that I only get reminders for the habits I am actively working on._

**Acceptance Criteria:**
1. List of all habits with notification toggles
2. Bulk selection options for multiple habits
3. Visual indication of which habits have notifications
4. Immediate activation of selected notifications
5. Smart defaults based on habit importance

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Consider habit priority in default selections
- Allow easy bulk changes
- Provide preview of notification experience

---

### US-023: Set Notification Times
**Title:** _As a user, I want to set custom notification times (morning, afternoon, evening) for my selected habits, so that I get timely reminders throughout the day._

**Acceptance Criteria:**
1. Time picker for morning, afternoon, and evening reminders
2. Custom time setting for individual habits
3. Quiet hours configuration (no notifications during sleep)
4. Timezone handling for travelers
5. Preview notification scheduling

**Priority:** Medium
**Story Points:** 5
**Notes:**
- Consider user's typical daily schedule
- Handle timezone changes gracefully
- Provide smart default times based on habit type

---

## 📊 Story Point Summary

| Priority | Total Stories | Total Points |
|----------|---------------|--------------|
| High     | 10            | 42           |
| Medium   | 11            | 38           |
| Low      | 2             | 6            |
| **Total** | **23**       | **86**       |

## 🏷️ Suggested Labels for GitHub Issues

- `enhancement` - New features or functionality
- `bug` - Bug fixes and error corrections
- `documentation` - Documentation updates
- `question` - Clarifications or discussions
- `priority:high` - Critical features for MVP
- `priority:medium` - Important features for beta
- `priority:low` - Nice-to-have features
- `epic:authentication` - Login/signup related
- `epic:dashboard` - Homepage and navigation
- `epic:habits` - Habit management features
- `epic:analytics` - Reports and tracking
- `epic:settings` - Configuration and preferences
- `points:1`, `points:2`, `points:3`, `points:5`, `points:8` - Story point estimation