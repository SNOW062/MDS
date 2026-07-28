-- completed mig_315
-- Converted from: 2025_12_17_000001_add_is_wire_navigate_enabled_to_instance_settings_table.php

-- ALTER TABLE instance_settings
-- Review 2025_12_17_000001_add_is_wire_navigate_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_wire_navigate_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_wire_navigate_enabled TEXT;

-- ALTER TABLE instance_settings
-- Review 2025_12_17_000001_add_is_wire_navigate_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_wire_navigate_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_wire_navigate_enabled TEXT;
