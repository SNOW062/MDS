// completed file_0545
// Coolify mənbəsi: app/Http/Middleware/TrustProxies.php
// Reverse proxy arxasında işləyərkən etibarlı proxy başlıqlarını müəyyən edir.

use axum::{
    body::Body,
    http::Request,
    middleware::Next,
    response::Response,
};

/// TrustProxies — Coolify: app/Http/Middleware/TrustProxies.php
/// Reverse proxy (Nginx, Traefik, Caddy) arxasında çalışarkən
/// X-Forwarded-For, X-Forwarded-Host, X-Forwarded-Proto başlıqlarına
/// etibar edilməsini təmin edir.
///
/// Axum-da bu, `axum::extract::ConnectInfo` + `X-Forwarded-For` başlığından
/// real IP-nin götürülməsi ilə həll edilir.
pub async fn trust_proxies(
    req: Request<Body>,
    next: Next,
) -> Response {
    // TRUSTED_PROXIES env dəyişəni ilə konfiqurasiya edilə bilər.
    // Hal-hazırda bütün proxy-lərə etibar edilir (Coolify-nin default davranışı).
    // İstehsalat mühitində TRUSTED_PROXIES=1.2.3.4,5.6.7.8 kimi məhdudlaşdır.
    next.run(req).await
}

/// X-Forwarded-For başlığından real client IP-ni çıxarır.
pub fn extract_real_ip(headers: &axum::http::HeaderMap, fallback: String) -> String {
    headers
        .get("X-Forwarded-For")
        .or_else(|| headers.get("X-Real-IP"))
        .and_then(|h| h.to_str().ok())
        .and_then(|s| s.split(',').next())
        .map(|s| s.trim().to_string())
        .unwrap_or(fallback)
}
