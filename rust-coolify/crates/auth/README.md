# ??? X?RIT? — crates/auth
> **Agent ucun GPS.** Bu fayl? oxu, sonra is? basla.

## ?? S?n Harda Durursun?
e:\MD\rust-coolify\crates\auth\

## ?? S?nin V?zif?n
Istifad?ci autentifikasiyas? (Bearer token, Argon2 sifr? hashing), OAuth2 (GitHub, GitLab, Google) v? komanda d?v?t/rol idar?sini yazmaq.
**Yaln?z crates/auth/ qovluguna yaz.**

## ?? ?VV?LC? BUNLAR BITM?LIDIR
- c-db crate-i tamamil? bitmis v? test edilmis olmal?d?r.

## ?? H?R FAYL UCUN X?RIT?
- src/token.rs -> M?nb?: coolify-source/app/Models/PersonalAccessToken.php
- src/password.rs -> M?nb?: coolify-source/app/Models/User.php (sifr? hashing bolm?si)
- src/oauth/github.rs -> M?nb?: coolify-source/app/Models/OauthSetting.php + OauthController.php
- src/team/invitation.rs -> M?nb?: coolify-source/app/Models/TeamInvitation.php

## ? BITDI SAYILIR ?G?R
cargo build -p rc-auth x?tas?z tamamlan?rsa.
