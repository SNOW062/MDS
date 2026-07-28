-- completed mig_105
-- Converted from: 2023_11_14_121416_add_git_type.php

-- ALTER TABLE application_previews
-- Review 2023_11_14_121416_add_git_type.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2023_11_14_121416_add_git_type.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type TEXT;

-- ALTER TABLE application_previews
-- Review 2023_11_14_121416_add_git_type.php for specific alterations
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type TEXT;
ALTER TABLE application_previews ADD COLUMN IF NOT EXISTS git_type TEXT;

-- ALTER TABLE application_deployment_queues
-- Review 2023_11_14_121416_add_git_type.php for specific alterations
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type VARCHAR(255);
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type TEXT;
ALTER TABLE application_deployment_queues ADD COLUMN IF NOT EXISTS git_type TEXT;
