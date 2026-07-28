-- completed mig_134
-- Converted from: 2024_01_27_164724_add_application_name_and_deployment_url_to_queue.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_01_27_164724_add_application_name_and_deployment_url_to_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS application_name VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_name VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS deployment_url VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS application_name TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_name TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS deployment_url TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_01_27_164724_add_application_name_and_deployment_url_to_queue.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS application_name VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_name VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS deployment_url VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS application_name TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS server_name TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS deployment_url TEXT;
