import { siteAssets } from "../config/siteAssets";
import { getPostBySlug } from "../services/newsService";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "../components/Button";

type BlogPostPageProps = {
  slug: string;
};

const coverMap = {
  "hero-consultoria": siteAssets.hero.consultoria,
  sprintpilot: siteAssets.solutions.sprintpilot,
  comercia: siteAssets.solutions.comercia,
  nervia: siteAssets.solutions.nervia,
  jornadalaboral360: siteAssets.solutions.jornadalaboral360,
  "custom-development": siteAssets.solutions.customDevelopment,
} as const;

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const { locale } = useI18n();
  const post = getPostBySlug(slug);

  if (!post) return null;

  return (
    <main className="landing-main">
      <article className="landing-section landing-section--surface article-page">
        <img
          className="article-page__hero"
          src={coverMap[post.cover]}
          alt={post.title[locale]}
          loading="eager"
          decoding="async"
        />
        <span className="news-card__category">{post.category[locale]}</span>
        <h1>{post.title[locale]}</h1>
        <p className="article-page__meta">
          {post.publishedAt} | {post.readTime[locale]}
        </p>
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.es}>{paragraph[locale]}</p>
        ))}
        <div className="page-hero__actions">
          <Button href="/blog">{locale === "es" ? "Ver mas articulos" : "View more articles"}</Button>
          <Button href="/#contacto" variant="secondary">
            {locale === "es" ? "Hablar con REINPIA" : "Talk with REINPIA"}
          </Button>
        </div>
      </article>
    </main>
  );
}
