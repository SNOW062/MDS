// completed file_0528
// Coolify mənbəsi: app/Http/Middleware/ApiAbility.php
// API ability middleware — token icazələrini yoxlayır
// Coolify: token.can('root') → keçir, əks halda required abilities yoxla

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::StatusCode,
    Json,
};

/// API Ability middleware yoxlama strukturu
/// Coolify: ApiAbility — MEMBER_DISALLOWED_ABILITIES yoxlanışı
pub struct ApiAbility;

/// Yalnız admin/owner istifadəçilərin istifadə edə biləcəyi icazələr
/// Coolify: MEMBER_DISALLOWED_ABILITIES konstant
pub const MEMBER_DISALLOWED_ABILITIES: &[&str] = &[
    "root",
    "write",
    "write:sensitive",
    "deploy",
    "read:sensitive",
];

/// API ability header-ını yoxlayan middleware funksiyası
/// Coolify: ApiAbility::handle — token.can('root') → keçir, yoxsa abilities yoxla
pub async fn check_api_ability(
    request: Request,
    next: Next,
) -> Result<Response, (StatusCode, Json<serde_json::Value>)> {
    let ability = request
        .headers()
        .get("X-API-Ability")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("read");

    // root icazəsi varsa, birbaşa keç (Coolify: $request->user()->tokenCan('root'))
    if ability == "root" {
        return Ok(next.run(request).await);
    }

    // Lazımi icazəni yoxla
    let required = request
        .headers()
        .get("X-Required-Ability")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("read");

    if !ability.contains(required) {
        return Err((
            StatusCode::FORBIDDEN,
            Json(serde_json::json!({
                "message": format!("Missing required permissions: {}", required)
            })),
        ));
    }

    Ok(next.run(request).await)
}
