# Pillperk - Developer Quick Start Guide

**Last Updated:** November 14, 2025  
**Tech Stack:** React Native + Expo + Supabase + NativeWind

---

## 🚀 Quick Setup (30 minutes)

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Studio (for emulators)
- Supabase account
- Git

---

## 📦 Project Setup

### 1. Initialize React Native Project

```bash
# Create new Expo project
npx create-expo-app pillperk --template blank-typescript

cd pillperk

# Install core dependencies
npm install @supabase/supabase-js
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install nativewind
npm install tailwindcss
npm install react-native-paper
npm install @react-native-async-storage/async-storage
npm install expo-notifications
npm install expo-sqlite
npm install @tanstack/react-query
npm install zustand # or redux toolkit
npm install date-fns # for date handling
```

### 2. Configure NativeWind (shadcn-inspired styling)

```bash
# Create tailwind.config.js
npx tailwindcss init
```

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // shadcn-inspired color palette
        border: "hsl(214.3 31.8% 91.4%)",
        input: "hsl(214.3 31.8% 91.4%)",
        ring: "hsl(221.2 83.2% 53.3%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(222.2 84% 4.9%)",
        primary: {
          DEFAULT: "hsl(221.2 83.2% 53.3%)",
          foreground: "hsl(210 40% 98%)",
        },
        secondary: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        accent: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(222.2 47.4% 11.2%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84.2% 60.2%)",
          foreground: "hsl(210 40% 98%)",
        },
        muted: {
          DEFAULT: "hsl(210 40% 96.1%)",
          foreground: "hsl(215.4 16.3% 46.9%)",
        },
        // Custom Pillperk colors
        streak: {
          flame: "hsl(24 95% 58%)", // Orange flame color
          gold: "hsl(45 93% 58%)",
        },
        success: "hsl(142 76% 36%)",
        warning: "hsl(38 92% 50%)",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}
```

**babel.config.js:**
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
  };
};
```

### 3. Set Up Supabase

**Create Supabase project at [supabase.com](https://supabase.com)**

**Create `.env` file:**
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**src/lib/supabase.ts:**
```typescript
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```

---

## 🗄️ Database Schema (SQL)

### Run these in Supabase SQL Editor

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  conditions TEXT[], -- Array of conditions user manages
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{
    "notifications_enabled": true,
    "theme": "system",
    "grace_period_minutes": 120
  }'::JSONB
);

-- Medications table
CREATE TABLE public.medications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL, -- 'daily', 'twice_daily', 'weekly', 'custom'
  schedule JSONB NOT NULL, -- [{time: "08:00", days: [1,2,3,4,5,6,7]}]
  color TEXT DEFAULT '#3B82F6',
  notes TEXT,
  is_as_needed BOOLEAN DEFAULT FALSE,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Medication logs table
CREATE TABLE public.medication_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  medication_id UUID REFERENCES public.medications(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
  logged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT NOT NULL CHECK (status IN ('taken', 'taken_early', 'taken_late', 'skipped')),
  skip_reason TEXT,
  photo_url TEXT, -- Photo proof of medication taken
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Streaks table
CREATE TABLE public.streaks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  last_medication_date DATE,
  streak_freezes_available INTEGER DEFAULT 1,
  streak_freezes_used_this_month INTEGER DEFAULT 0,
  last_freeze_reset DATE DEFAULT CURRENT_DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Goals table
CREATE TABLE public.goals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  goal_type TEXT NOT NULL, -- 'streak', 'consistency', 'community'
  target_value INTEGER NOT NULL,
  target_date DATE,
  reward_description TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Partnerships table (accountability partners)
CREATE TABLE public.partnerships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  partner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'declined', 'removed')),
  visibility_settings JSONB DEFAULT '{
    "show_streak": true,
    "show_adherence_rate": true,
    "show_today_status": true,
    "show_achievements": true
  }'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, partner_id),
  CHECK (user_id != partner_id)
);

