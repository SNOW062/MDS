# completed file_0823
# MasterDeploy Dashboard Web Server
import os
import sys
import json
import re
from http.server import BaseHTTPRequestHandler, HTTPServer
import threading
import time

DASHBOARD_PORT = 9001
LOG_BUFFER = []
ERROR_BUFFER = []

ERROR_PATTERNS = [
    re.compile(r"error", re.IGNORECASE),
    re.compile(r"fail", re.IGNORECASE),
    re.compile(r"exception", re.IGNORECASE),
    re.compile(r"xəta", re.IGNORECASE),
    re.compile(r"panic", re.IGNORECASE),
    re.compile(r"warning", re.IGNORECASE)
]

# Hot-Reload auto-restart nəzarətçisi
SCRIPT_PATH = os.path.abspath(__file__)
INITIAL_MTIME = os.path.getmtime(SCRIPT_PATH) if os.path.exists(SCRIPT_PATH) else 0

def auto_reloader():
    global INITIAL_MTIME
    if os.path.exists(SCRIPT_PATH):
        INITIAL_MTIME = os.path.getmtime(SCRIPT_PATH)
        
    while True:
        time.sleep(2)
        try:
            if os.path.exists(SCRIPT_PATH):
                current_mtime = os.path.getmtime(SCRIPT_PATH)
                if current_mtime > INITIAL_MTIME:
                    print("⚡ dashboard_server.py changed! Restarting...")
                    INITIAL_MTIME = current_mtime
                    import subprocess
                    subprocess.Popen([sys.executable] + sys.argv)
                    sys.exit(0)
        except Exception:
            pass


class DashboardHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "*")
        self.end_headers()

    def do_GET(self):
        if self.path == "/favicon.ico":
            self.send_response(200)
            self.send_header("Content-Type", "image/x-icon")
            self.end_headers()
            self.wfile.write(b"")
        elif self.path == "/api/logs":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            response = {"logs": LOG_BUFFER, "errors": ERROR_BUFFER}
            self.wfile.write(json.dumps(response).encode("utf-8"))

        elif self.path == "/":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            
            html = """
            <!DOCTYPE html>
            <html lang="az">
            <head>
                <meta charset="UTF-8">
                <title>MasterDeploy Live Log Monitor</title>
                <style>
                    body {
                        background-color: #09090b;
                        color: #f4f4f5;
                        font-family: 'Segoe UI', system-ui, sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                        overflow: hidden;
                    }
                    header {
                        background: rgba(15, 15, 20, 0.7);
                        backdrop-filter: blur(12px);
                        border-bottom: 1px solid #27272a;
                        padding: 15px 30px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        height: 60px;
                        box-sizing: border-box;
                    }
                    h1 {
                        font-size: 1.3rem;
                        font-weight: 700;
                        margin: 0;
                        color: #818cf8;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .badge {
                        background: #10b981;
                        color: #fff;
                        font-size: 0.75rem;
                        padding: 3px 8px;
                        border-radius: 5px;
                        font-weight: 600;
                    }
                    .container {
                        display: grid;
                        grid-template-columns: 3fr 2fr;
                        height: calc(100vh - 60px);
                        width: 100vw;
                        overflow: hidden;
                    }
                    .pane {
                        display: flex;
                        flex-direction: column;
                        padding: 20px;
                        box-sizing: border-box;
                        overflow: hidden;
                        min-width: 0;
                    }
                    .left-pane {
                        border-right: 1px solid #27272a;
                    }
                    .right-pane {
                        background: #0c0c0e;
                    }
                    .pane-title {
                        font-size: 1rem;
                        font-weight: 600;
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }
                    .terminal-box {
                        flex: 1;
                        background-color: #030712;
                        border: 1px solid #1f2937;
                        border-radius: 10px;
                        padding: 15px;
                        overflow: auto;
                        font-family: 'Consolas', 'Courier New', monospace;
                        font-size: 0.85rem;
                        line-height: 1.6;
                        white-space: pre;
                        box-shadow: inset 0 2px 8px rgba(0,0,0,0.8);
                    }
                    #terminal {
                        color: #10b981;
                    }
                    #errors {
                        color: #f87171;
                    }
                    .btn-copy {
                        background: #6366f1;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 8px;
                        font-weight: 600;
                        cursor: pointer;
                        margin-top: 15px;
                        transition: background 0.2s;
                    }
                    .btn-copy:hover {
                        background: #4f46e5;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>🚀 MasterDeploy Live Log Monitor <span class="badge">Live 9001</span></h1>
                    <div style="font-size: 0.9rem; color: #a1a1aa;">Backend: http://localhost:9000</div>
                </header>
                <div class="container">
                    <div class="pane left-pane">
                        <div class="pane-title" style="color: #34d399;">💻 Canlı Terminal Çıxışı</div>
                        <div class="terminal-box" id="terminal">Yüklənir...</div>
                    </div>
                    <div class="pane right-pane">
                        <div class="pane-title" style="color: #f87171;">⚠️ Aşkar Edilən Xətalar (Errors)</div>
                        <div class="terminal-box" id="errors">Hələ heç bir xəta aşkar edilməyib.</div>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn-copy" style="flex: 1;" onclick="copyErrors()">📋 Xətaları Kopyala</button>
                            <button class="btn-copy" style="flex: 1; background: #ef4444;" onclick="clearLogs()">🗑️ Logları Təmizlə</button>
                        </div>
                    </div>
                </div>
                <script>
                    function fetchLogs() {
                        fetch('/api/logs')
                            .then(res => res.json())
                            .then(data => {
                                const termBox = document.getElementById('terminal');
                                const errorBox = document.getElementById('errors');
                                
                                termBox.innerText = data.logs.join('') || "Gözlənilir...";
                                errorBox.innerText = data.errors.join('') || "Hələ heç bir xəta aşkar edilməyib.";
                                
                                termBox.scrollTop = termBox.scrollHeight;
                                errorBox.scrollTop = errorBox.scrollHeight;
                            })
                            .catch(err => console.error("Log fetch error:", err));
                    }
                    
                    function copyErrors() {
                        const errText = document.getElementById('errors').innerText;
                        navigator.clipboard.writeText(errText).then(() => {
                            alert("Xətalar müvəffəqiyyətlə kopyalandı!");
                        });
                    }

                    function clearLogs() {
                        fetch('/api/clear', { method: 'POST' })
                            .then(() => fetchLogs())
                            .catch(err => console.error("Clear error:", err));
                    }
 
                     setInterval(fetchLogs, 1000);
                     fetchLogs();
                 </script>
             </body>
             </html>
            """
            self.wfile.write(html.encode("utf-8"))
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        if self.path == "/api/logs":
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                payload = json.loads(post_data.decode('utf-8'))
                
                lines = payload.get("lines", [])
                single_line = payload.get("line", "")
                
                if lines:
                    for line in lines:
                        add_log_line(line)
                elif single_line:
                    add_log_line(single_line)
                    
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(b'{"status":"ok"}')
            except Exception as e:
                try:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(str(e).encode('utf-8'))
                except Exception:
                    pass
        elif self.path == "/api/clear":
            global LOG_BUFFER, ERROR_BUFFER
            LOG_BUFFER.clear()
            ERROR_BUFFER.clear()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
        else:
            self.send_error(404, "Not Found")


def add_log_line(line):
    LOG_BUFFER.append(line)
    if any(pat.search(line) for pat in ERROR_PATTERNS):
        ERROR_BUFFER.append(line)
        
    if len(LOG_BUFFER) > 2000:
        LOG_BUFFER.pop(0)
    if len(ERROR_BUFFER) > 500:
        ERROR_BUFFER.pop(0)

def start_server():
    t_reload = threading.Thread(target=auto_reloader, daemon=True)
    t_reload.start()
    
    server = HTTPServer(("", DASHBOARD_PORT), DashboardHandler)
    server.serve_forever()

if __name__ == "__main__":
    start_server()
