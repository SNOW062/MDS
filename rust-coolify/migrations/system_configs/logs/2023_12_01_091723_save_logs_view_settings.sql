-- completed mig_114
-- Converted from: 2023_12_01_091723_save_logs_view_settings.php

-- ALTER TABLE application_settings
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE service_applications
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE service_databases
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_redis
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE application_settings
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE service_applications
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE service_databases
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_redis
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2023_12_01_091723_save_logs_view_settings.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_include_timestamps TEXT;
