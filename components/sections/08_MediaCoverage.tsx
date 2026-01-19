'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

// 媒體採訪資料
const MEDIA_ITEMS = [
  {
    id: 1,
    outlet: '翻轉教育',
    title: '從私廚到 AI 教育家！nuva 創辦人林上哲：AI 時代核心能力是品味',
    link: 'https://flipedu.parenting.com.tw/article/010515',
    image: '/images/media_01_flipedu.png',
  },
  {
    id: 2,
    outlet: 'SOLER 風格誌',
    title: 'AI世界的盡頭，有品味才稱王？',
    link: 'https://soler.com.tw/coverstorynuva/',
    image: '/images/media_02_soler.png',
  },
  {
    id: 3,
    outlet: 'Digitimes',
    title: 'AI 教育新創 nuva 專題報導',
    link: 'https://www.digitimes.com.tw/tech/dt/n/shwnws.asp?id=0000738408_0J85SVCXLNPR1B9TAAJK2',
    image: '/images/media_03_digitimes.png',
  },
  {
    id: 4,
    outlet: 'Business Insider Taiwan',
    title: '專訪Z世代創業者：把焦慮化成學習燃料',
    link: 'https://www.businessinsider.tw/article/210',
    image: '/images/media_04_businessinsider-tw.png',
  },
  {
    id: 5,
    outlet: 'ESG TIMES',
    title: '讓 AI 助理寫出無須修改的 Mail 非難事',
    link: 'https://esgtimes.com.tw/12420-2/',
    image: '/images/media_05_esgtimes.png',
  },
  {
    id: 6,
    outlet: '創業火苗',
    title: '他邊做私廚邊自學 AI 應用，以零成本打造 AI 教育品牌',
    link: 'https://foundspark.com/case-studies/nuva',
    image: '/images/media_06_startup-spark.png',
  },
];

