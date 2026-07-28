-- completed mig_098
-- Converted from: 2023_11_01_100437_add_restart_to_deployment_queue.php

-- ALTER TABLE application_deployment_queues
-- Review 2023_11_01_100437_add_restart_to_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS restart_only BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS restart_only TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2023_11_01_100437_add_restart_to_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS restart_only BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS restart_only TEXT;
