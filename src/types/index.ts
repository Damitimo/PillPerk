export interface User {
  id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  conditions?: string[];
  created_at: string;
  updated_at: string;
  preferences: {
    notifications_enabled: boolean;
    theme: 'light' | 'dark' | 'system';
    grace_period_minutes: number;
  };
}

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice_daily' | 'weekly' | 'custom';
  schedule: Array<{
    time: string;
    days: number[];
  }>;
  color: string;
  notes?: string;
  is_as_needed: boolean;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface MedicationLog {
  id: string;
  medication_id: string;
  user_id: string;
  scheduled_time: string;
  logged_at: string;
  status: 'taken' | 'taken_early' | 'taken_late' | 'skipped';
  skip_reason?: string;
  photo_url?: string;
  created_at: string;
}

export interface Streak {
  id: string;
  user_id: string;
  current_streak: number;
  best_streak: number;
  last_medication_date?: string;
  streak_freezes_available: number;
  streak_freezes_used_this_month: number;
  last_freeze_reset: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  goal_type: 'streak' | 'consistency' | 'community';
  target_value: number;
  target_date?: string;
  reward_description: string;
  status: 'active' | 'completed' | 'abandoned';
  progress: number;
  created_at: string;
  completed_at?: string;
}

export interface Partnership {
  id: string;
  user_id: string;
  partner_id: string;
  status: 'pending' | 'active' | 'declined' | 'removed';
  visibility_settings: {
    show_streak: boolean;
    show_adherence_rate: boolean;
    show_today_status: boolean;
    show_achievements: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Encouragement {
  id: string;
  sender_id: string;
  recipient_id: string;
  message?: string;
  emoji?: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  achievement_name: string;
  description: string;
  unlocked_at: string;
}
