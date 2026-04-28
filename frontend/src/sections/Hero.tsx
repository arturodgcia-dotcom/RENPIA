import { Button } from "../components/Button";
import { MetricCard } from "../components/MetricCard";
import { heroMetrics } from "../data/siteContent";

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
        <h1>Reingenieria de Procesos con Inteligencia Artificial para impulsar tu empresa</h1>
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
      </div>

      <div className="hero__panel" aria-label="Dashboard visual RENPIA">
        <div className="hero-visual">
          <div className="hero-visual__photo">
            <div className="photo-stage">
              <div className="photo-stage__badge">RENPIA team</div>
              <div className="photo-stage__person photo-stage__person--left" />
              <div className="photo-stage__person photo-stage__person--right" />
              <div className="photo-stage__desk" />
            </div>
          </div>

          <div className="hero-dashboard">
            <div className="hero-dashboard__topbar">
              <span className="status-dot" />
              <span>Ecosistema RENPIA</span>
              <strong>Vista ejecutiva</strong>
            </div>

            <div className="hero-dashboard__overview">
              <div>
                <small>Pulse operativo</small>
                <strong>Decision + ejecucion</strong>
              </div>
              <div className="hero-dashboard__curve" />
            </div>

            <div className="hero-dashboard__metrics">
              {heroMetrics.map((metric) => (
                <MetricCard
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                  tone={metric.tone}
                />
              ))}
            </div>

            <div className="hero-dashboard__footer">
              <div className="mini-panel">
                <span>Ventas</span>
                <strong>Pipeline sincronizado</strong>
              </div>
              <div className="mini-panel">
                <span>Operacion</span>
                <strong>Alertas y seguimiento</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
