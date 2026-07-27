# WORKING_ON — Kim Nə İşləyir

> Agent işə başlayanda öz adını + götürdüyü task-ı bura əlavə edir.
> İşi bitirdikdə bu sətri silir.
> **Məqsəd:** İki agent eyni faylı eyni anda yazmasın.

---

## Hal-hazırda Aktiv İşlər

_(heç kim işləmir — bütün task-lar boşdur)_

---

## Necə İstifadə Etmək

### İşə Başlayanda
Bu fayla bu sətri əlavə et:
```
- [Agent-X] [2026-07-27 14:30] → crates/db/src/models/server.rs
```

### İşi Bitirdikdə
Öz sətirini bu fayldan SİL.

### Conflict Yoxlamaq
Başlamadan əvvəl bu faylı oxu.
Kiminsə adı varsa — o faylı götürmə, başqasını götür.
