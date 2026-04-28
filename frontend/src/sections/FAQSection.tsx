import { useState } from "react";
import { faqItems } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";

export function FAQSection() {
  const { locale, content } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="landing-section landing-section--surface landing-section--faq" id="faq">
      <div className="section-heading">
        <p className="section-heading__eyebrow">{content.faq.eyebrow}</p>
        <h2>{content.faq.title}</h2>
        <p className="section-heading__description">{content.faq.description}</p>
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
                <span>{item.question[locale]}</span>
                <strong>{isActive ? "-" : "+"}</strong>
              </button>
              <p>{item.answer[locale]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
