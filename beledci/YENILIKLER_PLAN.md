# 📚 Bələdçi KB (Knowledge Base) Mühərrikinin Yenilənmə Və İcra Planı

Bu sənəd **Bələdçi Süni İntellekt Analizatoru** tətbiqinə əlavə olunacaq yeniliklərin və təkmilləşdirmələrin siyahısını ehtiva edir.

---

## 🎯 Əlavə Olunacaq Əsas Yeniliklər

### 1. 🔗 Fayllararası Əlaqə Xəritəsi (Dependency Graph & Import Tracker)
- **Problem:** Bir faylı dəyişdikdə başqa hansı faylların pozula biləcəyi bilinmirdi.
- **Həlli:** `import`, `require`, `use crate::` sətirləri Regex/AST ilə oxunaraq hər faylın asılı olduğu fayllar (`imports`) və bu fayldan asılı olan fayllar (`imported_by`) bazaya yazılır.

### 2. 📊 Git Versiya Tarixçəsi Və Risk Analizi (Git Heatmap & Author Tracking)
- **Problem:** Faylın son vəziyyəti, kimin dəyişdiyi və ən çox xəta çıxara biləcək "qaynar" fayllar görünmürdü.
- **Həlli:** `git log` vasitəsilə son müəllif, son commit tarixi və dəyişiklik sayı çıxarılır. Tez-tez dəyişən fayllara 🔥 **Qaynar Fayl (Yüksək Risk)** nişanı qoyulur.

### 3. 💻 Birbaşa VS Code İnteqrasiyası (VS Code Deep Linking)
- **Problem:** Veb paneldən faylın adına baxdıqdan sonra onu redaktorda axtarmaq vaxt aparırdı.
- **Həlli:** Veb interfeysində hər faylın yanına `vscode://file/PATH` düyməsi əlavə olunur. Tıkladıqda fayl birbaşa VS Code-da açılır.

### 4. 🔍 Gelişdirilmiş Filtrləmə Və Axtarış
- **Yenilik:** Yalnız ada görə deyil, **İstifadə olunan Cədvəllərə**, **Kitabxanalara**, **Git Müəllifinə** və **Təhlükəsizlik Səviyyəsinə** görə anında filtrləmə.

---

## 🗄️ Baza Sxeminə Əlavə Olunacaq Yeni Sütunlar (`beledci_kb.db`)

| Sütun Adı | Tipi | Təsviri |
| :--- | :--- | :--- |
| `imports_json` | TEXT (JSON) | Faylın daxil etdiyi (import etdiyi) digər fayllar |
| `imported_by_json` | TEXT (JSON) | Bu faylı daxil edən (istifadə edən) digər fayllar |
| `git_last_commit` | TEXT | Son commit mesajı və vaxtı |
| `git_author` | TEXT | Son dəyişən şəxs |
| `git_changes_count` | INTEGER | Faylın ümumi commit/dəyişiklik sayı |

---

## 📅 İcra Mərhələləri

- [ ] **Mərhələ 1:** `beledci_generator.py` içində SQLite sxeminin yenilənməsi.
- [ ] **Mərhələ 2:** Import/Dependency analizi funksiyasının yazılması.
- [ ] **Mərhələ 3:** Git tarixçəsini çıxaran funksiyanın əlavə edilməsi.
- [ ] **Mərhələ 4:** Veb UI interfeysinin (`beledci.html`) yeni göstəricilər və VS Code düymələri ilə təchiz edilməsi.
- [ ] **Mərhələ 5:** Test və doğrulama.



1. ⚠️ Nələr Əksikdir (Mövcud Çatışmazlıqlar)?
Statik Regex Məhdudiyyəti (AST / Parse Çatışmazlığı):
Funksiyalar və SQL cədvəlləri sadə Regex (məsələn: def, fn, SELECT FROM) ilə tapılır. Bu isə dinamik sorğuları, inner-join-ləri və ya mürəkkəb Rust/React hook-larını tam tuta bilmir.
Fayllararası Əlaqə Xəritəsinin (Dependency Graph / Import Tree) Olmaması:
Bir faylın başqa hansı faylları import etdiyi və ya hansı fayllar tərəfindən istifadə olunduğu bilinmir. Məsələn: LoginPage.jsx faylını dəyişəndə layihənin başqa harasına təsir edəcəyini Bələdçi göstərə bilmir.
Statik SQLite Bazasının Canlı Yenilənməməsi (File Watcher Yoxdur):
Kodda yeni fayl əlavə olunanda və ya koda düzəliş ediləndə generator skripti yenidən əllə işə salınmalıdır. Canlı fayl dəyişikliyini dinləyən mühərrik (watchdog / file listener) yoxdur.
Git və Versiya Tarixçəsi (Git History Integration) Əksikliyi:
Bazada faylın ən son kim tərəfindən və nə vaxt dəyişdirildiyi, son commit mesajı və ya ən çox dəyişən (riskli) fayllar barədə məlumat saxlanılmır.
2. 🚀 Ne Əlavə Etmək Lazımdır (Təklif Olunan Yeni Özəlliklər)?
A. Dinamik Fayl Əlaqə Xəritəsi (Dependency Graph / Import Tracker)
Nə verəcək: Bələdçi paneldə göstərməlidir ki: "Bu faylı dəyişsən, 4 başqa fayl (App.jsx, Routes.jsx və s.) pozula bilər".
Necə: import ... from ... və ya Rust-dakı use crate::... sətirlərini analiz edib fayllararası İdxal/İxrac bağı (Graph) yaratmaq.
B. Avtomatik Fayl Nəzarətçisi (Live Hot-Reload / Watcher)
Nə verəcək: Siz visual studio code-da kodu yadda saxlayan kimi Bələdçi dərhal beledci_kb.db-ni və index.html panelini saniyələr içində yeniləsin.
Necə: Python-un watchdog kitabxanası ilə beledci_generator.py-yə arxa fonda işləyən dinləyici əlavə etmək.
C. Git Metrikaları (Code Heatmap & Author Tracking)
Nə verəcək: Layihənin "ən qaynar" (ən çox xəta çıxan / tez-tez dəyişdirilən) fayllarını göstərən Heatmap işarələri (🔴 Xəbərdarlıq - Bu fayl son 1 həftədə 15 dəfə dəyişdirilib).
Necə: git log -n 1 --pretty=format:"%an, %ar" komandalarını file_analysis bazasına sütun kimi əlavə etmək.
D. Düymə ilə Birbaşa IDE-də Açma (VS Code Deep Links)
Nə verəcək: Bələdçinin Veb Interfeysində (index.html) hər faylın yanında "VS Code-da Aç" düyməsi olsun və tıxlayanda birbaşa həmin sətirdə IDE-də açılsın (vscode://file/C:/.../App.jsx:45).
E. Interaktiv Axtarış və Filtirləmə (Advanced Search Engine)
Nə verəcək: Yalnız fayl adına görə deyil, bazada saxlanılan SQL Cədvəl adına, İstifadə olunan Kitabxanaya və ya Təhlükəsizlik Səviyyəsinə (🔒) görə anında filtrləmə.
