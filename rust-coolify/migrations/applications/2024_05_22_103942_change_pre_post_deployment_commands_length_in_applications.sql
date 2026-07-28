-- completed mig_175
-- Converted from: 2024_05_22_103942_change_pre_post_deployment_commands_length_in_applications.php

-- ALTER TABLE applications
-- Review 2024_05_22_103942_change_pre_post_deployment_commands_length_in_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command VARCHAR(255);

-- ALTER TABLE applications
-- Review 2024_05_22_103942_change_pre_post_deployment_commands_length_in_applications.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS post_deployment_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS pre_deployment_command VARCHAR(255);
