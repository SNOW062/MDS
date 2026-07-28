-- completed mig_122
-- Converted from: 2023_12_30_134507_add_description_to_environments.php

-- ALTER TABLE environments
-- Review 2023_12_30_134507_add_description_to_environments.php for specific alterations
ALTER TABLE environments ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE environments ADD COLUMN IF NOT EXISTS description TEXT;

-- ALTER TABLE environments
-- Review 2023_12_30_134507_add_description_to_environments.php for specific alterations
ALTER TABLE environments ADD COLUMN IF NOT EXISTS description VARCHAR(255);
ALTER TABLE environments ADD COLUMN IF NOT EXISTS description TEXT;
