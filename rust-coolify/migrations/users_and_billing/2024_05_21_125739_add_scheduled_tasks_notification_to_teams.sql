-- completed mig_174
-- Converted from: 2024_05_21_125739_add_scheduled_tasks_notification_to_teams.php

-- ALTER TABLE teams
-- Review 2024_05_21_125739_add_scheduled_tasks_notification_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;

-- ALTER TABLE teams
-- Review 2024_05_21_125739_add_scheduled_tasks_notification_to_teams.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_scheduled_tasks TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_scheduled_tasks_thread_id TEXT;
