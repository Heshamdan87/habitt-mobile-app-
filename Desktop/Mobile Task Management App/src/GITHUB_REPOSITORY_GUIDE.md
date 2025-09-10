# 📁 GitHub Repository Setup Guide for Habitt Mobile App

> **Complete guide for organizing user stories, wireframes, and development workflow in GitHub**

## 🎯 **Repository Structure Overview**

### **Recommended Folder Organization**
```
habitt-mobile-app/
├── 📁 .github/                    # GitHub-specific files
│   ├── 📄 ISSUE_TEMPLATE.md       # User story issue template
│   ├── 📄 PULL_REQUEST_TEMPLATE.md # PR template
│   └── 📁 workflows/              # GitHub Actions
│       └── 📄 ci.yml              # Continuous integration
├── 📁 docs/                       # Documentation
│   ├── 📄 USER_STORIES.md         # Comprehensive user stories
│   ├── 📄 WIREFRAME_SPECIFICATIONS.md # Design specifications
│   ├── 📄 DEVELOPMENT_GUIDE.md    # Development workflow
│   ├── 📄 API_DOCUMENTATION.md    # API specs
│   └── 📁 wireframes/             # Wireframe files
│       ├── 📄 01_login.png        # Login screen wireframe
│       ├── 📄 02_signup.png       # Signup screen wireframe
│       ├── 📄 03_homepage.png     # Homepage wireframe
│       ├── 📄 04_habit_detail.png # Detail screen wireframe
│       ├── 📄 05_settings_menu.png # Settings menu wireframe
│       ├── 📄 06_settings.png     # Settings screen wireframe
│       ├── 📄 07_reports.png      # Reports wireframe
│       └── 📄 08_notifications.png # Notifications wireframe
├── 📁 design/                     # Design assets
│   ├── 📄 design_system.md        # Design system documentation
│   ├── 📁 figma/                  # Figma design files
│   ├── 📁 assets/                 # Images, icons, logos
│   └── 📁 prototypes/             # Interactive prototypes
├── 📁 components/                 # React components (existing)
├── 📁 styles/                     # CSS and styling (existing)
├── 📁 src/                        # Source code (existing)
├── 📄 README.md                   # Project overview
├── 📄 CONTRIBUTING.md             # Contribution guidelines
├── 📄 LICENSE                     # License information
└── 📄 package.json                # Dependencies (existing)
```

---

## 📋 **GitHub Issues Setup for User Stories**

### **Issue Template for User Stories**

Create `.github/ISSUE_TEMPLATE.md`:

```markdown
---
name: User Story
about: Create a user story for feature development
title: '[US-XXX] As a [user type], I want [goal] so that [benefit]'
labels: 'user-story'
assignees: ''
---

## 📖 User Story

**As a** [user type]  
**I want** [goal/desire]  
**So that** [benefit/value]

## ✅ Acceptance Criteria

- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## 📋 Additional Information

**Priority:** High/Medium/Low  
**Story Points:** [1-13]  
**Epic:** [Epic name if applicable]  
**Dependencies:** [List any dependencies]

## 🎨 Design Requirements

**Wireframe:** [Link to wireframe]  
**Mockup:** [Link to high-fidelity design]  
**Assets Needed:** [List required assets]

## 🧪 Testing Notes

**Test Scenarios:**
- [ ] Happy path testing
- [ ] Error state testing
- [ ] Edge case testing

**Acceptance Test:**
[Describe how to verify this story is complete]

## 📝 Notes

[Any additional context, technical considerations, or notes]
```

### **Creating User Story Issues**

#### **Step 1: Core Authentication Stories**
```bash
# Create issues for authentication features
gh issue create --title "[US-001] As a returning user, I want to log into my account so that I can access my habit data" --body-file .github/user_story_template.md --label "user-story,authentication,high-priority"

gh issue create --title "[US-002] As a user, I want clear error feedback when login fails so that I can correct my input" --body-file .github/user_story_template.md --label "user-story,authentication,error-handling"

gh issue create --title "[US-003] As a new user, I want to access a demo account so that I can explore features" --body-file .github/user_story_template.md --label "user-story,authentication,onboarding"
```

#### **Step 2: Core Dashboard Stories**
```bash
# Create issues for dashboard features
gh issue create --title "[US-006] As a user, I want to see my daily habit overview so that I can assess my progress" --body-file .github/user_story_template.md --label "user-story,dashboard,core-feature"

gh issue create --title "[US-008] As a user, I want visual progress representations so that I can understand my trends" --body-file .github/user_story_template.md --label "user-story,analytics,visualization"
```

#### **Step 3: Settings and Preferences Stories**
```bash
# Create issues for settings features
gh issue create --title "[US-026] As a user, I want to switch themes so that the app is comfortable in different lighting" --body-file .github/user_story_template.md --label "user-story,settings,theming"

gh issue create --title "[US-022] As a user, I want habit reminders so that I don't forget my daily goals" --body-file .github/user_story_template.md --label "user-story,notifications,reminders"
```

