import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-primary-blue mb-4">
              Oops! Nešto nije u redu.
            </h1>
            <p className="text-gray-600 mb-4">
              Došlo je do greške. Molimo vas da osvežite stranicu ili pokušate kasnije.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue transition-colors"
            >
              Osveži stranicu
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 