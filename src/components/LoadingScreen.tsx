/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete: () => void;
  logoUrl?: string;
  minDurationMs?: number;
}

export default function LoadingScreen({
  onComplete,
  logoUrl = 'https://res.cloudinary.com/kbiolcw6/image/upload/v1793619002/For_Print_Green_logo_wvplyi.png',
  minDurationMs = 1700,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="philo-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF8F5] text-[#260805] select-none overflow-hidden cursor-default"
          onClick={() => {
            // Allow tap/click to enter immediately
            setIsExiting(true);
            setTimeout(onComplete, 300);
          }}
        >
          {/* Subtle luxury ambient background textures */}
          <div className="absolute inset-0 bg-[radial-gradient(#83453B_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#83453B]/5 blur-3xl pointer-events-none -top-20 -left-20" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C2A68D]/15 blur-3xl pointer-events-none -bottom-20 -right-20" />

          {/* Central Logo Box */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-sm">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mb-6"
            >
              {/* Soft pulsing glow behind logo */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.45, 0.2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 bg-[#83453B]/20 rounded-full blur-xl"
              />

              <img
                src={logoUrl}
                alt="PHILO Salon Logo"
                className="h-16 sm:h-20 w-auto object-contain relative z-10 drop-shadow-sm"
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-1.5 mb-8"
            >
              <h1 className="font-heading text-lg sm:text-xl uppercase tracking-[0.26em] text-[#260805] font-light">
                PHILO SALON
              </h1>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#83453B] font-medium">
                Hairdressing • Beauty • Est. 2022
              </p>
              <p className="text-[9.5px] uppercase tracking-[0.24em] text-[#9A8E85]">
                Parthopur • HB Town • Lake Town
              </p>
            </motion.div>

            {/* Slender Progress Bar */}
            <div className="w-48 sm:w-56 h-[2px] bg-[#E5DCD4] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#83453B] to-[#B36052] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Loading text & Skip Hint */}
            <div className="flex items-center justify-between w-48 sm:w-56 mt-2 text-[9px] uppercase tracking-[0.2em] text-[#9A8E85]">
              <span>Loading</span>
              <span className="font-mono">{progress}%</span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8 }}
              className="text-[9px] text-[#A69C95] tracking-[0.16em] uppercase mt-6"
            >
              Tap anywhere to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
