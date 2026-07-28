-- completed mig_246
-- Converted from: 2025_01_13_130238_add_backup_retention_fields_to_scheduled_database_backups_table.php

-- ALTER TABLE scheduled_database_backups
-- Review 2025_01_13_130238_add_backup_retention_fields_to_scheduled_database_backups_table.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS number_of_backups_locally TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_locally INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_days_locally INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_max_storage_locally DECIMAL(8,2);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_s3 INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_days_s3 INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_max_storage_s3 DECIMAL(8,2);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_locally TEXT;

-- ALTER TABLE scheduled_database_backups
-- Review 2025_01_13_130238_add_backup_retention_fields_to_scheduled_database_backups_table.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS number_of_backups_locally TEXT;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_locally INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_days_locally INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_max_storage_locally DECIMAL(8,2);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_s3 INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_days_s3 INTEGER;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_max_storage_s3 DECIMAL(8,2);
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS database_backup_retention_amount_locally TEXT;
