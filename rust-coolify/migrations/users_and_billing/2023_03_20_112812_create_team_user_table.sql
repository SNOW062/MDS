-- completed mig_011
-- Migration: 2023_03_20_112812_create_team_user_table

-- up() method implementation
CREATE TABLE IF NOT EXISTS team_user (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL,
    CONSTRAINT unique_team_user UNIQUE (team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_user_team_id ON team_user(team_id);
CREATE INDEX IF NOT EXISTS idx_team_user_user_id ON team_user(user_id);

-- down() method implementation reference:
-- DROP TABLE IF EXISTS team_user;
