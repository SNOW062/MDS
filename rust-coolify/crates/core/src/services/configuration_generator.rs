// completed file_0972
// Configuration Generator Engine for MasterDeploy Application Deployment Spec

use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ApplicationConfigResource {
    pub id: Uuid,
    pub name: String,
    pub uuid: String,
    pub description: Option<String>,
    pub build_pack: String,
    pub fqdn: Option<String>,
    pub git_repository: Option<String>,
    pub git_branch: Option<String>,
    pub dockerfile: Option<String>,
    pub settings: HashMap<String, serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ConfigurationGenerator {
    pub config: HashMap<String, serde_json::Value>,
}

impl ConfigurationGenerator {
    pub fn __construct(resource: &ApplicationConfigResource) -> Self {
        let mut gen = Self { config: HashMap::new() };
        gen.generateConfig(resource);
        gen
    }

    pub fn generateConfig(&mut self, resource: &ApplicationConfigResource) {
        let mut config = HashMap::new();
        config.insert("id".to_string(), serde_json::json!(resource.id));
        config.insert("name".to_string(), serde_json::json!(resource.name));
        config.insert("uuid".to_string(), serde_json::json!(resource.uuid));
        config.insert("description".to_string(), serde_json::json!(resource.description));

        config.insert("build".to_string(), serde_json::json!({
            "type": resource.build_pack,
            "dockerfile": resource.dockerfile,
        }));

        config.insert("docker_registry_image".to_string(), serde_json::json!(self.getDockerRegistryImage(resource)));
        config.insert("environment_variables".to_string(), serde_json::json!({
            "production": self.getEnvironmentVariables(resource),
            "preview": self.getPreviewEnvironmentVariables(resource),
        }));
        config.insert("settings".to_string(), serde_json::json!(self.getApplicationSettings(resource)));
        config.insert("preview".to_string(), serde_json::json!(self.getPreview(resource)));

        self.config = config;
    }

    pub fn getPreview(&self, _resource: &ApplicationConfigResource) -> HashMap<String, String> {
        let mut map = HashMap::new();
        map.insert("preview_url_template".to_string(), "{{pr_id}}.example.com".to_string());
        map
    }

    pub fn getDockerRegistryImage(&self, _resource: &ApplicationConfigResource) -> HashMap<String, String> {
        let mut map = HashMap::new();
        map.insert("image".to_string(), "masterdeploy/app".to_string());
        map.insert("tag".to_string(), "latest".to_string());
        map
    }

    pub fn getEnvironmentVariables(&self, _resource: &ApplicationConfigResource) -> Vec<HashMap<String, serde_json::Value>> {
        vec![]
    }

    pub fn getPreviewEnvironmentVariables(&self, _resource: &ApplicationConfigResource) -> Vec<HashMap<String, serde_json::Value>> {
        vec![]
    }

    pub fn getApplicationSettings(&self, resource: &ApplicationConfigResource) -> HashMap<String, serde_json::Value> {
        let mut settings = resource.settings.clone();
        settings.remove("id");
        settings.remove("application_id");
        settings.remove("created_at");
        settings.remove("updated_at");
        settings
    }

    pub fn saveJson(&self, path: &str) -> Result<()> {
        let json = self.toJson()?;
        fs::write(path, json)?;
        Ok(())
    }

    pub fn saveYaml(&self, path: &str) -> Result<()> {
        let yaml = self.toYaml()?;
        fs::write(path, yaml)?;
        Ok(())
    }

    pub fn toArray(&self) -> HashMap<String, serde_json::Value> {
        self.config.clone()
    }

    pub fn toJson(&self) -> Result<String> {
        Ok(serde_json::to_string_pretty(&self.config)?)
    }

    pub fn toYaml(&self) -> Result<String> {
        Ok(serde_json::to_string(&self.config)?)
    }
}
