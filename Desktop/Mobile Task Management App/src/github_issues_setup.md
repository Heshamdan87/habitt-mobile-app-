# GitHub Issues Setup Commands for Habitt App Lab

> **Complete GitHub CLI commands to set up your repository according to the lab requirements**

## 🚀 Prerequisites

Make sure you have GitHub CLI installed and authenticated:
```bash
# Install GitHub CLI (if not already installed)
# macOS: brew install gh
# Windows: winget install GitHub.CLI
# Linux: See https://github.com/cli/cli/blob/trunk/docs/install_linux.md

# Authenticate with GitHub
gh auth login
```

---

## 🏷️ Step 1: Create Required Labels

Run these commands in your `habit_tracker` repository to create all necessary labels:

```bash
# Navigate to your repository
cd habit_tracker

# Create Priority Labels
gh label create "priority:high" --color "d73a4a" --description "High priority items for MVP"
gh label create "priority:medium" --color "fbca04" --description "Medium priority items for Beta"
gh label create "priority:low" --color "0e8a16" --description "Low priority nice-to-have features"

# Create Type Labels (required by lab)
gh label create "enhancement" --color "a2eeef" --description "New features or functionality"
gh label create "bug" --color "d73a4a" --description "Bug fixes and error corrections"
gh label create "documentation" --color "0075ca" --description "Documentation updates and improvements"
gh label create "question" --color "d876e3" --description "Clarifications or open questions"

# Create Epic Labels
gh label create "epic:authentication" --color "1d76db" --description "Login, signup, user management"
gh label create "epic:dashboard" --color "5319e7" --description "Homepage and main navigation"
gh label create "epic:habits" --color "f9d0c4" --description "Habit management and tracking"
gh label create "epic:analytics" --color "c2e0c6" --description "Reports, charts, progress tracking"
gh label create "epic:settings" --color "fef2c0" --description "App settings and preferences"

# Create Story Point Labels
gh label create "points:1" --color "e1f5fe" --description "1 story point"
gh label create "points:2" --color "b3e5fc" --description "2 story points"
gh label create "points:3" --color "81d4fa" --description "3 story points"
gh label create "points:5" --color "4fc3f7" --description "5 story points"
gh label create "points:8" --color "29b6f6" --description "8 story points"

# Create Status Labels
gh label create "status:ready" --color "0e8a16" --description "Ready for development"
gh label create "status:in-progress" --color "fbca04" --description "Currently being worked on"
gh label create "status:testing" --color "d4c5f9" --description "In testing phase"
gh label create "status:done" --color "0e8a16" --description "Completed and verified"
```

---

## 📋 Step 2: Create Issues for Exercise 2 (Login/Registration)

```bash
# US-001: Account Registration
gh issue create \
  --title "[US-001] As a new user, I want to register with my details so that I can create an account" \
  --body "**User Story:** As a new user, I want to register with my name, email, and password, so that I can create an account and access the habit tracking features.

**Acceptance Criteria:**
- [ ] User can enter full name, email address, and secure password
- [ ] Form validates email format and password strength
- [ ] System creates new user account upon successful submission
- [ ] User receives confirmation of successful registration
- [ ] User is automatically logged in after registration

**Priority:** High
**Story Points:** 5
**Component:** LoginScreen.tsx, SignupScreen.tsx
**Epic:** Authentication

**Notes:**
- Password must meet security requirements (minimum 8 characters)
- Email validation should check for proper format
- Registration form should have clear error messaging" \
  --label "enhancement,priority:high,epic:authentication,points:5"

# US-002: Account Login
gh issue create \
  --title "[US-002] As a returning user, I want to log in with credentials so that I can access my account" \
  --body "**User Story:** As a returning user, I want to log in using my email and password, so that I can access my account and track my habits.

**Acceptance Criteria:**
- [ ] User can enter email and password in login form
- [ ] System validates credentials against stored user data
- [ ] Successful login redirects to main dashboard
- [ ] \"Remember me\" option saves login state
- [ ] Failed login shows appropriate error message

**Priority:** High
**Story Points:** 3
**Component:** LoginScreen.tsx
**Epic:** Authentication

**Notes:**
- Demo account option should be prominently available
- Forgot password functionality for future implementation
- Form should maintain state during validation errors" \
  --label "enhancement,priority:high,epic:authentication,points:3"

# US-003: Error Feedback on Login
gh issue create \
  --title "[US-003] As a user, I want clear error feedback so that I can correct login issues" \
  --body "**User Story:** As a user, I want to receive clear feedback if I enter wrong credentials, so that I know my login attempt was unsuccessful and can correct my input.

**Acceptance Criteria:**
- [ ] Display specific error messages for invalid credentials
- [ ] Show field-level validation for email format
- [ ] Provide helpful guidance for password requirements
- [ ] Clear error messages when user corrects input
- [ ] No sensitive information revealed in error messages

**Priority:** High
**Story Points:** 2
**Component:** LoginScreen.tsx
**Epic:** Authentication

**Notes:**
- Error messages should be user-friendly and actionable
- Consider rate limiting for security
- Maintain accessibility standards for error states" \
  --label "enhancement,priority:high,epic:authentication,points:2"
```

