import os
import json
import re

MDS_DIR = os.path.dirname(os.path.abspath(__file__))
COOLIFY_DIR = os.path.join(MDS_DIR, "rust-coolify")
TRACKER_JSON = os.path.join(COOLIFY_DIR, "MAP_TRACKER.json")
YARIMCIQ_JSON = os.path.join(COOLIFY_DIR, "yarimciq.json")

def scan_yarimciq_files():
    if not os.path.exists(TRACKER_JSON):
        print("MAP_TRACKER.json tapılmadı!")
        return []

    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        tracker_data = json.load(f)

    yarimciq_list = []

    for file_entry in tracker_data.get("files", []):
        file_id = file_entry.get("id")
        rel_path = file_entry.get("path")
        source_path = file_entry.get("source")
        category = file_entry.get("category", "General")
        
        full_path = os.path.join(COOLIFY_DIR, rel_path)
        
        # Case 1: Fayl ümumiyyətlə yoxdur
        if not os.path.exists(full_path):
            yarimciq_list.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "category": category,
                "status": "missing",
                "reason": "Fayl diski üzərində hələ yaradılmayıb",
                "size_bytes": 0
            })
            continue

        # Case 2: Fayl var, məzmununu oxuyaq
        try:
            content = ""
            for encoding in ['utf-8', 'latin-1', 'cp1254']:
                try:
                    with open(full_path, 'r', encoding=encoding) as f:
                        content = f.read()
                    break
                except UnicodeDecodeError:
                    continue

            # Əgər completed tag-ı varsa, yarımçıq sayılmır
            pattern = rf"(//|--|#)\s*completed\s+{file_id}"
            if re.search(pattern, content, re.IGNORECASE):
                continue

            lines = content.strip().split('\n')
            code_lines = [l for l in lines if l.strip() and not l.strip().startswith("//") and not l.strip().startswith("/*") and not l.strip().startswith("*")]

            # Əgər heç bir real kod xətti yoxdursa və ya yalnız comment/mod daxil edilməsidir
            if len(code_lines) == 0:
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "skelet",
                    "reason": "Fayl daxilində yalnız comment (şərh) var, real kod yoxdur",
                    "size_bytes": len(content)
                })
            elif len(content.strip()) < 120 and all(l.strip().startswith("pub mod") or l.strip().startswith("use ") for l in code_lines):
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "skelet",
                    "reason": "Yalnız import və ya pub mod elanları var, funksional kod yazılmayıb",
                    "size_bytes": len(content)
                })
            elif "todo!(" in content or "unimplemented!(" in content:
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "yarimciq",
                    "reason": "Fayl daxilində tamammalanmamış todo!() və ya unimplemented!() makrosu var",
                    "size_bytes": len(content)
                })
            else:
                # Digər hallarda kod tamlaşdırılmayıb (wip statusu)
                yarimciq_list.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "category": category,
                    "status": "wip",
                    "reason": "Kod yarımçıqdır (completed təsdiq markeri yoxdur)",
                    "size_bytes": len(content)
                })

        except Exception as e:
            yarimciq_list.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "category": category,
                "status": "error",
                "reason": f"Fayl oxunarkən xəta: {str(e)}",
                "size_bytes": 0
            })

    output_data = {
        "total_yarimciq_count": len(yarimciq_list),
        "files": yarimciq_list
    }

    with open(YARIMCIQ_JSON, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)

    print(f"Skan bitdi! Cəmi {len(yarimciq_list)} yarımçıq fayl tapıldı və yarimciq.json faylına yazıldı.")
    return output_data

if __name__ == "__main__":
    scan_yarimciq_files()
