// completed be_1083
pub mod casts;
pub mod enums;
pub mod models;
pub mod repos;

pub type DbPool = sqlx::PgPool;

pub async fn init_db() -> anyhow::Result<DbPool> {
    let database_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:postgres@localhost:5432/masterdeploy".to_string());
    
    let pool = sqlx::PgPool::connect(&database_url).await?;
    
    // Run migrations
    sqlx::migrate!("../../migrations").run(&pool).await?;
    
    Ok(pool)
}
