import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-custom-black/5">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Nešto nije u redu</h2>
            <p className="text-custom-black/60 mb-4">
              Došlo je do greške pri učitavanju stranice. Molimo vas da osvežite stranicu ili pokušate kasnije.
            </p>
            <p className="text-sm text-custom-black/50 mb-4">
              Tehnički detalji: {this.state.error?.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full cta-button rounded-full"
            >
              <span>Refresh Page</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 