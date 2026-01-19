'use client';

import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
}

interface UnderlineNavProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export function UnderlineNav({
  items,
  activeId,
  onSelect,
  className,
}: UnderlineNavProps) {
  return (
    <nav className={cn('flex items-center gap-8', className)}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              'group relative pb-2 text-sm transition-all duration-200',
              isActive
                ? 'font-semibold text-slate-900'
                : 'font-normal text-slate-500 hover:font-semibold hover:text-slate-900'
            )}
          >
            {item.label}
            {/* Underline indicator */}
            <span
              className={cn(
                'absolute left-0 right-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-200 origin-center',
                isActive
                  ? 'scale-x-100'
                  : 'scale-x-0 group-hover:scale-x-100'
              )}
            />
          </button>
        );
      })}
    </nav>
  );
}
