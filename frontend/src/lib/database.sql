-- =============================================
-- SMART BILL — DATABASE TABLES (SAFE VERSION)
-- Drops policies first to avoid duplicate errors
-- =============================================


-- 1. USER PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  disco TEXT,
  consumer_number TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. BILLS
CREATE TABLE IF NOT EXISTS bills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  units INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  disco TEXT,
  entry_type TEXT DEFAULT 'manual',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. APPLIANCES
CREATE TABLE IF NOT EXISTS appliances (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT,
  technology TEXT,
  capacity TEXT,
  age TEXT,
  daily_hours DECIMAL(4,1),
  wattage INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. SAVINGS GOALS
CREATE TABLE IF NOT EXISTS savings_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  target_amount INTEGER NOT NULL,
  target_units INTEGER,
  month TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. PREDICTIONS
CREATE TABLE IF NOT EXISTS predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  month TEXT NOT NULL,
  predicted_units INTEGER,
  predicted_amount INTEGER,
  confidence TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);


-- =============================================
-- ENABLE ROW LEVEL SECURITY
-- =============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE appliances ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;


-- =============================================
-- DROP OLD POLICIES (to avoid duplicate errors)
-- =============================================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

DROP POLICY IF EXISTS "Users can view own bills" ON bills;
DROP POLICY IF EXISTS "Users can insert own bills" ON bills;
DROP POLICY IF EXISTS "Users can update own bills" ON bills;
DROP POLICY IF EXISTS "Users can delete own bills" ON bills;

DROP POLICY IF EXISTS "Users can view own appliances" ON appliances;
DROP POLICY IF EXISTS "Users can insert own appliances" ON appliances;
DROP POLICY IF EXISTS "Users can update own appliances" ON appliances;
DROP POLICY IF EXISTS "Users can delete own appliances" ON appliances;

DROP POLICY IF EXISTS "Users can view own goals" ON savings_goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON savings_goals;
DROP POLICY IF EXISTS "Users can update own goals" ON savings_goals;
DROP POLICY IF EXISTS "Users can delete own goals" ON savings_goals;

DROP POLICY IF EXISTS "Users can view own predictions" ON predictions;
DROP POLICY IF EXISTS "Users can insert own predictions" ON predictions;


-- =============================================
-- CREATE POLICIES
-- =============================================

-- Profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Bills
CREATE POLICY "Users can view own bills" ON bills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own bills" ON bills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own bills" ON bills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own bills" ON bills FOR DELETE USING (auth.uid() = user_id);

-- Appliances
CREATE POLICY "Users can view own appliances" ON appliances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own appliances" ON appliances FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own appliances" ON appliances FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own appliances" ON appliances FOR DELETE USING (auth.uid() = user_id);

-- Savings Goals
CREATE POLICY "Users can view own goals" ON savings_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON savings_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON savings_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON savings_goals FOR DELETE USING (auth.uid() = user_id);

-- Predictions
CREATE POLICY "Users can view own predictions" ON predictions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own predictions" ON predictions FOR INSERT WITH CHECK (auth.uid() = user_id);


-- =============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
