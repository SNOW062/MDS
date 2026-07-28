-- completed mig_149
-- Converted from: 2024_03_07_115054_add_notifications_notification_disable.php

-- ALTER TABLE users
-- Review 2024_03_07_115054_add_notifications_notification_disable.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled TEXT;

-- ALTER TABLE users
-- Review 2024_03_07_115054_add_notifications_notification_disable.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled TEXT;
