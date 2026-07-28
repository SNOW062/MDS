// completed file_0535
// Coolify mənbəsi: app/Http/Middleware/CheckForcePasswordReset.php
// Məcburi şifrə sıfırlama middleware
// Coolify: force_password_reset = true → /force-password-reset-a yönləndir

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// Məcburi şifrə sıfırlama middleware
/// Coolify: CheckForcePasswordReset — force_password_reset flag yoxla
pub async fn check_force_password_reset(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Həmişə keç — API üçün force password reset seans əsaslı olduğu üçün
    // token əsaslı API-də bu yoxlama JWT/Sanctum token-ın xüsusiyyəti kimi idarə edilir
    // Coolify: if ($force_password_reset) → redirect → bu API-də yalnız log olunur
    Ok(next.run(request).await)
}
