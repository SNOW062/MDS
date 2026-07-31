// completed file_0990
// Calculates Excluded Status Trait Engine for MasterDeploy Health Checks

use std::collections::HashMap;
use serde_json::Value;

pub trait CalculatesExcludedStatus {
    fn calculateExcludedStatus(&self, containers: &[HashMap<String, Value>], excluded_containers: &[String]) -> String {
        let excluded_only: Vec<&HashMap<String, Value>> = containers.iter().filter(|c| {
            if let Some(labels) = c.get("Config").and_then(|v| v.get("Labels")) {
                if let Some(service) = labels.get("com.docker.compose.service").and_then(|v| v.as_str()) {
                    return excluded_containers.contains(&service.to_string());
                }
            }
            false
        }).collect();

        let base_status = if excluded_only.is_empty() {
            "running:healthy".to_string()
        } else {
            "running:degraded".to_string()
        };

        self.appendExcludedSuffix(&base_status)
    }

    fn calculateExcludedStatusFromStrings(&self, container_statuses: &HashMap<String, String>) -> String {
        let base_status = if container_statuses.values().any(|s| s.contains("unhealthy")) {
            "running:unhealthy".to_string()
        } else {
            "running:healthy".to_string()
        };
        self.appendExcludedSuffix(&base_status)
    }

    fn appendExcludedSuffix(&self, status: &str) -> String {
        if status.starts_with("degraded") {
            return "degraded:excluded".to_string();
        }
        if status.starts_with("paused") {
            return "paused:excluded".to_string();
        }
        if status.starts_with("starting") {
            return "starting:excluded".to_string();
        }
        if status.starts_with("exited") {
            return "exited".to_string();
        }
        format!("{}:excluded", status)
    }

    fn getExcludedContainersFromDockerCompose(&self, docker_compose_raw: Option<&str>) -> Vec<String> {
        let mut excluded = vec![];
        if let Some(raw) = docker_compose_raw {
            if let Ok(parsed) = serde_yaml::from_str::<Value>(raw) {
                if let Some(services) = parsed.get("services").and_then(|v| v.as_object()) {
                    for (service_name, config) in services {
                        let exclude_from_hc = config.get("exclude_from_hc").and_then(|v| v.as_bool()).unwrap_or(false);
                        let restart_policy = config.get("restart").and_then(|v| v.as_str()).unwrap_or("always");

                        if exclude_from_hc || restart_policy == "no" {
                            excluded.push(service_name.clone());
                        }
                    }
                }
            }
        }
        excluded
    }
}
