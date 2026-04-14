'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Intentionally no console logging here; upstream logging can be added via a monitoring tool.
    void error;
    void errorInfo;
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-base p-6">
          <div className="max-w-md w-full space-y-8 text-center bg-surface p-12 rounded-[2.5rem] shadow-premium border border-border-base">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
              <AlertCircle size={40} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight text-text-base">System Interruption</h2>
              <p className="text-muted font-bold leading-relaxed">
                An unexpected clinical module error occurred. The session has been isolated to prevent data loss.
              </p>
            </div>
            <div className="flex flex-col gap-4 pt-6">
              <Button 
                onClick={() => window.location.reload()} 
                className="h-14 rounded-2xl gap-3 font-black shadow-lg shadow-primary/20"
              >
                <RefreshCcw size={20} /> Restart Session
              </Button>
              <Link href="/" className="w-full">
                <Button variant="ghost" className="w-full h-14 rounded-2xl gap-3 font-bold text-muted hover:text-primary">
                  <Home size={20} /> Return to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
