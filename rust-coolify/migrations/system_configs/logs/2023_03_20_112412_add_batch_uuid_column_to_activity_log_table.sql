-- completed mig_008
-- Migration: 2023_03_20_112412_add_batch_uuid_column_to_activity_log_table
-- Connection: activitylog.database_connection

-- up() method implementation
ALTER TABLE activity_log 
ADD COLUMN IF NOT EXISTS batch_uuid UUID NULL;

-- down() method implementation reference:
-- ALTER TABLE activity_log DROP COLUMN IF EXISTS batch_uuid;
