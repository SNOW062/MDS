-- completed mig_071
-- Converted from: 2023_09_20_082737_create_service_applications_table.php

CREATE TABLE IF NOT EXISTS service_applications (
    uuid VARCHAR(255),
    name VARCHAR(255),
    human_name VARCHAR(255),
    description TEXT,
    fqdn VARCHAR(255),
    ports TEXT,
    exposes TEXT,
    status VARCHAR(255),
    service_id BIGINT
);

DROP TABLE IF EXISTS service_applications;
