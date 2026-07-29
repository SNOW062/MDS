// completed file_0376
// Coolify mənbəsi: app/Actions/Proxy/GetProxyConfiguration.php
use anyhow::{Result, anyhow};
use sqlx::PgPool;
use uuid::Uuid;

pub struct GetProxyConfiguration;

impl GetProxyConfiguration {
    /// Serverin proxy növünə uyğun (Traefik və ya Caddy) Docker Compose faylı məzmununu generasiya edir və ya bazadan alır
    pub async fn handle(db: &PgPool, server_uuid: Uuid, proxy_type: &str) -> Result<String> {
        tracing::info!("Getting proxy configuration for server {} ({})", server_uuid, proxy_type);

        match proxy_type.to_lowercase().as_str() {
            "traefik" => Ok(Self::generate_traefik_compose()),
            "caddy" => Ok(Self::generate_caddy_compose()),
            "none" => Ok(String::new()),
            _ => Err(anyhow!("Unsupported proxy type: {}", proxy_type)),
        }
    }

    /// Traefik v3 üçün standart docker-compose.yml konfiqurasiyası
    pub fn generate_traefik_compose() -> String {
        r#"
version: '3.8'
services:
  traefik:
    image: 'traefik:v3.0'
    container_name: coolify-proxy
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '8080:8080'
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/var/coolify/proxy/traefik/dynamic:/dynamic'
    command:
      - '--api.insecure=true'
      - '--providers.docker=true'
      - '--providers.docker.exposedbydefault=false'
      - '--providers.file.directory=/dynamic'
      - '--providers.file.watch=true'
      - '--entrypoints.web.address=:80'
      - '--entrypoints.websecure.address=:443'
    networks:
      - coolify
networks:
  coolify:
    external: true
"#.trim().to_string()
    }

    /// Caddy v2 üçün standart docker-compose.yml konfiqurasiyası
    pub fn generate_caddy_compose() -> String {
        r#"
version: '3.8'
services:
  caddy:
    image: 'caddy:2-alpine'
    container_name: coolify-proxy
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
    volumes:
      - '/var/coolify/proxy/caddy/dynamic:/dynamic'
      - '/var/coolify/proxy/caddy/data:/data'
      - '/var/coolify/proxy/caddy/config:/config'
    networks:
      - coolify
networks:
  coolify:
    external: true
"#.trim().to_string()
    }
}
