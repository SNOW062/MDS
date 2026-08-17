import os
import subprocess
import sys
import threading
import time
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
import json

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

# Hot-Reload auto-restart nəzarətçisi (run_ui.py, docker-compose.yml, vite.config.ts və Rust kodları üçün)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WATCH_FILES = [
    os.path.join(BASE_DIR, "run_ui.py"),
    os.path.join(BASE_DIR, "docker-compose.yml"),
    os.path.join(BASE_DIR, "ui", "vite.config.ts")
]

def get_max_mtime():
    mtimes = []
    # Qeyd edilmiş faylları yoxla
    for f in WATCH_FILES:
        if os.path.exists(f):
            mtimes.append(os.path.getmtime(f))
            
    # Rust kodlarını (crates/) recursively yoxla
    crates_dir = os.path.join(BASE_DIR, "crates")
    if os.path.exists(crates_dir):
        for root, _, files in os.walk(crates_dir):
            for file in files:
                if file.endswith('.rs') or file == 'Cargo.toml':
                    filepath = os.path.join(root, file)
                    try:
                        mtimes.append(os.path.getmtime(filepath))
                    except Exception:
                        pass
                        
    # Miqrasiyaları yoxla
    migrations_dir = os.path.join(BASE_DIR, "migrations")
    if os.path.exists(migrations_dir):
        for root, _, files in os.walk(migrations_dir):
            for file in files:
                if file.endswith('.sql'):
                    filepath = os.path.join(root, file)
                    try:
                        mtimes.append(os.path.getmtime(filepath))
                    except Exception:
                        pass
                        
    return max(mtimes) if mtimes else 0

INITIAL_MTIME = get_max_mtime()

def auto_reloader():
    global INITIAL_MTIME
    INITIAL_MTIME = get_max_mtime()
        
    while True:
        time.sleep(3) # CPU və disk yoxlamasını azaltmaq üçün 3 saniyə edirik
        try:
            current_mtime = get_max_mtime()
            if current_mtime > INITIAL_MTIME:
                print("⚡ Layihədə kod dəyişikliyi aşkar olundu! Sistem yenidən yığılır (rebuild) və başladılır...")
                INITIAL_MTIME = current_mtime
                # Mövcud docker konteynerlərini dayandırıb yenidən başlayırıq
                kill_existing_processes()
                
                # Windows-da os.execv etibarlı işləmir, subprocess.Popen və sys.exit(0) istifadə edirik
                import subprocess
                subprocess.Popen([sys.executable] + sys.argv)
                sys.exit(0)
        except Exception:
            pass




BACKEND_PORT = 9000
FRONTEND_PORT = 5173
DASHBOARD_PORT = 9001

# Canlı logları və xətaları yadda saxlamaq üçün qlobal listlər
LOG_BUFFER = []
ERROR_BUFFER = []

# Xətaları aşkar etmək üçün naxışlar
ERROR_PATTERNS = [
    re.compile(r"error", re.IGNORECASE),
    re.compile(r"fail", re.IGNORECASE),
    re.compile(r"exception", re.IGNORECASE),
    re.compile(r"xəta", re.IGNORECASE),
    re.compile(r"panic", re.IGNORECASE),
    re.compile(r"warning", re.IGNORECASE)
]

def kill_existing_processes():
    """Mövcud konteynerləri və lokal prosesləri dayandırır"""
    print("🧹 Köhnə konteynerlər və proseslər dayandırılır...")
    base_dir = os.path.dirname(os.path.abspath(__file__))
    try:
        subprocess.run(["docker", "compose", "down"], cwd=base_dir, capture_output=True, timeout=15)
    except Exception:
        pass
    if sys.platform == "win32":
        try:
            subprocess.run(
                ["powershell", "-Command", "Get-Process -Name 'rc-api' -ErrorAction SilentlyContinue | Stop-Process -Force"],
                capture_output=True, timeout=5
            )
        except Exception:
            pass
    time.sleep(1)
    print("✅ Köhnə proseslər dayandırıldı.")

