-- completed mig_171
-- Converted from: 2024_05_15_091757_add_commit_message_to_app_deployment_queue.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_05_15_091757_add_commit_message_to_app_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_05_15_091757_add_commit_message_to_app_deployment_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message TEXT;
