import { ProductCard } from "../components/ProductCard";
import { products } from "../data/siteContent";

export function ProductsSection() {
  return (
    <section className="landing-section landing-section--airy landing-section--products" id="soluciones">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Nuestros desarrollos</p>
        <h2>Soluciones con identidad propia para diferentes frentes del negocio.</h2>
        <p className="section-heading__description">
          Cada desarrollo RENPIA parte de una logica real de operacion, crecimiento y seguimiento,
          con una presentacion clara y moderna para empresas que necesitan avanzar.
        </p>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
