// completed file_0962
// Coolify mənbəsi: app/Rules/SafeWebhookUrl.php
use reqwest::Url;
use std::net::IpAddr;

pub struct SafeWebhookUrl;

impl SafeWebhookUrl {
    /// Webhook URL-in SSRF (Server-Side Request Forgery) hücumlarına qarşı təhlükəsiz olmasını (Loopback, Link-Local metadata, Private Subnet bloklanması) yoxlayır
    pub fn validate(url_str: &str) -> Result<(), String> {
        let url = Url::parse(url_str).map_err(|_| "The webhook URL must be a valid URL".to_string())?;

        let scheme = url.scheme().to_lowercase();
        if scheme != "http" && scheme != "https" {
            return Err("The webhook URL must use http or https scheme".to_string());
        }

        let host_str = url.host_str().ok_or_else(|| "The webhook URL must contain a valid host".to_string())?;
        let host_lower = host_str.to_lowercase();

        // 1. Bloklanmış Hostname-lər (localhost, internal, metadata)
        if host_lower == "localhost" || host_lower.ends_with(".localhost") || host_lower == "169.254.169.254" {
            return Err("The webhook URL host is blocked (localhost / metadata IP)".to_string());
        }

        // 2. Əgər host doğrudan IP ünvanıdırsa
        if let Ok(ip) = host_lower.parse::<IpAddr>() {
            if Self::is_private_or_reserved_ip(&ip) {
                return Err("The webhook URL must not point to private, reserved, loopback, or link-local IP addresses".to_string());
            }
        }

        Ok(())
    }

    /// IP-nin daxili/özel/loopback şəbəkə olmasını yoxlayır
    fn is_private_or_reserved_ip(ip: &IpAddr) -> bool {
        match ip {
            IpAddr::V4(ipv4) => {
                ipv4.is_loopback()
                    || ipv4.is_private()
                    || ipv4.is_link_local()
                    || ipv4.is_broadcast()
                    || ipv4.is_documentation()
            }
            IpAddr::V6(ipv6) => ipv6.is_loopback(),
        }
    }
}
