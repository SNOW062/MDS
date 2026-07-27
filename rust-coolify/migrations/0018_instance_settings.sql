-- Coolify: InstanceSettings
CREATE TABLE IF NOT EXISTS instance_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
