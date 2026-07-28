-- completed mig_014
-- Converted from: 2023_03_24_140711_create_servers_table.php

CREATE TABLE IF NOT EXISTS servers (
    uuid VARCHAR(255),
    name VARCHAR(255),
    description VARCHAR(255),
    ip VARCHAR(255),
    port INTEGER,
    user VARCHAR(255),
    team_id BIGINT,
    private_key_id BIGINT,
    proxy TEXT
);

DROP TABLE IF EXISTS servers;
