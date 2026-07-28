-- completed mig_344
-- Converted from: 2026_07_07_114840_add_digitalocean_droplet_fields_to_servers_table.php

-- ALTER TABLE servers
-- Review 2026_07_07_114840_add_digitalocean_droplet_fields_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_status VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_status TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_id TEXT;

-- ALTER TABLE servers
-- Review 2026_07_07_114840_add_digitalocean_droplet_fields_to_servers_table.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_id BIGINT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_status VARCHAR(255);
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_status TEXT;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS digitalocean_droplet_id TEXT;
