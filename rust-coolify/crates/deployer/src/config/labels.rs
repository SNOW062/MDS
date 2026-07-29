// completed be_1119
// Coolify menkesi: generateLabelsApplication() + Docker label management

/// Coolify-nin Docker konteynerlerine elave etdiyi label-ler
pub struct CoolifyLabels;

impl CoolifyLabels {
    /// Temel label-leri yarat
    pub fn for_application(
        app_uuid: &str,
        server_uuid: &str,
        project_uuid: &str,
        environment: &str,
    ) -> Vec<String> {
        vec![
            format!("coolify.managed=true"),
            format!("coolify.version=4.0"),
            format!("coolify.applicationId={}", app_uuid),
            format!("coolify.serverId={}", server_uuid),
            format!("coolify.projectId={}", project_uuid),
            format!("coolify.environment={}", environment),
            format!("coolify.type=application"),
        ]
    }

    /// Traefik routing label-leri
    pub fn traefik_labels(
        app_uuid: &str,
        domain: &str,
        port: u16,
    ) -> Vec<String> {
        let router_name = format!("app-{}", &app_uuid[..8]);
        vec![
            format!("traefik.enable=true"),
            format!("traefik.http.routers.{}.rule=Host(`{}`)", router_name, domain),
            format!("traefik.http.routers.{}.entrypoints=https", router_name),
            format!("traefik.http.routers.{}.tls=true", router_name),
            format!("traefik.http.routers.{}.tls.certresolver=letsencrypt", router_name),
            format!("traefik.http.services.{}.loadbalancer.server.port={}", router_name, port),
        ]
    }

    /// docker run --label parametrleri ucun string yarat
    pub fn to_docker_args(labels: &[String]) -> String {
        labels.iter()
            .map(|l| format!("--label \"{}\"", l))
            .collect::<Vec<_>>()
            .join(" ")
    }
}
