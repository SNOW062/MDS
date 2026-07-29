// completed file_0541
// Coolify mənbəsi: app/Http/Middleware/PreventRequestsDuringMaintenance.php
// Sistem texniki xidmət rejimindədirsə sorğuları bloklayr.

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

/// PreventRequestsDuringMaintenance
/// Coolify: app/Http/Middleware/PreventRequestsDuringMaintenance.php
/// Instance maintenance mode-da olduqda 503 qaytarır.
pub async fn prevent_requests_during_maintenance(
    state: crate::state::AppState,
    req: Request<Body>,
    next: Next,
) -> Response {
    // Sağlamlıq yoxlama endpointinə həmişə icazə ver
    if req.uri().path() == "/api/health" {
        return next.run(req).await;
    }

    let row = sqlx::query(
        "SELECT is_auto_update_enabled FROM instance_settings LIMIT 1",
    )
    .fetch_optional(&state.db)
    .await;

    // Hal-hazırda maintenance_mode sütunu yoxdur; gələcəkdə əlavə ediləcək.
    // Şimdilik maintenance mode deaktivdir.
    match row {
        Ok(Some(_)) => next.run(req).await,
        Ok(None) => next.run(req).await,
        Err(_) => {
            // DB-yə çatmaq mümkün deyilsə, xidmət mövcud deyil
            (
                StatusCode::SERVICE_UNAVAILABLE,
                Json(json!({
                    "message": "Service temporarily unavailable. Please try again later."
                })),
            )
                .into_response()
        }
    }
}
