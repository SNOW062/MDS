-- Migration to create cloud_provider_tokens table
CREATE TABLE IF NOT EXISTS cloud_provider_tokens (
    uuid VARCHAR(255) PRIMARY KEY,
    provider VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
