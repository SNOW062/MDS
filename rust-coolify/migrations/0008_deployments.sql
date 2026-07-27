-- Coolify: ApplicationDeploymentQueue
CREATE TABLE IF NOT EXISTS deployments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id),
    server_id UUID REFERENCES servers(id),
    status VARCHAR(50) DEFAULT 'queued',
    commit_hash VARCHAR(255),
    logs TEXT,
    started_at TIMESTAMP,
    finished_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
