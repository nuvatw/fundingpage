'use client';

import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { LaptopHeader } from './LaptopHeader';
import { PhoneHeader } from './PhoneHeader';

export function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? <LaptopHeader /> : <PhoneHeader />;
}
