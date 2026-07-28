-- completed mig_278
-- Converted from: 2025_09_05_142446_add_pr_deployments_public_enabled_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2025_09_05_142446_add_pr_deployments_public_enabled_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_pr_deployments_public_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_pr_deployments_public_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2025_09_05_142446_add_pr_deployments_public_enabled_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_pr_deployments_public_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_pr_deployments_public_enabled TEXT;
