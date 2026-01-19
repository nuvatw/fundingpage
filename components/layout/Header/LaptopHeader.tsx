'use client';

import Image from 'next/image';
import Link from 'next/link';
import { UnderlineNav } from '@/components/ui/navigation';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { useSmoothScroll } from '@/lib/hooks/useSmoothScroll';
import { NAV_ITEMS } from '@/lib/data';
import { cn } from '@/lib/utils';

export function LaptopHeader() {
  const activeSection = useActiveSection(NAV_ITEMS);
  const { scrollToSection, scrollToTop } = useSmoothScroll();

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  const handlePlanClick = () => {
    scrollToSection('plans');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left: Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0"
          >
            <Image
              src="/images/logo.png"
              alt="nuva"
              width={100}
              height={36}
              style={{ width: 'auto', height: 'auto' }}
              priority
            />
          </Link>

          {/* Center: Underline Navigation */}
          <nav className="flex justify-center flex-1 px-8">
            <UnderlineNav
              items={NAV_ITEMS}
              activeId={activeSection}
              onSelect={handleNavClick}
            />
          </nav>

          {/* Right: CTA Button */}
          <button
            onClick={handlePlanClick}
            className={cn(
              'inline-flex items-center shrink-0',
              'px-5 py-2 text-sm font-medium',
              'text-white bg-primary-600 hover:bg-primary-700',
              'rounded-lg transition-colors duration-200'
            )}
          >
            選擇方案
          </button>
        </div>
      </div>
    </header>
  );
}
