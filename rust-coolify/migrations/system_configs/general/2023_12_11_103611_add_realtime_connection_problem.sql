-- completed mig_117
-- Converted from: 2023_12_11_103611_add_realtime_connection_problem.php

-- ALTER TABLE users
-- Review 2023_12_11_103611_add_realtime_connection_problem.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled TEXT;

-- ALTER TABLE users
-- Review 2023_12_11_103611_add_realtime_connection_problem.php for specific alterations
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_notification_realtime_enabled TEXT;
