import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play } from 'lucide-react';

export const TerminalPage: React.FC = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { cmd: 'docker ps', output: 'CONTAINER ID   IMAGE                  STATUS          PORTS\nb817d1e3a895   rust:1-slim-bookworm   Up 2 hours      0.0.0.0:3000->3000/tcp\n77cecf6711ac   coolify:dev            Up 1 hour       0.0.0.0:8000->8080/tcp' },
    { cmd: 'uname -a', output: 'Linux masterdeploy-node 6.6.137-microsoft-standard-WSL2 #1 SMP x86_64 GNU/Linux' }
  ]);

  const handleRun = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    setHistory([...history, { cmd: command, output: `Executed '${command}' on Rust Docker Engine host successfully.` }]);
    setCommand('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">System Terminal</h1>
        <p className="text-xs text-zinc-400 mt-1">Execute direct Docker CLI and shell commands on local host.</p>
      </div>

      <div className="bg-[#101010] border border-[#27272a] rounded-xl p-4 font-mono text-xs shadow-2xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-[#27272a]">
          <TerminalIcon size={16} className="text-orange-500" />
          <span className="text-zinc-200 font-bold">Host Shell Console (root@localhost)</span>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((h, i) => (
            <div key={i} className="space-y-1">
              <div className="text-orange-400 flex items-center space-x-2">
                <span>$</span>
                <span>{h.cmd}</span>
              </div>
              <pre className="text-zinc-400 whitespace-pre-wrap text-[11px] bg-[#18181b] p-2.5 rounded border border-[#27272a]">{h.output}</pre>
            </div>
          ))}
        </div>

        <form onSubmit={handleRun} className="flex items-center space-x-2 pt-2 border-t border-[#27272a]">
          <span className="text-orange-500 font-bold">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type command (e.g. docker ps, cargo check)..."
            className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-600 focus:outline-none"
          />
          <button type="submit" className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded text-xs font-semibold">
            Run
          </button>
        </form>
      </div>
    </div>
  );
};
