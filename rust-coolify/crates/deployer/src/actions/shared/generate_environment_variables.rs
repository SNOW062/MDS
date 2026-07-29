// completed file_0407
// Coolify mənbəsi: Environment Variable Generator
use std::collections::HashMap;

pub struct EnvironmentVariableGenerator;

impl EnvironmentVariableGenerator {
    /// Tətbiq və ya verilənlər bazası üçün mühit dəyişənlərini `KEY=VALUE` formatına çevirir
    pub fn format_env_file(envs: &HashMap<String, String>) -> String {
        let mut lines = Vec::new();
        for (k, v) in envs {
            let escaped_val = v.replace('\n', "\\n").replace('"', "\\\"");
            lines.push(format!("{}=\"{}\"", k, escaped_val));
        }
        lines.join("\n")
    }

    /// Docker CLI `--env KEY=VALUE` bayraqlarını generasiya edir
    pub fn format_docker_args(envs: &HashMap<String, String>) -> Vec<String> {
        envs.iter()
            .map(|(k, v)| format!("-e {}={}", k, v))
            .collect()
    }
}
