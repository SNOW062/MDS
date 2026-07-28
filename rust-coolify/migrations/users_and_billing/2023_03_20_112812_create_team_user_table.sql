-- completed mig_011
-- Converted from: 2023_03_20_112812_create_team_user_table.php

CREATE TABLE IF NOT EXISTS team_user (
    team_id BIGINT,
    user_id BIGINT,
    role VARCHAR(255)
);

DROP TABLE IF EXISTS team_user;
