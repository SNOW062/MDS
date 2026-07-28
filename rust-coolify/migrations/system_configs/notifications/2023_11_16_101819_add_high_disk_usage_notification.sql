-- completed mig_106
-- Converted from: 2023_11_16_101819_add_high_disk_usage_notification.php

-- ALTER TABLE servers
-- Review 2023_11_16_101819_add_high_disk_usage_notification.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS high_disk_usage_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS high_disk_usage_notification_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_notification_sent TEXT;

-- ALTER TABLE servers
-- Review 2023_11_16_101819_add_high_disk_usage_notification.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS high_disk_usage_notification_sent BOOLEAN DEFAULT FALSE;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_email_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS high_disk_usage_notification_sent TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS unreachable_notification_sent TEXT;
