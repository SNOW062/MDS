// rc-db — Database modell?r, migrations, repo-lar
// Coolify: app/Models/ (56 model), database/migrations/ (348 migration)
pub mod models;
pub mod repos;
pub mod casts;
pub mod enums;

use sqlx::PgPool;
pub type DbPool = PgPool;

pub async fn init_db() -> anyhow::Result<DbPool> {
    let url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://postgres:password@localhost/masterdeploy".into());
    let pool = PgPool::connect(&url).await?;
    sqlx::migrate!("../../migrations").run(&pool).await?;
    Ok(pool)
}
