-- completed mig_208
-- Converted from: 2024_09_22_165240_add_advanced_options_to_cleanup_options_to_servers_settings_table.php

-- ALTER TABLE server_settings
-- Review 2024_09_22_165240_add_advanced_options_to_cleanup_options_to_servers_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_volumes BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_networks BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_volumes TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_networks TEXT;

-- ALTER TABLE server_settings
-- Review 2024_09_22_165240_add_advanced_options_to_cleanup_options_to_servers_settings_table.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_volumes BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_networks BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_volumes TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS delete_unused_networks TEXT;
