pub mod backup;
pub mod models;

pub use backup::*;
pub use models::*;

use sqlx::SqlitePool;
use sqlx::sqlite::SqliteConnectOptions;
use std::str::FromStr;

pub async fn init_db(database_url: &str) -> anyhow::Result<SqlitePool> {
    let options = SqliteConnectOptions::from_str(database_url)?
        .create_if_missing(true);
    let pool = SqlitePool::connect_with(options).await?;
    
    // Create tables if they do not exist
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS projects (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            created_at INTEGER
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS environments (
            id TEXT PRIMARY KEY,
            project_id TEXT NOT NULL,
            name TEXT NOT NULL,
            FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS servers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            ip TEXT NOT NULL,
            port INTEGER NOT NULL,
            user TEXT NOT NULL,
            private_key_id TEXT,
            is_reachable BOOLEAN NOT NULL DEFAULT 0,
            is_build_server BOOLEAN NOT NULL DEFAULT 0,
            proxy_type TEXT NOT NULL DEFAULT 'none',
            proxy_version TEXT,
            sentinel_enabled BOOLEAN NOT NULL DEFAULT 0,
            sentinel_token TEXT,
            sentinel_metrics_refresh_rate INTEGER NOT NULL DEFAULT 60,
            sentinel_metrics_history_days INTEGER NOT NULL DEFAULT 7,
            sentinel_push_interval INTEGER NOT NULL DEFAULT 60,
            created_at INTEGER
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS applications (
            id TEXT PRIMARY KEY,
            environment_id TEXT NOT NULL,
            server_id TEXT NOT NULL,
            name TEXT NOT NULL,
            fqdn TEXT,
            git_repository TEXT NOT NULL,
            git_branch TEXT NOT NULL,
            build_pack TEXT NOT NULL,
            install_command TEXT,
            build_command TEXT,
            start_command TEXT,
            ports_exposes TEXT,
            status TEXT NOT NULL,
            created_at INTEGER,
            FOREIGN KEY (environment_id) REFERENCES environments(id) ON DELETE CASCADE,
            FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS environment_variables (
            id TEXT PRIMARY KEY,
            application_id TEXT NOT NULL,
            key TEXT NOT NULL,
            value TEXT NOT NULL,
            is_build_time BOOLEAN NOT NULL DEFAULT 0,
            is_secret BOOLEAN NOT NULL DEFAULT 0,
            FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
            UNIQUE(application_id, key)
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS deployments (
            id TEXT PRIMARY KEY,
            application_id TEXT NOT NULL,
            status TEXT NOT NULL,
            commit_hash TEXT,
            logs TEXT,
            started_at INTEGER,
            finished_at INTEGER,
            FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS databases (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            engine TEXT NOT NULL,
            status TEXT NOT NULL,
            ports_exposes TEXT,
            db_user TEXT,
            db_password TEXT,
            db_name TEXT,
            created_at INTEGER,
            environment_id TEXT NOT NULL,
            server_id TEXT NOT NULL,
            FOREIGN KEY (environment_id) REFERENCES environments(id) ON DELETE CASCADE,
            FOREIGN KEY (server_id) REFERENCES servers(id) ON DELETE CASCADE
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS team_members (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            status TEXT NOT NULL
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL
        );
        "#
    ).execute(&pool).await?;

    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS private_keys (
            id TEXT PRIMARY KEY,
            uuid TEXT NOT NULL DEFAULT '',
            name TEXT NOT NULL,
            description TEXT DEFAULT '',
            private_key TEXT NOT NULL DEFAULT '',
            public_key TEXT NOT NULL DEFAULT '',
            is_git_related INTEGER NOT NULL DEFAULT 0,
            created_at INTEGER
        );
        "#
    ).execute(&pool).await?;

    // Seed default private key if not exists
    let pk_exists: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM private_keys WHERE id = '0'")
        .fetch_one(&pool)
        .await?;

    if pk_exists.0 == 0 {
        sqlx::query(
            r#"
            INSERT INTO private_keys (id, uuid, name, description, private_key, public_key, is_git_related, created_at)
            VALUES ('0', 'localhost-key', 'localhost-key', 'Default key for localhost server', '-----BEGIN OPENSSH PRIVATE KEY-----', '', 0, 1700000000);
            "#
        ).execute(&pool).await?;
    }


    // Seed default localhost server if not exists
    let row_exists: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM servers WHERE id = '0'")
        .fetch_one(&pool)
        .await?;
    
    if row_exists.0 == 0 {
        sqlx::query(
            r#"
            INSERT INTO servers (id, name, ip, port, user, private_key_id, is_reachable, is_build_server, proxy_type, proxy_version, sentinel_enabled, sentinel_token, sentinel_metrics_refresh_rate, sentinel_metrics_history_days, sentinel_push_interval, created_at)
            VALUES ('0', 'localhost', '127.0.0.1', 22, 'root', '0', 1, 1, 'traefik', 'v2.10', 0, 'dummy-sentinel-token-12345', 60, 7, 60, 1700000000);
            "#
        ).execute(&pool).await?;
    }

    // Seed default project, environment, and apps
    let proj_exists: (i64,) = sqlx::query_as("SELECT COUNT(*) FROM projects WHERE id = 'proj-1'")
        .fetch_one(&pool)
        .await?;
    
    if proj_exists.0 == 0 {
        sqlx::query(
            r#"
            INSERT INTO projects (id, name, description, created_at)
            VALUES ('proj-1', 'Default Project', 'Main production environment for web services & API', 1700000000);
            "#
        ).execute(&pool).await?;

        sqlx::query(
            r#"
            INSERT INTO environments (id, project_id, name)
            VALUES ('env-prod', 'proj-1', 'production');
            "#
        ).execute(&pool).await?;

        sqlx::query(
            r#"
            INSERT INTO applications (id, environment_id, server_id, name, fqdn, git_repository, git_branch, build_pack, ports_exposes, status, created_at)
            VALUES 
            ('app-1', 'env-prod', '0', 'coolify-rust-backend', 'https://api.coolify.local', 'github.com/coolify/rust-core', 'main', 'nixpacks', '8000:8000', 'running', 1700000000);
            "#
        ).execute(&pool).await?;

        sqlx::query(
            r#"
            INSERT INTO databases (id, name, engine, status, ports_exposes, db_user, db_password, db_name, created_at, environment_id, server_id)
            VALUES
            ('db-1', 'postgres-database-standalone', 'postgres', 'running', '5432:5432', 'coolify', 'password', 'coolify', 1700000000, 'env-prod', '0'),
            ('db-2', 'redis-cache-service', 'redis', 'stopped', '6379:6379', '', 'password', '', 1700000000, 'env-prod', '0');
            "#
        ).execute(&pool).await?;

        sqlx::query(
            r#"
            INSERT INTO team_members (id, name, email, role, status)
            VALUES
            ('mem-1', 'Admin Root', 'test@example.com', 'Owner', 'Active'),
            ('mem-2', 'Developer User', 'dev@example.com', 'Admin', 'Active');
            "#
        ).execute(&pool).await?;

        sqlx::query(
            r#"
            INSERT INTO settings (key, value)
            VALUES
            ('auto_update', 'true'),
            ('instance_domain', 'http://localhost:8000');
            "#
        ).execute(&pool).await?;
    }

    Ok(pool)
}
