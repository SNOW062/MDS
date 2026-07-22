import os
import sys
import subprocess
import time

COLOR_RESET = "\033[0m"
COLOR_CYAN = "\033[36m"
COLOR_GREEN = "\033[32m"
COLOR_YELLOW = "\033[33m"
COLOR_RED = "\033[31m"
COLOR_MAGENTA = "\033[35m"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# Watch only source code directories, excluding build output dist
WATCH_DIRS = [
    os.path.join(BASE_DIR, "MD", "crates"),
    os.path.join(BASE_DIR, "MD", "ui", "src"),
]

def print_log(prefix, color, message):
    timestamp = time.strftime("%H:%M:%S")
    print(f"{color}[{timestamp}] [{prefix}]{COLOR_RESET} {message}")

def get_latest_mtime():
    latest = 0
    for wdir in WATCH_DIRS:
        if not os.path.exists(wdir):
            continue
        for root, _, files in os.walk(wdir):
            for file in files:
                if file.endswith(('.rs', '.tsx', '.ts', '.jsx', '.js', '.css', '.html', '.toml', '.json')):
                    filepath = os.path.join(root, file)
                    try:
                        mtime = os.path.getmtime(filepath)
                        if mtime > latest:
                            latest = mtime
                    except Exception:
                        pass
    return latest

def run_docker_build():
    print_log("MD-DOCKER", COLOR_CYAN, "Changes detected! Rebuilding MasterDeploy container...")
    ui_dir = os.path.join(BASE_DIR, "MD", "ui")
    node_modules = os.path.join(ui_dir, "node_modules")
    if os.path.exists(node_modules):
        try:
            subprocess.run("npx vite build", cwd=ui_dir, shell=True, capture_output=True)
        except Exception:
            pass
    cmd = "docker compose up --build -d --force-recreate"
    subprocess.run(cmd, cwd=BASE_DIR, shell=True)

def main():
    print(f"\n{COLOR_MAGENTA}===================================================={COLOR_RESET}")
    print(f"{COLOR_MAGENTA}   🚀 MASTERDEPLOY (MD) AUTO HOT-RELOAD RUNNER     {COLOR_RESET}")
    print(f"{COLOR_MAGENTA}===================================================={COLOR_RESET}\n")

    run_docker_build()
    last_mtime = get_latest_mtime()

    print_log("MD-WATCHER", COLOR_GREEN, "Hot-Reload File Watcher is ACTIVE. Watching for file changes...")

    try:
        while True:
            time.sleep(2.0)
            current_mtime = get_latest_mtime()
            if current_mtime > last_mtime:
                last_mtime = current_mtime
                run_docker_build()
    except KeyboardInterrupt:
        print_log("MD-SYSTEM", COLOR_RED, "\nStopping MasterDeploy Docker services...")
        subprocess.run("docker compose down", cwd=BASE_DIR, shell=True)
        sys.exit(0)

if __name__ == "__main__":
    main()
