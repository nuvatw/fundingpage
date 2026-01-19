import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// 首屏組件直接導入（只有 Hero 和 TrustLogos）
import { HeroSection } from '@/components/sections/01_HeroSection';
import { TrustLogos } from '@/components/sections/02_TrustLogos';

// 所有其他 Section 全部懶加載
const ComparisonSection = dynamic(
  () => import('@/components/sections/03_ComparisonSection').then((m) => m.ComparisonSection)
);
const CourseCurriculum = dynamic(
  () => import('@/components/sections/04_CourseCurriculum').then((m) => m.CourseCurriculum)
);
const TestimonialsSection = dynamic(
  () => import('@/components/sections/05_TestimonialsSection').then((m) => m.TestimonialsSection)
);
const TeacherSection = dynamic(
  () => import('@/components/sections/06_TeacherSection').then((m) => m.TeacherSection)
);
const InstructorExperience = dynamic(
  () => import('@/components/sections/07_InstructorExperience').then((m) => m.InstructorExperience)
);
const MediaCoverage = dynamic(
  () => import('@/components/sections/08_MediaCoverage').then((m) => m.MediaCoverage)
);
const PlansSection = dynamic(
  () => import('@/components/sections/09_PlansSection').then((m) => m.PlansSection)
);
const FAQSection = dynamic(
  () => import('@/components/sections/10_FAQSection').then((m) => m.FAQSection)
);

export const metadata: Metadata = {
  title: '餐飲業 AI 革命｜90 天打造 AI 餐廳數位營運系統 | nuva',
  description:
    '90 天做出可上線的「AI 餐廳數位營運系統」：LINE 客服、官網、內容工廠、財報、庫存、訂位 MVP，全部做得出來、能維運、可擴店。',
  keywords: ['餐飲 AI', 'AI 課程', '餐廳數位化', '餐飲營運系統', 'LINE 客服', '餐廳官網'],
};

export default function RestaurantPage() {
  return (
    <>
      {/* Section 01: Hero - 價值主張 */}
      <HeroSection />

      {/* Section 02: Trust Logos - 信任標誌 */}
      <TrustLogos />

      {/* Section 03: Comparison - 自學 vs AI 革命比較 */}
      <ComparisonSection />

      {/* Section 04: Curriculum - 8 堂課程時程表 */}
      <CourseCurriculum />

      {/* Section 05: Testimonials - 學員心得 */}
      <TestimonialsSection />

      {/* Section 06: Teacher - 講師介紹 */}
      <TeacherSection />

      {/* Section 07: Instructor Experience - 講師經歷 */}
      <InstructorExperience />

      {/* Section 08: Media Coverage - 媒體採訪 */}
      <MediaCoverage />

      {/* Section 09: Plans - 方案說明 */}
      <PlansSection />

      {/* Section 10: FAQ - 常見問題 */}
      <FAQSection />
    </>
  );
}
