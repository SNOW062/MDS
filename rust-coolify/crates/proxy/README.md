# ??? X?RIT? — crates/proxy
> **Agent ucun GPS.** Bu fayl? oxu, sonra is? basla.

## ?? S?n Harda Durursun?
e:\MD\rust-coolify\crates\proxy\

## ?? S?nin V?zif?n
Traefik, Caddy v? Nginx konfiqurasiyalar?n?n dinamik v? statik generasiyas?, SSL Let's Encrypt (ACME) idar?etm?sini yazmaq.
**Yaln?z crates/proxy/ qovluguna yaz.**

## ?? ?VV?LC? BUNLAR BITM?LIDIR
- c-core haz?r olmal?d?r.

## ?? METODLAR
- src/traefik/config.rs -> M?nb?: coolify-source/app/Actions/Proxy/GetProxyConfiguration.php
- src/ssl/acme.rs -> M?nb?: coolify-source/app/Helpers/SslHelper.php

## ? BITDI SAYILIR ?G?R
cargo build -p rc-proxy ugurla tamamlan?rsa.
