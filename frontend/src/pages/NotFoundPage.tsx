import { useI18n } from "../i18n/I18nProvider";
import { Button } from "../components/Button";

export function NotFoundPage() {
  const { content } = useI18n();

  return (
    <main className="landing-main">
      <section className="landing-section page-hero page-hero--not-found">
        <div className="section-heading">
          <p className="section-heading__eyebrow">404</p>
          <h1>{content.pages.notFound.title}</h1>
          <p className="page-hero__description">{content.pages.notFound.description}</p>
          <div className="page-hero__actions">
            <Button href="/">{content.pages.notFound.button}</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
