// completed be_1023
use std::time::Duration;
use tower_http::limit::RequestBodyLimitLayer;

// Axum gələn sorğuların maksimum ölçüsünü (məsələn, böyük fayl yükləmələrini məhdudlaşdırmaq üçün) limitləyir
pub fn request_size_limit() -> RequestBodyLimitLayer {
    // Maksimum 10MB sorğu ölçüsü limit təyin edirik
    RequestBodyLimitLayer::new(10 * 1024 * 1024)
}
