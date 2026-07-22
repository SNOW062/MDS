use chrono::Utc;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub enum DatabaseEngine {
    PostgreSQL,
    MySQL,
    MongoDB,
    Redis,
}

pub struct DatabaseBackupManager;

impl DatabaseBackupManager {
    pub fn generate_backup_filename(db_name: &str, engine: &DatabaseEngine) -> String {
        let timestamp = Utc::now().format("%Y%m%d_%H%M%S");
        let ext = match engine {
            DatabaseEngine::PostgreSQL | DatabaseEngine::MySQL => "sql.gz",
            DatabaseEngine::MongoDB => "archive.gz",
            DatabaseEngine::Redis => "rdb.gz",
        };
        format!("backup_{}_{}.{}", db_name, timestamp, ext)
    }

    pub fn build_pg_dump_command(db_name: &str, db_user: &str, db_pass: &str, host: &str, port: u16, output_file: &str) -> String {
        format!(
            "PGPASSWORD=\"{}\" pg_dump -h {} -p {} -U {} -F c -b -v -f \"{}\" \"{}\"",
            db_pass, host, port, db_user, output_file, db_name
        )
    }

    pub fn build_mysqldump_command(db_name: &str, db_user: &str, db_pass: &str, host: &str, port: u16, output_file: &str) -> String {
        format!(
            "mysqldump --single-transaction --quick --host={} --port={} --user={} --password=\"{}\" \"{}\" | gzip > \"{}\"",
            host, port, db_user, db_pass, db_name, output_file
        )
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_backup_filename_format() {
        let filename = DatabaseBackupManager::generate_backup_filename("production_db", &DatabaseEngine::PostgreSQL);
        assert!(filename.starts_with("backup_production_db_"));
        assert!(filename.ends_with(".sql.gz"));
    }

    #[test]
    fn test_pg_dump_command_builder() {
        let cmd = DatabaseBackupManager::build_pg_dump_command(
            "app_db",
            "postgres_user",
            "secret123",
            "127.0.0.1",
            5432,
            "/backups/app_db.sql.gz",
        );
        assert!(cmd.contains("PGPASSWORD=\"secret123\""));
        assert!(cmd.contains("pg_dump -h 127.0.0.1 -p 5432 -U postgres_user"));
        assert!(cmd.contains("\"app_db\""));
    }

    #[test]
    fn test_mysqldump_command_builder() {
        let cmd = DatabaseBackupManager::build_mysqldump_command(
            "store_db",
            "mysql_admin",
            "pass456",
            "192.168.1.50",
            3306,
            "/backups/store.sql.gz",
        );
        assert!(cmd.contains("mysqldump --single-transaction"));
        assert!(cmd.contains("--host=192.168.1.50 --port=3306"));
        assert!(cmd.contains("gzip > \"/backups/store.sql.gz\""));
    }
}
