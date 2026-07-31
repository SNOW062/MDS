-- completed mig_007
-- Migration: 2023_03_20_112411_add_event_column_to_activity_log_table
-- Connection: activitylog.database_connection

-- up() method implementation
ALTER TABLE activity_log 
ADD COLUMN IF NOT EXISTS event VARCHAR(255) NULL;

-- down() method implementation reference:
-- ALTER TABLE activity_log DROP COLUMN IF EXISTS event;
