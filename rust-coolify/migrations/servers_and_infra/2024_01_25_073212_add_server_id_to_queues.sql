-- completed mig_133
-- Converted from: 2024_01_25_073212_add_server_id_to_queues.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_01_25_073212_add_server_id_to_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_id INTEGER;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_id TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_01_25_073212_add_server_id_to_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_id INTEGER;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_id TEXT;
