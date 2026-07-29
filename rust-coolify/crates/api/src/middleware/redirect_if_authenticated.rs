// completed file_0542
// Coolify mənbəsi: app/Http/Middleware/RedirectIfAuthenticated.php
// Artıq autentifikasiya edilmiş istifadəçiləri yönləndirir.
// API kontekstində bu middleware token artıq varsa 200 qaytarır.

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use rc_auth::session::SessionClaims;
use serde_json::json;

/// RedirectIfAuthenticated
/// Coolify: app/Http/Middleware/RedirectIfAuthenticated.php
/// Artıq giriş etmiş istifadəçiləri login səhifəsindən dashboard-a yönləndirir.
/// API üçün: əgər artıq autentifikasiya varsa, 200 + mesaj qaytarır.
pub async fn redirect_if_authenticated(
    req: Request<Body>,
    next: Next,
) -> Response {
    let claims = req.extensions().get::<SessionClaims>().cloned();

    if claims.is_some() {
        // Artıq giriş edilib
        return (
            StatusCode::OK,
            Json(json!({ "message": "Already authenticated.", "authenticated": true })),
        )
            .into_response();
    }

    next.run(req).await
}
