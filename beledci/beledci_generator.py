import os
import json
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
import sys
import urllib.parse
import re
import sqlite3
import datetime
import traceback

SCRIPT_PATH = os.path.abspath(__file__)
LAST_SCRIPT_MTIME = os.path.getmtime(SCRIPT_PATH) if os.path.exists(SCRIPT_PATH) else 0

BELEDCI_DIR = os.path.dirname(SCRIPT_PATH)
LOG_FILE_PATH = os.path.join(BELEDCI_DIR, "beledci.log")
DB_PATH = os.path.join(BELEDCI_DIR, "beledci_kb.db")

def log_message(level, message, exc=None):
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_line = f"[{timestamp}] [{level.upper()}] {message}"
    if exc:
        log_line += f"\nTraceback: {traceback.format_exc()}"
    try:
        print(log_line.encode(sys.stdout.encoding, errors='replace').decode(sys.stdout.encoding))
    except Exception:
        print(f"[{timestamp}] [{level.upper()}] {message.encode('ascii', 'ignore').decode('ascii')}")
    try:
        with open(LOG_FILE_PATH, "a", encoding="utf-8") as f:
            f.write(log_line + "\n")
    except Exception: pass

log_message("INFO", "Beledci Maksimal AI Analizator Mühərriki başladıldı.")

# Enhanced SQLite Database Schema for Max AI Analysis with Dependency Graph & Git History
def init_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS file_analysis (
                file_path TEXT PRIMARY KEY,
                system_role TEXT,
                purpose_az TEXT,
                data_flow TEXT,
                security_scope TEXT,
                functions_json TEXT,
                db_tables_json TEXT,
                libraries_json TEXT,
                imports_json TEXT,
                imported_by_json TEXT,
                git_last_commit TEXT,
                git_author TEXT,
                git_changes_count INTEGER,
                security_issues_json TEXT,
                impact_score INTEGER DEFAULT 0,
                code_preview TEXT,
                ai_summary TEXT,
                file_size_kb REAL,
                line_count INTEGER,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        # Check and add missing columns for backward compatibility
        cursor.execute("PRAGMA table_info(file_analysis)")
        cols = [col[1] for col in cursor.fetchall()]
        for col_name, col_type in [
            ("imports_json", "TEXT"),
            ("imported_by_json", "TEXT"),
            ("git_last_commit", "TEXT"),
            ("git_author", "TEXT"),
            ("git_changes_count", "INTEGER"),
            ("security_issues_json", "TEXT"),
            ("impact_score", "INTEGER"),
            ("code_preview", "TEXT")
        ]:
            if col_name not in cols:
                cursor.execute(f"ALTER TABLE file_analysis ADD COLUMN {col_name} {col_type}")
        conn.commit()
        conn.close()
        log_message("INFO", "SQLite file_analysis bazası yeni sxemlə (OWASP Security, Impact & Code Preview) hazırlandı.")
    except Exception as e:
        log_message("ERROR", "SQLite bazası hazırlanarkən xəta", e)

init_db()

def get_git_info(abs_path):
    try:
        import subprocess
        dir_path = os.path.dirname(abs_path)
        rel_file = os.path.basename(abs_path)
        cmd_author = f'git log -n 1 --pretty=format:"%an|%cr|%s" -- "{rel_file}"'
        cmd_count = f'git rev-list --count HEAD -- "{rel_file}"'
        
        author_out = subprocess.check_output(cmd_author, cwd=dir_path, shell=True, stderr=subprocess.DEVNULL).decode("utf-8", errors="ignore").strip()
        count_out = subprocess.check_output(cmd_count, cwd=dir_path, shell=True, stderr=subprocess.DEVNULL).decode("utf-8", errors="ignore").strip()
        
        if author_out:
            parts = author_out.split("|")
            author = parts[0] if len(parts) > 0 else "Nəzərdə tutulmayıb"
            commit_time = parts[1] if len(parts) > 1 else ""
            msg = parts[2] if len(parts) > 2 else ""
            last_commit = f"{commit_time} ({msg})" if msg else commit_time
            changes_count = int(count_out) if count_out.isdigit() else 1
            return author, last_commit, changes_count
    except Exception: pass
    return "Lokal Müəllif", "Son Dəyişiklik Qeydə Alınmayıb", 1

def extract_dependencies(content, ext):
    imports = []
    if not content:
        return imports
    if ext in [".js", ".jsx", ".ts", ".tsx", ".cjs", ".mjs"]:
        # Match standard imports, requires, and destructuring from packages/relative paths
        matches = re.findall(r'(?:import|from|require)\s*\(?\s*[\'"]([^\'"]+)[\'"]\)?', content)
        # Match ES6 destructuring import names
        named_imports = re.findall(r'import\s+\{([^}]+)\}\s+from', content)
        for group in named_imports:
            names = [n.strip().split(" as ")[0] for n in group.split(",") if n.strip()]
            imports.extend(names[:5])
        imports.extend(matches)
        imports = list(set(imports))[:15]
    elif ext == ".py":
        matches = re.findall(r'^\s*(?:import|from)\s+([a-zA-Z0-9_\.]+)', content, re.MULTILINE)
        imports = list(set(matches))[:15]
    elif ext == ".rs":
        # Match use statements and crate modules
        matches = re.findall(r'use\s+([a-zA-Z0-9_:]+(?:::\{[^}]+\})?)', content)
        mods = re.findall(r'mod\s+([a-zA-Z0-9_]+);', content)
        imports.extend(matches)
        imports.extend([f"mod {m}" for m in mods])
        imports = list(set(imports))[:15]
    return imports

def scan_security_and_quality(content, ext):
    issues = []
    if not content:
        return issues
    
    # 1. Secret / Hardcoded Tokens Audit
    secret_matches = re.findall(r'(?:api_key|token|password|secret|bearer|private_key)\s*=\s*[\'"][A-Za-z0-9_\-]{8,}[\'"]', content, re.IGNORECASE)
    if secret_matches:
        issues.append("🔑 Potensial Həssas Kod/API Key unudulub (Hardcoded Secret)")

    # 2. OWASP: SQL Injection Risk Audit
    sql_inj_matches = re.findall(r'(?:format!|f[\'"]|%\s*\(|\+\s*)[^\n]*?(?:SELECT|INSERT|UPDATE|DELETE)\s+[^\n]*?\{\}', content, re.IGNORECASE)
    if sql_inj_matches or re.search(r'(?:SELECT|INSERT|UPDATE|DELETE)\s+.*?\+\s*[a-zA-Z_]', content, re.IGNORECASE):
        issues.append("🚨 OWASP Riski: Potensial SQL Injection (Xam string daxil etmə)")

    # 3. OWASP: XSS (Cross-Site Scripting) Risk Audit
    if ext in [".js", ".jsx", ".ts", ".tsx", ".html"]:
        if "dangerouslySetInnerHTML" in content or "innerHTML" in content:
            issues.append("🛡️ OWASP Riski: XSS (DOM Injection - dangerouslySetInnerHTML/innerHTML)")
        if "eval(" in content:
            issues.append("🚨 Riskli `eval()` funksiyası (Security Hazard)")

    # 4. Rust specific checks (.unwrap(), .expect(), unsafe)
    if ext == ".rs":
        unwrap_count = len(re.findall(r'\.unwrap\(\)', content))
        if unwrap_count > 0:
            issues.append(f"⚠️ {unwrap_count} ədəd `.unwrap()` tapıldı (Crash riski)")
        if "unsafe" in content:
            issues.append("⚡ Rust `unsafe` bloku istifadə olunur (Yaddaş təhlükəsizliyi nəzarəti lazımdır)")

    # 5. Python Exception handling checks
    if ext == ".py":
        if "except:" in content or "except Exception:" in content:
            issues.append("🛡️ Geniş `except` bloku (Sessiz xəta gizlənməsi riski)")

    return issues

def get_max_ai_analysis(rel_path):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            SELECT system_role, purpose_az, data_flow, security_scope, functions_json, db_tables_json, libraries_json, 
                   imports_json, imported_by_json, git_last_commit, git_author, git_changes_count, ai_summary, file_size_kb, line_count,
                   security_issues_json, impact_score, code_preview
            FROM file_analysis WHERE file_path = ?
        ''', (rel_path,))
        row = cursor.fetchone()
        conn.close()
        if row:
            return {
                "system_role": row[0],
                "purpose_az": row[1],
                "data_flow": row[2],
                "security_scope": row[3],
                "functions": json.loads(row[4]) if row[4] else [],
                "db_tables": json.loads(row[5]) if row[5] else [],
                "libraries": json.loads(row[6]) if row[6] else [],
                "imports": json.loads(row[7]) if row[7] else [],
                "imported_by": json.loads(row[8]) if row[8] else [],
                "git_last_commit": row[9] or "",
                "git_author": row[10] or "Lokal",
                "git_changes_count": row[11] or 1,
                "ai_summary": row[12],
                "file_size_kb": row[13],
                "line_count": row[14],
                "security_issues": json.loads(row[15]) if len(row) > 15 and row[15] else [],
                "impact_score": row[16] if len(row) > 16 and row[16] is not None else 0,
                "code_preview": row[17] if len(row) > 17 and row[17] else ""
            }
    except Exception as e:
        log_message("ERROR", f"Bazada '{rel_path}' oxunarkən xəta", e)
    return None

def save_max_ai_analysis(rel_path, data):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO file_analysis 
            (file_path, system_role, purpose_az, data_flow, security_scope, functions_json, db_tables_json, libraries_json, imports_json, imported_by_json, git_last_commit, git_author, git_changes_count, security_issues_json, impact_score, code_preview, ai_summary, file_size_kb, line_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(file_path) DO UPDATE SET
                system_role=excluded.system_role,
                purpose_az=excluded.purpose_az,
                data_flow=excluded.data_flow,
                security_scope=excluded.security_scope,
                functions_json=excluded.functions_json,
                db_tables_json=excluded.db_tables_json,
                libraries_json=excluded.libraries_json,
                imports_json=excluded.imports_json,
                imported_by_json=excluded.imported_by_json,
                git_last_commit=excluded.git_last_commit,
                git_author=excluded.git_author,
                git_changes_count=excluded.git_changes_count,
                security_issues_json=excluded.security_issues_json,
                impact_score=excluded.impact_score,
                code_preview=excluded.code_preview,
                ai_summary=excluded.ai_summary,
                file_size_kb=excluded.file_size_kb,
                line_count=excluded.line_count,
                updated_at=CURRENT_TIMESTAMP
        ''', (
            rel_path,
            data.get("system_role", "📄 Sistem Faylı"),
            data.get("purpose_az", ""),
            data.get("data_flow", ""),
            data.get("security_scope", ""),
            json.dumps(data.get("functions", []), ensure_ascii=False),
            json.dumps(data.get("db_tables", []), ensure_ascii=False),
            json.dumps(data.get("libraries", []), ensure_ascii=False),
            json.dumps(data.get("imports", []), ensure_ascii=False),
            json.dumps(data.get("imported_by", []), ensure_ascii=False),
            data.get("git_last_commit", ""),
            data.get("git_author", "Lokal"),
            data.get("git_changes_count", 1),
            json.dumps(data.get("security_issues", []), ensure_ascii=False),
            data.get("impact_score", 0),
            data.get("code_preview", ""),
            data.get("ai_summary", ""),
            data.get("file_size_kb", 0),
            data.get("line_count", 0)
        ))
        conn.commit()
        conn.close()
        log_message("INFO", f"Maksimal AI Analiz Bazaya Yazıldı: '{rel_path}'")
    except Exception as e:
        log_message("ERROR", f"Bazaya '{rel_path}' yazılarkən xəta", e)

