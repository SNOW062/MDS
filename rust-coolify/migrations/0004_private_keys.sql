-- Coolify: PrivateKey
CREATE TABLE IF NOT EXISTS private_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    private_key TEXT NOT NULL,
    public_key TEXT,
    is_git_related BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
