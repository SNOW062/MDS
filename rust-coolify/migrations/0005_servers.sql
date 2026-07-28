-- Coolify: Server (100% original compliant)
CREATE TABLE IF NOT EXISTS servers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID REFERENCES teams(id),
    private_key_id UUID REFERENCES private_keys(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    ip VARCHAR(255) NOT NULL,
    port INTEGER DEFAULT 22,
    "user" VARCHAR(255) DEFAULT 'root',
    is_reachable BOOLEAN DEFAULT FALSE,
    is_build_server BOOLEAN DEFAULT FALSE,
    proxy_type VARCHAR(50) DEFAULT 'traefik',
    proxy_version VARCHAR(50),
    sentinel_enabled BOOLEAN DEFAULT FALSE,
    sentinel_token VARCHAR(255),
    sentinel_metrics_refresh_rate INTEGER DEFAULT 5,
    sentinel_metrics_history_days INTEGER DEFAULT 7,
    sentinel_push_interval INTEGER DEFAULT 60,
    wildcard_domain VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
