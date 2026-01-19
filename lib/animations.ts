import type { Variants, Transition } from 'motion/react';

// ============================================
// 基礎過渡設定
// ============================================
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const smoothTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};

// 標準緩動曲線（用於展開動畫）
export const expandEase = [0.04, 0.62, 0.23, 0.98] as const;

// ============================================
// GPU 加速動畫 (使用 transform 字串)
// ============================================
export const gpuFadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translateY(60px)',
  },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const gpuFadeInLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translateX(-60px)',
  },
  visible: {
    opacity: 1,
    transform: 'translateX(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const gpuFadeInRightVariants: Variants = {
  hidden: {
    opacity: 0,
    transform: 'translateX(60px)',
  },
  visible: {
    opacity: 1,
    transform: 'translateX(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ============================================
// 展開動畫（統一向下）
// ============================================
export const expandDownVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.25, ease: expandEase },
      opacity: { duration: 0.2, delay: 0.05 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.2, ease: 'easeIn' },
      opacity: { duration: 0.15 },
    },
  },
};

// FAQ 專用展開動畫（更快）
export const faqExpandVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.2, ease: expandEase },
      opacity: { duration: 0.15, delay: 0.03 },
    },
  },
};

// ============================================
// 滑入動畫（輪播用）
// ============================================
export const slideVariants: Variants = {
  enter: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  center: {
    opacity: 1,
    transform: 'translateX(0)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transform: 'translateX(-100%)',
    transition: { duration: 0.2 },
  },
};

// ============================================
// 頁面轉場動畫
// ============================================
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// ============================================
// 滾動進入動畫（保留舊版兼容）
// ============================================
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ============================================
// 交錯動畫 (用於列表)
// ============================================
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ============================================
// 縮放動畫
// ============================================
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Modal 專用縮放動畫
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// Modal 背景動畫
export const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

// ============================================
// 按鈕互動動畫
// ============================================
export const buttonTapAnimation = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

export const buttonHoverAnimation = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

// ============================================
// 卡片 hover 動畫
// ============================================
export const cardHoverAnimation = {
  y: -8,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  transition: { duration: 0.3 },
};

// ============================================
// 類別切換淡入淡出
// ============================================
export const categoryFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};
