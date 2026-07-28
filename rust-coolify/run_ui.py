import os
import subprocess
import sys

def start_dev_server():
    ui_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'ui')
    print(f"Starting Vite development server in: {ui_dir}")
    
    try:
        # Launch npm run dev as a subprocess
        process = subprocess.Popen(
            ['npm', 'run', 'dev'],
            cwd=ui_dir,
            shell=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        print("Server is starting up...")
        # Stream the output to console
        for line in iter(process.stdout.readline, ''):
            sys.stdout.write(line)
            sys.stdout.flush()
            
    except KeyboardInterrupt:
        print("\nStopping development server...")
        process.terminate()
    except Exception as e:
        print(f"Error starting server: {e}")

if __name__ == '__main__':
    start_dev_server()
