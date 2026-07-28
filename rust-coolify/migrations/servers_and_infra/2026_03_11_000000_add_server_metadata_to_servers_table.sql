-- completed mig_322
-- Converted from: 2026_03_11_000000_add_server_metadata_to_servers_table.php

-- ALTER TABLE servers
-- Review 2026_03_11_000000_add_server_metadata_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS server_metadata JSONB;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS server_metadata TEXT;

-- ALTER TABLE servers
-- Review 2026_03_11_000000_add_server_metadata_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS server_metadata JSONB;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS server_metadata TEXT;
