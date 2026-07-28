-- completed mig_136
-- Converted from: 2024_01_29_145200_add_custom_docker_run_options.php

-- ALTER TABLE applications
-- Review 2024_01_29_145200_add_custom_docker_run_options.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options TEXT;

-- ALTER TABLE applications
-- Review 2024_01_29_145200_add_custom_docker_run_options.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS custom_docker_run_options TEXT;
