-- completed mig_142
-- Converted from: 2024_02_15_101921_add_consistent_application_container_name.php

-- ALTER TABLE application_settings
-- Review 2024_02_15_101921_add_consistent_application_container_name.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_consistent_container_name_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_consistent_container_name_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_02_15_101921_add_consistent_application_container_name.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_consistent_container_name_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_consistent_container_name_enabled TEXT;
