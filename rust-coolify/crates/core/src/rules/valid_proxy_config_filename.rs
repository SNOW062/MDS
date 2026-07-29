// completed file_0968
// Coolify mənbəsi: app/Rules/ValidProxyConfigFilename.php
use regex::Regex;

pub struct ValidProxyConfigFilename;

impl ValidProxyConfigFilename {
    pub const RESERVED_FILENAMES: &'static [&'static str] = &[
        "coolify.yaml",
        "coolify.yml",
        "Caddyfile",
    ];

    /// Dynamic Proxy fayl adının (Traefik/Caddy) təhlükəsizlik qaydalarına uyğunluğunu yoxlayır
    pub fn validate(filename_raw: &str) -> Result<(), String> {
        let filename = filename_raw.trim();
        if filename.is_empty() {
            return Ok(());
        }

        if filename.len() > 255 {
            return Err("Proxy configuration filename cannot exceed 255 characters".to_string());
        }

        if filename.contains('/') || filename.contains('\\') {
            return Err("Proxy configuration filename cannot contain path separators (path traversal protection)".to_string());
        }

        if filename.starts_with('.') {
            return Err("Proxy configuration filename cannot start with a dot (hidden file)".to_string());
        }

        let regex = Regex::new(r"^[a-zA-Z0-9._-]+$").unwrap();
        if !regex.is_match(filename) {
            return Err("Proxy configuration filename may only contain letters, numbers, dashes, underscores, and dots".to_string());
        }

        if Self::RESERVED_FILENAMES.contains(&filename) {
            return Err(format!("The filename '{}' is reserved and cannot be overwritten", filename));
        }

        Ok(())
    }
}
