import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { DeliveryProcess } from '@/components/DeliveryProcess';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { CTASection } from '@/components/CTASection';
import { AIAssistant } from '@/components/AIAssistant';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DeliveryProcess />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ResourcesSection />
      <AIAssistant />
      <CTASection />
    </>
  );
}
