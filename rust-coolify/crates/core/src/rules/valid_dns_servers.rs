// completed file_0963
// Coolify mənbəsi: app/Rules/ValidDnsServers.php
use std::net::IpAddr;

pub struct ValidDnsServers;

impl ValidDnsServers {
    /// Vergüllə ayrılmış DNS server ünvanlarının (məs: "1.1.1.1,8.8.8.8") hər birinin düzgün IP ünvanı olduğunu yoxlayır
    pub fn validate(dns_servers_csv: &str) -> Result<(), String> {
        let trimmed = dns_servers_csv.trim();
        if trimmed.is_empty() {
            return Ok(());
        }

        let entries: Vec<&str> = trimmed.split(',').map(|s| s.trim()).collect();
        let mut invalid_entries = Vec::new();

        for entry in entries {
            if entry.is_empty() {
                continue;
            }

            if entry.parse::<IpAddr>().is_err() {
                invalid_entries.push(entry);
            }
        }

        if !invalid_entries.is_empty() {
            return Err(format!("The following entries are not valid DNS server IP addresses: {}", invalid_entries.join(", ")));
        }

        Ok(())
    }
}
