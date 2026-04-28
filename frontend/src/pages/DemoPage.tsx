import { siteAssets } from "../config/siteAssets";
import { getDemoBySlug, type DemoSlug } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "../components/Button";
import { ProductPreview } from "../components/ProductPreview";

type DemoPageProps = {
  slug: DemoSlug;
};

const fallbackMap = {
  sprintpilot: "kanban",
  comercia: "ecommerce",
} as const;

export function DemoPage({ slug }: DemoPageProps) {
  const { locale, content } = useI18n();
  const demo = getDemoBySlug(slug);

  if (!demo) return null;

  return (
    <main className="landing-main">
      <section className="landing-section page-hero page-hero--demo">
        <div className="page-hero__copy">
          <p className="section-heading__eyebrow">{content.pages.demo.badge}</p>
          <h1>
            {demo.title[locale]} | {content.pages.demo.titleSuffix}
          </h1>
          <p className="page-hero__description">{demo.description[locale]}</p>
          <p className="page-hero__description">{content.pages.demo.description}</p>
          <div className="page-hero__actions">
            <Button href="/#agenda">{content.pages.demo.ctaPrimary}</Button>
            <Button href="/#soluciones" variant="secondary">
              {content.pages.demo.ctaSecondary}
            </Button>
          </div>
        </div>
        <div className="page-hero__media">
          <ProductPreview
            image={siteAssets.demos[slug]}
            fallbackType={fallbackMap[slug]}
            title={demo.title[locale]}
            mode="laptop"
            alt={`${demo.title[locale]} preview`}
          />
        </div>
      </section>
    </main>
  );
}
