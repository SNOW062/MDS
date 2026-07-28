// completed be_1100
use uuid::Uuid;
use crate::DbPool;
use crate::models::deployment::Deployment;

pub async fn create_deployment(
    pool: &DbPool,
    application_id: Uuid,
    build_id: &str
) -> anyhow::Result<Deployment> {
    let deploy = sqlx::query_as::<_, Deployment>(
        "INSERT INTO deployments (id, application_id, build_id, status, created_at, updated_at) VALUES ($1, $2, $3, 'queued', NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(application_id)
    .bind(build_id)
    .fetch_one(pool)
    .await?;
    Ok(deploy)
}
