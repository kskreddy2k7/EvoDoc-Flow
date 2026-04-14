'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FileSearch, ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base p-6 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-blob" />
      
      <div className="max-w-2xl w-full text-center space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-accent text-primary shadow-inner"
        >
          <FileSearch size={64} />
        </motion.div>
        
        <div className="space-y-4">
          <h1 className="text-8xl font-black tracking-tighter text-text-base">404</h1>
          <h2 className="text-3xl font-black tracking-tight text-text-base">Resource Not Located</h2>
          <p className="text-xl text-muted font-medium max-w-md mx-auto leading-relaxed">
            The clinical record or module you are seeking is either restricted or does not exist in the current directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="h-16 px-10 rounded-2xl gap-3 text-lg font-black border-2"
          >
            <ArrowLeft size={20} /> Back to Safety
          </Button>
          <Link href="/">
            <Button className="h-16 px-10 rounded-2xl gap-3 text-lg font-black shadow-2xl shadow-primary/30">
              <Home size={20} /> Return to Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
