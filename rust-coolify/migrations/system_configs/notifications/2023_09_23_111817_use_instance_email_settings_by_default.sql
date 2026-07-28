-- completed mig_082
-- Converted from: 2023_09_23_111817_use_instance_email_settings_by_default.php

-- ALTER TABLE teams
-- Review 2023_09_23_111817_use_instance_email_settings_by_default.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;

-- ALTER TABLE teams
-- Review 2023_09_23_111817_use_instance_email_settings_by_default.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS use_instance_email_settings BOOLEAN DEFAULT FALSE;
