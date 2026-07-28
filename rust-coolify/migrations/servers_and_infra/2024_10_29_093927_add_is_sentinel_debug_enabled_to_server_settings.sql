-- completed mig_220
-- Converted from: 2024_10_29_093927_add_is_sentinel_debug_enabled_to_server_settings.php

-- ALTER TABLE server_settings
-- Review 2024_10_29_093927_add_is_sentinel_debug_enabled_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_debug_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_debug_enabled TEXT;

-- ALTER TABLE server_settings
-- Review 2024_10_29_093927_add_is_sentinel_debug_enabled_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_debug_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_sentinel_debug_enabled TEXT;
