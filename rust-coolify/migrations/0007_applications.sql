-- Coolify: Application (105KB model)
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    environment_id UUID REFERENCES environments(id),
    server_id UUID REFERENCES servers(id),
    name VARCHAR(255) NOT NULL,
    fqdn TEXT,
    git_repository VARCHAR(500),
    git_branch VARCHAR(255) DEFAULT 'main',
    git_commit_sha VARCHAR(255),
    build_pack VARCHAR(50) DEFAULT 'nixpacks',
    install_command TEXT,
    build_command TEXT,
    start_command TEXT,
    ports_exposes VARCHAR(255),
    ports_mappings VARCHAR(255),
    status VARCHAR(50) DEFAULT 'stopped',
    created_at TIMESTAMP DEFAULT NOW()
);
