'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const services = [
  {
    id: 'enterprise',
    title: '企業 AI 轉型內訓',
    description: '透過我們擅長的白話、有趣的教學引導，協助企業內部有效學習 AI 實戰技巧。',
    icon: '🏢',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'nuvaclub',
    title: 'AI 學習社群 nuvaClub',
    description: '透過線上陪伴的互動式學習，讓每個人在同一個工具裡，可以長出自己的一套用法。',
    icon: '🌐',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'campus',
    title: '全國校園計劃',
    description: '每年 nuva 培育超過 100 位校園大使成為 AI 種子人才，定期巡迴 10+ 大專院校進行 AI 專題演講。',
    icon: '🎓',
    color: 'from-green-500 to-green-600',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900">
            我們深耕的 <span className="text-primary-600">3 大領域</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-neutral-600 text-lg max-w-2xl mx-auto mb-16"
        >
          我們更常做的，是把時間留給：討論、拆解、實作。
          <br />
          讓每個人在同一個工具裡，長出自己的用法。
        </motion.p>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative bg-neutral-50 rounded-3xl p-8 h-full hover:bg-neutral-100 transition-colors">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <span className="text-3xl">{service.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Link */}
                <Link
                  href={service.id === 'nuvaclub' ? '/general' : '#'}
                  className="inline-flex items-center gap-2 text-primary-600 font-medium group-hover:gap-3 transition-all"
                >
                  {service.title}
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
