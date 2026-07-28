// completed file_0531
// Coolify mənbəsi: app/Http/Middleware/Authenticate.php
// Autentifikasiya middleware — istifadəçi giriş etmədikdə /login-ə yönləndir
// Coolify: Authenticate::redirectTo — JSON sorğusu olarsa null, əks halda '/login'

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// Authenticate middleware
/// Coolify: Authenticate::redirectTo — expects JSON → null, else → /login
pub async fn authenticate_middleware(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Authorization header-ını yoxla
    let auth_header = request
        .headers()
        .get("Authorization")
        .and_then(|v| v.to_str().ok());

    if auth_header.is_none() {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "message": "Unauthenticated."
            })),
        ));
    }

    let token = auth_header.unwrap();
    if !token.starts_with("Bearer ") {
        return Err((
            StatusCode::UNAUTHORIZED,
            Json(serde_json::json!({
                "message": "Unauthenticated."
            })),
        ));
    }

    Ok(next.run(request).await)
}
