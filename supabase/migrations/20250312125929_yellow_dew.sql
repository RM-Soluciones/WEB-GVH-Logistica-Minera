/*
  # Add archived field to job applications

  1. Changes
    - Add `archived` boolean column to job_applications table with default value false
*/

ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;