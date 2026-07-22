import os
import sys
import subprocess
import time

COLOR_RESET = "\033[0m"
COLOR_GREEN = "\033[32m"
COLOR_CYAN = "\033[36m"
COLOR_YELLOW = "\033[33m"
COLOR_RED = "\033[31m"

REPO_URL = "https://github.com/SNOW062/MDS.git"
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

def run_cmd(cmd, cwd=BASE_DIR):
    print(f"{COLOR_CYAN}Executing: {cmd}{COLOR_RESET}")
    result = subprocess.run(cmd, cwd=cwd, shell=True, text=True, capture_output=True)
    if result.stdout:
        print(result.stdout.strip())
    if result.stderr:
        print(f"{COLOR_YELLOW}{result.stderr.strip()}{COLOR_RESET}")
    return result.returncode == 0

def main():
    print(f"\n{COLOR_GREEN}============================================{COLOR_RESET}")
    print(f"{COLOR_GREEN}      🚀 MASTERDEPLOY (MD) GIT PUSHER       {COLOR_RESET}")
    print(f"{COLOR_GREEN}============================================{COLOR_RESET}\n")

    # 1. Check/Init Git
    if not os.path.exists(os.path.join(BASE_DIR, ".git")):
        print(f"{COLOR_YELLOW}Initializing Git repository...{COLOR_RESET}")
        run_cmd("git init")

    # 2. Configure Remote
    run_cmd("git remote remove origin")
    run_cmd(f"git remote add origin {REPO_URL}")
    run_cmd("git branch -M main")

    # 3. Git Add
    print(f"\n{COLOR_CYAN}Adding all files to git staging...{COLOR_RESET}")
    run_cmd("git add .")

    # 4. Commit Message
    if len(sys.argv) > 1:
        commit_msg = " ".join(sys.argv[1:])
    else:
        timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
        commit_msg = f"Auto-update MasterDeploy codebase: {timestamp}"

    print(f"\n{COLOR_CYAN}Creating git commit: '{commit_msg}'...{COLOR_RESET}")
    run_cmd(f'git commit -m "{commit_msg}"')

    # 5. Git Push
    print(f"\n{COLOR_GREEN}Pushing codebase to {REPO_URL} (main)...{COLOR_RESET}")
    success = run_cmd("git push -u origin main")

    if success:
        print(f"\n{COLOR_GREEN}✅ SUCCESS: Codebase pushed to GitHub successfully!{COLOR_RESET}\n")
    else:
        print(f"\n{COLOR_RED}❌ ERROR: Git push failed. Please check network/permissions.{COLOR_RESET}\n")

if __name__ == "__main__":
    main()
