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

def print_log(prefix, color, message):
    timestamp = time.strftime("%H:%M:%S")
    print(f"{color}[{timestamp}] [{prefix}]{COLOR_RESET} {message}")

def run_docker():
    print_log("MD-DOCKER", COLOR_CYAN, "Building and launching MasterDeploy inside Docker Container...")
    cmd = "docker compose up --build"
    process = subprocess.Popen(
        cmd,
        cwd=BASE_DIR,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding='utf-8',
        errors='replace'
    )
    for line in iter(process.stdout.readline, ''):
        if line:
            print_log("MD-CONTAINER", COLOR_GREEN, line.strip())
    return process

def main():
    print(f"\n{COLOR_MAGENTA}===================================================={COLOR_RESET}")
    print(f"{COLOR_MAGENTA}   🚀 MASTERDEPLOY (MD) DOCKER RUNNER & LAUNCHER   {COLOR_RESET}")
    print(f"{COLOR_MAGENTA}===================================================={COLOR_RESET}\n")

    try:
        run_docker()
    except KeyboardInterrupt:
        print_log("MD-SYSTEM", COLOR_RED, "\nStopping MasterDeploy Docker services...")
        subprocess.run("docker compose down", cwd=BASE_DIR, shell=True)
        sys.exit(0)

if __name__ == "__main__":
    main()
