-- completed mig_347
-- Converted from: 2026_07_15_102537_create_scheduled_volume_backups_table.php

CREATE TABLE IF NOT EXISTS scheduled_volume_backups (
    uuid VARCHAR(255),
    backupable_type VARCHAR(255),
    backupable_id BIGINT,
    team_id BIGINT,
    s3_storage_id BIGINT,
    frequency VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE,
    save_s3 BOOLEAN DEFAULT FALSE,
    disable_local_backup BOOLEAN DEFAULT FALSE,
    stop_during_backup BOOLEAN DEFAULT FALSE,
    retention_amount_locally TEXT,
    retention_days_locally TEXT,
    retention_max_storage_locally DECIMAL(8,2),
    retention_amount_s3 TEXT,
    retention_days_s3 TEXT,
    retention_max_storage_s3 DECIMAL(8,2),
    timeout TEXT
);

DROP TABLE IF EXISTS scheduled_volume_backups;
