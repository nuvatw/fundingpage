'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlItem {
  id: string;
  label: string;
}

interface SegmentedControlProps {
  items: SegmentedControlItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function SegmentedControl({
  items,
  activeId,
  onSelect,
  className,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  // Calculate indicator position based on active item
  useEffect(() => {
    const activeButton = itemRefs.current.get(activeId);
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeId, items]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeButton = itemRefs.current.get(activeId);
      const container = containerRef.current;

      if (activeButton && container) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();

        setIndicatorStyle({
          left: buttonRect.left - containerRect.left,
          width: buttonRect.width,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center p-1 bg-slate-100 rounded-full',
        'border border-slate-200/50',
        className
      )}
    >
      {/* Sliding indicator */}
      <div
        className="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
      />

      {/* Items */}
      {items.map((item) => (
        <button
          key={item.id}
          ref={(el) => {
            if (el) {
              itemRefs.current.set(item.id, el);
            }
          }}
          onClick={() => onSelect(item.id)}
          className={cn(
            'relative z-10 px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap',
            activeId === item.id
              ? 'text-slate-900'
              : 'text-slate-500 hover:text-slate-700'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
