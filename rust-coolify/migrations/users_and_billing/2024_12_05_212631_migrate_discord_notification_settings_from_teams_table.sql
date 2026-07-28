-- completed mig_231
-- Converted from: 2024_12_05_212631_migrate_discord_notification_settings_from_teams_table.php

-- ALTER TABLE teams
-- Review 2024_12_05_212631_migrate_discord_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_webhook_url VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;

-- ALTER TABLE teams
-- Review 2024_12_05_212631_migrate_discord_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_webhook_url VARCHAR(255);
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
