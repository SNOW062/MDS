-- completed mig_047
-- Converted from: 2023_08_07_073651_create_s3_storages_table.php

CREATE TABLE IF NOT EXISTS s3_storages (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    region VARCHAR(255),
    key TEXT,
    secret TEXT,
    bucket TEXT,
    endpoint TEXT,
    team_id BIGINT
);

DROP TABLE IF EXISTS s3_storages;
