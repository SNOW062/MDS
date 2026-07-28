-- completed mig_274
-- Converted from: 2025_08_17_102422_add_disable_local_backup_to_scheduled_database_backups_table.php

-- ALTER TABLE scheduled_database_backups
-- Review 2025_08_17_102422_add_disable_local_backup_to_scheduled_database_backups_table.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS disable_local_backup BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS disable_local_backup TEXT;

-- ALTER TABLE scheduled_database_backups
-- Review 2025_08_17_102422_add_disable_local_backup_to_scheduled_database_backups_table.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS disable_local_backup BOOLEAN DEFAULT FALSE;
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS disable_local_backup TEXT;
