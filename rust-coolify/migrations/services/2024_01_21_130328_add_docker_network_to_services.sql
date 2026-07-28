-- completed mig_129
-- Converted from: 2024_01_21_130328_add_docker_network_to_services.php

-- ALTER TABLE services
-- Review 2024_01_21_130328_add_docker_network_to_services.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS connect_to_docker_network BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS connect_to_docker_network TEXT;

-- ALTER TABLE services
-- Review 2024_01_21_130328_add_docker_network_to_services.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS connect_to_docker_network BOOLEAN DEFAULT FALSE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS connect_to_docker_network TEXT;
