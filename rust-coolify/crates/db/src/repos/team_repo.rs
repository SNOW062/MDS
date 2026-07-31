use uuid::Uuid;
use crate::DbPool;
use crate::models::team::Team;

pub async fn create_team(
    pool: &DbPool,
    name: &str,
    personal_team: bool,
) -> anyhow::Result<Team> {
    let team = sqlx::query_as::<_, Team>(
        "INSERT INTO teams (id, name, description, personal_team, show_boarding, custom_server_limit, is_mcp_server_enabled, created_at, updated_at)
         VALUES ($1, $2, NULL, $3, true, 10, false, NOW(), NOW()) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(name)
    .bind(personal_team)
    .fetch_one(pool)
    .await?;
    Ok(team)
}

pub async fn add_team_member(
    pool: &DbPool,
    team_id: Uuid,
    user_id: Uuid,
    role: &str,
) -> anyhow::Result<()> {
    sqlx::query(
        "INSERT INTO team_members (id, team_id, user_id, role, created_at)
         VALUES ($1, $2, $3, $4, NOW())"
    )
    .bind(Uuid::new_v4())
    .bind(team_id)
    .bind(user_id)
    .bind(role)
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn get_team(
    pool: &DbPool,
    id: Uuid,
) -> anyhow::Result<Option<Team>> {
    let team = sqlx::query_as::<_, Team>("SELECT * FROM teams WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(team)
}

pub async fn list_user_teams(
    pool: &DbPool,
    user_id: Uuid,
) -> anyhow::Result<Vec<Team>> {
    let teams = sqlx::query_as::<_, Team>(
        "SELECT t.* FROM teams t
         JOIN team_members tm ON tm.team_id = t.id
         WHERE tm.user_id = $1"
    )
    .bind(user_id)
    .fetch_all(pool)
    .await?;
    Ok(teams)
}
