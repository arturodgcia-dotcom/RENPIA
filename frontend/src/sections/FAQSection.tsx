import { useState } from "react";
import { faqItems } from "../data/siteContent";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="landing-section landing-section--surface landing-section--faq" id="faq">
      <div className="section-heading">
        <p className="section-heading__eyebrow">FAQ SEO / AEO</p>
        <h2>Preguntas frecuentes pensadas para visibilidad, claridad y confianza.</h2>
        <p className="section-heading__description">
          La landing puede responder dudas clave con un lenguaje empresarial, directo y listo para
          estructurarse en schema FAQ.
        </p>
      </div>

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
