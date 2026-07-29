// completed be_1145
// Coolify mənbəsi: Notifications/Events/NotificationEvent.php
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum NotificationEvent {
    DeploymentFailed {
        application_name: String,
        deployment_uuid: String,
        reason: String,
    },
    DeploymentSuccess {
        application_name: String,
        deployment_uuid: String,
        url: Option<String>,
    },
    StatusChanged {
        resource_name: String,
        old_status: String,
        new_status: String,
    },
    BackupFailed {
        database_name: String,
        error: String,
    },
    BackupSuccess {
        database_name: String,
        size_bytes: u64,
    },
    HighDiskUsage {
        server_name: String,
        percentage: u8,
    },
    ServerUnreachable {
        server_name: String,
        ip: String,
    },
    SslExpiring {
        domain: String,
        days_remaining: u32,
    },
}
