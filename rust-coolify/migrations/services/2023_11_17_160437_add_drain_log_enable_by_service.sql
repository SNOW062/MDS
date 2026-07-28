-- completed mig_108
-- Converted from: 2023_11_17_160437_add_drain_log_enable_by_service.php

-- ALTER TABLE application_settings
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_redis
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE service_applications
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE service_databases
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE servers
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE application_settings
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_redis
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_redis ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mysqls
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mysqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mariadbs
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mariadbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_postgresqls
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_postgresqls ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE standalone_mongodbs
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE standalone_mongodbs ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE service_applications
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE service_databases
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;

-- ALTER TABLE servers
-- Review 2023_11_17_160437_add_drain_log_enable_by_service.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS log_drain_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS is_log_drain_enabled TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS log_drain_notification_sent TEXT;
