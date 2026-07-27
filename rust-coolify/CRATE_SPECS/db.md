# CRATE SPEC: `db`

## Məqsəd
Bütün veritabanı modelləri, migration-lar və CRUD sorğularını ehtiva edir.
Bütün digər crate-lər bu crate-dən asılıdır.

## Coolify Referansları
```
e:\MD\coolify-source\app\Models\          ← Bütün 56 model
e:\MD\coolify-source\database\migrations\ ← 348 migration (referans üçün)
e:\MD\coolify-source\app\Enums\           ← Status, Type enum-ları
e:\MD\coolify-source\app\Casts\           ← Attribute casting
```

## Bu Crate-in Məsuliyyəti
- PostgreSQL bağlantısı
- Migration-ları işlətmək (`sqlx::migrate!`)
- Bütün struct modelləri (SQLx FromRow ilə)
- Repo funksiyaları (CRUD sorğuları)
- Enum tipləri (BuildPack, DeployStatus, ProxyType, DatabaseEngine)

## Fayl Strukturu və Nə Yazılmalıdır

### `src/lib.rs`
```rust
// init_db() funksiyası:
// - DATABASE_URL env var-ından pool yaradır
// - sqlx::migrate!("../../migrations").run() çağırır
// - DbPool type-ını export edir
pub type DbPool = sqlx::PgPool;
pub async fn init_db() -> anyhow::Result<DbPool>
```

### `src/enums/build_pack.rs`
```rust
// Coolify: app/Enums/BuildPackEnum.php
pub enum BuildPack { Nixpacks, Dockerfile, DockerCompose, Static }
// Serde + sqlx Type derive lazımdır
```

### `src/enums/deploy_status.rs`
```rust
// Coolify: app/Enums/ApplicationDeploymentStatus.php
pub enum DeployStatus { Queued, InProgress, Success, Failed, Cancelled }
```

### `src/enums/proxy_type.rs`
```rust
pub enum ProxyType { Traefik, Caddy, Nginx, None }
```

### `src/enums/database_engine.rs`
```rust
pub enum DatabaseEngine { PostgreSQL, MySQL, MariaDB, MongoDB, Redis, KeyDB, Dragonfly, Clickhouse }
```

### `src/models/server.rs`
```rust
// Coolify: app/Models/Server.php (61KB)
// Bu model çox böyükdür, əsas sahələr:
#[derive(sqlx::FromRow, serde::Serialize, serde::Deserialize)]
pub struct Server {
    pub id: uuid::Uuid,
    pub team_id: uuid::Uuid,
    pub private_key_id: Option<uuid::Uuid>,
    pub name: String,
    pub description: Option<String>,
    pub ip: String,
    pub port: i32,           // default: 22
    pub user: String,        // default: "root"
    pub is_reachable: bool,
    pub is_build_server: bool,
    pub proxy_type: String,
    pub proxy_version: Option<String>,
    pub sentinel_enabled: bool,
    pub sentinel_token: Option<String>,
    pub sentinel_metrics_refresh_rate: i32,  // default: 5
    pub sentinel_metrics_history_days: i32,  // default: 7
    pub sentinel_push_interval: i32,         // default: 60
    pub wildcard_domain: Option<String>,
    pub created_at: chrono::DateTime<chrono::Utc>,
}
```

### `src/models/application.rs`
```rust
// Coolify: app/Models/Application.php (105KB)
pub struct Application {
    pub id: uuid::Uuid,
    pub environment_id: uuid::Uuid,
    pub server_id: uuid::Uuid,
    pub name: String,
    pub fqdn: Option<String>,
    pub git_repository: Option<String>,
    pub git_branch: Option<String>,
    pub git_commit_sha: Option<String>,
    pub build_pack: String,           // "nixpacks", "dockerfile", vb.
    pub install_command: Option<String>,
    pub build_command: Option<String>,
    pub start_command: Option<String>,
    pub ports_exposes: Option<String>,
    pub ports_mappings: Option<String>,
    pub status: String,               // "running", "stopped", vb.
    pub created_at: chrono::DateTime<chrono::Utc>,
}
```

### `src/repos/server_repo.rs`
```rust
// CRUD funksiyaları:
pub async fn create_server(pool: &DbPool, data: CreateServerDto) -> anyhow::Result<Server>
pub async fn get_server(pool: &DbPool, id: Uuid) -> anyhow::Result<Option<Server>>
pub async fn list_servers(pool: &DbPool, team_id: Uuid) -> anyhow::Result<Vec<Server>>
pub async fn update_server(pool: &DbPool, id: Uuid, data: UpdateServerDto) -> anyhow::Result<Server>
pub async fn delete_server(pool: &DbPool, id: Uuid) -> anyhow::Result<()>
```

## Cargo.toml Asılılıqları
```toml
[dependencies]
tokio = { workspace = true }
sqlx = { workspace = true }
serde = { workspace = true }
serde_json = { workspace = true }
anyhow = { workspace = true }
thiserror = { workspace = true }
uuid = { workspace = true }
chrono = { workspace = true }
tracing = { workspace = true }
```

## Tamamlandı Sayılır Əgər
- [ ] `cargo build -p rc-db` uğurla keçir
- [ ] Bütün 26 model struct yazılıb
- [ ] Bütün 5 enum yazılıb
- [ ] Hər model üçün repo funksiyaları var (create, get, list, update, delete)
- [ ] `init_db()` PostgreSQL-ə qoşulur və migration-ları işlədir
- [ ] Unit testlər var (mock DB ilə)

## Növbəti Crate
`db` bitdikdən sonra → `auth` crate-ini başla
Bax: `CRATE_SPECS/auth.md`
