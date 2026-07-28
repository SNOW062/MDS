// completed be_1099
use uuid::Uuid;
use crate::DbPool;
use crate::models::database::Database;

pub async fn create_db(
    pool: &DbPool,
    environment_id: Uuid,
    server_id: Uuid,
    name: &str,
    db_engine: &str
) -> anyhow::Result<Database> {
    let db = sqlx::query_as::<_, Database>(
        "INSERT INTO databases (id, environment_id, server_id, name, db_engine, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, 'stopped', NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(environment_id)
    .bind(server_id)
    .bind(name)
    .bind(db_engine)
    .fetch_one(pool)
    .await?;
    Ok(db)
}
