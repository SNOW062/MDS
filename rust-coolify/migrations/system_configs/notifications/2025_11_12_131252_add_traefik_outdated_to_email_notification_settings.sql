-- completed mig_299
-- Converted from: 2025_11_12_131252_add_traefik_outdated_to_email_notification_settings.php

-- ALTER TABLE email_notification_settings
-- Review 2025_11_12_131252_add_traefik_outdated_to_email_notification_settings.php for specific alterations
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_email_notifications TEXT;

-- ALTER TABLE email_notification_settings
-- Review 2025_11_12_131252_add_traefik_outdated_to_email_notification_settings.php for specific alterations
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_email_notifications BOOLEAN DEFAULT FALSE;
ALTER TABLE email_notification_settings ADD COLUMN IF NOT EXISTS traefik_outdated_email_notifications TEXT;
