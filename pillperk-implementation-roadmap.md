# Pillperk - Implementation Roadmap & Decision Summary

**Document Date:** November 14, 2025  
**Status:** Ready for Development Planning

---

## 🎯 Quick Reference: Key Decisions

### Technology Stack (Confirmed ✓)
| Component | Decision | Rationale |
|-----------|----------|-----------|
| **Mobile Framework** | React Native with Expo | Single codebase, strong ecosystem, fast MVP development |
| **UI Components** | shadcn-inspired with NativeWind | Tailwind utilities + React Native Paper base components |
| **Backend** | Supabase | PostgreSQL, real-time, auth, storage - all-in-one |
| **Database** | PostgreSQL | Relational data fits medication scheduling well |
| **State Management** | Redux Toolkit or Zustand | Global state for complex medication logic |
| **Push Notifications** | Expo Push Notifications | Easy integration, reliable delivery |
| **Storage** | expo-sqlite + Supabase | Offline-first local storage synced to cloud |

---

## 📋 Product Decisions Summary

### Core Features - Confirmed

#### ✅ Medication Logging
- **Early Logging:** Users CAN log medications before scheduled time (up to 2 hours early)
- **Late Logging:** Tracked separately, doesn't break streak but flagged as "late"
- **Photo Verification:** Self-reported photos for personal records (optional)
  - Photos stored in user's account only
  - NOT shared with accountability partners
  - Stored in Supabase Storage

#### ✅ Streak System
- **Travel/Vacation:** No special handling - users take meds along
- **Streak Protection:** 1 freeze per month to prevent streak break
- **Grace Period:** ±2 hours from scheduled time counts as "on time"

#### ✅ Accountability Partners
- **Privacy:** Partners see adherence status, streaks, achievements
  - NO medication names or details visible
  - NO specific dosage information
  - NO prescription details
- **Limit:** Maximum 5 active partners per user
- **Features:** Encouragement messages, emoji reactions, milestone celebrations

#### ✅ UI/UX for Many Medications
- **10+ Medications:** Vertical scrolling list
- **Organization:** 
  - Collapsible/expandable cards
  - Category grouping (morning/afternoon/evening)
  - Priority sorting
  - Color coding support

---

## 🎨 Design Direction - Confirmed

### Visual Style
**Medical aesthetic with touches of playfulness**
- Clean, professional healthcare design
- Subtle playful accents (streak flames, celebration stars)
- NOT childish or overly cartoon-like
- Color palette: Professional blues/teals with warm accents

### Animations & Celebrations
**Balance excitement with professionalism**
- Small milestones (7 days): Subtle confetti, gentle haptic
- Major milestones (30, 90, 365 days): Full-screen celebration, badge reveal
- All animations under 3 seconds and skippable
- Tone: Encouraging and warm, not juvenile

### Dark Mode
**Supported with smart defaults**
- Auto-detect system preference
- Optional time-based auto-switching
- "Night Mode" with extra-dim colors for bedtime meds
- Full dark theme for all screens

### Profile Pictures
**Optional but encouraged**
- Default: User initials in colored circle
- Upload: Photos visible to accountability partners
- Purpose: Builds trust and connection

---

## 🚀 MVP Feature Priority

### P0 - Must Have (Launch Blockers)
- [ ] Medication setup and scheduling
- [ ] Smart reminders with push notifications
- [ ] One-tap medication logging
- [ ] Streak tracking and visualization
- [ ] Goal setting with custom rewards
- [ ] Accountability partner invites and connections
- [ ] Partner encouragement features
- [ ] Home dashboard with today's medications
- [ ] User onboarding flow
- [ ] Settings and privacy controls

### P1 - Should Have (Launch Window)
- [ ] Achievements and badges system
- [ ] Points and levels
- [ ] Advanced analytics (adherence charts, patterns)
- [ ] Calendar heatmap view
- [ ] Photo medication logging
- [ ] Streak freeze mechanism
- [ ] Late medication tracking

### P2 - Nice to Have (Post-Launch)
- [ ] Partner challenges
- [ ] Exportable adherence reports (PDF)
- [ ] Educational content library
- [ ] Medication interaction warnings
- [ ] Refill reminders

### P3 - Future Phases
- [ ] Healthcare provider portal
- [ ] Apple Health / Google Fit integration
- [ ] Community features beyond 1-to-1
- [ ] Telehealth integration

---

## 📐 Technical Architecture Overview

### Data Flow

```
User Device (React Native + Expo)
    ↓
    ├─→ Local Storage (expo-sqlite)
    │   └─→ Offline-first medication data
    │
    └─→ Supabase Backend
        ├─→ PostgreSQL Database
        │   └─→ Users, Medications, Logs, Streaks, Goals, Partnerships
        │
        ├─→ Realtime Subscriptions
        │   └─→ Partner activity, encouragements, streak updates
        │
        ├─→ Storage
        │   └─→ Medication photos, user avatars
        │
        ├─→ Auth
        │   └─→ Email/password, social login
        │
        └─→ Edge Functions
            └─→ Streak calculations, notification triggers
```

### Key Database Tables

**users** → User profiles, preferences, settings  
**medications** → Medication details, schedules  
**medication_logs** → History of taken/missed medications  
**streaks** → Current and best streaks, freeze availability  
**goals** → User-defined goals and rewards  
**partnerships** → Accountability connections  
**encouragements** → Messages and reactions between partners  
**achievements** → Unlocked badges and milestones  

---

## 🔐 Privacy & Security Requirements

