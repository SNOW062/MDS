// completed be_1118
// Coolify menkesi: Environment variable management for deployments

use std::collections::HashMap;

/// Environment variable-lari docker run ucun formatlayir
/// KEY=value formatinda
pub fn format_env_vars(vars: &HashMap<String, String>) -> Vec<String> {
    vars.iter()
        .map(|(k, v)| format!("{}={}", k, v))
        .collect()
}

/// docker run -e parametrleri ucun string yarat
pub fn to_docker_args(vars: &HashMap<String, String>) -> String {
    vars.iter()
        .map(|(k, v)| format!("-e {}={}", k, shell_escape(v)))
        .collect::<Vec<_>>()
        .join(" ")
}

/// Shell injection-dan qorumaq ucun deger qaydanlasdir
fn shell_escape(s: &str) -> String {
    format!("'{}'", s.replace('\'', "'\\''"))
}

/// Coolify-nin elave etdiyi sistem env deyerleri
pub fn system_env_vars(app_uuid: &str, deployment_uuid: &str) -> HashMap<String, String> {
    let mut vars = HashMap::new();
    vars.insert("COOLIFY_APP_UUID".to_string(), app_uuid.to_string());
    vars.insert("COOLIFY_DEPLOYMENT_UUID".to_string(), deployment_uuid.to_string());
    vars.insert("COOLIFY_MANAGED".to_string(), "true".to_string());
    vars
}
