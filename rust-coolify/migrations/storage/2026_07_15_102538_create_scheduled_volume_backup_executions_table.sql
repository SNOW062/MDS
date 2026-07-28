-- completed mig_348
-- Converted from: 2026_07_15_102538_create_scheduled_volume_backup_executions_table.php

CREATE TABLE IF NOT EXISTS scheduled_volume_backup_executions (
    uuid VARCHAR(255),
    scheduled_volume_backup_id BIGINT,
    s3_storage_id BIGINT,
    status TEXT,
    message TEXT,
    size BIGINT,
    filename TEXT,
    stop_container_ids JSONB,
    stop_recovery_pending BOOLEAN DEFAULT FALSE,
    s3_cleanup_pending BOOLEAN DEFAULT FALSE,
    finished_at TIMESTAMP,
    local_storage_deleted BOOLEAN DEFAULT FALSE,
    s3_storage_deleted BOOLEAN DEFAULT FALSE,
    s3_uploaded BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS scheduled_volume_backup_executions;
