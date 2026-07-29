// completed file_0969
// Coolify mənbəsi: app/Rules/ValidS3BucketName.php
use regex::Regex;

pub struct ValidS3BucketName;

impl ValidS3BucketName {
    /// AWS S3 Bucket adının rəsmi standartlara (3-63 kiçik hərflər, rəqəmlər, defis və nöqtələr) uyğunluğunu yoxlayır
    pub fn validate(bucket_name: &str) -> Result<(), String> {
        let name = bucket_name.trim();
        if name.len() < 3 || name.len() > 63 {
            return Err("S3 bucket name must be between 3 and 63 characters long".to_string());
        }

        if name.contains("..") || name.contains(".-") || name.contains("-.") {
            return Err("S3 bucket name cannot contain consecutive dots or dot-hyphen combinations".to_string());
        }

        let regex = Regex::new(r"^[a-z0-9][a-z0-9.-]*[a-z0-9]$").unwrap();
        if !regex.is_match(name) {
            return Err("S3 bucket name must consist of lowercase letters, numbers, dots, or hyphens, and start/end with a letter or number".to_string());
        }

        // IP formatında ola bilməz (məs: 192.168.1.1)
        let ip_regex = Regex::new(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$").unwrap();
        if ip_regex.is_match(name) {
            return Err("S3 bucket name cannot be formatted as an IP address".to_string());
        }

        Ok(())
    }
}
