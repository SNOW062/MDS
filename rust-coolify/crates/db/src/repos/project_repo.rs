// completed be_1102
use uuid::Uuid;
use crate::DbPool;
use crate::models::project::Project;

pub async fn create_project(pool: &DbPool, team_id: Uuid, name: &str, description: Option<&str>) -> anyhow::Result<Project> {
    let project = sqlx::query_as::<_, Project>(
        "INSERT INTO projects (id, team_id, name, description, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(team_id)
    .bind(name)
    .bind(description)
    .fetch_one(pool)
    .await?;
    Ok(project)
}

pub async fn get_project(pool: &DbPool, id: Uuid) -> anyhow::Result<Option<Project>> {
    let project = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(project)
}

pub async fn list_projects(pool: &DbPool, team_id: Uuid) -> anyhow::Result<Vec<Project>> {
    let projects = sqlx::query_as::<_, Project>("SELECT * FROM projects WHERE team_id = $1")
        .bind(team_id)
        .fetch_all(pool)
        .await?;
    Ok(projects)
}
