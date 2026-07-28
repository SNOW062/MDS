-- completed mig_032
-- Converted from: 2023_05_24_083426_create_application_deployment_queues_table.php

CREATE TABLE IF NOT EXISTS application_deployment_queues (
    application_id VARCHAR(255),
    deployment_uuid VARCHAR(255),
    pull_request_id INTEGER,
    force_rebuild BOOLEAN DEFAULT FALSE,
    commit VARCHAR(255),
    status VARCHAR(255),
    is_webhook BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS application_deployment_queues;
