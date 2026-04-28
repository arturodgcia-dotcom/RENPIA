import { ProductCard } from "../components/ProductCard";
import { solutions } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";

export function ProductsSection() {
  const { content } = useI18n();

  return (
    <section className="landing-section landing-section--airy landing-section--products" id="soluciones">
      <div className="section-heading">
        <p className="section-heading__eyebrow">{content.solutions.eyebrow}</p>
        <h2>{content.solutions.title}</h2>
        <p className="section-heading__description">{content.solutions.description}</p>
      </div>

      <div className="product-grid">
        {solutions.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
