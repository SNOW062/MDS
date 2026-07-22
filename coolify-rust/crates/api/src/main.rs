use axum::{
    extract::Json,
    response::Html,
    routing::{get, post},
    Router,
};
use coolify_core::{Application, Server};
use coolify_deployer::Deployer;
use coolify_scheduler::Scheduler;
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};
use tracing::info;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

const DASHBOARD_HTML: &str = include_str!("../../../ui/index.html");

#[derive(Serialize)]
struct SystemHealth {
    status: &'static str,
    version: &'static str,
    engine: &'static str,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "coolify_api=debug,info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    info!("🚀 Initializing Coolify Rust v4 Engine...");
    Scheduler::start_background_jobs().await;

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/", get(serve_ui))
        .route("/health", get(health_check))
        .route("/api/v1/servers", get(list_servers).post(create_server))
        .route("/api/v1/applications", get(list_applications))
        .route("/api/v1/applications/deploy", post(deploy_app))
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8000));
    info!("⚡ Coolify Rust Control Center listening on http://localhost:8000");

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

async fn serve_ui() -> Html<&'static str> {
    Html(DASHBOARD_HTML)
}

async fn health_check() -> Json<SystemHealth> {
    Json(SystemHealth {
        status: "healthy",
        version: "4.0.0",
        engine: "Rust Axum Async Core",
    })
}

async fn list_servers() -> Json<Vec<Server>> {
    let servers = vec![
        Server::new("Localhost Docker Engine", "127.0.0.1"),
        Server::new("Production Hetzner Node 1", "159.69.42.100"),
    ];
    Json(servers)
}

#[derive(Deserialize)]
struct CreateServerReq {
    name: String,
    ip: String,
}

async fn create_server(Json(payload): Json<CreateServerReq>) -> Json<Server> {
    let new_server = Server::new(payload.name, payload.ip);
    info!("✅ Created Server: {} ({})", new_server.name, new_server.ip);
    Json(new_server)
}

async fn list_applications() -> Json<Vec<Application>> {
    let apps = vec![Application {
        id: 1,
        uuid: uuid::Uuid::new_v4().to_string(),
        name: "Coolify Dashboard Frontend".to_string(),
        git_repository: "SNOW062/MDS".to_string(),
        git_branch: "main".to_string(),
        build_pack: "nixpacks".to_string(),
        fqdn: Some("https://app.coolify.local".to_string()),
        ports_exposes: Some("3000:3000".to_string()),
        status: "running".to_string(),
        server_id: 1,
        created_at: chrono::Utc::now(),
    }];
    Json(apps)
}

#[derive(Deserialize)]
struct DeployAppReq {
    name: String,
    git_repository: String,
    git_branch: String,
}

#[derive(Serialize)]
struct DeployAppRes {
    success: bool,
    message: String,
}

async fn deploy_app(Json(payload): Json<DeployAppReq>) -> Json<DeployAppRes> {
    let dummy_app = Application {
        id: 99,
        uuid: uuid::Uuid::new_v4().to_string(),
        name: payload.name,
        git_repository: payload.git_repository,
        git_branch: payload.git_branch,
        build_pack: "dockerfile".to_string(),
        fqdn: Some("https://demo.local".to_string()),
        ports_exposes: Some("8080:8080".to_string()),
        status: "building".to_string(),
        server_id: 1,
        created_at: chrono::Utc::now(),
    };

    let msg = Deployer::deploy_application(&dummy_app)
        .await
        .unwrap_or_else(|e| e.to_string());

    Json(DeployAppRes {
        success: true,
        message: msg,
    })
}
