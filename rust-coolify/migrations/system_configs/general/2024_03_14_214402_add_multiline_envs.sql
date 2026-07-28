-- completed mig_152
-- Converted from: 2024_03_14_214402_add_multiline_envs.php

-- ALTER TABLE environment_variables
-- Review 2024_03_14_214402_add_multiline_envs.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_03_14_214402_add_multiline_envs.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_03_14_214402_add_multiline_envs.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_03_14_214402_add_multiline_envs.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_multiline TEXT;
