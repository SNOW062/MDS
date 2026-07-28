-- completed mig_165
-- Converted from: 2024_04_17_132541_add_rollback_queues.php

-- ALTER TABLE application_deployment_queues
-- Review 2024_04_17_132541_add_rollback_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS rollback BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS rollback TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2024_04_17_132541_add_rollback_queues.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS rollback BOOLEAN DEFAULT FALSE;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS rollback TEXT;
