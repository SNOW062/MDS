-- completed mig_273
-- Converted from: 2025_08_07_142403_create_user_changelog_reads_table.php

CREATE TABLE IF NOT EXISTS user_changelog_reads (
    user_id BIGINT,
    release_tag VARCHAR(255),
    read_at TIMESTAMP,
    user_id TEXT,
    release_tag TEXT
);

DROP TABLE IF EXISTS user_changelog_reads;
