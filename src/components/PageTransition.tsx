'use client';

import { motion } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.02, y: -8 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1], // Custom cinematic curve
        opacity: { duration: 0.3 }
      }}
    >
      {children}
    </motion.div>
  );
}
