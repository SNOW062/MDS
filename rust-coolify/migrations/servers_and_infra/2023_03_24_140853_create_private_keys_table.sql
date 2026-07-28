-- completed mig_016
-- Converted from: 2023_03_24_140853_create_private_keys_table.php

CREATE TABLE IF NOT EXISTS private_keys (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    private_key TEXT,
    is_git_related BOOLEAN DEFAULT FALSE,
    team_id BIGINT
);

DROP TABLE IF EXISTS private_keys;
