import type { BlogPost } from "../data/blogPosts";
import type { SupportedLocale } from "../i18n/types";
import { Button } from "./Button";

type NewsCardProps = {
  item: BlogPost;
  locale: SupportedLocale;
};

export function NewsCard({ item, locale }: NewsCardProps) {
  return (
    <article className="news-card">
      <div className="news-card__image">
        <div className="news-card__halo" />
        <div className="news-card__grid">
          <span />
          <span />
          <span />
        </div>
        <div className="news-card__signal">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <small className="news-card__date">{item.publishedAt}</small>
      <span className="news-card__category">{item.category[locale]}</span>
      <h3>{item.title[locale]}</h3>
      <p>{item.excerpt[locale]}</p>
      <Button href={`/blog/${item.slug}`} variant="ghost">
        {locale === "es" ? "Leer articulo" : "Read article"}
      </Button>
    </article>
  );
}
