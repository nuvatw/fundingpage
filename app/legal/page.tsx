'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { LEGAL_TABS, LEGAL_CONTENT, type LegalTab, type LegalTabInfo } from '@/lib/data/legal';
import { cn } from '@/lib/utils';

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

function TabIcon({ icon, className }: { icon: LegalTabInfo['icon']; className?: string }) {
  switch (icon) {
    case 'document':
      return <DocumentIcon className={className} />;
    case 'shield':
      return <ShieldIcon className={className} />;
    case 'camera':
      return <CameraIcon className={className} />;
  }
}

// Parse markdown-style **bold** and render as JSX
function renderMarkdownText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold text-neutral-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

function LegalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab') as LegalTab | null;

  const [activeTab, setActiveTab] = useState<LegalTab>(
    tabParam && LEGAL_TABS.some(t => t.id === tabParam) ? tabParam : 'terms'
  );

  const handleTabChange = (tab: LegalTab) => {
    setActiveTab(tab);
    router.replace(`/legal?tab=${tab}`, { scroll: false });
  };

  useEffect(() => {
    if (tabParam && LEGAL_TABS.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const currentContent = LEGAL_CONTENT[activeTab];
  const currentTabInfo = LEGAL_TABS.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-neutral-500 hover:text-primary-600 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm font-medium">返回首頁</span>
            </Link>
            <Link href="/" className="text-lg font-bold text-primary-600">
              nuva
            </Link>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-14 sm:top-16 z-30 bg-white border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <nav className="flex gap-1 py-2 -mx-1 overflow-x-auto scrollbar-hide">
            {LEGAL_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap transition-all',
                  activeTab === tab.id
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50'
                )}
              >
                <TabIcon icon={tab.icon} className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* Title Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
              <div className="px-6 sm:px-8 py-6 sm:py-8 bg-gradient-to-br from-primary-50 via-white to-white">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary-100 text-primary-600">
                    <TabIcon icon={currentTabInfo.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-neutral-900">
                      {currentContent.title}
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                      最後更新：{currentContent.lastUpdated}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
              <div className="px-6 sm:px-8 py-6">
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {renderMarkdownText(currentContent.content)}
                </p>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-4">
              {currentContent.sections.map((section, index) => (
                <details
                  key={index}
                  className="group bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 cursor-pointer select-none hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold shrink-0">
                        {index + 1}
                      </span>
                      <h2 className="text-base sm:text-lg font-semibold text-neutral-900">
                        {section.title}
                      </h2>
                    </div>
                    <svg
                      className="w-5 h-5 text-neutral-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 sm:px-8 pb-6 pt-2">
                    <div className="pl-10">
                      <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                        {renderMarkdownText(section.content)}
                      </p>
                    </div>
                  </div>
                </details>
              ))}
            </div>

            {/* Contact Footer */}
            <div className="mt-8 p-6 sm:p-8 bg-neutral-100 rounded-2xl text-center">
              <p className="text-sm text-neutral-600">
                如有任何問題，歡迎聯繫我們
              </p>
              <a
                href="mailto:hello@meetnuva.com"
                className="inline-flex items-center gap-2 mt-3 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@meetnuva.com
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function LegalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-500">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>載入中...</span>
        </div>
      </div>
    }>
      <LegalContent />
    </Suspense>
  );
}
