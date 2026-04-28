import { whatWeDo } from "../data/siteContent";

export function ServicesSection() {
  return (
    <section className="landing-section" id="que-hacemos">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Que hacemos en RENPIA</p>
        <h2>Conectamos tecnologia, negocio y automatizacion para ayudar a las empresas a operar mejor.</h2>
        <p className="section-heading__description">
          RENPIA ha evolucionado hacia soluciones mas integrales, conectando tecnologia, negocio y
          automatizacion para ayudar a empresas a operar mejor, vender mas y tomar decisiones con
          mayor inteligencia.
        </p>
      </div>

      <div className="feature-grid">
        {whatWeDo.map((item) => (
          <article key={item.title} className="feature-card">
            <div className="feature-card__icon" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
