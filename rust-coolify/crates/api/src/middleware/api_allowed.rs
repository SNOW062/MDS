// completed file_0529
// Coolify mənbəsi: app/Http/Middleware/ApiAllowed.php
// API icazəsi middleware — API aktiv vəziyyətini və IP ağ siyahısını yoxlayır
// Coolify: is_api_enabled + allowed_ips kontrol

use axum::{
    extract::{Request, State},
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};
use crate::state::AppState;

/// API mövcudluq middleware
/// Coolify: ApiAllowed::handle — is_api_enabled yoxla, sonra IP allowlist yoxla
pub async fn check_api_allowed(
    State(state): State<AppState>,
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Instance settings-dən API aktivliyini yoxla
    // Coolify: $settings->is_api_enabled === false → 403
    let api_enabled: bool = sqlx::query_scalar(
        "SELECT COALESCE(is_api_enabled, true) FROM instance_settings LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .unwrap_or(None)
    .unwrap_or(true);

    if !api_enabled {
        return Err((
            StatusCode::FORBIDDEN,
            Json(serde_json::json!({
                "success": true,
                "message": "API is disabled."
            })),
        ));
    }

    // IP ağ siyahısını yoxla
    // Coolify: $settings->allowed_ips → "0.0.0.0" means allow all
    let allowed_ips: Option<String> = sqlx::query_scalar(
        "SELECT allowed_ips FROM instance_settings LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .unwrap_or(None)
    .flatten();

    if let Some(ips) = allowed_ips {
        let trimmed = ips.trim();
        if !trimmed.is_empty() && trimmed != "0.0.0.0" {
            let client_ip = request
                .headers()
                .get("X-Forwarded-For")
                .and_then(|v| v.to_str().ok())
                .unwrap_or("unknown");

            let allowed_list: Vec<&str> = trimmed.split(',').map(|s| s.trim()).collect();
            if !allowed_list.contains(&client_ip) {
                return Err((
                    StatusCode::FORBIDDEN,
                    Json(serde_json::json!({
                        "success": true,
                        "message": "You are not allowed to access the API."
                    })),
                ));
            }
        }
    }

    Ok(next.run(request).await)
}
