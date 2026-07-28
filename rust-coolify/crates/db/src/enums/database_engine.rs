// completed be_1078
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize, sqlx::Type)]
#[sqlx(type_name = "text", rename_all = "lowercase")]
pub enum DatabaseEngine {
    PostgreSQL,
    MySQL,
    MariaDB,
    MongoDB,
    Redis,
    KeyDB,
    Dragonfly,
    Clickhouse,
}
