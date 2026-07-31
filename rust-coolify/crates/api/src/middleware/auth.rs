use axum::{
    body::Body,
    http::{Request, StatusCode, HeaderMap},
    middleware::Next,
    response::Response,
    extract::State,
};
use crate::state::AppState;
use rc_auth::session::SessionClaims;

// Coolify MEMBER_DISALLOWED_ABILITIES ilə 1-ə-1 eyni
const MEMBER_DISALLOWED_ABILITIES: &[&str] = &[
    "root",
    "write",
    "write:sensitive",
    "deploy",
    "read:sensitive",
];

pub async fn auth_middleware(
    State(state): State<AppState>,
    headers: HeaderMap,
    mut req: Request<Body>,
    next: Next,
) -> Result<Response, StatusCode> {
    // 1. Coolify ApiAllowed.php məntiqi: Instance Settings yoxlanışı
    let settings_row = sqlx::query(
        "SELECT is_api_enabled, allowed_ips FROM instance_settings LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .map_err(|e| {
        tracing::error!("DB error checking instance settings: {:?}", e);
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    if let Some(row) = settings_row {
        use sqlx::Row;
        let is_api_enabled: bool = row.try_get("is_api_enabled").unwrap_or(true);
        let allowed_ips: Option<String> = row.try_get("allowed_ips").ok();

        // API aktiv deyilse 403 Forbidden
        if !is_api_enabled {
            return Err(StatusCode::FORBIDDEN);
        }

        // IP məhdudiyyəti (allowed_ips) yoxlanışı
        if let Some(allowed_ips_str) = allowed_ips {
            let trimmed = allowed_ips_str.trim();
            if !trimmed.is_empty() && trimmed != "0.0.0.0" {
                // IP yoxlaması lazım olarsa ConnectInfo vasitəsilə edilə bilər.
            }
        }
    }

    // 2. Coolify ApiAbility.php məntiqi: Token & Rol yetkiləndirmə
    let auth_header = headers
        .get("Authorization")
        .and_then(|header| header.to_str().ok());

    if let Some(auth_str) = auth_header {
        if auth_str.starts_with("Bearer ") {
            let token = &auth_str[7..];
            let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "change-me-in-production".to_string());
            
            if let Ok(claims) = rc_auth::session::validate_session(token, &jwt_secret) {
                // Əgər istifadəçi sadəcə sadə komanda üzvüdürsə (Məsələn, admin deyil), disallowed abilities yoxla
                if let Some(ref team_id) = claims.team_id {
                    let team_uuid = uuid::Uuid::parse_str(team_id).unwrap_or_default();
                    let user_uuid = uuid::Uuid::parse_str(&claims.sub).unwrap_or_default();
                    
                    let role_row = sqlx::query(
                        "SELECT role FROM team_members WHERE team_id = $1 AND user_id = $2"
                    )
                    .bind(team_uuid)
                    .bind(user_uuid)
                    .fetch_optional(&state.db)
                    .await
                    .map_err(|e| {
                        tracing::error!("DB error checking user role: {:?}", e);
                        StatusCode::INTERNAL_SERVER_ERROR
                    })?;

                    let mut is_admin = false;
                    if let Some(r) = role_row {
                        use sqlx::Row;
                        let role: String = r.try_get("role").unwrap_or_else(|_| "member".to_string());
                        is_admin = role == "owner" || role == "admin";
                    }

                    if !is_admin {
                        // Əgər komanda üzvüdürsə və root icazəsi yoxdursa, məhdudlaşdır
                        let is_write_route = req.method() != axum::http::Method::GET;
                        if is_write_route {
                            return Err(StatusCode::FORBIDDEN);
                        }
                    }
                }

                req.extensions_mut().insert(claims);
                return Ok(next.run(req).await);
            }
        }
    }

    Err(StatusCode::UNAUTHORIZED)
}
