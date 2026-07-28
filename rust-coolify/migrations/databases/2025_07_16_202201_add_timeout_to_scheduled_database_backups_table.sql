-- completed mig_272
-- Converted from: 2025_07_16_202201_add_timeout_to_scheduled_database_backups_table.php

-- ALTER TABLE scheduled_database_backups
-- Review 2025_07_16_202201_add_timeout_to_scheduled_database_backups_table.php for specific alterations
ALTER TABLE scheduled_database_backups ADD COLUMN IF NOT EXISTS timeout INTEGER;
