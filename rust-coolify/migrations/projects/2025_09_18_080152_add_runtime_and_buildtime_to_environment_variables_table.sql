-- completed mig_285
-- Converted from: 2025_09_18_080152_add_runtime_and_buildtime_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2025_09_18_080152_add_runtime_and_buildtime_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_runtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;

-- ALTER TABLE environment_variables
-- Review 2025_09_18_080152_add_runtime_and_buildtime_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_runtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;

-- ALTER TABLE environment_variables
-- Review 2025_09_18_080152_add_runtime_and_buildtime_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_runtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;

-- ALTER TABLE environment_variables
-- Review 2025_09_18_080152_add_runtime_and_buildtime_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_runtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_buildtime_only BOOLEAN DEFAULT FALSE;
