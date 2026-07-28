-- completed mig_153
-- Converted from: 2024_03_18_101440_add_version_of_envs.php

-- ALTER TABLE environment_variables
-- Review 2024_03_18_101440_add_version_of_envs.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_03_18_101440_add_version_of_envs.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_03_18_101440_add_version_of_envs.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS version TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_03_18_101440_add_version_of_envs.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version VARCHAR(255);
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS version TEXT;
