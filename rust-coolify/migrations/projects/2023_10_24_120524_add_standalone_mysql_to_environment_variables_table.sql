-- completed mig_096
-- Converted from: 2023_10_24_120524_add_standalone_mysql_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2023_10_24_120524_add_standalone_mysql_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id TEXT;

-- ALTER TABLE environment_variables
-- Review 2023_10_24_120524_add_standalone_mysql_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id TEXT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id TEXT;
