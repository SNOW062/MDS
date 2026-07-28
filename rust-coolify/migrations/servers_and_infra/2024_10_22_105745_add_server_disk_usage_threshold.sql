-- completed mig_218
-- Converted from: 2024_10_22_105745_add_server_disk_usage_threshold.php

-- ALTER TABLE server_settings
-- Review 2024_10_22_105745_add_server_disk_usage_threshold.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_notification_threshold INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_notification_threshold TEXT;

-- ALTER TABLE server_settings
-- Review 2024_10_22_105745_add_server_disk_usage_threshold.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_notification_threshold INTEGER;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS server_disk_usage_notification_threshold TEXT;
