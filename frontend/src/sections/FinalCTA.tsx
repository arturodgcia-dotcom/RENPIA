import { Button } from "../components/Button";
import { useI18n } from "../i18n/I18nProvider";

export function FinalCTA() {
  const { content } = useI18n();

  return (
    <section className="final-cta" id="contacto">
      <div>
        <p className="section-heading__eyebrow">{content.finalCta.eyebrow}</p>
        <h2>{content.finalCta.title}</h2>
        <p>{content.finalCta.description}</p>
      </div>

      <div className="final-cta__actions">
        <Button href="#agenda">{content.finalCta.primary}</Button>
        <Button href="#formulario" variant="secondary">
          {content.finalCta.secondary}
        </Button>
        <Button href="#soluciones" variant="ghost">
          {content.finalCta.tertiary}
        </Button>
      </div>
    </section>
  );
}
