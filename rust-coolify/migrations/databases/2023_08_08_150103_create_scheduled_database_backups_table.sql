-- completed mig_049
-- Converted from: 2023_08_08_150103_create_scheduled_database_backups_table.php

CREATE TABLE IF NOT EXISTS scheduled_database_backups (
    description TEXT,
    uuid VARCHAR(255),
    enabled BOOLEAN DEFAULT FALSE,
    save_s3 BOOLEAN DEFAULT FALSE,
    frequency VARCHAR(255),
    number_of_backups_locally INTEGER,
    database TEXT,
    s3_storage_id BIGINT,
    team_id BIGINT
);

DROP TABLE IF EXISTS scheduled_database_backups;
