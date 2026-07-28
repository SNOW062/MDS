-- completed mig_113
-- Converted from: 2023_11_29_075937_change_swarm_properties.php

-- ALTER TABLE server_settings
-- Review 2023_11_29_075937_change_swarm_properties.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_part_of_swarm TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_worker BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_manager TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_worker TEXT;

-- ALTER TABLE server_settings
-- Review 2023_11_29_075937_change_swarm_properties.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_part_of_swarm TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_worker BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_manager TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_swarm_worker TEXT;
