-- completed mig_018
-- Converted from: 2023_03_27_075443_create_project_settings_table.php

CREATE TABLE IF NOT EXISTS project_settings (
    wildcard_domain VARCHAR(255),
    project_id BIGINT
);

DROP TABLE IF EXISTS project_settings;
