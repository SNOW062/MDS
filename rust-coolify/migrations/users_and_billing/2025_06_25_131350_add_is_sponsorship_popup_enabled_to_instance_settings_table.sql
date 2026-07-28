-- completed mig_269
-- Converted from: 2025_06_25_131350_add_is_sponsorship_popup_enabled_to_instance_settings_table.php

-- ALTER TABLE instance_settings
-- Review 2025_06_25_131350_add_is_sponsorship_popup_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_sponsorship_popup_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_sponsorship_popup_enabled TEXT;

-- ALTER TABLE instance_settings
-- Review 2025_06_25_131350_add_is_sponsorship_popup_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_sponsorship_popup_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_sponsorship_popup_enabled TEXT;
