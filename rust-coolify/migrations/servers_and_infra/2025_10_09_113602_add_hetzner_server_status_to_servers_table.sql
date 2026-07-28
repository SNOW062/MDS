-- completed mig_291
-- Converted from: 2025_10_09_113602_add_hetzner_server_status_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_10_09_113602_add_hetzner_server_status_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_status VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_status TEXT;

-- ALTER TABLE servers
-- Review 2025_10_09_113602_add_hetzner_server_status_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_status VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS hetzner_server_status TEXT;
