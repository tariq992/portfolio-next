// components/LoadingSkeleton.tsx
"use client";
import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-light-bg dark:bg-dark-bg"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute inset-0 flex items-center justify-center text-indigo-500 font-bold"
        >
          3D
        </motion.div>
      </div>
    </motion.div>
  );
}