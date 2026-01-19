'use client';

import { motion } from 'motion/react';

interface ComparisonData {
  rowTitle: string;
  leftBullets: string[];
  rightBullets: string[];
}

export function ComparisonSection() {
  const comparisons: ComparisonData[] = [
    {
      rowTitle: '學習方式',
      leftBullets: [
        '東看一點、西學一點',
        '資訊零散，越學越迷惘',
        '沒有完整學習路線',
      ],
      rightBullets: [
        '9 堂完整課程設計',
        '90 天打造七位 AI 助理',
        '從零到能落地應用',
      ],
    },
    {
      rowTitle: '支援方式',
      leftBullets: [
        '卡住只能自己爬文',
        '問題無人解答易放棄',
        '學習進度難以追蹤',
      ],
      rightBullets: [
        '助教 24 小時即時支援',
        '主動關心你的學習狀況',
        '陪你一起完成專屬 AI',
      ],
    },
    {
      rowTitle: '實戰應用',
      leftBullets: [
        '學了很多但不知如何用',
        '缺乏餐飲業實際案例',
        '理論與實務難以結合',
      ],
      rightBullets: [
        '針對餐飲痛點設計課程',
        '每堂課都有實作產出',
        '學完馬上用在自家餐廳',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white pb-24 sm:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900">
            網路自學 AI vs <span className="text-primary-600">餐飲界的 AI 革命</span>
          </h2>
        </motion.div>

        {/* Desktop Table (≥ md) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="border border-neutral-200 rounded-lg overflow-hidden shadow-xs">
            {/* Table Header */}
            <div className="grid grid-cols-[100px_1fr_1fr] lg:grid-cols-[120px_1fr_1fr]">
              <div className="p-4 bg-neutral-50 border-b border-neutral-200" />
              <div className="p-4 text-center border-l border-b border-neutral-200 bg-neutral-50">
                <span className="text-sm font-semibold text-neutral-600">
                  網路自學 AI
                </span>
              </div>
              <div className="p-4 text-center border-l border-b border-neutral-200 bg-primary-50">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-semibold text-primary-800">
                    餐飲界的 AI 革命
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
                    推薦
                  </span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            {comparisons.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-[100px_1fr_1fr] lg:grid-cols-[120px_1fr_1fr] ${
                  index !== comparisons.length - 1 ? 'border-b border-neutral-200' : ''
                }`}
              >
                {/* Row Header */}
                <div className="p-4 lg:p-5 flex items-center bg-neutral-50/50 border-r border-neutral-100">
                  <span className="text-sm font-semibold text-neutral-700">
                    {item.rowTitle}
                  </span>
                </div>

                {/* Left Column - Self Learning */}
                <div className="p-4 lg:p-5 border-l border-neutral-200">
                  <ul className="space-y-2">
                    {item.leftBullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-neutral-500"
                      >
                        <span className="text-neutral-400 mt-0.5">–</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column - AI Revolution (Highlighted) */}
                <div className="p-4 lg:p-5 border-l border-neutral-200 bg-primary-50">
                  <ul className="space-y-2">
                    {item.rightBullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <svg
                          className="w-4 h-4 text-primary-600 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Layout - Per Dimension Cards (< md) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:hidden space-y-4 pb-safe"
        >
          {comparisons.map((item, index) => (
            <div
              key={index}
              className="border border-neutral-200 rounded-lg overflow-hidden shadow-xs"
            >
              {/* Dimension Title */}
              <div className="bg-neutral-100 px-4 py-3 border-b border-neutral-200">
                <span className="text-sm font-semibold text-neutral-800">
                  {item.rowTitle}
                </span>
              </div>

              {/* Comparison Content - Stacked */}
              <div className="divide-y divide-neutral-200">
                {/* Self Learning AI - Weaker Visual */}
                <div className="p-4 bg-neutral-50/50">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                      網路自學 AI
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.leftBullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-neutral-500"
                      >
                        <span className="text-neutral-400 mt-0.5">–</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI Revolution - Stronger Visual */}
                <div className="p-4 bg-primary-50">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
                      餐飲界的 AI 革命
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-primary-100 text-primary-700">
                      推薦
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {item.rightBullets.map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <svg
                          className="w-4 h-4 text-primary-600 shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
