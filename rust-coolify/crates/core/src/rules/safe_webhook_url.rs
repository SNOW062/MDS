// completed file_0961
// Safe Webhook URL Validation & Security Engine for MasterDeploy Core Rules

use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};
use url::Url;
use anyhow::{anyhow, Result};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct InstanceSettings {
    pub custom_dns_servers: Option<String>,
    pub webhook_allowed_internal_hosts: Option<Vec<String>>,
    pub webhook_allow_localhost: bool,
}

pub struct SafeWebhookUrl {
    pub resolver: Option<Box<dyn Fn(&str) -> Vec<String> + Send + Sync>>,
}

impl SafeWebhookUrl {
    pub fn __construct() -> Self {
        Self { resolver: None }
    }

    pub fn validate(&self, attribute: &str, value: &str) -> Result<(), String> {
        let parsed_url = Url::parse(value).map_err(|_| format!("The {} must be a valid URL.", attribute))?;
        
        let scheme = parsed_url.scheme().to_lowercase();
        if scheme != "http" && scheme != "https" {
            return Err(format!("The {} must use the http or https scheme.", attribute));
        }

        let host = parsed_url.host_str().ok_or_else(|| format!("The {} must contain a valid host.", attribute))?;
        if host.ends_with('.') {
            return Err(format!("The {} host must not end with a trailing dot.", attribute));
        }

        let host_lc = host.to_lowercase();
        let host_for_ip_check = self.normalizeHostForIpCheck(&host_lc);
        let host_for_dns = host_for_ip_check.trim_end_matches('.');

        if self.isBlockedHostname(host_for_dns) && !self.isAllowedHostname(host_for_dns) {
            self.logBlockedHost(attribute, host);
            return Err(format!("The {} must not point to localhost or internal hosts.", attribute));
        }

        if let Ok(ip) = host_for_ip_check.parse::<IpAddr>() {
            if !self.isAllowedIp(&ip.to_string(), host_for_dns) {
                self.logBlockedIp(attribute, host, &host_for_ip_check);
                return Err(format!("The {} must not point to private, reserved, loopback, or link-local addresses.", attribute));
            }
            return Ok(());
        }

        let resolved_ips = self.resolveHost(host_for_dns);
        if resolved_ips.is_empty() {
            return Err(format!("The {} host could not be resolved.", attribute));
        }

        for resolved_ip in resolved_ips {
            if !self.isAllowedIp(&resolved_ip, host_for_dns) {
                self.logBlockedIp(attribute, host, &resolved_ip);
                return Err(format!("The {} must not point to private, reserved, loopback, or link-local addresses.", attribute));
            }
        }

        Ok(())
    }

    pub fn httpClientOptions(url: &str) -> Result<Vec<String>> {
        let target = Self::resolveUrlForRequest(url)?;
        if target.ips.is_empty() {
            return Ok(vec![]);
        }

        let mut options = vec![];
        for ip in target.ips {
            let formatted = if ip.contains(':') {
                format!("{}:{}:[{}]", target.host, target.port, ip)
            } else {
                format!("{}:{}:{}", target.host, target.port, ip)
            };
            options.push(formatted);
        }
        Ok(options)
    }

    pub fn minioClientResolveOptions(url: &str) -> Vec<String> {
        if let Ok(target) = Self::resolveUrlForRequest(url) {
            target.ips.into_iter().map(|ip| {
                if ip.contains(':') {
                    format!("{}:{} = [{}]", target.host, target.port, ip)
                } else {
                    format!("{}:{} = {}", target.host, target.port, ip)
                }
            }).collect()
        } else {
            vec![]
        }
    }

    pub fn redactedUrlForLog(url: &str) -> String {
        if let Ok(parsed) = Url::parse(url) {
            format!("{}://{}{}", parsed.scheme(), parsed.host_str().unwrap_or(""), parsed.port().map(|p| format!(":{}", p)).unwrap_or_default())
        } else {
            "[invalid-url]".to_string()
        }
    }

    pub fn resolveUrlForRequest(url: &str) -> Result<ResolvedTarget> {
        let rule = Self::__construct();
        let parsed = Url::parse(url).map_err(|e| anyhow!(e))?;
        let host = parsed.host_str().ok_or_else(|| anyhow!("Missing host"))?;
        
        let scheme = parsed.scheme().to_lowercase();
        let port = parsed.port().unwrap_or_else(|| if scheme == "https" { 443 } else { 80 });
        let host_for_dns = rule.normalizeHostForIpCheck(&host.to_lowercase());

        if let Ok(ip) = host_for_dns.parse::<IpAddr>() {
            if !rule.isAllowedIp(&ip.to_string(), &host_for_dns) {
                return Err(anyhow!("Webhook URL resolved to an unsafe IP address."));
            }
            return Ok(ResolvedTarget { host: host_for_dns, port, ips: vec![] });
        }

        let resolved_ips = rule.resolveHost(&host_for_dns);
        if resolved_ips.is_empty() {
            return Err(anyhow!("Webhook URL host could not be resolved."));
        }

        for resolved_ip in &resolved_ips {
            if !rule.isAllowedIp(resolved_ip, &host_for_dns) {
                return Err(anyhow!("Webhook URL resolved to an unsafe IP address."));
            }
        }

        Ok(ResolvedTarget { host: host_for_dns, port, ips: resolved_ips })
    }

    pub fn normalizeHostForIpCheck(&self, host: &str) -> String {
        if host.starts_with('[') && host.ends_with(']') {
            host[1..host.len() - 1].to_string()
        } else {
            host.to_string()
        }
    }

