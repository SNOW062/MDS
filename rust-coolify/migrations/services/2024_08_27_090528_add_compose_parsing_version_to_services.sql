-- completed mig_201
-- Converted from: 2024_08_27_090528_add_compose_parsing_version_to_services.php

-- ALTER TABLE services
-- Review 2024_08_27_090528_add_compose_parsing_version_to_services.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS compose_parsing_version VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS compose_parsing_version TEXT;

-- ALTER TABLE services
-- Review 2024_08_27_090528_add_compose_parsing_version_to_services.php for specific alterations
ALTER TABLE services ADD COLUMN IF NOT EXISTS compose_parsing_version VARCHAR(255);
ALTER TABLE services ADD COLUMN IF NOT EXISTS compose_parsing_version TEXT;
