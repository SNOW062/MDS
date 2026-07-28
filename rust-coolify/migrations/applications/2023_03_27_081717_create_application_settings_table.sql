-- completed mig_021
-- Converted from: 2023_03_27_081717_create_application_settings_table.php

CREATE TABLE IF NOT EXISTS application_settings (
    is_static BOOLEAN DEFAULT FALSE,
    is_git_submodules_enabled BOOLEAN DEFAULT FALSE,
    is_git_lfs_enabled BOOLEAN DEFAULT FALSE,
    is_auto_deploy_enabled BOOLEAN DEFAULT FALSE,
    is_force_https_enabled BOOLEAN DEFAULT FALSE,
    is_debug_enabled BOOLEAN DEFAULT FALSE,
    is_preview_deployments_enabled BOOLEAN DEFAULT FALSE,
    is_dual_cert BOOLEAN DEFAULT FALSE,
    is_custom_ssl BOOLEAN DEFAULT FALSE,
    is_http2 BOOLEAN DEFAULT FALSE,
    application_id BIGINT
);

DROP TABLE IF EXISTS application_settings;
