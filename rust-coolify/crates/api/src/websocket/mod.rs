// completed be_1041
// Coolify mənbəsi: routes/channels.php — WebSocket kanalları
// WebSocket modulu: deploy_log və terminal alt-modüllərini birləşdirir

pub mod deploy_log;
pub mod terminal;

use axum::{
    Router,
    routing::get,
};
use crate::state::AppState;

/// WebSocket router — bütün WebSocket endpointlərini birləşdirir
/// Coolify: channels.php — team.{teamId}, user.{userId} kanalları
pub fn router(state: AppState) -> Router {
    Router::new()
        // Deploy log streaming WebSocket
        // Coolify: team.{teamId} broadcast kanalı → deployment aktivlik logu
        .route(
            "/ws/deploy-log/:deployment_uuid",
            get(deploy_log::ws_deploy_log_handler),
        )
        // Terminal WebSocket
        // Coolify: user.{userId} broadcast kanalı → server terminal sessiyası
        .route(
            "/ws/terminal/:server_uuid",
            get(terminal::ws_terminal_handler),
        )
        .with_state(state)
}
