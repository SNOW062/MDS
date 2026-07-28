-- completed mig_284
-- Converted from: 2025_09_17_081112_add_use_build_secrets_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2025_09_17_081112_add_use_build_secrets_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS use_build_secrets BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS use_build_secrets TEXT;

-- ALTER TABLE application_settings
-- Review 2025_09_17_081112_add_use_build_secrets_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS use_build_secrets BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS use_build_secrets TEXT;
