'use client';

import Link from 'next/link';

export function BrandFooter() {
  return (
    <footer id="contact" className="bg-neutral-900 text-white py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Brand */}
          <div>
            <Link href="/" className="text-3xl font-bold">
              nuva
            </Link>
            <p className="text-white/60 mt-4 max-w-md leading-relaxed">
              科技可以走得很快，但你的品味，才能決定世界前進的方向。
            </p>

            <div className="mt-8 space-y-2 text-sm text-white/50">
              <p>努法有限公司（nuva Co., Ltd.）</p>
              <p>統一編號：93616776</p>
              <p>
                <a href="mailto:hello@meetnuva.com" className="hover:text-white transition-colors">
                  hello@meetnuva.com
                </a>
              </p>
            </div>
          </div>

          {/* Right - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">聯繫管道</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a
                    href="https://instagram.com/meetnuva"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-white transition-colors"
                  >
                    Line
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">服務</h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link href="/general" className="hover:text-white transition-colors">
                    nuvaClub
                  </Link>
                </li>
                <li>
                  <Link href="/restaurant" className="hover:text-white transition-colors">
                    餐飲 AI 課程
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/40">
          版權所有 © 2026 nuva 保留所有權利
        </div>
      </div>
    </footer>
  );
}
