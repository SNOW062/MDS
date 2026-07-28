-- completed mig_138
-- Converted from: 2024_02_05_105215_add_destination_to_app_deployments.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_02_05_105215_add_destination_to_app_deployments.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS destination_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS destination_id TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_02_05_105215_add_destination_to_app_deployments.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS destination_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS destination_id TEXT;