TECH_ENCYCLOPEDIA = {
    "react": "⚛️ React: UI komponentləri yaratmaq üçün veb kitabxanası",
    "vite": "⚡ Vite: Veb tətbiqləri ildırım sürəti ilə yığan mühərrik",
    "tokio": "🚀 Tokio: Rust asinxron şəbəkə mühərriki",
    "actix-web": "🦀 Actix-Web: Yüksək performanslı Rust backend serveri",
    "serde": "📦 Serde: Rust JSON çevirici",
    "postgres": "🐘 PostgreSQL: Verilənlər bazası",
    "axios": "🌐 Axios: HTTP sorğu göndərən kitabxana",
    "tkinter": "🖥️ Tkinter: Python GUI pəncərə kitabxanası",
    "defender": "🛡️ Windows Defender: Antivirus istisna ayarları",
    "express": "🚂 Express.js: Node.js backend mühərriki"
}

# Max-Depth AI File Code Parser
def perform_max_ai_file_analysis(abs_path, ext, rel_path, descriptions_dict, force=False):
    existing = get_max_ai_analysis(rel_path)
    if existing and not force and existing.get("security_issues") is not None:
        return existing

    size_kb = round(os.path.getsize(abs_path) / 1024, 1) if os.path.exists(abs_path) else 0
    line_count = 0
    content = ""

    try:
        if os.path.isfile(abs_path):
            with open(abs_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                line_count = len(content.splitlines())
    except Exception as e:
        log_message("WARNING", f"Fayl oxunarkən xəta: {rel_path}", e)

    # 1. System Role & Category Determination
    system_role = "📄 Ümumi Fayl"
    if "admin" in rel_path.lower(): system_role = "🖥️ Admin Paneli Modulu"
    elif "rust" in rel_path.lower() or ext == ".rs": system_role = "🦀 Rust Backend Servisi"
    elif "cloudflare" in rel_path.lower() or "worker" in rel_path.lower(): system_role = "☁️ Cloudflare Təhlükəsizlik Keçidi"
    elif "dizayn" in rel_path.lower(): system_role = "🎨 UI/UX Dizayn Şablonu"
    elif "github" in rel_path.lower(): system_role = "🛠️ GitHub Avtomatlaşdırma Aləti"
    elif ext == ".ps1": system_role = "🛡️ Antivirus və Təhlükəsizlik Skripti"
    elif ext in [".bat", ".sh"]: system_role = "⚡ İşə Salma Skripti"

    # 2. Extract DB Tables via Regex & ORM Patterns
    db_tables = list(set(re.findall(r'(?:FROM|JOIN|INTO|UPDATE|TABLE|table!|table_name|schema::)\s+([a-zA-Z0-9_]+)', content, re.IGNORECASE)))
    db_tables = [t for t in db_tables if t.lower() not in ['select', 'where', 'set', 'values', 'if', 'exists', 'let', 'const', 'pub', 'use', 'mod']][:10]

    # 3. Extract Deep Functions via AST & Advanced Syntactic Patterns
    functions = []
    if ext == ".py" and content:
        try:
            import ast
            tree = ast.parse(content)
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                    functions.append(f"def {node.name}()")
                elif isinstance(node, ast.ClassDef):
                    functions.append(f"class {node.name}")
        except Exception:
            fns = re.findall(r'^\s*(def|class)\s+([a-zA-Z0-9_]+)', content, re.MULTILINE)
            functions = [f"{kind} {name}()" for kind, name in fns[:10]]
    elif ext in [".js", ".jsx", ".ts", ".tsx", ".cjs"]:
        fns = re.findall(r'(?:export\s+)?(?:async\s+)?(function|const|let|class)\s+([a-zA-Z0-9_]+)\s*(=|\(|\<)', content)
        functions = [f"{name}()" for _, name, _ in fns[:12] if name not in ['React', 'props', 'state', 'useEffect', 'useState']]
        # Catch anonymous arrow functions assigned to object properties
        anon_arrows = re.findall(r'([a-zA-Z0-9_]+)\s*:\s*(?:async\s*)?\([^)]*\)\s*=>', content)
        for arrow_fn in anon_arrows[:5]:
            if f"{arrow_fn}()" not in functions:
                functions.append(f"⚡ lambda {arrow_fn}()")
    elif ext == ".rs":
        # Rich Rust syntactic parsing: pub async fn, fn, impl, struct, enum, trait
        fns = re.findall(r'(?:pub(?:\([^)]+\))?\s+)?(?:async\s+)?(fn|struct|enum|trait|impl)\s+([a-zA-Z0-9_]+)', content)
        for kind, name in fns[:15]:
            if name not in ['Self', 'String', 'Result', 'Option']:
                functions.append(f"{kind} {name}")

    # 4. Extract Code Preview Snippet (First 15 meaningful lines)
    code_lines = [line for line in content.splitlines() if line.strip() and not line.strip().startswith(("#", "//", "/*", "*"))][:15]
    code_preview_raw = "\n".join(code_lines[:15]) if code_lines else ""
    # Strip HTML tags and JS code blocks that contain template literals (${...}) to ensure literal safety
    code_preview = re.sub(r'\$\{.*?\}', '', code_preview_raw)
    code_preview = code_preview.replace("\\", "/").replace('"', "'").replace("`", "'").replace("\r", "")

    # 5. Extract Libraries
    libraries = []
    content_lower = content.lower()
    for key, exp in TECH_ENCYCLOPEDIA.items():
        if key in content_lower:
            libraries.append(exp)

    # 6. Dependency Analysis
    imports = extract_dependencies(content, ext)
    imported_by = []

    # 6. Git Info Analysis
    author, last_commit, changes_count = get_git_info(abs_path)

    # 7. Security Scope Analysis
    security_scope = "⚪ Standart (Açıq Kod)"
    if any(k in content_lower for k in ["password", "secret", "token", "auth", "key", "crypto", "exclusion"]):
        security_scope = "🔒 Təhlükəsizlik Və İcazə Məntiqi Var"

    # 8. Data Flow Analysis
    data_flow = "📄 Lokal Məlumat İşlənməsi"
    if "http" in content_lower or "fetch" in content_lower or "axios" in content_lower:
        data_flow = "🌐 Veb / HTTP Şəbəkə Sorğuları Göndərir Və Oxuyur"
    elif db_tables or "sqlite" in content_lower or "postgres" in content_lower:
        data_flow = f"🗄️ Verilənlər Bazasına Bağlanır (Cədvəllər: {', '.join(db_tables) if db_tables else 'DB'})"

    # 9. Purpose Determination
    purpose_az = descriptions_dict.get(rel_path, descriptions_dict.get(os.path.basename(rel_path)))
    if not purpose_az:
        if ext == ".ps1":
            purpose_az = "🛡️ Windows Defender Antivirusunun layihə fayllarını bloklamaması üçün istisnalar (Exclusion) siyahısına əlavə edir."
        elif ext in [".bat", ".sh"]:
            purpose_az = "⚡ Layihəni tək tıkla başlatmaq üçün işə salma skriptidir."
        elif ext == ".json":
            purpose_az = f"⚙️ Sistem konfiqurasiya məlumatlarını saxlayır. (Həcm: {size_kb} KB)"
        elif ext in [".db", ".sqlite"]:
            purpose_az = f"🗄️ Məlumat bazası faylı. Sistem qeydlərini saxlamaq üçündür. (Həcm: {size_kb} KB)"
        else:
            purpose_az = f"📜 Proqram kod faylı. Toplam {line_count} sətir koda malikdir."

    # 10. Security & Code Quality Scan
    security_issues = scan_security_and_quality(content, ext)

    # 11. Complete AI Summary Construction
    ai_summary = f"[{system_role}] {purpose_az} | Məlumat Axını: {data_flow} | Təhlükəsizlik: {security_scope} | Sətir: {line_count} | Dəyişikliklər: {changes_count}"
    if security_issues:
        ai_summary += f" | ⚠️ Xəbərdarlıqlar: {len(security_issues)}"

    result_data = {
        "system_role": system_role,
        "purpose_az": purpose_az,
        "data_flow": data_flow,
        "security_scope": security_scope,
        "functions": functions,
        "db_tables": db_tables,
        "libraries": libraries,
        "imports": imports,
        "imported_by": imported_by,
        "git_last_commit": last_commit,
        "git_author": author,
        "git_changes_count": changes_count,
        "security_issues": security_issues,
        "impact_score": len(imported_by),
        "code_preview": code_preview,
        "ai_summary": ai_summary,
        "file_size_kb": size_kb,
        "line_count": line_count
    }

    save_max_ai_analysis(rel_path, result_data)
    return result_data

def build_tree_hierarchy(root_dir, force_rescan=False):
    beledci_dir = os.path.join(root_dir, "beledci")
    desc_path = os.path.join(beledci_dir, "descriptions.json")
    descriptions = {}
    if os.path.exists(desc_path):
        try:
            with open(desc_path, "r", encoding="utf-8") as f:
                descriptions = json.load(f)
        except Exception: pass

    skip_dirs = {".git", "node_modules", "target", ".docker_cargo_cache", ".docker_rustup_cache", ".docker_apt_cache", ".docker_apt_lists", "__pycache__", "dist", ".vscode", "postgres-bin", "pgAdmin 4", "site-packages"}
    
    tree_root = {
        "name": "Ana Qovluq (Root)",
        "rel_path": "",
        "abs_path": root_dir.replace("\\", "/"),
        "desc": descriptions.get("", "🚀 Layihənin Kök Papkası (Ana Qovluq)"),
        "files": [],
        "children": {}
    }

    for dirpath, dirnames, filenames in os.walk(root_dir):
        dirnames[:] = [d for d in dirnames if d not in skip_dirs and not d.startswith(".")]
        
        rel_dir = os.path.relpath(dirpath, root_dir)
        rel_dir_clean = "" if rel_dir == "." else rel_dir.replace("\\", "/")
        parts = rel_dir_clean.split("/") if rel_dir_clean else []

        curr_node = tree_root
        accum_path = ""
        for p in parts:
            accum_path = (accum_path + "/" + p) if accum_path else p
            if p not in curr_node["children"]:
                curr_node["children"][p] = {
                    "name": p,
                    "rel_path": accum_path,
                    "abs_path": os.path.join(root_dir, accum_path).replace("\\", "/"),
                    "desc": descriptions.get(accum_path, "📁 Qovluq"),
                    "files": [],
                    "children": {}
                }
            curr_node = curr_node["children"][p]

        for f in sorted(filenames):
            if f.startswith("."):
                continue
            f_rel = (rel_dir_clean + "/" + f) if rel_dir_clean else f
            ext = os.path.splitext(f)[1].lower()
            abs_p = os.path.join(dirpath, f).replace("\\", "/")
            
            ai_info = perform_max_ai_file_analysis(abs_p, ext, f_rel, descriptions, force=force_rescan)
            vscode_url = f"vscode://file/{abs_p}"
            
            curr_node["files"].append({
                "name": f,
                "path": f_rel,
                "abs_path": abs_p,
                "vscode_url": vscode_url,
                "desc": ai_info["purpose_az"],
                "category": ai_info["system_role"],
                "data_flow": ai_info["data_flow"],
                "security_scope": ai_info["security_scope"],
                "functions": ai_info["functions"],
                "db_tables": ai_info["db_tables"],
                "libraries": ai_info["libraries"],
                "imports": ai_info.get("imports", []),
                "imported_by": ai_info.get("imported_by", []),
                "git_last_commit": ai_info.get("git_last_commit", ""),
                "git_author": ai_info.get("git_author", "Lokal"),
                "git_changes_count": ai_info.get("git_changes_count", 1),
                "security_issues": ai_info.get("security_issues", []),
                "impact_score": ai_info.get("impact_score", 0),
                "code_preview": ai_info.get("code_preview", ""),
                "ai_summary": ai_info["ai_summary"],
                "file_size_kb": ai_info["file_size_kb"],
                "line_count": ai_info["line_count"],
                "ext": ext
            })

    # Cross-link imported_by and calculate impact scores
    file_map = {}
    def collect_files(node):
        for f in node["files"]:
            file_map[f["name"]] = f
            file_map[f["path"]] = f
        for c in node["children"].values():
            collect_files(c)
    collect_files(tree_root)

    for f_path, f_obj in list(file_map.items()):
        for imp in f_obj.get("imports", []):
            imp_base = os.path.basename(imp)
            if imp_base in file_map:
                target_f = file_map[imp_base]
                if f_obj["path"] not in target_f["imported_by"]:
                    target_f["imported_by"].append(f_obj["path"])
                    target_f["impact_score"] = len(target_f["imported_by"])

    return tree_root

def generate_files(root_dir=None, force_rescan=False):
    if root_dir is None:
        root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    beledci_dir = os.path.join(root_dir, "beledci")
    if not os.path.exists(beledci_dir):
        os.makedirs(beledci_dir)
        
    tree_data = build_tree_hierarchy(root_dir, force_rescan=force_rescan)

    tree_json_str = json.dumps(tree_data, ensure_ascii=False, indent=2).replace("</script>", "<\\/script>").replace("</SCRIPT>", "<\\/SCRIPT>")
    
    html_content = f'''<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📚 Layihə Bələdçisi - Ultra AI Analiz Və İntellekt Mühərriki</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }}
        body {{ background: #0f172a; color: #f8fafc; display: flex; height: 100vh; overflow: hidden; }}
        
        .sidebar {{ width: 360px; background: #1e293b; border-right: 1px solid #334155; display: flex; flex-direction: column; }}
        .sidebar-header {{ padding: 20px; border-bottom: 1px solid #334155; background: #0f172a; display: flex; align-items: center; justify-content: space-between; }}
        .sidebar-header h2 {{ font-size: 1.1rem; color: #38bdf8; display: flex; align-items: center; gap: 8px; }}
        .status-badge {{ background: #10b981; color: #022c22; font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 12px; display: flex; align-items: center; gap: 4px; }}
        .status-badge::before {{ content: ""; display: inline-block; width: 6px; height: 6px; background: #022c22; border-radius: 50%; animation: pulse 1.5s infinite; }}
        @keyframes pulse {{ 0% {{ opacity: 1; }} 50% {{ opacity: 0.3; }} 100% {{ opacity: 1; }} }}
        
        .search-box {{ padding: 15px; border-bottom: 1px solid #334155; display: flex; gap: 8px; }}
        .search-box input {{ flex: 1; padding: 10px 14px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: #fff; outline: none; }}
        .btn-log-view {{ background: #f59e0b; color: #000; border: none; padding: 0 14px; border-radius: 8px; font-weight: 700; cursor: pointer; }}
        
        .folder-tree {{ flex: 1; overflow-y: auto; padding: 15px 10px; }}
        
        .tree-node {{ margin-left: 12px; border-left: 1px dashed #334155; padding-left: 8px; }}
        .tree-node.root-node {{ margin-left: 0; border-left: none; padding-left: 0; }}
        .tree-label {{ display: flex; align-items: center; padding: 8px 10px; border-radius: 6px; cursor: pointer; color: #cbd5e1; font-size: 0.88rem; transition: background 0.2s; user-select: none; gap: 6px; }}
        .tree-label:hover, .tree-label.active {{ background: #334155; color: #38bdf8; }}
        .toggle-icon {{ font-size: 0.75rem; color: #94a3b8; width: 16px; display: inline-block; text-align: center; transition: transform 0.2s; }}
        .toggle-icon.expanded {{ transform: rotate(90deg); }}
        .children-container {{ display: none; }}
        .children-container.open {{ display: block; }}
        .file-badge {{ background: #0f172a; color: #94a3b8; font-size: 0.7rem; padding: 2px 6px; border-radius: 10px; margin-left: auto; }}

        .main-content {{ flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #0f172a; }}
        .main-header {{ padding: 20px 30px; background: #1e293b; border-bottom: 1px solid #334155; }}
        
        .breadcrumbs {{ display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #94a3b8; margin-bottom: 8px; flex-wrap: wrap; }}
        .breadcrumb-item {{ cursor: pointer; color: #38bdf8; font-weight: 500; display: flex; align-items: center; gap: 6px; }}
        .breadcrumb-item:hover {{ text-decoration: underline; color: #7dd3fc; }}
        .breadcrumb-separator {{ color: #475569; font-size: 0.75rem; }}
        .breadcrumb-current {{ color: #f8fafc; font-weight: 700; }}

        .main-header h1 {{ font-size: 1.3rem; color: #f8fafc; margin-top: 4px; }}
        .main-header p {{ font-size: 0.85rem; color: #94a3b8; margin-top: 2px; }}
        
        .content-body {{ flex: 1; overflow-y: auto; padding: 30px; display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; align-content: start; }}
        
        .file-card {{ background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; transition: transform 0.2s, border-color 0.2s; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; position: relative; }}
        .file-card:hover {{ transform: translateY(-3px); border-color: #38bdf8; box-shadow: 0 10px 25px -5px rgba(56, 189, 248, 0.1); }}
        .hot-badge {{ position: absolute; top: 15px; right: 15px; background: #ef4444; color: #fff; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; }}
        .file-name {{ font-weight: 700; color: #f8fafc; font-size: 1.05rem; word-break: break-all; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; padding-right: 40px; }}
        .file-desc {{ font-size: 0.9rem; color: #f1f5f9; line-height: 1.55; margin-bottom: 16px; flex: 1; background: #0f172a; padding: 12px; border-radius: 8px; border-left: 4px solid #38bdf8; font-weight: 400; }}
        .file-path {{ font-size: 0.75rem; color: #64748b; font-family: monospace; background: #0f172a; padding: 6px 10px; border-radius: 6px; margin-bottom: 14px; word-break: break-all; }}
        .file-category {{ font-size: 0.8rem; color: #38bdf8; margin-bottom: 10px; font-weight: 600; display: flex; align-items: center; gap: 6px; }}
        
        .file-actions {{ display: flex; gap: 8px; margin-top: 10px; }}
        .file-actions a {{ flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; background: #38bdf8; color: #0f172a; text-decoration: none; font-weight: 700; font-size: 0.85rem; border-radius: 8px; transition: background 0.2s; }}
        .file-actions a.btn-vscode {{ background: #007acc; color: #ffffff; }}
        .file-actions a.btn-vscode:hover {{ background: #005999; }}
        .file-actions a:hover {{ background: #7dd3fc; }}

        .modal-overlay {{ display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(8px); z-index: 999; align-items: center; justify-content: center; }}
        .modal-overlay.open {{ display: flex; }}
        .modal-box {{ background: #1e293b; border: 1px solid #475569; border-radius: 16px; width: 90%; max-width: 680px; max-height: 85vh; overflow-y: auto; padding: 30px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); position: relative; color: #f8fafc; }}
        .modal-close {{ position: absolute; top: 20px; right: 20px; background: #334155; color: #fff; border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-weight: bold; font-size: 1rem; }}
        .modal-title {{ font-size: 1.3rem; margin-bottom: 15px; color: #38bdf8; display: flex; align-items: center; gap: 10px; }}
        .modal-sec {{ margin-bottom: 16px; }}
        .modal-sec-title {{ font-size: 0.8rem; text-transform: uppercase; color: #38bdf8; font-weight: 700; margin-bottom: 6px; letter-spacing: 0.5px; }}
        .modal-sec-desc {{ font-size: 0.95rem; color: #cbd5e1; line-height: 1.5; background: #0f172a; padding: 14px; border-radius: 8px; border-left: 4px solid #10b981; }}
        .btn-reanalyze {{ background: #8b5cf6; color: #fff; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s; width: 100%; justify-content: center; margin-bottom: 10px; }}
        .log-area {{ background: #090d16; color: #10b981; font-family: monospace; font-size: 0.82rem; padding: 15px; border-radius: 8px; max-height: 350px; overflow-y: auto; white-space: pre-wrap; word-break: break-all; }}
        .tag-list {{ display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; }}
        .tag-fn {{ background: #0f172a; border: 1px solid #334155; color: #38bdf8; font-family: monospace; font-size: 0.8rem; padding: 4px 10px; border-radius: 6px; }}
        .tag-imp {{ background: #0284c7; color: #ffffff; font-family: monospace; font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; }}
        #graphNetwork {{ width: 100%; height: 320px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; margin-top: 10px; }}
    </style>
    <script type="text/javascript" src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
</head>
<body>
    <div class="sidebar">
        <div class="sidebar-header">
            <h2>📚 Layihə Bələdçisi</h2>
            <div class="status-badge">ULTRA AI MÜHƏRRİK</div>
        </div>
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="Fayl, cədvəl, import və ya məzmun axtar..." oninput="filterSearch()">
            <button class="btn-log-view" onclick="openLogModal()" title="Sistem Loqlarına Bax">📋 Loqlar</button>
        </div>
        <div class="folder-tree" id="folderTree"></div>
    </div>
    
    <div class="main-content">
        <div class="main-header">
            <div class="breadcrumbs" id="breadcrumbBar"></div>
            <h1 id="selectedFolderTitle">Ana Qovluq</h1>
            <p id="selectedFolderDesc">Mövcud papkadakı fayllar</p>
        </div>
        <div class="content-body" id="contentGrid"></div>
    </div>

    <!-- Modal Box -->
    <div class="modal-overlay" id="detailModal">
        <div class="modal-box">
            <button class="modal-close" onclick="closeModal()">✕</button>
            <div class="modal-title" id="mTitle"></div>
            <div class="modal-sec">
                <div class="modal-sec-title">📍 Yerləşdiyi Yol & Sistem Rolu:</div>
                <div id="mPath" style="font-family: monospace; font-size: 0.85rem; color: #94a3b8;"></div>
            </div>
            <div class="modal-sec">
                <div class="modal-sec-title">💡 Faylın Həqiqi Dərin Məzmun Təhlili:</div>
                <div class="modal-sec-desc" id="mDesc"></div>
            </div>
            <div class="modal-sec">
                <div class="modal-sec-title">🔄 Məlumat Axını (Data Flow):</div>
                <div id="mDataFlow" style="font-size: 0.9rem; color: #cbd5e1; background: #0f172a; padding: 10px; border-radius: 8px;"></div>
            </div>
            <div class="modal-sec">
                <div class="modal-sec-title">🔒 Təhlükəsizlik Rejimi:</div>
                <div id="mSecurity" style="font-size: 0.9rem; color: #f59e0b;"></div>
            </div>
            <div class="modal-sec" id="mGitSec">
                <div class="modal-sec-title">📊 Git Versiya Və Müəlliflik Təhlili:</div>
                <div id="mGitInfo" style="font-size: 0.85rem; color: #a7f3d0; background: #064e3b; padding: 10px; border-radius: 8px;"></div>
            </div>
            <div class="modal-sec" id="mImpSec">
                <div class="modal-sec-title">🔗 Daxil Etdiyi Kitabxana Və Fayllar (Imports):</div>
                <div class="tag-list" id="mImports"></div>
            </div>
            <div class="modal-sec">
                <div class="modal-sec-title">🕸️ İnteraktiv Fayl Əlaqə Şəbəkəsi (Node Graph):</div>
                <div id="graphNetwork"></div>
            </div>
            <div class="modal-sec" id="mFnSec">
                <div class="modal-sec-title">🧩 Koddakı Daxili Funksiyalar:</div>
                <div class="tag-list" id="mFns"></div>
            </div>
            <div class="modal-sec" id="mDbSec">
                <div class="modal-sec-title">🗄️ İştirak Edən DB Cədvəlləri:</div>
                <div class="tag-list" id="mDbs"></div>
            </div>
            
            <button class="btn-reanalyze" id="mReAnalyzeBtn">🧪 Maksimal AI Analizi Yenilə Və Bazaya Yaz</button>
            
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <a id="mVsCodeBtn" href="#" style="flex: 1; text-align: center; padding: 10px; background: #007acc; color: #fff; text-decoration: none; font-weight: 700; border-radius: 8px;">💻 VS Code-da Aç</a>
                <a id="mActionBtn" href="#" target="_blank" style="flex: 1; text-align: center; padding: 10px; background: #38bdf8; color: #0f172a; text-decoration: none; font-weight: 700; border-radius: 8px;">🔍 Kodunu Vebdə Oxu</a>
            </div>
        </div>
    </div>

    <!-- Log Modal Box -->
    <div class="modal-overlay" id="logModal">
        <div class="modal-box">
            <button class="modal-close" onclick="closeLogModal()">✕</button>
            <div class="modal-title">📋 Sistem Loqları Və Xətalar (beledci.log)</div>
            <div class="modal-sec">
                <div class="log-area" id="logContent">Loqlar yüklənir...</div>
            </div>
        </div>
    </div>

    <!-- JSON Data Container to avoid JS Syntax Errors -->
    <script id="tree-data-container" type="application/json">
    {tree_json_str}
    </script>

    <script>
        let rootTree = JSON.parse(document.getElementById("tree-data-container").textContent);
        let currentNode = rootTree;
        let activePath = "";

        function escapeHTML(str) {{
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }}

        function buildTreeHTML(node, isRoot = false) {{
            const hasChildren = Object.keys(node.children).length > 0;
            const fileCount = node.files.length;
            const folderName = isRoot ? "🌐 " + node.name : "📁 " + node.name;
            
            let html = `<div class="tree-node ${{isRoot ? 'root-node' : ''}}">`;
            html += `<div class="tree-label ${{node.rel_path === activePath ? 'active' : ''}}" onclick="onNodeClick('${{node.rel_path}}', event)">`;
            
            if (hasChildren) {{
                html += `<span class="toggle-icon expanded" onclick="toggleFolder('${{node.rel_path}}', event)">▶</span>`;
            }} else {{
                html += `<span class="toggle-icon"></span>`;
            }}
            
            html += `<span>${{folderName}}</span>`;
            html += `<span class="file-badge">${{fileCount}}</span>`;
            html += `</div>`;

            if (hasChildren) {{
                html += `<div class="children-container open" id="children-${{node.rel_path.replace(/\\//g, '_')}}">`;
                for (const childKey of Object.keys(node.children).sort()) {{
                    html += buildTreeHTML(node.children[childKey]);
                }}
                html += `</div>`;
            }}
            
            html += `</div>`;
            return html;
        }}

        function findNodeByPath(node, targetPath) {{
            if (node.rel_path === targetPath) return node;
            for (const key in node.children) {{
                const found = findNodeByPath(node.children[key], targetPath);
                if (found) return found;
            }}
            return null;
        }}

        function toggleFolder(relPath, event) {{
            event.stopPropagation();
            const container = document.getElementById("children-" + relPath.replace(/\\//g, '_'));
            const label = event.currentTarget;
            if (container) {{
                if (container.classList.contains("open")) {{
                    container.classList.remove("open");
                    label.classList.remove("expanded");
                }} else {{
                    container.classList.add("open");
                    label.classList.add("expanded");
                }}
            }}
        }}

        function onNodeClick(relPath, event) {{
            if (event) event.stopPropagation();
            activePath = relPath;
            const target = findNodeByPath(rootTree, relPath);
            if (target) {{
                currentNode = target;
                renderTree();
                renderMainContent();
            }}
        }}

        function renderTree() {{
            document.getElementById("folderTree").innerHTML = buildTreeHTML(rootTree, true);
        }}

        function renderBreadcrumbs() {{
            const bar = document.getElementById("breadcrumbBar");
            bar.innerHTML = "";
            const parts = activePath ? activePath.split("/") : [];
            let html = `<span class="breadcrumb-item" onclick="onNodeClick('')">🏠 Ana Qovluq</span>`;
            let runningPath = "";

            parts.forEach((p, idx) => {{
                runningPath = runningPath ? runningPath + "/" + p : p;
                html += `<span class="breadcrumb-separator">❯</span>`;
                if (idx === parts.length - 1) {{
                    html += `<span class="breadcrumb-current">${{p}}</span>`;
                }} else {{
                    html += `<span class="breadcrumb-item" onclick="onNodeClick('${{runningPath}}')">${{p}}</span>`;
                }}
            }});

            bar.innerHTML = html;
        }}

        function openModal(f) {{
            document.getElementById("mTitle").innerText = "📄 " + f.name;
            document.getElementById("mPath").innerText = f.path + " | " + (f.category || '');
            document.getElementById("mDesc").innerText = f.desc;
            document.getElementById("mDataFlow").innerText = f.data_flow || 'Lokal məlumat işlənməsi';
            document.getElementById("mSecurity").innerText = f.security_scope || 'Standart';

            const gitInfoStr = `Müəllif: ${{f.git_author || 'Lokal'}} | Son Commit: ${{f.git_last_commit || 'Qeydə Alınmayıb'}} | Dəyişiklik Sayı: ${{f.git_changes_count || 1}}`;
            document.getElementById("mGitInfo").innerText = gitInfoStr;

            const impSec = document.getElementById("mImpSec");
            const impContainer = document.getElementById("mImports");
            if (f.imports && f.imports.length > 0) {{
                impSec.style.display = "block";
                impContainer.innerHTML = f.imports.map(imp => `<span class="tag-imp">📦 ${{imp}}</span>`).join("");
            }} else {{
                impSec.style.display = "none";
            }}

            const fnSec = document.getElementById("mFnSec");
            const fnContainer = document.getElementById("mFns");
            if (f.functions && f.functions.length > 0) {{
                fnSec.style.display = "block";
                fnContainer.innerHTML = f.functions.map(fn => `<span class="tag-fn">⚡ ${{fn}}</span>`).join("");
            }} else {{
                fnSec.style.display = "none";
            }}

            const dbSec = document.getElementById("mDbSec");
            const dbContainer = document.getElementById("mDbs");
            if (f.db_tables && f.db_tables.length > 0) {{
                dbSec.style.display = "block";
                dbContainer.innerHTML = f.db_tables.map(tbl => `<span class="tag-fn" style="color:#10b981;">🗄️ ${{tbl}}</span>`).join("");
            }} else {{
                dbSec.style.display = "none";
            }}

            const btn = document.getElementById("mReAnalyzeBtn");
            btn.onclick = async () => {{
                btn.innerText = "⏳ Maksimal AI Analizi İcra Olunur...";
                try {{
                    const res = await fetch("/api/reanalyze?file=" + encodeURIComponent(f.path));
                    const data = await res.json();
                    if (data.ok) {{
                        document.getElementById("mDesc").innerText = data.desc;
                        f.desc = data.desc;
                        btn.innerText = "✅ SQLite Bazasına Maksimal Analiz Yazıldı!";
                        renderMainContent();
                    }}
                }} catch (e) {{
                    btn.innerText = "❌ Xəta baş verdi";
                }}
                setTimeout(() => {{ btn.innerText = "🧪 Maksimal AI Analizi Yenilə Və Bazaya Yaz"; }}, 3000);
            }};

            document.getElementById("mVsCodeBtn").href = f.vscode_url || "#";
            document.getElementById("mActionBtn").href = "/view?file=" + encodeURIComponent(f.path);
            document.getElementById("detailModal").classList.add("open");

            // Render Vis.js Interactive Node Network Graph
            setTimeout(() => {{
                try {{
                    const container = document.getElementById("graphNetwork");
                    container.innerHTML = "";
                    const nodesArr = [{{ id: f.name, label: f.name, color: "#38bdf8", shape: "box", font: {{ color: "#0f172a", size: 16, bold: true }} }}];
                    const edgesArr = [];

                    (f.imports || []).forEach((imp, i) => {{
                        const impLabel = imp.split("/").pop();
                        nodesArr.push({{ id: "imp_" + i, label: impLabel, color: "#0284c7", shape: "ellipse", font: {{ color: "#ffffff" }} }});
                        edgesArr.push({{ from: f.name, to: "imp_" + i, arrows: "to", label: "imports" }});
                    }});

                    (f.imported_by || []).forEach((by, i) => {{
                        const byLabel = by.split("/").pop();
                        nodesArr.push({{ id: "by_" + i, label: byLabel, color: "#8b5cf6", shape: "ellipse", font: {{ color: "#ffffff" }} }});
                        edgesArr.push({{ from: "by_" + i, to: f.name, arrows: "to", label: "used by" }});
                    }});

                    const data = {{ nodes: new vis.DataSet(nodesArr), edges: new vis.DataSet(edgesArr) }};
                    const options = {{
                        nodes: {{ borderWidth: 2, shadow: true }},
                        edges: {{ color: {{ color: "#475569" }}, font: {{ color: "#94a3b8", size: 10 }} }},
                        physics: {{ barnesHut: {{ springLength: 100 }} }}
                    }};
                    new vis.Network(container, data, options);
                }} catch(e) {{}}
            }}, 100);
        }}

        function closeModal() {{
            document.getElementById("detailModal").classList.remove("open");
        }}

        async function openLogModal() {{
            document.getElementById("logModal").classList.add("open");
            try {{
                const res = await fetch("/api/logs");
                const text = await res.text();
                document.getElementById("logContent").innerText = text || "Loq faylı boşdur.";
            }} catch(e) {{
                document.getElementById("logContent").innerText = "Loqlar oxunarkən xəta: " + e;
            }}
        }}

        function closeLogModal() {{
            document.getElementById("logModal").classList.remove("open");
        }}

        function renderMainContent() {{
            renderBreadcrumbs();
            const title = document.getElementById("selectedFolderTitle");
            const desc = document.getElementById("selectedFolderDesc");
            const grid = document.getElementById("contentGrid");

            title.innerText = currentNode.name === "Ana Qovluq (Root)" ? "🌐 Ana Qovluq (Kök)" : "📁 " + currentNode.name;
            desc.innerText = currentNode.desc;

            grid.innerHTML = "";

            if (!currentNode.files || currentNode.files.length === 0) {{
                grid.innerHTML = `<p style="color: #64748b; grid-column: 1/-1;">Bu papkada fayl yoxdur və ya alt-papkaları seçin.</p>`;
                return;
            }}

            currentNode.files.forEach(f => {{
                const card = document.createElement("div");
                card.className = "file-card";
                card.onclick = () => openModal(f);
                const httpUrl = "/view?file=" + encodeURIComponent(f.path);
                const vscodeUrl = f.vscode_url || "#";
                const isHot = f.git_changes_count && f.git_changes_count > 3;

                card.innerHTML = `
                    <div>
                        ${{isHot ? '<span class="hot-badge">🔥 QAYNAR FAYL</span>' : ''}}
                        <div class="file-name">📄 ${{escapeHTML(f.name)}}</div>
                        <div class="file-category">${{escapeHTML(f.category || '')}}</div>
                        <div class="file-desc">${{escapeHTML(f.desc)}}</div>
                    </div>
                    <div class="file-actions" onclick="event.stopPropagation()">
                        <a href="${{vscodeUrl}}" class="btn-vscode">💻 VS Code-da Aç</a>
                        <a href="${{httpUrl}}" target="_blank">🔍 Oxu</a>
                    </div>
                `;
                grid.appendChild(card);
            }});
        }}

        function filterSearch() {{
            const query = document.getElementById("searchInput").value.toLowerCase().trim();
            if (!query) {{
                renderMainContent();
                return;
            }}

            const grid = document.getElementById("contentGrid");
            grid.innerHTML = "";

            function searchInNode(node, results) {{
                if (node.files) {{
                    node.files.forEach(f => {{
                        const nameMatch = f.name.toLowerCase().includes(query);
                        const descMatch = f.desc.toLowerCase().includes(query);
                        const catMatch = (f.category || '').toLowerCase().includes(query);
                        const dbMatch = (f.db_tables || []).some(t => t.toLowerCase().includes(query));
                        const impMatch = (f.imports || []).some(i => i.toLowerCase().includes(query));

                        if (nameMatch || descMatch || catMatch || dbMatch || impMatch) {{
                            results.push(f);
                        }}
                    }});
                }}
                for (const key in node.children) {{
                    searchInNode(node.children[key], results);
                }}
            }}

            const results = [];
            searchInNode(rootTree, results);

            document.getElementById("selectedFolderTitle").innerText = `🔍 Axtarış: "${{query}}"`;
            document.getElementById("selectedFolderDesc").innerText = `Tapılan fayllar: ${{results.length}}`;

            if (results.length === 0) {{
                grid.innerHTML = `<p style="color: #64748b; grid-column: 1/-1;">Axtarışa uyğun nəticə tapılmadı.</p>`;
                return;
            }}

            results.forEach(f => {{
                const card = document.createElement("div");
                card.className = "file-card";
                card.onclick = () => openModal(f);
                const httpUrl = "/view?file=" + encodeURIComponent(f.path);
                const vscodeUrl = f.vscode_url || "#";
                const isHot = f.git_changes_count && f.git_changes_count > 3;
                const hasSecIssue = f.security_issues && f.security_issues.length > 0;
                const impactScore = f.impact_score || 0;

                card.innerHTML = `
                    <div>
                        ${{isHot ? '<span class="hot-badge">🔥 QAYNAR FAYL</span>' : ''}}
                        ${{hasSecIssue ? '<span class="hot-badge" style="background:#ef4444;">🛡️ TƏHLÜKƏSİZLİK XƏBƏRDARLIĞI</span>' : ''}}
                        ${{impactScore > 0 ? `<span class="hot-badge" style="background:#8b5cf6;">💥 TƏSİR RİSKİ: ${{impactScore}} Fayl</span>` : ''}}
                        <div class="file-name">📄 ${{escapeHTML(f.name)}}</div>
                        <div class="file-category">${{escapeHTML(f.category || '')}}</div>
                        <div class="file-desc">${{escapeHTML(f.desc)}}</div>
                    </div>
                    <div class="file-actions" onclick="event.stopPropagation()">
                        <a href="${{vscodeUrl}}" class="btn-vscode">💻 VS Code-da Aç</a>
                        <a href="${{httpUrl}}" target="_blank">🔍 Oxu</a>
                    </div>
                `;
                grid.appendChild(card);
            }});
        }}

        async function checkLiveUpdates() {{
            try {{
                const res = await fetch('/api/data?t=' + Date.now());
                if (res.ok) {{
                    const newData = await res.json();
                    if (JSON.stringify(newData) !== JSON.stringify(rootTree)) {{
                        rootTree = newData;
                        const target = findNodeByPath(rootTree, activePath);
                        currentNode = target || rootTree;
                        renderTree();
                        renderMainContent();
                    }}
                }}
            }} catch (e) {{}}
        }}

        setInterval(checkLiveUpdates, 2000);

        renderTree();
        renderMainContent();
    </script>
</body>
</html>
'''
    html_file_path = os.path.join(beledci_dir, "beledci.html")
    with open(html_file_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    return tree_data

class LiveBeledciHandler(SimpleHTTPRequestHandler):
    root_dir = None
    
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        if parsed_url.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return

        if parsed_url.path == "/src/main.jsx":
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"// Empty module fallback")
            return
            
        if parsed_url.path.startswith("/api/logs"):
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            if os.path.exists(LOG_FILE_PATH):
                with open(LOG_FILE_PATH, "rb") as f:
                    self.wfile.write(f.read())
            else:
                self.wfile.write(b"Loq fayli hele yaranmayib.")
            return

        if parsed_url.path.startswith("/api/data"):
            tree_data = build_tree_hierarchy(LiveBeledciHandler.root_dir)
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(tree_data, ensure_ascii=False).encode("utf-8"))
            return

        if parsed_url.path.startswith("/api/reanalyze"):
            query = urllib.parse.parse_qs(parsed_url.query)
            rel_file = query.get("file", [None])[0]
            if rel_file:
                abs_path = os.path.join(LiveBeledciHandler.root_dir, rel_file)
                ext = os.path.splitext(rel_file)[1].lower()
                desc_path = os.path.join(LiveBeledciHandler.root_dir, "beledci", "descriptions.json")
                descriptions = {}
                if os.path.exists(desc_path):
                    try:
                        with open(desc_path, "r", encoding="utf-8") as f:
                            descriptions = json.load(f)
                    except Exception as e:
                        log_message("WARNING", "descriptions.json oxunarkən xəta", e)
                
                ai_info = perform_max_ai_file_analysis(abs_path, ext, rel_file, descriptions)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True, "desc": ai_info["purpose_az"]}, ensure_ascii=False).encode("utf-8"))
                return

        if parsed_url.path.startswith("/view"):
            query = urllib.parse.parse_qs(parsed_url.query)
            rel_file = query.get("file", [None])[0]
            if rel_file:
                target_file = os.path.join(LiveBeledciHandler.root_dir, rel_file)
                if os.path.exists(target_file) and os.path.isfile(target_file):
                    self.send_response(200)
                    ext = os.path.splitext(target_file)[1].lower()
                    ct = "text/plain; charset=utf-8"
                    if ext in [".html", ".htm"]: ct = "text/html; charset=utf-8"
                    elif ext in [".js"]: ct = "application/javascript; charset=utf-8"
                    elif ext in [".css"]: ct = "text/css; charset=utf-8"
                    elif ext in [".json"]: ct = "application/json; charset=utf-8"
                    elif ext in [".png"]: ct = "image/png"
                    elif ext in [".jpg", ".jpeg"]: ct = "image/jpeg"
                    
                    self.send_header("Content-Type", ct)
                    self.end_headers()
                    with open(target_file, "rb") as f:
                        self.wfile.write(f.read())
                    return

        beledci_dir = os.path.join(LiveBeledciHandler.root_dir, "beledci")
        html_path = os.path.join(beledci_dir, "beledci.html")
        if self.path in ["/", "/beledci", "/beledci.html", "/index.html"]:
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            with open(html_path, "rb") as f:
                self.wfile.write(f.read())
            return
        
        # Serve static files relative to root_dir
        rel_path = self.path.lstrip("/")
        target_path = os.path.join(LiveBeledciHandler.root_dir, rel_path)
        if os.path.exists(target_path) and os.path.isfile(target_path):
            self.send_response(200)
            ext = os.path.splitext(target_path)[1].lower()
            ct = "text/plain; charset=utf-8"
            if ext in [".html", ".htm"]: ct = "text/html; charset=utf-8"
            elif ext in [".js"]: ct = "application/javascript; charset=utf-8"
            elif ext in [".css"]: ct = "text/css; charset=utf-8"
            elif ext in [".json"]: ct = "application/json; charset=utf-8"
            self.send_header("Content-Type", ct)
            self.end_headers()
            with open(target_path, "rb") as f:
                self.wfile.write(f.read())
            return
            
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"404 File Not Found")

