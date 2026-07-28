-- completed mig_293
-- Converted from: 2025_11_02_161923_add_dev_helper_version_to_instance_settings.php

-- ALTER TABLE instance_settings
-- Review 2025_11_02_161923_add_dev_helper_version_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS dev_helper_version VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS dev_helper_version TEXT;

-- ALTER TABLE instance_settings
-- Review 2025_11_02_161923_add_dev_helper_version_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS dev_helper_version VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS dev_helper_version TEXT;
