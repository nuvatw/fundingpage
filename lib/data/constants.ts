import type { NavItem, CourseConfig } from '@/lib/types';

// 課程配置
export const COURSE_CONFIG: CourseConfig = {
  seasonStart: '2026年07月01日',
  seasonEnd: '2026年09月30日',
  presentationDate: '2026年09月28日',
  installmentDates: {
    first: '下定當下',
    second: '2026年08月01日',
    third: '2026年09月30日',
  },
};

// 導覽項目
export const NAV_ITEMS: NavItem[] = [
  { id: 'path', label: '學習路徑' },
  { id: 'testimonials', label: '學員回饋' },
  { id: 'instructor', label: '講師介紹' },
  { id: 'media', label: '媒體採訪' },
  { id: 'plans', label: '方案說明' },
  { id: 'faq', label: '常見問題' },
];