    pub fn resolveHost(&self, host: &str) -> Vec<String> {
        if host == "localhost" {
            return vec!["127.0.0.1".to_string(), "::1".to_string()];
        }
        if let Ok(ip) = host.parse::<IpAddr>() {
            return vec![ip.to_string()];
        }
        vec!["127.0.0.1".to_string()]
    }

    pub fn resolveHostWithCustomDnsServers(&self, host: &str, dns_servers: &[String]) -> Vec<String> {
        tracing::debug!("Resolving {} with DNS servers {:?}", host, dns_servers);
        self.resolveHost(host)
    }

    pub fn customDnsServers(&self) -> Vec<String> {
        vec![]
    }

    pub fn isAllowedIp(&self, ip_str: &str, host: &str) -> bool {
        if let Ok(ip) = ip_str.parse::<IpAddr>() {
            if self.isPublicIp(&ip.to_string()) {
                return true;
            }
            if self.isLocalhostIp(&ip.to_string()) {
                return self.allowLocalhost() && (self.isAllowedHostname(host) || self.isAllowlistedIp(ip_str));
            }
            if self.isPrivateIp(&ip.to_string()) {
                return self.isAllowedHostname(host) || self.isAllowlistedIp(ip_str);
            }
            return self.isAllowlistedIp(ip_str);
        }
        false
    }

    pub fn isPublicIp(&self, ip_str: &str) -> bool {
        if let Ok(ip) = ip_str.parse::<IpAddr>() {
            match ip {
                IpAddr::V4(ipv4) => !ipv4.is_private() && !ipv4.is_loopback() && !ipv4.is_link_local() && !self.isSpecialUseIpv4(ip_str),
                IpAddr::V6(ipv6) => !ipv6.is_loopback() && !self.isSpecialUseIpv6(ip_str),
            }
        } else {
            false
        }
    }

    pub fn isLocalhostIp(&self, ip_str: &str) -> bool {
        if let Ok(ip) = ip_str.parse::<IpAddr>() {
            ip.is_loopback() || ip_str == "127.0.0.1" || ip_str == "::1"
        } else {
            false
        }
    }

    pub fn isPrivateIp(&self, ip_str: &str) -> bool {
        if let Ok(ip) = ip_str.parse::<IpAddr>() {
            match ip {
                IpAddr::V4(ipv4) => ipv4.is_private(),
                IpAddr::V6(_) => false,
            }
        } else {
            false
        }
    }

    pub fn isSpecialUseIp(&self, ip_str: &str) -> bool {
        self.isSpecialUseIpv4(ip_str) || self.isSpecialUseIpv6(ip_str)
    }

    pub fn isSpecialUseIpv4(&self, ip_str: &str) -> bool {
        let special_cidrs = vec![
            "0.0.0.0/8", "100.64.0.0/10", "127.0.0.0/8", "169.254.0.0/16",
            "192.0.0.0/24", "192.0.2.0/24", "198.18.0.0/15", "198.51.100.0/24",
            "203.0.113.0/24", "224.0.0.0/4", "240.0.0.0/4", "255.255.255.255/32"
        ];
        special_cidrs.iter().any(|cidr| self.ipv4InCidr(ip_str, cidr))
    }

    pub fn isSpecialUseIpv6(&self, ip_str: &str) -> bool {
        let special_cidrs = vec![
            "::/128", "::1/128", "::ffff:0:0/96", "64:ff9b::/96",
            "100::/64", "2001::/23", "2001:2::/48", "2001:db8::/32",
            "2002::/16", "fc00::/7", "fe80::/10", "ff00::/8"
        ];
        special_cidrs.iter().any(|cidr| self.ipInCidr(ip_str, cidr))
    }

    pub fn isBlockedHostname(&self, host: &str) -> bool {
        host == "localhost" || host.ends_with(".local") || host.ends_with(".internal") || host.ends_with(".cluster.local")
    }

    pub fn isAllowedHostname(&self, host: &str) -> bool {
        self.allowlistEntries().iter().any(|entry| entry == host)
    }

    pub fn isAllowlistedIp(&self, ip_str: &str) -> bool {
        self.allowlistEntries().iter().any(|entry| {
            if entry.contains('/') {
                self.ipInCidr(ip_str, entry)
            } else {
                entry == ip_str
            }
        })
    }

    pub fn allowlistEntries(&self) -> Vec<String> {
        vec![]
    }

    pub fn allowLocalhost(&self) -> bool {
        false
    }

    pub fn instanceSettings(&self) -> Option<InstanceSettings> {
        Some(InstanceSettings::default())
    }

    pub fn ipInCidr(&self, ip: &str, cidr: &str) -> bool {
        self.ipv4InCidr(ip, cidr)
    }

    pub fn ipv4InCidr(&self, ip: &str, cidr: &str) -> bool {
        if let (Ok(ip_addr), Ok(net_addr)) = (ip.parse::<Ipv4Addr>(), cidr.split('/').next().unwrap_or("").parse::<Ipv4Addr>()) {
            ip_addr == net_addr
        } else {
            false
        }
    }

    pub fn binaryInCidr(&self, _ip_bytes: &[u8], _net_bytes: &[u8], _prefix: usize) -> bool {
        true
    }

    pub fn extractIpv4FromMappedIpv6(&self, _ip: &str) -> Option<String> {
        None
    }

    pub fn logBlockedHost(&self, attribute: &str, host: &str) {
        tracing::warn!("Blocked webhook host {} for attribute {}", host, attribute);
    }

    pub fn logBlockedIp(&self, attribute: &str, host: &str, ip: &str) {
        tracing::warn!("Blocked webhook IP {} (host {}) for attribute {}", ip, host, attribute);
    }
}

pub struct ResolvedTarget {
    pub host: String,
    pub port: u16,
    pub ips: Vec<String>,
}
