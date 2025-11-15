# Product Requirements Document: Pillperk

## 1. Executive Summary

**Product Name:** Pillperk

**Version:** 1.0

**Date:** November 14, 2025

**Product Owner:** [To be assigned]

**Status:** Draft

### 1.1 Overview
Pillperk is a gamified medication adherence application designed specifically for chronic disease patients who require lifelong medication management. The app combines pill reminders, streak-based gamification, customizable rewards, and peer accountability to transform medication adherence from a mundane task into an engaging, socially-supported experience.

### 1.2 Vision
To improve medication adherence rates among chronic disease patients by making the daily routine of taking medication rewarding, social, and achievement-oriented, ultimately leading to better health outcomes and quality of life.

### 1.3 Success Metrics
- **Primary:** 85%+ medication adherence rate among active users
- Daily active users (DAU) engagement rate of 70%+
- 60%+ of users maintain streaks beyond 30 days
- 40%+ of users actively participate in accountability partnerships
- User retention rate of 75% at 90 days

---

## 2. Problem Statement

### 2.1 Current Challenges
Chronic disease patients face significant barriers to medication adherence:
- **Lack of motivation:** Taking medication daily feels like a chore without immediate positive feedback
- **Forgetting doses:** Busy schedules and routine disruption lead to missed medications
- **Isolation:** Managing chronic conditions can feel lonely without peer support
- **No sense of achievement:** Adherence doesn't provide tangible rewards or recognition
- **Poor long-term engagement:** Traditional reminder apps have low retention rates

### 2.2 Market Opportunity
- 133 million Americans live with chronic diseases requiring daily medication
- Medication non-adherence costs the healthcare system $290 billion annually
- 50% of chronic disease patients don't take medications as prescribed
- Existing medication reminder apps have 30-day retention rates below 40%

---

## 3. Target Audience

### 3.1 Primary Users
**Chronic Disease Patients (Ages 18-65)**
- Living with conditions requiring lifelong medication (diabetes, hypertension, autoimmune diseases, mental health conditions, etc.)
- Tech-savvy enough to use mobile apps daily
- Motivated to improve their health management
- Open to social/gamified health experiences

**User Personas:**

**Persona 1: Sarah, 32 - Type 1 Diabetes**
- Takes 4 medications daily plus insulin
- Works full-time in marketing
- Active on social media, loves achievement-based apps
- Struggles with medication routine when traveling
- Wants to connect with others managing chronic conditions

**Persona 2: Marcus, 48 - Hypertension & High Cholesterol**
- Takes 2 medications daily
- Business executive with irregular schedule
- Competitive personality, motivated by goals
- Previously tried reminder apps but found them boring
- Values accountability and measurable progress

**Persona 3: Emma, 26 - Autoimmune Disease**
- Takes 3 medications daily with complex timing
- Graduate student
- Feels isolated managing chronic condition
- Motivated by community support
- Needs flexible reminders around class schedule

### 3.2 Secondary Users
- Healthcare providers (monitoring patient adherence)
- Family members/caregivers (supporting accountability)

---

## 4. Product Goals & Objectives

### 4.1 Product Goals
1. **Improve Medication Adherence:** Increase daily medication compliance rates by at least 30% compared to baseline
2. **Drive Long-term Engagement:** Achieve 6-month retention rate of 60%+
3. **Build Community:** Create an active peer support network with 40%+ user participation
4. **Positive Health Outcomes:** Enable users to demonstrate improved adherence to healthcare providers

### 4.2 Business Objectives
- Acquire 50,000 active users within first year
- Achieve 4.5+ star rating in app stores
- Partner with 10+ healthcare organizations for pilot programs
- Establish foundation for B2B healthcare partnerships and monetization

---

## 5. Core Features & Requirements

### 5.1 Medication Management

#### 5.1.1 Medication Setup
**Requirements:**
- Users can add multiple medications with the following details:
  - Medication name (searchable database + custom entry)
  - Dosage amount
  - Frequency (daily, twice daily, weekly, custom schedule)
  - Time(s) of day
  - Optional: purpose/condition, side effects, prescribing doctor
- Users can set different schedules for different days (e.g., weekday vs. weekend)
- Support for "as-needed" medications (not tracked in streaks)
- Photo upload capability for pill/bottle identification
- Color coding for medication categories

**Priority:** P0 (Must Have)

#### 5.1.2 Smart Reminders
**Requirements:**
- Push notifications at scheduled medication times
- Customizable reminder types:
  - Single notification at scheduled time
  - Pre-reminder (5, 10, 15, 30 minutes before)
  - Follow-up reminder if not logged (5, 10, 15, 30 minutes after)
- Smart notification frequency (gentle escalation if missed)
- Do Not Disturb mode integration (respect system settings)
- Snooze functionality (5, 10, 15, 30 minutes)
- Different notification sounds/vibration patterns per medication
- Quick action buttons in notification:
  - "Taken" (logs immediately)
  - "Snooze"
  - "Skip with reason"

**Priority:** P0 (Must Have)

#### 5.1.3 Medication Logging
**Requirements:**
- One-tap logging from notification
- Manual logging from app (with timestamp selection for retroactive entries)
- **Early logging:** Allow users to log medications up to 2 hours before scheduled time
  - Use case: Taking medication before travel, early morning appointments, irregular schedule
  - Counts toward streak without penalty
  - Visual indicator showing "taken early"
- Status options:
  - Taken (default)
  - Taken Early (automatic when logged >2 hours before schedule)
  - Skipped with reason (forgot, ran out, felt sick, side effects, etc.)
  - Late (taken but after scheduled time)
