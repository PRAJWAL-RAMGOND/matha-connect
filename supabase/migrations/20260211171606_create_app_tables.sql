/*
  # Create Application Tables

  1. New Tables
    - `gallery_items`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, nullable)
      - `type` (text) - 'image' or 'video'
      - `url` (text)
      - `thumbnail_url` (text, nullable)
      - `category` (text) - e.g., 'events', 'temple', 'festivals'
      - `event_date` (date, nullable)
      - `created_at` (timestamptz)
    
    - `branches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `address` (text)
      - `city` (text)
      - `state` (text)
      - `pincode` (text)
      - `phone` (text, nullable)
      - `email` (text, nullable)
      - `latitude` (numeric, nullable)
      - `longitude` (numeric, nullable)
      - `timings` (text, nullable)
      - `created_at` (timestamptz)
    
    - `publications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text, nullable)
      - `description` (text, nullable)
      - `type` (text) - 'book', 'pravachana', 'article'
      - `language` (text)
      - `cover_url` (text, nullable)
      - `file_url` (text, nullable)
      - `published_year` (integer, nullable)
      - `created_at` (timestamptz)
    
    - `quiz_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text, nullable)
      - `created_at` (timestamptz)
    
    - `quiz_questions`
      - `id` (uuid, primary key)
      - `category_id` (uuid, references quiz_categories)
      - `question` (text)
      - `options` (jsonb) - array of options
      - `correct_answer` (integer) - index of correct option
      - `explanation` (text, nullable)
      - `difficulty` (text) - 'easy', 'medium', 'hard'
      - `created_at` (timestamptz)
    
    - `quiz_scores`
      - `id` (uuid, primary key)
      - `user_name` (text)
      - `user_email` (text, nullable)
      - `category_id` (uuid, references quiz_categories)
      - `score` (integer)
      - `total_questions` (integer)
      - `completed_at` (timestamptz)
    
    - `notifications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `message` (text)
      - `type` (text) - 'announcement', 'event', 'seva', 'alert'
      - `priority` (text) - 'low', 'medium', 'high'
      - `link` (text, nullable)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
    
    - `panchanga_data`
      - `id` (uuid, primary key)
      - `date` (date, unique)
      - `tithi` (text)
      - `paksha` (text) - 'Shukla' or 'Krishna'
      - `vaara` (text)
      - `nakshatra` (text)
      - `yoga` (text, nullable)
      - `karana` (text, nullable)
      - `sunrise` (text, nullable)
      - `sunset` (text, nullable)
      - `moonrise` (text, nullable)
      - `moonset` (text, nullable)
      - `rahu_kala` (text, nullable)
      - `special_events` (text[], nullable)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Gallery Items
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  url text NOT NULL,
  thumbnail_url text,
  category text NOT NULL,
  event_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery items are viewable by everyone"
  ON gallery_items FOR SELECT
  TO public
  USING (true);

-- Branches
CREATE TABLE IF NOT EXISTS branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text NOT NULL,
  phone text,
  email text,
  latitude numeric,
  longitude numeric,
  timings text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE branches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Branches are viewable by everyone"
  ON branches FOR SELECT
  TO public
  USING (true);

-- Publications
CREATE TABLE IF NOT EXISTS publications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text,
  description text,
  type text NOT NULL CHECK (type IN ('book', 'pravachana', 'article')),
  language text NOT NULL,
  cover_url text,
  file_url text,
  published_year integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE publications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Publications are viewable by everyone"
  ON publications FOR SELECT
  TO public
  USING (true);

-- Quiz Categories
CREATE TABLE IF NOT EXISTS quiz_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz categories are viewable by everyone"
  ON quiz_categories FOR SELECT
  TO public
  USING (true);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES quiz_categories(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer integer NOT NULL,
  explanation text,
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Quiz questions are viewable by everyone"
  ON quiz_questions FOR SELECT
  TO public
  USING (true);

-- Quiz Scores
CREATE TABLE IF NOT EXISTS quiz_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_email text,
  category_id uuid REFERENCES quiz_categories(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_questions integer NOT NULL,
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz scores"
  ON quiz_scores FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert quiz scores"
  ON quiz_scores FOR INSERT
  TO public
  WITH CHECK (true);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('announcement', 'event', 'seva', 'alert')),
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  link text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active notifications are viewable by everyone"
  ON notifications FOR SELECT
  TO public
  USING (is_active = true);

-- Panchanga Data
CREATE TABLE IF NOT EXISTS panchanga_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  tithi text NOT NULL,
  paksha text NOT NULL CHECK (paksha IN ('Shukla', 'Krishna')),
  vaara text NOT NULL,
  nakshatra text NOT NULL,
  yoga text,
  karana text,
  sunrise text,
  sunset text,
  moonrise text,
  moonset text,
  rahu_kala text,
  special_events text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE panchanga_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Panchanga data is viewable by everyone"
  ON panchanga_data FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_items(category);
CREATE INDEX IF NOT EXISTS idx_gallery_type ON gallery_items(type);
CREATE INDEX IF NOT EXISTS idx_branches_city ON branches(city);
CREATE INDEX IF NOT EXISTS idx_branches_state ON branches(state);
CREATE INDEX IF NOT EXISTS idx_publications_type ON publications(type);
CREATE INDEX IF NOT EXISTS idx_panchanga_date ON panchanga_data(date);
CREATE INDEX IF NOT EXISTS idx_notifications_active ON notifications(is_active);
