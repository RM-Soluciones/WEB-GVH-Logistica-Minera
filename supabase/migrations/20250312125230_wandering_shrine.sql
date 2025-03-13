/*
  # Create job vacancies and applications tables

  1. New Tables
    - `job_vacancies`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `requirements` (text)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `job_applications`
      - `id` (uuid, primary key)
      - `vacancy_id` (uuid, foreign key)
      - `first_name` (text)
      - `last_name` (text)
      - `skills` (text)
      - `resume_url` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for public access to vacancies
    - Add policies for authenticated users to manage vacancies
    - Add policies for public users to create applications
    - Add policies for authenticated users to view applications
*/

-- Create job_vacancies table
CREATE TABLE IF NOT EXISTS job_vacancies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  requirements text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vacancy_id uuid REFERENCES job_vacancies(id),
  first_name text NOT NULL,
  last_name text NOT NULL,
  skills text NOT NULL,
  resume_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE job_vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for job_vacancies
CREATE POLICY "Public can view active vacancies"
  ON job_vacancies
  FOR SELECT
  TO anon
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage vacancies"
  ON job_vacancies
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for job_applications
CREATE POLICY "Public can create applications"
  ON job_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (true);