def start_server(root_dir, port=8090):
    LiveBeledciHandler.root_dir = root_dir
    server_address = ('', port)
    httpd = HTTPServer(server_address, LiveBeledciHandler)
    log_message("INFO", f"CANLI BELEDCI SERVERI ISLEDIR: http://localhost:{port}")
    httpd.serve_forever()

if __name__ == "__main__":
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    generate_files(root_dir)
    
    def self_reload_watcher():
        last_mtime = LAST_SCRIPT_MTIME
        while True:
            try:
                if os.path.exists(SCRIPT_PATH):
                    curr_mtime = os.path.getmtime(SCRIPT_PATH)
                    if last_mtime and curr_mtime != last_mtime:
                        log_message("INFO", "beledci_generator.py yenilendi! Server avtomatik restart olunur...")
                        os.execv(sys.executable, [sys.executable] + sys.argv)
            except Exception as e:
                log_message("WARNING", "Watcher xetasi", e)
            time.sleep(1)

    t_reload = threading.Thread(target=self_reload_watcher, daemon=True)
    t_reload.start()

    def project_files_watcher():
        while True:
            try:
                generate_files(root_dir)
            except Exception as e:
                log_message("WARNING", "Fayl izleyici xetasi", e)
            time.sleep(10)

    t_files = threading.Thread(target=project_files_watcher, daemon=True)
    t_files.start()
    
    start_server(root_dir, port=8090)
