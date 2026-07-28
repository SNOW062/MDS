-- completed mig_145
-- Converted from: 2024_02_22_090900_add_only_this_server_deployment.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_02_22_090900_add_only_this_server_deployment.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS only_this_server BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS only_this_server TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_02_22_090900_add_only_this_server_deployment.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS only_this_server BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS only_this_server TEXT;
