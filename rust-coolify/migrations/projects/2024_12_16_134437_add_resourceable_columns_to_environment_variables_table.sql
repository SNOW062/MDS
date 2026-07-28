-- completed mig_240
-- Converted from: 2024_12_16_134437_add_resourceable_columns_to_environment_variables_table.php

-- ALTER TABLE environment_variables
-- Review 2024_12_16_134437_add_resourceable_columns_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_type VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_dragonfly_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_clickhouse_id BIGINT;

-- ALTER TABLE environment_variables
-- Review 2024_12_16_134437_add_resourceable_columns_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_type VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_dragonfly_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_clickhouse_id BIGINT;

-- ALTER TABLE environment_variables
-- Review 2024_12_16_134437_add_resourceable_columns_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_type VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_dragonfly_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_clickhouse_id BIGINT;

-- ALTER TABLE environment_variables
-- Review 2024_12_16_134437_add_resourceable_columns_to_environment_variables_table.php for specific alterations
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_type VARCHAR(255);
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS resourceable_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS application_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS service_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_postgresql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_redis_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mongodb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mysql_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_mariadb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_keydb_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_dragonfly_id BIGINT;
ALTER TABLE environment_variables ADD COLUMN IF NOT EXISTS standalone_clickhouse_id BIGINT;
