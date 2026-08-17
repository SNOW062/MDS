// completed be_1083
pub mod casts;
pub mod enums;
pub mod models;
pub mod repos;

pub type DbPool = sqlx::PgPool;

pub async fn init_db() -> anyhow::Result<DbPool> {
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:postgres@localhost:5432/masterdeploy".to_string());
    
    tracing::info!("Initializing Database Connection Pool for {}", database_url);
    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(5)
        .connect_lazy(&database_url)?;
    
    // SQLx Miqrasiyalarını tətbiq edirik
    tracing::info!("Running database migrations...");
    let migrator = sqlx::migrate!("../../migrations");
    migrator.run(&pool).await?;
    tracing::info!("Database migrations applied successfully!");
    
    Ok(pool)
}
