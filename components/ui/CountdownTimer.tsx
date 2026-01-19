'use client';

import { useState, useEffect, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

interface CountdownTimerProps {
  targetDate: Date;
  variant?: 'hero' | 'plans' | 'plans-blue' | 'inline';
  className?: string;
}

export function CountdownTimer({
  targetDate,
  variant = 'hero',
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(targetDate)
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn('animate-pulse', className)}>
        <div className="h-16 bg-neutral-200 rounded-lg" />
      </div>
    );
  }

  if (timeLeft.isExpired) {
    return (
      <div
        className={cn(
          'text-center py-3 px-4 rounded-xl bg-neutral-100 text-neutral-500',
          className
        )}
      >
        募資已結束
      </div>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: '天' },
    { value: timeLeft.hours, label: '時' },
    { value: timeLeft.minutes, label: '分' },
    { value: timeLeft.seconds, label: '秒' },
  ];

  // Inline variant - subtle, single line, doesn't compete with cards
  if (variant === 'inline') {
    return (
      <p className={cn('text-sm text-neutral-500', className)}>
        <span className="text-neutral-400">募資倒數</span>
        <span className="mx-2">·</span>
        <span className="tabular-nums font-medium text-neutral-600">
          {timeLeft.days} 天 {String(timeLeft.hours).padStart(2, '0')}:
          {String(timeLeft.minutes).padStart(2, '0')}:
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span className="mx-2">·</span>
        <span className="text-neutral-400">2/28 截止</span>
      </p>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={cn('', className)}>
        <p className="text-sm text-neutral-500 mb-2 text-center">募資倒數</p>
        <div className="flex items-center justify-center gap-2">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-900 text-white rounded-lg flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-neutral-500 mt-1">
                  {unit.label}
                </span>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-2xl font-bold text-neutral-300 -mt-5">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-400 mt-3 text-center">
          2/28 23:59 截止
        </p>
      </div>
    );
  }

  // variant === 'plans-blue'
  if (variant === 'plans-blue') {
    return (
      <div
        className={cn(
          'flex items-center justify-center gap-3 py-3 px-4 bg-primary-50 border border-primary-200 rounded-xl',
          className
        )}
      >
        <span className="text-primary-700 font-medium text-sm">募資倒數</span>
        <div className="flex items-center gap-1.5">
          {timeUnits.map((unit, index) => (
            <div key={unit.label} className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                <span className="bg-primary-600 text-white text-sm font-bold px-2 py-1 rounded tabular-nums min-w-[32px] text-center">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-xs text-primary-600">{unit.label}</span>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-primary-300 font-bold">:</span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // variant === 'plans'
  return (
    <div
      className={cn(
        'flex items-center justify-center gap-3 py-3 px-4 bg-orange-50 border border-orange-200 rounded-xl',
        className
      )}
    >
      <span className="text-orange-700 font-medium text-sm">募資倒數</span>
      <div className="flex items-center gap-1.5">
        {timeUnits.map((unit, index) => (
          <div key={unit.label} className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <span className="bg-orange-600 text-white text-sm font-bold px-2 py-1 rounded tabular-nums min-w-[32px] text-center">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-xs text-orange-600">{unit.label}</span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-orange-300 font-bold">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Preset deadline for the fundraising campaign
export const FUNDRAISING_DEADLINE = new Date('2026-02-28T23:59:00+08:00');
