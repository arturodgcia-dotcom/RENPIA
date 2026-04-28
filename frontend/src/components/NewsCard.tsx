import type { NewsItem } from "../data/siteContent";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
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
      <small className="news-card__date">{item.date}</small>
      <span className="news-card__category">{item.category}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
