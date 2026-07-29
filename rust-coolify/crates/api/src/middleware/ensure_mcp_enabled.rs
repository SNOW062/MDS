// completed file_0538
// Coolify mənbəsi: app/Http/Middleware/EnsureMcpEnabled.php
// MCP (Model Context Protocol) server-in aktiv olub olmadığını yoxlayır.

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

/// EnsureMcpEnabled — Coolify: app/Http/Middleware/EnsureMcpEnabled.php
/// Instance settings-də `is_mcp_server_enabled` = true olmalıdır.
pub async fn ensure_mcp_enabled(
    state: crate::state::AppState,
    req: Request<Body>,
    next: Next,
) -> Response {
    let row = sqlx::query("SELECT is_mcp_server_enabled FROM instance_settings LIMIT 1")
        .fetch_optional(&state.db)
        .await;

    match row {
        Ok(Some(r)) => {
            use sqlx::Row;
            let enabled: bool = r.try_get("is_mcp_server_enabled").unwrap_or(false);
            if !enabled {
                return (
                    StatusCode::FORBIDDEN,
                    Json(json!({ "message": "MCP server is not enabled." })),
                )
                    .into_response();
            }
        }
        _ => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "message": "Could not verify MCP settings." })),
            )
                .into_response();
        }
    }

    next.run(req).await
}
