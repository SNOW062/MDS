-- completed mig_045
-- Converted from: 2023_08_06_142952_remove_foreignId_environment_variables.php

-- ALTER TABLE environment_variables
-- Review 2023_08_06_142952_remove_foreignId_environment_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS database_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS database_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_08_06_142952_remove_foreignId_environment_variables.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS database_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS database_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id TEXT;
