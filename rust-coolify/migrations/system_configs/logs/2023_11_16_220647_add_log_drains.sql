-- completed mig_107
-- Converted from: 2023_11_16_220647_add_log_drains.php

-- ALTER TABLE server_settings
-- Review 2023_11_16_220647_add_log_drains.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_newrelic_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_license_key VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_base_uri VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_highlight_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_highlight_project_id VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_axiom_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_dataset_name VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_api_key VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_newrelic_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_license_key TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_base_uri TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_highlight_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_highlight_project_id TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_axiom_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_dataset_name TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_api_key TEXT;

-- ALTER TABLE server_settings
-- Review 2023_11_16_220647_add_log_drains.php for specific alterations
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_newrelic_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_license_key VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_base_uri VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_highlight_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_highlight_project_id VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_axiom_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_dataset_name VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_api_key VARCHAR(255);
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_newrelic_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_license_key TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_newrelic_base_uri TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_highlight_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_highlight_project_id TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS is_logdrain_axiom_enabled TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_dataset_name TEXT;
ALTER TABLE server_settings ADD COLUMN IF NOT EXISTS logdrain_axiom_api_key TEXT;
