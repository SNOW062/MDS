import os
import json
import re

MDS_DIR = os.path.dirname(os.path.abspath(__file__))
COOLIFY_DIR = os.path.join(MDS_DIR, "rust-coolify")
COOLIFY_SOURCE_DIR = os.path.dirname(MDS_DIR)  # e:\MD\coolify-source olacaq
COOLIFY_SOURCE = os.path.join(COOLIFY_SOURCE_DIR, "coolify-source")

TRACKER_JSON = os.path.join(COOLIFY_DIR, "MAP_TRACKER.json")
DEEP_SPECS_JSON = os.path.join(COOLIFY_DIR, "deep_specs.json")

def parse_php_file(php_path):
    if not os.path.exists(php_path) or os.path.isdir(php_path):
        return {"functions": [], "properties": [], "enums": []}

    try:
        with open(php_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Metod və Funksiyaları tapırıq (public/protected/private function name(...))
        func_matches = re.findall(r'(?:public|protected|private|static)\s+function\s+([a-zA-Z0-9_]+)\s*\(', content)
        
        # Property və Sahələri tapırıq (public $name, protected $table, etc.)
        prop_matches = re.findall(r'(?:public|protected|private)\s+(?:\?[a-zA-Z0-9_]+\s+)?\$([a-zA-Z0-9_]+)', content)
        
        # Enum və Constant-ları tapırıq (const NAME = ...)
        const_matches = re.findall(r'const\s+([a-zA-Z0-9_]+)\s*=', content)

        return {
            "functions": list(set(func_matches)),
            "properties": list(set(prop_matches)),
            "constants": list(set(const_matches))
        }
    except Exception as e:
        return {"functions": [], "properties": [], "constants": [], "error": str(e)}

def parse_rust_file(rust_path):
    if not os.path.exists(rust_path) or os.path.isdir(rust_path):
        return {"functions": [], "structs": [], "completed_methods": []}

    try:
        with open(rust_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        # Rust funksiyaları: fn name(...)
        func_matches = re.findall(r'fn\s+([a-zA-Z0-9_]+)\s*[\(<]', content)
        
        # Rust struct-ları: struct Name
        struct_matches = re.findall(r'struct\s+([a-zA-Z0-9_]+)', content)
        
        # Rust enum-ları: enum Name
        enum_matches = re.findall(r'enum\s+([a-zA-Z0-9_]+)', content)

        return {
            "functions": list(set(func_matches)),
            "structs": list(set(struct_matches)),
            "enums": list(set(enum_matches)),
            "raw_content": content
        }
    except Exception as e:
        return {"functions": [], "structs": [], "enums": [], "raw_content": ""}

def generate_deep_analysis():
    if not os.path.exists(TRACKER_JSON):
        print("MAP_TRACKER.json tapılmadı!")
        return {}

    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        tracker = json.load(f)

    file_specs = {}

    for entry in tracker.get("files", []):
        file_id = entry.get("id")
        rust_rel = entry.get("path")
        php_rel = entry.get("source")

        abs_php = os.path.join(COOLIFY_SOURCE, php_rel) if php_rel else None
        abs_rust = os.path.join(COOLIFY_DIR, rust_rel) if rust_rel else None

        php_spec = parse_php_file(abs_php) if abs_php else {"functions": [], "properties": [], "constants": []}
        rust_spec = parse_rust_file(abs_rust) if abs_rust else {"functions": [], "structs": [], "enums": [], "raw_content": ""}

        # Funksiyaların müqayisəsi (PHP-də neçə var, Rust-da neçəsi yazılıb)
        required_funcs = php_spec["functions"]
        existing_rust_funcs = rust_spec["functions"]

        completed_funcs = []
        missing_funcs = []

        # Snake_case vs camelCase uyğunlaşdırma yoxlanışı
        for rf in required_funcs:
            # PHP camelCase (eg. getIsReachable) -> Rust snake_case (eg. get_is_reachable)
            snake_name = re.sub(r'(?<!^)(?=[A-Z])', '_', rf).lower()
            if rf.lower() in [fn.lower() for fn in existing_rust_funcs] or snake_name in [fn.lower() for fn in existing_rust_funcs]:
                completed_funcs.append(rf)
            else:
                missing_funcs.append(rf)

        total_req = len(required_funcs)
        done_req = len(completed_funcs)
        pct = round((done_req / total_req * 100), 1) if total_req > 0 else (100.0 if os.path.exists(abs_rust or "") else 0.0)

        file_specs[file_id] = {
            "id": file_id,
            "rust_path": rust_rel,
            "php_path": php_rel,
            "php_properties_count": len(php_spec["properties"]),
            "php_functions_count": total_req,
            "rust_functions_count": len(existing_rust_funcs),
            "completed_functions": completed_funcs,
            "missing_functions": missing_funcs,
            "completeness_percentage": pct,
            "is_fully_completed": (len(missing_funcs) == 0 and total_req > 0)
        }

    with open(DEEP_SPECS_JSON, 'w', encoding='utf-8') as f:
        json.dump(file_specs, f, indent=2, ensure_ascii=False)

    print(f"Bütün {len(file_specs)} fayl üçün metrik və funksional spesifikasiya yaradıldı -> deep_specs.json")
    return file_specs

if __name__ == "__main__":
    generate_deep_analysis()
