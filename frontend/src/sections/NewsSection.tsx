import { ButtonLink } from "../components/ButtonLink";
import { SectionHeader } from "../components/SectionHeader";
import { newsItems } from "../data/siteContent";

export function NewsSection() {
  return (
    <section className="landing-section" id="noticias">
      <SectionHeader
        eyebrow="Noticias IA & Blog RENPIA"
        title="Noticias, tendencias y ventajas de la IA en el mundo actual"
        description="Nuestro Agente editorial RENPIA publica 1 noticia diaria sobre automatizacion, productividad, ventas, servicio al cliente, innovacion y transformacion digital."
      />

      <div className="news-grid">
        {newsItems.map((item) => (
          <article key={item.title} className="news-card">
            <span className="news-card__category">{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <div className="news-foot">
        <p>Publicacion diaria | hasta 30 noticias activas | archivo automatico | depuracion cada 7 meses</p>
        <div className="news-foot__actions">
          <ButtonLink href="#contacto" variant="secondary">
            Leer blog
          </ButtonLink>
          <ButtonLink href="#contacto">Hablar con RENPIA</ButtonLink>
        </div>
      </div>
    </section>
  );
}
