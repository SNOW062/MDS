# 🚀 Bələdçi KB — Yeniliklər Və Əksik Hissələr (Mərhələ 2 Planı)

Bu sənəd **Bələdçi Süni İntellekt Analizatoru** sistemindəki mövcud çatışmazlıqları, onların aradan qaldırılması yollarını və sistemi daha zəngin, faydalı və avtomatlaşdırılmış etmək üçün **Mərhələ 2** yeniliklərini əks etdirir.

---

## ⚠️ 1. Mövcud Çatışmazlıqlar (Əksik Hissələr)

### 1.1. Statik Regex Məhdudiyyəti (AST / Syntactic Parsing Çatışmazlığı)
* **Mövzu:** Funksiyalar, SQL cədvəl adları və importlar sadə Regex ifadələri ilə tapılır.
* **Problem:** Mürəkkəb ORM sorğuları, inner join-lər, dinamik yaradılan SQL sətirləri və ya Rust-dakı makroslar tutulmaya bilər.
* **Həlli:** Python üçün `ast` modulundan, JavaScript/TypeScript üçün lightweight AST analizatorundan və Rust üçün `syn` / strukturlu sintaktik analizdən istifadə etmək.

### 1.2. Həqiqi Canlı Fayl Dinləyicisinin (Real-time Watchdog) Olmaması
* **Mövzu:** Generator işə düşəndə skan edir, lakin redaktorda kod dəyişdirildikdə avtomatik yenilənmir.
* **Problem:** Hər dəfə kodu dəyişdikdən sonra skripti yenidən əllə icra etmək lazım gəlir.
* **Həlli:** Python-un `watchdog` kitabxanasını daxil edərək arxa fonda daimi fayl dinləyicisi (File Observer) aktivləşdirmək. Fayl yadda saxlanılan kimi yalnız həmin faylı anında skan etmək.

### 1.3. Vizual Əlaqə Xəritəsinin (Dependency Visualizer) Olmaması
* **Mövzu:** `imports_json` bazada saxlanılır, lakin veb interfeysdə fayllararası şəbəkə qrafiki yoxdur.
* **Problem:** Layihənin iyerarxiyasını visual olaraq görmək çətindir.
* **Həlli:** `beledci.html` daxilinə `Mermaid.js` və ya `D3.js` inteqrasiya edərək fayllararası interaktiv 2D şəbəkə qrafiki əlavə etmək.

---

## 🚀 2. Mərhələ 2 — Təklif Olunan Yeni Özəlliklər

### 2.1. 🔍 Təsir Və Risk Analizi (Impact & Risk Analysis Engine)
* **İdeya:** İnsan bir faylı dəyişmək istədikdə Bələdçi xəbərdarlıq etsin: 
  * *"⚠️ Diqqət! Bu faylı (`auth.rs`) dəyişmək 3 başqa faylı (`login.tsx`, `user_service.rs`, `router.rs`) pozacaq!"*
* **İcra:** Bazadakı `imported_by_json` məlumatından istifadə edərək "Zəncirvari Təsir Sıxlığı" hesablanması.

### 2.2. 🛡️ Təhlükəsizlik Və Kod Keyfiyyəti Skaneri (Code Quality & Security Checker)
* **İdeya:** Kodun daxilindəki potensial təhlükəsizlik və keyfiyyət risklərini avtomatik aşkar etmək.
* **Funksiyalar:**
  * Kod daxilində unudulmuş məxrəc/API Key-lərin (Hardcoded secret/token) aşkar olunması.
  * Rust kodunda riskli `.unwrap()` istifadələrinin sayılması.
  * Python/JS kodunda `try-catch` blocksız riskli async işlərin işarələnməsi.

### 2.3. 📝 Avtomatik Markdown Və API Sənədləşdirmə (Auto Doc Generator)
* **İdeya:** Baza məlumatları əsasında layihə üçün avtomatik `API_DOCS.md` və `ARCH_MAP.md` sənədlərinin formalaşdırılması.

---

## 📅 3. Mərhələ 2 İcra Planı (Step-by-Step)

- [ ] **Addım 1:** Python `watchdog` kitabxanası ilə `beledci_generator.py`-yə daimi canlı dinləyici rejiminin (`--watch`) əlavə olunması.
- [ ] **Addım 2:** Bazadakı `imported_by_json` əsasında `beledci.html` veb panelində "Təsir Sahəsi" (Impact Zone) göstəricisinin yaradılması.
- [ ] **Addım 3:** Təhlükəsizlik və kod keyfiyyəti üçün statik audit qaydalarının mühərrikə daxil edilməsi.
- [ ] **Addım 4:** `beledci.html` paneli üçün interaktiv Mermaid.js şablonunun inteqrasiyası.

---
*Bu plan Bələdçi sistemini sadəcə oxucu paneldən həqiqi intellektual proqramlaşdırma köməkçisinə çevirəcəkdir.*
