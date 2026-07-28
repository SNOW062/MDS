-- completed mig_219
-- Converted from: 2024_10_22_121223_add_server_disk_usage_notification.php

-- ALTER TABLE teams
-- Review 2024_10_22_121223_add_server_disk_usage_notification.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage TEXT;

-- ALTER TABLE teams
-- Review 2024_10_22_121223_add_server_disk_usage_notification.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS discord_notifications_server_disk_usage TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS smtp_notifications_server_disk_usage TEXT;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS telegram_notifications_server_disk_usage TEXT;
