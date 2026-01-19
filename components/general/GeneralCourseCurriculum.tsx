'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GENERAL_CURRICULUM_ITEMS } from '@/lib/data';
import type { GeneralCurriculumItem } from '@/lib/types';
import { cn } from '@/lib/utils';

// Step colors - blue gradient system for 9 steps
const levelColors: Record<
  number,
  { bg: string; text: string; border: string; dot: string }
> = {
  // Steps 1-3: Light blue (入門階段)
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
  // Steps 4-6: Medium blue (應用階段)
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
  6: {
    bg: 'bg-primary-100',
    text: 'text-primary-800',
    border: 'border-primary-300',
    dot: 'bg-primary-500',
  },
  // Steps 7-9: Deep blue (進階階段)
  7: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-400',
    dot: 'bg-primary-600',
  },
  8: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-400',
    dot: 'bg-primary-600',
  },
  9: {
    bg: 'bg-primary-100',
    text: 'text-primary-900',
    border: 'border-primary-400',
    dot: 'bg-primary-600',
  },
};

// Helper to extract start date from dateRange (e.g., "2026年05月01日 - 2026年05月10日" -> "05/01")
function extractStartDate(dateRange: string): string {
  const match = dateRange.match(/(\d{4})年(\d{2})月(\d{2})日/);
  if (match) {
    return `${match[2]}/${match[3]}`;
  }
  return '';
}

// ========== Timeline Node ==========

interface TimelineNodeProps {
  item: GeneralCurriculumItem;
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
        'text-white ring-4 ring-offset-2 ring-offset-neutral-50 ring-primary-200'
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
      {/* Stage label above circle (only show if no date) */}
      {!startDate && (
        <span
          className={cn(
            'text-[10px] sm:text-xs font-medium transition-colors duration-200',
            isActive
              ? 'text-primary-600'
              : isCompleted
                ? 'text-neutral-500'
                : 'text-neutral-400'
          )}
        >
          {item.stage.replace('階段', '')}
        </span>
      )}

      {/* Circle with step number */}
      <motion.div
        className={cn(
          'w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center',
          'text-sm font-semibold transition-all duration-200 relative z-10',
          getCircleClasses()
        )}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.33, 1, 0.68, 1] }}
      >
        {item.level}
      </motion.div>

      {/* Title below */}
      <div className="text-center max-w-16 sm:max-w-20">
        <span
          className={cn(
            'block text-[10px] sm:text-xs leading-tight transition-colors duration-200',
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
  item: GeneralCurriculumItem;
}

function DetailsCard({ item }: DetailsCardProps) {
  const colors = levelColors[item.level];

  return (
    <div className="p-4 sm:p-5 md:p-6 rounded-xl border border-neutral-200 bg-white">
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

      {/* Deliverable */}
      <div className="p-3 bg-primary-50 border border-primary-100 rounded-lg mb-3">
        <p className="text-sm">
          <span className="font-semibold text-primary-700">課程產出：</span>
          <span className="text-primary-600">{item.deliverable}</span>
        </p>
      </div>

      {/* Tools */}
      <p className="text-xs text-neutral-400">工具：{item.tools}</p>
    </div>
  );
}

// ========== Main Component ==========

export function GeneralCourseCurriculum() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = useMemo(
    () => GENERAL_CURRICULUM_ITEMS[activeIndex],
    [activeIndex]
  );

  // Progress percentage: 0% at first node, 100% at last node
  const progressPercentage = useMemo(
    () => (activeIndex / (GENERAL_CURRICULUM_ITEMS.length - 1)) * 100,
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
            <span className="text-primary-600">9 堂課程</span>
            ，打造你的 AI 技能樹
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-neutral-600 mb-2"
          >
            從入門到進階，每堂課都有可帶走的實用產出
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-sm text-neutral-500"
          >
            5/1 上架 9 堂課・無限觀看・每月額外新增 1 堂
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
          {/* Mobile scroll container */}
          <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
            <div className="inline-flex sm:flex justify-between items-start min-w-[560px] sm:min-w-0 sm:w-full relative pt-1 pb-2">
              {/* Base Line - behind circles (z-0), positioned at circle center */}
              <div className="absolute top-8.75 sm:top-9.75 left-4.5 right-4.5 sm:left-5 sm:right-5 h-2.5 bg-neutral-200 rounded-full z-0" />

              {/* Fill Line (animated) - behind circles (z-0) */}
              <motion.div
                className="absolute top-8.75 sm:top-9.75 left-4.5 sm:left-5 h-2.5 bg-primary-500 rounded-full origin-left z-0"
                initial={false}
                animate={{
                  width: `calc(${progressPercentage}% - ${progressPercentage * 0.36}px)`,
                }}
                transition={{
                  duration: 0.35,
                  ease: [0.33, 1, 0.68, 1],
                }}
              />

              {/* Nodes */}
              {GENERAL_CURRICULUM_ITEMS.map((item, index) => (
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

          {/* Scroll fade indicators (mobile only) */}
          <div className="sm:hidden absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-neutral-50 to-transparent pointer-events-none" />
          <div className="sm:hidden absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-neutral-50 to-transparent pointer-events-none" />
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
            準備好踏上你的 AI 學習之旅了嗎？
          </p>
        </motion.div>
      </div>
    </section>
  );
}
