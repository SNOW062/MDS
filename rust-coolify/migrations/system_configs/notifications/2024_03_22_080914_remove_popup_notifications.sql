-- completed mig_154
-- Converted from: 2024_03_22_080914_remove_popup_notifications.php

-- ALTER TABLE users
-- Review 2024_03_22_080914_remove_popup_notifications.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE users
-- Review 2024_03_22_080914_remove_popup_notifications.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_notifications_enabled BOOLEAN DEFAULT FALSE;