---

## 📋 Step 3: Create Issues for Exercise 3 (Homepage)

```bash
# US-004: View Welcome Message
gh issue create \
  --title "[US-004] As a user, I want to see a personalized welcome message so that I feel recognized" \
  --body "**User Story:** As a user, I want to see a personalized welcome message with my name on the homepage, so that I feel recognized and can confirm I am logged into the correct account.

**Acceptance Criteria:**
- [ ] Display personalized greeting with user's name
- [ ] Show current date and day of week
- [ ] Include motivational quote or daily tip
- [ ] Greeting changes based on time of day (morning, afternoon, evening)
- [ ] Handle cases where user name is not available

**Priority:** Medium
**Story Points:** 2
**Component:** HabitHomepage.tsx
**Epic:** Dashboard

**Notes:**
- Greeting should be contextual to time of day
- Consider internationalization for different locales
- Fallback greeting if user name is missing" \
  --label "enhancement,priority:medium,epic:dashboard,points:2"

# US-005: Display Daily Progress
gh issue create \
  --title "[US-005] As a user, I want to see my daily progress so that I can monitor my performance" \
  --body "**User Story:** As a user, I want to see my daily progress for each habit on the homepage, so that I can easily monitor my current performance.

**Acceptance Criteria:**
- [ ] Show list of all active habits for today
- [ ] Display completion status for each habit (completed/pending)
- [ ] Show progress bars or percentage completion
- [ ] Include quick action buttons for habit completion
- [ ] Update progress in real-time when habits are completed

**Priority:** High
**Story Points:** 5
**Component:** HabitHomepage.tsx
**Epic:** Dashboard

**Notes:**
- Progress indicators should be visually clear
- Quick completion actions should provide immediate feedback
- Consider different habit types (binary, counted, timed)" \
  --label "enhancement,priority:high,epic:dashboard,points:5"

# US-006: View Completed Habits
gh issue create \
  --title "[US-006] As a user, I want to see completed habits so that I can track my achievements" \
  --body "**User Story:** As a user, I want to see a section for completed habits on the homepage, so that I can track what I have already achieved today.

**Acceptance Criteria:**
- [ ] Separate section showing completed habits
- [ ] Visual distinction between completed and pending habits
- [ ] Show completion time for each completed habit
- [ ] Option to undo accidental completions
- [ ] Celebratory feedback for habit completions

**Priority:** Medium
**Story Points:** 3
**Component:** HabitHomepage.tsx
**Epic:** Dashboard

**Notes:**
- Completed habits should provide sense of accomplishment
- Undo functionality should have reasonable time limit
- Consider streak indicators for motivation" \
  --label "enhancement,priority:medium,epic:dashboard,points:3"
```

---

## 📋 Step 4: Create Issues for Exercise 4 (Menu/Navigation)

