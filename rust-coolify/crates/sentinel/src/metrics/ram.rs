// completed be_1195
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RamMetrics {
    pub total_bytes: u64,
    pub used_bytes: u64,
    pub usage_percentage: f64,
}
