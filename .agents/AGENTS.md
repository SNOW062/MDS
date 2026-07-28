# 📜 MASTERDEPLOY (MD) AGENT STRICT PROTOCOL & RULES

This file defines the **MANDATORY RULES** that the AI agent must strictly follow for all work on the MasterDeploy (`MD`) codebase.

---

## 🛑 RULE 1: NO EMPTY TABS OR PLACEHOLDERS
- **NEVER** leave any UI tab, sub-tab, or page as an empty placeholder or static dummy text.
- Every single tab (`Configuration` -> General, Private Key, CA Certificate, Swarm; `Proxy`; `Resources`; `Terminal`; `Security`) must contain 1-to-1 functional fields, forms, toggles, and state matching Coolify source code.

---

## 🔍 RULE 2: MANDATORY SOURCE INSPECTION (AUDIT FIRST)
- Before creating or modifying any feature, page, component, or backend API endpoint in `MD`, the agent **MUST** inspect the authoritative source code inside `coolify-source` (`coolify-source/app/Livewire/Server/`, `coolify-source/resources/views/livewire/server/`).
- Trace all fields, inputs, validation rules, and action handlers from `coolify-source`.

---

## ⚡ RULE 3: LOCAL DOCKER & NO GIT PUSH
- **NEVER** execute `git push` under any circumstances.
- All code edits must remain 100% local.
- Build and execution are managed locally via `run_md.py` with Docker layer caching.

---

## 🗣️ RULE 4: AZERBAIJAN LANGUAGE FOR AGENT RESPONSES
- Always respond and explain plans to the user in **Azerbaijani**.
- Provide concrete code solutions first without fluff.

---

## 🌐 RULE 5: MULTI-LANGUAGE UI SUPPORT (AZ, EN, TR, RU)
- **MANDATORY MULTI-LANGUAGE:** All UI additions, components, buttons, settings, labels, and notifications **MUST** support 4 languages:
  1. **Azerbaijani (AZ)** 🇦🇿
  2. **English (EN)** 🇬🇧
  3. **Turkish (TR)** 🇹🇷
  4. **Russian (RU)** 🇷🇺
- Provide clean i18n translation dictionaries and language selector controls in MasterDeploy UI.

---

## 📋 RULE 6: MANDATORY AUDIT & PROGRESS TRACKING
- **AUDIT READ REQUIREMENT:** Hər bir agent işə başlamazdan əvvəl mütləq `agentin_tapdigi_eksik_isler/` qovluğundakı sonuncu tarixli audit sənədini oxumalı və hansı əskiklərin qaldığını müəyyənləşdirməlidir.
- **COMPLETION REPORT REQUIREMENT:** Hər hansı bir əskik tamamlandıqdan sonra, agent həmin günün tarixi ilə (məsələn, `audit_YYYY-MM-DD.md`) yeni və ya yenilənmiş hesabat hazırlamalıdır. Tamamlanan işlər `[x]` ilə işarələnməlidir. Hər bir yeni agent mütləq özündən əvvəlki tarixdəki tapşırıqların cari statusunu və yenilərini sənədləşdirməlidir.

---

## 🚫 RULE 7: ZERO TOLERANCE FOR DUMMY/MOCK FILES
- **REAL LOGIC ONLY:** Agentlər heç bir halda UI formlarında, düymələrində və ya backend əlaqələrində dummy (statik/müvəqqəti) məlumatlar saxlaya bilməzlər. 
- **NO HALF-DONE WORK:** Hər hansı bir form sahəsi (məsələn, "Hetzner Server Status") əlavə edilirsə, onun həm React state-ləri, həm backend API çağırışları, həm də çoxdilli tərcümə key-ləri (AZ, EN, TR, RU) tam və bitmiş şəkildə yazılmalıdır. Yarımçıq və ya sonradan yazılacaq kimi qeyd edilən kod strukturları QADAĞANDIR!

---

## 🎯 RULE 8: 100% EXACT COOLIFY MATCH (FRONTEND & BACKEND)
- **NO SKIPPED METHODS OR TYPES:** Həm frontend (React/TypeScript), həm də backend (Rust/API) faylları yazılarkən Coolify PHP Livewire mənbə kodu ilə 100% eyni olmalıdır. Heç bir metod, tip, API endpointi, parametr və ya məntiq kənarda qala bilməz.
- **PARITY ASSURANCE:** Bütün verilənlər bazası strukturları, sorğu parametrləri, validasiya qaydaları və xəta mesajları orijinal Coolify iş axınına tam uyğun şəkildə reallaşdırılmalıdır.

