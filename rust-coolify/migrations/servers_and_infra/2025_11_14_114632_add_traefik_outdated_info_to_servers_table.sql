-- completed mig_301
-- Converted from: 2025_11_14_114632_add_traefik_outdated_info_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_11_14_114632_add_traefik_outdated_info_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS traefik_outdated_info JSONB;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS traefik_outdated_info TEXT;

-- ALTER TABLE servers
-- Review 2025_11_14_114632_add_traefik_outdated_info_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS traefik_outdated_info JSONB;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS traefik_outdated_info TEXT;
