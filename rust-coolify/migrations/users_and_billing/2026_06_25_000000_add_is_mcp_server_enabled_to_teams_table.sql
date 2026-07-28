-- completed mig_340
-- Converted from: 2026_06_25_000000_add_is_mcp_server_enabled_to_teams_table.php

-- ALTER TABLE teams
-- Review 2026_06_25_000000_add_is_mcp_server_enabled_to_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS is_mcp_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS is_mcp_server_enabled TEXT;

-- ALTER TABLE teams
-- Review 2026_06_25_000000_add_is_mcp_server_enabled_to_teams_table.php for specific alterations
ALTER TABLE teams ADD COLUMN IF NOT EXISTS is_mcp_server_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE teams ADD COLUMN IF NOT EXISTS is_mcp_server_enabled TEXT;
