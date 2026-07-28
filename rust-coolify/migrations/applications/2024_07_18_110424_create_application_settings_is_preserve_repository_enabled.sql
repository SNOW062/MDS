-- completed mig_189
-- Converted from: 2024_07_18_110424_create_application_settings_is_preserve_repository_enabled.php

-- ALTER TABLE application_settings
-- Review 2024_07_18_110424_create_application_settings_is_preserve_repository_enabled.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_preserve_repository_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_preserve_repository_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_07_18_110424_create_application_settings_is_preserve_repository_enabled.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_preserve_repository_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_preserve_repository_enabled TEXT;
