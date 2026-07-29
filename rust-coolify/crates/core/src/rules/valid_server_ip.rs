// completed file_0970
// Coolify mənbəsi: app/Rules/ValidServerIp.php
use crate::rules::valid_hostname::ValidHostname;
use std::net::IpAddr;

pub struct ValidServerIp;

impl ValidServerIp {
    /// Server IP və ya Domain ünvanının IPv4, IPv6 və ya FQDN Hostname olduğunu doğrulayır
    pub fn validate(ip_or_hostname: &str) -> Result<(), String> {
        let trimmed = ip_or_hostname.trim();
        if trimmed.is_empty() {
            return Ok(());
        }

        if trimmed.parse::<IpAddr>().is_ok() {
            return Ok(());
        }

        ValidHostname::validate(trimmed)
            .map_err(|_| "The server address must be a valid IPv4 address, IPv6 address, or hostname".to_string())
    }
}
