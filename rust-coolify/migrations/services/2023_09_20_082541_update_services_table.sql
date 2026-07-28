-- completed mig_069
-- Converted from: 2023_09_20_082541_update_services_table.php

-- ALTER TABLE services
-- Review 2023_09_20_082541_update_services_table.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS server_id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose TEXT;

-- ALTER TABLE services
-- Review 2023_09_20_082541_update_services_table.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS server_id BIGINT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS server_id TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose_raw TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS docker_compose TEXT;
