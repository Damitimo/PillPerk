-- Create medications table
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  schedule JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for testing (we can enable it later)
ALTER TABLE medications DISABLE ROW LEVEL SECURITY;

-- Insert some mock data
INSERT INTO medications (user_id, name, dosage, frequency, schedule) VALUES
('mock-user-id', 'Aspirin', '81mg', 'daily', '[{"time": "08:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}]'),
('mock-user-id', 'Lisinopril', '10mg', 'daily', '[{"time": "08:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}]'),
('mock-user-id', 'Metformin', '500mg', 'twice daily', '[{"time": "08:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}, {"time": "20:00", "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]}]');
