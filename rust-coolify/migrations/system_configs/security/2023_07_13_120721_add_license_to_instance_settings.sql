-- completed mig_042
-- Converted from: 2023_07_13_120721_add_license_to_instance_settings.php

-- ALTER TABLE instance_settings
-- Review 2023_07_13_120721_add_license_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;

-- ALTER TABLE instance_settings
-- Review 2023_07_13_120721_add_license_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