-- Encouragements table
CREATE TABLE public.encouragements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  emoji TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements table
CREATE TABLE public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type TEXT NOT NULL,
  achievement_name TEXT NOT NULL,
  description TEXT,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_type)
);

-- Indexes for performance
CREATE INDEX idx_medications_user_id ON public.medications(user_id);
CREATE INDEX idx_medication_logs_user_id ON public.medication_logs(user_id);
CREATE INDEX idx_medication_logs_medication_id ON public.medication_logs(medication_id);
CREATE INDEX idx_medication_logs_scheduled_time ON public.medication_logs(scheduled_time);
CREATE INDEX idx_partnerships_user_id ON public.partnerships(user_id);
CREATE INDEX idx_partnerships_partner_id ON public.partnerships(partner_id);
CREATE INDEX idx_encouragements_recipient_id ON public.encouragements(recipient_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.encouragements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view partner profiles" ON public.profiles
  FOR SELECT USING (
    id IN (
      SELECT partner_id FROM public.partnerships 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Medications policies
CREATE POLICY "Users can manage their own medications" ON public.medications
  FOR ALL USING (auth.uid() = user_id);

-- Medication logs policies
CREATE POLICY "Users can manage their own medication logs" ON public.medication_logs
  FOR ALL USING (auth.uid() = user_id);

-- Streaks policies
CREATE POLICY "Users can view their own streaks" ON public.streaks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" ON public.streaks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Partners can view each other's streaks" ON public.streaks
  FOR SELECT USING (
    user_id IN (
      SELECT partner_id FROM public.partnerships 
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- Partnerships policies
CREATE POLICY "Users can view their partnerships" ON public.partnerships
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = partner_id);

CREATE POLICY "Users can create partnerships" ON public.partnerships
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their partnerships" ON public.partnerships
  FOR UPDATE USING (auth.uid() = user_id OR auth.uid() = partner_id);

-- Encouragements policies
CREATE POLICY "Users can send encouragements" ON public.encouragements
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can view their received encouragements" ON public.encouragements
  FOR SELECT USING (auth.uid() = recipient_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'username',
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 📱 Project Structure

```
pillperk/
├── App.tsx                 # Root component
├── app.json               # Expo config
├── babel.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env                   # Environment variables
│
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn-inspired primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Dialog.tsx
│   │   ├── MedicationCard.tsx
│   │   ├── StreakCounter.tsx
│   │   └── PartnerCard.tsx
│   │
│   ├── screens/          # Screen components
│   │   ├── Home/
│   │   ├── Schedule/
│   │   ├── Progress/
│   │   ├── Partners/
│   │   └── Profile/
│   │
│   ├── navigation/       # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   └── TabNavigator.tsx
│   │
│   ├── lib/             # Utilities and configs
│   │   ├── supabase.ts
│   │   ├── sqlite.ts
│   │   └── notifications.ts
│   │
│   ├── hooks/           # Custom React hooks
│   │   ├── useMedications.ts
│   │   ├── useStreaks.ts
│   │   └── usePartners.ts
│   │
│   ├── store/           # State management
│   │   ├── medicationStore.ts
│   │   └── userStore.ts
│   │
│   ├── services/        # Business logic
│   │   ├── medicationService.ts
│   │   ├── streakService.ts
│   │   └── notificationService.ts
│   │
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   │
│   └── utils/           # Helper functions
│       ├── dateUtils.ts
│       └── streakCalculator.ts
│
└── assets/              # Images, fonts, etc.
```

---

## 🎨 shadcn-Inspired Component Examples

### Button Component

**components/ui/Button.tsx:**
```typescript
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
}: ButtonProps) {
  const baseClasses = 'rounded-md items-center justify-center flex-row';
  
  const variantClasses = {
    default: 'bg-primary',
    destructive: 'bg-destructive',
    outline: 'border-2 border-input bg-transparent',
    ghost: 'bg-transparent',
  };
  
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  };
  
  const textVariantClasses = {
    default: 'text-primary-foreground',
    destructive: 'text-destructive-foreground',
    outline: 'text-foreground',
    ghost: 'text-foreground',
  };
  
  const textSizeClasses = {
    default: 'text-base',
    sm: 'text-sm',
    lg: 'text-lg',
  };

  return (
    <StyledTouchableOpacity
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled || loading ? 'opacity-50' : ''
      }`}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#000' : '#fff'} />
      ) : (
        <StyledText
          className={`font-medium ${textVariantClasses[variant]} ${textSizeClasses[size]}`}
        >
          {children}
        </StyledText>
      )}
    </StyledTouchableOpacity>
  );
}
```

### Card Component

**components/ui/Card.tsx:**
```typescript
import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <StyledView
      className={`bg-white rounded-lg border border-border shadow-sm p-4 ${className}`}
      {...props}
    >
      {children}
    </StyledView>
  );
}

