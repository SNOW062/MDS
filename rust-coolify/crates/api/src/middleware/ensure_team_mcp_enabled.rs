// completed file_0539
// Coolify mənbəsi: app/Http/Middleware/EnsureTeamMcpEnabled.php
// Komandanın (team) MCP serverinin aktiv olub olmadığını yoxlayır.

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use rc_auth::session::SessionClaims;
use serde_json::json;

/// EnsureTeamMcpEnabled — Coolify: app/Http/Middleware/EnsureTeamMcpEnabled.php
/// Hazırki istifadəçinin komandası üçün MCP aktiv olmalıdır.
pub async fn ensure_team_mcp_enabled(
    state: crate::state::AppState,
    req: Request<Body>,
    next: Next,
) -> Response {
    // JWT-dən team_id al
    let claims = req.extensions().get::<SessionClaims>().cloned();

    let team_id = match claims.and_then(|c| c.team_id) {
        Some(id) => id,
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({ "message": "Unauthenticated." })),
            )
                .into_response();
        }
    };

    let team_uuid = match uuid::Uuid::parse_str(&team_id) {
        Ok(u) => u,
        Err(_) => {
            return (
                StatusCode::BAD_REQUEST,
                Json(json!({ "message": "Invalid team ID." })),
            )
                .into_response();
        }
    };

    let row = sqlx::query(
        "SELECT is_mcp_server_enabled FROM teams WHERE id = $1 LIMIT 1",
    )
    .bind(team_uuid)
    .fetch_optional(&state.db)
    .await;

    match row {
        Ok(Some(r)) => {
            use sqlx::Row;
            let enabled: bool = r.try_get("is_mcp_server_enabled").unwrap_or(false);
            if !enabled {
                return (
                    StatusCode::FORBIDDEN,
                    Json(json!({ "message": "MCP server is not enabled for this team." })),
                )
                    .into_response();
            }
        }
        _ => {
            return (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(json!({ "message": "Could not verify team MCP settings." })),
            )
                .into_response();
        }
    }

    next.run(req).await
}
