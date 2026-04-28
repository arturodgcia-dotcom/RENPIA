import { AppointmentSection } from "../sections/AppointmentSection";
import { CustomDevelopmentSection } from "../sections/CustomDevelopmentSection";
import { DemosSection } from "../sections/DemosSection";
import { FAQSection } from "../sections/FAQSection";
import { FinalCTA } from "../sections/FinalCTA";
import { Hero } from "../sections/Hero";
import { LeadFormSection } from "../sections/LeadFormSection";
import { NewsSection } from "../sections/NewsSection";
import { NewsletterSection } from "../sections/NewsletterSection";
import { ProductsSection } from "../sections/ProductsSection";
import { ServicesSection } from "../sections/ServicesSection";

export function LandingPage() {
  return (
    <main className="landing-main">
      <Hero />
      <ServicesSection />
      <ProductsSection />
      <CustomDevelopmentSection />
      <DemosSection />
      <NewsSection />
      <NewsletterSection />
      <LeadFormSection />
      <AppointmentSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
