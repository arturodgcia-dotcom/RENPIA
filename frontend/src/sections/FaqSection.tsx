import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { faqItems } from "../data/siteContent";

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="landing-section" id="faq">
      <SectionHeader
        eyebrow="FAQ SEO / AEO"
        title="Preguntas frecuentes pensadas para visibilidad, claridad y confianza."
        description="La landing puede responder dudas clave con un lenguaje empresarial, directo y listo para estructurarse en schema FAQ."
      />

      <div className="faq-grid">
        {faqItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={item.question}
              className={`faq-card ${isActive ? "faq-card--active" : ""}`}
            >
              <button
                className="faq-card__trigger"
                type="button"
                onClick={() => setActiveIndex(index)}
              >
                <span>{item.question}</span>
                <strong>{isActive ? "-" : "+"}</strong>
              </button>
              <p>{item.answer}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
