-- completed mig_012
-- Migration: 2023_03_20_112813_create_team_invitations_table

-- up() method implementation
CREATE TABLE IF NOT EXISTS team_invitations (
    id BIGSERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE,
    team_id BIGINT NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL DEFAULT 'member',
    link VARCHAR(255) NOT NULL,
    via VARCHAR(255) NOT NULL DEFAULT 'link',
    created_at TIMESTAMP WITH TIME ZONE NULL,
    updated_at TIMESTAMP WITH TIME ZONE NULL,
    CONSTRAINT fk_team_invitations_team_id FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    CONSTRAINT unique_team_invitation_email UNIQUE (team_id, email)
);

CREATE INDEX IF NOT EXISTS idx_team_invitations_team_id ON team_invitations(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invitations_email ON team_invitations(email);

-- down() method implementation reference:
-- DROP TABLE IF EXISTS team_invitations;
