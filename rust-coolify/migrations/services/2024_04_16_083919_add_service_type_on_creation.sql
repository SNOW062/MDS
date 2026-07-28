-- completed mig_164
-- Converted from: 2024_04_16_083919_add_service_type_on_creation.php

-- ALTER TABLE services
-- Review 2024_04_16_083919_add_service_type_on_creation.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS service_type VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS service_type TEXT;

-- ALTER TABLE services
-- Review 2024_04_16_083919_add_service_type_on_creation.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS service_type VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS service_type TEXT;
