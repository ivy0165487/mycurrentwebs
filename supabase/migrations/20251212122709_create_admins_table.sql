/*
  # Create admins table

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email` (text) - Email of admin user
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `admins` table
    - Allow anyone to check if a user is admin (SELECT only)
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can check admin status"
  ON admins FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_admins_email ON admins(email);
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON admins(user_id);
