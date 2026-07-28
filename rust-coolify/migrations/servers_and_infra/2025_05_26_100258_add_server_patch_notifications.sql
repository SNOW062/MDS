-- completed mig_265
-- Converted from: 2025_05_26_100258_add_server_patch_notifications.php

-- ALTER TABLE email_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE discord_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE telegram_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE slack_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE pushover_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE email_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE discord_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE telegram_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE slack_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;

-- ALTER TABLE pushover_notification_settings
-- Review 2025_05_26_100258_add_server_patch_notifications.php for specific alterations
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS telegram_notifications_server_patch_thread_id VARCHAR(255);
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_email_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_discord_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_slack_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS server_patch_pushover_notifications TEXT;
