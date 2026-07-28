-- completed mig_324
-- Converted from: 2026_03_17_073223_add_docker_registry_url_to_instance_settings.php

-- ALTER TABLE instance_settings
-- Review 2026_03_17_073223_add_docker_registry_url_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS docker_registry_url VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS docker_registry_url TEXT;

-- ALTER TABLE instance_settings
-- Review 2026_03_17_073223_add_docker_registry_url_to_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS docker_registry_url VARCHAR(255);
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS docker_registry_url TEXT;
