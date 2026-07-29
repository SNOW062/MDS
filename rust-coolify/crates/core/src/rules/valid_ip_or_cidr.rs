// completed file_0967
// Coolify mənbəsi: app/Rules/ValidIpOrCidr.php
use std::net::IpAddr;

pub struct ValidIpOrCidr;

impl ValidIpOrCidr {
    /// Daxil edilən mətnin düzgün IPv4/IPv6 ünvanı və ya CIDR bloku (məs: 192.168.1.0/24) olmasını yoxlayır
    pub fn validate(ip_or_cidr: &str) -> Result<(), String> {
        let trimmed = ip_or_cidr.trim();
        if trimmed.is_empty() {
            return Err("IP address or CIDR cannot be empty".to_string());
        }

        if trimmed.contains('/') {
            let parts: Vec<&str> = trimmed.split('/').collect();
            if parts.len() != 2 {
                return Err("Invalid CIDR notation format".to_string());
            }

            let ip_part = parts[0];
            let prefix_part = parts[1];

            if ip_part.parse::<IpAddr>().is_err() {
                return Err(format!("Invalid IP address in CIDR: {}", ip_part));
            }

            let prefix: u8 = prefix_part.parse()
                .map_err(|_| "CIDR prefix must be a valid number".to_string())?;

            if prefix > 128 {
                return Err("CIDR prefix size is out of range".to_string());
            }
        } else {
            if trimmed.parse::<IpAddr>().is_err() {
                return Err(format!("Invalid IP address format: {}", trimmed));
            }
        }

        Ok(())
    }
}
