-- completed mig_119
-- Converted from: 2023_12_17_155616_add_custom_docker_compose_start_command.php

-- ALTER TABLE applications
-- Review 2023_12_17_155616_add_custom_docker_compose_start_command.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_start_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_build_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_start_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_build_command TEXT;

-- ALTER TABLE applications
-- Review 2023_12_17_155616_add_custom_docker_compose_start_command.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_start_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_build_command VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_start_command TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS docker_compose_custom_build_command TEXT;
