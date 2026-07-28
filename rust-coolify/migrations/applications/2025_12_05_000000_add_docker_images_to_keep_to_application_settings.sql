-- completed mig_310
-- Converted from: 2025_12_05_000000_add_docker_images_to_keep_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2025_12_05_000000_add_docker_images_to_keep_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS docker_images_to_keep INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS docker_images_to_keep TEXT;

-- ALTER TABLE application_settings
-- Review 2025_12_05_000000_add_docker_images_to_keep_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS docker_images_to_keep INTEGER;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS docker_images_to_keep TEXT;
