-- completed mig_216
-- Converted from: 2024_10_16_192133_add_confirmation_settings_to_instance_settings_table.php

-- ALTER TABLE instance_settings
-- Review 2024_10_16_192133_add_confirmation_settings_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS disable_two_step_confirmation BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS disable_two_step_confirmation TEXT;

-- ALTER TABLE instance_settings
-- Review 2024_10_16_192133_add_confirmation_settings_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS disable_two_step_confirmation BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS disable_two_step_confirmation TEXT;
