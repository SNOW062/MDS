-- Coolify: S3Storage
CREATE TABLE IF NOT EXISTS s3_storages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id),
    name VARCHAR(255) NOT NULL,
    endpoint VARCHAR(500) NOT NULL,
    bucket VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    access_key VARCHAR(255) NOT NULL,
    secret_key TEXT NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
