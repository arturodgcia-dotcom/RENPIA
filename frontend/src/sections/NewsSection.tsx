import { Button } from "../components/Button";
import { NewsCard } from "../components/NewsCard";
import { newsItems } from "../data/siteContent";

export function NewsSection() {
  return (
    <section className="landing-section" id="noticias">
      <div className="section-heading section-heading--center">
        <p className="section-heading__eyebrow">Noticias IA & Blog RENPIA</p>
        <h2>Noticias, tendencias y ventajas de la IA en el mundo actual</h2>
        <p className="section-heading__description">
          Nuestro Agente editorial RENPIA publica 1 noticia diaria sobre automatizacion,
          productividad, ventas, servicio al cliente, innovacion y transformacion digital.
        </p>
      </div>

      <div className="news-grid">
        {newsItems.map((item) => (
          <NewsCard key={item.title} item={item} />
        ))}
      </div>

      <div className="news-foot">
        <p>Publicacion diaria | hasta 30 noticias activas | archivo automatico | depuracion cada 7 meses</p>
        <div className="news-foot__actions">
          <Button href="#contacto" variant="secondary">
            Leer blog
          </Button>
          <Button href="#contacto">Hablar con RENPIA</Button>
        </div>
      </div>
    </section>
  );
}
