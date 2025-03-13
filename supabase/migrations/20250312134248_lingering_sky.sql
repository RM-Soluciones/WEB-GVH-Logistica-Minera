/*
  # Create services table

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text, service name)
      - `description` (text, service details)
      - `image_url` (text, service image)
      - `order` (integer, display order)
      - `is_active` (boolean, service visibility)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on services table
    - Add policy for public to view active services
    - Add policy for authenticated users to manage services
*/

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  "order" integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can view active services"
ON services
FOR SELECT
TO anon
USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
ON services
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);