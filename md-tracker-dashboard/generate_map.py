import os
import json
import re
from datetime import datetime

COOLIFY_APP_DIR = "e:/MD/coolify-source/app"
COOLIFY_MIG_DIR = "e:/MD/coolify-source/database/migrations"
TRACKER_JSON = "e:/MD/MDS/rust-coolify/MAP_TRACKER.json"

def camel_to_snake(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

# Dərin miqrasiya kateqoriya təyini (system_configs-in öz alt qovluqları daxil olmaqla)
def get_migration_subfolder(filename):
    name = filename.lower()
    
    # 1. Ana Kateqoriyalar
    if any(k in name for k in ["project", "environment"]):
        return "projects"
    elif any(k in name for k in ["database", "postgres", "mysql", "redis", "mongodb", "clickhouse", "mariadb", "dragonfly"]):
        return "databases"
    elif any(k in name for k in ["service", "template"]):
        return "services"
    elif any(k in name for k in ["storage", "s3", "volume", "backup"]):
        return "storage"
        
    # 2. Users and Billing alt kateqoriyası
    if any(k in name for k in ["user", "team", "token", "invitation", "role", "oauth", "stripe", "subscription", "sponsorship"]):
        return "users_and_billing"
        
    # 3. Servers and Infrastructure alt kateqoriyası
    if any(k in name for k in ["server", "private_key", "sentinel", "ssh", "key_db"]):
        return "servers_and_infra"
        
    # 4. Applications kateqoriyası
    if any(k in name for k in ["application", "deploy", "env_var", "redirect", "domain", "fqdn"]):
        return "applications"

    # 5. Qalan 111 'system_configs' faylının daxili parçalanması:
    if any(k in name for k in ["notification", "email", "discord", "telegram", "slack", "pushover", "smtp"]):
        return "system_configs/notifications"
    elif any(k in name for k in ["log", "activity", "index"]):
        return "system_configs/logs"
    elif any(k in name for k in ["security", "encrypt", "allowed", "ip", "readonly", "authorization", "license"]):
        return "system_configs/security"
    elif any(k in name for k in ["cleanup", "cache", "timeout", "frequency", "rollback", "schedule", "past_due"]):
        return "system_configs/deploy_settings"
        
    # Heç birinə uymayanlar general-a gedir
    return "system_configs/general"

def generate_full_mapping():
    files = []
    file_id_counter = 1

    # ==================== BACKEND (RUST) ====================
    # 1. Database Migrations
    if os.path.exists(COOLIFY_MIG_DIR):
        mig_files = sorted([f for f in os.listdir(COOLIFY_MIG_DIR) if f.endswith('.php')])
        for mig in mig_files:
            rust_mig_name = mig.replace('.php', '.sql')
            subfolder = get_migration_subfolder(rust_mig_name)
            
            files.append({
                "id": f"mig_{file_id_counter:03d}",
                "path": f"migrations/{subfolder}/{rust_mig_name}",
                "source": f"database/migrations/{mig}",
                "status": "todo"
            })
            file_id_counter += 1

    # 2. PHP App to Rust Crate Mapping
    for root, dirs, filenames in os.walk(COOLIFY_APP_DIR):
        for filename in filenames:
            if not filename.endswith('.php'):
                continue
                
            full_php_path = os.path.join(root, filename)
            rel_php_path = os.path.relpath(full_php_path, COOLIFY_APP_DIR).replace('\\', '/')
            
            parts = rel_php_path.split('/')
            category = parts[0]
            
            php_basename = os.path.splitext(filename)[0]
            rust_filename = camel_to_snake(php_basename) + ".rs"
            sub_folders = [camel_to_snake(p) for p in parts[1:-1]]
            sub_path = "/".join(sub_folders) if sub_folders else ""
            
            rust_path = ""
            
            if category == "Models":
                rust_path = f"crates/db/src/models/{rust_filename}"
            elif category == "Actions":
                if sub_path:
                    rust_path = f"crates/deployer/src/actions/{sub_path}/{rust_filename}"
                else:
                    rust_path = f"crates/deployer/src/actions/{rust_filename}"
            elif category == "Jobs":
                if sub_path:
                    rust_path = f"crates/scheduler/src/jobs/{sub_path}/{rust_filename}"
                else:
                    rust_path = f"crates/scheduler/src/jobs/{rust_filename}"
            elif category == "Http":
                rust_sub_folders = [camel_to_snake(p) for p in parts[1:-1]]
                if 'controllers' in rust_sub_folders:
                    idx = rust_sub_folders.index('controllers')
                    rust_sub_folders[idx] = 'routes'
                http_sub_path = "/".join(rust_sub_folders)
                rust_path = f"crates/api/src/{http_sub_path}/{rust_filename}"
            elif category == "Notifications":
                if sub_path:
                    rust_path = f"crates/notify/src/channels/{sub_path}/{rust_filename}"
                else:
                    rust_path = f"crates/notify/src/channels/{rust_filename}"
            elif category == "Helpers":
                if sub_path:
                    rust_path = f"crates/core/src/helpers/{sub_path}/{rust_filename}"
                else:
                    rust_path = f"crates/core/src/helpers/{rust_filename}"
            else:
                cat_lower = camel_to_snake(category)
                if sub_path:
                    rust_path = f"crates/core/src/{cat_lower}/{sub_path}/{rust_filename}"
                else:
                    rust_path = f"crates/core/src/{cat_lower}/{rust_filename}"

            files.append({
                "id": f"file_{file_id_counter:04d}",
                "path": rust_path,
                "source": f"app/{rel_php_path}",
                "status": "todo"
            })
            file_id_counter += 1

    # ==================== FRONTEND (REACT) ====================
    ui_id_counter = 1
    ui_pages = [
        "dashboard/DashboardPage.tsx",
        "projects/ProjectsPage.tsx",
        "projects/ProjectDetailPage.tsx",
        "projects/EnvironmentDetailPage.tsx",
        "projects/ApplicationDetailPage.tsx",
        "servers/ServersPage.tsx",
        "servers/ServerDetailPage.tsx",
        "servers/ServerConfigurePage.tsx",
        "databases/DatabasesPage.tsx",
        "databases/DatabaseDetailPage.tsx",
        "services/ServicesPage.tsx",
        "services/ServiceDetailPage.tsx",
        "teams/TeamsPage.tsx",
        "settings/SettingsPage.tsx",
        "storage/StoragePage.tsx",
        "security/SecurityPage.tsx",
        "security/ApiTokensPage.tsx",
        "security/SshKeysPage.tsx"
    ]
    
    for page in ui_pages:
        files.append({
            "id": f"ui_page_{ui_id_counter:03d}",
            "path": f"ui/src/pages/{page}",
            "source": f"resources/views/livewire/{page.replace('Page.tsx', '').lower()}",
            "status": "todo"
        })
        ui_id_counter += 1

    ui_components = [
        "Layout.tsx",
        "Sidebar.tsx",
        "Header.tsx",
        "Navbar.tsx",
        "Terminal.tsx",
        "ActivityMonitor.tsx",
        "EnvironmentVariables.tsx",
        "SslSettings.tsx",
        "BackupSettings.tsx",
        "ServerStatus.tsx"
    ]
    
    for comp in ui_components:
        files.append({
            "id": f"ui_comp_{ui_id_counter:03d}",
            "path": f"ui/src/components/{comp}",
            "source": f"resources/views/components/{comp.replace('.tsx', '').lower()}",
            "status": "todo"
        })
        ui_id_counter += 1

    tracker_data = {
        "project": "MasterDeploy Rust-Coolify",
        "last_updated": datetime.now().isoformat() + "Z",
        "files": files
    }

    with open(TRACKER_JSON, 'w', encoding='utf-8') as f:
        json.dump(tracker_data, f, indent=2)

    print(f"Success! Deep Backend + Frontend + Subcategorized Migrations complete. Total: {len(files)}")

if __name__ == "__main__":
    generate_full_mapping()
