import { siteAssets } from "../config/siteAssets";
import { getAllPosts } from "../services/newsService";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "../components/Button";

const coverMap = {
  "hero-consultoria": siteAssets.hero.consultoria,
  sprintpilot: siteAssets.solutions.sprintpilot,
  comercia: siteAssets.solutions.comercia,
  nervia: siteAssets.solutions.nervia,
  jornadalaboral360: siteAssets.solutions.jornadalaboral360,
  "custom-development": siteAssets.solutions.customDevelopment,
} as const;

export function BlogPage() {
  const { locale, content } = useI18n();
  const posts = getAllPosts();

  return (
    <main className="landing-main">
      <section className="landing-section page-hero page-hero--blog">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Blog</p>
          <h1>{content.pages.blog.title}</h1>
          <p className="page-hero__description">{content.pages.blog.description}</p>
        </div>
      </section>

      <section className="landing-section landing-section--surface">
        <div className="article-grid">
          {posts.map((post) => (
            <article key={post.slug} className="article-card">
              <img
                className="article-card__image"
                src={coverMap[post.cover]}
                alt={post.title[locale]}
                loading="lazy"
                decoding="async"
              />
              <span className="news-card__category">{post.category[locale]}</span>
              <small className="news-card__date">{post.publishedAt}</small>
              <h2>{post.title[locale]}</h2>
              <p>{post.excerpt[locale]}</p>
              <div className="article-card__actions">
                <Button href={`/blog/${post.slug}`}>
                  {locale === "es" ? "Leer articulo" : "Read article"}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
