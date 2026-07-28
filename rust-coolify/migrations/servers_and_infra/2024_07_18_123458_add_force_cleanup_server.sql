-- completed mig_190
-- Converted from: 2024_07_18_123458_add_force_cleanup_server.php

-- ALTER TABLE server_settings
-- Review 2024_07_18_123458_add_force_cleanup_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled TEXT;

-- ALTER TABLE server_settings
-- Review 2024_07_18_123458_add_force_cleanup_server.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_force_cleanup_enabled TEXT;
