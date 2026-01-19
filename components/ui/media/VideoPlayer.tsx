'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  url: string;
  title?: string;
  thumbnailUrl?: string;
  platform?: 'youtube' | 'vimeo' | 'self-hosted';
  className?: string;
}

// 提取 YouTube Video ID
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// 生成 YouTube 縮略圖 URL
function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYouTubeEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }
  return null;
}

function getVimeoEmbedUrl(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  if (match) {
    return `https://player.vimeo.com/video/${match[1]}`;
  }
  return null;
}

export function VideoPlayer({
  url,
  title = '影片',
  thumbnailUrl,
  platform = 'youtube',
  className,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 自動生成縮略圖（若未提供且為 YouTube）
  const autoThumbnail = useMemo(() => {
    if (thumbnailUrl) return thumbnailUrl;
    if (platform === 'youtube' && url) {
      const videoId = getYouTubeVideoId(url);
      if (videoId) return getYouTubeThumbnail(videoId);
    }
    return null;
  }, [url, thumbnailUrl, platform]);

  // If no URL provided, show placeholder
  if (!url) {
    return (
      <div
        className={cn(
          'relative aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center',
          className
        )}
      >
        <div className="text-center p-8">
          <span className="text-4xl mb-4 block">🎬</span>
          <p className="text-text-muted">影片即將上線</p>
        </div>
      </div>
    );
  }

  // Get embed URL based on platform
  let embedUrl: string | null = null;
  if (platform === 'youtube') {
    embedUrl = getYouTubeEmbedUrl(url);
  } else if (platform === 'vimeo') {
    embedUrl = getVimeoEmbedUrl(url);
  } else {
    embedUrl = url; // Self-hosted
  }

  if (!embedUrl || hasError) {
    return (
      <div
        className={cn(
          'relative aspect-video bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center',
          className
        )}
      >
        <div className="text-center p-8">
          <span className="text-4xl mb-4 block">⚠️</span>
          <p className="text-text-muted">影片載入失敗</p>
        </div>
      </div>
    );
  }

  // Show thumbnail with play button if not playing
  if (!isPlaying && autoThumbnail) {
    return (
      <div
        className={cn(
          'relative aspect-video bg-slate-900 rounded-xl overflow-hidden cursor-pointer group',
          className
        )}
        onClick={() => setIsPlaying(true)}
      >
        <img
          src={autoThumbnail}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback 到較低品質縮略圖
            const target = e.target as HTMLImageElement;
            if (target.src.includes('maxresdefault')) {
              const videoId = getYouTubeVideoId(url);
              if (videoId) {
                target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }
            }
          }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg
              className="w-8 h-8 text-slate-900 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Show video embed
  if (platform === 'self-hosted') {
    return (
      <div
        className={cn(
          'relative aspect-video bg-slate-900 rounded-xl overflow-hidden',
          className
        )}
      >
        <video
          src={url}
          controls
          autoPlay={isPlaying}
          className="w-full h-full"
          onError={() => setHasError(true)}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-video bg-slate-900 rounded-xl overflow-hidden',
        className
      )}
    >
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
