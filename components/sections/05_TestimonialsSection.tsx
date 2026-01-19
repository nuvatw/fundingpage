'use client';

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatarSeed: string;
  content: string;
  gender: 'male' | 'female';
}

// 9 位學員心得（男 4 女 5，全社會人士）
// 職業根據回饋文字推敲
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: '小安',
    role: '活動企劃', // 對幽默風趣特別有感
    avatarSeed: 'xiaoan-f',
    gender: 'female',
    content:
      '我真的沒有見過上哲老師這麼活潑的 AI 老師，而且還有幽默，不當脫口秀演員有點可惜（？）',
  },
  {
    id: 2,
    name: 'Kevin',
    role: '商業分析師', // 商學院背景
    avatarSeed: 'kevin-m',
    gender: 'male',
    content:
      '我是商學院的孩子，上哲的比喻一直都很生動，複雜的概念都被他拆解的很好理解，大推一個！',
  },
  {
    id: 3,
    name: '阿傑',
    role: '企業培訓師', // 會二刷課程、重視學習品質
    avatarSeed: 'ajie-m',
    gender: 'male',
    content: '我有些課程都還會二刷，上哲寫的課程含金量真的爆表...',
  },
  {
    id: 4,
    name: '小婷',
    role: '護理師', // 「上哲一生推」→ 醫療背景
    avatarSeed: 'xiaoting-f',
    gender: 'female',
    content:
      '把 AI 教好已經是一個不容易的事情，在 nuva 甚至是一場難忘的學習體驗，推薦給想把 AI 學好的學弟妹，上哲一生推。',
  },
  {
    id: 5,
    name: '威廷',
    role: '人資主管', // 在意教學設計和助教配置
    avatarSeed: 'weiting-m',
    gender: 'male',
    content:
      '現在應該很少有一門課程會請這麼多的助教一起學習，上哲的授課節奏也很風趣，完全不會有無聊的感覺，反而會有點可惜時間不夠長？',
  },
  {
    id: 6,
    name: 'Mia',
    role: '自由接案設計師', // 買過很多課、重視實戰
    avatarSeed: 'mia-f',
    gender: 'female',
    content:
      '我買過很多課都只是教皮毛，上哲直接把肉端在你面前，一開始有點不習慣這麼暴力，但真的好好用我的媽呀',
  },
  {
    id: 7,
    name: '小米',
    role: '行政專員', // 做出 AI 自動化系統
    avatarSeed: 'xiaomi-f',
    gender: 'female',
    content:
      '我沒有想過 ChatGPT 用的爛爛的我，也可以做出自己的 AI 自動化系統，上哲賽高 OAQ',
  },
  {
    id: 8,
    name: 'Emily',
    role: '品牌總監', // 措辭正式專業
    avatarSeed: 'emily-f',
    gender: 'female',
    content: '只能說是令人印象深刻，與市面上截然不同的一場課程體驗。',
  },
  {
    id: 9,
    name: '阿翔',
    role: '新創創辦人', // 「更新腦袋版本」→ 技術思維
    avatarSeed: 'axiang-m',
    gender: 'male',
    content:
      '每次上上哲老師的課，都很像被強制更新了腦袋的版本，真的是大開眼界啊啊！',
  },
];

function FlipCard({ testimonial }: { testimonial: Testimonial }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // 10 秒後自動翻回正面
  useEffect(() => {
    if (!isFlipped) return;

    const timer = setTimeout(() => {
      setIsFlipped(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isFlipped]);

  // 使用 DiceBear API 生成頭像 - 統一使用 big-smile 風格（開心表情）
  // 根據性別使用不同背景色區分
  const bgColor = testimonial.gender === 'female' ? 'ffd5dc,ffdfbf,f8d9e0' : 'b6e3f4,c0aede,d1d4f9';
  const avatarUrl = `https://api.dicebear.com/9.x/big-smile/svg?seed=${testimonial.avatarSeed}&backgroundColor=${bgColor}`;

  return (
    <div
      className="relative w-full h-36 sm:h-48 lg:h-52 cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 正面 - Profile（手機直向、桌面橫向）*/}
        <div
          className="absolute inset-0 rounded-xl bg-white shadow-md border border-neutral-100 overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* 手機版：直向佈局 */}
          <div className="flex sm:hidden flex-col items-center justify-center h-full py-3 px-2 gap-2">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-primary-100">
              <img
                src={avatarUrl}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <h4 className="text-sm font-semibold text-neutral-900 leading-tight">
                {testimonial.name}
              </h4>
              <p className="text-xs text-neutral-500 leading-tight">
                {testimonial.role}
              </p>
            </div>
            <p className="text-[10px] text-primary-400">點擊查看</p>
          </div>

          {/* 桌面版：橫向佈局 */}
          <div className="hidden sm:flex items-center h-full px-4 sm:px-6 lg:px-8 gap-4">
            <div className="relative w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full overflow-hidden shrink-0 ring-2 ring-primary-100">
              <img
                src={avatarUrl}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-900">
                {testimonial.name}
              </h4>
              <p className="text-sm sm:text-base lg:text-lg text-neutral-500">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>

        {/* 背面 - Testimonial */}
        <div
          className="absolute inset-0 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 shadow-md overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center h-full px-4 sm:px-6">
            {/* Quote Icon */}
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white/30 shrink-0 mr-3 self-start mt-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>

            {/* Content */}
            <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed">
              {testimonial.content}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900">
            學員真實回饋
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600">點擊卡片看看他們怎麼說</p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2.5 sm:gap-4 lg:gap-5"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="w-[calc(50%-5px)] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-14px)]"
            >
              <FlipCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
