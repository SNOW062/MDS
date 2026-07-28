-- completed mig_124
-- Converted from: 2024_01_01_231053_create_scheduled_task_executions_table.php

CREATE TABLE IF NOT EXISTS scheduled_task_executions (
    uuid VARCHAR(255),
    status TEXT,
    message TEXT,
    scheduled_task_id BIGINT
);

DROP TABLE IF EXISTS scheduled_task_executions;
