-- completed mig_019
-- Converted from: 2023_03_27_075444_create_environments_table.php

CREATE TABLE IF NOT EXISTS environments (
    name VARCHAR(255),
    project_id BIGINT
);

DROP TABLE IF EXISTS environments;