- Visual confirmation of logged medication (checkmark, animation)
- Today view showing all medications and their status
- Edit/undo capability for recent logs (within 2 hours)
- Weekly/monthly calendar view of adherence history
- **Photo logging (optional):** Users can attach photo of medication when logging for personal records
  - Photos stored locally or encrypted cloud storage
  - Photos NOT shared with accountability partners
  - Useful for tracking pill appearance, verifying correct medication

**Priority:** P0 (Must Have)

---

### 5.2 Gamification & Streaks

#### 5.2.1 Streak System
**Requirements:**
- **Streak Definition:** Consecutive days of taking all scheduled medications
- Real-time streak counter prominently displayed on home screen
- Streak visualization:
  - Current streak length
  - Best streak (personal record)
  - Calendar heatmap (GitHub-style) showing adherence history
- Streak milestone celebrations:
  - 7 days (1 week)
  - 14 days (2 weeks)
  - 30 days (1 month)
  - 60, 90, 180, 365 days
  - Custom milestones set by user
- Streak protection features:
  - 1 "streak freeze" per month (can miss 1 day without breaking streak)
  - Earned through sustained adherence or completed challenges
- Streak recovery suggestions if broken
- Historical streak data and analytics

**Business Logic:**
- Streak continues if all medications taken within ±2 hours of scheduled time
- Late medications (>2 hours) still count but flag as "late"
- Skipped medications break the streak unless streak freeze is active
- "As-needed" medications don't affect streaks

**Priority:** P0 (Must Have)

#### 5.2.2 Custom Streak Goals
**Requirements:**
- Users can set personal streak goals:
  - Short-term goals (7, 14, 30 days)
  - Long-term goals (90, 180, 365 days)
  - Custom goals with specific dates
- Progress visualization for active goals (progress bar, percentage)
- Multiple concurrent goals supported
- Goal categories:
  - Daily adherence goals
  - Consistency goals (e.g., "take medications within 1 hour of schedule")
  - Community goals (e.g., "support 5 accountability partners")

**Priority:** P0 (Must Have)

#### 5.2.3 Rewards System
**Requirements:**
- Users can define custom rewards for achieving goals:
  - Text-based rewards (e.g., "Buy new book", "Dinner out", "Movie night")
  - No monetary limits or restrictions (user-defined)
  - Reward categories: Personal treats, experiences, rest days, hobbies
- Reward redemption workflow:
  - Notification when goal achieved
  - Reward appears as "unlocked/earned"
  - User manually marks reward as "claimed" when redeemed
- Reward history tracking
- Suggested rewards based on user preferences (optional)
- Ability to stack multiple rewards for major milestones

**Priority:** P0 (Must Have)

#### 5.2.4 Achievements & Badges
**Requirements:**
- Achievement system with unlockable badges:
  - Streak-based: "Week Warrior", "Month Master", "Year Champion"
  - Consistency: "Always On Time", "Perfect Week"
  - Community: "Super Supporter", "Accountability Champion"
  - Special: "Streak Saver", "Early Bird", "Night Owl"
- Badge display on user profile
- Share achievements to accountability partners or social media (optional)
- Achievement notifications with celebratory animations
- Badge collection view with locked/unlocked states and requirements

**Priority:** P1 (Should Have)

#### 5.2.5 Points & Levels
**Requirements:**
- Point system:
  - Points earned for taking medications on time (+10 points)
  - Bonus points for perfect weeks (+50 points)
  - Points for supporting accountability partners (+5 points per encouragement)
- Level progression based on total points:
  - Beginner (0-500 points)
  - Consistent (501-2000 points)
  - Committed (2001-5000 points)
  - Champion (5001-10000 points)
  - Legend (10001+ points)
- Level benefits unlock features or customization options
- Leaderboard (opt-in, anonymous or with username)

**Priority:** P1 (Should Have)

---

### 5.3 Accountability Partnership

#### 5.3.1 Partner System
**Requirements:**
- Users can add accountability partners:
  - Send invitation via unique code, link, email, or phone number
  - Accept/decline partner requests
  - Maximum 5 active partners per user (to maintain meaningful relationships)
