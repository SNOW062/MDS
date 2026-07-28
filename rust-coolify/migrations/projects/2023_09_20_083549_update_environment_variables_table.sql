-- completed mig_072
-- Converted from: 2023_09_20_083549_update_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2023_09_20_083549_update_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_09_20_083549_update_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id TEXT;
