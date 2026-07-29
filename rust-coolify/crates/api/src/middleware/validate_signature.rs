// completed file_0546
// Coolify mənbəsi: app/Http/Middleware/ValidateSignature.php
// İmzalanmış URL-lərin etibarlılığını yoxlayır (email verification, password reset, vs.)

use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;
use std::collections::HashMap;

/// ValidateSignature — Coolify: app/Http/Middleware/ValidateSignature.php
/// İmzalanmış URL-ləri yoxlayır. Laravel-də URL::signedRoute() ilə yaradılır.
/// Axum-da HMAC-SHA256 imzası ilə həll edilir.
pub async fn validate_signature(
    req: Request<Body>,
    next: Next,
) -> Response {
    let uri = req.uri().clone();
    let query = uri.query().unwrap_or("");

    // Query parametrlərini parse et
    let params: HashMap<String, String> = url::form_urlencoded::parse(query.as_bytes())
        .into_owned()
        .collect();

    let signature = match params.get("signature") {
        Some(s) => s.clone(),
        None => {
            return (
                StatusCode::FORBIDDEN,
                Json(json!({ "message": "This link is invalid or has expired." })),
            )
                .into_response();
        }
    };

    // İmzanın etibarlılığını yoxla
    let app_key = std::env::var("APP_KEY").unwrap_or_else(|_| "secret".to_string());
    let expires = params.get("expires").cloned().unwrap_or_default();

    // Vaxt yoxlaması
    if !expires.is_empty() {
        if let Ok(exp) = expires.parse::<i64>() {
            let now = chrono::Utc::now().timestamp();
            if now > exp {
                return (
                    StatusCode::FORBIDDEN,
                    Json(json!({ "message": "This link has expired." })),
                )
                    .into_response();
            }
        }
    }

    // URL imzasını yoxla (signature parametri olmadan URL-i hash et)
    let url_without_sig = format!(
        "{}?{}",
        uri.path(),
        params
            .iter()
            .filter(|(k, _)| k.as_str() != "signature")
            .map(|(k, v)| format!("{}={}", k, v))
            .collect::<Vec<_>>()
            .join("&")
    );

    use hmac::{Hmac, Mac};
    use sha2::Sha256;
    type HmacSha256 = Hmac<Sha256>;

    let mut mac = HmacSha256::new_from_slice(app_key.as_bytes())
        .expect("HMAC can take key of any size");
    mac.update(url_without_sig.as_bytes());
    let expected = hex::encode(mac.finalize().into_bytes());

    if signature != expected {
        return (
            StatusCode::FORBIDDEN,
            Json(json!({ "message": "This link is invalid." })),
        )
            .into_response();
    }

    next.run(req).await
}
