-- completed mig_031
-- Converted from: 2023_05_17_104039_create_failed_jobs_table.php

CREATE TABLE IF NOT EXISTS failed_jobs (
    uuid VARCHAR(255),
    connection TEXT,
    queue TEXT,
    payload TEXT,
    exception TEXT,
    failed_at TIMESTAMP
);

DROP TABLE IF EXISTS failed_jobs;
