-- completed mig_298
-- Converted from: 2025_11_12_130931_add_traefik_version_tracking_to_servers_table.php

-- ALTER TABLE servers
-- Review 2025_11_12_130931_add_traefik_version_tracking_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS detected_traefik_version VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS detected_traefik_version TEXT;

-- ALTER TABLE servers
-- Review 2025_11_12_130931_add_traefik_version_tracking_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS detected_traefik_version VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS detected_traefik_version TEXT;
