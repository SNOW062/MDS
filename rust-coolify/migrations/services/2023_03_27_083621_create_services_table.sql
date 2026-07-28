-- completed mig_023
-- Converted from: 2023_03_27_083621_create_services_table.php

CREATE TABLE IF NOT EXISTS services (
    uuid VARCHAR(255),
    name VARCHAR(255),
    destination TEXT,
    environment_id BIGINT
);

DROP TABLE IF EXISTS services;
