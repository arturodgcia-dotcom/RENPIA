import { Button } from "../components/Button";
import { HeroVisual } from "../components/HeroVisual";

const bulletItems = [
  "Consultoria + desarrollo + automatizacion",
  "Soluciones listas para implementar",
  "Desarrollos personalizados por sector",
] as const;

export function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__copy">
        <p className="hero__eyebrow">Reingenieria de procesos con inteligencia aplicada</p>
        <h1>
          Reingenieria de Procesos con Inteligencia Artificial para{" "}
          <span className="hero__highlight">impulsar tu empresa</span>
        </h1>
        <p className="hero__description">
          En RENPIA transformamos operaciones, ventas, servicio y crecimiento mediante
          consultoria estrategica, automatizacion, agentes de IA y sistemas a la medida.
        </p>

        <ul className="hero__bullets">
          {bulletItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="hero__actions">
          <Button href="#soluciones">Conoce nuestras soluciones</Button>
          <Button href="#contacto" variant="secondary">
            Quiero una propuesta
          </Button>
        </div>

        <div className="hero__proof">
          <article>
            <strong>58</strong>
            <span>procesos optimizados</span>
          </article>
          <article>
            <strong>24</strong>
            <span>automatizaciones activas</span>
          </article>
          <article>
            <strong>12</strong>
            <span>agentes IA activos</span>
          </article>
        </div>
      </div>

      <div className="hero__panel" aria-label="Visual RENPIA">
        <HeroVisual />
      </div>
    </section>
  );
}
