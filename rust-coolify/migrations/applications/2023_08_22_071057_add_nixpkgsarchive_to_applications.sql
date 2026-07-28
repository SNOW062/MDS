-- completed mig_065
-- Converted from: 2023_08_22_071057_add_nixpkgsarchive_to_applications.php

-- ALTER TABLE applications
-- Review 2023_08_22_071057_add_nixpkgsarchive_to_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS nixpkgsarchive VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS nixpkgsarchive TEXT;

-- ALTER TABLE teams
-- Review 2023_08_22_071057_add_nixpkgsarchive_to_applications.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS nixpkgsarchive VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS nixpkgsarchive TEXT;
