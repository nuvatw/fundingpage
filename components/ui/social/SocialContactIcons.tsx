'use client';

import { useState } from 'react';

// 連結資料
const SOCIAL_LINKS = {
  email: {
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=hello@meetnuva.com&su=%E5%8F%B0%E7%81%A3%E9%A4%90%E9%A3%B2%E7%95%8C%E7%9A%84%20AI%20%E9%9D%A9%E5%91%BD%EF%BD%9C%E8%AA%B2%E7%A8%8B%E8%A9%A2%E5%95%8F&body=%E4%B8%8A%E5%93%B2%E6%82%A8%E5%A5%BD%EF%BC%8C%0A%0A%E6%88%91%E6%98%AF%20xx%20%E9%A4%90%E5%BB%B3%EF%BC%8C%E6%88%91%E6%83%B3%E8%A9%A2%E5%95%8F...',
    tooltip: '寄一封 Email 聯繫我們 →',
    label: 'Email',
  },
  line: {
    href: 'https://lin.ee/DckeaXe',
    tooltip: '透過 Line 官方帳號聯繫我們 →',
    label: 'LINE',
  },
  instagram: {
    href: 'https://www.instagram.com/nuva.now/',
    tooltip: '透過 Instagram 私訊我們 →',
    label: 'Instagram',
  },
};

// Gmail Icon - 修正為正方形 viewBox
function GmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="#EA4335"/>
      <path d="M22 6l-10 7L2 6" stroke="#fff" strokeWidth="0"/>
      <path d="M2 6l10 7 10-7" fill="#FBBC05"/>
      <path d="M2 6v12l7-7" fill="#34A853"/>
      <path d="M22 6v12l-7-7" fill="#4285F4"/>
      <path d="M2 18l7-7 3 2.5L15 11l7 7" fill="#C5221F"/>
    </svg>
  );
}

// Gmail Icon - 更精確的版本
function GmailIconAccurate({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285f4" d="M2 6.5V18a2 2 0 0 0 2 2h2V8.3L12 13l6-4.7V20h2a2 2 0 0 0 2-2V6.5l-2-1.9-4 3.1L12 4 8 7.7l-4-3.1z"/>
      <path fill="#34a853" d="M6 20V8.3l6 4.7V20z"/>
      <path fill="#fbbc04" d="M18 20V8.3l-6 4.7V20z"/>
      <path fill="#ea4335" d="M2 6.5l4 3.1V6.2L4.2 4.5A2 2 0 0 0 2 6.5z"/>
      <path fill="#c5221f" d="M22 6.5l-4 3.1V6.2l1.8-1.7A2 2 0 0 1 22 6.5z"/>
      <path fill="#ea4335" d="M6 6.2v3.4l6 4.7 6-4.7V6.2L12 11z"/>
    </svg>
  );
}

// LINE Icon
function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06C755">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

// Instagram Icon - using static gradient ID to avoid hydration mismatch
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E1306C" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig-gradient)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

// Tooltip Component
function Tooltip({
  children,
  text,
  variant = 'light',
}: {
  children: React.ReactNode;
  text: string;
  variant?: 'light' | 'dark';
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs font-medium whitespace-nowrap rounded-lg shadow-lg z-50 animate-in fade-in duration-150 ${
            variant === 'dark'
              ? 'bg-neutral-700 text-white'
              : 'bg-neutral-800 text-white'
          }`}
        >
          {text}
          {/* Arrow */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
              variant === 'dark' ? 'border-t-neutral-700' : 'border-t-neutral-800'
            }`}
          />
        </div>
      )}
    </div>
  );
}

// Single Social Icon Button
function SocialIconButton({
  type,
  variant = 'light',
  showLabel = false,
}: {
  type: 'email' | 'line' | 'instagram';
  variant?: 'light' | 'dark';
  showLabel?: boolean;
}) {
  const link = SOCIAL_LINKS[type];
  const Icon = type === 'email' ? GmailIconAccurate : type === 'line' ? LineIcon : InstagramIcon;

  const bgClass =
    variant === 'light'
      ? 'bg-neutral-100 hover:bg-neutral-200'
      : 'bg-neutral-800 hover:bg-neutral-700';

  if (showLabel) {
    return (
      <Tooltip text={link.tooltip} variant={variant}>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative pb-2 flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
            variant === 'light'
              ? 'text-neutral-500 hover:text-neutral-900'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-[18px] h-[18px] grayscale group-hover:grayscale-0 transition-all">
            <Icon className="w-full h-full" />
          </span>
          <span>{link.label}</span>
          <span
            className={`absolute left-0 right-0 bottom-0 h-0.5 transition-all duration-200 origin-center scale-x-0 group-hover:scale-x-100 ${
              variant === 'light' ? 'bg-primary-600' : 'bg-primary-400'
            }`}
          />
        </a>
      </Tooltip>
    );
  }

  return (
    <Tooltip text={link.tooltip} variant={variant}>
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all grayscale hover:grayscale-0 ${bgClass}`}
        aria-label={link.label}
      >
        <Icon className="w-[18px] h-[18px]" />
      </a>
    </Tooltip>
  );
}

// Main Component
interface SocialContactIconsProps {
  variant?: 'light' | 'dark';
  showLabels?: boolean;
  className?: string;
}

export function SocialContactIcons({
  variant = 'light',
  showLabels = false,
  className = '',
}: SocialContactIconsProps) {
  const gapClass = showLabels ? 'gap-8' : 'gap-2';

  return (
    <div className={`flex items-center ${gapClass} ${className}`}>
      <SocialIconButton type="email" variant={variant} showLabel={showLabels} />
      <SocialIconButton type="line" variant={variant} showLabel={showLabels} />
      <SocialIconButton type="instagram" variant={variant} showLabel={showLabels} />
    </div>
  );
}