---

## 🏷️ **GitHub Labels System**

### **Create Labels via GitHub CLI**
```bash
# Priority Labels
gh label create "priority:high" --color "d73a4a" --description "High priority items"
gh label create "priority:medium" --color "fbca04" --description "Medium priority items"
gh label create "priority:low" --color "0e8a16" --description "Low priority items"

# Feature Area Labels
gh label create "feature:authentication" --color "1d76db" --description "Login, signup, user management"
gh label create "feature:dashboard" --color "5319e7" --description "Homepage and main dashboard"
gh label create "feature:analytics" --color "f9d0c4" --description "Reports, charts, progress tracking"
gh label create "feature:settings" --color "c2e0c6" --description "App settings and preferences"
gh label create "feature:notifications" --color "fef2c0" --description "Reminders and alerts"

# Story Point Labels
gh label create "points:1" --color "e1f5fe" --description "1 story point"
gh label create "points:2" --color "b3e5fc" --description "2 story points"
gh label create "points:3" --color "81d4fa" --description "3 story points"
gh label create "points:5" --color "4fc3f7" --description "5 story points"
gh label create "points:8" --color "29b6f6" --description "8 story points"

# Status Labels
gh label create "status:backlog" --color "7057ff" --description "In product backlog"
gh label create "status:ready" --color "008672" --description "Ready for development"
gh label create "status:in-progress" --color "fbca04" --description "Currently being worked on"
gh label create "status:testing" --color "d4c5f9" --description "In testing phase"
gh label create "status:done" --color "0e8a16" --description "Completed"

# Type Labels
gh label create "type:user-story" --color "0052cc" --description "User story"
gh label create "type:epic" --color "8b0000" --description "Epic (large feature)"
gh label create "type:bug" --color "d73a4a" --description "Bug fix"
gh label create "type:enhancement" --color "a2eeef" --description "Feature enhancement"
```

---

## 🗂️ **GitHub Projects Setup**

### **Create Project Board for Sprint Planning**

#### **Project: Habitt Development Sprint**
```
Columns:
1. 📋 Backlog (Prioritized user stories)
2. 🚀 Sprint Ready (Stories ready for development)
3. 👩‍💻 In Progress (Active development)
4. 🧪 Testing (Code review and testing)
5. ✅ Done (Completed features)
```

#### **Project Views**
1. **Sprint Board:** Kanban view for active sprint
2. **Backlog:** Prioritized list of all user stories
3. **Roadmap:** Timeline view for release planning
4. **Analytics:** Velocity and burndown tracking

### **Milestone Setup**
```bash
# Create milestones for major releases
gh milestone create "MVP Release" --due-date "2025-03-01" --description "Minimum viable product with core features"
gh milestone create "Beta Release" --due-date "2025-04-15" --description "Feature-complete beta version"
gh milestone create "v1.0 Release" --due-date "2025-06-01" --description "Public release version"
```

---

## 🎨 **Wireframe Organization in Repository**

### **Wireframe File Naming Convention**
```
docs/wireframes/
├── 01_login_screen.png              # Login wireframe
├── 01_login_screen_error.png        # Login error states
├── 02_signup_screen.png             # Signup wireframe
├── 02_signup_validation.png         # Signup validation states
├── 03_homepage_dashboard.png        # Main dashboard
├── 03_homepage_empty_state.png      # Empty state for new users
├── 04_habit_detail_view.png         # Individual habit analytics
├── 04_habit_detail_edit.png         # Habit editing interface
├── 05_settings_menu.png             # Settings navigation
├── 06_settings_notifications.png    # Notification settings
├── 06_settings_appearance.png       # Theme and display settings
├── 07_reports_overview.png          # Analytics dashboard
├── 07_reports_detailed.png          # Detailed analytics
├── 08_notifications_center.png      # Notification management
└── 09_user_flow_diagram.png         # Overall user flow
```

### **Figma Integration**

#### **Link Figma Files in Documentation**
```markdown
## 🎨 Design Resources

### Figma Files
- **[Main Design System](https://figma.com/habitt-design-system)** - Component library and tokens
- **[Mobile Wireframes](https://figma.com/habitt-wireframes)** - Low-fidelity wireframes
- **[High-Fidelity Mockups](https://figma.com/habitt-mockups)** - Detailed visual designs
- **[Interactive Prototype](https://figma.com/habitt-prototype)** - Clickable prototype

### Export Settings
- **Format:** PNG for wireframes, SVG for icons
- **Resolution:** 2x for retina displays
- **Naming:** Match file naming convention above
```

---

## 🔄 **Development Workflow Integration**

### **Branch Naming Convention**
```bash
# Feature branches linked to user stories
feature/US-001-user-login
feature/US-006-dashboard-overview
feature/US-022-habit-reminders

# Bug fix branches
bugfix/login-error-handling
bugfix/dashboard-loading-state

# Epic branches for large features
epic/authentication-system
epic/analytics-dashboard
```

