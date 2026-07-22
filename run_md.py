import os
import sys
import subprocess
import time
import threading

# ANSI Colors for Terminal Logs
COLOR_RESET = "\033[0m"
COLOR_CYAN = "\033[36m"
COLOR_GREEN = "\033[32m"
COLOR_YELLOW = "\033[33m"
COLOR_RED = "\033[31m"
COLOR_MAGENTA = "\033[35m"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
RUST_DIR = os.path.join(BASE_DIR, "coolify-rust")
UI_DIR = os.path.join(RUST_DIR, "ui")
API_DIR = os.path.join(RUST_DIR, "crates", "api")

def print_log(prefix, color, message):
    timestamp = time.strftime("%H:%M:%S")
    print(f"{color}[{timestamp}] [{prefix}]{COLOR_RESET} {message}")

def stream_logs(process, prefix, color):
    for line in iter(process.stdout.readline, ''):
        if line:
            print_log(prefix, color, line.strip())

def run_frontend():
    print_log("MD-UI", COLOR_CYAN, f"Starting Vite Frontend Dev Server in {UI_DIR}...")
    cmd = "npm run dev"
    process = subprocess.Popen(
        cmd,
        cwd=UI_DIR,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding='utf-8',
        errors='replace'
    )
    t = threading.Thread(target=stream_logs, args=(process, "MD-FRONTEND", COLOR_CYAN), daemon=True)
    t.start()
    return process

def run_backend():
    print_log("MD-API", COLOR_GREEN, f"Starting Rust API Backend in {API_DIR}...")
    # Cargo check / run with cargo watch if installed, fallback to cargo run
    cmd = "cargo run"
    process = subprocess.Popen(
        cmd,
        cwd=API_DIR,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding='utf-8',
        errors='replace'
    )
    t = threading.Thread(target=stream_logs, args=(process, "MD-BACKEND", COLOR_GREEN), daemon=True)
    t.start()
    return process

def main():
    print(f"\n{COLOR_MAGENTA}===================================================={COLOR_RESET}")
    print(f"{COLOR_MAGENTA}     🚀 MASTERDEPLOY (MD) HOT-RELOAD RUNNER       {COLOR_RESET}")
    print(f"{COLOR_MAGENTA}===================================================={COLOR_RESET}\n")

    frontend_proc = run_frontend()
    backend_proc = run_backend()

    print_log("MD-SYSTEM", COLOR_YELLOW, "All MD services initialized! Press Ctrl+C to stop.\n")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print_log("MD-SYSTEM", COLOR_RED, "\nStopping MD services...")
        try:
            frontend_proc.terminate()
            backend_proc.terminate()
        except Exception:
            pass
        sys.exit(0)

if __name__ == "__main__":
    main()
