-- completed mig_036
-- Converted from: 2023_06_23_114131_change_env_var_value_length.php

-- ALTER TABLE environment_variables
-- Review 2023_06_23_114131_change_env_var_value_length.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS value TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS value VARCHAR(255);

-- ALTER TABLE environment_variables
-- Review 2023_06_23_114131_change_env_var_value_length.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS value TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS value VARCHAR(255);
