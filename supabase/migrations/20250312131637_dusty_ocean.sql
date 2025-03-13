/*
  # Update job applications policies

  1. Changes
    - Add new policies for job_applications table:
      - UPDATE policy for authenticated users
      - DELETE policy for authenticated users
    
  2. Security
    - Maintains RLS enabled
    - Adds granular policies for different operations
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Authenticated users can view applications" ON job_applications;
  DROP POLICY IF EXISTS "Public can submit applications" ON job_applications;
END $$;

-- Enable RLS (if not already enabled)
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Authenticated users can view all applications"
ON job_applications
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Public can submit new applications"
ON job_applications
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Authenticated users can update applications"
ON job_applications
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete applications"
ON job_applications
FOR DELETE
TO authenticated
USING (true);