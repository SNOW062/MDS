-- completed mig_263
-- Converted from: 2025_04_17_110026_add_application_http_basic_auth_fields.php

-- ALTER TABLE applications
-- Review 2025_04_17_110026_add_application_http_basic_auth_fields.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_http_basic_auth_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_username VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_password VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_http_basic_auth_enabled TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_username TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_password TEXT;

-- ALTER TABLE applications
-- Review 2025_04_17_110026_add_application_http_basic_auth_fields.php for specific alterations
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_http_basic_auth_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_username VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_password VARCHAR(255);
ALTER TABLE applications ADD COLUMN IF NOT EXISTS is_http_basic_auth_enabled TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_username TEXT;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS http_basic_auth_password TEXT;
