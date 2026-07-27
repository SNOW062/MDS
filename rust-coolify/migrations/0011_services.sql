-- Coolify: Service + ServiceApplication + ServiceDatabase
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    environment_id UUID REFERENCES environments(id),
    server_id UUID REFERENCES servers(id),
    name VARCHAR(255) NOT NULL,
    template_key VARCHAR(255),
    status VARCHAR(50) DEFAULT 'stopped',
    created_at TIMESTAMP DEFAULT NOW()
);
