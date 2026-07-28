-- completed mig_163
-- Converted from: 2024_04_15_094703_add_literal_variables.php

-- ALTER TABLE environment_variables
-- Review 2024_04_15_094703_add_literal_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_04_15_094703_add_literal_variables.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_04_15_094703_add_literal_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;

-- ALTER TABLE shared_environment_variables
-- Review 2024_04_15_094703_add_literal_variables.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal BOOLEAN DEFAULT FALSE;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS is_literal TEXT;
