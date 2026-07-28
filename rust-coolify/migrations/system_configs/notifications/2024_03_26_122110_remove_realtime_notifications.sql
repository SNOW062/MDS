-- completed mig_155
-- Converted from: 2024_03_26_122110_remove_realtime_notifications.php

-- ALTER TABLE users
-- Review 2024_03_26_122110_remove_realtime_notifications.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE users
-- Review 2024_03_26_122110_remove_realtime_notifications.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled BOOLEAN DEFAULT FALSE;
