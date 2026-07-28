// completed be_1021
use tower_http::cors::{Any, CorsLayer};
use axum::http::Method;

pub fn cors_layer() -> CorsLayer {
    CorsLayer::new()
        // Gələcəkdə istehsalat mühitində origin məhdudlaşdırıla bilər
        .allow_origin(Any)
        .allow_methods([
            Method::GET,
            Method::POST,
            Method::PUT,
            Method::DELETE,
            Method::OPTIONS,
            Method::PATCH,
        ])
        .allow_headers(Any)
}
