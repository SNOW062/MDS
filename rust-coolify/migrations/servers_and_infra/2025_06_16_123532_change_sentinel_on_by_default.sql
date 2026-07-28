-- completed mig_268
-- Converted from: 2025_06_16_123532_change_sentinel_on_by_default.php

-- ALTER TABLE server_settings
-- Review 2025_06_16_123532_change_sentinel_on_by_default.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;

-- ALTER TABLE server_settings
-- Review 2025_06_16_123532_change_sentinel_on_by_default.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_enabled BOOLEAN DEFAULT FALSE;
