-- completed mig_303
-- Converted from: 2025_11_16_000002_create_cloud_init_scripts_table.php

CREATE TABLE IF NOT EXISTS cloud_init_scripts (
    team_id BIGINT,
    name VARCHAR(255),
    script TEXT
);

DROP TABLE IF EXISTS cloud_init_scripts;
