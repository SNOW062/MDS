-- completed mig_304
-- Converted from: 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php

-- ALTER TABLE discord_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE slack_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE webhook_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE telegram_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE pushover_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE discord_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE slack_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE slack_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE webhook_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE webhook_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE telegram_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE telegram_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;

-- ALTER TABLE pushover_notification_settings
-- Review 2025_11_17_092707_add_traefik_outdated_to_notification_settings.php for specific alterations
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_discord_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_slack_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_webhook_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_telegram_notifications TEXT;
ALTER TABLE pushover_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_pushover_notifications TEXT;
