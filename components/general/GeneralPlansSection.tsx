'use client';

import { motion } from 'motion/react';
import { GeneralPlanCard, GroupPlanCard } from '@/components/ui/plans/GeneralPlanCard';
import { FeatureChecklist } from '@/components/ui/plans/FeatureChecklist';
import { SocialContactIcons } from '@/components/ui/social';
import { CountdownTimer, FUNDRAISING_DEADLINE } from '@/components/ui/CountdownTimer';
import { cn } from '@/lib/utils';

// Plan data
const PLANS = [
  {
    id: 'starter',
    title: '體驗方案',
    duration: '買 1 送 1，共 2 個月',
    price: 'NT$2,400',
    discount: '5 折',
    priceMeta: '月均 $1,200 · 省 $2,400',
  },
  {
    id: 'explorer',
    title: '探索方案',
    duration: '買 2 送 3，共 5 個月',
    price: 'NT$4,800',
    discount: '4 折',
    priceMeta: '月均 $960 · 省 $7,200',
  },
  {
    id: 'master',
    title: '大師方案',
    duration: '買 4 送 8，共 12 個月',
    price: 'NT$9,600',
    discount: '33 折',
    priceMeta: '月均 $800 · 省 $19,200',
    isRecommended: true,
  },
];

// Shared features - what all plans include
const SHARED_FEATURES = [
  '全平台課程無限觀看',
  '每月新增 1 堂 AI 新課',
  '模板 / 講義 / 可套用素材',
  '每月 4 次線上 Live Q&A',
  'Discord 學員社群互助',
  '24/7 線上問答支援',
];

export function GeneralPlansSection() {
  const handleCTAClick = (planId: string) => {
    const checkoutUrl = `/checkout?planId=${planId}&qty=1&returnUrl=${encodeURIComponent(window.location.href)}`;
    window.open(checkoutUrl, '_blank');
  };

  const handleGroupClick = () => {
    window.open('https://line.me/ti/p/@nuva', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="plans" className="py-20 sm:py-28 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - clean hierarchy */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-3"
          >
            買越多送越多
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base text-neutral-500 max-w-lg mx-auto mb-4"
          >
            所有方案內容完全相同，只是買越多送越多
          </motion.p>

          {/* Countdown - blue variant */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex justify-center"
          >
            <CountdownTimer
              targetDate={FUNDRAISING_DEADLINE}
              variant="plans-blue"
            />
          </motion.div>
        </div>

        {/* Plan Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            'grid gap-6 items-stretch',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            'pt-4' // Space for badge overflow
          )}
        >
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="h-full"
            >
              <GeneralPlanCard
                {...plan}
                onCTAClick={() => handleCTAClick(plan.id)}
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="h-full"
          >
            <GroupPlanCard onCTAClick={handleGroupClick} />
          </motion.div>
        </motion.div>

        {/* Shared Features - quiet checklist */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200"
        >
          <FeatureChecklist
            title="所有方案皆包含"
            features={SHARED_FEATURES}
            columns={3}
          />
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-neutral-400 mb-4">
            所有方案皆可開立統一發票 · 5/1 起開始觀看
          </p>
          <SocialContactIcons className="justify-center" />
        </motion.div>
      </div>
    </section>
  );
}
