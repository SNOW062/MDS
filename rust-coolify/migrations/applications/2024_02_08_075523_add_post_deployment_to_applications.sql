-- completed mig_140
-- Converted from: 2024_02_08_075523_add_post_deployment_to_applications.php

-- ALTER TABLE applications
-- Review 2024_02_08_075523_add_post_deployment_to_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command_container VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command_container VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command_container TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command_container TEXT;

-- ALTER TABLE applications
-- Review 2024_02_08_075523_add_post_deployment_to_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command_container VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command_container VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command_container TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command_container TEXT;
