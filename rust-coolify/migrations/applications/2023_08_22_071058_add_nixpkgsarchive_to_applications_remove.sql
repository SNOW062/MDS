-- completed mig_066
-- Converted from: 2023_08_22_071058_add_nixpkgsarchive_to_applications_remove.php

-- ALTER TABLE applications
-- Review 2023_08_22_071058_add_nixpkgsarchive_to_applications_remove.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS nixpkgsarchive TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS nixpkgsarchive VARCHAR(255);

-- ALTER TABLE teams
-- Review 2023_08_22_071058_add_nixpkgsarchive_to_applications_remove.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS nixpkgsarchive TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS nixpkgsarchive VARCHAR(255);
