import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    
    // In a real app, you'd send this to your error reporting service
    // Example: Sentry, LogRocket, etc.
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="glass-strong rounded-3xl p-8 shadow-2xl border border-white/10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </motion.div>

              <h1 className="text-2xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Don't worry, it's not you - it's me. Something unexpected happened while loading this page.
              </p>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleReload}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={this.handleGoHome}
                  className="w-full glass hover:glass-strong text-neutral-100 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </motion.button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-400">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-lg overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 