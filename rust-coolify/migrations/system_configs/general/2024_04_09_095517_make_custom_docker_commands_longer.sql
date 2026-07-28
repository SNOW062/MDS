-- completed mig_157
-- Converted from: 2024_04_09_095517_make_custom_docker_commands_longer.php

-- ALTER TABLE applications
-- Review 2024_04_09_095517_make_custom_docker_commands_longer.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options VARCHAR(255);

-- ALTER TABLE applications
-- Review 2024_04_09_095517_make_custom_docker_commands_longer.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options VARCHAR(255);
