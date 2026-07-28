// completed file_0530
// Coolify mənbəsi: app/Http/Middleware/ApiSensitiveData.php
// Həssas API məlumatları middleware
// Coolify: token.can('root') || token.can('read:sensitive') → can_read_sensitive = true

use axum::{
    extract::Request,
    middleware::Next,
    response::Response,
    http::{StatusCode, HeaderValue},
};

/// Həssas API məlumatları middleware
/// Coolify: ApiSensitiveData::handle — can_read_sensitive flag'ini request-ə əlavə et
pub async fn check_api_sensitive_data(
    mut request: Request,
    next: Next,
) -> Response {
    // Token icazəsini yoxla (Coolify: token.can('root') || token.can('read:sensitive'))
    let has_sensitive_perm = request
        .headers()
        .get("X-API-Ability")
        .and_then(|v| v.to_str().ok())
        .map(|ability| ability.contains("root") || ability.contains("read:sensitive"))
        .unwrap_or(false);

    // Həssas oxuma icazəsini request extensions-a əlavə et
    // Coolify: $request->attributes->add(['can_read_sensitive' => $hasTokenPermission && $isAdmin])
    request.extensions_mut().insert(CanReadSensitive(has_sensitive_perm));

    next.run(request).await
}

/// Həssas məlumat oxuma icazəsi extension-u
#[derive(Clone, Copy, Debug)]
pub struct CanReadSensitive(pub bool);
