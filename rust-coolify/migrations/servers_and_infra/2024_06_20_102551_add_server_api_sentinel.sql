-- completed mig_181
-- Converted from: 2024_06_20_102551_add_server_api_sentinel.php

-- ALTER TABLE server_settings
-- Review 2024_06_20_102551_add_server_api_sentinel.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;

-- ALTER TABLE server_settings
-- Review 2024_06_20_102551_add_server_api_sentinel.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_server_api_enabled TEXT;
