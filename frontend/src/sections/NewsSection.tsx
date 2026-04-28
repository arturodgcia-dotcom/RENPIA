import { Button } from "../components/Button";
import { NewsCard } from "../components/NewsCard";
import { useI18n } from "../i18n/I18nProvider";
import { archivePolicySummary, getFeaturedPosts } from "../services/newsService";

export function NewsSection() {
  const { locale, content } = useI18n();

  return (
    <section className="landing-section landing-section--surface landing-section--news" id="noticias">
      <div className="news-layout">
        <div className="news-editorial">
          <div className="section-heading">
            <p className="section-heading__eyebrow">{content.news.eyebrow}</p>
            <h2>{content.news.title}</h2>
            <p className="section-heading__description">{content.news.description}</p>
          </div>

          <div className="news-editorial__card">
            <span>{content.news.editorialBadge}</span>
            <strong>{content.news.editorialTitle}</strong>
            <ul>
              {content.news.editorialPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="news-foot">
            <p>{archivePolicySummary(locale)}</p>
            <div className="news-foot__actions">
              <Button href="/blog" variant="secondary">
                {content.news.primaryCta}
              </Button>
              <Button href="#contacto">{content.news.secondaryCta}</Button>
            </div>
          </div>
        </div>

        <div className="news-grid">
          {getFeaturedPosts().map((item) => (
            <NewsCard key={item.slug} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
