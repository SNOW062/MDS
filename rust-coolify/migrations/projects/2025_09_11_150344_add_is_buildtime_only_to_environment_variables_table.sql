-- completed mig_283
-- Converted from: 2025_09_11_150344_add_is_buildtime_only_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2025_09_11_150344_add_is_buildtime_only_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;

-- ALTER TABLE environment_variables
-- Review 2025_09_11_150344_add_is_buildtime_only_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;
