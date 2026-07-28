-- completed mig_266
-- Converted from: 2025_05_29_100258_add_terminal_enabled_to_server_settings.php

-- ALTER TABLE server_settings
-- Review 2025_05_29_100258_add_terminal_enabled_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_terminal_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_terminal_enabled TEXT;

-- ALTER TABLE server_settings
-- Review 2025_05_29_100258_add_terminal_enabled_to_server_settings.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_terminal_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_terminal_enabled TEXT;
