-- Coolify: SslCertificate
CREATE TABLE IF NOT EXISTS ssl_certs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    server_id UUID REFERENCES servers(id),
    domain VARCHAR(255) NOT NULL,
    cert TEXT,
    private_key TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
