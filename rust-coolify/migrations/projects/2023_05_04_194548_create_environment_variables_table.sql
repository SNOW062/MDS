-- completed mig_030
-- Converted from: 2023_05_04_194548_create_environment_variables_table.php

CREATE TABLE IF NOT EXISTS environment_variables (
    key VARCHAR(255),
    value VARCHAR(255),
    is_build_time BOOLEAN DEFAULT FALSE,
    is_preview BOOLEAN DEFAULT FALSE,
    application_id BIGINT,
    service_id BIGINT,
    database_id BIGINT
);

DROP TABLE IF EXISTS environment_variables;
