import os
import sys
import json
import re
import time
from datetime import datetime
from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer
import urllib.parse
import threading

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MDS_DIR = os.path.dirname(BASE_DIR)
MD_DIR = os.path.dirname(MDS_DIR)

COOLIFY_DIR = os.path.join(MDS_DIR, "rust-coolify")
COOLIFY_SOURCE_DIR = os.path.join(MD_DIR, "coolify-source")
TRACKER_JSON = os.path.join(COOLIFY_DIR, "MAP_TRACKER.json")
ASSIGNMENTS_JSON = os.path.join(COOLIFY_DIR, "ASSIGNMENTS.json")
YARIMCIQ_JSON = os.path.join(COOLIFY_DIR, "yarimciq.json")
PORT = 2000

def get_yarimciq_data():
    if not os.path.exists(TRACKER_JSON):
        return {"total_count": 0, "files": []}
    
    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        tracker_data = json.load(f)

    yarimciq_list = []
    for file_entry in tracker_data.get("files", []):
        file_id = file_entry.get("id")
        rel_path = file_entry.get("path")
        source_path = file_entry.get("source")
        category = file_entry.get("category", "General")
        full_path = os.path.join(COOLIFY_DIR, rel_path)
        
        # 1. Fayl diskdə yoxdursa -> MISSING (Əskik)
        if not os.path.exists(full_path):
            yarimciq_list.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "category": category,
                "status": "missing",
                "reason": "Fayl diski üzərində ümumiyyətlə yaradılmayıb",
                "size_bytes": 0
            })
            continue

        try:
            content = ""
            for encoding in ['utf-8', 'latin-1', 'cp1254']:
                try:
                    with open(full_path, 'r', encoding=encoding) as f:
                        content = f.read()
                    break
                except UnicodeDecodeError:
                    continue

            # 2. Xüsusi completed rəsmi marker tag-ı varmı?
            pattern = rf"(//|--|#)\s*completed\s+{file_id}"
            has_completed_tag = bool(re.search(pattern, content, re.IGNORECASE))

            lines = [l for l in content.strip().split('\n') if l.strip()]
            code_lines = [l for l in lines if not l.strip().startswith("//") and not l.strip().startswith("/*") and not l.strip().startswith("*")]

            # PHP Mənbə faylının ölçüsü müqayisəsi
            source_size = 0
            if source_path and source_path not in ["app", "Cargo.toml", "README.md"]:
                full_source_path = os.path.join(COOLIFY_SOURCE_DIR, source_path)
                if os.path.exists(full_source_path) and os.path.isfile(full_source_path):
                    source_size = os.path.getsize(full_source_path)

            current_size = len(content.encode('utf-8'))

            # 3. Analiz şərtləri:
            if len(code_lines) == 0:
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "skelet",
                    "reason": "Yalnız kommentlərdən ibarətdir, kod yazılmayıb",
                    "size_bytes": current_size
                })
            elif len(code_lines) < 5 or (current_size < 350 and not has_completed_tag):
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "skelet",
                    "reason": "Fayl kiçik skeletdir (5 sətirdən az və ya 350 baytdan kiçik)",
                    "size_bytes": current_size
                })
            elif "todo!(" in content or "unimplemented!(" in content or "TODO" in content:
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "yarimciq",
                    "reason": "Daxilində yarımçıq todo!() / TODO qeydləri tapıldı",
                    "size_bytes": current_size
                })
            elif source_size > 3000 and current_size < (source_size * 0.15) and not has_completed_tag:
                # PHP koda nisbətən Rust kodu 15%-dən kiçikdir və completed marker yoxdursa
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "yarimciq",
                    "reason": f"PHP orijinalı {round(source_size/1024, 1)} KB-dır, lakin Rust faylı cəmi {round(current_size/1024, 1)} KB (çox funksiya əskikdir)",
                    "size_bytes": current_size
                })
            elif not has_completed_tag:
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "wip",
                    "reason": "Kod yazılıb lakin tamamlanma təsdiq tag-ı (completed) verilməyib",
                    "size_bytes": current_size
                })

        except Exception as e:
            yarimciq_list.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "category": category,
                "status": "error",
                "reason": f"Fayl analizində xəta: {str(e)}",
                "size_bytes": 0
            })

    output_data = {
        "total_count": len(yarimciq_list),
        "files": yarimciq_list
    }
    
    try:
        with open(YARIMCIQ_JSON, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print("yarimciq.json yazılarkən xəta:", e)

    return output_data

def get_file_deep_spec(file_id):
    if not os.path.exists(TRACKER_JSON):
        return {}
    
    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        tracker = json.load(f)

    entry = next((f for f in tracker.get("files", []) if f["id"] == file_id), None)
    if not entry:
        return {}

    rust_rel = entry.get("path")
    php_rel = entry.get("source")

    abs_php = os.path.join(COOLIFY_SOURCE_DIR, php_rel) if php_rel else None
    abs_rust = os.path.join(COOLIFY_DIR, rust_rel) if rust_rel else None

    # PHP-dən funksiyaları və dəyişənləri oxu
    php_funcs = []
    php_props = []
    if abs_php and os.path.exists(abs_php) and not os.path.isdir(abs_php):
        try:
            with open(abs_php, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            php_funcs = list(set(re.findall(r'(?:public|protected|private|static)\s+function\s+([a-zA-Z0-9_]+)\s*\(', content)))
            php_props = list(set(re.findall(r'(?:public|protected|private)\s+(?:\?[a-zA-Z0-9_]+\s+)?\$([a-zA-Z0-9_]+)', content)))
        except:
            pass

    # Rust/TS-dən funksiyaları və struct-ları oxu
    rust_funcs = []
    rust_structs = []
    if abs_rust and os.path.exists(abs_rust) and not os.path.isdir(abs_rust):
        try:
            with open(abs_rust, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
            rust_funcs = list(set(re.findall(r'fn\s+([a-zA-Z0-9_]+)\s*[\(<]', content)))
            rust_structs = list(set(re.findall(r'struct\s+([a-zA-Z0-9_]+)', content)))
        except:
            pass

    completed_funcs = []
    missing_funcs = []

    for pf in php_funcs:
        snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', pf).lower()
        if pf.lower() in [rf.lower() for rf in rust_funcs] or snake_name in [rf.lower() for rf in rust_funcs]:
            completed_funcs.append(pf)
        else:
            missing_funcs.append(pf)

    total_funcs = len(php_funcs)
    done_funcs = len(completed_funcs)
    pct = round((done_funcs / total_funcs * 100), 1) if total_funcs > 0 else 100.0

    return {
        "file_id": file_id,
        "rust_path": rust_rel,
        "php_path": php_rel,
        "php_properties": php_props,
        "php_functions_total": total_funcs,
        "completed_functions": completed_funcs,
        "missing_functions": missing_funcs,
        "rust_existing_functions": rust_funcs,
        "rust_structs": rust_structs,
        "completion_percentage": pct
    }


STATIC_DIR = os.path.join(BASE_DIR, "static")
WATCHED_FILES = [
    os.path.join(BASE_DIR, "server.py"),
    os.path.join(STATIC_DIR, "app.js"),
    os.path.join(STATIC_DIR, "style.css"),
    os.path.join(STATIC_DIR, "index.html")
]

def check_file_status(relative_path, file_id):
    full_path = os.path.join(COOLIFY_DIR, relative_path)
    if not os.path.exists(full_path):
        return "missing"
    
    try:
        for encoding in ['utf-8', 'latin-1', 'cp1254']:
            try:
                with open(full_path, 'r', encoding=encoding) as f:
                    content = f.read()
                    pattern = rf"(//|--|#)\s*completed\s+{file_id}"
                    if re.search(pattern, content, re.IGNORECASE):
                        return "completed"
                    if len(content.strip()) > 50:
                        return "wip"
                break
            except UnicodeDecodeError:
                continue
    except:
        pass
    return "todo"

def get_tracker_data():
    if not os.path.exists(TRACKER_JSON):
        return {"files": []}
    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)
    for file_entry in data["files"]:
        file_entry["status"] = check_file_status(file_entry["path"], file_entry["id"])
    return data

def load_assignments():
    if os.path.exists(ASSIGNMENTS_JSON):
        with open(ASSIGNMENTS_JSON, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"assignments": []}

def save_assignments(data):
    with open(ASSIGNMENTS_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

def generate_source_viewer_html(file_id, rust_path, php_path, php_content, rust_content):
    escaped_php = html_escape(php_content)
    escaped_rust = html_escape(rust_content) if rust_content is not None else "-- Fayl hele yaradılmayıb. Ustdedi yolu kopyalayaraq faylı yarada bilersiniz. --"
    
    abs_php_path = os.path.normpath(os.path.join(COOLIFY_SOURCE_DIR, php_path))
    abs_rust_path = os.path.normpath(os.path.join(COOLIFY_DIR, rust_path))
    
    php_filename = os.path.basename(php_path)
    rust_filename = os.path.basename(rust_path)
    
    return f"""
    <!DOCTYPE html>
    <html lang="az">
    <head>
        <meta charset="UTF-8">
        <title>Kod Muqayisesi: {file_id}</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
        <style>
            body {{
                background: #07080d;
                color: #f1f3f9;
                font-family: 'Outfit', sans-serif;
                margin: 0;
                padding: 20px;
                height: 100vh;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }}
            .header-info {{
                background: rgba(13, 16, 27, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 15px 20px;
                margin-bottom: 15px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                backdrop-filter: blur(20px);
            }}
            .badge-id {{
                background: #e59c0d;
                color: #000;
                padding: 4px 10px;
                border-radius: 6px;
                font-weight: 800;
                font-size: 14px;
            }}
            .split-container {{
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
                flex-grow: 1;
                overflow: hidden;
            }}
            .code-panel {{
                background: rgba(13, 16, 27, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.05);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
                backdrop-filter: blur(20px);
            }}
            .panel-header {{
                padding: 12px 18px;
                background: rgba(255, 255, 255, 0.02);
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 10px;
            }}
            .panel-title-wrap {{
                display: flex;
                flex-direction: column;
                gap: 3px;
                min-width: 0;
                flex: 1;
            }}
            .panel-title {{
                font-weight: 600;
                font-size: 14px;
                color: #a5b4fc;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }}
            .panel-path {{
                font-size: 10px;
                font-family: 'JetBrains Mono', 'Consolas', monospace;
                color: #7e8494;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                letter-spacing: 0.02em;
                opacity: 0.85;
            }}
            .action-btn {{
                padding: 6px 12px;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.1);
                color: #fff;
                border-radius: 6px;
                cursor: pointer;
                font-size: 11px;
                font-weight: 600;
                transition: all 0.2s;
            }}
            .action-btn:hover {{
                background: rgba(255,255,255,0.1);
                border-color: rgba(255,255,255,0.2);
            }}
            .btn-success {{
                background: rgba(16, 185, 129, 0.1);
                border-color: rgba(16, 185, 129, 0.3);
                color: #10b981;
            }}
            .btn-success:hover {{
                background: rgba(16, 185, 129, 0.2);
            }}
            pre {{
                margin: 0;
                padding: 20px;
                font-family: 'Fira Code', monospace;
                font-size: 13px;
                line-height: 1.5;
                overflow: auto;
                flex-grow: 1;
                background: #000;
            }}
            .btn-group {{
                display: flex;
                gap: 8px;
            }}
        </style>
        <script>
            function copyToClipboard(text, btnId) {{
                navigator.clipboard.writeText(text).then(() => {{
                    const btn = document.getElementById(btnId);
                    const origText = btn.innerText;
                    btn.innerText = "Kopyalandi!";
                    setTimeout(() => btn.innerText = origText, 1500);
                }});
            }}
        </script>
    </head>
    <body>
        <div class="header-info">
            <div style="display:flex; align-items:center; gap:15px;">
                <span class="badge-id">{file_id}</span>
                <div style="font-size: 14px; font-weight: 600;">Menbe ve Hedef Kodunun Muqayisesi</div>
            </div>
            <div style="font-size: 12px; color:#7e8494;">Vahid Kod Inteqrasiya Paneli</div>
        </div>

        <div class="split-container">
            <div class="code-panel">
                <div class="panel-header">
                    <div class="panel-title-wrap">
                        <span class="panel-title" title="{abs_php_path}">PHP: {php_filename}</span>
                        <span class="panel-path">{abs_php_path}</span>
                    </div>
                    <div class="btn-group">
                        <button class="action-btn" id="btn-php-path" onclick="copyToClipboard('{abs_php_path.replace('\\\\', '\\\\')}', 'btn-php-path')">Fayl Yolunu Kopyala</button>
                        <button class="action-btn btn-success" id="btn-php-code" onclick="copyToClipboard(document.getElementById('php-code-raw').innerText, 'btn-php-code')">Kodu Kopyala</button>
                    </div>
                </div>
                <pre><code id="php-code-raw">{escaped_php}</code></pre>
            </div>

            <div class="code-panel">
                <div class="panel-header">
                    <div class="panel-title-wrap">
                        <span class="panel-title" style="color: #60a5fa;" title="{abs_rust_path}">Rust: {rust_filename}</span>
                        <span class="panel-path" style="color: #93c5fd;">{abs_rust_path}</span>
                    </div>
                    <div class="btn-group">
                        <button class="action-btn" id="btn-rust-path" onclick="copyToClipboard('{abs_rust_path.replace('\\\\', '\\\\')}', 'btn-rust-path')">Fayl Yolunu Kopyala</button>
                        <button class="action-btn btn-success" id="btn-rust-code" onclick="copyToClipboard(document.getElementById('rust-code-raw').innerText, 'btn-rust-code')">Kodu Kopyala</button>
                    </div>
                </div>
                <pre><code id="rust-code-raw">{escaped_rust}</code></pre>
            </div>
        </div>
    </body>
    </html>
    """

def html_escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;").replace("'", "&#x27;")

class DashboardHTTPHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed_url = urllib.parse.urlparse(path)
        clean_path = parsed_url.path
        if clean_path == "/" or clean_path == "":
            return os.path.join(STATIC_DIR, "index.html")
        return os.path.join(STATIC_DIR, clean_path.lstrip("/"))

    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        clean_path = parsed_url.path
        if clean_path.endswith(".js"):
            full_path = self.translate_path(self.path)
            if os.path.exists(full_path):
                self.send_response(200)
                self.send_header("Content-Type", "application/javascript; charset=utf-8")
                self.end_headers()
                with open(full_path, 'rb') as f:
                    self.wfile.write(f.read())
                return
        elif clean_path.endswith(".css"):
            full_path = self.translate_path(self.path)
            if os.path.exists(full_path):
                self.send_response(200)
                self.send_header("Content-Type", "text/css; charset=utf-8")
                self.end_headers()
                with open(full_path, 'rb') as f:
                    self.wfile.write(f.read())
                return

        if parsed_url.path == "/api/source-data":
            query = urllib.parse.parse_qs(parsed_url.query)
            file_id = query.get("id", [None])[0]
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            response = {"success": False}
            if file_id:
                tracker_data = get_tracker_data()
                file_entry = next((f for f in tracker_data["files"] if f["id"] == file_id), None)
                if file_entry:
                    full_php_path = os.path.join(COOLIFY_SOURCE_DIR, file_entry["source"])
                    full_rust_path = os.path.join(COOLIFY_DIR, file_entry["path"])
                    
                    php_content = ""
                    if os.path.exists(full_php_path) and not os.path.isdir(full_php_path):
                        for encoding in ['utf-8', 'latin-1', 'cp1254']:
                            try:
                                with open(full_php_path, 'r', encoding=encoding) as f:
                                    php_content = f.read()
                                break
                            except UnicodeDecodeError:
                                continue
                    else:
                        php_content = "-- PHP Menbe faylı tapılmadı --"
                        
                    rust_content = ""
                    if os.path.exists(full_rust_path) and not os.path.isdir(full_rust_path):
                        for encoding in ['utf-8', 'latin-1', 'cp1254']:
                            try:
                                with open(full_rust_path, 'r', encoding=encoding) as f:
                                    rust_content = f.read()
                                break
                            except UnicodeDecodeError:
                                continue
                    else:
                        rust_content = "-- Rust / Frontend faylı hələ yaradılmayıb. --"
                        
                    response = {
                        "success": True,
                        "file_id": file_id,
                        "php_filename": os.path.basename(file_entry["source"]),
                        "rust_filename": os.path.basename(file_entry["path"]),
                        "abs_php_path": os.path.normpath(full_php_path),
                        "abs_rust_path": os.path.normpath(full_rust_path),
                        "php_content": php_content,
                        "rust_content": rust_content
                    }
            self.wfile.write(json.dumps(response).encode("utf-8"))
            return

        elif parsed_url.path == "/api/file-spec":
            query = urllib.parse.parse_qs(parsed_url.query)
            file_id = query.get("id", [None])[0]
            if file_id:
                spec = get_file_deep_spec(file_id)
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps(spec, ensure_ascii=False).encode("utf-8"))
            else:
                self.send_error(400, "Missing file id")
            return

        elif parsed_url.path == "/api/yarimciq":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            data = get_yarimciq_data()
            self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))
            return

        elif parsed_url.path == "/api/data":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            tracker_data = get_tracker_data()
            assignments = load_assignments()
            
            # ✅ AUTO-CLEANUP: Tamamlanmış işləri assignment-dən avtomatik sil
            status_map = {f["id"]: f["status"] for f in tracker_data["files"]}
            changed = False
            for agent in assignments["assignments"]:
                before = len(agent["file_ids"])
                agent["file_ids"] = [fid for fid in agent["file_ids"] if status_map.get(fid) != "completed"]
                if len(agent["file_ids"]) < before:
                    changed = True
            if changed:
                save_assignments(assignments)
            
            # Faylların ölçülərini dinamik hesablayaq
            updated_files = []
            for f in tracker_data["files"]:
                f_copy = dict(f)
                size_kb = 0
                source_path = f.get("source")
                if source_path and source_path not in ["app", "Cargo.toml", "README.md"]:
                    full_path = os.path.join(COOLIFY_SOURCE_DIR, source_path)
                    if os.path.exists(full_path) and os.path.isfile(full_path):
                        size_bytes = os.path.getsize(full_path)
                        size_kb = round(size_bytes / 1024, 1)
                f_copy["size_kb"] = size_kb
                updated_files.append(f_copy)
            
            completed_count = sum(1 for f in updated_files if f["status"] == "completed")
            total_count = len(updated_files)
            percentage = round((completed_count / total_count) * 100, 1) if total_count > 0 else 0
            
            response = {
                "project": tracker_data.get("project", "MasterDeploy"),
                "files": updated_files,
                "completed_count": completed_count,
                "total_count": total_count,
                "percentage": percentage,
                "assignments": assignments["assignments"]
            }
            self.wfile.write(json.dumps(response).encode("utf-8"))

            
        elif parsed_url.path == "/api/view-source":
            query = urllib.parse.parse_qs(parsed_url.query)
            file_id = query.get("id", [None])[0]
            
            if file_id:
                tracker_data = get_tracker_data()
                file_entry = next((f for f in tracker_data["files"] if f["id"] == file_id), None)
                
                if file_entry:
                    full_php_path = os.path.join(COOLIFY_SOURCE_DIR, file_entry["source"])
                    full_rust_path = os.path.join(COOLIFY_DIR, file_entry["path"])
                    
                    php_content = ""
                    if os.path.exists(full_php_path) and not os.path.isdir(full_php_path):
                        for encoding in ['utf-8', 'latin-1', 'cp1254']:
                            try:
                                with open(full_php_path, 'r', encoding=encoding) as f:
                                    php_content = f.read()
                                break
                            except UnicodeDecodeError:
                                continue
                    else:
                        php_content = "-- PHP Menbe faylı tapılmadı --"
                        
                    rust_content = None
                    if os.path.exists(full_rust_path) and not os.path.isdir(full_rust_path):
                        for encoding in ['utf-8', 'latin-1', 'cp1254']:
                            try:
                                with open(full_rust_path, 'r', encoding=encoding) as f:
                                    rust_content = f.read()
                                break
                            except UnicodeDecodeError:
                                continue
                                
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.end_headers()
                    
                    html = generate_source_viewer_html(
                        file_id=file_entry["id"],
                        rust_path=file_entry["path"],
                        php_path=file_entry["source"],
                        php_content=php_content,
                        rust_content=rust_content
                    )
                    self.wfile.write(html.encode("utf-8"))
                else:
                    self.send_error(404, "File tracking ID not found")
            else:
                self.send_error(400, "Missing id parameter")
        else:
            super().do_GET()

    def do_POST(self):
        # BATCH (TOPLU) ASSIGNMENT DƏSTƏYİ (İndi massiv qəbul edə bilir!)
        if self.path == "/api/assign":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            payload = json.loads(post_data.decode('utf-8'))
            
            agent_name = "ActiveAgent"
            file_ids = payload.get("file_ids", []) # Massiv formatında gəlir
            action = payload.get("action")
            
            if file_ids and action:
                assignments = load_assignments()
                
                existing = next((a for a in assignments["assignments"] if a["agent_name"] == agent_name), None)
                if not existing:
                    existing = {
                        "agent_name": agent_name,
                        "file_ids": [],
                        "assigned_at": datetime.now().isoformat()
                    }
                    assignments["assignments"].append(existing)
                
                # Massiv üzrə toplu əlavə etmə / silmə
                if action == "add":
                    for fid in file_ids:
                        if fid not in existing["file_ids"]:
                            existing["file_ids"].append(fid)
                elif action == "remove":
                    for fid in file_ids:
                        if fid in existing["file_ids"]:
                            existing["file_ids"].remove(fid)
                        
                existing["assigned_at"] = datetime.now().isoformat()
                save_assignments(assignments)
                
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "success", "file_ids": existing["file_ids"]}).encode("utf-8"))
            else:
                self.send_response(400)
                self.end_headers()

# Hot-Reload auto-restart nəzarətçisi
def auto_reloader():
    mtimes = {}
    for f in WATCHED_FILES:
        if os.path.exists(f):
            mtimes[f] = os.path.getmtime(f)

    while True:
        time.sleep(1)
        for f in WATCHED_FILES:
            if os.path.exists(f):
                current_mtime = os.path.getmtime(f)
                if f not in mtimes:
                    mtimes[f] = current_mtime
                elif current_mtime > mtimes[f]:
                    print(f"⚡ {os.path.basename(f)} deyisdi! Server yeniden basladilir...")
                    os.execv(sys.executable, [sys.executable] + sys.argv)

def run_http_server():
    TCPServer.allow_reuse_address = True
    try:
        with TCPServer(("", PORT), DashboardHTTPHandler) as httpd:
            print(f"🚀 Dashboard Server port {PORT}-de aktivdir!")
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == "__main__":
    reload_thread = threading.Thread(target=auto_reloader, daemon=True)
    reload_thread.start()
    run_http_server()
