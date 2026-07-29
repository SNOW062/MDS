// completed be_1191
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CpuMetrics {
    pub usage_percentage: f64,
    pub core_count: usize,
}
