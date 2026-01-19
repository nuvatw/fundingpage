'use client';

import { BrandHeader, BrandFooter } from '@/components/home';

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BrandHeader />
      <main>{children}</main>
      <BrandFooter />
    </>
  );
}
