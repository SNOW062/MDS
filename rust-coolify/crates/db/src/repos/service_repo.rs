// completed be_1104
use uuid::Uuid;
use crate::DbPool;
use crate::models::service::Service;

pub async fn create_service(
    pool: &DbPool,
    environment_id: Uuid,
    server_id: Uuid,
    name: &str
) -> anyhow::Result<Service> {
    let s = sqlx::query_as::<_, Service>(
        "INSERT INTO services (id, environment_id, server_id, name, status, created_at, updated_at) VALUES ($1, $2, $3, $4, 'stopped', NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(environment_id)
    .bind(server_id)
    .bind(name)
    .fetch_one(pool)
    .await?;
    Ok(s)
}
