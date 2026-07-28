-- completed mig_209
-- Converted from: 2024_09_26_083441_disable_api_by_default.php

-- ALTER TABLE instance_settings
-- Review 2024_09_26_083441_disable_api_by_default.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_api_enabled BOOLEAN DEFAULT FALSE;
