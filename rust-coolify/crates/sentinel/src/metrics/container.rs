// completed be_1190
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContainerMetrics {
    pub container_id: String,
    pub cpu_percentage: f64,
    pub memory_usage_bytes: u64,
}
