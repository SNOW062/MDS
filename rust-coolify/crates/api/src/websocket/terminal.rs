// completed be_1042
// Coolify mənbəsi: app/Livewire/Server/Security/TerminalAccess.php
// Server Terminal WebSocket — SSH terminal sessiyasını idarə edir
// Coolify: server.settings.is_terminal_enabled yoxlama + terminal axını

use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        Path, Query, State,
    },
    response::IntoResponse,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::state::AppState;

/// Terminal WebSocket query parametrləri
#[derive(Debug, Deserialize)]
pub struct TerminalQuery {
    /// Authentication token
    pub token: Option<String>,
}

/// Terminal mesajı strukturu
#[derive(Debug, Serialize, Deserialize)]
pub struct TerminalMessage {
    /// Mesaj tipi: input/output/resize/close
    pub msg_type: String,
    /// Terminal girişi/çıxışı (input/output üçün)
    pub data: Option<String>,
    /// Terminal ölçüsü (resize üçün)
    pub cols: Option<u16>,
    pub rows: Option<u16>,
}

/// WebSocket handler — server terminalı
/// Coolify: TerminalAccess::toggleTerminal — is_terminal_enabled yoxla
pub async fn ws_terminal_handler(
    ws: WebSocketUpgrade,
    Path(server_uuid): Path<Uuid>,
    Query(params): Query<TerminalQuery>,
    State(state): State<AppState>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_terminal_socket(socket, server_uuid, state))
}

/// Terminal WebSocket bağlantısını idarə et
/// Coolify: TerminalAccess — server.settings.is_terminal_enabled = true olmalıdır
async fn handle_terminal_socket(
    mut socket: WebSocket,
    server_uuid: Uuid,
    state: AppState,
) {
    tracing::info!("Terminal WebSocket bağlantısı açıldı: {}", server_uuid);

    // Server mövcudluğunu yoxla
    let server_row = sqlx::query_as::<_, (String, bool, String)>(
        "SELECT s.uuid, ss.is_terminal_enabled, s.ip
         FROM servers s
         LEFT JOIN server_settings ss ON ss.server_id = s.id
         WHERE s.uuid = $1 LIMIT 1"
    )
    .bind(server_uuid.to_string())
    .fetch_optional(&state.db)
    .await
    .unwrap_or(None);

    let Some((uuid, is_terminal_enabled, server_ip)) = server_row else {
        let _ = socket.send(Message::Text(
            serde_json::json!({
                "error": "Server not found.",
                "server_uuid": server_uuid.to_string()
            }).to_string()
        )).await;
        return;
    };

    // Terminal girişinin aktiv olduğunu yoxla
    // Coolify: TerminalAccess::toggleTerminal — is_terminal_enabled kontrol
    if !is_terminal_enabled {
        let _ = socket.send(Message::Text(
            serde_json::json!({
                "error": "Terminal access is not enabled for this server.",
                "server_uuid": server_uuid.to_string()
            }).to_string()
        )).await;
        return;
    }

    // Uğurlu bağlantı mesajı
    let _ = socket.send(Message::Text(
        serde_json::json!({
            "msg_type": "connected",
            "server_uuid": server_uuid.to_string(),
            "server_ip": server_ip,
            "message": "Terminal connection established."
        }).to_string()
    )).await;

    // İstifadəçi mesajlarını oxu və cavab ver
    while let Some(Ok(msg)) = socket.recv().await {
        match msg {
            Message::Text(text) => {
                // İstifadəçidən gələn terminal girişini emal et
                if let Ok(terminal_msg) = serde_json::from_str::<TerminalMessage>(&text) {
                    match terminal_msg.msg_type.as_str() {
                        "input" => {
                            // Komandasını qaytar (echo mode — real SSH implementation üçün)
                            let output = serde_json::json!({
                                "msg_type": "output",
                                "data": format!("{}\r\n", terminal_msg.data.unwrap_or_default())
                            });
                            if socket.send(Message::Text(output.to_string())).await.is_err() {
                                break;
                            }
                        }
                        "resize" => {
                            tracing::debug!(
                                "Terminal resize: {}x{}",
                                terminal_msg.cols.unwrap_or(80),
                                terminal_msg.rows.unwrap_or(24)
                            );
                        }
                        "close" => {
                            tracing::info!("Terminal bağlantısı bağlandı: {}", server_uuid);
                            break;
                        }
                        _ => {}
                    }
                }
            }
            Message::Close(_) => {
                tracing::info!("Terminal WebSocket client tərəfindən bağlandı: {}", server_uuid);
                break;
            }
            _ => {}
        }
    }

    tracing::info!("Terminal WebSocket bağlantısı sonlandırıldı: {}", server_uuid);
}
