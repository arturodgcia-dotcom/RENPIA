import { DemoCard } from "../components/DemoCard";
import { demos } from "../data/siteContent";

export function DemosSection() {
  return (
    <section className="landing-section" id="demos">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Demos disponibles</p>
        <h2>Conoce el producto antes de decidir.</h2>
        <p className="section-heading__description">
          La experiencia de demo permite visualizar con claridad como RENPIA organiza procesos,
          seguimiento y crecimiento.
        </p>
      </div>

      <div className="demo-grid">
        {demos.map((demo) => (
          <DemoCard key={demo.title} demo={demo} />
        ))}
      </div>
    </section>
  );
}
