'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

// 完整經歷時間軸 2024-2026
const FULL_TIMELINE: Record<string, { flag: string; org: string; title: string }[]> = {
  '2024.04': [
    { flag: '🇹🇼', org: 'SilverTech', title: 'AI 顧問' },
    { flag: '🇹🇼', org: '南山人壽', title: '台中分公司：內勤數位轉型培訓' },
  ],
  '2024.05': [
    { flag: '🇹🇼', org: '南山人壽', title: '113 年南山創意提案比賽：參賽選手培訓' },
    { flag: '🇹🇼', org: '南山人壽', title: '113 年南山創意提案比賽：評審團' },
    { flag: '🇹🇼', org: 'NVIDIA', title: '台北科技大學 Watch Play：主持人' },
    { flag: '🇹🇼', org: 'NVIDIA', title: '台北科技大學 AI 主題演講：AI 大學生的應用' },
  ],
  '2024.06': [
    { flag: '🇯🇵', org: '日本大阪中華総会青年部', title: 'AI 時代必學：ChatGPT 的潛能解放' },
  ],
  '2024.07': [
    { flag: '🇹🇼', org: '關懷基金會', title: 'ChatGPT 企業加速培訓班' },
    { flag: '🇹🇼', org: '嘉義縣義竹數位機會中心', title: 'AI 新趨勢搶先看' },
    { flag: '🇹🇼', org: 'Goflow 慕學堂', title: '當 AI 成為家長的助力！' },
    { flag: '🇹🇼', org: '雜學校', title: '國際思辨教育論壇：主持人' },
    { flag: '🇹🇼', org: '台灣領導未來協會', title: '未來社會與領導力培訓營：人工智能負責講師' },
  ],
  '2024.08': [
    { flag: '🇹🇼', org: '富籌者聯盟', title: '用 AI 打出標案全壘打' },
    { flag: '🇹🇼', org: '知識衛星', title: 'Notion 專案工作流' },
    { flag: '🇹🇼', org: '動區塊聚', title: '從知道 AI 到懂 AI！AI 工具＆AIGC 實戰技巧' },
  ],
  '2024.09': [
    { flag: '🇹🇼', org: '臺北市政府產業發展局', title: '活用 ChatGPT：最高工作力' },
  ],
  '2024.10': [
    { flag: '🇹🇼', org: '鹽埕研究社', title: '在地商家的 AI 轉型趨勢談' },
  ],
  '2024.11': [
    { flag: '🇹🇼', org: '第二屆台北設計週', title: 'AI 與設計師' },
    { flag: '🇹🇼', org: 'TEDx 竹北', title: 'AI 不難，還不是時候害怕。' },
    { flag: '🇹🇼', org: '智卉心媒體 × 高師大事經系友會', title: '高效寫信的專屬 AI 助理' },
    { flag: '🇹🇼', org: '統一超商', title: 'AI 數位趨勢應用工作坊' },
  ],
  '2025.01': [
    { flag: '🇹🇼', org: 'NVIDIA', title: 'Stable Diffusion 體驗營：主講師' },
  ],
  '2025.02': [
    { flag: '🇹🇼', org: 'Kronos Research', title: 'Kronos Research AI Summit 2025：Panel Speaker' },
  ],
  '2025.04': [
    { flag: '🇹🇼', org: '高雄 YS 青年職業發展中心', title: 'Stable Diffusion 深層式 AI 圖片的底層邏輯' },
  ],
  '2025.05': [
    { flag: '🇹🇼', org: '販奇網 × 全國廣播電台', title: 'ChatGPT 的職場應用課' },
    { flag: '🇹🇼', org: '太平洋崇陽百貨（中壢店）', title: 'ChatGPT 的基礎與應用' },
    { flag: '🇹🇼', org: 'Root（新加坡服飾品牌）', title: 'ChatGPT 的底層邏輯與商務應用' },
    { flag: '🇹🇼', org: '台南市建築經營協會', title: 'AI 實作實戰工作坊' },
    { flag: '🇹🇼', org: '哈媽去溜達', title: 'ChatGPT & Make：初階與進階（中小企業應用）' },
  ],
  '2025.06': [
    { flag: '🇹🇼', org: '台北市政府', title: '資訊初階：公務文宣圖卡設計與應用研習班' },
    { flag: '🇹🇼', org: '台北市青年局', title: 'AI 工具助力青年職場競爭力' },
    { flag: '🇹🇼', org: '台北市政府', title: 'LINE AI 機器人實作實戰班' },
    { flag: '🇹🇼', org: '台北市政府', title: '公務人員訓練：AI 資源與應用' },
  ],
  '2025.07': [
    { flag: '🇹🇼', org: '台北市政府', title: '公務人員訓練：精準 AI 對話關鍵' },
    { flag: '🇹🇼', org: '未來經理人', title: '經理來一課' },
    { flag: '🇹🇼', org: '安達人壽', title: '激發 AI 的內在動力' },
    { flag: '🇹🇼', org: '經理人', title: '職場來一課' },
  ],
  '2025.08': [
    { flag: '🇹🇼', org: '臺北市政府交通局', title: '114 年人本永續交通研習班' },
    { flag: '🇹🇼', org: '台北捷運公司', title: 'AI 視覺化報告製作輔助實務班' },
    { flag: '🇹🇼', org: '公共衛生師公會', title: 'ChatGPT 數位趨勢應用工作坊' },
  ],
  '2025.09': [
    { flag: '🇹🇼', org: '未來經理人', title: '解構科技的底層邏輯，非技術主管也能打造 AI 助理' },
    { flag: '🇹🇼', org: '台中廣播電台', title: 'ChatGPT 企業加速培訓班' },
    { flag: '🇮🇩', org: 'SVO.ai', title: 'Focus on the Real Work' },
    { flag: '🇯🇵', org: 'Asia Tour', title: '讓 AI 真的有用' },
    { flag: '🇹🇼', org: '亞洲創作者大會', title: 'AI 與自媒體經濟的未來：AI 是產業推手，還是劊子手？' },
  ],
  '2025.11': [
    { flag: '🇹🇼', org: '東海大學智慧轉型中心', title: '2025 必學兩大神技：解鎖 AI 溝通力與串接力！' },
    { flag: '🇹🇼', org: '經理人', title: '打造 AI 自動化工作流' },
  ],
  '2025.12': [
    { flag: '🇹🇼', org: 'ACCUPASS 年會', title: 'AI：今天學、今天用、今天見效' },
    { flag: '🇹🇼', org: '竹北大師講堂', title: '不可能只會 ChatGPT 吧？' },
    { flag: '🇹🇼', org: '扶輪社', title: '生命橋樑助學計劃：AI 趨勢 2026' },
    { flag: '🇹🇭', org: 'Thaiwan', title: 'How AI affect Our Daily Work?' },
  ],
  '2026.01': [
    { flag: '🇹🇼', org: '工業技術研究院', title: 'AI 時代必學：ChatGPT 的潛能解放' },
    { flag: '🇹🇼', org: 'Yourator 年會', title: 'AI 能歌善舞——那人類還剩下什麼？' },
  ],
};

