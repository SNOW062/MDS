-- completed mig_193
-- Converted from: 2024_08_05_142659_add_update_frequency_settings.php

-- ALTER TABLE instance_settings
-- Review 2024_08_05_142659_add_update_frequency_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS auto_update_frequency VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS update_check_frequency VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS new_version_available BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS update_check_frequency TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS auto_update_frequency TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS new_version_available TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_08_05_142659_add_update_frequency_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS auto_update_frequency VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS update_check_frequency VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS new_version_available BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS update_check_frequency TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS auto_update_frequency TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS new_version_available TEXT;
