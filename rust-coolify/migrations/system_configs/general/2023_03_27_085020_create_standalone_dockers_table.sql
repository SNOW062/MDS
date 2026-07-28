-- completed mig_024
-- Converted from: 2023_03_27_085020_create_standalone_dockers_table.php

CREATE TABLE IF NOT EXISTS standalone_dockers (
    name VARCHAR(255),
    uuid VARCHAR(255),
    network VARCHAR(255),
    server_id BIGINT
);

DROP TABLE IF EXISTS standalone_dockers;
