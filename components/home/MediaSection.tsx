'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

const mediaItems = [
  {
    id: 1,
    title: '翻轉教育專訪｜從私廚到 AI 教育家：AI 時代核心能力是品味',
    source: '翻轉教育 / 親子天下',
    image: '/media/flip-education.jpg',
    url: '#',
  },
  {
    id: 2,
    title: 'SOLER 封面故事｜AI 世界的盡頭，有品味才稱王？',
    source: 'SOLER',
    image: '/media/soler.jpg',
    url: '#',
  },
  {
    id: 3,
    title: 'ESG Times 專訪｜「奇異點」降臨時 AI 將全面接管人類世界？',
    source: 'ESG Times',
    image: '/media/esg-times.jpg',
    url: '#',
  },
];

export function MediaSection() {
  return (
    <section className="py-20 sm:py-28 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            專訪與封面故事
          </h2>
          <p className="text-neutral-600 text-lg">
            來自不同媒體視角，關於 AI、教育與永續的深度對話。
          </p>
        </motion.div>

        {/* Media Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {mediaItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={item.url} className="block">
                {/* Image */}
                <div className="aspect-[4/3] rounded-2xl bg-neutral-200 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 group-hover:scale-105 transition-transform duration-500" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-sm">
                  {item.source}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
