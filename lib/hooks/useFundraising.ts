'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_FUNDRAISING_CONFIG } from '@/lib/types/fundraising';
import type { FundraisingConfig, FundraisingDisplay } from '@/lib/types/fundraising';

function calculateDisplay(config: FundraisingConfig): FundraisingDisplay {
  const deadline = new Date(config.deadline);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const percentage = Math.round((config.currentAmount / config.targetAmount) * 100);

  return {
    targetDisplay: config.targetDisplay,
    currentAmount: config.currentAmount,
    supporters: config.supporters,
    deadline,
    percentage,
    daysRemaining,
    isExpired: diffTime <= 0,
  };
}

interface UseFundraisingReturn {
  data: FundraisingDisplay | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFundraising(): UseFundraisingReturn {
  const [data, setData] = useState<FundraisingDisplay | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch('/api/fundraising', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const result = await res.json();

      if (result.success && result.data) {
        setData(calculateDisplay(result.data));
      } else {
        setData(calculateDisplay(DEFAULT_FUNDRAISING_CONFIG));
      }
    } catch (err) {
      console.error('Error fetching fundraising data:', err);
      setError('無法載入資料');
      setData(calculateDisplay(DEFAULT_FUNDRAISING_CONFIG));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
