// completed be_1019
// ============================================================
// rc-api — MasterDeploy HTTP API Server (Entry Point)
// Coolify qarşılığı: routes/api.php + Http/Controllers/Api/
// ============================================================

mod state;
mod middleware;
mod routes;
mod websocket;
mod dto;

use axum::{Router, middleware::from_fn, middleware::Next, http::Request, response::Response};
use std::net::SocketAddr;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

async fn log_requests(req: Request<axum::body::Body>, next: Next) -> Response {
    let method = req.method().to_string();
    let uri = req.uri().to_string();
    let start = std::time::Instant::now();

    let response = next.run(req).await;

    let latency = start.elapsed();
    let status = response.status();

    tracing::info!(
        "🌐 [HTTP API] {} {} -> Status: {} ({}ms)",
        method, uri, status.as_u16(), latency.as_millis()
    );

    response
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env()
            .unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🚀 MasterDeploy API starting...");

    let state = state::AppState::new().await?;

    // Static UI fayllarını (Vite dist qovluğundan) serve edən route
    let ui_dist_path = std::env::var("UI_DIST_PATH").unwrap_or_else(|_| "ui/dist".to_string());
    tracing::info!("Serving static UI files from: {}", ui_dist_path);

    let app = Router::new()
        .merge(routes::health::router(state.clone()))
        .merge(routes::auth::router(state.clone()))
        .merge(routes::servers::router(state.clone()))
        .merge(routes::projects::router(state.clone()))
        .merge(routes::applications::router(state.clone()))
        .merge(routes::databases::router(state.clone()))
        .merge(routes::deployments::router(state.clone()))
        .merge(routes::services::router(state.clone()))
        .merge(routes::private_keys::router(state.clone()))
        .merge(routes::teams::router(state.clone()))
        .merge(routes::users::router(state.clone()))
        .merge(routes::settings::router(state.clone()))
        .merge(routes::storage::router(state.clone()))
        .merge(routes::scheduled_tasks::router(state.clone()))
        .merge(routes::webhooks::router(state.clone()))
        .merge(websocket::router(state.clone()))
        // UI static faylların paylanması (ServeDir)
        .fallback_service(
            tower_http::services::ServeDir::new(&ui_dist_path)
                .not_found_service(tower_http::services::ServeFile::new(format!("{}/index.html", ui_dist_path)))
        )
        .layer(from_fn(log_requests))
        .layer(middleware::cors::cors_layer())
        .layer(middleware::rate_limit::request_size_limit());

    let addr = SocketAddr::from(([0, 0, 0, 0], 9000));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
