import { DemoCard } from "../components/DemoCard";
import { demos } from "../data/siteContent";

export function DemosSection() {
  return (
    <section className="landing-section" id="demos">
      <div className="demos-layout">
        <div className="section-heading">
          <p className="section-heading__eyebrow">Demos disponibles</p>
          <h2>Conoce las plataformas antes de avanzar.</h2>
          <p className="section-heading__description">
            Las demos de SprintPilot y ComerCia muestran una experiencia real de producto, paneles
            ejecutivos y flujos comerciales listos para presentacion.
          </p>
        </div>

        <div className="demo-grid">
          {demos.map((demo) => (
            <DemoCard key={demo.title} demo={demo} />
          ))}
        </div>
      </div>
    </section>
  );
}
