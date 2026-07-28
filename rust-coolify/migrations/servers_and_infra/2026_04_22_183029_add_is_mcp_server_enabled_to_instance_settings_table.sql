-- completed mig_331
-- Converted from: 2026_04_22_183029_add_is_mcp_server_enabled_to_instance_settings_table.php

-- ALTER TABLE instance_settings
-- Review 2026_04_22_183029_add_is_mcp_server_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_mcp_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_mcp_server_enabled TEXT;

-- ALTER TABLE instance_settings
-- Review 2026_04_22_183029_add_is_mcp_server_enabled_to_instance_settings_table.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_mcp_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS is_mcp_server_enabled TEXT;
