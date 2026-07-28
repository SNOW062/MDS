-- completed mig_112
-- Converted from: 2023_11_28_143533_add_fields_to_swarm_dockers.php

-- ALTER TABLE swarm_dockers
-- Review 2023_11_28_143533_add_fields_to_swarm_dockers.php for specific alterations
ALTER TABLE swarm_dockers ADD COLUMN IF NOT EXISTS network VARCHAR(255);
ALTER TABLE swarm_dockers ADD COLUMN IF NOT EXISTS network TEXT;

-- ALTER TABLE swarm_dockers
-- Review 2023_11_28_143533_add_fields_to_swarm_dockers.php for specific alterations
ALTER TABLE swarm_dockers ADD COLUMN IF NOT EXISTS network VARCHAR(255);
ALTER TABLE swarm_dockers ADD COLUMN IF NOT EXISTS network TEXT;
