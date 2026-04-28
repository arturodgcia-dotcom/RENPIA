import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { ServicesSection } from "./sections/ServicesSection";
import { ProductsSection } from "./sections/ProductsSection";
import { CustomDevelopmentSection } from "./sections/CustomDevelopmentSection";
import { DemosSection } from "./sections/DemosSection";
import { NewsSection } from "./sections/NewsSection";
import { NewsletterSection } from "./sections/NewsletterSection";
import { LeadFormSection } from "./sections/LeadFormSection";
import { AppointmentSection } from "./sections/AppointmentSection";
import { FAQSection } from "./sections/FAQSection";
import { FinalCTA } from "./sections/FinalCTA";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
