/*
  # Add contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `company` (text)
      - `message` (text)
      - `status` (text) - For tracking contact status (new, read, replied)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `contacts` table
    - Add policies for public submission and admin management
*/

CREATE TABLE contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  company text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can submit contact forms"
ON contacts
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contacts"
ON contacts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);