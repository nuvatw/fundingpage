'use client';

interface PlanTableCategoryRowProps {
  label: string;
}

export function PlanTableCategoryRow({ label }: PlanTableCategoryRowProps) {
  return (
    <div className="grid grid-cols-[minmax(180px,240px)_repeat(4,minmax(100px,1fr))] bg-neutral-100 border-b border-neutral-200">
      <div className="col-span-5 px-4 py-3">
        <span className="text-sm font-semibold text-neutral-700 uppercase tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
}
