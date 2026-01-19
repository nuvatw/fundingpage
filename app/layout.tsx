import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nuva｜有趣、好玩、以作品為核心的 AI 學習社群',
  description:
    'nuva 是一個全球 AI 學習社群品牌，提供企業 AI 轉型內訓、nuvaClub 學習社群、校園 AI 教育計劃。',
  keywords: ['AI 學習', 'AI 課程', 'AI 教育', 'nuva', 'nuvaClub', 'AI 社群'],
  openGraph: {
    title: 'nuva｜AI 學習社群',
    description: '有趣、好玩、以作品為核心的 AI 學習社群',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        {/* 預連接到 Google Fonts 加速字型載入 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS 預解析 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
