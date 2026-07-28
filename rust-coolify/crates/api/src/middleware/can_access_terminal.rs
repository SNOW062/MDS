// completed file_0532
// Coolify mənbəsi: app/Http/Middleware/CanAccessTerminal.php
// Terminal girişi middleware — yalnız admin/owner istifadə edə bilər
// Coolify: auth()->user()->can('canAccessTerminal') yoxlama

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// Terminal girişi middleware
/// Coolify: CanAccessTerminal::handle — auth check, then canAccessTerminal gate
pub async fn can_access_terminal(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Autentifikasiya yoxla (Coolify: auth()->check())
    let auth_header = request
        .headers()
        .get("Authorization")
        .and_then(|v| v.to_str().ok());

    if auth_header.is_none() {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "message": "Authentication required"
            })),
        ));
    }

    // Terminal girişi icazəsini yoxla
    // Coolify: auth()->user()->can('canAccessTerminal') — yalnız admin/owner
    let role = request
        .headers()
        .get("X-User-Role")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("member");

    if !["admin", "owner"].contains(&role) {
        return Err((
            StatusCode::FORBIDDEN,
            Json(serde_json::json!({
                "message": "Access to terminal functionality is restricted to team administrators"
            })),
        ));
    }

    Ok(next.run(request).await)
}
