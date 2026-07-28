-- completed mig_037
-- Converted from: 2023_06_23_114132_remove_default_redirect_from_instance_settings.php

-- ALTER TABLE instance_settings
-- Review 2023_06_23_114132_remove_default_redirect_from_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS default_redirect_404 TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS default_redirect_404 VARCHAR(255);

-- ALTER TABLE instance_settings
-- Review 2023_06_23_114132_remove_default_redirect_from_instance_settings.php for specific alterations
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS default_redirect_404 TEXT;
ALTER TABLE instance_settings ADD COLUMN IF NOT EXISTS default_redirect_404 VARCHAR(255);
