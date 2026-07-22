import os
import sys
import json
import time
import threading
import subprocess
import urllib.request
import urllib.error
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
TOKEN_FILE = os.path.join(BASE_DIR, ".gh_token")
SCRIPT_PATH = os.path.abspath(__file__)
INITIAL_MTIME = os.path.getmtime(SCRIPT_PATH) if os.path.exists(SCRIPT_PATH) else 0

class GitGuiApp:
    def __init__(self, root):
        self.root = root
        self.root.title("MasterDeploy (MD) - GitHub Manager GUI (Hot-Reload)")
        self.root.geometry("820x680")
        self.root.configure(bg="#121214")

        # Style configuration
        self.style = ttk.Style()
        self.style.theme_use("clam")
        self.style.configure(".", background="#121214", foreground="#e4e4e7", font=("Segoe UI", 10))
        self.style.configure("TLabel", background="#121214", foreground="#e4e4e7")
        self.style.configure("TButton", background="#f97316", foreground="#ffffff", font=("Segoe UI", 10, "bold"), borderwidth=0)
        self.style.map("TButton", background=[("active", "#ea580c")])
        self.style.configure("Secondary.TButton", background="#27272a", foreground="#e4e4e7", font=("Segoe UI", 10))
        self.style.map("Secondary.TButton", background=[("active", "#3f3f46")])
        self.style.configure("TCombobox", fieldbackground="#18181b", background="#27272a", foreground="#e4e4e7")

        self.user_repos = []
        self.create_widgets()
        self.load_saved_token()
        self.start_hot_reload_watcher()

    def start_hot_reload_watcher(self):
        def _watch():
            while True:
                time.sleep(1)
                try:
                    if os.path.exists(SCRIPT_PATH):
                        mtime = os.path.getmtime(SCRIPT_PATH)
                        if mtime > INITIAL_MTIME:
                            self.root.after(0, self.restart_app)
                            break
                except Exception:
                    pass
        threading.Thread(target=_watch, daemon=True).start()

    def restart_app(self):
        self.log_to_terminal("\n⚡ Hot-Reload: Dəyişiklik aşkar olundu, GUI avtomatik yenidən başladılır...\n")
        self.root.destroy()
        os.execv(sys.executable, [sys.executable, SCRIPT_PATH] + sys.argv[1:])

    def create_widgets(self):
        # Header Frame
        header_frame = tk.Frame(self.root, bg="#18181b")
        header_frame.pack(fill="x")
        
        header_content = tk.Frame(header_frame, bg="#18181b")
        header_content.pack(fill="x", padx=16, pady=12)

        title_lbl = tk.Label(header_content, text="🚀 MasterDeploy (MD) Git & GitHub Manager", font=("Segoe UI", 14, "bold"), bg="#18181b", fg="#f97316")
        title_lbl.pack(side="left")

        hot_lbl = tk.Label(header_content, text="⚡ Hot-Reload Active", font=("Segoe UI", 9, "bold"), bg="#18181b", fg="#10b981")
        hot_lbl.pack(side="right")

        # Main Container
        main_container = tk.Frame(self.root, bg="#121214")
        main_container.pack(fill="both", expand=True, padx=16, pady=12)

        # 1. GitHub Token Section
        token_frame = tk.LabelFrame(main_container, text=" 🔑 GitHub Access Token ", bg="#121214", fg="#f97316", font=("Segoe UI", 10, "bold"))
        token_frame.pack(fill="x", pady=6, padx=4)

        token_inner = tk.Frame(token_frame, bg="#121214")
        token_inner.pack(fill="x", padx=10, pady=10)

        tk.Label(token_inner, text="Personal Access Token (PAT):").pack(anchor="w")
        token_subframe = tk.Frame(token_inner, bg="#121214")
        token_subframe.pack(fill="x", pady=4)

        self.token_entry = tk.Entry(token_subframe, bg="#18181b", fg="#ffffff", insertbackground="#ffffff", font=("Consolas", 10), show="•")
        self.token_entry.pack(side="left", fill="x", expand=True, ipady=4, padx=(0, 6))

        fetch_btn = ttk.Button(token_subframe, text="Repoları Yüklə", command=self.fetch_repositories, style="TButton")
        fetch_btn.pack(side="right")

        # 2. Repository Selector Section
        repo_frame = tk.LabelFrame(main_container, text=" 📦 Repozitoriya Seçimi ", bg="#121214", fg="#f97316", font=("Segoe UI", 10, "bold"))
        repo_frame.pack(fill="x", pady=6, padx=4)

        repo_inner = tk.Frame(repo_frame, bg="#121214")
        repo_inner.pack(fill="x", padx=10, pady=10)

        tk.Label(repo_inner, text="Push olunacaq Repozitoriya:").pack(anchor="w")
        self.repo_combo = ttk.Combobox(repo_inner, values=[], font=("Consolas", 10))
        self.repo_combo.pack(fill="x", pady=4, ipady=3)
        self.repo_combo.set("https://github.com/SNOW062/MDS.git")

        # 3. Actions Section
        action_frame = tk.Frame(main_container, bg="#121214")
        action_frame.pack(fill="x", pady=6, padx=4)

        init_btn = ttk.Button(action_frame, text="⚙️ Git-ə Hazırla (.git & .gitignore)", command=self.prepare_git, style="Secondary.TButton")
        init_btn.pack(side="left", padx=(0, 6))

        tk.Label(action_frame, text="Commit Mesajı:").pack(side="left", padx=(10, 4))
        self.commit_entry = tk.Entry(action_frame, bg="#18181b", fg="#ffffff", insertbackground="#ffffff", font=("Segoe UI", 10))
        self.commit_entry.pack(side="left", fill="x", expand=True, ipady=4, padx=(0, 6))
        self.commit_entry.insert(0, f"Auto-update MasterDeploy: {time.strftime('%Y-%m-%d %H:%M')}")

        push_btn = ttk.Button(action_frame, text="🚀 Commit & Push", command=self.start_push_thread, style="TButton")
        push_btn.pack(side="right")

        # 4. Terminal Output Section
        term_frame = tk.LabelFrame(main_container, text=" 💻 Live Process Terminal ", bg="#121214", fg="#f97316", font=("Segoe UI", 10, "bold"))
        term_frame.pack(fill="both", expand=True, pady=6, padx=4)

        term_inner = tk.Frame(term_frame, bg="#121214")
        term_inner.pack(fill="both", expand=True, padx=6, pady=6)

        self.terminal_text = scrolledtext.ScrolledText(term_inner, bg="#0a0a0c", fg="#10b981", font=("Consolas", 9), insertbackground="#ffffff")
        self.terminal_text.pack(fill="both", expand=True)

        self.log_to_terminal("🚀 MasterDeploy Git Manager GUI hazırdır (Hot-Reload enabled).\n")

    def log_to_terminal(self, message):
        self.terminal_text.insert(tk.END, message)
        self.terminal_text.see(tk.END)

    def load_saved_token(self):
        if os.path.exists(TOKEN_FILE):
            try:
                with open(TOKEN_FILE, "r") as f:
                    token = f.read().strip()
                    if token:
                        self.token_entry.insert(0, token)
                        self.log_to_terminal("🔑 Yadda saxlanılmış GitHub Token tapıldı.\n")
            except Exception:
                pass

    def save_token(self, token):
        try:
            with open(TOKEN_FILE, "w") as f:
                f.write(token)
        except Exception:
            pass

    def fetch_repositories(self):
        token = self.token_entry.get().strip()
        if not token:
            messagebox.showwarning("Xəbərdarlıq", "Lütfən GitHub Personal Access Token daxil edin!")
            return

        self.save_token(token)
        self.log_to_terminal("⏳ GitHub Repozitoriyaları yüklənir...\n")

        def _fetch():
            try:
                req = urllib.request.Request("https://api.github.com/user/repos?per_page=100&sort=updated")
                req.add_header("Authorization", f"token {token}")
                req.add_header("User-Agent", "MasterDeploy-App")

                with urllib.request.urlopen(req) as resp:
                    data = json.loads(resp.read().decode())
                    repos = [r["clone_url"] for r in data if "clone_url" in r]
                    self.user_repos = repos

                def _update_ui():
                    self.repo_combo["values"] = self.user_repos
                    if self.user_repos:
                        self.repo_combo.set(self.user_repos[0])
                    self.log_to_terminal(f"✅ {len(self.user_repos)} repozitoriya uğurla tapıldı və menyuya əlavə olundu!\n")

                self.root.after(0, _update_ui)

            except Exception as err:
                err_msg = str(err)
                def _err_ui():
                    self.log_to_terminal(f"❌ Repozitoriyalar yüklənərkən xəta: {err_msg}\n")
                    messagebox.showerror("Xəta", f"Repozitoriyalar yüklənə bilmədi:\n{err_msg}")
                self.root.after(0, _err_ui)

        threading.Thread(target=_fetch, daemon=True).start()

    def prepare_git(self):
        self.log_to_terminal("\n⚙️ Git qovluğu və .gitignore təyin olunur...\n")
        
        # Git Init
        if not os.path.exists(os.path.join(BASE_DIR, ".git")):
            self.run_cmd_log("git init")
        else:
            self.log_to_terminal("ℹ️ .git qovluğu artıq mövcuddur.\n")

        # Create .gitignore
        gitignore_path = os.path.join(BASE_DIR, ".gitignore")
        gitignore_content = """# Rust Build Artifacts
/target/
**/target/
Cargo.lock

# Node / React Frontend
/node_modules/
**/node_modules/
dist/
build/

# Environment & Secrets
.env
.env.local
.gh_token

# Source Repositories & Logs
/coolify-source/
*.log
*.sqlite
*.db
"""
        with open(gitignore_path, "w", encoding="utf-8") as f:
            f.write(gitignore_content)

        self.log_to_terminal("✅ .gitignore faylı uğurla yaradıldı/yeniləndi.\n")

    def run_cmd_log(self, cmd):
        self.log_to_terminal(f"$ {cmd}\n")
        proc = subprocess.Popen(cmd, cwd=BASE_DIR, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, encoding="utf-8", errors="replace")
        for line in iter(proc.stdout.readline, ''):
            if line:
                self.log_to_terminal(line)
        proc.wait()
        return proc.returncode == 0

    def start_push_thread(self):
        threading.Thread(target=self.do_push, daemon=True).start()

    def do_push(self):
        token = self.token_entry.get().strip()
        repo_url = self.repo_combo.get().strip()
        commit_msg = self.commit_entry.get().strip() or f"Auto-update MasterDeploy: {time.strftime('%Y-%m-%d %H:%M')}"

        if not repo_url:
            messagebox.showwarning("Xəbərdarlıq", "Lütfən repozitoriya ünvanını seçin və ya daxil edin!")
            return

        self.log_to_terminal("\n====================================\n")
        self.log_to_terminal("🚀 MASTERDEPLOY GIT PUSH BAŞLADILDI...\n")
        self.log_to_terminal("====================================\n")

        # Build authenticated repo URL if token is available
        auth_url = repo_url
        if token and "github.com" in repo_url:
            clean_url = repo_url.replace("https://", "").replace("http://", "")
            auth_url = f"https://{token}@{clean_url}"

        # 1. Prepare Git
        self.prepare_git()

        # 2. Remote setup
        self.run_cmd_log("git remote remove origin")
        self.run_cmd_log(f"git remote add origin {auth_url}")
        self.run_cmd_log("git branch -M main")

        # 3. Add & Commit
        self.run_cmd_log("git add .")
        self.run_cmd_log(f'git commit -m "{commit_msg}"')

        # 4. Push
        self.log_to_terminal("\n📤 Remote repozitoriyaya push olunur...\n")
        success = self.run_cmd_log("git push -u origin main")

        if success:
            self.log_to_terminal("\n🎉 UĞURLU: Kod GitHub-a tam göndərildi!\n")
            messagebox.showinfo("Uğurlu", "Bütün kodlar GitHub-a uğurla Push olundu!")
        else:
            self.log_to_terminal("\n❌ XƏTA: Git push alınmadı. Token və ya icazələri yoxlayın.\n")
            messagebox.showerror("Xəta", "Git push uğursuz oldu. Terminal loquna baxın.")

if __name__ == "__main__":
    root = tk.Tk()
    app = GitGuiApp(root)
    root.mainloop()
