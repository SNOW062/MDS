-- completed mig_214
-- Converted from: 2024_10_15_172139_add_is_shared_to_environment_variables.php

-- ALTER TABLE environment_variables
-- Review 2024_10_15_172139_add_is_shared_to_environment_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shared BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shared TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_10_15_172139_add_is_shared_to_environment_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shared BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_shared TEXT;