### **Commit Message Format**
```bash
# Link commits to user stories
git commit -m "feat(auth): implement user login form [US-001]

- Add login form with email/password fields
- Implement form validation
- Add error state handling
- Connect to authentication service

Closes #1"
```

### **Pull Request Template**
Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## 📋 Description
Brief description of the changes and which user story this addresses.

**Related User Story:** [US-XXX] Link to user story issue
**Type of Change:** Feature / Bug Fix / Enhancement / Documentation

## ✅ Acceptance Criteria Met
- [ ] Acceptance criteria 1
- [ ] Acceptance criteria 2
- [ ] Acceptance criteria 3

## 🧪 Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## 📱 Screenshots
Add screenshots or GIFs showing the feature in action

## 🔗 Related Issues
- Closes #[issue-number]
- Related to #[issue-number]

## 📝 Additional Notes
Any additional context or notes for reviewers
```

---

## 📊 **Progress Tracking and Reporting**

### **Automated Progress Updates**

#### **GitHub Actions for Story Tracking**
Create `.github/workflows/story-tracking.yml`:

```yaml
name: Story Progress Tracking

on:
  issues:
    types: [opened, closed, labeled]
  pull_request:
    types: [opened, merged]

jobs:
  update-progress:
    runs-on: ubuntu-latest
    steps:
      - name: Update Project Board
        uses: alex-page/github-project-automation-plus@v0.8.1
        with:
          project: Habitt Development Sprint
          column: In Progress
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

### **Weekly Progress Reports**

#### **Automated Sprint Reports**
```bash
# Generate weekly progress report
gh issue list --label "status:done" --state closed --json title,number,labels
gh issue list --label "status:in-progress" --state open --json title,number,assignees
```

### **Velocity Tracking**
```markdown
## Sprint Velocity Tracking

| Sprint | Story Points Committed | Story Points Completed | Velocity |
|--------|----------------------|----------------------|----------|
| Sprint 1 | 21 | 18 | 86% |
| Sprint 2 | 24 | 21 | 88% |
| Sprint 3 | 26 | 24 | 92% |

**Average Velocity:** 22 points per sprint
**Trend:** Improving (92% completion rate)
```

---

## 🔧 **Tools and Integrations**

### **Recommended GitHub Integrations**

#### **Design Tools**
- **Figma GitHub Integration:** Automatically sync design changes
- **Zeplin:** Export specifications directly to GitHub
- **Abstract:** Version control for design files

#### **Project Management**
- **GitHub Projects:** Native project management
- **Notion Integration:** Link user stories to detailed requirements
- **Slack Integration:** Notifications for story updates

#### **Development Tools**
- **GitHub Copilot:** AI-assisted coding with story context
- **CodeClimate:** Code quality tracking per story
- **Sentry:** Error tracking linked to user stories

### **Documentation Updates**

#### **Automatic Documentation**
```yaml
# Auto-update documentation when stories are completed
name: Update Documentation
on:
  issues:
    types: [closed]
jobs:
  update-docs:
    if: contains(github.event.issue.labels.*.name, 'user-story')
    runs-on: ubuntu-latest
    steps:
      - name: Update feature documentation
        run: |
          echo "Feature completed: ${{ github.event.issue.title }}" >> CHANGELOG.md
```

---

## 📋 **Quick Start Checklist**

### **Repository Setup**
- [ ] Create repository with proper folder structure
- [ ] Add issue templates for user stories
- [ ] Set up GitHub Projects board
- [ ] Create milestones for major releases
- [ ] Configure GitHub labels
- [ ] Add pull request template

### **User Stories**
- [ ] Create all 39 user stories as GitHub issues
- [ ] Assign story points and priorities
- [ ] Link user stories to corresponding wireframes
- [ ] Organize stories into epics and milestones
- [ ] Set up acceptance criteria for each story

### **Wireframes**
- [ ] Upload all wireframe images to repository
- [ ] Link wireframes in user story issues
- [ ] Create Figma project with all screens
- [ ] Export wireframes in proper formats
- [ ] Document design system and tokens

### **Workflow**
- [ ] Set up branch naming conventions
- [ ] Configure commit message templates
- [ ] Test pull request workflow
- [ ] Set up automated progress tracking
- [ ] Create development guidelines

---

## 🚀 **Next Steps**

1. **Create GitHub Repository** with the recommended structure
2. **Upload Documentation** (USER_STORIES.md, WIREFRAME_SPECIFICATIONS.md)
3. **Set up GitHub Issues** for all user stories
4. **Create Figma Project** with wireframes
5. **Configure Project Board** for sprint planning
6. **Set up Development Workflow** with proper branching
7. **Begin Development** starting with MVP features

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Owner:** Development Team  
**Tools:** GitHub, Figma, GitHub CLI, GitHub Actions