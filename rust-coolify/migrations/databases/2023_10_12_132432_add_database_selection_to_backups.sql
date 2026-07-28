-- completed mig_090
-- Converted from: 2023_10_12_132432_add_database_selection_to_backups.php

-- ALTER TABLE scheduled_database_backups
-- Review 2023_10_12_132432_add_database_selection_to_backups.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_name VARCHAR(255);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_name TEXT;

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2023_10_12_132432_add_database_selection_to_backups.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS database_name VARCHAR(255);
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS database_name TEXT;

-- ALTER TABLE scheduled_database_backups
-- Review 2023_10_12_132432_add_database_selection_to_backups.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_name VARCHAR(255);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_name TEXT;

-- ALTER TABLE scheduled_database_backup_executions
-- Review 2023_10_12_132432_add_database_selection_to_backups.php for specific alterations
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS database_name VARCHAR(255);
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS databases_to_backup TEXT;
ALTER TABLE scheduled_database_backup_executions ADD COLUMN IF NOT EXISTS database_name TEXT;
