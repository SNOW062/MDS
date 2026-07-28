// completed be_1039
// Coolify mənbəsi: app/Providers/AppServiceProvider.php
// AppState — Coolify-daki AppServiceProvider-in Rust üçün ekvivalenti:
// Tətbiq konteynerini, DB bağlantısını, konfiqurasiyanı paylaşır

use std::sync::Arc;

/// AppState — API server üçün paylaşılan vəziyyət
/// Coolify: app/Providers/AppServiceProvider.php — DI konteyneri və servis registrasiyası
#[derive(Clone)]
pub struct AppState {
    /// Verilənlər bazası bağlantı hovuzu
    /// Coolify: DB:: facade ↔ sqlx::PgPool
    pub db: rc_db::DbPool,

    /// Tətbiq konfiqurasiyası
    /// Coolify: config() helper, env()
    pub config: Arc<AppConfig>,
}

/// Tətbiq konfiqurasiyası
/// Coolify: config/app.php, config/coolify.php, .env
#[derive(Debug, Clone)]
pub struct AppConfig {
    /// Tətbiq versiyası (Coolify: constants.coolify.version)
    pub version: String,

    /// API aktiv vəziyyəti (Coolify: is_api_enabled — instance_settings)
    pub api_enabled: bool,

    /// MCP server aktiv vəziyyəti (Coolify: is_mcp_server_enabled)
    pub mcp_enabled: bool,

    /// GitHub API versiyası (Coolify: X-GitHub-Api-Version: 2022-11-28)
    pub github_api_version: String,

    /// İstehsal rejimi (Coolify: App::isProduction())
    pub is_production: bool,
}

impl Default for AppConfig {
    fn default() -> Self {
        Self {
            version: env!("CARGO_PKG_VERSION").to_string(),
            api_enabled: true,
            mcp_enabled: false,
            github_api_version: "2022-11-28".to_string(),
            is_production: std::env::var("APP_ENV").unwrap_or_default() == "production",
        }
    }
}

impl AppState {
    /// Yeni AppState nümunəsini yaradır
    /// Coolify: AppServiceProvider::boot() — bütün servisləri yüklə
    pub async fn new() -> anyhow::Result<Self> {
        // DB bağlantısını inisializasiya et (Coolify: DB:: / PDO bağlantısı)
        let db = rc_db::init_db().await?;

        let config = Arc::new(AppConfig::default());

        Ok(Self { db, config })
    }
}