export function CardHeader({ children, className = '', ...props }: CardProps) {
  return (
    <StyledView className={`mb-4 ${className}`} {...props}>
      {children}
    </StyledView>
  );
}

export function CardTitle({ children, className = '', ...props }: CardProps) {
  return (
    <StyledView className={`text-xl font-semibold ${className}`} {...props}>
      {children}
    </StyledView>
  );
}

export function CardContent({ children, className = '', ...props }: CardProps) {
  return (
    <StyledView className={className} {...props}>
      {children}
    </StyledView>
  );
}
```

---

## 🔔 Push Notifications Setup

**src/lib/notifications.ts:**
```typescript
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { supabase } from './supabase';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
    
    // Save token to Supabase
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ push_token: token })
        .eq('id', user.id);
    }
  }

  return token;
}

export async function scheduleMedicationNotification(
  medicationName: string,
  time: Date,
  medicationId: string
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Time for ${medicationName}`,
      body: 'Don\'t forget to take your medication!',
      data: { medicationId, type: 'medication_reminder' },
      sound: true,
    },
    trigger: {
      date: time,
      repeats: true,
    },
  });
}

export async function cancelMedicationNotification(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}
```

---

## 🎯 Streak Calculation Logic

**src/utils/streakCalculator.ts:**
```typescript
import { differenceInDays, startOfDay, isToday, isYesterday } from 'date-fns';

interface MedicationLog {
  scheduled_time: string;
  logged_at: string;
  status: 'taken' | 'taken_early' | 'taken_late' | 'skipped';
}

export function calculateStreak(logs: MedicationLog[]): number {
  if (logs.length === 0) return 0;

  // Sort logs by date descending
  const sortedLogs = logs.sort(
    (a, b) => new Date(b.logged_at).getTime() - new Date(a.logged_at).getTime()
  );

  const today = startOfDay(new Date());
  let currentStreak = 0;
  let currentDate = today;

  // Check if user took medications today or yesterday to maintain streak
  const latestLog = new Date(sortedLogs[0].logged_at);
  if (!isToday(latestLog) && !isYesterday(latestLog)) {
    return 0; // Streak is broken
  }

  // Group logs by date
  const logsByDate = groupLogsByDate(sortedLogs);

  // Calculate streak
  for (const date of Object.keys(logsByDate).sort().reverse()) {
    const dateObj = new Date(date);
    const dayDiff = differenceInDays(currentDate, dateObj);

    if (dayDiff > 1) {
      // Gap in streak
      break;
    }

    const dayLogs = logsByDate[date];
    const allTaken = dayLogs.every(
      (log) => log.status === 'taken' || log.status === 'taken_early' || log.status === 'taken_late'
    );

    if (allTaken) {
      currentStreak++;
      currentDate = startOfDay(dateObj);
    } else {
      break;
    }
  }

  return currentStreak;
}

function groupLogsByDate(logs: MedicationLog[]): Record<string, MedicationLog[]> {
  return logs.reduce((acc, log) => {
    const date = startOfDay(new Date(log.logged_at)).toISOString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {} as Record<string, MedicationLog[]>);
}

export function shouldBreakStreak(lastMedicationDate: Date): boolean {
  const today = startOfDay(new Date());
  const lastDate = startOfDay(lastMedicationDate);
  const daysSinceLastMedication = differenceInDays(today, lastDate);

  return daysSinceLastMedication > 1;
}

export function canUseStreakFreeze(
  freezesAvailable: number,
  freezesUsedThisMonth: number,
  lastFreezeReset: Date
): boolean {
  const today = new Date();
  const lastReset = new Date(lastFreezeReset);

  // Reset monthly freeze count if it's a new month
  if (today.getMonth() !== lastReset.getMonth() || today.getFullYear() !== lastReset.getFullYear()) {
    return freezesAvailable > 0;
  }

  return freezesAvailable > 0 && freezesUsedThisMonth < 1;
}
```

---

## 🧪 Testing Setup

**Install testing dependencies:**
```bash
npm install --save-dev @testing-library/react-native @testing-library/jest-native jest-expo
```

**Example test (components/ui/Button.test.tsx):**
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Click me</Button>);
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress} disabled>
        Click me
      </Button>
    );
    
    fireEvent.press(getByText('Click me'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

---

## 📋 Development Checklist

### Sprint 1 (Weeks 1-2)
- [ ] Initialize project with all dependencies
- [ ] Set up Supabase and create database schema
- [ ] Configure NativeWind and create base component library
- [ ] Implement authentication (sign up, login, logout)
- [ ] Set up navigation structure
- [ ] Create basic profile screen

### Sprint 2 (Weeks 3-4)
- [ ] Medication CRUD operations
- [ ] Medication list screen with add/edit/delete
- [ ] Local SQLite storage for offline support
- [ ] Schedule configuration for medications

### Sprint 3 (Weeks 5-6)
- [ ] Push notification setup and permissions
- [ ] Schedule medication reminders
- [ ] Notification handling (foreground, background)
- [ ] Quick action to log from notification

### Sprint 4 (Weeks 7-8)
- [ ] Medication logging interface
- [ ] Today view with all medications
- [ ] Log medication with timestamp
- [ ] Photo attachment for medication logs

### Sprint 5 (Weeks 9-10)
- [ ] Streak calculation logic
- [ ] Streak counter component
- [ ] Streak visualization (calendar heatmap)
- [ ] Streak freeze feature

### Sprint 6 (Weeks 11-12)
- [ ] Goal creation and management
- [ ] Custom rewards system
- [ ] Goal progress tracking
- [ ] Goal completion celebrations

### Sprint 7 (Weeks 13-14)
- [ ] Partnership invitation system
- [ ] Partner connection and approval
- [ ] Partner dashboard
- [ ] Privacy controls for partner visibility

### Sprint 8 (Weeks 15-16)
- [ ] Encouragement features
- [ ] Partner milestone notifications
- [ ] Realtime updates with Supabase
- [ ] Onboarding flow

### Sprint 9 (Weeks 17-18)
- [ ] Home dashboard polish
- [ ] Settings and customization
- [ ] Dark mode implementation
- [ ] Animations and haptics

### Sprint 10 (Weeks 19-20)
- [ ] Comprehensive testing
- [ ] Bug fixes
- [ ] Performance optimization
- [ ] App store preparation

---

## 🚨 Common Issues & Solutions

### Issue: NativeWind not applying styles
**Solution:** Make sure `babel.config.js` includes the NativeWind plugin and restart Metro bundler

### Issue: Supabase auth not persisting
**Solution:** Ensure AsyncStorage is properly configured in supabase client

### Issue: Push notifications not showing
**Solution:** Check device permissions and ensure notification channel is set up (Android)

### Issue: SQLite errors on iOS
**Solution:** Run `pod install` in ios folder after installing expo-sqlite

---

## 📚 Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [shadcn/ui for inspiration](https://ui.shadcn.com/)

---

**Ready to build Pillperk? Start with Sprint 1 setup! 🚀**