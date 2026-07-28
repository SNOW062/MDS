-- completed mig_050
-- Converted from: 2023_08_10_113306_create_scheduled_database_backup_executions_table.php

CREATE TABLE IF NOT EXISTS scheduled_database_backup_executions (
    uuid VARCHAR(255),
    status TEXT,
    message TEXT,
    size TEXT,
    filename TEXT,
    scheduled_database_backup_id BIGINT
);

DROP TABLE IF EXISTS scheduled_database_backup_executions;
