'use client';

import Link from 'next/link';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { SocialContactIcons } from '@/components/ui/social';

const NAV_LINKS = [
  { label: '學習路徑', href: '#path' },
  { label: '學員回饋', href: '#testimonials' },
  { label: '講師介紹', href: '#instructor' },
  { label: '媒體採訪', href: '#media' },
  { label: '方案說明', href: '#plans' },
  { label: '常見問題', href: '#faq' },
];

export function LaptopFooter() {
  const { scrollToTop, scrollToSection } = useSmoothScroll();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    scrollToSection(id);
  };

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top: Brand + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Brand */}
          <div>
            <button onClick={scrollToTop}>
              <span className="text-2xl font-semibold text-primary-400">nuva</span>
            </button>
            <p className="text-neutral-400 mt-2 text-sm">
              nuvaClub 的 AI 學習革命
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Middle: Social + Legal */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SocialContactIcons variant="dark" />
          <Link
            href="/legal"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            相關條款
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </Link>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-6 border-t border-neutral-800 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} nuva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
