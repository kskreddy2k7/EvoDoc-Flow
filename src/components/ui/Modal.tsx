'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  className 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 1, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 1, opacity: 0, y: 60 }}
            transition={{ type: 'spring', damping: 30, stiffness: 350 }}
            className={cn(
              "relative w-full bg-surface shadow-2xl border border-border-base",
              "rounded-t-3xl sm:rounded-2xl",
              "max-h-[92vh] overflow-y-auto",
              "sm:max-w-lg p-5 sm:p-8",
              className
            )}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden w-12 h-1.5 bg-border-base rounded-full mx-auto mb-5" />

            {title && (
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-base">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-text-base">{title}</h3>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-accent rounded-xl transition-colors text-muted hover:text-text-base"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Simple Tabs with Animation
export function Tabs({ 
  tabs, 
  activeTab, 
  onChange 
}: { 
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex bg-accent/50 p-1.5 rounded-2xl mb-8 w-fit border border-border-base">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative px-6 py-2.5 text-sm font-bold transition-all z-10 rounded-xl",
            activeTab === tab.id
              ? "text-primary shadow-sm"
              : "text-muted hover:text-text-base"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-surface rounded-xl shadow-sm z-[-1]"
              transition={{ type: 'spring', duration: 0.5 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
