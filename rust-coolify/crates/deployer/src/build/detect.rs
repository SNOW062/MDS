// completed be_1113
// Coolify menkesi: Services/DeploymentConfiguration/* + Build pack detect
// Repo icindeki fayllara gore uygun buildpack askarlanir

use crate::engine::DeployContext;

/// Desteklenen buildpack novleri
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum BuildPack {
    Nixpacks,
    Dockerfile,
    DockerCompose,
    StaticHtml,
    DockerImage,
}

impl BuildPack {
    pub fn as_str(&self) -> &'static str {
        match self {
            Self::Nixpacks => "nixpacks",
            Self::Dockerfile => "dockerfile",
            Self::DockerCompose => "docker-compose",
            Self::StaticHtml => "static",
            Self::DockerImage => "docker-image",
        }
    }

    pub fn from_str(s: &str) -> Self {
        match s.to_lowercase().as_str() {
            "nixpacks" => Self::Nixpacks,
            "dockerfile" => Self::Dockerfile,
            "docker-compose" | "dockercompose" => Self::DockerCompose,
            "static" | "static_html" => Self::StaticHtml,
            "docker-image" => Self::DockerImage,
            _ => Self::Nixpacks,
        }
    }
}

/// Repo icindeki fayllara gore buildpack askarla
/// Coolify: Services/DeploymentConfiguration/BuildPack.php
pub fn detect_build_pack(repo_path: &str) -> BuildPack {
    let path = std::path::Path::new(repo_path);

    // Docker Compose
    if path.join("docker-compose.yml").exists()
        || path.join("docker-compose.yaml").exists()
        || path.join("compose.yml").exists()
        || path.join("compose.yaml").exists()
    {
        return BuildPack::DockerCompose;
    }

    // Dockerfile
    if path.join("Dockerfile").exists() || path.join("dockerfile").exists() {
        return BuildPack::Dockerfile;
    }

    // Static HTML (yalniz HTML fayil varsa)
    if path.join("index.html").exists()
        && !path.join("package.json").exists()
        && !path.join("Gemfile").exists()
        && !path.join("requirements.txt").exists()
    {
        return BuildPack::StaticHtml;
    }

    // Default: Nixpacks (Node, Python, Ruby, Go, Rust, vs. askarlar)
    BuildPack::Nixpacks
}

/// Buildpack-i kontekst-den al
pub fn build_pack_from_context(ctx: &DeployContext) -> BuildPack {
    BuildPack::from_str(&ctx.build_pack)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_build_pack_from_str() {
        assert_eq!(BuildPack::from_str("nixpacks"), BuildPack::Nixpacks);
        assert_eq!(BuildPack::from_str("dockerfile"), BuildPack::Dockerfile);
        assert_eq!(BuildPack::from_str("docker-compose"), BuildPack::DockerCompose);
        assert_eq!(BuildPack::from_str("static"), BuildPack::StaticHtml);
    }
}
