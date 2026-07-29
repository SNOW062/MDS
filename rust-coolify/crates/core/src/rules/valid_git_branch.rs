// completed file_0964
// Coolify mənbəsi: app/Rules/ValidGitBranch.php
use regex::Regex;

pub struct ValidGitBranch;

impl ValidGitBranch {
    /// Git Branch adının təhlükəsizliyini və standart Git rəsmi qaydalarına uyğunluğunu yoxlayır
    pub fn validate(branch_name: &str) -> Result<(), String> {
        let branch = branch_name.trim();
        if branch.is_empty() {
            return Ok(());
        }

        // Shell injection simvolları
        let dangerous_chars = [';', '|', '&', '$', '`', '(', ')', '{', '}', '<', '>', '\n', '\r', '\0', '"', '\'', '\\', '!', '*', '?', '[', ']', '~', '^', ':', ' ', '#'];
        for ch in dangerous_chars {
            if branch.contains(ch) {
                return Err(format!("Git branch contains invalid/dangerous character: '{}'", ch));
            }
        }

        // Git qadağan olunmuş ifadələr
        if branch.contains("..") || branch.contains("//") || branch.contains("@{") {
            return Err("Git branch contains invalid sequence ('..', '//', or '@{')".to_string());
        }

        if branch.starts_with('/') || branch.ends_with('/') || branch.starts_with('.') || branch.ends_with('.') {
            return Err("Git branch cannot start or end with '/' or '.'".to_string());
        }

        if branch == "HEAD" {
            return Err("Git branch name cannot be 'HEAD'".to_string());
        }

        if branch.ends_with(".lock") {
            return Err("Git branch name cannot end with '.lock'".to_string());
        }

        let regex = Regex::new(r"^[a-zA-Z0-9\-_\/\.]+$").unwrap();
        if !regex.is_match(branch) {
            return Err("Git branch contains invalid characters. Only alphanumeric, hyphen, underscore, slash and dot are allowed".to_string());
        }

        Ok(())
    }
}
