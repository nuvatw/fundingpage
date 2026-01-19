'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/buttons';
import { ContactModal } from '@/components/ui/modals';
import { SocialContactIcons } from '@/components/ui/social';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { useFundraising } from '@/lib/hooks/useFundraising';

// Progress Circle Component - 縮小到 56-64px（嘖嘖風格）
function ProgressCircle({ percentage }: { percentage: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  // Cap at 100% for display, but show actual percentage in text
  const displayProgress = Math.min(percentage, 100);
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="relative w-14 h-14 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 50 50">
        {/* Background circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#E5E5E5"
          strokeWidth="3"
        />
        {/* Progress circle */}
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-semibold text-primary-600">{percentage}%</span>
      </div>
    </div>
  );
}

// Funding Status Module - 嘖嘖風格：左圈右三列，更緊湊
function FundingStatus({ data, isLoading }: {
  data: { percentage: number; targetDisplay: string; supporters: number; daysRemaining: number } | null;
  isLoading: boolean;
}) {
  // Show skeleton while loading
  if (isLoading || !data) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-neutral-200 animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="w-16 h-3 bg-neutral-200 rounded animate-pulse" />
          <div className="w-20 h-4 bg-neutral-200 rounded animate-pulse" />
          <div className="w-20 h-4 bg-neutral-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Progress Circle */}
      <ProgressCircle percentage={data.percentage} />

      {/* Stats - 三列緊湊排列 */}
      <div className="flex flex-col gap-1">
        <p className="text-xs text-neutral-400">目標 {data.targetDisplay}</p>
        <p className="text-sm font-medium text-neutral-700">{data.supporters} 人支持</p>
        <p className="text-sm font-medium text-neutral-700">剩餘 {data.daysRemaining} 天</p>
      </div>
    </div>
  );
}

// Format deadline date for display
function formatDeadline(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
}

// Video Player with Play Overlay - 圓角改小（嘖嘖風格 12px）
function HeroVideo({ isPlaying, onPlay }: { isPlaying: boolean; onPlay: () => void }) {
  if (isPlaying) {
    return (
      <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
        {/* Replace with actual video embed URL */}
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
          title="募資影片"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onPlay}
    >
      {/* Thumbnail placeholder - replace with actual poster */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/50" />

      {/* Video thumbnail placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white/60">
          <svg className="w-20 h-20 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">募資影片</p>
        </div>
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
          <svg
            className="w-10 h-10 text-slate-900 ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { scrollToSection } = useSmoothScroll();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { data: fundraisingData, isLoading: fundraisingLoading } = useFundraising();

  const handleJoinPlan = () => {
    scrollToSection('path');
  };

  return (
    <>
      <section
        id="hero"
        className="relative min-h-screen flex flex-col pt-20 pb-24 md:pb-8 bg-white"
      >
        <div className="flex-1 flex items-center max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Desktop: Two Column Layout - 嘖嘖風格 66/34 */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* Left Column: Video (66% on desktop) */}
            <div className="lg:col-span-2 order-1">
              <HeroVideo
                isPlaying={isVideoPlaying}
                onPlay={() => setIsVideoPlaying(true)}
              />
            </div>

            {/* Right Column: Info Panel (34% on desktop) - 嘖嘖風格資訊欄 */}
            <div className="lg:col-span-1 order-2 flex flex-col">
              {/* 類別/提案人 */}
              <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                <span>科技</span>
                <span>•</span>
                <span>nuva 提案</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-semibold text-neutral-900 leading-tight tracking-tight mb-2">
                台灣餐飲界的 AI 革命
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-neutral-600 mb-4">
                90 天導入 AI，產出可衡量的業務成效報告
              </p>

              {/* 分隔線 */}
              <div className="border-t border-neutral-100 my-3" />

              {/* Funding Status - 無卡片框 */}
              <FundingStatus data={fundraisingData} isLoading={fundraisingLoading} />

              {/* 分隔線 */}
              <div className="border-t border-neutral-100 my-3" />

              {/* Description */}
              <p className="text-sm text-neutral-600 leading-relaxed mb-2 line-clamp-4">
                在 90 天內，用可落地的流程把 AI 變成餐廳的副店長：協助行銷內容、回覆顧客、整理營運數據，讓店務更省力、更可控。
              </p>

              {/* 截止日期 */}
              <p className="text-xs text-neutral-400 mb-4">
                募資截止：{fundraisingData ? formatDeadline(fundraisingData.deadline) : '載入中...'}
              </p>

              {/* 分隔線 */}
              <div className="border-t border-neutral-100 my-3" />

              {/* CTA Button - Desktop */}
              <div className="hidden md:block mb-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleJoinPlan}
                  className="w-full rounded-lg shadow-sm hover:shadow-md"
                >
                  加入計劃
                </Button>
              </div>

              {/* Contact + Social - 同一列 */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="text-sm text-neutral-500 hover:text-primary-600 transition-colors font-medium"
                >
                  聯絡我們
                </button>
                <SocialContactIcons />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Mobile Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-neutral-200 p-4 safe-area-inset">
        <Button
          variant="primary"
          size="lg"
          onClick={handleJoinPlan}
          className="w-full rounded-lg shadow-sm"
        >
          加入計劃
        </Button>
      </div>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
