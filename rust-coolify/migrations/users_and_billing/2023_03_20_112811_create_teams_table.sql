-- completed mig_010
-- Migration: 2023_03_20_112811_create_teams_table

-- up() method implementation
CREATE TABLE IF NOT EXISTS teams (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL,
    personal_team BOOLEAN NOT NULL DEFAULT FALSE,
    smtp JSONB NULL,
    smtp_notifications JSONB NULL,
    discord JSONB NULL,
    discord_notifications JSONB NULL,
    created_at TIMESTAMP WITH TIME ZONE NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL
);

-- down() method implementation reference:
-- DROP TABLE IF EXISTS teams;
