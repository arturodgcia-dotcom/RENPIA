import { siteAssets } from "../config/siteAssets";
import { getSolutionBySlug, type SolutionSlug } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "../components/Button";
import { ProductPreview } from "../components/ProductPreview";

type SolutionPageProps = {
  slug: SolutionSlug;
};

const fallbackMap = {
  sprintpilot: "kanban",
  comercia: "ecommerce",
  nervia: "marketing",
  jornadalaboral360: "hr",
} as const;

export function SolutionPage({ slug }: SolutionPageProps) {
  const { locale, content } = useI18n();
  const solution = getSolutionBySlug(slug);

  if (!solution) return null;

  return (
    <main className="landing-main">
      <section className="landing-section page-hero page-hero--solution">
        <div className="page-hero__copy">
          <p className="section-heading__eyebrow">{content.pages.solution.routeLabel}</p>
          <h1>{solution.name}</h1>
          <p className="page-hero__description">{solution.description[locale]}</p>
          <div className="page-hero__actions">
            <Button href="/#contacto">{content.pages.solution.ctaPrimary}</Button>
            <Button href="/#soluciones" variant="secondary">
              {content.pages.solution.ctaSecondary}
            </Button>
          </div>
        </div>

        <div className="page-hero__media">
          <ProductPreview
            image={siteAssets.solutions[slug]}
            fallbackType={fallbackMap[slug]}
            title={solution.name}
            mode="laptop"
            alt={`${solution.name} preview`}
          />
        </div>
      </section>

      <section className="landing-section landing-section--surface">
        <div className="page-columns">
          <div>
            <div className="section-heading">
              <p className="section-heading__eyebrow">{content.pages.solution.modulesTitle}</p>
              <h2>{solution.highlight[locale]}</h2>
            </div>
            <ul className="feature-list">
              {solution.modules.map((module) => (
                <li key={module.es}>{module[locale]}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-heading">
              <p className="section-heading__eyebrow">{content.pages.solution.benefitsTitle}</p>
              <h2>{solution.audience[locale]}</h2>
            </div>
            <ul className="feature-list">
              {solution.benefits.map((benefit) => (
                <li key={benefit.es}>{benefit[locale]}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
