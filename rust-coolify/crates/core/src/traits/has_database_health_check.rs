// completed file_0997
// Has Database Health Check Trait Engine for MasterDeploy Core Databases

use std::collections::HashMap;

pub trait HasDatabaseHealthCheck {
    fn isHealthcheckEnabled(&self) -> bool {
        true
    }

    fn healthCheckConfiguration(&self, test_cmd: Vec<String>, interval: Option<u32>, timeout: Option<u32>, retries: Option<u32>, start_period: Option<u32>) -> HashMap<String, serde_json::Value> {
        let mut map = HashMap::new();
        map.insert("test".to_string(), serde_json::json!(test_cmd));
        map.insert("interval".to_string(), serde_json::json!(format!("{}s", interval.unwrap_or(15))));
        map.insert("timeout".to_string(), serde_json::json!(format!("{}s", timeout.unwrap_or(5))));
        map.insert("retries".to_string(), serde_json::json!(retries.unwrap_or(5)));
        map.insert("start_period".to_string(), serde_json::json!(format!("{}s", start_period.unwrap_or(5))));
        map
    }

    fn healthCheckConfigurationHash(&self, enabled: bool, interval: u32, timeout: u32, retries: u32, start_period: u32) -> String {
        format!("{}|{}|{}|{}|{}", if enabled { 1 } else { 0 }, interval, timeout, retries, start_period)
    }
}
