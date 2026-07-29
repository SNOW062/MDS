// completed file_0995
// Coolify mənbəsi: app/Traits/HasDatabaseHealthCheck.php

pub struct HasDatabaseHealthCheck;

impl HasDatabaseHealthCheck {
    /// PostgreSQL, MySQL, Redis, MongoDB üçün standart Docker CLI Healthcheck komandalarını verir
    pub fn get_healthcheck_cmd(db_type: &str, user: &str, db_name: &str) -> String {
        match db_type.to_lowercase().as_str() {
            "postgresql" | "postgres" => format!("pg_isready -U {} -d {}", user, db_name),
            "mysql" | "mariadb" => format!("mysqladmin ping -u{} --silent", user),
            "redis" => "redis-cli ping".to_string(),
            "mongodb" | "mongo" => "mongosh --eval 'db.runCommand({ping: 1})'".to_string(),
            _ => "true".to_string(),
        }
    }
}
