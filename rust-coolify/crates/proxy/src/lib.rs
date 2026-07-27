// rc-proxy — Proxy idar?si (Traefik, Caddy, Nginx, SSL)
// Coolify: app/Actions/Proxy/, app/Helpers/SslHelper.php, Jobs/RestartProxyJob.php
pub mod manager;
pub mod traefik;
pub mod caddy;
pub mod nginx;
pub mod ssl;
