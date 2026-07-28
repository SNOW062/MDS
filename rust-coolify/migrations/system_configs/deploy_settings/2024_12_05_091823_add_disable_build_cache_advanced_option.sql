-- completed mig_226
-- Converted from: 2024_12_05_091823_add_disable_build_cache_advanced_option.php

-- ALTER TABLE application_settings
-- Review 2024_12_05_091823_add_disable_build_cache_advanced_option.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS disable_build_cache BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS disable_build_cache TEXT;

-- ALTER TABLE application_settings
-- Review 2024_12_05_091823_add_disable_build_cache_advanced_option.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS disable_build_cache BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS disable_build_cache TEXT;
