-- completed mig_172
-- Converted from: 2024_05_15_151236_add_container_escape_toggle.php

-- ALTER TABLE application_settings
-- Review 2024_05_15_151236_add_container_escape_toggle.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;

-- ALTER TABLE services
-- Review 2024_05_15_151236_add_container_escape_toggle.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_05_15_151236_add_container_escape_toggle.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;

-- ALTER TABLE services
-- Review 2024_05_15_151236_add_container_escape_toggle.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS is_container_label_escape_enabled TEXT;
