import { siteAssets } from "../config/siteAssets";
import type { Solution } from "../data/siteContent";
import { useI18n } from "../i18n/I18nProvider";
import { Button } from "./Button";
import { ProductPreview } from "./ProductPreview";

type ProductCardProps = {
  product: Solution;
};

export function ProductCard({ product }: ProductCardProps) {
  const { locale, content } = useI18n();

  const fallbackMap: Record<Solution["slug"], "kanban" | "ecommerce" | "marketing" | "hr"> = {
    sprintpilot: "kanban",
    comercia: "ecommerce",
    nervia: "marketing",
    jornadalaboral360: "hr",
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <div className="product-card__media-top">
          <span className="product-card__tag">{product.audience[locale]}</span>
          {product.badge ? <span className="product-card__badge">{product.badge[locale]}</span> : null}
        </div>
        <ProductPreview
          image={siteAssets.solutions[product.slug]}
          fallbackType={fallbackMap[product.slug]}
          title={product.name}
          alt={`${product.name} preview`}
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__highlight">{product.highlight[locale]}</p>
        <h3>{product.name}</h3>
        <p>{product.description[locale]}</p>
        <ul className="product-card__modules">
          {product.modules.map((module) => (
            <li key={module.es}>{module[locale]}</li>
          ))}
        </ul>
      </div>

      <div className="product-card__actions">
        <Button href={product.path} variant="secondary">
          {content.solutions.primaryCta}
        </Button>
        <Button href={product.demoPath ?? product.proposalPath}>{content.solutions.secondaryCta}</Button>
      </div>
    </article>
  );
}
