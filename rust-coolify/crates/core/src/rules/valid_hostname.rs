// completed file_0966
// Coolify mənbəsi: app/Rules/ValidHostname.php
use regex::Regex;

pub struct ValidHostname;

impl ValidHostname {
    /// Hostname və ya FQDN (domain name) standartı olan RFC 1123-ə uyğunluğu yoxlayır
    pub fn validate(hostname: &str) -> Result<(), String> {
        let trimmed = hostname.trim();
        if trimmed.is_empty() {
            return Err("Hostname cannot be empty".to_string());
        }

        if trimmed.len() > 253 {
            return Err("Hostname cannot exceed 253 characters".to_string());
        }

        let hostname_regex = Regex::new(r"^(?i)[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$").unwrap();

        if !hostname_regex.is_match(trimmed) {
            return Err("Invalid hostname or domain format (RFC 1123 standard required)".to_string());
        }

        Ok(())
    }
}
