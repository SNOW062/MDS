-- Coolify: EnvironmentVariable + SharedEnvironmentVariable
CREATE TABLE IF NOT EXISTS environment_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id),
    key VARCHAR(255) NOT NULL,
    value TEXT,
    is_build_time BOOLEAN DEFAULT FALSE,
    is_secret BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(application_id, key)
);
CREATE TABLE IF NOT EXISTS shared_environment_variables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id),
    key VARCHAR(255) NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
