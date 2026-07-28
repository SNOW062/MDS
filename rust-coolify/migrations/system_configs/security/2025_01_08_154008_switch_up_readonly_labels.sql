-- completed mig_244
-- Converted from: 2025_01_08_154008_switch_up_readonly_labels.php

-- ALTER TABLE application_settings
-- Review 2025_01_08_154008_switch_up_readonly_labels.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE application_settings
-- Review 2025_01_08_154008_switch_up_readonly_labels.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_container_label_readonly_enabled BOOLEAN DEFAULT FALSE;
