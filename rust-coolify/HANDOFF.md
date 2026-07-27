# HANDOFF — Agent Ötürmə Notu

> Agent işi yarıda qoyanda MÜTLƏQq bu faylı yenilər.
> Növbəti agent ilk olaraq bu faylı oxuyur.

---

## Son Ötürmə

**Tarix:** 2026-07-27  
**Agent:** İlk qurulum agenti  
**Vəziyyət:** Struktur + sənədlər yaradıldı, kod hələ yazılmayıb

### Nə Edildi ✅
- `e:\MD\rust-coolify\` altında bütün 11 crate qovluğu yaradıldı
- Hər crate-də `Cargo.toml` + `src/` skeleti var (boş fayllardır)
- `migrations/` altında 18 SQL migration skeleti var
- `MASTER_PLAN.md`, `AGENT_GUIDE.md`, `PROGRESS.md` yazıldı
- `CRATE_SPECS/` altında hər crate üçün spesifikasiya var
- `TASKS/` altında hər crate üçün task siyahısı var
- Hər crate-in içinə `README.md` (xəritə) yaradıldı

### Nə Yarıda Qaldı 🔄
- Heç bir crate-in kodu yazılmayıb
- Hamısı yalnız boş skeletdir

### Növbəti Agent Nə Etməli ➡️
1. `TASKS/db.md` faylını aç
2. `[TODO]` işarəli ilk task-ı götür
3. `crates/db/README.md` faylını oxu (xəritə orada)
4. İşlə, bitirdikdə `TASKS/db.md`-də `[DONE]` et
5. Bu faylı (`HANDOFF.md`) yenilə

### Prioritet Sırası
```
1. db crate     ← ƏN ƏVVƏL (hamı ona asılıdır)
2. auth crate
3. core crate
4. api crate
5. deployer crate (ən böyük iş)
6. proxy, scheduler, notify, sentinel, storage, services
```

---

## Ötürmə Tarixi (Arxiv)

_(hər agent öz qeydini buraya əlavə edir)_
