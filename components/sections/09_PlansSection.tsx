'use client';

import { motion } from 'motion/react';
import { SimplePlanCard } from '@/components/ui/plans/SimplePlanCard';
import { FeatureChecklist } from '@/components/ui/plans/FeatureChecklist';
import { SocialContactIcons } from '@/components/ui/social';
import { PLANS_V2 } from '@/lib/data';
import { cn } from '@/lib/utils';

// Simplified display data derived from PLANS_V2
const PLAN_DISPLAY_DATA = PLANS_V2.map((plan) => ({
  id: plan.id,
  title: plan.title,
  subtitle: plan.subtitle,
  price: plan.price,
  priceMeta: plan.priceNote,
  badge: plan.badge,
  isRecommended: plan.isRecommended,
  ctaText: plan.ctaText,
  ctaLink: plan.ctaLink,
}));

// Shared features - what all paid plans include
const SHARED_FEATURES = [
  '全平台影片課程（持續更新）',
  'AI 工具模板與 Prompt 庫',
  '每週線上 Q&A 直播',
  'Discord 社群討論',
  '專屬學員 Notion 資源庫',
  '結業證書',
];

interface PlansSectionProps {
  locked?: boolean;
}

export function PlansSection({ locked = true }: PlansSectionProps) {
  const handleCTAClick = (plan: (typeof PLAN_DISPLAY_DATA)[0]) => {
    if (locked && plan.id !== 'free' && plan.id !== 'group') {
      return;
    }
    // External links open in new tab
    if (plan.id === 'free' || plan.id === 'group') {
      window.open(plan.ctaLink, '_blank', 'noopener,noreferrer');
    } else {
      const checkoutUrl = `/checkout?planId=${plan.id}&qty=1&returnUrl=${encodeURIComponent(window.location.href)}`;
      window.open(checkoutUrl, '_blank');
    }
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
            選擇適合你的方案
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-base text-neutral-500 max-w-lg mx-auto"
          >
            從影片自學到 90 天落地導入，依你的節奏選擇
          </motion.p>
        </div>

        {/* Plan Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={cn(
            'grid gap-6 items-start',
            // 4 plans: 2x2 on tablet, 4 columns on desktop
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            // Add top padding for badge overflow
            'pt-4'
          )}
        >
          {PLAN_DISPLAY_DATA.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <SimplePlanCard
                {...plan}
                locked={locked && plan.id !== 'free' && plan.id !== 'group'}
                onCTAClick={() => handleCTAClick(plan)}
              />
            </motion.div>
          ))}
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
            title="所有付費方案皆包含"
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
            所有方案皆可開立統一發票 · 企業團報另有優惠
          </p>
          <SocialContactIcons className="justify-center" />
        </motion.div>
      </div>
    </section>
  );
}
