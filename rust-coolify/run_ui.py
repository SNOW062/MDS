import os
import subprocess
import sys
import threading
import time

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except AttributeError:
        pass

BACKEND_PORT = 9000
FRONTEND_PORT = 5173

def kill_existing_processes():
    """Mövcud konteynerləri və lokal prosesləri dayandırır"""
    print("🧹 Köhnə konteynerlər və proseslər dayandırılır...")
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Docker Compose-u dayandırırıq ki, portlar boşalsın (bu Docker Desktop-u söndürmür)
    try:
        subprocess.run(["docker", "compose", "down"], cwd=base_dir, capture_output=True, timeout=15)
    except Exception:
        pass

    # 2. Əgər lokal rc-api (backend) prosesi varsa dayandırırıq
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
    """Subproses çıxışını oxuyub canlı ekrana çap edir"""
    try:
        for line in iter(process.stdout.readline, ''):
            if not line:
                break
            print(f"[{prefix}] {line}", end='', flush=True)
    except Exception as e:
        print(f"[{prefix} ERROR] Log oxunarkən xəta: {e}")

def check_docker_running():
    """Docker-in işlək olub-olmadığını yoxlayır"""
    try:
        result = subprocess.run(["docker", "info"], capture_output=True, text=True, timeout=5)
        return result.returncode == 0
    except Exception:
        return False

def start_docker_desktop():
    """Windows-da Docker Desktop-u işə salmağa cəhd edir"""
    if sys.platform != "win32":
        return False
    print("🐳 Docker Desktop aşkar edilmədi. Arxa fonda başladılır...")
    
    # Standart quraşdırılma yolları
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

def run_dev():
    kill_existing_processes()
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Docker-in mövcudluğunu yoxlayırıq
    is_docker = check_docker_running()
    
    if not is_docker:
        # Əgər sönülüdürsə, açmağa çalışırıq
        is_docker = start_docker_desktop()

    if not is_docker:
        print("\n" + "=" * 65)
        print("❌ XƏTA: Docker daemon (Docker Desktop) işlək vəziyyətdə deyil!")
        print("Sistem yalnız Docker daxilində işləmək üçün konfiqurasiya edilib.")
        print("Zəhmət olmasa Docker Desktop proqramını əl ilə başladın və yenidən yoxlayın.")
        print("=" * 65 + "\n")
        sys.exit(1)

    print("=" * 65)
    print("🚀 MasterDeploy Coolify Docker daxilində başladılır...")
    print(f"🐳 Docker Compose Build & Up (Backend: {BACKEND_PORT}, Frontend: {FRONTEND_PORT})")
    print("=" * 65)

    processes = []

    try:
        # DOCKER MODE
        print("🐳 Docker konteynerləri tikilir və başladılır (bu bir neçə dəqiqə çəkə bilər)...")
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
        print(f"   🦀 Backend  → http://localhost:{BACKEND_PORT}")
        print(f"   ⚡ Frontend → http://localhost:{FRONTEND_PORT}\n")

        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("\n🛑 Skript dayandırılır (Docker konteynerləri arxa fonda işləməyə davam edir)...")
        kill_existing_processes()
        print("👋 Skript dayandırıldı.")

if __name__ == '__main__':
    run_dev()
