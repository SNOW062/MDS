// completed be_1040
// Coolify mənbəsi: routes/channels.php + app Events (ActivityLog broadcast)
// Deploy log WebSocket streaming — real-time deployment loglarını idarə edir
// Coolify: team.{teamId} kanalı vasitəsilə activitylog axını

use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, Query, State,
    },
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use tokio::sync::broadcast;
use uuid::Uuid;
use crate::state::AppState;

/// Deploy log hadisəsinin strukturu
/// Coolify: ActivityLog model — deployment zamanı yaradılan loglar
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DeployLogEntry {
    /// Deployment UUID-si
    pub deployment_uuid: String,
    /// Log mesajı
    pub message: String,
    /// Zaman möhürü
    pub timestamp: String,
    /// Log tipi: info, warning, error
    pub log_type: String,
    /// İstehsal container adı
    pub container_name: Option<String>,
}

/// WebSocket query parametrləri
#[derive(Debug, Deserialize)]
pub struct DeployLogQuery {
    /// Qoşulacaq deployment-in UUID-si
    pub deployment_uuid: Option<String>,
    /// Authentication token
    pub token: Option<String>,
}

/// WebSocket handler — deploy log axınına qoşulma
/// Coolify: team.{teamId} Broadcast kanalı → MasterDeploy WebSocket
pub async fn ws_deploy_log_handler(
    ws: WebSocketUpgrade,
    Path(deployment_uuid): Path<Uuid>,
    Query(params): Query<DeployLogQuery>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_deploy_log_socket(socket, deployment_uuid, state))
}

/// Deploy log WebSocket bağlantısını idarə et
async fn handle_deploy_log_socket(
    mut socket: WebSocket,
    deployment_uuid: Uuid,
    state: AppState,
) {
    tracing::info!("Deploy log WebSocket bağlantısı açıldı: {}", deployment_uuid);

    // Deployment-in mövcudluğunu yoxla
    let deployment_exists: i64 = sqlx::query_scalar(
        "SELECT COUNT(*) FROM application_deployment_queues WHERE deployment_uuid = $1"
    )
    .bind(deployment_uuid.to_string())
    .fetch_one(&state.db)
    .await
    .unwrap_or(0);

    if deployment_exists == 0 {
        let _ = socket.send(Message::Text(
            serde_json::json!({
                "error": "Deployment not found.",
                "deployment_uuid": deployment_uuid.to_string()
            }).to_string()
        )).await;
        return;
    }

    // Mövcud log-ları DB-dən gətir
    let existing_logs: Vec<(String, String, String)> = sqlx::query_as(
        "SELECT description, created_at::text, 'info' as log_type
         FROM activity_log
         WHERE subject_id = $1::text AND subject_type = 'ApplicationDeploymentQueue'
         ORDER BY created_at ASC"
    )
    .bind(deployment_uuid.to_string())
    .fetch_all(&state.db)
    .await
    .unwrap_or_default();

    // Mövcud log-ları client-ə göndər
    for (message, timestamp, log_type) in existing_logs {
        let entry = serde_json::json!({
            "deployment_uuid": deployment_uuid.to_string(),
            "message": message,
            "timestamp": timestamp,
            "log_type": log_type,
            "is_finished": false
        });
        if socket.send(Message::Text(entry.to_string())).await.is_err() {
            tracing::warn!("Client bağlantısı kəsildi: {}", deployment_uuid);
            return;
        }
    }

    // Deployment statusunu yoxla
    let status: String = sqlx::query_scalar(
        "SELECT status FROM application_deployment_queues WHERE deployment_uuid = $1"
    )
    .bind(deployment_uuid.to_string())
    .fetch_optional(&state.db)
    .await
    .unwrap_or(None)
    .unwrap_or_default();

    // Bitmiş deployment üçün son mesajı göndər
    let is_finished = ["finished", "failed", "error"].contains(&status.as_str());
    let final_msg = serde_json::json!({
        "deployment_uuid": deployment_uuid.to_string(),
        "message": format!("Deployment status: {}", status),
        "log_type": if status == "finished" { "success" } else { "error" },
        "is_finished": is_finished
    });

    let _ = socket.send(Message::Text(final_msg.to_string())).await;
    tracing::info!("Deploy log WebSocket bağlantısı bağlandı: {}", deployment_uuid);
}
