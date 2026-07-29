// completed be_1018
// Data Transfer Objects for MasterDeploy API

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateServerDto {
    pub name: String,
    pub description: Option<String>,
    pub ip: String,
    pub port: Option<i32>,
    pub user: Option<String>,
    pub private_key_id: Option<Uuid>,
    pub is_build_server: Option<bool>,
    pub wildcard_domain: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateServerDto {
    pub name: Option<String>,
    pub description: Option<String>,
    pub ip: Option<String>,
    pub port: Option<i32>,
    pub user: Option<String>,
    pub private_key_id: Option<Uuid>,
    pub is_build_server: Option<bool>,
    pub wildcard_domain: Option<String>,
    pub proxy_type: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateApplicationDto {
    pub project_id: Uuid,
    pub environment_name: String,
    pub server_id: Uuid,
    pub name: String,
    pub git_repository: String,
    pub git_branch: String,
    pub build_pack: String,
    pub ports_exposes: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateApplicationDto {
    pub name: Option<String>,
    pub fqdn: Option<String>,
    pub git_branch: Option<String>,
    pub build_command: Option<String>,
    pub start_command: Option<String>,
    pub ports_exposes: Option<String>,
    pub ports_mappings: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateDatabaseDto {
    pub server_id: Uuid,
    pub name: String,
    pub engine: String,
    pub db_user: String,
    pub db_password: String,
    pub db_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DeploymentTriggerDto {
    pub application_id: Uuid,
    pub commit_sha: Option<String>,
    pub force_rebuild: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ApiResponse<T> {
    pub success: bool,
    pub message: Option<String>,
    pub data: Option<T>,
}
