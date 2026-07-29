// completed file_0537
// Coolify mənbəsi: app/Http/Middleware/EncryptCookies.php
// Laravel-də cookie-ləri şifrələyir. Axum-da cookie-lər
// tower-cookies ilə idarə olunur; bu middleware Axum üçün stub-dur.

use axum::{body::Body, http::Request, middleware::Next, response::Response};

/// EncryptCookies — Coolify: app/Http/Middleware/EncryptCookies.php
/// Laravel-da bütün cookie-ləri avtomatik şifrələyir/deşifrə edir.
/// Axum-da bu, `tower-cookies` crate-i ilə həll edilir.
/// Hal-hazırda API üçün cookie-şifrələmə tələb olunmur (Bearer token istifadə edilir).
pub async fn encrypt_cookies_middleware(
    req: Request<Body>,
    next: Next,
) -> Response {
    // API endpointləri üçün cookie şifrələmə tələb olunmur.
    // Əgər web session lazım olarsa, tower-cookies + AES-GCM əlavə et.
    next.run(req).await
}
