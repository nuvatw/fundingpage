'use client';

import { useState, useEffect } from 'react';
import type { NavItem } from '@/lib/types';

export function useActiveSection(sections: NavItem[]) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px',
          threshold: 0,
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return activeId;
}
