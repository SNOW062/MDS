// completed file_0540
// Coolify mənbəsi: app/Http/Middleware/EnsureTokenBelongsToCurrentTeamMember.php
// API token-in hazırki komanda üzvünə məxsus olduğunu yoxlayır.

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use rc_auth::session::SessionClaims;
use serde_json::json;

/// EnsureTokenBelongsToCurrentTeamMember
/// Coolify: app/Http/Middleware/EnsureTokenBelongsToCurrentTeamMember.php
/// Token-in hazırki team-ə aid olduğunu təsdiqləyir.
pub async fn ensure_token_belongs_to_current_team_member(
    state: crate::state::AppState,
    req: Request<Body>,
    next: Next,
) -> Response {
    let claims = req.extensions().get::<SessionClaims>().cloned();

    let (user_id, team_id) = match claims {
        Some(c) => match c.team_id {
            Some(tid) => (c.sub, tid),
            None => {
                return (
                    StatusCode::FORBIDDEN,
                    Json(json!({ "message": "No team associated with this token." })),
                )
                    .into_response();
            }
        },
        None => {
            return (
                StatusCode::UNAUTHORIZED,
                Json(json!({ "message": "Unauthenticated." })),
            )
                .into_response();
        }
    };

    let user_uuid = match uuid::Uuid::parse_str(&user_id) {
        Ok(u) => u,
        Err(_) => return (StatusCode::BAD_REQUEST, Json(json!({ "message": "Invalid user." }))).into_response(),
    };
    let team_uuid = match uuid::Uuid::parse_str(&team_id) {
        Ok(u) => u,
        Err(_) => return (StatusCode::BAD_REQUEST, Json(json!({ "message": "Invalid team." }))).into_response(),
    };

    // Team member olub olmadığını yoxla
    let member = sqlx::query(
        "SELECT id FROM team_user WHERE user_id = $1 AND team_id = $2 LIMIT 1",
    )
    .bind(user_uuid)
    .bind(team_uuid)
    .fetch_optional(&state.db)
    .await;

    match member {
        Ok(Some(_)) => next.run(req).await,
        Ok(None) => (
            StatusCode::FORBIDDEN,
            Json(json!({ "message": "Token does not belong to current team member." })),
        )
            .into_response(),
        Err(_) => (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(json!({ "message": "Database error." })),
        )
            .into_response(),
    }
}
