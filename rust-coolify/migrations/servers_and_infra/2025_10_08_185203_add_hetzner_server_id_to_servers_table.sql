-- completed mig_289
-- Converted from: 2025_10_08_185203_add_hetzner_server_id_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_10_08_185203_add_hetzner_server_id_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_id TEXT;

-- ALTER TABLE servers
-- Review 2025_10_08_185203_add_hetzner_server_id_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_id TEXT;
