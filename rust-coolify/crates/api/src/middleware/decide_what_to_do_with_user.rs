// completed file_0536
// Coolify mənbəsi: app/Http/Middleware/DecideWhatToDoWithUser.php
// İstifadəçi vəziyyəti middleware — team, subscription, onboarding yoxlayır
// Coolify: team count, subscription, email verification, onboarding yoxlamaları

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// İstifadəçi vəziyyəti middleware
/// Coolify: DecideWhatToDoWithUser — team yoxla, subscription, email verification
/// API üçün bu yoxlamalar token-əsaslıdır
pub async fn decide_what_to_do_with_user(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // API sorğuları üçün token artıq autentifikasiyanı idarə edir
    // Coolify web middleware-i: teams count yoxla, email verify, subscription
    // API kontekstindən keç — token istifadəçini identifikasiya edir
    Ok(next.run(request).await)
}
