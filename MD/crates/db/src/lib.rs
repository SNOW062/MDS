use sqlx::sqlite::SqlitePoolOptions;
use sqlx::SqlitePool;

pub use models::*;
pub use private_key::*;

pub mod models;
pub mod private_key;

pub async fn init_db(database_url: &str) -> Result<SqlitePool, sqlx::Error> {
    let pool = SqlitePoolOptions::new()
        .connect_with(
            database_url.parse::<sqlx::sqlite::SqliteConnectOptions>()?
                .create_if_missing(true)
        )
        .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS private_keys (
            id TEXT PRIMARY KEY,
            uuid TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT,
            private_key TEXT NOT NULL,
            public_key TEXT NOT NULL,
            is_git_related BOOLEAN DEFAULT FALSE,
            is_default BOOLEAN DEFAULT FALSE,
            created_at INTEGER
        );"
    ).execute(&pool).await?;

    Ok(pool)
}
