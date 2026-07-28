-- completed mig_063
-- Converted from: 2023_08_22_071055_add_discord_notifications_to_teams.php

-- ALTER TABLE teams
-- Review 2023_08_22_071055_add_discord_notifications_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups TEXT;

-- ALTER TABLE teams
-- Review 2023_08_22_071055_add_discord_notifications_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups TEXT;
