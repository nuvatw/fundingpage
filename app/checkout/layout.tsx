import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '結帳 | nuva AI 餐飲課程',
  description: '完成您的課程訂購',
};

export default function CheckoutLayout({
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
