import { Header } from "./sections/Header";
import { HeroSection } from "./sections/HeroSection";
import { WhatWeDoSection } from "./sections/WhatWeDoSection";
import { ProductsSection } from "./sections/ProductsSection";
import { CustomDevelopmentSection } from "./sections/CustomDevelopmentSection";
import { DemosSection } from "./sections/DemosSection";
import { NewsSection } from "./sections/NewsSection";
import { NewsletterSection } from "./sections/NewsletterSection";
import { LeadFormSection } from "./sections/LeadFormSection";
import { AgendaSection } from "./sections/AgendaSection";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { Footer } from "./sections/Footer";

function App() {
  return (
    <div className="app-shell">
      <div className="ambient ambient--one" />
      <div className="ambient ambient--two" />
      <Header />
      <main className="landing-main">
        <HeroSection />
        <WhatWeDoSection />
        <ProductsSection />
        <CustomDevelopmentSection />
        <DemosSection />
        <NewsSection />
        <NewsletterSection />
        <LeadFormSection />
        <AgendaSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
