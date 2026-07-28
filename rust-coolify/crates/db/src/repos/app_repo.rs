// completed be_1098
use uuid::Uuid;
use crate::DbPool;
use crate::models::application::Application;

pub async fn create_app(
    pool: &DbPool,
    environment_id: Uuid,
    server_id: Uuid,
    name: &str,
    build_pack: &str
) -> anyhow::Result<Application> {
    let app = sqlx::query_as::<_, Application>(
        "INSERT INTO applications (id, environment_id, server_id, name, build_pack, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, 'stopped', NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(environment_id)
    .bind(server_id)
    .bind(name)
    .bind(build_pack)
    .fetch_one(pool)
    .await?;
    Ok(app)
}

pub async fn get_app(pool: &DbPool, id: Uuid) -> anyhow::Result<Option<Application>> {
    let app = sqlx::query_as::<_, Application>("SELECT * FROM applications WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(app)
}

pub async fn update_app_status(pool: &DbPool, id: Uuid, status: &str) -> anyhow::Result<Application> {
    let app = sqlx::query_as::<_, Application>(
        "UPDATE applications SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *"
    )
    .bind(status)
    .bind(id)
    .fetch_one(pool)
    .await?;
    Ok(app)
}
