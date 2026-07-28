-- completed mig_166
-- Converted from: 2024_04_25_073615_add_docker_network_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2024_04_25_073615_add_docker_network_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS connect_to_docker_network BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS connect_to_docker_network TEXT;

-- ALTER TABLE application_settings
-- Review 2024_04_25_073615_add_docker_network_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS connect_to_docker_network BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS connect_to_docker_network TEXT;
