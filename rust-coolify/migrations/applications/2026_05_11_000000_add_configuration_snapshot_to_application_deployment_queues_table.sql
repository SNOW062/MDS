-- completed mig_333
-- Converted from: 2026_05_11_000000_add_configuration_snapshot_to_application_deployment_queues_table.php

-- ALTER TABLE application_deployment_queues
-- Review 2026_05_11_000000_add_configuration_snapshot_to_application_deployment_queues_table.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_hash VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_snapshot JSONB;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_diff JSONB;

-- ALTER TABLE application_deployment_queues
-- Review 2026_05_11_000000_add_configuration_snapshot_to_application_deployment_queues_table.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_hash VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_snapshot JSONB;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS configuration_diff JSONB;
