// completed file_0494
// Coolify mənbəsi: app/Http/Controllers/Controller.php
// Bazis controller — Axum üçün ümumi yardımçı funksiyalar

use axum::http::StatusCode;
use axum::Json;
use serde_json::json;

/// Standart API xəta cavabı
pub fn api_error(status: StatusCode, message: &str) -> (StatusCode, Json<serde_json::Value>) {
    (status, Json(json!({ "message": message })))
}

/// Uğurlu API cavabı
pub fn api_success(message: &str) -> Json<serde_json::Value> {
    Json(json!({ "message": message }))
}

/// Etibarsız token cavabı — Coolify: invalidTokenResponse()
pub fn invalid_token_response() -> (StatusCode, Json<serde_json::Value>) {
    api_error(StatusCode::UNAUTHORIZED, "Invalid token.")
}

/// Tapılmadı cavabı
pub fn not_found_response(resource: &str) -> (StatusCode, Json<serde_json::Value>) {
    api_error(StatusCode::NOT_FOUND, &format!("{} not found.", resource))
}

/// Validasiya xətası cavabı
pub fn validation_error(errors: &str) -> (StatusCode, Json<serde_json::Value>) {
    (StatusCode::UNPROCESSABLE_ENTITY, Json(json!({ "errors": errors })))
}

/// Səhifələnmiş sorğu üçün offset/limit hesablayan köməkçi
pub fn paginate(skip: Option<i64>, take: Option<i64>) -> (i64, i64) {
    let limit = take.unwrap_or(20).clamp(1, 100);
    let offset = skip.unwrap_or(0).max(0);
    (limit, offset)
}
