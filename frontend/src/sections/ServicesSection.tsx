import { useI18n } from "../i18n/I18nProvider";

export function ServicesSection() {
  const { content } = useI18n();

  return (
    <section className="landing-section landing-section--surface" id="que-hacemos">
      <div className="section-heading section-heading--center">
        <p className="section-heading__eyebrow">{content.services.eyebrow}</p>
        <h2>{content.services.title}</h2>
        <p className="section-heading__description">{content.services.description}</p>
      </div>

      <div className="feature-grid">
        {content.services.items.map((item, index) => (
          <article key={item.title} className={`feature-card feature-card--${index + 1}`}>
            <div className={`feature-card__icon feature-card__icon--${index + 1}`} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <div className="architect-note">
        <span>{content.services.architectTitle}</span>
        <strong>{content.services.architectDescription}</strong>
      </div>
    </section>
  );
}
