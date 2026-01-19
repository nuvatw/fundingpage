'use client';

import { useCallback } from 'react';

interface UseSmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { offset = 80, behavior = 'smooth' } = options;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior,
      });

      // Update URL without causing scroll
      if (history.pushState) {
        history.pushState(null, '', `#${sectionId}`);
      }
    },
    [offset, behavior]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, [behavior]);

  return { scrollToSection, scrollToTop };
}
