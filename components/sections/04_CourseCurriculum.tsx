'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CURRICULUM_ITEMS } from '@/lib/data';
import type { CurriculumItem } from '@/lib/types';
import { cn } from '@/lib/utils';

// Step colors - blue gradient system, step 8 uses orange accent
const levelColors: Record<
  number,
  { bg: string; text: string; border: string; dot: string }
> = {
  // Steps 1-3: Light blue
  1: {
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    border: 'border-primary-200',
    dot: 'bg-primary-400',
  },
  2: {
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    border: 'border-primary-200',
    dot: 'bg-primary-400',
  },
  3: {
    bg: 'bg-primary-50',
    text: 'text-primary-700',
    border: 'border-primary-200',
    dot: 'bg-primary-400',
  },
  // Steps 4-5: Medium blue
  4: {
    bg: 'bg-primary-100',
    text: 'text-primary-800',
    border: 'border-primary-300',
    dot: 'bg-primary-500',
  },
  5: {
    bg: 'bg-primary-100',
    text: 'text-primary-800',
    border: 'border-primary-300',
    dot: 'bg-primary-500',
  },
  // Steps 6-7: Deep blue
  6: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-400',
    dot: 'bg-primary-600',
  },
  7: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-400',
    dot: 'bg-primary-600',
  },
  // Step 8: Orange accent
  8: {
    bg: 'bg-accent-50',
    text: 'text-accent-600',
    border: 'border-accent-200',
    dot: 'bg-accent-500',
  },
};


// ========== Timeline Node ==========

// Helper to extract start date from dateRange (e.g., "2026年07月01日 - 2026年07月10日" -> "07/01")
function extractStartDate(dateRange: string): string {
  const match = dateRange.match(/(\d{4})年(\d{2})月(\d{2})日/);
  if (match) {
    return `${match[2]}/${match[3]}`;
  }
  return '';
}

interface TimelineNodeProps {
  item: CurriculumItem;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function TimelineNode({
  item,
  isActive,
  isCompleted,
  onClick,
}: TimelineNodeProps) {
  const colors = levelColors[item.level];
  const startDate = extractStartDate(item.dateRange);

  const getCircleClasses = () => {
    if (isActive) {
      return cn(
        colors.dot,
        'text-white ring-2 sm:ring-4 ring-offset-1 sm:ring-offset-2 ring-offset-neutral-50',
        item.level === 8 ? 'ring-accent-200' : 'ring-primary-200'
      );
    }
    if (isCompleted) {
      return cn(colors.dot, 'text-white');
    }
    return 'bg-neutral-100 border-2 border-neutral-300 text-neutral-400';
  };

  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg relative z-10"
      aria-label={`第 ${item.level} 堂：${item.title}`}
      aria-current={isActive ? 'step' : undefined}
    >
      {/* Date above circle - hidden on mobile */}
      <span
        className={cn(
          'hidden sm:block text-xs font-medium tabular-nums transition-colors duration-200',
          isActive
            ? 'text-primary-600'
            : isCompleted
              ? 'text-neutral-500'
              : 'text-neutral-400'
        )}
      >
        {startDate}
      </span>

      {/* Circle with step number */}
      <motion.div
        className={cn(
          'w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
          'text-xs sm:text-sm font-semibold transition-all duration-200 relative z-10',
          getCircleClasses()
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      >
        {item.level}
      </motion.div>

      {/* Title below */}
      <div className="text-center max-w-10 sm:max-w-20">
        <span
          className={cn(
            'block text-[8px] sm:text-xs leading-tight transition-colors duration-200',
            isActive
              ? 'font-semibold text-neutral-900'
              : isCompleted
                ? 'text-neutral-600'
                : 'text-neutral-400',
            'group-hover:text-neutral-900'
          )}
        >
          {item.title}
        </span>
      </div>
    </button>
  );
}

// ========== Details Card ==========

interface DetailsCardProps {
  item: CurriculumItem;
}

function DetailsCard({ item }: DetailsCardProps) {
  const colors = levelColors[item.level];

  return (
    <div
      className="p-4 sm:p-5 md:p-6 rounded-xl border border-neutral-200 bg-white"
    >
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-4">
        {/* Step Badge */}
        <span
          className={cn(
            'shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg',
            'text-base font-semibold text-white',
            colors.dot
          )}
        >
          {item.level}
        </span>

        {/* Title & Subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 text-base sm:text-lg">
            {item.title}
          </h3>
          <p className="text-sm text-neutral-500 mt-0.5">{item.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-600 text-sm leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Highlights */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-neutral-900 mb-2">你會學到</p>
        <ul className="space-y-1.5">
          {item.highlights.map((highlight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-neutral-600"
            >
              <span className={cn('shrink-0 mt-0.5', colors.text)}>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      {/* Tools */}
      <p className="text-xs text-neutral-400">工具：{item.tools}</p>

      {/* Step 8 Presentation Banner */}
      {item.isPresentation && (
        <div className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-accent-500 font-semibold text-sm">
              2026年09月28日 台北｜實體成果發表會
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

// ========== Main Component ==========

export function CourseCurriculum() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(
    () => CURRICULUM_ITEMS[activeIndex],
    [activeIndex]
  );

  // Progress percentage: 0% at first node, 100% at last node
  const progressPercentage = useMemo(
    () => (activeIndex / (CURRICULUM_ITEMS.length - 1)) * 100,
    [activeIndex]
  );

  const handleNodeClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="path" className="py-16 sm:py-24 bg-neutral-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-3"
          >
            <span className="text-primary-600">8 堂課程</span>
            ，親手打造屬於自己的餐廳 AI 帝國
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-neutral-600"
          >
            2026年07月01日 開課 → 2026年09月28日 台北｜實體成果發表會
          </motion.p>
        </div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mb-6 sm:mb-8"
        >
          {/* Timeline container - no scroll on mobile */}
          <div className="relative">
            <div className="flex justify-between items-start w-full relative pt-1 pb-2">
              {/* Base Line - behind circles (z-0), positioned at circle center */}
              <div className="absolute top-7 sm:top-9.75 left-3.5 right-3.5 sm:left-5 sm:right-5 h-1.5 sm:h-2.5 bg-neutral-200 rounded-full z-0" />

              {/* Fill Line (animated) - behind circles (z-0) */}
              <motion.div
                className="absolute top-7 sm:top-9.75 left-3.5 sm:left-5 h-1.5 sm:h-2.5 bg-primary-500 rounded-full origin-left z-0"
                initial={false}
                animate={{
                  width: `calc(${progressPercentage}% - ${progressPercentage * 0.28}px)`,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />

              {/* Nodes */}
              {CURRICULUM_ITEMS.map((item, index) => (
                <TimelineNode
                  key={item.level}
                  item={item}
                  isActive={index === activeIndex}
                  isCompleted={index < activeIndex}
                  onClick={() => handleNodeClick(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Details Card - stable position, opacity-only transitions */}
        <div className="grid">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              className="col-start-1 row-start-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <DetailsCard item={activeItem} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 底部 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <p className="text-neutral-600 text-sm">
            準備好開始你的 AI 餐廳數位營運之旅了嗎？
          </p>
        </motion.div>
      </div>
    </section>
  );
}
