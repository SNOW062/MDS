use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum BuildPack {
    Nixpacks,
    Dockerfile,
    DockerCompose,
    StaticHtml,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum DetectedLanguage {
    NodeJS,
    Python,
    Rust,
    Go,
    PHP,
    Ruby,
    Unknown,
}

pub struct DeployerEngine;

impl DeployerEngine {
    pub fn detect_language(file_list: &[&str]) -> DetectedLanguage {
        if file_list.contains(&"package.json") {
            DetectedLanguage::NodeJS
        } else if file_list.contains(&"requirements.txt") || file_list.contains(&"pyproject.toml") {
            DetectedLanguage::Python
        } else if file_list.contains(&"Cargo.toml") {
            DetectedLanguage::Rust
        } else if file_list.contains(&"go.mod") {
            DetectedLanguage::Go
        } else if file_list.contains(&"composer.json") {
            DetectedLanguage::PHP
        } else if file_list.contains(&"Gemfile") {
            DetectedLanguage::Ruby
        } else {
            DetectedLanguage::Unknown
        }
    }

    pub fn detect_buildpack(file_list: &[&str]) -> BuildPack {
        if file_list.contains(&"docker-compose.yml") || file_list.contains(&"docker-compose.yaml") {
            BuildPack::DockerCompose
        } else if file_list.contains(&"Dockerfile") {
            BuildPack::Dockerfile
        } else {
            BuildPack::Nixpacks
        }
    }

    pub fn build_nixpacks_cmd(app_dir: &str, image_name: &str) -> String {
        format!("nixpacks build {} --name {}", app_dir, image_name)
    }

    pub fn build_docker_run_cmd(image_name: &str, container_name: &str, port_mapping: &str) -> String {
        format!(
            "docker run -d --name {} --restart unless-stopped -p {} {}",
            container_name, port_mapping, image_name
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_detect_language() {
        assert_eq!(DeployerEngine::detect_language(&["package.json", "src/index.js"]), DetectedLanguage::NodeJS);
        assert_eq!(DeployerEngine::detect_language(&["requirements.txt", "main.py"]), DetectedLanguage::Python);
        assert_eq!(DeployerEngine::detect_language(&["Cargo.toml", "src/main.rs"]), DetectedLanguage::Rust);
        assert_eq!(DeployerEngine::detect_language(&["go.mod", "main.go"]), DetectedLanguage::Go);
        assert_eq!(DeployerEngine::detect_language(&["composer.json", "index.php"]), DetectedLanguage::PHP);
    }

    #[test]
    fn test_detect_buildpack() {
        assert_eq!(DeployerEngine::detect_buildpack(&["docker-compose.yml", "src"]), BuildPack::DockerCompose);
        assert_eq!(DeployerEngine::detect_buildpack(&["Dockerfile", "src"]), BuildPack::Dockerfile);
        assert_eq!(DeployerEngine::detect_buildpack(&["package.json", "src"]), BuildPack::Nixpacks);
    }

    #[test]
    fn test_nixpacks_cmd_builder() {
        let cmd = DeployerEngine::build_nixpacks_cmd("/var/apps/my-app", "my-app:latest");
        assert_eq!(cmd, "nixpacks build /var/apps/my-app --name my-app:latest");
    }

    #[test]
    fn test_docker_run_cmd_builder() {
        let cmd = DeployerEngine::build_docker_run_cmd("my-app:latest", "container_my_app", "3000:3000");
        assert_eq!(cmd, "docker run -d --name container_my_app --restart unless-stopped -p 3000:3000 my-app:latest");
    }
}
