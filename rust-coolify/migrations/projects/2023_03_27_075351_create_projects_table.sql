-- completed mig_017
-- Converted from: 2023_03_27_075351_create_projects_table.php

CREATE TABLE IF NOT EXISTS projects (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    team_id BIGINT
);

DROP TABLE IF EXISTS projects;
