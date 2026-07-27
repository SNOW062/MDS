-- Coolify: StandalonePostgresql, StandaloneMysql, vb. (8 DB type)
CREATE TABLE IF NOT EXISTS databases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    environment_id UUID REFERENCES environments(id),
    server_id UUID REFERENCES servers(id),
    name VARCHAR(255) NOT NULL,
    engine VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'stopped',
    image VARCHAR(255),
    ports_exposes VARCHAR(255),
    db_user VARCHAR(255),
    db_password TEXT,
    db_name VARCHAR(255),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
