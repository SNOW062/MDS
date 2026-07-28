-- completed mig_064
-- Converted from: 2023_08_22_071056_update_telegram_notifications.php

-- ALTER TABLE teams
-- Review 2023_08_22_071056_update_telegram_notifications.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;

-- ALTER TABLE teams
-- Review 2023_08_22_071056_update_telegram_notifications.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_test_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_deployments_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_status_changes_message_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_database_backups_message_thread_id TEXT;
