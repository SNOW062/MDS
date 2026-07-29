// completed file_0963
// Coolify mənbəsi: app/Rules/ValidCloudInitYaml.php

pub struct ValidCloudInitYaml;

impl ValidCloudInitYaml {
    /// Cloud-Init skriptinin shebang (#!) ilə başlayan bash skripti və ya #cloud-config YAML faylı olmasını yoxlayır
    pub fn validate(script_content: &str) -> Result<(), String> {
        let trimmed = script_content.trim();
        if trimmed.is_empty() {
            return Ok(());
        }

        // 1. Əgər shebang ilə başlayırsa (#!/bin/bash), bash skriptidir, YAML parse tələb olunmur
        if trimmed.starts_with("#!") {
            return Ok(());
        }

        // 2. Əgər #cloud-config ilə başlayırsa
        if trimmed.starts_with("#cloud-config") {
            let yaml_body = trimmed.trim_start_matches("#cloud-config").trim();
            if yaml_body.is_empty() {
                return Ok(());
            }

            return serde_yaml::from_str::<serde_json::Value>(yaml_body)
                .map(|_| ())
                .map_err(|e| format!("Invalid cloud-config YAML format: {}", e));
        }

        // 3. Əgər префикс yoxdursa, birbaşa YAML kimi parse etməyə cəhd edirik
        serde_yaml::from_str::<serde_json::Value>(trimmed)
            .map(|_| ())
            .map_err(|e| format!("The cloud-init script must be either a valid bash script starting with '#!' or a valid cloud-config YAML. Error: {}", e))
    }
}
