-- completed mig_182
-- Converted from: 2024_06_21_143358_add_api_deployment_type.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_06_21_143358_add_api_deployment_type.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS is_api BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS is_api TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_06_21_143358_add_api_deployment_type.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS is_api BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS is_api TEXT;
