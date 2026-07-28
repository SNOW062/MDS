-- completed mig_010
-- Converted from: 2023_03_20_112811_create_teams_table.php

CREATE TABLE IF NOT EXISTS teams (
    name VARCHAR(255),
    description VARCHAR(255),
    personal_team BOOLEAN DEFAULT FALSE,
    smtp TEXT,
    smtp_notifications TEXT,
    discord TEXT,
    discord_notifications TEXT
);

DROP TABLE IF EXISTS teams;
