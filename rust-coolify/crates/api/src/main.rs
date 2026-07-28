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

use axum::Router;
use std::net::SocketAddr;
use tower_http::services::{ServeDir, ServeFile};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

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

    let app = Router::new()
        .merge(routes::health::router())
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
        // Middleware laylarını qlobal olaraq bütün marşrutlara tətbiq edirik
        .layer(middleware::cors::cors_layer())
        .layer(middleware::rate_limit::request_size_limit());

    let addr = SocketAddr::from(([0, 0, 0, 0], 8000));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
