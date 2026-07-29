// completed file_0965
// Coolify mənbəsi: app/Rules/ValidGitRepositoryUrl.php
use regex::Regex;

pub struct ValidGitRepositoryUrl {
    pub allow_ssh: bool,
    pub allow_ip: bool,
}

impl ValidGitRepositoryUrl {
    pub fn new(allow_ssh: bool, allow_ip: bool) -> Self {
        Self { allow_ssh, allow_ip }
    }

    /// Git Repository URL-inin təhlükəsizliyini və sintaksisini yoxlayır (Command Injection mühafizəsi)
    pub fn validate(&self, url: &str) -> Result<(), String> {
        if url.trim().is_empty() {
            return Ok(());
        }

        // Təhlükəli shell simvollarını rədd etmək
        let dangerous_chars = [';', '|', '&', '$', '`', '(', ')', '{', '}', '[', ']', '<', '>', '\n', '\r', '\0', '"', '\''];
        for ch in dangerous_chars {
            if url.contains(ch) {
                return Err(format!("Git URL contains invalid/dangerous character: '{}'", ch));
            }
        }

        if url.starts_with("git@") {
            if !self.allow_ssh {
                return Err("SSH Git URLs are not allowed for this repository".to_string());
            }
            let ssh_regex = Regex::new(r"^git@[a-zA-Z0-9\.\-]+:[a-zA-Z0-9\-_\/\.~]+$").unwrap();
            if !ssh_regex.is_match(url) {
                return Err("Invalid SSH Git repository format (expected git@host:owner/repo.git)".to_string());
            }
        } else if url.starts_with("http://") || url.starts_with("https://") {
            let http_regex = Regex::new(r"^https?://[a-zA-Z0-9\.\-_]+(/[a-zA-Z0-9\-_\/\.~]+)?$").unwrap();
            if !http_regex.is_match(url) {
                return Err("Invalid HTTP/HTTPS Git repository URL format".to_string());
            }
        } else {
            return Err("Git URL must start with git@, http:// or https://".to_string());
        }

        Ok(())
    }
}
