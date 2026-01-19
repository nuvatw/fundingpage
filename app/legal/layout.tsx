import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '法律條款 | nuva',
  description: 'nuva 服務條款、隱私權政策與肖像權使用政策',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {children}
    </div>
  );
}
