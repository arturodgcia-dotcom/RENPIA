import type { NewsItem } from "../data/siteContent";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="news-card">
      <div className="news-card__image">
        <div className="news-card__halo" />
      </div>
      <small className="news-card__date">{item.date}</small>
      <span className="news-card__category">{item.category}</span>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  );
}
