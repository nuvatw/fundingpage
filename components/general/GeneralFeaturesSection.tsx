'use client';

import { motion } from 'motion/react';

const features = [
  {
    icon: '✍️',
    title: 'AI 文案與內容創作',
    description: '學會用 ChatGPT、Claude 產出高品質文案，從社群貼文到企劃書都能輕鬆完成。',
    tools: ['ChatGPT', 'Claude', 'Perplexity'],
  },
  {
    icon: '🎨',
    title: 'AI 視覺設計',
    description: '用 AI 生成專業級圖像，製作海報、簡報視覺、品牌素材，不需要設計背景。',
    tools: ['Midjourney', 'DALL-E', 'Canva AI'],
  },
  {
    icon: '🌐',
    title: 'AI 網站與工具建置',
    description: '用 AI 輔助建立網站、自動化工作流程，提升 10 倍工作效率。',
    tools: ['Cursor', 'v0', 'n8n'],
  },
  {
    icon: '📊',
    title: 'AI 數據分析',
    description: '用 AI 分析數據、產出報表，讓複雜的數字變成可行動的洞察。',
    tools: ['Code Interpreter', 'Julius AI', 'Excel + AI'],
  },
  {
    icon: '🎬',
    title: 'AI 影音製作',
    description: '從腳本到剪輯，用 AI 工具製作高品質短影片，讓創作變得更簡單。',
    tools: ['Runway', 'CapCut', 'ElevenLabs'],
  },
  {
    icon: '🤖',
    title: 'AI 自動化流程',
    description: '串接各種工具，建立自動化工作流程，把重複性的工作交給 AI。',
    tools: ['n8n', 'Make', 'Zapier'],
  },
];

export function GeneralFeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            你會學到什麼？
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            從文案、設計到自動化，掌握 AI 時代的核心技能
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-5">
                <span className="text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Tools */}
              <div className="flex flex-wrap gap-2">
                {feature.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 bg-white rounded-full text-xs text-neutral-500 border border-neutral-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
