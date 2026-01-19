import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

// 首屏組件直接導入
import { GeneralHeroSection } from '@/components/general';
import { TrustLogos } from '@/components/sections/02_TrustLogos';

// 所有其他 Section 全部懶加載
const GeneralComparisonSection = dynamic(
  () => import('@/components/general/GeneralComparisonSection').then((m) => m.GeneralComparisonSection)
);
const GeneralCourseCurriculum = dynamic(
  () => import('@/components/general/GeneralCourseCurriculum').then((m) => m.GeneralCourseCurriculum)
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
const GeneralPlansSection = dynamic(
  () => import('@/components/general/GeneralPlansSection').then((m) => m.GeneralPlansSection)
);
const GeneralFAQSection = dynamic(
  () => import('@/components/general/GeneralFAQSection').then((m) => m.GeneralFAQSection)
);

export const metadata: Metadata = {
  title: 'AI 學習社群 nuvaClub｜從零開始學 AI | nuva',
  description:
    '透過線上陪伴的互動式學習，讓每個人都能掌握 AI 工具，提升工作效率。不需要程式背景，從零開始學會 AI。募資優惠：買 1 送 1、買 2 送 3、買 4 送 8。5/1 開始觀看。',
  keywords: ['AI 學習', 'AI 課程', 'ChatGPT 教學', 'AI 工具', '線上學習', 'nuvaClub'],
};

export default function GeneralPage() {
  return (
    <>
      {/* Section 01: Hero - 價值主張 */}
      <GeneralHeroSection />

      {/* Section 02: Trust Logos - 信任標誌 */}
      <TrustLogos />

      {/* Section 03: Comparison - 自學 vs AI 革命比較 */}
      <GeneralComparisonSection />

      {/* Section 04: Curriculum - 7 堂 AI 學習路徑 */}
      <GeneralCourseCurriculum />

      {/* Section 05: Testimonials - 學員心得 */}
      <TestimonialsSection />

      {/* Section 06: Teacher - 講師介紹 */}
      <TeacherSection />

      {/* Section 07: Instructor Experience - 講師經歷 */}
      <InstructorExperience />

      {/* Section 08: Media Coverage - 媒體採訪 */}
      <MediaCoverage />

      {/* Section 09: Plans - 募資優惠方案 */}
      <GeneralPlansSection />

      {/* Section 10: FAQ - 常見問題 */}
      <GeneralFAQSection />
    </>
  );
}
