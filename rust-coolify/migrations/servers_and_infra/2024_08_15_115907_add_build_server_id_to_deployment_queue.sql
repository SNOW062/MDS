-- completed mig_199
-- Converted from: 2024_08_15_115907_add_build_server_id_to_deployment_queue.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_08_15_115907_add_build_server_id_to_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS build_server_id INTEGER;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS build_server_id TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_08_15_115907_add_build_server_id_to_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS build_server_id INTEGER;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS build_server_id TEXT;