```bash
# US-007: Access Menu Options
gh issue create \
  --title "[US-007] As a user, I want to access menu options so that I can navigate the app easily" \
  --body "**User Story:** As a user, I want to access a menu with options for configuring my habits, viewing reports, editing my profile, and signing out, so that I can easily navigate to different parts of the app.

**Acceptance Criteria:**
- [ ] Bottom navigation with clear icons and labels
- [ ] Navigation items for Home, Reports, Settings, and Profile
- [ ] Current screen highlighted in navigation
- [ ] Consistent navigation across all screens
- [ ] Touch-friendly sizing for mobile devices

**Priority:** High
**Story Points:** 4
**Component:** HabitNavigation.tsx
**Epic:** Dashboard

**Notes:**
- Navigation should follow mobile best practices
- Icons should be universally understood
- Consider badge indicators for notifications" \
  --label "enhancement,priority:high,epic:dashboard,points:4"

# US-008: Navigate to Profile
gh issue create \
  --title "[US-008] As a user, I want to access my profile so that I can manage my information" \
  --body "**User Story:** As a user, I want to access my profile settings from the navigation, so that I can manage my personal information and account preferences.

**Acceptance Criteria:**
- [ ] Profile tab clearly visible in navigation
- [ ] Profile screen shows current user information
- [ ] Easy return to main app features from profile
- [ ] Profile information is current and accurate
- [ ] Clear visual hierarchy in profile layout

**Priority:** Medium
**Story Points:** 3
**Component:** ProfileScreen.tsx, HabitNavigation.tsx
**Epic:** Dashboard

**Notes:**
- Profile should integrate with overall app theme
- Consider quick settings access from profile
- User avatar or initials for visual recognition" \
  --label "enhancement,priority:medium,epic:dashboard,points:3"

# US-009: Navigate to Habits Configuration
gh issue create \
  --title "[US-009] As a user, I want to access habits configuration so that I can manage my habits" \
  --body "**User Story:** As a user, I want to access the habits configuration page from the navigation, so that I can add, edit, and manage my habits.

**Acceptance Criteria:**
- [ ] Easy access to habit management from main navigation
- [ ] Clear path to add new habits
- [ ] List view of existing habits for editing
- [ ] Intuitive habit organization and categorization
- [ ] Quick actions for common habit management tasks

**Priority:** High
**Story Points:** 4
**Component:** HabitConfigureScreen.tsx, HabitNavigation.tsx
**Epic:** Dashboard

**Notes:**
- Habit management should be intuitive and fast
- Consider different habit types and frequencies
- Bulk operations for multiple habits" \
  --label "enhancement,priority:high,epic:dashboard,points:4"

# US-010: Sign Out from Menu
gh issue create \
  --title "[US-010] As a user, I want to sign out securely so that I can protect my account" \
  --body "**User Story:** As a user, I want to sign out of my account using an option in the settings, so that I can securely log out when I'm finished using the app.

**Acceptance Criteria:**
- [ ] Logout option clearly available in settings
- [ ] Confirmation dialog before logging out
- [ ] All user session data cleared on logout
- [ ] Redirect to login screen after logout
- [ ] Option to clear stored credentials

**Priority:** Medium
**Story Points:** 2
**Component:** SettingsScreen.tsx
**Epic:** Authentication

**Notes:**
- Logout should be secure and complete
- Consider saving draft changes before logout
- Clear indication of logout success" \
  --label "enhancement,priority:medium,epic:authentication,points:2"
```

---

## 📋 Step 5: Create Issues for Exercise 5 (Profile Page)

```bash
# US-011: View Personal Information
gh issue create \
  --title "[US-011] As a user, I want to view my profile information so that I can see my details" \
  --body "**User Story:** As a user, I want to view my saved name, email, and other profile details on my profile page, so that I can see the information I provided during registration.

**Acceptance Criteria:**
- [ ] Display current user name, email, and profile details
- [ ] Show account creation date and basic statistics
- [ ] Clear, readable layout of personal information
- [ ] Privacy-conscious display of sensitive information
- [ ] Profile completeness indicator

**Priority:** Medium
**Story Points:** 2
**Component:** ProfileScreen.tsx
**Epic:** Authentication

**Notes:**
- Profile information should be clearly organized
- Consider privacy settings for information display
- Show relevant account statistics" \
  --label "enhancement,priority:medium,epic:authentication,points:2"

# US-012: Edit Personal Information
gh issue create \
  --title "[US-012] As a user, I want to edit my profile so that I can keep information current" \
  --body "**User Story:** As a user, I want to update my name, email, and other profile details, so that I can keep my information up to date.

**Acceptance Criteria:**
- [ ] Edit form for name, email, and other profile fields
- [ ] Field validation for email format and required fields
- [ ] Save changes functionality with confirmation
- [ ] Cancel option to discard unsaved changes
- [ ] Real-time validation feedback

**Priority:** Medium
**Story Points:** 4
**Component:** ProfileScreen.tsx
**Epic:** Authentication

**Notes:**
- Email changes may require verification
- Form should preserve original values on cancel
- Consider password confirmation for sensitive changes" \
  --label "enhancement,priority:medium,epic:authentication,points:4"

# Continue with remaining issues...
```

