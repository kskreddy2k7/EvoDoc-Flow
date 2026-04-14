import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function Card({ className, children, hoverEffect = false }: { className?: string; children: React.ReactNode; hoverEffect?: boolean }) {
  return (
    <motion.div 
      whileHover={hoverEffect ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
      className={cn(
        "rounded-2xl border border-border-base bg-surface text-text-base shadow-sm transition-shadow duration-300", 
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("text-xl font-bold leading-none tracking-tight text-text-base", className)}>{children}</h3>;
}

export function CardContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6 pt-0", className)}>{children}</div>;
}

// Badge
export function Badge({ 
  className, 
  variant = 'default', 
  children,
  pulse = false
}: { 
  className?: string; 
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline';
  children: React.ReactNode;
  pulse?: boolean;
}) {
  const variants = {
    default: 'bg-accent text-primary border-transparent',
    success: 'bg-green-100 text-green-700 border-transparent dark:bg-green-900/30 dark:text-green-400',
    warning: 'bg-yellow-100 text-yellow-700 border-transparent dark:bg-yellow-900/30 dark:text-yellow-400',
    error: 'bg-red-100 text-red-700 border-transparent dark:bg-red-900/30 dark:text-red-400',
    outline: 'border-border-base text-muted bg-transparent',
  };

  return (
    <div className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all",
      variants[variant],
      pulse && "animate-pulse shadow-[0_0_0_rgba(239,68,68,0.4)] ring-2 ring-red-400/20",
      className
    )}>
      {children}
    </div>
  );
}
