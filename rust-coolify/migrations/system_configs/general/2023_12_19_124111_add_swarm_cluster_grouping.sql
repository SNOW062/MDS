-- completed mig_121
-- Converted from: 2023_12_19_124111_add_swarm_cluster_grouping.php

-- ALTER TABLE servers
-- Review 2023_12_19_124111_add_swarm_cluster_grouping.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS swarm_cluster INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS swarm_cluster TEXT;

-- ALTER TABLE servers
-- Review 2023_12_19_124111_add_swarm_cluster_grouping.php for specific alterations
ALTER TABLE servers ADD COLUMN IF NOT EXISTS swarm_cluster INTEGER;
ALTER TABLE servers ADD COLUMN IF NOT EXISTS swarm_cluster TEXT;
