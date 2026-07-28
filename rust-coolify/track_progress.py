import os
import json
import re
from datetime import datetime

base_dir = "e:/MD/MDS/rust-coolify"
tracker_path = os.path.join(base_dir, "MAP_TRACKER.json")
output_report_path = os.path.join(base_dir, "TRACKER_REPORT.md")

def check_file_status(relative_path, file_id):
    full_path = os.path.join(base_dir, relative_path)
    if not os.path.exists(full_path):
        return "missing"
    
    try:
        # Fərqli kodlaşdırmaları (utf-8, latin-1, cp1254) sınayırıq ki, heç bir faylda error verməsin.
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
    except Exception as e:
        print(f"Error reading {relative_path}: {e}")
        
    return "todo"

def main():
    if not os.path.exists(tracker_path):
        print("MAP_TRACKER.json not found!")
        return

    with open(tracker_path, 'r', encoding='utf-8') as f:
        tracker = json.load(f)

    changed = False
    completed_count = 0
    total_count = len(tracker["files"])

    for file_entry in tracker["files"]:
        old_status = file_entry.get("status", "todo")
        new_status = check_file_status(file_entry["path"], file_entry["id"])
        
        if new_status == "completed":
            completed_count += 1

        if old_status != new_status:
            file_entry["status"] = new_status
            changed = True

    if changed:
        tracker["last_updated"] = datetime.now().isoformat() + "Z"
        with open(tracker_path, 'w', encoding='utf-8') as f:
            json.dump(tracker, f, indent=2)
        print("MAP_TRACKER.json updated successfully!")

    # Markdown hesabat faylı yaradılması
    percentage = (completed_count / total_count) * 100 if total_count > 0 else 0
    
    report_lines = [
        "# 📊 Proyektin İzlənmə Hesabatı (TRACKER_REPORT.md)",
        f"\n**Son Yenilənmə:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
        f"\n**Ümumi Tərəqqi:** {completed_count}/{total_count} fayl ({percentage:.1f}%)\n",
        "| ID | Fayl Yolu | Status | Göstərici |",
        "|----|-----------|--------|-----------|"
    ]

    for file_entry in tracker["files"]:
        status = file_entry["status"]
        badge = "🔴 Todo"
        if status == "completed":
            badge = "🟢 Completed"
        elif status == "wip":
            badge = "🟡 In Progress"
        elif status == "missing":
            badge = "❌ File Missing"

        report_lines.append(f"| `{file_entry['id']}` | `{file_entry['path']}` | {status.upper()} | {badge} |")

    with open(output_report_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(report_lines))

    print(f"TRACKER_REPORT.md created. Completion: {percentage:.1f}%")

if __name__ == "__main__":
    main()
