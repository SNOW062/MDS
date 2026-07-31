-- completed mig_306
-- Migration: 2025_11_18_083747_cleanup_dockerfile_data_for_non_dockerfile_buildpacks

-- up() method implementation
UPDATE applications
SET dockerfile = NULL,
    dockerfile_location = NULL,
    dockerfile_target_build = NULL,
    custom_healthcheck_found = FALSE
WHERE build_pack != 'dockerfile';

-- down() method implementation reference:
-- No rollback needed - cleaning up corrupted non-dockerfile buildpack data