### HIPAA Considerations
- Medication data = Protected Health Information (PHI)
- End-to-end encryption for data transmission (HTTPS/TLS)
- Secure data storage with Supabase (SOC 2 compliant)
- No medication details shared with partners
- User data deletion within 30 days of request

### Privacy by Design
- **Partner Visibility:** Only adherence metrics, no med names
- **Photo Storage:** Private to user, encrypted in Supabase Storage
- **Optional Sharing:** Users control what partners see
- **Anonymous Analytics:** No PII in tracking

---

## 📊 Success Metrics (90-Day Goals)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **Active Users** | 5,000+ DAU | Daily app opens |
| **Adherence Rate** | 70%+ | Medications taken vs. scheduled |
| **Retention** | 70% at 30 days | Users active after 30 days |
| **Streak Engagement** | 60%+ with active streaks | Users with current streak > 0 |
| **Partnerships** | 30%+ have partners | Users with ≥1 active partnership |
| **App Store Rating** | 4.0+ stars | iOS App Store + Google Play |

---

## 🔄 Development Phases

### Phase 1: MVP Foundation (Months 1-3)
**Goal:** Core medication management + basic gamification

**Sprint 1-2: Setup & Infrastructure**
- Supabase setup (database, auth, storage)
- React Native project scaffolding with Expo
- shadcn-inspired component library foundation
- Basic navigation structure

**Sprint 3-4: Medication Management**
- Medication CRUD operations
- Scheduling system
- Push notifications setup
- Logging interface

**Sprint 5-6: Gamification Core**
- Streak tracking logic
- Goal creation and tracking
- Reward system
- Home dashboard

**Sprint 7-8: Accountability & Polish**
- Partner invites and connections
- Encouragement features
- Onboarding flow
- Testing and bug fixes

### Phase 2: Enhanced Engagement (Months 4-6)
- Achievements and badges
- Points and levels
- Advanced analytics
- Photo logging
- Partner challenges
- Settings and customization

### Phase 3: Ecosystem (Month 7+)
- Exportable reports
- Healthcare integrations
- Community features
- Premium features

---

## 🎯 Immediate Next Steps

### Week 1-2: Pre-Development
1. **Technical Setup**
   - [ ] Create Supabase project
   - [ ] Set up GitHub repository
   - [ ] Initialize React Native project with Expo
   - [ ] Install core dependencies (NativeWind, React Native Paper, React Query)

2. **Design**
   - [ ] Create design system documentation (colors, typography, spacing)
   - [ ] Design high-fidelity mockups for key screens:
     - Onboarding flow
     - Home dashboard
     - Medication list
     - Streak visualization
     - Partner dashboard
   - [ ] Create component library in Figma/design tool

3. **Documentation**
   - [ ] API endpoint documentation
   - [ ] Database schema finalization
   - [ ] Component architecture documentation

### Week 3-4: Sprint 1 - Foundation
1. **Backend**
   - [ ] Create database tables in Supabase
   - [ ] Set up authentication flows
   - [ ] Configure Supabase Storage buckets
   - [ ] Write Edge Functions for core logic

2. **Frontend**
   - [ ] Implement navigation structure
   - [ ] Build shadcn-inspired component library:
     - Button, Input, Card, Badge, Dialog
     - Medication card component
     - Streak counter component
   - [ ] Authentication screens (sign up, login)
   - [ ] Basic home screen layout

3. **Testing Setup**
   - [ ] Jest and React Native Testing Library
   - [ ] E2E testing with Detox
   - [ ] CI/CD pipeline (GitHub Actions or Expo EAS)

---

## ⚠️ Open Questions for Team Discussion

### Technical Questions
- [ ] **shadcn Implementation:** Should we use NativeWind exclusively or combine with React Native Paper?
- [ ] **Push Notifications:** Expo Push vs. OneSignal vs. custom FCM/APNs implementation?
- [ ] **Real-time Strategy:** Always-on WebSocket or polling for partner updates?
- [ ] **State Management:** Redux Toolkit vs. Zustand - which fits our complexity better?

### Product Questions  
- [ ] **Community Features:** Add community feed in Phase 2, or stay 1-to-1 only?
- [ ] **Freemium Model:** Launch free or with premium tier from day 1?
- [ ] **Healthcare Partnerships:** Which organizations to approach for beta testing?
- [ ] **FDA Considerations:** Stay as "wellness app" or pursue medical device classification?

### Design Questions
- [ ] **Illustration Style:** Custom illustrations vs. icons only?
- [ ] **Mascot/Character:** Should we have a mascot representing the "streak" concept?
- [ ] **Sound Design:** Do we need custom notification sounds beyond system defaults?

---

## 📞 Stakeholder Contact

**Product Owner:** [TBD]  
**Tech Lead:** [TBD]  
**Design Lead:** [TBD]  
**Healthcare Advisor:** [TBD]  

---

## 📚 Resources & References

### Development
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [NativeWind Docs](https://www.nativewind.dev/)

### Healthcare & Compliance
- [HIPAA Compliance Guide](https://www.hhs.gov/hipaa/index.html)
- [FDA Mobile Medical Apps Guidance](https://www.fda.gov/medical-devices/digital-health-center-excellence/mobile-medical-applications)
- [Medication Adherence Research](https://www.ncbi.nlm.nih.gov/pmc/)

### Design Inspiration
- shadcn/ui component patterns
- Healthcare app design best practices
- Gamification in health apps (case studies)

---

**Last Updated:** November 14, 2025  
**Version:** 1.0  
**Status:** ✅ Ready for Development Kickoff