-- completed mig_183
-- Converted from: 2024_06_22_081140_alter_instance_settings_add_instance_name.php

-- ALTER TABLE instance_settings
-- Review 2024_06_22_081140_alter_instance_settings_add_instance_name.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_name VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_name TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_06_22_081140_alter_instance_settings_add_instance_name.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_name VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS instance_name TEXT;
