-- completed mig_109
-- Converted from: 2023_11_20_094628_add_gpu_settings.php

-- ALTER TABLE application_settings
-- Review 2023_11_20_094628_add_gpu_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gpu_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_driver VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_count VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_device_ids VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_options TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gpu_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_driver TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_count TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_device_ids TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_options TEXT;

-- ALTER TABLE application_settings
-- Review 2023_11_20_094628_add_gpu_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gpu_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_driver VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_count VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_device_ids VARCHAR(255);
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_options TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS is_gpu_enabled TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_driver TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_count TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_device_ids TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS gpu_options TEXT;
