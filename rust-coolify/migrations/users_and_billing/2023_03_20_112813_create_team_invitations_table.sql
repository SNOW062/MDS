-- completed mig_012
-- Converted from: 2023_03_20_112813_create_team_invitations_table.php

CREATE TABLE IF NOT EXISTS team_invitations (
    uuid VARCHAR(255),
    team_id BIGINT,
    email VARCHAR(255),
    role VARCHAR(255),
    link VARCHAR(255),
    via VARCHAR(255)
);

DROP TABLE IF EXISTS team_invitations;
