import { ButtonLink } from "../components/ButtonLink";
import { SectionHeader } from "../components/SectionHeader";
import { products } from "../data/siteContent";

export function ProductsSection() {
  return (
    <section className="landing-section" id="soluciones">
      <SectionHeader
        eyebrow="Nuestros desarrollos"
        title="Soluciones con identidad propia para diferentes frentes del negocio."
        description="Cada desarrollo RENPIA parte de una logica real de operacion, crecimiento y seguimiento, con una presentacion clara y moderna para empresas que necesitan avanzar."
      />

      <div className="product-grid">
        {products.map((product) => (
          <article key={product.name} className="product-card">
            <div className="product-card__media">
              <span className="product-card__tag">{product.audience}</span>
              {product.badge ? <span className="product-card__badge">{product.badge}</span> : null}
              <div className="product-card__mockup">
                <div className="mockup-strip" />
                <div className="mockup-bars">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="mockup-chart" />
              </div>
            </div>

            <div className="product-card__body">
              <p className="product-card__highlight">{product.highlight}</p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>

            <div className="product-card__actions">
              <ButtonLink href="#contacto" variant="secondary">
                Ir a landing
              </ButtonLink>
              <ButtonLink href="#contacto" variant="ghost">
                Comprar por separado
              </ButtonLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