// 數據卡片資料
const METRIC_CARDS = [
  { number: '60+', label: '百人演講＆工作坊' },
  { number: '8000+', label: '授課學員' },
];

// 數據卡片組件
function MetricCard({
  number,
  label,
  delay,
}: {
  number: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white/90 backdrop-blur-sm border border-black/6 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 sm:p-8 flex flex-col justify-center min-h-30 sm:min-h-35 lg:min-h-38 transition-all duration-200 ease-out hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 motion-reduce:transition-none"
    >
      <p className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-neutral-900 leading-none tracking-tight">
        {number}
      </p>
      <p className="text-sm sm:text-[15px] font-medium text-neutral-500 mt-2">
        {label}
      </p>
    </motion.div>
  );
}

export function InstructorExperience() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="instructor-credentials" className="bg-neutral-50">
      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-10 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-2">
            講師經歷
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base">
            橫跨台灣、日本、新加坡、印尼的 AI 教學足跡
          </p>
        </motion.div>
      </div>

      {/* Credentials Hero: Full-width BG + Overlay Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative w-full"
      >
        {/* Full-width Background Image */}
        <div className="relative w-full aspect-video sm:aspect-21/9 lg:aspect-3/1">
          <Image
            src="/images/teacher_career.jpg"
            alt="講師在活動現場進行 AI 教學"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {/* Gradient overlay for better card readability */}
          <div className="absolute inset-0 bg-linear-to-l from-black/40 via-black/20 to-transparent" />
        </div>

        {/* Overlay Metric Cards - positioned on right */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="flex flex-col gap-3 sm:gap-4 pr-4 sm:pr-8 lg:pr-16 xl:pr-24">
            {METRIC_CARDS.map((card, i) => (
              <MetricCard
                key={i}
                number={card.number}
                label={card.label}
                delay={0.1 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* View Full Timeline Button */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 py-2.5 px-5 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-sm font-medium text-neutral-700"
          >
            <span>展開完整經歷</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Timeline Modal */}
      <TimelineModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

// Timeline Modal 組件
function TimelineModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const timelineKeys = Object.keys(FULL_TIMELINE).sort();

  // 防止背景滾動
  if (typeof window !== 'undefined') {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop - 暗化 + 模糊 */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-100 px-5 py-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900">完整經歷</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto max-h-[calc(80vh-120px)] px-5 py-4">
              <div className="space-y-3">
                {timelineKeys.map((monthKey) => (
                  <div key={monthKey}>
                    {/* Month Header */}
                    <p className="text-xs font-semibold text-primary-600 mb-1.5">
                      {monthKey}
                    </p>
                    {/* Events */}
                    <div className="space-y-1 pl-2 border-l-2 border-primary-100">
                      {FULL_TIMELINE[monthKey].map((event, i) => (
                        <div key={i} className="flex items-start gap-1.5 pl-2 py-0.5">
                          <span className="text-sm shrink-0">{event.flag}</span>
                          <div className="min-w-0">
                            <p className="text-[11px] text-neutral-500 leading-tight">{event.org}</p>
                            <p className="text-xs text-neutral-800 leading-snug">{event.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-100 px-5 py-3 text-center">
              <p className="text-xs text-neutral-400">點擊任意處關閉</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
