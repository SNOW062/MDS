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

    let ui_dist_path = std::env::var("UI_DIST_PATH").unwrap_or_else(|_| "ui/dist".to_string());
    tracing::info!("Serving static UI files from: {}", ui_dist_path);

    // SPA Fallback və Local Dev Proxy
    // APP_ENV=local olarsa, backend sorğuları arxa fondakı Vite dev server-ə (frontend:5173) ötürür
    let is_local = std::env::var("APP_ENV").unwrap_or_default() == "local";
    
    // Axum 0.7 Handler-i xidmətə (Service) çevirmək üçün tower::service_fn istifadə edirik
    let ui_dist_path_clone = ui_dist_path.clone();
    let fallback_service = tower::service_fn(move |req: axum::extract::Request| {
        let ui_dist_path = ui_dist_path_clone.clone();
        async move {
            // Əgər istək static fayldırsa və dist qovluğunda mövcuddursa, onu serve edirik
            let path = req.uri().path();
            let filepath = format!("{}{}", ui_dist_path, path);
            if std::path::Path::new(&filepath).is_file() {
                use tower::ServiceExt;
                let serve_dir = tower_http::services::ServeDir::new(&ui_dist_path);
                let res = serve_dir.oneshot(req).await.unwrap();
                return Ok::<_, std::convert::Infallible>(res.map(axum::body::Body::new));
            }

            if is_local {
                // Vite dev server-ə proxy edirik
                let client = reqwest::Client::builder()
                    .no_proxy() // Docker daxilindəki adlar üçün system proxy-ni atla
                    .build()
                    .unwrap_or_default();

                let path_query = req.uri().path_and_query().map(|pq| pq.as_str()).unwrap_or("");
                let target_url = format!("http://frontend:5173{}", path_query);
                tracing::info!("🔮 [Vite Proxy] Routing: {} -> {}", req.uri(), target_url);

                // Hop-by-hop header-ləri atlamaq lazımdır, əks halda response builder uğursuz olur
                const HOP_BY_HOP: &[&str] = &[
                    "host", "connection", "keep-alive", "transfer-encoding",
                    "te", "trailer", "proxy-authorization", "proxy-authenticate",
                ];

                let method = req.method().clone();
                let mut proxy_req = client.request(method, &target_url);

                // Yalnız təhlükəsiz header-ləri kopyalayırıq
                for (name, value) in req.headers() {
                    let lower = name.as_str().to_lowercase();
                    if !HOP_BY_HOP.contains(&lower.as_str()) {
                        proxy_req = proxy_req.header(name.as_str(), value.as_bytes());
                    }
                }

                // Göndəririk və cavabı axum response-a çeviririk
                match proxy_req.send().await {
                    Ok(res) => {
                        let status = res.status();
                        tracing::info!("🔮 [Vite Proxy] Response from Vite: {} -> Status: {}", target_url, status);
                        
                        // Copy headers to a HeaderMap first before moving `res`
                        let mut headers = axum::http::HeaderMap::new();
                        for (key, val) in res.headers() {
                            let lower = key.as_str().to_lowercase();
                            if !HOP_BY_HOP.contains(&lower.as_str()) {
                                headers.insert(key.clone(), val.clone());
                            }
                        }

                        match res.bytes().await {
                            Ok(bytes) => {
                                let mut response = axum::response::Response::new(axum::body::Body::from(bytes));
                                *response.status_mut() = status;
                                *response.headers_mut() = headers;
                                return Ok::<_, std::convert::Infallible>(response);
                            }
                            Err(e) => {
                                tracing::warn!("Proxy response body oxunarkən xəta: {}", e);
                            }
                        }
                    }
                    Err(e) => {
                        tracing::warn!("Proxy sorğusu uğursuz oldu (frontend:5173): {}", e);
                    }
                }
            }

            // Production rejimində və ya proxy alınmadıqda statik index.html-i serve edirik
            let ui_dist = std::env::var("UI_DIST_PATH").unwrap_or_else(|_| "ui/dist".to_string());
            let index_path = format!("{}/index.html", ui_dist);
            let resp = if let Ok(content) = std::fs::read_to_string(&index_path) {
                axum::response::Response::builder()
                    .header("content-type", "text/html")
                    .body(axum::body::Body::from(content))
                    .unwrap()
            } else {
                axum::response::Response::builder()
                    .status(404)
                    .body(axum::body::Body::from("Frontend build tapılmadı. Zəhmət olmasa docker build edin."))
                    .unwrap()
            };
            Ok::<_, std::convert::Infallible>(resp)
        }
    });


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
        .merge(routes::cloud_provider_tokens::router(state.clone()))
        .merge(routes::teams::router(state.clone()))
        .merge(routes::users::router(state.clone()))
        .merge(routes::settings::router(state.clone()))
        .merge(routes::storage::router(state.clone()))
        .merge(routes::scheduled_tasks::router(state.clone()))
        .merge(routes::webhooks::router(state.clone()))
        .merge(websocket::router(state.clone()))
        .fallback_service(fallback_service)
        .layer(from_fn(log_requests))
        .layer(middleware::cors::cors_layer())
        .layer(middleware::rate_limit::request_size_limit());

    let addr = SocketAddr::from(([0, 0, 0, 0], 9000));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}

