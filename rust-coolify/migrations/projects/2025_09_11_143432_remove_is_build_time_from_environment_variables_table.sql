-- completed mig_282
-- Converted from: 2025_09_11_143432_remove_is_build_time_from_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2025_09_11_143432_remove_is_build_time_from_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_build_time TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_build_time BOOLEAN DEFAULT FALSE;

-- ALTER TABLE environment_variables
-- Review 2025_09_11_143432_remove_is_build_time_from_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_build_time TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_build_time BOOLEAN DEFAULT FALSE;
