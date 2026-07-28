-- completed mig_120
-- Converted from: 2023_12_18_093514_add_swarm_related_things.php

-- ALTER TABLE applications
-- Review 2023_12_18_093514_add_swarm_related_things.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_replicas INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_replicas TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes TEXT;

-- ALTER TABLE application_settings
-- Review 2023_12_18_093514_add_swarm_related_things.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_replicas INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_replicas TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes TEXT;

-- ALTER TABLE applications
-- Review 2023_12_18_093514_add_swarm_related_things.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_replicas INTEGER;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_replicas TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes TEXT;

-- ALTER TABLE application_settings
-- Review 2023_12_18_093514_add_swarm_related_things.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_replicas INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_replicas TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS swarm_placement_constraints TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_swarm_only_worker_nodes TEXT;
