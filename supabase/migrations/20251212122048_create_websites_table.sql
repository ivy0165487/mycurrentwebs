/*
  # Create websites table

  1. New Tables
    - `websites`
      - `id` (uuid, primary key) - Unique identifier for each website
      - `name` (text) - Name of the website
      - `url` (text) - URL of the website
      - `description` (text) - Brief description of the website
      - `category` (text) - Category/type of website (optional)
      - `image_url` (text) - Screenshot or logo URL (optional)
      - `is_active` (boolean) - Whether the website is currently active
      - `created_at` (timestamptz) - When the record was created
      - `updated_at` (timestamptz) - When the record was last updated

  2. Security
    - Enable RLS on `websites` table
    - Add policies for public read access (since this is a showcase page)
    - Add policies for authenticated users to manage websites
*/

CREATE TABLE IF NOT EXISTS websites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  url text NOT NULL,
  description text DEFAULT '',
  category text DEFAULT 'General',
  image_url text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE websites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active websites"
  ON websites FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all websites"
  ON websites FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert websites"
  ON websites FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update websites"
  ON websites FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete websites"
  ON websites FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_websites_is_active ON websites(is_active);
CREATE INDEX IF NOT EXISTS idx_websites_created_at ON websites(created_at DESC);