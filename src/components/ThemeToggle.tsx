'use client';

import { useStore, ThemeType } from '@/store/useStore';
import { Sun, Moon, Droplets, Contrast, ChevronDown, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function ThemeToggle({ position = 'down' }: { position?: 'up' | 'down' }) {
  const { theme, setTheme } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const themes: { id: ThemeType; label: string; icon: LucideIcon }[] = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'blue', label: 'Healthcare', icon: Droplets },
    { id: 'contrast', label: 'Contrast', icon: Contrast },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border-base bg-surface text-text-base hover:bg-accent transition-all shadow-sm w-full transition-all active:scale-95"
      >
        <currentTheme.icon className="h-4 w-4" />
        <span className="text-sm font-medium">{currentTheme.label}</span>
        <ChevronDown className={cn("h-4 w-4 ml-auto transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-[60]" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: position === 'down' ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: position === 'down' ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "absolute right-0 w-[calc(100%+2rem)] min-w-[12rem] rounded-2xl border border-border-base bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[70] overflow-hidden",
                position === 'down' ? "top-full mt-2" : "bottom-full mb-3"
              )}
            >
              <div className="p-2 space-y-1">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      theme === t.id 
                        ? "bg-primary text-white" 
                        : "text-text-base hover:bg-accent"
                    )}
                  >
                    <t.icon className={cn("h-4 w-4", theme === t.id ? "text-white" : "text-muted")} />
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
