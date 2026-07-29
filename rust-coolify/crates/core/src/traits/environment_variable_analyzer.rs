// completed file_0993
// Coolify mənbəsi: app/Traits/EnvironmentVariableAnalyzer.php
use serde::{Serialize, Deserialize};
use std::collections::HashMap;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EnvironmentWarning {
    pub key: String,
    pub value: String,
    pub affects: String,
    pub issue: String,
    pub recommendation: String,
}

pub struct EnvironmentVariableAnalyzer;

impl EnvironmentVariableAnalyzer {
    /// Build prosesində problemlərə səbəb ola biləcək mühit dəyişənlərini təhlil edir
    pub fn analyze_build_variables(envs: &HashMap<String, String>) -> Vec<EnvironmentWarning> {
        let mut warnings = Vec::new();

        if let Some(val) = envs.get("NODE_ENV") {
            if val == "production" || val == "prod" {
                warnings.push(EnvironmentWarning {
                    key: "NODE_ENV".to_string(),
                    value: val.clone(),
                    affects: "Node.js/npm/yarn/pnpm/bun".to_string(),
                    issue: "Skips devDependencies installation which are often required for building (webpack, tsc, vite)".to_string(),
                    recommendation: "Uncheck 'Available at Buildtime' or set NODE_ENV=development during build phase".to_string(),
                });
            }
        }

        if let Some(val) = envs.get("NPM_CONFIG_PRODUCTION") {
            if val == "true" || val == "1" {
                warnings.push(EnvironmentWarning {
                    key: "NPM_CONFIG_PRODUCTION".to_string(),
                    value: val.clone(),
                    affects: "npm/pnpm".to_string(),
                    issue: "Forces npm to skip devDependencies during build".to_string(),
                    recommendation: "Remove from build-time variables or set to false".to_string(),
                });
            }
        }

        if let Some(val) = envs.get("COMPOSER_NO_DEV") {
            if val == "1" || val == "true" {
                warnings.push(EnvironmentWarning {
                    key: "COMPOSER_NO_DEV".to_string(),
                    value: val.clone(),
                    affects: "PHP/Composer".to_string(),
                    issue: "Skips require-dev packages which may include build tools".to_string(),
                    recommendation: "Set as 'Runtime only'".to_string(),
                });
            }
        }

        warnings
    }
}
