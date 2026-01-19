'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';

// DJ 盤圖標（有標記看得出旋轉）
function DiscIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      {/* 外圈唱片 */}
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      {/* 唱片紋路 */}
      <circle cx="12" cy="12" r="8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
      <circle cx="12" cy="12" r="5.5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" />
      {/* 中心白色圓 */}
      <circle cx="12" cy="12" r="3" fill="white" />
      {/* 標記點（讓旋轉可見） */}
      <circle cx="12" cy="5" r="1" fill="white" opacity="0.6" />
      <circle cx="12" cy="19" r="0.6" fill="white" opacity="0.4" />
    </svg>
  );
}

// 靜音圖標
function MusicOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const pathname = usePathname();

  // 進入 /general 時顯示提示
  useEffect(() => {
    if (pathname === '/general') {
      const hasShown = localStorage.getItem('music-tooltip-shown');
      if (!hasShown) {
        setShowTooltip(true);
        const timer = setTimeout(() => {
          setShowTooltip(false);
        }, 5000);
        localStorage.setItem('music-tooltip-shown', 'true');
        return () => clearTimeout(timer);
      }
    }
  }, [pathname]);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
          // 點擊播放後隱藏提示
          setShowTooltip(false);
        }
      } catch (error) {
        console.error('播放音樂失敗:', error);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/nuvaclub.mp3" loop preload="auto" />

      {/* 手機版 bottom-24 避開底部方案選擇器，桌面版 bottom-6 */}
      <div className="fixed bottom-24 right-4 z-40 lg:bottom-6 lg:right-6">
        {/* 提示氣泡 */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
            >
              🎵 點擊播放背景音樂
              {/* 箭頭 */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-neutral-800" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 擴散炫光效果（未播放時顯示，誘惑用戶點擊）*/}
        {!isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-500"
              animate={{
                scale: [1, 1.8, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-400"
              animate={{
                scale: [1, 2.2, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.3,
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary-300"
              animate={{
                scale: [1, 2.6, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.6,
              }}
            />
          </>
        )}

        {/* 播放按鈕 */}
        <motion.button
          onClick={togglePlay}
          className="relative w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50 flex items-center justify-center hover:bg-white transition-colors cursor-pointer overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isPlaying ? '靜音' : '播放音樂'}
          // 播放時整個按鈕震動效果（像音箱，幅度小）
          animate={isPlaying ? {
            scale: [1, 1.02, 1, 1.015, 1],
            rotate: [0, -0.5, 0, 0.5, 0],
          } : {}}
          transition={isPlaying ? {
            duration: 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          } : {}}
        >
          {isPlaying ? (
            // DJ 盤旋轉效果
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <DiscIcon className="w-10 h-10 text-primary-600" />
            </motion.div>
          ) : (
            <MusicOffIcon className="w-5 h-5 text-neutral-500" />
          )}
        </motion.button>
      </div>
    </>
  );
}
