// completed be_1103
use uuid::Uuid;
use crate::DbPool;
use crate::models::server::Server;

pub async fn create_server(
    pool: &DbPool, 
    team_id: Uuid, 
    name: &str, 
    ip: &str, 
    port: i32, 
    user: &str
) -> anyhow::Result<Server> {
    let server = sqlx::query_as::<_, Server>(
        r#"INSERT INTO servers (id, team_id, name, ip, port, "user", is_reachable, is_build_server, proxy_type, sentinel_enabled, sentinel_metrics_refresh_rate, sentinel_metrics_history_days, sentinel_push_interval, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, true, false, 'none', false, 5, 7, 60, NOW(), NOW()) RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(team_id)
    .bind(name)
    .bind(ip)
    .bind(port)
    .bind(user)
    .fetch_one(pool)
    .await?;
    Ok(server)
}

pub async fn get_server(pool: &DbPool, id: Uuid) -> anyhow::Result<Option<Server>> {
    let server = sqlx::query_as::<_, Server>("SELECT * FROM servers WHERE id = $1")
        .bind(id)
        .fetch_optional(pool)
        .await?;
    Ok(server)
}

pub async fn list_servers(pool: &DbPool, team_id: Uuid) -> anyhow::Result<Vec<Server>> {
    let servers = sqlx::query_as::<_, Server>("SELECT * FROM servers WHERE team_id = $1")
        .bind(team_id)
        .fetch_all(pool)
        .await?;
    Ok(servers)
}

pub async fn delete_server(pool: &DbPool, id: Uuid) -> anyhow::Result<()> {
    sqlx::query("DELETE FROM servers WHERE id = $1")
        .bind(id)
        .execute(pool)
        .await?;
    Ok(())
}
