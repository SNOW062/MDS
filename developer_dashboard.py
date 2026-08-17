# completed file_0822
# MasterDeploy Live Log Tracker & Error Dashboard GUI
import os
import sys
import time
import threading
import subprocess
import re
import tkinter as tk
from tkinter import ttk, scrolledtext, messagebox

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DOCKER_CWD = os.path.join(BASE_DIR, "rust-coolify")
LOG_FILE = os.path.join(BASE_DIR, "developer_logs.md")

class LogTrackerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 MasterDeploy Live Log Tracker & Error Dashboard")
        self.root.geometry("1100x750")
        self.root.configure(bg="#0f0f11")
        
        self.process = None
        self.is_running = False
        
        # Style
        self.style = ttk.Style()
        self.style.theme_use("clam")
        self.style.configure(".", background="#0f0f11", foreground="#e4e4e7", font=("Segoe UI", 10))
        self.style.configure("TLabel", background="#0f0f11", foreground="#e4e4e7")
        self.style.configure("TButton", background="#6366f1", foreground="#ffffff", font=("Segoe UI", 10, "bold"), borderwidth=0)
        self.style.map("TButton", background=[("active", "#4f46e5")])
        self.style.configure("Stop.TButton", background="#ef4444", foreground="#ffffff", font=("Segoe UI", 10, "bold"), borderwidth=0)
        self.style.map("Stop.TButton", background=[("active", "#dc2626")])
        
        self.create_widgets()
        self.start_monitoring()

    def create_widgets(self):
        # Header
        header = tk.Frame(self.root, bg="#1e1b4b", height=60)
        header.pack(fill="x")
        header.pack_propagate(False)
        
        title_lbl = tk.Label(header, text="🔥 MASTERDEPLOY LIVE RUNNER & DETECTOR", font=("Segoe UI", 14, "bold"), bg="#1e1b4b", fg="#a5b4fc")
        title_lbl.pack(side="left", padx=20, pady=15)
        
        # Controls Frame in Header
        ctrl_frame = tk.Frame(header, bg="#1e1b4b")
        ctrl_frame.pack(side="right", padx=20)
        
        self.start_btn = ttk.Button(ctrl_frame, text="▶️ BAŞLAT", command=self.start_app, width=12)
        self.start_btn.pack(side="left", padx=5)
        
        self.stop_btn = ttk.Button(ctrl_frame, text="⏹️ DAYANDIR", command=self.stop_app, style="Stop.TButton", width=12)
        self.stop_btn.pack(side="left", padx=5)
        
        # Main Pane Layout (Left: Live Log, Right: Errors Filtered)
        paned = ttk.Panedwindow(self.root, orient=tk.HORIZONTAL)
        paned.pack(fill="both", expand=True, padx=10, pady=10)
        
        # Left Panel (Terminal Output)
        left_frame = tk.LabelFrame(paned, text=" 💻 Canlı Proses Çıxışı (Terminal) ", bg="#0f0f11", fg="#818cf8", font=("Segoe UI", 10, "bold"))
        paned.add(left_frame, weight=3)
        
        self.terminal_text = scrolledtext.ScrolledText(left_frame, bg="#030712", fg="#34d399", font=("Consolas", 9), insertbackground="#ffffff")
        self.terminal_text.pack(fill="both", expand=True, padx=5, pady=5)
        
        # Right Panel (Errors Dashboard)
        right_frame = tk.LabelFrame(paned, text=" ⚠️ Aşkar Edilən Xətalar (Errors) ", bg="#0f0f11", fg="#f87171", font=("Segoe UI", 10, "bold"))
        paned.add(right_frame, weight=2)
        
        right_content = tk.Frame(right_frame, bg="#0f0f11")
        right_content.pack(fill="both", expand=True, padx=5, pady=5)
        
        self.error_text = scrolledtext.ScrolledText(right_content, bg="#030712", fg="#f87171", font=("Consolas", 9), insertbackground="#ffffff")
        self.error_text.pack(fill="both", expand=True, pady=(0, 5))
        
        btn_copy = ttk.Button(right_content, text="📋 SEÇİLƏN XƏTANI KOPYALA", command=self.copy_errors)
        btn_copy.pack(fill="x")

    def log_to_terminal(self, msg, is_error=False):
        target = self.error_text if is_error else self.terminal_text
        target.insert(tk.END, msg)
        target.see(tk.END)
        
        # Həmçinin mərkəzi log faylına da yazaq
        try:
            with open(LOG_FILE, "a", encoding="utf-8") as f:
                f.write(msg)
        except Exception:
            pass

    def copy_errors(self):
        try:
            selected = self.error_text.get(tk.SEL_FIRST, tk.SEL_LAST)
        except tk.TclError:
            selected = self.error_text.get("1.0", tk.END).strip()
            
        if selected:
            self.root.clipboard_clear()
            self.root.clipboard_append(selected)
            messagebox.showinfo("Uğurlu", "Xətalar panoya kopyalandı! İndi mənə göndərə bilərsiniz.")
        else:
            messagebox.showwarning("Xəbərdarlıq", "Kopyalanacaq xəta mətni tapılmadı.")

    def start_app(self):
        if self.is_running:
            return
        
        self.is_running = True
        self.start_btn.state(["disabled"])
        self.log_to_terminal("\n🔥 MasterDeploy build prosesi başladılır...\n")
        
        def run_thread():
            base_dir = os.path.dirname(os.path.abspath(__file__))
            run_ui_script = os.path.join(base_dir, "run_ui.py")
            
            # run_ui.py skriptini işə salırıq
            self.process = subprocess.Popen(
                [sys.executable, run_ui_script],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding='utf-8',
                errors='replace',
                bufsize=1
            )
            
            # Xətaları aşkar etmək üçün regex
            err_patterns = [
                re.compile(r"error", re.IGNORECASE),
                re.compile(r"fail", re.IGNORECASE),
                re.compile(r"exception", re.IGNORECASE),
                re.compile(r"xəta", re.IGNORECASE),
                re.compile(r"panic", re.IGNORECASE),
                re.compile(r"warning", re.IGNORECASE)
            ]
            
            for line in iter(self.process.stdout.readline, ''):
                if not line:
                    break
                self.log_to_terminal(line)
                
                # Əgər xəta naxışı tapılarsa, errors panelinə yaz
                if any(pat.search(line) for pat in err_patterns):
                    self.log_to_terminal(line, is_error=True)
                    
            self.process.wait()
            self.is_running = False
            self.start_btn.state(["!disabled"])
            self.log_to_terminal("\n🛑 Proses dayandırıldı.\n")

        threading.Thread(target=run_thread, daemon=True).start()

    def stop_app(self):
        if self.process:
            self.process.terminate()
            self.process = None
        self.is_running = False
        self.start_btn.state(["!disabled"])
        self.log_to_terminal("\n🛑 İstifadəçi tərəfindən dayandırıldı.\n")

    def start_monitoring(self):
        # Fayl mərkəzini yaradırıq
        if not os.path.exists(LOG_FILE):
            with open(LOG_FILE, "w", encoding="utf-8") as f:
                f.write("# Developer Logs\n")

if __name__ == "__main__":
    root = tk.Tk()
    app = LogTrackerApp(root)
    root.mainloop()
