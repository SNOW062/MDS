-- completed mig_248
-- Converted from: 2025_01_16_110406_change_commit_message_to_text_in_application_deployment_queues.php

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_16_110406_change_commit_message_to_text_in_application_deployment_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message VARCHAR(255);

-- ALTER TABLE application_deployment_queues
-- Review 2025_01_16_110406_change_commit_message_to_text_in_application_deployment_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS commit_message VARCHAR(255);
