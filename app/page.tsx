import { Hero } from '@/components/Hero';
import { ServicesSection } from '@/components/ServicesSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { CaseStudiesSection } from '@/components/CaseStudiesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { CTASection } from '@/components/CTASection';
import { AIAssistant } from '@/components/AIAssistant';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <ResourcesSection />
      <ProcessSection />
      <AIAssistant />
      <CTASection />
    </>
  );
}
