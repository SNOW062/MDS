-- completed mig_051
-- Converted from: 2023_08_10_201311_add_backup_notifications_to_teams.php

-- ALTER TABLE teams
-- Review 2023_08_10_201311_add_backup_notifications_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups TEXT;

-- ALTER TABLE teams
-- Review 2023_08_10_201311_add_backup_notifications_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_database_backups TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups TEXT;
