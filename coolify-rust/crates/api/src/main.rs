use axum::{routing::get, Json, Router};
use serde_json::{json, Value};
use std::net::SocketAddr;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    dotenvy::dotenv().ok();

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    tracing::info!("🚀 Coolify-Rust API Server starting...");

    let app = Router::new()
        .route("/health", get(health_check))
        .route("/api/v1/version", get(version_handler));

    let addr = SocketAddr::from(([127, 0, 0, 1], 8000));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn health_check() -> &'static str {
    "OK"
}

async fn version_handler() -> Json<Value> {
    Json(json!({
        "name": "Coolify-Rust",
        "version": "0.1.0",
        "status": "active"
    }))
}
