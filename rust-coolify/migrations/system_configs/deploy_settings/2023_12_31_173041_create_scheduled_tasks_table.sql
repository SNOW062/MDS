-- completed mig_123
-- Converted from: 2023_12_31_173041_create_scheduled_tasks_table.php

CREATE TABLE IF NOT EXISTS scheduled_tasks (
    uuid VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE,
    name VARCHAR(255),
    command VARCHAR(255),
    frequency VARCHAR(255),
    container VARCHAR(255),
    application_id BIGINT,
    service_id BIGINT,
    team_id BIGINT
);

DROP TABLE IF EXISTS scheduled_tasks;
