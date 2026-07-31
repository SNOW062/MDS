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
    
    // SQLx Miqrasiyalarını avtomatik olaraq tətbiq edirik
    // connect_lazy olduğu üçün biz run_migrations funksiyasını DB-yə ilk qoşulanda çağıra bilərik
    // və ya birbaşa bu pool ilə işə sala bilərik.
    let migration_pool = pool.clone();
    tokio::spawn(async move {
        tracing::info!("Running database migrations asynchronously...");
        // miqrasiya qovluğu workspace kökündədir
        let migrator = sqlx::migrate!("../../migrations");
        match migrator.run(&migration_pool).await {
            Ok(_) => tracing::info!("Database migrations applied successfully!"),
            Err(e) => tracing::error!("Failed to run database migrations: {:?}", e),
        }
    });
    
    Ok(pool)
}
