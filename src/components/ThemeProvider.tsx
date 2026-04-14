'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { useStore } from '@/store/useStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore((state) => state.theme);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'theme-blue', 'theme-contrast');
    
    // Add active theme class
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'blue') {
      root.classList.add('theme-blue');
    } else if (theme === 'contrast') {
      root.classList.add('theme-contrast');
    }
  }, [theme, isMounted]);

  // Prevent hydration mismatch
  if (!isMounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return <>{children}</>;
}
