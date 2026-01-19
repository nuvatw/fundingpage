'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { FundraisingConfigSchema, DEFAULT_FUNDRAISING_CONFIG } from '@/lib/types/fundraising';
import type { FundraisingConfig } from '@/lib/types/fundraising';
import { cn } from '@/lib/utils';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        setPassword('');
      } else {
        setLoginError(data.error || '登入失敗');
      }
    } catch {
      setLoginError('網路錯誤，請稍後再試');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginForm
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
        isLoading={isLoggingIn}
        error={loginError}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={handleLogout}
      saveStatus={saveStatus}
      setSaveStatus={setSaveStatus}
    />
  );
}

function LoginForm({
  password,
  setPassword,
  onSubmit,
  isLoading,
  error
}: {
  password: string;
  setPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-neutral-900 text-center mb-6">
            管理員登入
          </h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                密碼
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  'transition-colors',
                  error ? 'border-red-500' : 'border-neutral-300'
                )}
                placeholder="請輸入管理員密碼"
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !password}
              className={cn(
                'w-full py-3 rounded-lg font-semibold transition-all',
                'bg-primary-600 text-white',
                'hover:bg-primary-700',
                'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  登入中...
                </span>
              ) : '登入'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function AdminDashboard({
  onLogout,
  saveStatus,
  setSaveStatus,
}: {
  onLogout: () => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
  setSaveStatus: (s: 'idle' | 'saving' | 'saved' | 'error') => void;
}) {
  const [isLoadingData, setIsLoadingData] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FundraisingConfig>({
    resolver: zodResolver(FundraisingConfigSchema),
    defaultValues: DEFAULT_FUNDRAISING_CONFIG,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/fundraising');
      const data = await res.json();
      if (data.success && data.data) {
        reset(data.data);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const onSubmit = async (data: FundraisingConfig) => {
    setSaveStatus('saving');

    try {
      const res = await fetch('/api/fundraising', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setSaveStatus('saved');
        reset(result.data);
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
        alert(result.error || '儲存失敗');
      }
    } catch {
      setSaveStatus('error');
      alert('網路錯誤，請稍後再試');
    }
  };

  const watchedValues = watch();
  const previewPercentage = watchedValues.targetAmount
    ? Math.round((watchedValues.currentAmount / watchedValues.targetAmount) * 100)
    : 0;
  const previewDaysRemaining = watchedValues.deadline
    ? Math.max(0, Math.ceil((new Date(watchedValues.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">
            募資設定
          </h1>
          <button
            onClick={onLogout}
            className="text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
          >
            登出
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                目標金額顯示文字
              </label>
              <input
                type="text"
                {...register('targetDisplay')}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  errors.targetDisplay ? 'border-red-500' : 'border-neutral-300'
                )}
                placeholder="例：100 萬"
              />
              {errors.targetDisplay && (
                <p className="text-red-500 text-sm mt-1">{errors.targetDisplay.message}</p>
              )}
              <p className="text-neutral-400 text-xs mt-1">這會顯示在「目標 XXX」的位置</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                目標金額（計算用，新台幣）
              </label>
              <input
                type="number"
                {...register('targetAmount', { valueAsNumber: true })}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  errors.targetAmount ? 'border-red-500' : 'border-neutral-300'
                )}
                placeholder="例：1000000"
              />
              {errors.targetAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.targetAmount.message}</p>
              )}
              <p className="text-neutral-400 text-xs mt-1">用於計算達成百分比，請輸入數字</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                目前金額（新台幣）
              </label>
              <input
                type="number"
                {...register('currentAmount', { valueAsNumber: true })}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  errors.currentAmount ? 'border-red-500' : 'border-neutral-300'
                )}
                placeholder="例：1520000"
              />
              {errors.currentAmount && (
                <p className="text-red-500 text-sm mt-1">{errors.currentAmount.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                支持人數
              </label>
              <input
                type="number"
                {...register('supporters', { valueAsNumber: true })}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  errors.supporters ? 'border-red-500' : 'border-neutral-300'
                )}
                placeholder="例：62"
              />
              {errors.supporters && (
                <p className="text-red-500 text-sm mt-1">{errors.supporters.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                截止時間
              </label>
              <input
                type="datetime-local"
                {...register('deadline')}
                className={cn(
                  'w-full px-4 py-3 border rounded-lg',
                  'focus:outline-none focus:ring-2 focus:ring-primary-500',
                  errors.deadline ? 'border-red-500' : 'border-neutral-300'
                )}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline.message}</p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={saveStatus === 'saving' || !isDirty}
                className={cn(
                  'w-full py-3 rounded-lg font-semibold transition-all',
                  saveStatus === 'saved'
                    ? 'bg-green-500 text-white'
                    : 'bg-primary-600 text-white hover:bg-primary-700',
                  'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed'
                )}
              >
                {saveStatus === 'saving' && (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    儲存中...
                  </span>
                )}
                {saveStatus === 'saved' && '已儲存'}
                {saveStatus === 'error' && '儲存失敗，請重試'}
                {saveStatus === 'idle' && (isDirty ? '儲存變更' : '沒有變更')}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">
            即時預覽
          </h2>
          <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">目標</span>
              <span className="font-medium">{watchedValues.targetDisplay}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">達成率</span>
              <span className="font-medium text-primary-600">{previewPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">支持人數</span>
              <span className="font-medium">{watchedValues.supporters} 人</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">剩餘天數</span>
              <span className="font-medium">{previewDaysRemaining} 天</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
