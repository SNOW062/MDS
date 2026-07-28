-- completed mig_038
-- Converted from: 2023_06_23_114133_use_application_deployment_queues_as_activity.php

-- ALTER TABLE application_deployment_queues
-- Review 2023_06_23_114133_use_application_deployment_queues_as_activity.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS logs TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS current_process_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS logs TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS current_process_id TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2023_06_23_114133_use_application_deployment_queues_as_activity.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS logs TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS current_process_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS logs TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS current_process_id TEXT;
