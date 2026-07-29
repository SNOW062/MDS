// completed be_1123
// Coolify menkesi: app/Events/*, broadcast/
// Deploy surecinde bas veren hadiseler

use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DeployEvent {
    /// Deploy siraya elave edildi
    Queued {
        deployment_uuid: Uuid,
        application_uuid: Uuid,
    },
    /// Deploy basladi
    Started {
        deployment_uuid: Uuid,
        started_at: DateTime<Utc>,
    },
    /// Git repo klonlanir
    GitCloning {
        deployment_uuid: Uuid,
        repository: String,
        branch: String,
    },
    /// Build basladi (nixpacks, dockerfile, vs.)
    BuildStarted {
        deployment_uuid: Uuid,
        build_pack: String,
    },
    /// Log satiri (real-time stream)
    LogLine {
        deployment_uuid: Uuid,
        line: String,
        timestamp: DateTime<Utc>,
    },
    /// Konteyner bashladi
    ContainerStarted {
        deployment_uuid: Uuid,
        container_id: String,
    },
    /// Saglamliq yoxlamasi kecdi
    HealthCheckPassed {
        deployment_uuid: Uuid,
    },
    /// Deploy ugurla tamamlandi
    Completed {
        deployment_uuid: Uuid,
        application_uuid: Uuid,
        duration_secs: u64,
    },
    /// Deploy xeta ile bitdi
    Failed {
        deployment_uuid: Uuid,
        error: String,
    },
    /// Deploy legv edildi
    Cancelled {
        deployment_uuid: Uuid,
    },
}

impl DeployEvent {
    pub fn deployment_uuid(&self) -> Option<Uuid> {
        match self {
            Self::Queued { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::Started { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::GitCloning { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::BuildStarted { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::LogLine { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::ContainerStarted { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::HealthCheckPassed { deployment_uuid } => Some(*deployment_uuid),
            Self::Completed { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::Failed { deployment_uuid, .. } => Some(*deployment_uuid),
            Self::Cancelled { deployment_uuid } => Some(*deployment_uuid),
        }
    }

    pub fn is_terminal(&self) -> bool {
        matches!(
            self,
            Self::Completed { .. } | Self::Failed { .. } | Self::Cancelled { .. }
        )
    }
}
