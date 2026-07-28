-- completed mig_236
-- Converted from: 2024_12_10_122143_drop_resale_license.php

-- ALTER TABLE instance_settings
-- Review 2024_12_10_122143_drop_resale_license.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_12_10_122143_drop_resale_license.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_resale_license_active BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS resale_license TEXT;
