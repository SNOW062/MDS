-- completed mig_025
-- Converted from: 2023_03_27_085022_create_swarm_dockers_table.php

CREATE TABLE IF NOT EXISTS swarm_dockers (
    name VARCHAR(255),
    uuid VARCHAR(255),
    server_id BIGINT
);

DROP TABLE IF EXISTS swarm_dockers;
