-- completed mig_103
-- Converted from: 2023_11_13_133059_add_sponsorship_disable.php

-- ALTER TABLE users
-- Review 2023_11_13_133059_add_sponsorship_disable.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled TEXT;

-- ALTER TABLE users
-- Review 2023_11_13_133059_add_sponsorship_disable.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_sponsorship_enabled TEXT;
