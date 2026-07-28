// completed file_0534
// Coolify mənbəsi: app/Http/Middleware/CanUpdateResource.php
// Resurs yeniləmə icazəsi middleware
// Coolify: ROUTE_RESOURCE_MODELS map → Gate::allows('update', $resource) yoxla

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// Resurs yeniləmə icazəsi middleware
/// Coolify: CanUpdateResource — route param-dan UUID götür, Gate yoxla
/// ROUTE_RESOURCE_MODELS: application_uuid, database_uuid, service_uuid, server_uuid, etc.
pub async fn can_update_resource(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    // Yeniləmə üçün write icazəsi lazımdır
    let api_ability = request
        .headers()
        .get("X-API-Ability")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("read");

    if !api_ability.contains("write") && !api_ability.contains("root") {
        return Err((
            StatusCode::FORBIDDEN,
            Json(serde_json::json!({
                "message": "You do not have permission to update this resource."
            })),
        ));
    }

    Ok(next.run(request).await)
}
