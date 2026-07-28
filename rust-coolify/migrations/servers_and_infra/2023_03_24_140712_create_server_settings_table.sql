-- completed mig_015
-- Converted from: 2023_03_24_140712_create_server_settings_table.php

CREATE TABLE IF NOT EXISTS server_settings (
    is_part_of_swarm BOOLEAN DEFAULT FALSE,
    is_jump_server BOOLEAN DEFAULT FALSE,
    is_build_server BOOLEAN DEFAULT FALSE,
    is_reachable BOOLEAN DEFAULT FALSE,
    is_usable BOOLEAN DEFAULT FALSE,
    server_id BIGINT
);

DROP TABLE IF EXISTS server_settings;
