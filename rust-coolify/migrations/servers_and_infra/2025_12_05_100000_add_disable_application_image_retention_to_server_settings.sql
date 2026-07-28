-- completed mig_311
-- Converted from: 2025_12_05_100000_add_disable_application_image_retention_to_server_settings.php

-- ALTER TABLE server_settings
-- Review 2025_12_05_100000_add_disable_application_image_retention_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS disable_application_image_retention BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS disable_application_image_retention TEXT;

-- ALTER TABLE server_settings
-- Review 2025_12_05_100000_add_disable_application_image_retention_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS disable_application_image_retention BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS disable_application_image_retention TEXT;
