'use client';

import { useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/buttons/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const paymentMethod = searchParams.get('payment') || 'credit_card';
  const deadline = searchParams.get('deadline'); // ATM payment deadline
  const confettiTriggered = useRef(false);

  const isATM = paymentMethod === 'atm';

  useEffect(() => {
    // Only trigger confetti once
    if (confettiTriggered.current) return;
    confettiTriggered.current = true;

    // Create confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ['#2563EB', '#3B82F6', '#60A5FA', '#F97316', '#FBBF24'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors,
    });

    // Continuous stream
    frame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          訂購成功！
        </h1>

        {/* Order ID */}
        {orderId && (
          <p className="text-sm text-neutral-500 mb-4">
            訂單編號：{orderId}
          </p>
        )}

        {/* Message */}
        <p className="text-neutral-600 mb-8">
          我們已寄送確認信至您的信箱，<br />
          請留意收件匣。
        </p>

        {/* ATM Payment Deadline Warning */}
        {isATM && deadline && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-start gap-3">
              <svg
                className="w-5 h-5 text-amber-600 shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">匯款期限</p>
                <p className="text-sm text-amber-700 mt-1">
                  請於 <span className="font-semibold">{deadline}</span> 前完成轉帳，逾期訂單將自動取消。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ATM Bank Info */}
        {isATM && (
          <div className="bg-white rounded-xl border border-neutral-200 p-5 mb-6 text-left">
            <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              匯款帳戶資訊
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">銀行名稱</span>
                <span className="font-medium text-neutral-900">台灣銀行（004）</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">分行</span>
                <span className="font-medium text-neutral-900">龍潭分行（2260）</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500">戶名</span>
                <span className="font-medium text-neutral-900">努法有限公司</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-neutral-500">匯款帳號</span>
                <span className="font-mono font-medium text-neutral-900">22600 1009 861</span>
              </div>
            </div>
          </div>
        )}

        {/* Info Card - Steps */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-8 text-left">
          <h3 className="font-semibold text-neutral-900 mb-3">接下來...</h3>
          <ul className="space-y-3 text-sm text-neutral-600">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-semibold shrink-0">
                1
              </span>
              <span>查看信箱中的訂單確認信</span>
            </li>
            {isATM && (
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-semibold shrink-0">
                  2
                </span>
                <span>依據指示完成 ATM 轉帳付款</span>
              </li>
            )}
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-semibold shrink-0">
                {isATM ? '3' : '2'}
              </span>
              <span>等待課程開始通知</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button variant="primary" size="lg" className="w-full">
              回到首頁
            </Button>
          </Link>

          <p className="text-sm text-neutral-500">
            有問題嗎？{' '}
            <a
              href="mailto:support@nuva.ai"
              className="text-primary-600 hover:underline"
            >
              聯絡我們
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback
function SuccessLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}
