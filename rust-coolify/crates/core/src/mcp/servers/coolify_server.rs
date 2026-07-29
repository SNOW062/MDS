// completed file_0811
// Coolify mənbəsi: app/Mcp/Servers/CoolifyServer.php
use anyhow::Result;
use serde_json::{json, Value};
use sqlx::PgPool;
use tracing::info;

pub struct CoolifyMcpServer {
    db: PgPool,
}

impl CoolifyMcpServer {
    pub fn new(db: PgPool) -> Self {
        Self { db }
    }

    /// MCP Client (LLM / AI Agent) üçün mövcud olan Tool-ları siyahılayır
    pub fn list_tools(&self) -> Value {
        json!([
            {
                "name": "get_infrastructure_overview",
                "description": "Returns a summary of servers, applications, databases, and services for a team."
            },
            {
                "name": "list_applications",
                "description": "Lists all deployed applications with status and configuration."
            },
            {
                "name": "list_servers",
                "description": "Lists all connected servers with reachability status."
            },
            {
                "name": "list_databases",
                "description": "Lists all standalone databases."
            }
        ])
    }

    /// MCP Tool çağırışını icra edir
    pub async fn call_tool(&self, tool_name: &str, team_id: i32) -> Result<Value> {
        info!("MCP Tool execution: {} for team_id={}", tool_name, team_id);

        match tool_name {
            "get_infrastructure_overview" => {
                let app_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM applications WHERE environment_id IN (SELECT id FROM environments WHERE project_id IN (SELECT id FROM projects WHERE team_id = $1))", team_id).fetch_one(&self.db).await?.unwrap_or(0);
                let server_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM servers WHERE team_id = $1", team_id).fetch_one(&self.db).await?.unwrap_or(0);
                let db_count: i64 = sqlx::query_scalar!("SELECT COUNT(*) FROM standalone_postgresqls WHERE environment_id IN (SELECT id FROM environments WHERE project_id IN (SELECT id FROM projects WHERE team_id = $1))", team_id).fetch_one(&self.db).await?.unwrap_or(0);

                Ok(json!({
                    "team_id": team_id,
                    "servers": server_count,
                    "applications": app_count,
                    "databases": db_count
                }))
            }
            _ => Ok(json!({"error": "Unknown MCP tool"})),
        }
    }
}
