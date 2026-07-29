// completed file_0544
// Coolify mənbəsi: app/Http/Middleware/TrustHosts.php
// Etibarlı host-ların siyahısını müəyyən edir.

use axum::{
    body::Body,
    http::{Request, StatusCode, HeaderMap},
    middleware::Next,
    response::{IntoResponse, Response},
    Json,
};
use serde_json::json;

/// TrustHosts — Coolify: app/Http/Middleware/TrustHosts.php
/// Yalnız etibarlı host başlıqlarından gələn sorğulara icazə verir.
/// Coolify-də APP_URL əsasında müəyyən edilir.
pub async fn trust_hosts(
    req: Request<Body>,
    next: Next,
) -> Response {
    let app_url = std::env::var("APP_URL").unwrap_or_else(|_| "http://localhost:8000".to_string());

    // APP_URL-dən host çıxart
    let trusted_host = app_url
        .replace("https://", "")
        .replace("http://", "")
        .split('/')
        .next()
        .unwrap_or("localhost")
        .to_string();

    if let Some(host_header) = req.headers().get("host") {
        if let Ok(host_str) = host_header.to_str() {
            // host:port formatında ola bilər
            let request_host = host_str.split(':').next().unwrap_or(host_str);

            // localhost həmişə etibarlıdır
            if request_host != "localhost"
                && request_host != "127.0.0.1"
                && request_host != trusted_host
            {
                return (
                    StatusCode::BAD_REQUEST,
                    Json(json!({ "message": "Untrusted host." })),
                )
                    .into_response();
            }
        }
    }

    next.run(req).await
}
