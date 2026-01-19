'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { LaptopFooter } from './LaptopFooter';
import { PhoneFooter } from './PhoneFooter';

export function Footer() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? <LaptopFooter /> : <PhoneFooter />;
}
