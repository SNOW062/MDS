-- completed mig_143
-- Converted from: 2024_02_15_192025_add_is_gzip_enabled_to_services.php

-- ALTER TABLE service_applications
-- Review 2024_02_15_192025_add_is_gzip_enabled_to_services.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;

-- ALTER TABLE service_applications
-- Review 2024_02_15_192025_add_is_gzip_enabled_to_services.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
