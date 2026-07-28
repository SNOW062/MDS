// completed be_1020
use axum::{
    body::Body,
    http::{Request, StatusCode, HeaderMap},
    middleware::Next,
    response::Response,
    Json,
};
use std::net::SocketAddr;
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
    state: crate::state::AppState,
    req_headers: HeaderMap,
    addr: Option<SocketAddr>,
    mut req: Request<Body>,
    next: Next,
) -> Result<Response, StatusCode> {
    // 1. Coolify ApiAllowed.php məntiqi: Instance Settings yoxlanışı
    let settings_row = sqlx::query(
        "SELECT is_api_enabled, allowed_ips FROM instance_settings LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

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
                let client_ip = addr.map(|a| a.ip().to_string()).unwrap_or_default();
                let allowed_list: Vec<&str> = trimmed.split(',').map(|s| s.trim()).collect();
                if !allowed_list.contains(&client_ip.as_str()) {
                    return Err(StatusCode::FORBIDDEN);
                }
            }
        }
    }

    // 2. Coolify ApiAbility.php məntiqi: Token & Rol yetkiləndirmə
    let auth_header = req_headers
        .get("Authorization")
        .and_then(|header| header.to_str().ok());

    if let Some(auth_str) = auth_header {
        if auth_str.starts_with("Bearer ") {
            let token = &auth_str[7..];
            let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
            
            if let Ok(claims) = rc_auth::session::validate_session(token, &jwt_secret) {
                // Əgər istifadəçi sadəcə sadə komanda üzvüdürsə (Məsələn, admin deyil), disallowed abilities yoxla
                if let Some(ref team_id) = claims.team_id {
                    let team_uuid = uuid::Uuid::parse_str(team_id).unwrap_or_default();
                    let user_uuid = uuid::Uuid::parse_str(&claims.sub).unwrap_or_default();
                    
                    let admin_row = sqlx::query(
                        "SELECT is_admin FROM team_user WHERE team_id = $1 AND user_id = $2"
                    )
                    .bind(team_uuid)
                    .bind(user_uuid)
                    .fetch_optional(&state.db)
                    .await
                    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

                    let mut is_admin = false;
                    if let Some(ar) = admin_row {
                        use sqlx::Row;
                        is_admin = ar.try_get("is_admin").unwrap_or(false);
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
