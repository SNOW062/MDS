-- completed mig_148
-- Converted from: 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php

-- ALTER TABLE application_settings
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;

-- ALTER TABLE service_applications
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;

-- ALTER TABLE service_databases
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;

-- ALTER TABLE application_settings
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;

-- ALTER TABLE service_applications
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_applications ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;

-- ALTER TABLE service_databases
-- Review 2024_03_04_092244_add_gzip_enabled_and_stripprefix_settings.php for specific alterations
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_gzip_enabled TEXT;
ALTER TABLE service_databases ADD COLUMN IF NOT EXISTS is_stripprefix_enabled TEXT;
