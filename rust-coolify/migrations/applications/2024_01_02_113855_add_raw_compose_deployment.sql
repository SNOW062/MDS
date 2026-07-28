-- completed mig_125
-- Converted from: 2024_01_02_113855_add_raw_compose_deployment.php

-- ALTER TABLE application_settings
-- Review 2024_01_02_113855_add_raw_compose_deployment.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_raw_compose_deployment_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_raw_compose_deployment_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_01_02_113855_add_raw_compose_deployment.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_raw_compose_deployment_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_raw_compose_deployment_enabled TEXT;