---

## 📋 Step 6: Create Project Board

```bash
# Create a new project for the habit tracker
gh project create --title "Habitt Development Sprint" --body "Sprint planning and tracking for the Habitt mobile app"

# Note: You'll need to manually add columns in the GitHub UI:
# 1. 📋 Backlog
# 2. 🚀 Sprint Ready  
# 3. 👩‍💻 In Progress
# 4. 🧪 Testing
# 5. ✅ Done
```

---

## 📋 Step 7: Create Milestones

```bash
# Create milestones for major releases
gh milestone create "MVP Release" --due-date "2025-03-01" --description "Minimum viable product with core authentication and habit tracking features"

gh milestone create "Beta Release" --due-date "2025-04-15" --description "Feature-complete beta version with analytics and full habit management"

gh milestone create "v1.0 Release" --due-date "2025-06-01" --description "Production-ready public release version"
```

---

## 📋 Step 8: Bulk Issue Assignment to Milestones

```bash
# Assign high priority issues to MVP milestone
gh issue edit 1 --milestone "MVP Release"  # US-001
gh issue edit 2 --milestone "MVP Release"  # US-002  
gh issue edit 3 --milestone "MVP Release"  # US-003
gh issue edit 5 --milestone "MVP Release"  # US-005
gh issue edit 7 --milestone "MVP Release"  # US-007
gh issue edit 9 --milestone "MVP Release"  # US-009

# Assign medium priority issues to Beta milestone
gh issue edit 4 --milestone "Beta Release"   # US-004
gh issue edit 6 --milestone "Beta Release"   # US-006
gh issue edit 8 --milestone "Beta Release"   # US-008
gh issue edit 10 --milestone "Beta Release"  # US-010
# Continue for remaining medium priority issues...

# Low priority issues can be assigned to v1.0 or later
```

---

## 📋 Step 9: Add Issues to Project Board

```bash
# Add all issues to the project (you'll need the project number from step 6)
# Replace PROJECT_NUMBER with the actual number from your project URL

gh project item-add PROJECT_NUMBER --id 1  # Add issue #1
gh project item-add PROJECT_NUMBER --id 2  # Add issue #2
# Continue for all issues...

# Or use a loop to add multiple issues:
for i in {1..23}; do
  gh project item-add PROJECT_NUMBER --id $i
done
```

---

## 📋 Step 10: Set Up Automation (Optional)

Create `.github/workflows/project-automation.yml`:

```yaml
name: Project Automation
on:
  issues:
    types: [opened, closed, reopened]
  pull_request:
    types: [opened, closed, reopened]

jobs:
  add-to-project:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/add-to-project@v0.4.0
        with:
          project-url: https://github.com/users/YOUR_USERNAME/projects/PROJECT_NUMBER
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

---

## ✅ Verification Checklist

After running all commands, verify your setup:

- [ ] All 23 user stories created as GitHub issues
- [ ] Proper labels applied to each issue
- [ ] Project board created with appropriate columns
- [ ] Milestones created and assigned to issues
- [ ] Issues added to project board
- [ ] Repository has `issue_template.md` and `product_backlog.md`
- [ ] All issues follow the user story template format
- [ ] Priority and story point labels are correctly assigned

---

## 🎯 Next Steps for Lab Completion

1. **Triage Issues:** Review and adjust priorities based on business needs
2. **Refine Backlog:** Add details to acceptance criteria as needed
3. **Sprint Planning:** Move high-priority issues to "Sprint Ready" column
4. **Start Development:** Begin work on MVP features
5. **Review and Update:** Regular backlog grooming and sprint retrospectives

Your Habitt app repository is now fully set up according to the lab requirements with comprehensive user stories, proper labeling, and project management structure! 🚀