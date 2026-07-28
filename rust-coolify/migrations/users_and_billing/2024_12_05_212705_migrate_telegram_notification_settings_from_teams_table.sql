-- completed mig_232
-- Converted from: 2024_12_05_212705_migrate_telegram_notification_settings_from_teams_table.php

-- ALTER TABLE teams
-- Review 2024_12_05_212705_migrate_telegram_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;

-- ALTER TABLE teams
-- Review 2024_12_05_212705_migrate_telegram_notification_settings_from_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_token TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_chat_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;
