// completed be_1077
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum BuildPack {
    Nixpacks,
    Dockerfile,
    DockerCompose,
    Static,
}
