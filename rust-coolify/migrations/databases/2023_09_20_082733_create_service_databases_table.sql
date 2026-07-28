-- completed mig_070
-- Converted from: 2023_09_20_082733_create_service_databases_table.php

CREATE TABLE IF NOT EXISTS service_databases (
    uuid VARCHAR(255),
    name VARCHAR(255),
    human_name VARCHAR(255),
    description TEXT,
    ports TEXT,
    exposes TEXT,
    status VARCHAR(255),
    service_id BIGINT
);

DROP TABLE IF EXISTS service_databases;
