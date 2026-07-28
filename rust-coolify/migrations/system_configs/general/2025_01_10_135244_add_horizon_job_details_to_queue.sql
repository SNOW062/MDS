-- completed mig_245
-- Converted from: 2025_01_10_135244_add_horizon_job_details_to_queue.php

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_10_135244_add_horizon_job_details_to_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_worker VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_id TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_worker TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_10_135244_add_horizon_job_details_to_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_id VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_worker VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_id TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS horizon_job_worker TEXT;
