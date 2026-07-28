// completed be_1082
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum ProxyType {
    Traefik,
    Caddy,
    Nginx,
    None,
}
