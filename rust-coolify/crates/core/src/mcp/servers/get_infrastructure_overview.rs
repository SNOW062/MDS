// completed file_0814
// Coolify mənbəsi: app/Mcp/Tools/GetInfrastructureOverview.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;

pub struct GetInfrastructureOverviewTool;

impl GetInfrastructureOverviewTool {
    pub async fn execute(db: &PgPool, team_id: i32) -> Result<Value> {
        let servers_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM servers WHERE team_id = $1", team_id).fetch_one(db).await?.unwrap_or(0);
        let projects_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM projects WHERE team_id = $1", team_id).fetch_one(db).await?.unwrap_or(0);
        let apps_count: i64 = sqlx::query_scalar!(
            "SELECT COUNT(*) FROM applications WHERE environment_id IN (SELECT id FROM environments WHERE project_id IN (SELECT id FROM projects WHERE team_id = $1))",
            team_id
        ).fetch_one(db).await?.unwrap_or(0);

        Ok(json!({
            "team_id": team_id,
            "total_servers": servers_count,
            "total_projects": projects_count,
            "total_applications": apps_count
        }))
    }
}
