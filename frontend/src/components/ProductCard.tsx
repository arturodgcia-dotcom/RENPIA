import type { Product } from "../data/siteContent";
import { Button } from "./Button";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-card__media">
        <div className="product-card__media-top">
          <span className="product-card__tag">{product.audience}</span>
          {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
        </div>
        <div className="product-card__mockup">
          <div className="mockup-window">
            <div className="mockup-window__toolbar">
              <span />
              <span />
              <span />
            </div>
            <div className="mockup-strip" />
            <div className="mockup-bars">
              <span />
              <span />
              <span />
            </div>
            <div className="mockup-chart" />
          </div>
        </div>
      </div>

      <div className="product-card__body">
        <p className="product-card__highlight">{product.highlight}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
      </div>

      <div className="product-card__actions">
        <Button href="#contacto" variant="secondary">
          Ir a landing
        </Button>
        <Button href="#contacto" variant="ghost">
          Comprar por separado
        </Button>
      </div>
    </article>
  );
}
