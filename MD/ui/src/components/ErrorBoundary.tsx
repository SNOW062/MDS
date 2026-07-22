import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertOctagon, RefreshCw, ChevronRight } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    // Pro developers log this to services like Sentry/Bugsnag
    console.error("[MD-FATAL-UI-ERROR] Caught by ErrorBoundary:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.hash = '#/dashboard';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] bg-[#0c0c0e] border border-red-500/20 rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
            <AlertOctagon size={36} />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-red-500 tracking-tight">500</h1>
            <h2 className="text-xl font-bold text-white">Wait, this is not cool...</h2>
            <p className="text-xs text-zinc-400 max-w-md">
              There has been an uncaught frontend error. MasterDeploy Error Boundary successfully caught the crash.
            </p>
          </div>

          {this.state.error && (
            <div className="w-full max-w-2xl bg-[#141416] border border-[#27272a] rounded-lg p-4 text-left font-mono text-xs text-zinc-300 space-y-2 overflow-x-auto">
              <div className="text-rose-400 font-bold">
                Error: {this.state.error.toString()}
              </div>
              {this.state.errorInfo && (
                <pre className="text-[10px] text-zinc-500 max-h-40 overflow-y-auto leading-relaxed pt-2 border-t border-[#27272a]/50">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={this.handleReset}
              className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all active:scale-95 shadow-lg shadow-orange-600/10"
            >
              <RefreshCw size={14} />
              <span>Go to Dashboard</span>
            </button>
            <a
              href="https://github.com/coollabsio/coolify/issues"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-500 hover:text-zinc-300 text-xs flex items-center space-x-1"
            >
              <span>Contact Support</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
