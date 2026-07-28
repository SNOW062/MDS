-- completed mig_287
-- Converted from: 2025_10_07_120723_add_s3_uploaded_to_scheduled_database_backup_executions_table.php

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2025_10_07_120723_add_s3_uploaded_to_scheduled_database_backup_executions_table.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS s3_uploaded BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS s3_uploaded TEXT;

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2025_10_07_120723_add_s3_uploaded_to_scheduled_database_backup_executions_table.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS s3_uploaded BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS s3_uploaded TEXT;
