-- completed mig_247
-- Converted from: 2025_01_15_130416_create_docker_cleanup_executions_table.php

CREATE TABLE IF NOT EXISTS docker_cleanup_executions (
    uuid VARCHAR(255),
    status TEXT,
    message TEXT,
    cleanup_log JSONB,
    server_id BIGINT,
    finished_at TIMESTAMP
);

DROP TABLE IF EXISTS docker_cleanup_executions;