def stream_output(process, prefix):
    """Subproses çıxışını oxuyub canlı ekrana çap edir və toplu şəkildə dashboard-a ötürür"""
    import urllib.request
    import json
    
    url = f"http://localhost:{DASHBOARD_PORT}/api/logs"
    log_queue = []
    
    # Arxa planda logları toplu şəkildə göndərən funksiya
    def log_sender():
        while True:
            time.sleep(0.3) # 300ms gözləyib logları toplu göndəririk
            if log_queue:
                batch = list(log_queue)
                log_queue.clear()
                try:
                    req = urllib.request.Request(
                        url,
                        data=json.dumps({"lines": batch}).encode("utf-8"),
                        headers={"Content-Type": "application/json"}
                    )
                    with urllib.request.urlopen(req, timeout=1) as resp:
                        pass
                except Exception:
                    pass
            # Əgər ana proses dayanıbsa və növbə boşdursa, bu thread-i bitir
            if process.poll() is not None and not log_queue:
                break

    # Göndərici thread-i başladırıq
    t_sender = threading.Thread(target=log_sender, daemon=True)
    t_sender.start()
    
    try:
        for line in iter(process.stdout.readline, ''):
            if not line:
                break
            print(f"[{prefix}] {line}", end='', flush=True)
            log_queue.append(line)
    except Exception as e:
        print(f"[{prefix} ERROR] Log oxunarkən xəta: {e}")



def check_docker_running():
    try:
        result = subprocess.run(["docker", "info"], capture_output=True, text=True, timeout=5)
        return result.returncode == 0
    except Exception:
        return False

def start_docker_desktop():
    if sys.platform != "win32":
        return False
    print("🐳 Docker Desktop aşkar edilmədi. Arxa fonda başladılır...")
    paths = [
        "C:\\Program Files\\Docker\\Docker\\Docker Desktop.exe",
        os.path.expandvars("%PROGRAMFILES%\\Docker\\Docker\\Docker Desktop.exe")
    ]
    started = False
    for path in paths:
        if os.path.exists(path):
            try:
                subprocess.Popen([path], start_new_session=True)
                started = True
                break
            except Exception:
                pass
    if not started:
        return False
    print("⏳ Docker Desktop-un açılması gözlənilir (max 40 saniyə)...")
    for i in range(40):
        time.sleep(2)
        if check_docker_running():
            print("🚀 Docker Desktop uğurla başladıldı!")
            return True
    return False

# ---------------------------------------------------------

def run_dev():
    # Hot-reloader thread-i başladırıq
    t_reload = threading.Thread(target=auto_reloader, daemon=True)
    t_reload.start()

    kill_existing_processes()
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Docker-in mövcudluğunu yoxlayırıq
    is_docker = check_docker_running()
    if not is_docker:
        is_docker = start_docker_desktop()

    if not is_docker:
        print("\n" + "=" * 65)
        print("❌ XƏTA: Docker daemon (Docker Desktop) işlək vəziyyətdə deyil!")
        print("Sistem yalnız Docker daxilində işləmək üçün konfiqurasiya edilib.")
        print("Zəhmət olmasa Docker Desktop proqramını əl ilə başladın və yenidən yoxlayın.")
        print("=" * 65 + "\n")
        sys.exit(1)

    # Dashboard Serverini ayrı proses kimi başladırıq (Hot-Reload üçün)
    print("📊 Dashboard server (Port 9001) başladılır...")
    subprocess.Popen([sys.executable, os.path.join(base_dir, "dashboard_server.py")], start_new_session=True)

    print("=" * 65)
    print("🚀 MasterDeploy Coolify Docker daxilində başladılır...")
    print(f"🐳 Docker Compose Build & Up (Backend: {BACKEND_PORT}, Frontend: {FRONTEND_PORT})")
    print(f"📊 Live Log Tracker & Dashboard port {DASHBOARD_PORT}-də aktivdir!")
    print("=" * 65)

    processes = []
    try:
        docker_proc = subprocess.Popen(
            ['docker', 'compose', 'up', '--build'],
            cwd=base_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding='utf-8',
            errors='replace',
            bufsize=1
        )
        processes.append(('DOCKER', docker_proc))
        t_docker = threading.Thread(target=stream_output, args=(docker_proc, "DOCKER"), daemon=True)
        t_docker.start()


        print(f"\n✅ Sistem başladıldı! (Dayandırmaq üçün Ctrl+C):\n")
        print(f"   🦀 Backend   → http://localhost:{BACKEND_PORT}")
        print(f"   ⚡ Frontend  → http://localhost:{FRONTEND_PORT}")
        print(f"   📊 Dashboard → http://localhost:{DASHBOARD_PORT}\n")

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n🛑 Skript dayandırılır (Docker konteynerləri arxa fonda işləməyə davam edir)...")
        kill_existing_processes()
        print("👋 Skript dayandırıldı.")

if __name__ == '__main__':
    run_dev()

