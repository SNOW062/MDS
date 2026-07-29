// completed file_0974
// Coolify mənbəsi: app/Services/ConfigurationGenerator.php
use std::collections::HashMap;

pub struct ConfigurationGenerator;

impl ConfigurationGenerator {
    /// Traefik / Caddy proxy üçün dynamic labels və routing qadağalarını generaasiya edir
    pub fn generate_traefik_labels(
        container_name: &str,
        domain: &str,
        port: u16,
        use_https: bool,
    ) -> HashMap<String, String> {
        let mut labels = HashMap::new();
        let router_name = container_name.replace('-', "_");

        labels.insert("traefik.enable".to_string(), "true".to_string());
        labels.insert(
            format!("traefik.http.routers.{}.rule", router_name),
            format!("Host(`{}`)", domain),
        );
        labels.insert(
            format!("traefik.http.services.{}.loadbalancer.server.port", router_name),
            port.to_string(),
        );

        if use_https {
            labels.insert(
                format!("traefik.http.routers.{}.entrypoints", router_name),
                "websecure".to_string(),
            );
            labels.insert(
                format!("traefik.http.routers.{}.tls.certresolver", router_name),
                "letsencrypt".to_string(),
            );
        } else {
            labels.insert(
                format!("traefik.http.routers.{}.entrypoints", router_name),
                "web".to_string(),
            );
        }

        labels
    }
}
