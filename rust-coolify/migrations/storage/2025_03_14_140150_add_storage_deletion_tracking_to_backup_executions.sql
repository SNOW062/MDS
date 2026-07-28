-- completed mig_257
-- Converted from: 2025_03_14_140150_add_storage_deletion_tracking_to_backup_executions.php

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2025_03_14_140150_add_storage_deletion_tracking_to_backup_executions.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS local_storage_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS s3_storage_deleted BOOLEAN DEFAULT FALSE;
