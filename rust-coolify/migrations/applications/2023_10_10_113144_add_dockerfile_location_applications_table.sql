-- completed mig_087
-- Converted from: 2023_10_10_113144_add_dockerfile_location_applications_table.php

-- ALTER TABLE applications
-- Review 2023_10_10_113144_add_dockerfile_location_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_location TEXT;

-- ALTER TABLE applications
-- Review 2023_10_10_113144_add_dockerfile_location_applications_table.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_location VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS dockerfile_location TEXT;
