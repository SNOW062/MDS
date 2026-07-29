// completed be_1194
use serde::{Serialize, Deserialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkMetrics {
    pub rx_bytes: u64,
    pub tx_bytes: u64,
}
