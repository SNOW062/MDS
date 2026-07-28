-- completed mig_089
-- Converted from: 2023_10_12_132431_add_standalone_redis_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2023_10_12_132431_add_standalone_redis_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_10_12_132431_add_standalone_redis_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id TEXT;
