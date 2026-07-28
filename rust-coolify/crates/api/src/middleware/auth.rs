// completed be_1020
use axum::{
    body::Body,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
};
use rc_auth::session::validate_session;

pub async fn auth_middleware(
    mut req: Request<Body>,
    next: Next,
) -> Result<Response, StatusCode> {
    // Authorization header-i yoxla
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|header| header.to_str().ok());

    if let Some(auth_str) = auth_header {
        if auth_str.starts_with("Bearer ") {
            let token = &auth_str[7..];
            // Token-i auth crate vasitəsilə təsdiqlə
            // (Real token validation secret ətraf mühit dəyişənindən oxunur)
            let jwt_secret = std::env::var("JWT_SECRET").unwrap_or_else(|_| "secret".to_string());
            if let Ok(claims) = validate_session(token, &jwt_secret) {
                // Təsdiqlənmiş istifadəçi məlumatlarını sorğuya (request extensions) əlavə et
                req.extensions_mut().insert(claims);
                return Ok(next.run(req).await);
            }
        }
    }

    // Əgər token yoxdursa və ya etibarsızdırsa, 401 Unauthorized qaytar
    Err(StatusCode::UNAUTHORIZED)
}