- Partner connection types:
  - Mutual accountability (both users support each other)
  - One-way support (supporter doesn't share their data)
- Partner profile displays:
  - Username/nickname
  - Current streak
  - Profile picture (optional)
  - Recent achievements
- Remove/block partners option

**Priority:** P0 (Must Have)

#### 5.3.2 Partner Visibility & Privacy
**Requirements:**
- Granular privacy controls for what partners can see:
  - Streak status (current, best)
  - Medication adherence rate (percentage)
  - Today's status (taken/not taken - no specific medication details)
  - Achievements and badges
  - Goals progress
- Default privacy: Only streak and adherence rate visible
- No medication names/details shared with partners (privacy protection)
- User can customize visibility per partner

**Priority:** P0 (Must Have)

#### 5.3.3 Encouragement & Support Features
**Requirements:**
- Partner interaction methods:
  - Send encouragement messages (pre-written or custom)
  - React with emojis (👏, 🎉, 💪, ❤️, ⭐)
  - Celebrate partner milestones automatically
  - Send reminders if partner's streak at risk (opt-in)
- Encouragement library with suggested messages:
  - "Keep it up! You're doing great!"
  - "Don't break the streak now! You've got this!"
  - "Proud of you for staying consistent!"
  - Custom messages saved for quick access
- Notification when partner sends encouragement
- Weekly partner summary: "Your partners cheered you on X times this week"

**Priority:** P0 (Must Have)

#### 5.3.4 Accountability Dashboard
**Requirements:**
- Dedicated tab showing all accountability partners
- At-a-glance status view:
  - Partner name and current streak
  - Status indicator (on track, missed dose today, streak at risk)
  - Last medication logged time
- Quick action buttons for each partner:
  - Send encouragement
  - View partner profile
  - Message partner
- Streak comparison view (optional, gamified)
- Partner activity feed (recent achievements, milestones)

**Priority:** P1 (Should Have)

#### 5.3.5 Partner Challenges
**Requirements:**
- Create shared challenges with partners:
  - 7-day perfect adherence challenge
  - 30-day consistency challenge
  - Custom challenges with specific goals
- Challenge progress tracking for all participants
- Challenge completion rewards (both participants)
- Challenge history and statistics

**Priority:** P2 (Nice to Have)

---

### 5.4 User Interface & Experience

#### 5.4.1 Design System
**Requirements:**
- Built using **shadcn/ui** component library
- Design principles:
  - Clean, modern, health-focused aesthetic
  - High contrast and readability
  - Accessible (WCAG 2.1 AA compliance)
  - Celebratory and positive tone (not clinical)
- Color palette:
  - Primary: Energetic but calming (suggestions: teal, soft purple, green)
  - Accent: Warm reward colors (gold, orange for achievements)
  - Neutral: Clean backgrounds, readable text
  - Success: Green for completed actions
  - Warning: Yellow/orange for at-risk streaks
  - Error: Red for missed medications
- Typography: Clear, readable fonts optimized for medication names and numbers

**Priority:** P0 (Must Have)

#### 5.4.2 Home Screen / Dashboard
**Requirements:**
- **Top Section:**
  - Current streak counter (large, prominent)
  - Streak flame/fire icon that grows with streak length
  - Progress toward current goal
- **Middle Section:**
  - Today's medications list with status (upcoming, taken, missed)
  - **For users with 10+ medications:**
    - Collapsible medication cards grouped by time of day (Morning, Afternoon, Evening, Night)
    - Priority sorting: Upcoming medications first, then taken, then missed
    - Scroll view with smooth scrolling
    - Quick "Mark All Taken" button for each time category
    - Summary count: "3 of 12 medications taken today"
  - Quick log buttons for each medication
  - Time until next medication
- **Bottom Section:**
  - Quick access to accountability partners (avatars with streak indicators)
  - Recent achievements/encouragement received
- Pull-to-refresh for real-time updates
- Smooth animations for logging medications and celebrating milestones
- Smart loading: Only render visible medication cards, lazy load rest

**Priority:** P0 (Must Have)

#### 5.4.3 Navigation Structure
**Requirements:**
- Bottom navigation bar with 5 tabs:
  1. **Home:** Dashboard with today's medications and streak
  2. **Schedule:** Full medication schedule and calendar view
  3. **Progress:** Streaks, goals, achievements, statistics
  4. **Partners:** Accountability partner dashboard
  5. **Profile:** Settings, medication management, account
- Consistent navigation across all screens
- Badge notifications on tabs when action needed

**Priority:** P0 (Must Have)

#### 5.4.4 Animations & Feedback
**Requirements:**
- Micro-interactions for key actions:
  - Medication logged: Checkmark animation with confetti (on milestones)
  - Streak milestone: Full-screen celebration with achievement badge
  - Encouragement received: Gentle notification with emoji animation
- Loading states with skeleton screens
- Haptic feedback for important actions (iOS/Android)
- Toast notifications for confirmations and errors

**Priority:** P1 (Should Have)

---

### 5.5 Insights & Analytics

#### 5.5.1 Personal Statistics
**Requirements:**
- Adherence rate calculations:
  - Daily, weekly, monthly, all-time
  - Per medication
  - By time of day
- Streak statistics:
  - Current, best, average streak length
  - Streak frequency (how often streaks broken)
  - Total days adherent
- Visualization charts:
  - Line graph: Adherence rate over time
  - Calendar heatmap: Daily adherence patterns
  - Bar chart: Adherence by medication
  - Time analysis: Best/worst times for adherence
- Insights and patterns:
  - "You're most consistent with evening medications"
  - "Your weekend adherence is 15% lower than weekdays"
  - "You're on track to reach your 90-day goal in 23 days"

**Priority:** P1 (Should Have)

#### 5.5.2 Exportable Reports
**Requirements:**
- Generate adherence reports for:
  - Healthcare provider visits
  - Insurance documentation
  - Personal tracking
- Report formats:
  - PDF with charts and statistics
  - CSV data export
  - Shareable link (with privacy controls)
- Report date range selection (custom, last 30/60/90 days, year)
- Professional formatting suitable for clinical settings

**Priority:** P2 (Nice to Have)

---

### 5.6 Onboarding & Education

#### 5.6.1 First-Time User Experience
**Requirements:**
- Welcome flow (3-4 screens):
  1. App introduction and value proposition
  2. Explanation of streak system and gamification
  3. Privacy and data security reassurance
  4. Permission requests (notifications, optional health integrations)
- Medication setup wizard:
  - Add first medication with step-by-step guidance
  - Set first reminder
  - Explain logging process
- First streak goal setup:
  - Suggest starting with 7-day goal
  - Help user define first reward
- Optional: Accountability partner invitation during onboarding
- Tutorial tooltips for key features (dismissible)

**Priority:** P0 (Must Have)

#### 5.6.2 Educational Content
**Requirements:**
- Tips and resources:
  - Importance of medication adherence
  - Strategies for remembering medications
  - Managing side effects
  - Talking to healthcare providers about adherence
- Optional daily tips (can be disabled)
- Resource library (articles, videos)
- Integration with chronic disease support resources

**Priority:** P2 (Nice to Have)

---

### 5.7 Settings & Customization

#### 5.7.1 User Preferences
**Requirements:**
- Notification settings:
  - Enable/disable reminders per medication
  - Customize notification times and frequency
  - Notification sound and vibration preferences
  - Quiet hours
- Display preferences:
  - Theme: Light, dark, auto
  - Color scheme customization
  - Font size
- Streak settings:
  - Streak freeze preferences
  - Late medication grace period (default 2 hours, customizable)
- Privacy settings:
  - Accountability partner visibility controls
  - Data sharing preferences
  - Profile visibility

**Priority:** P0 (Must Have)

#### 5.7.2 Account Management
**Requirements:**
- User profile:
  - Display name/username
  - Profile picture
  - Optional bio
  - Condition(s) being managed (optional, private)
- Account security:
  - Email/password authentication
  - Optional: Biometric login (Face ID, fingerprint)
  - Two-factor authentication
- Data management:
  - Export user data
  - Delete account
- Support:
  - In-app help center
  - Contact support
  - Submit feedback

**Priority:** P0 (Must Have)

---

## 6. Technical Requirements

### 6.1 Platform & Technology Stack

#### 6.1.1 Platforms
- **Mobile:** iOS 15+ and Android 10+
- **Framework:** React Native with Expo
  - Rationale: Single codebase, strong ecosystem, excellent for MVP speed
  - shadcn-inspired components using NativeWind (Tailwind CSS for React Native)
  - React Native Paper for base Material Design components
- Responsive design for tablets

**Priority:** P0 (Must Have)

#### 6.1.2 Frontend
- **Framework:** React Native with Expo (managed workflow for faster development)
- **UI Library:** Custom shadcn-inspired component library built with:
  - NativeWind for Tailwind-style utilities
  - React Native Paper for base components
  - Custom primitives matching shadcn/radix design patterns
- **State Management:** Redux Toolkit or Zustand for global state
- **Local Storage:** 
  - expo-sqlite for offline-first architecture
  - React Query for server state management and caching
- **Real-time Updates:** Supabase Realtime for accountability partner updates
- **Notifications:** Expo Notifications with FCM/APNs

**Priority:** P0 (Must Have)

#### 6.1.3 Backend
- **Primary Backend:** Supabase
  - PostgreSQL database (managed)
  - Supabase Auth for authentication
  - Supabase Realtime for live partner updates
  - Supabase Storage for user photos (medication photos, avatars)
  - Edge Functions for complex business logic (streak calculations, notifications)
- **API:** RESTful API with Supabase PostgREST (auto-generated from database schema)
- **Push Notifications:** 
  - Primary: Expo Push Notification Service
  - Backup: Local notifications scheduled on device
- **File Storage:** Supabase Storage (encrypted) for medication photos and avatars

**Priority:** P0 (Must Have)

#### 6.1.4 Database Schema (PostgreSQL via Supabase)
**Key Tables:**

**users**
- id (uuid, primary key)
- email (text, unique)
- username (text, unique)
- display_name (text)
- avatar_url (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
- preferences (jsonb) - notification settings, theme, etc.

**medications**
- id (uuid, primary key)
- user_id (uuid, foreign key to users)
- name (text)
- dosage (text)
- frequency (text) - daily, twice_daily, weekly, custom
- schedule (jsonb) - array of times: [{time: "08:00", days: [1,2,3,4,5,6,7]}]
- color (text) - for UI coding
- is_as_needed (boolean)
- created_at (timestamp)
- updated_at (timestamp)

**medication_logs**
- id (uuid, primary key)
- medication_id (uuid, foreign key to medications)
- user_id (uuid, foreign key to users)
- scheduled_time (timestamp)
- logged_at (timestamp)
- status (enum) - taken, taken_early, taken_late, skipped
- skip_reason (text, nullable)
- photo_url (text, nullable) - for photo logging
- created_at (timestamp)

**streaks**
- id (uuid, primary key)
- user_id (uuid, foreign key to users)
- current_streak (integer, default 0)
- best_streak (integer, default 0)
- last_medication_date (date)
- streak_freezes_available (integer, default 1)
- streak_freezes_used_this_month (integer, default 0)
- updated_at (timestamp)

**goals**
- id (uuid, primary key)
- user_id (uuid, foreign key to users)
- goal_type (text) - streak, consistency, community
- target_value (integer) - e.g., 30 for 30-day streak
- target_date (date, nullable)
- reward_description (text)
- status (enum) - active, completed, abandoned
- progress (integer)
- created_at (timestamp)
- completed_at (timestamp, nullable)

**partnerships**
- id (uuid, primary key)
- user_id (uuid, foreign key to users)
- partner_id (uuid, foreign key to users)
- status (enum) - pending, active, declined, removed
- permissions (jsonb) - what partner can see
- created_at (timestamp)
- accepted_at (timestamp, nullable)

**encouragements**
- id (uuid, primary key)
- sender_id (uuid, foreign key to users)
- recipient_id (uuid, foreign key to users)
- message_type (enum) - predefined, custom, emoji
- message_content (text)
- created_at (timestamp)
- read_at (timestamp, nullable)

**achievements**
- id (uuid, primary key)
- user_id (uuid, foreign key to users)
- achievement_type (text) - week_warrior, month_master, etc.
- unlocked_at (timestamp)

**Indexes:**
- user_id on all user-related tables
- medication_id on medication_logs
- scheduled_time on medication_logs for query performance
- (user_id, partner_id) compound index on partnerships
- created_at on encouragements for recent activity queries

**Row Level Security (RLS):**
- All tables use Supabase RLS policies
- Users can only read/write their own data
- Partners can read limited data based on permissions
- Accountability features use secure functions to validate permissions

**Priority:** P0 (Must Have)

---

### 6.2 Performance Requirements

- App launch time: <2 seconds
- Medication logging response: <500ms
- Real-time partner updates: <3 seconds
- Offline functionality: Core features work without internet
- Data sync when back online: <10 seconds
- Battery optimization: Minimal background activity
- Notification delivery: 95%+ success rate, <30 second delay

**Priority:** P0 (Must Have)

---

### 6.3 Security & Privacy

#### 6.3.1 Data Protection
**Requirements:**
- End-to-end encryption for user data
- HIPAA compliance considerations:
  - Medication data treated as Protected Health Information (PHI)
  - Secure data storage and transmission (HTTPS/TLS)
  - Business Associate Agreement (BAA) requirements for third-party services
- No medication details shared with accountability partners (only adherence status)
- User data deletion within 30 days of account deletion request
- Anonymous analytics only (no PII in analytics)

**Priority:** P0 (Must Have)

#### 6.3.2 Authentication & Authorization
**Requirements:**
- Secure authentication (OAuth 2.0, JWT)
- Optional biometric authentication
- Session management with secure token storage
- Role-based access control (user, partner, healthcare provider)

**Priority:** P0 (Must Have)

---

### 6.4 shadcn/ui Implementation in React Native

Since shadcn/ui is designed for web React applications, we'll create a shadcn-inspired component library specifically for React Native that maintains the same design principles and aesthetic.

#### 6.4.1 Component Strategy
**Approach:** Create shadcn-inspired component library for React Native

**Core Principles:**
- **Composition over configuration:** Build complex components from simple primitives
- **Accessible by default:** Follow React Native accessibility best practices (screen readers, contrast, touch targets)
- **Customizable:** Easy theming and style overrides using NativeWind utilities
- **Type-safe:** Full TypeScript support for all components
- **Copy-paste friendly:** Components owned by project, not npm dependencies

**Technology Stack:**
- **NativeWind (v4):** Tailwind CSS utilities for React Native styling
- **React Native Reanimated (v3):** Smooth 60fps animations
- **Radix-inspired primitives:** Port Radix UI accessibility patterns to React Native

#### 6.4.2 Key Component Library

**Buttons** (variants: default, destructive, outline, secondary, ghost, link)
**Cards** (medication cards, achievement cards, partner cards)
**Badges** (achievement badges, status indicators, streak counters)
**Dialogs/Modals** (goal creation, medication editing, confirmations)
**Toast/Alerts** (success messages, encouragement notifications)
**Forms** (medication setup, goal creation with validation)
**Progress Bars** (goal progress, adherence rate visualization)
**Avatars** (partner profile pictures with fallback to initials)

#### 6.4.3 Design System

**Color Palette:**
```typescript
colors: {
  primary: '#0EA5E9',      // Sky blue (health/wellness)
  secondary: '#64748B',     // Slate gray
  success: '#22C55E',       // Green (completed actions)
  destructive: '#EF4444',   // Red (missed medications)
  warning: '#F59E0B',       // Amber (at-risk streaks)
  accent: '#FBBF24',        // Gold (achievements/rewards)
  muted: '#F1F5F9',         // Light gray backgrounds
  background: '#FFFFFF',    // White (light mode)
  foreground: '#0F172A',    // Dark text
}
```

**Dark Mode:**
- Automatic system-based switching
- Deeper backgrounds (#0F172A, #1E293B)
- Reduced brightness for night medication logging
- High contrast maintained for readability

**Typography:**
- Headings: Inter/SF Pro (system fonts) - Bold 24px, Semibold 20px
- Body: Regular 16px, Medium 14px
- Small: 12px for labels and metadata
- Line height: 1.5 for readability

**Spacing Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64 (px)
**Border Radius:** sm (4px), md (8px), lg (12px), xl (16px), full (9999px for circles)

#### 6.4.4 Animation Patterns

**Micro-interactions (React Native Reanimated):**
- **Medication Log:** Scale + fade checkmark (200ms ease-out)
- **Streak Milestone:** Confetti burst + bounce counter (500ms spring)
- **Encouragement:** Gentle pulse on badge (300ms ease-in-out)
- **Modal Entry:** Slide up with backdrop fade (250ms ease-out)
- **Toast:** Slide in from top, auto-dismiss after 3s

**Celebration Animations:**
- 7 days: Small confetti, gentle haptic
- 30 days: Full-screen confetti, medium haptic
- 365 days: Fireworks animation, strong haptic

#### 6.4.5 Accessibility Requirements
- Minimum 44x44pt touch targets
- WCAG AA contrast ratios (4.5:1 for text)
- Screen reader labels on all interactive elements
- Haptic feedback for important actions
- Support for system font scaling (up to 200%)
- Keyboard navigation support where applicable

**Priority:** P0 (Must Have)

---

### 6.5 Integrations (Future)

#### 6.5.1 Health Platform Integration
- Apple Health (HealthKit) - medication data writing (P2)
- Google Fit - medication logs (P2)
- Epic MyChart / Patient portals - medication list import (P3)

#### 6.5.2 Healthcare Provider Portal
- Dashboard for providers to monitor patient adherence (P3)
- Secure messaging with patients (P3)
- Adherence reports for clinical decision-making (P3)

---

## 7. User Stories & Use Cases

### 7.1 Core User Stories

**As a chronic disease patient, I want to:**

1. **Set up my medications easily**
   - So that I don't have to manually enter complex schedules
   - Acceptance: Can add a medication with schedule in <2 minutes

2. **Receive timely reminders**
   - So that I never forget to take my medications
   - Acceptance: Receive notifications within 30 seconds of scheduled time

3. **Log my medications quickly**
   - So that I can track my adherence without friction
   - Acceptance: Log medication in 1 tap from notification

4. **See my streak grow**
   - So that I feel motivated to maintain consistency
   - Acceptance: Streak updates immediately after logging medication

5. **Set personal goals and rewards**
   - So that I have meaningful incentives for adherence
   - Acceptance: Can create goal with custom reward in <1 minute

6. **Connect with an accountability partner**
   - So that I have support in managing my condition
   - Acceptance: Can invite and connect with partner via code/link

7. **Encourage my accountability partner**
   - So that I can support them in their health journey
   - Acceptance: Can send encouragement in 2 taps

8. **Track my adherence over time**
   - So that I can see patterns and share progress with my doctor
   - Acceptance: View adherence statistics and export reports

9. **Celebrate my achievements**
   - So that I feel recognized for my consistent effort
   - Acceptance: Receive notifications and badges for milestones

10. **Customize my experience**
    - So that the app fits my schedule and preferences
    - Acceptance: Can modify notification settings, themes, and display options

---

### 7.2 Key Use Cases

#### Use Case 1: Daily Medication Routine
**Actor:** Sarah (Type 1 Diabetes patient)

**Flow:**
1. Sarah wakes up at 7:00 AM
2. Receives notification: "Time for Metformin and Levothyroxine"
3. Taps "Taken" button in notification
4. App logs medications and updates streak
5. Sees celebration animation: "7-day streak! 🔥"
6. Receives encouragement from accountability partner Marcus: "Week 1 done! 💪"
7. Sarah sends encouragement back with 👏 emoji

**Success Criteria:**
- Medications logged within 1 minute
- Streak updated in real-time
- Partner notified of Sarah's milestone

---

#### Use Case 2: Setting a New Goal
**Actor:** Marcus (Hypertension patient)

**Flow:**
1. Marcus opens Progress tab
2. Taps "Set New Goal"
3. Selects "30-Day Streak"
4. Enters custom reward: "Weekend getaway"
5. Sets reminder for goal check-ins
6. Shares goal with accountability partner Sarah (optional)
7. Receives confirmation: "Goal set! Let's do this! 🎯"

**Success Criteria:**
- Goal created and saved
- Progress tracker visible on dashboard
- Partner can see Marcus is working toward goal

---

#### Use Case 3: Streak Recovery
**Actor:** Emma (Autoimmune disease patient)

**Flow:**
1. Emma misses her evening medication due to unexpected work event
2. Wakes up to notification: "Uh oh! Your 14-day streak is at risk!"
3. Opens app to see options:
   - Use streak freeze (available)
   - Start a new streak
4. Emma uses her monthly streak freeze
5. Receives reassurance: "Streak saved! You've got 1 freeze remaining this month."
6. Sets extra reminder for today to stay on track

**Success Criteria:**
- Streak maintained despite missed medication
- User educated about streak freeze limits
- Motivation to continue preserved

---

#### Use Case 4: Healthcare Provider Visit
**Actor:** Sarah preparing for doctor appointment

**Flow:**
1. Sarah's endocrinologist requests adherence data
2. Sarah opens Progress tab → Export Report
3. Selects date range: Last 90 days
4. Generates PDF report showing:
   - 94% overall adherence rate
   - Adherence by medication
   - Adherence calendar heatmap
   - Best streak: 47 days
5. Emails report to doctor's office
6. Doctor reviews at appointment, adjusts treatment plan based on consistent adherence

**Success Criteria:**
- Report generated in <10 seconds
- Professional format suitable for clinical use
- Easy to share securely

---

## 8. Non-Functional Requirements

### 8.1 Usability
- Intuitive UI requiring minimal training
- Accessibility: Support for screen readers, high contrast mode, font scaling
- Multi-language support (initially English, expand to Spanish, Mandarin)
- Error messages clear and actionable

### 8.2 Reliability
- 99.5% uptime for backend services
- Local data persistence prevents data loss
- Graceful degradation when offline
- Automatic conflict resolution for data syncing

### 8.3 Scalability
- Support 100,000+ concurrent users
- Database optimized for read-heavy operations (logging history)
- CDN for static assets
- Horizontal scaling for backend services

### 8.4 Maintainability
- Modular codebase with clear separation of concerns
- Comprehensive documentation (technical, API, user)
- Automated testing: 80%+ code coverage
- CI/CD pipeline for automated deployments

### 8.5 Compliance
- HIPAA compliance for handling health data
- GDPR compliance for EU users
- COPPA compliance (no users under 13)
- App store guidelines (Apple App Store, Google Play)

---

## 9. Constraints & Assumptions

### 9.1 Constraints
- **Budget:** MVP development within [budget TBD]
- **Timeline:** Launch MVP within 6 months
- **Resources:** Team of 4-6 (2 developers, 1 designer, 1 PM, 1 QA)
- **Technology:** Must use shadcn/ui components
- **Regulatory:** Must comply with health data regulations

### 9.2 Assumptions
- Users have smartphones with iOS 15+ or Android 10+
- Users are comfortable with English interface (initially)
- Users have internet connectivity for initial setup and syncing
- Users are motivated to improve medication adherence
- Chronic disease patients will adopt gamification positively
- Peer support model resonates with target audience

---

## 10. Risks & Mitigation Strategies

| Risk | Impact | Likelihood | Mitigation Strategy |
|------|--------|------------|---------------------|
| Low user adoption | High | Medium | Conduct user research, beta testing with target audience; partner with patient advocacy groups |
| HIPAA non-compliance | High | Low | Engage healthcare legal counsel early; conduct security audits; use HIPAA-compliant infrastructure |
| Notification failures | High | Medium | Build robust notification system with fallbacks; allow manual logging; test across devices |
| Users don't engage with gamification | High | Medium | A/B test gamification elements; provide option to disable; focus on intrinsic motivation |
| Privacy concerns with accountability partners | Medium | Medium | Implement granular privacy controls; never share medication details; educate users on privacy features |
| Technical debt from rapid MVP | Medium | High | Allocate 20% of dev time to refactoring; establish code review process; document technical decisions |
| Burnout from maintaining streaks | Medium | Medium | Implement streak freezes; gentle messaging when streaks break; focus on long-term progress not perfection |

---

## 11. Success Criteria & KPIs

### 11.1 Launch Success Criteria (90 days post-launch)
- 10,000+ app downloads
- 5,000+ daily active users
- 70%+ medication adherence rate among active users
- 4.0+ app store rating
- 60%+ 30-day user retention

### 11.2 Key Performance Indicators

**User Engagement:**
- Daily Active Users (DAU)
- Monthly Active Users (MAU)
- Session duration (target: 2-3 minutes per session)
- Sessions per user per day (target: 2-3)

**Medication Adherence:**
- Overall adherence rate (target: 85%+)
- Percentage of users with active streaks (target: 70%+)
- Average streak length (target: 21+ days)
- Percentage of medications logged on time (target: 80%+)

**Gamification Engagement:**
- Goals set per user (target: 2+)
- Goals completed per user per month (target: 1+)
- Achievements unlocked per user (target: 5+ in first 30 days)
- Rewards redeemed per user (target: 1+ per quarter)

**Social/Accountability:**
- Percentage of users with accountability partners (target: 40%+)
- Encouragements sent per week per user (target: 3+)
- Active partnerships (target: 30%+ send weekly encouragements)

**Retention & Satisfaction:**
- 30-day retention rate (target: 70%+)
- 90-day retention rate (target: 60%+)
- 180-day retention rate (target: 50%+)
- Net Promoter Score (target: 50+)
- App store rating (target: 4.5+)

---

## 12. Roadmap & Phasing

### 12.1 Phase 1: MVP (Months 1-6)
**Core Features:**
- Medication setup and management
- Smart reminders and logging
- Streak tracking
- Basic gamification (streaks, goals, rewards)
- Accountability partnerships (invite, connect, encourage)
- Home dashboard and navigation
- User onboarding
- shadcn/ui implementation

**Success Metrics:**
- Launch to app stores
- 5,000+ active users
- 70%+ adherence rate

---

### 12.2 Phase 2: Enhanced Engagement (Months 7-12)
**New Features:**
- Advanced achievements and badges
- Points and levels system
- Partner challenges
- Enhanced analytics and insights
- Weekly/monthly progress reports
- Streak freeze and recovery features
- In-app messaging with partners
- Customization options (themes, colors)

**Success Metrics:**
- 25,000+ active users
- 75%+ adherence rate
- 50%+ users with accountability partners

---

### 12.3 Phase 3: Ecosystem Expansion (Year 2)
**New Features:**
- Healthcare provider portal
- Integration with Apple Health / Google Fit
- Medication list import from pharmacies
- Telehealth integration
- Community forums and support groups
- Advanced reporting for insurance/providers
- Medication interaction warnings
- Refill reminders

**Success Metrics:**
- 100,000+ active users
- 10+ healthcare partnerships
- 80%+ adherence rate

---

### 12.4 Phase 4: Monetization & Scale (Year 3+)
**New Features:**
- Premium subscription tier (advanced analytics, unlimited partners)
- B2B healthcare partnerships (hospital systems, insurance)
- API for third-party integrations
- White-label solution for healthcare organizations
- International expansion
- AI-powered adherence coaching

**Success Metrics:**
- Profitability
- 500,000+ active users
- Enterprise contracts with healthcare systems

---

## 13. Open Questions & Decisions Needed

### 13.1 Product Decisions
- [x] **Should we allow users to log medications taken early (before scheduled time)?**
  - **Decision:** YES - Users can log medications early (e.g., before traveling, irregular schedule)
  - **Implementation:** Allow logging up to 2 hours before scheduled time without penalty
- [x] **What happens to streaks during planned vacations/travel?**
  - **Decision:** Nothing changes - users should take medications with them while traveling
  - **Implementation:** Provide travel tips during onboarding; no "vacation mode" needed
- [x] **Should we have a social feed/community beyond 1-to-1 partnerships?**
  - **Decision:** [NEEDS DECISION] - Consider for Phase 2/3
  - **Note:** Focus on 1-to-1 partnerships for MVP to maintain intimacy and privacy
- [x] **How do we handle users with 10+ daily medications? UI considerations?**
  - **Decision:** Allow scrolling through medication list
  - **Implementation:** Collapsible/expandable medication cards; priority sorting; category grouping (morning/afternoon/evening)
- [x] **Should we allow photo verification of medication intake?**
  - **Decision:** YES - Self-reported photo logging
  - **Implementation:** Optional photo attachment when logging; photos for user's personal records only, not shared with partners
- [x] **What level of medication detail is appropriate for the accountability partner view?**
  - **Decision:** NO medication details visible to partners for privacy
  - **Implementation:** Partners see only: adherence status, streak count, general "on track" indicators

### 13.2 Technical Decisions
- [x] **React Native vs. Flutter vs. Native development?**
  - **Decision:** React Native
  - **Rationale:** Strong ecosystem, easier shadcn adaptation, good performance, single codebase
- [x] **Firebase vs. AWS vs. Supabase for backend?**
  - **Decision:** Supabase
  - **Rationale:** Open-source, PostgreSQL-based, real-time capabilities, built-in auth, cost-effective for MVP
- [x] **How do we implement shadcn in React Native/Flutter environment?**
  - **Decision:** Use React Native Paper or NativeWind (Tailwind for RN) with custom shadcn-inspired components
  - **Implementation:** Create component library matching shadcn design principles (radix-like primitives)
- [x] **Push notification service provider and backup?**
  - **Decision:** [NEEDS DECISION]
  - **Options:** Expo Notifications (RN), OneSignal, or Supabase Edge Functions + FCM/APNs
  - **Backup:** Local notifications as fallback
- [x] **Database: PostgreSQL, MongoDB, or Firestore?**
  - **Decision:** PostgreSQL (via Supabase)
  - **Rationale:** Relational structure fits medication scheduling; strong consistency; Supabase integration
- [x] **Real-time sync strategy for accountability features?**
  - **Decision:** [NEEDS DECISION]
  - **Options:** Supabase Realtime subscriptions for partner updates; WebSocket connections for encouragements
  - **Implementation:** Subscribe to partner streak changes, encouragement messages

### 13.3 Business Decisions
- [x] **Freemium model from launch or fully free MVP?**
  - **Decision:** [NEEDS DECISION - Recommend fully free MVP]
  - **Rationale:** Focus on user acquisition and product-market fit first; introduce premium features in Phase 2
- [x] **Healthcare partnerships for initial pilot users?**
  - **Decision:** [NEEDS DECISION - Recommend yes]
  - **Rationale:** Partnerships with patient advocacy groups, chronic disease organizations for beta testers
- [x] **App store category: Health & Fitness or Medical?**
  - **Decision:** [NEEDS DECISION]
  - **Options:** Health & Fitness (less regulatory burden) vs. Medical (more credibility but FDA considerations)
  - **Recommendation:** Start with Health & Fitness to avoid medical device classification
- [x] **Target marketing channels for chronic disease patients?**
  - **Decision:** [NEEDS DECISION]
  - **Options:** Patient advocacy groups, Reddit health communities, Instagram health influencers, disease-specific forums
- [x] **Should we pursue FDA consideration as medical device software?**
  - **Decision:** [NEEDS DECISION - Recommend NOT for MVP]
  - **Rationale:** Avoid as "clinical decision support" or "medical device" by positioning as wellness/reminder tool; revisit in Phase 3 if pursuing healthcare partnerships

### 13.4 Design Decisions
- [x] **How celebratory should milestone animations be?**
  - **Decision:** Balance excitement with professionalism
  - **Implementation:** 
    - Small milestones (7 days): Subtle confetti animation, gentle haptic
    - Major milestones (30, 90, 365 days): Full-screen celebration with badge reveal, stronger haptic
    - Keep animations under 3 seconds, skippable
    - Tone: Encouraging and warm, not childish
- [x] **Iconography style: Playful vs. serious medical aesthetic?**
  - **Decision:** Medical aesthetic with some playfulness
  - **Implementation:**
    - Primary icons: Clean, professional, recognizable (pills, calendar, charts)
    - Accent elements: Subtle playful touches (streak flame, celebration stars)
    - Color palette: Professional health blues/teals with warm accent colors
    - Avoid cartoon-style or overly juvenile graphics
- [x] **Should avatar/profile pictures be required or optional?**
  - **Decision:** YES - Optional profile pictures
  - **Implementation:** Default to user initials in colored circle; allow photo upload; avatars visible to accountability partners only
- [x] **Dark mode as default for users taking medications at night?**
  - **Decision:** YES - Dark mode support with smart defaults
  - **Implementation:**
    - Detect system preference as default
    - Offer auto-switching based on time of day (optional)
    - Full dark mode theme for all screens
    - Gentle, reduced brightness colors for late-night medication logging
    - Consider "Night Mode" with extra-dim interface for bedtime medications

---

## 14. Appendix

### 14.1 Glossary
- **Adherence:** Taking medications as prescribed by healthcare provider
- **Streak:** Consecutive days of taking all scheduled medications
- **Streak Freeze:** Feature allowing one missed day without breaking streak
- **Accountability Partner:** Another Pillperk user who provides mutual support
- **Gamification:** Application of game-like elements to encourage engagement
- **shadcn/ui:** Open-source component library for building UIs

### 14.2 References
- Medication Adherence Statistics: [CDC, WHO reports]
- Gamification in Healthcare Studies: [Academic research]
- HIPAA Compliance Guidelines: [HHS.gov]
- Mobile Health App Best Practices: [FDA guidance]
- shadcn/ui Documentation: [ui.shadcn.com]

### 14.3 Related Documents
- Technical Architecture Document (TBD)
- API Specification (TBD)
- Design System & Style Guide (TBD)
- User Research Findings (TBD)
- Security & Privacy Assessment (TBD)

---

## 15. Approval & Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | [Name] | [Date] | _______ |
| Engineering Lead | [Name] | [Date] | _______ |
| Design Lead | [Name] | [Date] | _______ |
| Healthcare Advisor | [Name] | [Date] | _______ |

---

**Document Version History:**
- v1.0 - November 14, 2025 - Initial PRD draft created

**Next Steps:**
1. Review and feedback from stakeholders
2. Technical feasibility assessment
3. User research validation
4. Design mockups and prototypes
5. Development sprint planning
6. Beta testing recruitment