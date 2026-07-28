-- completed mig_202
-- Converted from: 2024_09_05_085700_add_helper_version_to_instance_settings.php

-- ALTER TABLE instance_settings
-- Review 2024_09_05_085700_add_helper_version_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS helper_version VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS helper_version TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_09_05_085700_add_helper_version_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS helper_version VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS helper_version TEXT;
