-- completed mig_131
-- Converted from: 2024_01_23_113129_create_shared_environment_variables_table.php

CREATE TABLE IF NOT EXISTS shared_environment_variables (
    key VARCHAR(255),
    value VARCHAR(255),
    is_shown_once BOOLEAN DEFAULT FALSE,
    type TEXT,
    team_id BIGINT,
    project_id BIGINT,
    environment_id BIGINT
);

DROP TABLE IF EXISTS shared_environment_variables;
