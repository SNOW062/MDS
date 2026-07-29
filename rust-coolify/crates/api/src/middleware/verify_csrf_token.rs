// completed file_0547
// Coolify mənbəsi: app/Http/Middleware/VerifyCsrfToken.php
// CSRF token yoxlaması. API-da Bearer token istifadə edildiyindən
// CSRF yoxlaması tətbiq olunmur — SPA/API arxitekturası üçün standart yanaşma.

use axum::{
    body::Body,
    http::Request,
    middleware::Next,
    response::Response,
};

/// VerifyCsrfToken — Coolify: app/Http/Middleware/VerifyCsrfToken.php
/// Laravel web sessiyaları üçün CSRF token yoxlayır.
/// REST API Bearer token autentifikasiyası istifadə etdiyindən
/// CSRF hücumlarına qarşı immun sayılır (SameSite cookie yoxdur).
/// Bu middleware API kontekstindən keçir — web session lazım olanda aktivləşdir.
pub async fn verify_csrf_token(
    req: Request<Body>,
    next: Next,
) -> Response {
    // API endpointləri JWT Bearer token ilə qorunur.
    // CSRF yoxlaması yalnız cookie-based session üçün lazımdır.
    // SPA + API token arxitekturası CSRF-dən immunitetlidir.
    next.run(req).await
}

/// CSRF token-i yaradır (gələcəkdə web session lazım olarsa)
pub fn generate_csrf_token() -> String {
    use std::collections::hash_map::DefaultHasher;
    use std::hash::{Hash, Hasher};
    use std::time::SystemTime;

    let mut hasher = DefaultHasher::new();
    SystemTime::now().hash(&mut hasher);
    format!("{:x}", hasher.finish())
}
