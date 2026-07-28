-- completed mig_258
-- Converted from: 2025_03_21_104103_disable_discord_here.php

-- ALTER TABLE discord_notification_settings
-- Review 2025_03_21_104103_disable_discord_here.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS discord_ping_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS discord_ping_enabled TEXT;

-- ALTER TABLE discord_notification_settings
-- Review 2025_03_21_104103_disable_discord_here.php for specific alterations
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS discord_ping_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE discord_notification_settings ADD COLUMN IF NOT EXISTS discord_ping_enabled TEXT;
