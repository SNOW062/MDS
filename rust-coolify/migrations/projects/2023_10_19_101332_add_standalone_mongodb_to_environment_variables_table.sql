-- completed mig_093
-- Converted from: 2023_10_19_101332_add_standalone_mongodb_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2023_10_19_101332_add_standalone_mongodb_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_10_19_101332_add_standalone_mongodb_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id TEXT;
