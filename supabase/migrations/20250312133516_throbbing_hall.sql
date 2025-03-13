/*
  # Add RLS policies for contacts table

  1. Security
    - Enable RLS on contacts table (if not already enabled)
    - Add policy for public contact form submissions
    - Add policy for authenticated users to manage contacts
*/

-- Enable RLS (if not already enabled)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Public can submit contact forms" ON contacts;
  DROP POLICY IF EXISTS "Authenticated users can manage contacts" ON contacts;
END $$;

-- Create new policies
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