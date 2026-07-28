-- completed mig_168
-- Converted from: 2024_05_06_093236_add_custom_name_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2024_05_06_093236_add_custom_name_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS custom_internal_name VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS custom_internal_name TEXT;

-- ALTER TABLE application_settings
-- Review 2024_05_06_093236_add_custom_name_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS custom_internal_name VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS custom_internal_name TEXT;
