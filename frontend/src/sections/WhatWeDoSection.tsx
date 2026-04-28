import { SectionHeader } from "../components/SectionHeader";
import { whatWeDo } from "../data/siteContent";

export function WhatWeDoSection() {
  return (
    <section className="landing-section" id="que-hacemos">
      <SectionHeader
        eyebrow="Que hacemos en RENPIA"
        title="Conectamos tecnologia, negocio y automatizacion para ayudar a las empresas a operar mejor."
        description="RENPIA ha evolucionado hacia soluciones mas integrales, conectando tecnologia, negocio y automatizacion para ayudar a empresas a operar mejor, vender mas y tomar decisiones con mayor inteligencia."
      />

      <div className="feature-grid">
        {whatWeDo.map((item) => (
          <article key={item.title} className="feature-card">
            <div className="feature-card__icon" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
