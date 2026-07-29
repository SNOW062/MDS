// completed file_0493
// Coolify menkesi: app/Http/Kernel.php
// Laravel Application HTTP Kernel-in Rust ekvivalenti.
// Middleware qruplarini ve global middleware steklarini tanimladir.

/// HTTP Kernel -- middleware qruplarini tanimladir
/// Coolify: app/Http/Kernel.php
///
/// Laravel-de Kernel sinfi 3 qrup middleware-i tanimladir:
/// 1. $middleware         -- global (her sorguya)
/// 2. $middlewareGroups   -- web / api gruplar
/// 3. $routeMiddleware    -- alias ile cagrilan middleware-ler
///
/// Axum-da bu, Router::layer() ile tamin edilir.
/// Asagidaki funksiyalar main.rs-de istifade ucun hazirlanmisdir.

use axum::Router;

/// API middleware stack-ini tenkimleyen funksiya
/// Coolify: Kernel::$middlewareGroups['api']
pub fn apply_api_middleware(router: Router) -> Router {
    router
        .layer(crate::middleware::cors::cors_layer())
        .layer(crate::middleware::rate_limit::request_size_limit())
}

/// Web middleware stack-ini tenkimleyen funksiya
/// Coolify: Kernel::$middlewareGroups['web']
pub fn apply_web_middleware(router: Router) -> Router {
    // Web: session, CSRF, cookies -- geleceyde ele alinacaq
    router
        .layer(crate::middleware::cors::cors_layer())
}

/// Middleware alias-lari (Coolify: $routeMiddleware)
/// Bu adlar route-larda .layer() ile istifade edilir:
/// - "auth"          -> middleware::auth::auth_middleware
/// - "mcp"           -> middleware::ensure_mcp_enabled::ensure_mcp_enabled
/// - "team.mcp"      -> middleware::ensure_team_mcp_enabled::ensure_team_mcp_enabled
/// - "maintenance"   -> middleware::prevent_requests_during_maintenance
/// - "signed"        -> middleware::validate_signature::validate_signature
/// - "guest"         -> middleware::redirect_if_authenticated
pub struct KernelAliases;
