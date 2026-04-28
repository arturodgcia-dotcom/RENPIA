import { Button } from "../components/Button";
import { HeroVisual } from "../components/HeroVisual";
import { useI18n } from "../i18n/I18nProvider";

export function Hero() {
  const { content } = useI18n();

  return (
    <section className="hero" id="inicio">
      <div className="hero__copy">
        <p className="hero__eyebrow">{content.hero.eyebrow}</p>
        <h1>
          {content.hero.title} <span className="hero__highlight">{content.hero.highlight}</span>
        </h1>
        <p className="hero__description">{content.hero.description}</p>

        <ul className="hero__bullets">
          {content.hero.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="hero__actions">
          <Button href="#soluciones">{content.hero.primaryCta}</Button>
          <Button href="#contacto" variant="secondary">
            {content.hero.secondaryCta}
          </Button>
        </div>

        <div className="hero__proof">
          {content.hero.stats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>

      <div className="hero__panel" aria-label="Visual REINPIA">
        <HeroVisual />
      </div>
    </section>
  );
}
