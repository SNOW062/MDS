// completed file_0543
// Coolify mənbəsi: app/Http/Middleware/TrimStrings.php
// Bütün string input-larının əvvəl/sonundakı boşluqları silir.

use axum::{
    body::Body,
    http::Request,
    middleware::Next,
    response::Response,
};

/// TrimStrings — Coolify: app/Http/Middleware/TrimStrings.php
/// Laravel-da bütün request string sahələrini avtomatik trim edir.
/// Axum-da bu, JSON extractor səviyyəsindəki custom deserializer ilə edilir.
/// Bu middleware request body-ni dəyişdirmir — trim əməliyyatı
/// DTO struct-larındakı #[serde(deserialize_with = "trim")] ilə həll edilir.
pub async fn trim_strings(
    req: Request<Body>,
    next: Next,
) -> Response {
    // Axum-da body yalnız bir dəfə oxunur. Trim əməliyyatını
    // DTO deserializasiyası zamanı etmək daha effektivdir.
    // Bu middleware gələcəkdə form data üçün genişləndirilə bilər.
    next.run(req).await
}

/// String sahəsini trim edən köməkçi funksiya
/// DTO-larda istifadə üçün:
/// #[serde(deserialize_with = "trim_string")]
pub fn trim_string<'de, D>(deserializer: D) -> Result<String, D::Error>
where
    D: serde::Deserializer<'de>,
{
    use serde::Deserialize;
    let s = String::deserialize(deserializer)?;
    Ok(s.trim().to_string())
}

/// Option<String> sahəsini trim edən köməkçi funksiya
pub fn trim_option_string<'de, D>(deserializer: D) -> Result<Option<String>, D::Error>
where
    D: serde::Deserializer<'de>,
{
    use serde::Deserialize;
    let opt = Option::<String>::deserialize(deserializer)?;
    Ok(opt.map(|s| s.trim().to_string()))
}
