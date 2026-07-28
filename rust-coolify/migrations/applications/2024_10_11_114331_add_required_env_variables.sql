-- completed mig_212
-- Converted from: 2024_10_11_114331_add_required_env_variables.php

-- ALTER TABLE environment_variables
-- Review 2024_10_11_114331_add_required_env_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_required BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_required TEXT;

-- ALTER TABLE environment_variables
-- Review 2024_10_11_114331_add_required_env_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_required BOOLEAN DEFAULT FALSE;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS is_required TEXT;
