import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2 font-sans">
        {label && (
          <label className="text-sm font-semibold tracking-tight text-text-base ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-xl border border-border-base bg-surface px-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-red-500 focus:ring-red-500/20 focus:border-red-500" : "hover:border-muted",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <motion.div 
            whileHover={{ y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            className="text-xs font-bold text-red-500 ml-1"
          >
            {error}
          </motion.div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
