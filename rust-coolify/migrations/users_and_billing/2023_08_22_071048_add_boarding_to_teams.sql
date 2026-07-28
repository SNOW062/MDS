-- completed mig_056
-- Converted from: 2023_08_22_071048_add_boarding_to_teams.php

-- ALTER TABLE teams
-- Review 2023_08_22_071048_add_boarding_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS show_boarding BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS show_boarding TEXT;

-- ALTER TABLE teams
-- Review 2023_08_22_071048_add_boarding_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS show_boarding BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS show_boarding TEXT;
