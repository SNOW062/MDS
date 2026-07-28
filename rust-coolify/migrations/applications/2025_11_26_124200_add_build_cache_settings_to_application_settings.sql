-- completed mig_307
-- Converted from: 2025_11_26_124200_add_build_cache_settings_to_application_settings.php

-- ALTER TABLE application_settings
-- Review 2025_11_26_124200_add_build_cache_settings_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build TEXT;

-- ALTER TABLE application_settings
-- Review 2025_11_26_124200_add_build_cache_settings_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build TEXT;

-- ALTER TABLE application_settings
-- Review 2025_11_26_124200_add_build_cache_settings_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build TEXT;

-- ALTER TABLE application_settings
-- Review 2025_11_26_124200_add_build_cache_settings_to_application_settings.php for specific alterations
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build BOOLEAN DEFAULT FALSE;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS inject_build_args_to_dockerfile TEXT;
ALTER TABLE application_settings ADD COLUMN IF NOT EXISTS include_source_commit_in_build TEXT;
