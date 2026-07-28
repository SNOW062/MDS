-- completed mig_135
-- Converted from: 2024_01_29_072322_change_env_variable_length.php

-- ALTER TABLE shared_environment_variables
-- Review 2024_01_29_072322_change_env_variable_length.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS value TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS value VARCHAR(255);

-- ALTER TABLE shared_environment_variables
-- Review 2024_01_29_072322_change_env_variable_length.php for specific alterations
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS value TEXT;
ALTER TABLE shared_environment_variables ADD COLUMN IF NOT EXISTS value VARCHAR(255);