// Podcast 採訪資料
const PODCAST_ITEMS = [
  {
    id: 1,
    outlet: '換日線關鍵字',
    title: 'Z 世代執行長打造「人人皆可 AI」的未來？',
    link: 'https://podcasts.apple.com/tw/podcast/%E6%8F%9B%E6%97%A5%E7%B7%9A%E9%97%9C%E9%8D%B5%E5%AD%97-ep-113-%EF%BD%9A%E4%B8%96%E4%BB%A3%E5%9F%B7%E8%A1%8C%E9%95%B7%E4%BE%86%E4%BA%86-%E6%9E%97%E4%B8%8A%E5%93%B2%E5%A6%82%E4%BD%95%E5%BE%9E%E9%9B%B6%E9%96%8B%E5%A7%8B%E6%89%93%E9%80%A0-%E4%BA%BA%E4%BA%BA%E7%9A%86%E5%8F%AF-ai-%E7%9A%84%E6%9C%AA%E4%BE%86/id1486227803?i=1000732398384&l=en-GB',
    platform: 'Apple Podcasts',
    image: '/images/podcast_01_huanriline.png',
  },
  {
    id: 2,
    outlet: '經理人',
    title: '從私廚廚師到 AI 講師，自學打造第二人生！',
    link: 'https://podcasts.apple.com/tw/podcast/ep509-%E8%81%B7%E5%A0%B4%E4%BE%86%E4%B8%80%E8%AA%B2-%E5%BE%9E%E7%A7%81%E5%BB%9A%E5%BB%9A%E5%B8%AB%E5%88%B0ai%E8%AC%9B%E5%B8%AB-%E4%BB%96%E7%94%A8%E8%87%AA%E5%AD%B8%E6%89%93%E9%80%A0%E7%AC%AC%E4%BA%8C%E4%BA%BA%E7%94%9F-ai%E5%A6%82%E4%BD%95%E6%94%B9%E8%AE%8A-nuva%E5%89%B5%E8%BE%A6%E4%BA%BA%E6%9E%97%E4%B8%8A%E5%93%B2%E7%9A%84%E4%BA%BA%E7%94%9F/id1591157883?i=1000720525923',
    platform: 'Apple Podcasts',
    image: '/images/podcast_02_manager.png',
  },
  {
    id: 3,
    outlet: '寶博朋友說',
    title: '如何製作你的 AI 女友？',
    link: 'https://podcasts.apple.com/tw/podcast/ep304-%E5%A6%82%E4%BD%95%E8%A3%BD%E4%BD%9C%E4%BD%A0%E7%9A%84ai-%E5%A5%B3%E5%8F%8B-feat-nuva-%E5%89%B5%E8%BE%A6%E4%BA%BA-%E6%9E%97%E4%B8%8A%E5%93%B2/id1484923390?i=1000721733554',
    platform: 'Apple Podcasts',
    image: '/images/podcast_03_baobo.png',
  },
  {
    id: 4,
    outlet: '輕鬆聊 ESG',
    title: 'AI 奇異點來臨前，人類如何與科技共舞？',
    link: 'https://open.spotify.com/episode/2fP41DT3Gplbh499ytXeSC',
    platform: 'Spotify',
    image: '/images/podcast_04_easy-esg.png',
  },
  {
    id: 5,
    outlet: '你也想紅嗎',
    title: 'IG Reels 破千萬流量，只靠「跟 AI 玩耍」',
    link: 'https://podcasts.apple.com/tw/podcast/ep33-ig-reels-%E7%A0%B4%E5%8D%83%E8%90%AC%E6%B5%81%E9%87%8F-%E5%8F%AA%E9%9D%A0-%E8%B7%9F-ai-%E7%8E%A9%E8%80%8D-ft-nuva-%E5%89%B5%E8%BE%A6%E4%BA%BA-%E6%9E%97%E4%B8%8A%E5%93%B2/id1787670641?i=1000727936699',
    platform: 'Apple Podcasts',
    image: '/images/podcast_05_wannago.png',
  },
  {
    id: 6,
    outlet: '義竹數位機會中心',
    title: '撰寫指令的過程，就是在建構問題的答案！',
    link: 'https://podcasts.apple.com/us/podcast/%E6%92%B0%E5%AF%AB%E6%8C%87%E4%BB%A4%E7%9A%84%E9%81%8E%E7%A8%8B%E5%B0%B1%E6%98%AF%E5%9C%A8%E5%BB%BA%E6%A7%8B%E5%95%8F%E9%A1%8C%E7%9A%84%E7%AD%94%E6%A1%88ft-nuva-%E6%9E%97%E4%B8%8A%E5%93%B2/id1587839167?i=1000702087990&l=ru',
    platform: 'Apple Podcasts',
    image: '/images/podcast_06_yizhu-doc.png',
  },
];

