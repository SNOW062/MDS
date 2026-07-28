// completed file_0533
// Coolify mənbəsi: app/Http/Middleware/CanCreateResources.php
// Resurs yaratma icazəsi middleware
// Coolify: Gate::allows('createAnyResource') → 403 if not allowed

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// Resurs yaratma icazəsi middleware
/// Coolify: CanCreateResources::handle — Gate::allows('createAnyResource')
pub async fn can_create_resources(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Admin/owner rolunu yoxla (Coolify: Gate::allows('createAnyResource'))
    let role = request
        .headers()
        .get("X-User-Role")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("member");

    let api_ability = request
        .headers()
        .get("X-API-Ability")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("read");

    // Yaratmaq üçün write icazəsi lazımdır
    if !api_ability.contains("write") && !api_ability.contains("root") {
        return Err((
            StatusCode::FORBIDDEN,
            Json(serde_json::json!({
                "message": "You do not have permission to create resources."
            })),
        ));
    }

    Ok(next.run(request).await)
}
