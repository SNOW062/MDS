import os
import json
import re

MDS_DIR = r"e:\MD\MDS"
COOLIFY_DIR = os.path.join(MDS_DIR, "rust-coolify")
COOLIFY_SOURCE_DIR = r"e:\MD\coolify-source"
TRACKER_JSON = os.path.join(COOLIFY_DIR, "MAP_TRACKER.json")

def find_uncompleted_files():
    if not os.path.exists(TRACKER_JSON):
        print("MAP_TRACKER.json tapılmadı!")
        return []

    with open(TRACKER_JSON, 'r', encoding='utf-8') as f:
        tracker = json.load(f)

    incomplete = []
    for entry in tracker.get("files", []):
        file_id = entry.get("id")
        rel_path = entry.get("path")
        source_path = entry.get("source")

        if not rel_path:
            continue

        abs_rust = os.path.join(COOLIFY_DIR, rel_path)
        if not os.path.exists(abs_rust):
            incomplete.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "reason": "Fayl yaradılmayıb"
            })
            continue

        try:
            with open(abs_rust, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()

            pattern = rf"(//|--|#)\s*completed\s+{file_id}"
            if not re.search(pattern, content, re.IGNORECASE) and f"completed {file_id}" not in content:
                incomplete.append({
                    "id": file_id,
                    "path": rel_path,
                    "source": source_path,
                    "reason": "Completed markeri əskikdir"
                })
        except Exception as e:
            incomplete.append({
                "id": file_id,
                "path": rel_path,
                "source": source_path,
                "reason": f"Skan xətası: {e}"
            })

    return incomplete

if __name__ == "__main__":
    uncompleted = find_uncompleted_files()
    print(f"Cəmi tamamlanmayan/markerlənməyən fayl sayı: {len(uncompleted)}")
    for item in uncompleted[:15]:
        print(f"- ID: {item['id']} | Rust: {item['path']} | PHP: {item['source']} | Səbəb: {item['reason']}")
