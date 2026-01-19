import {
  HeroSection,
  ServicesSection,
  MediaSection,
  PartnersSection,
  CTASection,
} from '@/components/home';

export default function HomePage() {
  return (
    <>
      {/* Hero - 品牌主視覺 */}
      <HeroSection />

      {/* Services - 三大領域 */}
      <ServicesSection />

      {/* Media - 專訪與封面故事 */}
      <MediaSection />

      {/* Partners - 合作夥伴 */}
      <PartnersSection />

      {/* CTA - 行動呼籲 */}
      <CTASection />
    </>
  );
}