export function MediaCoverage() {
  return (
    <section id="media" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-neutral-900 mb-3">
            媒體採訪
          </h2>
          <p className="text-neutral-600">各大媒體專題報導與 Podcast 採訪</p>
        </motion.div>

        {/* Media Logos Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12 py-6 border-y border-neutral-100"
        >
          {/* Desktop: single row */}
          <div className="hidden sm:flex justify-center items-center gap-8">
            {['翻轉教育', 'SOLER 風格誌', 'Digitimes', 'Business Insider', '創業火苗', '經理人', '寶博朋友說'].map(
              (name, i) => (
                <span key={i} className="text-neutral-400 font-medium text-sm">
                  {name}
                </span>
              )
            )}
          </div>
          {/* Mobile: two rows */}
          <div className="flex sm:hidden flex-col items-center gap-3">
            <div className="flex justify-center items-center gap-4">
              {['翻轉教育', 'SOLER 風格誌', 'Digitimes', 'Business Insider'].map(
                (name, i) => (
                  <span key={i} className="text-neutral-400 font-medium text-xs">
                    {name}
                  </span>
                )
              )}
            </div>
            <div className="flex justify-center items-center gap-4">
              {['創業火苗', '經理人', '寶博朋友說'].map((name, i) => (
                <span key={i} className="text-neutral-400 font-medium text-xs">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Article Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 mb-12">
          {MEDIA_ITEMS.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="group block bg-neutral-50 border border-neutral-200 rounded-xl hover:border-primary-200 hover:bg-primary-50/30 transition-all overflow-hidden"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square w-full">
                <Image
                  src={item.image}
                  alt={item.outlet}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-3 sm:p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                    {item.outlet}
                  </span>
                  <svg
                    className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Podcast Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6 text-center flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5 text-primary-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z" />
            </svg>
            Podcast 專訪
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {PODCAST_ITEMS.map((podcast, index) => (
              <motion.a
                key={podcast.id}
                href={podcast.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + index * 0.05 }}
                className="group flex items-start gap-2 sm:gap-4 p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-accent-50/30 border border-primary-100 rounded-xl hover:border-primary-300 hover:shadow-md transition-all"
              >
                {/* Podcast Thumbnail */}
                <div className="shrink-0 w-12 h-12 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden relative group-hover:scale-105 transition-transform">
                  <Image
                    src={podcast.image}
                    alt={podcast.outlet}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs font-semibold text-primary-600">
                      {podcast.outlet}
                    </span>
                    <span className="text-[10px] sm:text-xs text-neutral-400 hidden sm:inline">
                      {podcast.platform}
                    </span>
                  </div>
                  <h4 className="font-medium text-xs sm:text-base text-neutral-900 group-hover:text-primary-700 transition-colors line-clamp-2">
                    {podcast.title}
                  </h4>
                  <p className="text-xs text-primary-600 mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    收聽節目
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA - 媒體採訪聯繫 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 pt-8 border-t border-neutral-100"
        >
          <p className="text-neutral-600 mb-4">
            如果有任何媒體報導 / 採訪邀約，歡迎聯繫我們！
          </p>
          <div className="flex items-center justify-center gap-3">
            {/* Email - 採訪邀約專用主旨 */}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@meetnuva.com&su=%E5%AA%92%E9%AB%94%E6%8E%A1%E8%A8%AA%E9%82%80%E7%B4%84%EF%BD%9C%E8%81%AF%E7%B9%AB%20nuva&body=%E6%82%A8%E5%A5%BD%EF%BC%8C%0A%0A%E6%88%91%E6%98%AF%20xx%20%E5%AA%92%E9%AB%94%EF%BC%8C%E6%83%B3%E9%82%80%E8%AB%8B%E6%9E%97%E4%B8%8A%E5%93%B2%E8%80%81%E5%B8%AB%E6%8E%A1%E8%A8%AA..."
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all grayscale hover:grayscale-0"
              title="寄一封 Email 聯繫我們"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M2 6.5V18a2 2 0 0 0 2 2h2V8.3L12 13l6-4.7V20h2a2 2 0 0 0 2-2V6.5l-2-1.9-4 3.1L12 4 8 7.7l-4-3.1z"/>
                <path fill="#34a853" d="M6 20V8.3l6 4.7V20z"/>
                <path fill="#fbbc04" d="M18 20V8.3l-6 4.7V20z"/>
                <path fill="#ea4335" d="M2 6.5l4 3.1V6.2L4.2 4.5A2 2 0 0 0 2 6.5z"/>
                <path fill="#c5221f" d="M22 6.5l-4 3.1V6.2l1.8-1.7A2 2 0 0 1 22 6.5z"/>
                <path fill="#ea4335" d="M6 6.2v3.4l6 4.7 6-4.7V6.2L12 11z"/>
              </svg>
            </a>
            {/* LINE */}
            <a
              href="https://lin.ee/DckeaXe"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all grayscale hover:grayscale-0"
              title="透過 Line 官方帳號聯繫我們"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#06C755">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/nuva.now/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-all grayscale hover:grayscale-0"
              title="透過 Instagram 私訊我們"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ig-gradient-media" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFDC80" />
                    <stop offset="25%" stopColor="#F77737" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="75%" stopColor="#C13584" />
                    <stop offset="100%" stopColor="#833AB4" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#ig-gradient-media)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
